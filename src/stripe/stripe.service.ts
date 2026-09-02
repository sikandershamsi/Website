import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Stripe from 'stripe';
import { Types } from 'mongoose';
import { ProductsService } from '../products/products.service';
import { OrdersService } from '../orders/orders.service';
import { SubscriptionsService } from '../subscriptions/subscriptions.service';
import { CartService, CartKey } from '../cart/cart.service';
import type { CartLine } from '../cart/schemas/cart.schema';

function toCents(dollars: number): number {
  return Math.round(dollars * 100);
}

@Injectable()
export class StripeService {
  private readonly logger = new Logger(StripeService.name);
  private readonly stripe: Stripe | null;
  private readonly baseUrl: string;
  private readonly webhookSecret: string;

  constructor(
    private readonly config: ConfigService,
    private readonly productsService: ProductsService,
    private readonly ordersService: OrdersService,
    private readonly subscriptionsService: SubscriptionsService,
    private readonly cartService: CartService,
  ) {
    const secretKey = this.config.get<string>('stripe.secretKey');
    this.baseUrl = this.config.get<string>('app.baseUrl') ?? 'http://localhost:3000';
    this.webhookSecret = this.config.get<string>('stripe.webhookSecret') ?? '';
    if (secretKey) {
      this.stripe = new Stripe(secretKey, { apiVersion: '2026-08-26.dahlia' });
    } else {
      this.stripe = null;
      this.logger.warn('STRIPE_SECRET_KEY not set — Stripe integration is disabled until configured.');
    }
  }

  private requireStripe(): Stripe {
    if (!this.stripe) {
      throw new Error('Stripe is not configured. Set STRIPE_SECRET_KEY in .env.');
    }
    return this.stripe;
  }

  isConfigured(): boolean {
    return this.stripe !== null;
  }

  /** Creates/updates the Stripe Product + one-time & subscription Prices for a product, writing the IDs back. */
  async syncProductToStripe(productDocId: string): Promise<void> {
    const stripe = this.requireStripe();
    const product = await this.productsService.findByIdRaw(productDocId);
    if (!product) return;

    let stripeProductId = product.stripe?.productId;
    if (stripeProductId) {
      await stripe.products.update(stripeProductId, { name: product.name, active: product.active });
    } else {
      const created = await stripe.products.create({
        name: product.name,
        description: product.tagline || product.description || undefined,
        metadata: { slug: product.slug },
      });
      stripeProductId = created.id;
    }

    const oneTimePrice = await stripe.prices.create({
      product: stripeProductId,
      currency: 'usd',
      unit_amount: toCents(product.price),
    });
    const subscriptionPrice = await stripe.prices.create({
      product: stripeProductId,
      currency: 'usd',
      unit_amount: toCents(product.price),
      recurring: { interval: 'month' },
    });

    await this.productsService.setStripeLinks(productDocId, {
      productId: stripeProductId,
      oneTimePriceId: oneTimePrice.id,
      subscriptionPriceId: subscriptionPrice.id,
    });
  }

  async createCheckoutSession(params: { key: CartKey; lines: CartLine[]; email?: string }): Promise<string> {
    const stripe = this.requireStripe();
    const hasSubscription = params.lines.some((l) => l.isSubscription);

    const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = [];
    for (const line of params.lines) {
      const product = await this.productsService.findBySlug(line.slug, true);
      const priceId = line.isSubscription
        ? (product as { stripe?: { subscriptionPriceId?: string } })?.stripe?.subscriptionPriceId
        : (product as { stripe?: { oneTimePriceId?: string } })?.stripe?.oneTimePriceId;
      if (!priceId) {
        throw new Error(`Product "${line.slug}" is not yet synced to Stripe (missing price id).`);
      }
      lineItems.push({ price: priceId, quantity: line.qty });
    }

    const cartKeyMetadata = 'userId' in params.key ? { userId: params.key.userId } : { guestCartId: params.key.guestCartId };

    const session = await stripe.checkout.sessions.create({
      mode: hasSubscription ? 'subscription' : 'payment',
      line_items: lineItems,
      customer_email: params.email,
      shipping_address_collection: { allowed_countries: ['US', 'CA'] },
      success_url: `${this.baseUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${this.baseUrl}/checkout/cancel`,
      metadata: { cartKey: JSON.stringify(cartKeyMetadata) },
    });

    if (!session.url) throw new Error('Stripe did not return a Checkout URL.');
    return session.url;
  }

  async getOrderForSession(sessionId: string) {
    return this.ordersService.findByCheckoutSessionId(sessionId);
  }

  /** Verifies and parses an incoming Stripe webhook request body. */
  constructEvent(rawBody: Buffer, signature: string): Stripe.Event {
    const stripe = this.requireStripe();
    return stripe.webhooks.constructEvent(rawBody, signature, this.webhookSecret);
  }

  async handleWebhookEvent(event: Stripe.Event): Promise<void> {
    switch (event.type) {
      case 'checkout.session.completed':
        await this.handleCheckoutCompleted(event.data.object as Stripe.Checkout.Session);
        break;
      case 'invoice.paid':
        await this.handleInvoicePaid(event.data.object as Stripe.Invoice);
        break;
      case 'invoice.payment_failed':
        await this.handleInvoicePaymentFailed(event.data.object as Stripe.Invoice);
        break;
      case 'customer.subscription.updated':
        await this.handleSubscriptionUpdated(event.data.object as Stripe.Subscription);
        break;
      case 'customer.subscription.deleted':
        await this.handleSubscriptionDeleted(event.data.object as Stripe.Subscription);
        break;
      default:
        break;
    }
  }

  private async handleCheckoutCompleted(session: Stripe.Checkout.Session) {
    const existing = await this.ordersService.findByCheckoutSessionId(session.id);
    if (existing) return; // idempotent — Stripe retries webhook deliveries

    let cartKey: CartKey | undefined;
    try {
      cartKey = session.metadata?.cartKey ? JSON.parse(session.metadata.cartKey) : undefined;
    } catch {
      cartKey = undefined;
    }
    if (!cartKey) {
      this.logger.error(`checkout.session.completed for ${session.id} had no parseable cartKey metadata.`);
      return;
    }

    const cart = await this.cartService.findRawByKey(cartKey);
    const lines = cart?.lines ?? [];
    const subtotal = lines.reduce((sum, l) => sum + l.price * l.qty, 0);
    const shipping = session.customer_details
      ? {
          fullName: session.customer_details.name ?? undefined,
          email: session.customer_details.email ?? undefined,
          address: session.customer_details.address?.line1 ?? undefined,
          city: session.customer_details.address?.city ?? undefined,
          state: session.customer_details.address?.state ?? undefined,
          zip: session.customer_details.address?.postal_code ?? undefined,
          country: session.customer_details.address?.country ?? undefined,
        }
      : undefined;

    const order = await this.ordersService.createFromCheckoutSession({
      checkoutSessionId: session.id,
      paymentIntentId: typeof session.payment_intent === 'string' ? session.payment_intent : undefined,
      subscriptionId: typeof session.subscription === 'string' ? session.subscription : undefined,
      customerId: typeof session.customer === 'string' ? session.customer : undefined,
      userId: 'userId' in cartKey ? cartKey.userId : undefined,
      guestEmail: shipping?.email,
      lines: lines.map((l) => ({
        productId: l.productId,
        slug: l.slug,
        name: l.name,
        price: l.price,
        size: l.size,
        image: l.image,
        qty: l.qty,
        isSubscription: l.isSubscription,
      })),
      subtotal,
      shipping,
    });

    if (session.mode === 'subscription' && typeof session.subscription === 'string' && 'userId' in cartKey) {
      const stripe = this.requireStripe();
      const stripeSub = await stripe.subscriptions.retrieve(session.subscription);
      const subLine = lines.find((l) => l.isSubscription);
      const firstItem = stripeSub.items.data[0];
      if (subLine && firstItem) {
        await this.subscriptionsService.create({
          userId: cartKey.userId,
          productId: subLine.productId ? String(subLine.productId) : undefined,
          productSlug: subLine.slug,
          productName: subLine.name,
          subscriptionId: stripeSub.id,
          customerId: typeof stripeSub.customer === 'string' ? stripeSub.customer : '',
          priceId: firstItem.price.id,
          currentPeriodStart: new Date(firstItem.current_period_start * 1000),
          currentPeriodEnd: new Date(firstItem.current_period_end * 1000),
        });
      }
    }

    if (cart) {
      await this.cartService.clear(cartKey);
    }

    void order;
  }

  private async handleInvoicePaid(invoice: Stripe.Invoice) {
    const subscriptionId = this.extractSubscriptionId(invoice);
    if (!subscriptionId) return;
    const stripe = this.requireStripe();
    const stripeSub = await stripe.subscriptions.retrieve(subscriptionId);
    const firstItem = stripeSub.items.data[0];
    if (!firstItem) return;

    await this.subscriptionsService.updatePeriod(
      subscriptionId,
      new Date(firstItem.current_period_start * 1000),
      new Date(firstItem.current_period_end * 1000),
    );

    // Skip the renewal order on the very first invoice — checkout.session.completed already recorded that purchase.
    if (invoice.billing_reason === 'subscription_create') return;

    const sub = await this.subscriptionsService.findByStripeId(subscriptionId);
    if (!sub) return;
    await this.ordersService.createRenewalOrder({
      userId: String(sub.user),
      subscriptionId,
      customerId: sub.stripe.customerId,
      slug: sub.productSlug,
      name: sub.productName,
      price: (invoice.amount_paid ?? 0) / 100,
    });
  }

  private async handleInvoicePaymentFailed(invoice: Stripe.Invoice) {
    const subscriptionId = this.extractSubscriptionId(invoice);
    if (!subscriptionId) return;
    await this.subscriptionsService.updateStatus(subscriptionId, 'past_due');
  }

  private async handleSubscriptionUpdated(subscription: Stripe.Subscription) {
    const firstItem = subscription.items.data[0];
    await this.subscriptionsService.updateStatus(
      subscription.id,
      subscription.status as 'active' | 'trialing' | 'past_due' | 'canceled' | 'incomplete',
      subscription.cancel_at_period_end,
    );
    if (firstItem) {
      await this.subscriptionsService.updatePeriod(
        subscription.id,
        new Date(firstItem.current_period_start * 1000),
        new Date(firstItem.current_period_end * 1000),
      );
    }
  }

  private async handleSubscriptionDeleted(subscription: Stripe.Subscription) {
    await this.subscriptionsService.updateStatus(subscription.id, 'canceled');
  }

  /** Cancels a subscription at the end of the current billing period (admin action). */
  async cancelAtPeriodEnd(subscriptionId: string) {
    const stripe = this.requireStripe();
    await stripe.subscriptions.update(subscriptionId, { cancel_at_period_end: true });
    await this.subscriptionsService.updateStatus(subscriptionId, 'active', true);
  }

  private extractSubscriptionId(invoice: Stripe.Invoice): string | undefined {
    const sub = (invoice as unknown as { subscription?: string | { id: string } }).subscription;
    if (!sub) return undefined;
    return typeof sub === 'string' ? sub : sub.id;
  }
}
