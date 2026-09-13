import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Stripe from 'stripe';
import { Types } from 'mongoose';
import { ProductsService } from '../products/products.service';
import { OrdersService } from '../orders/orders.service';
import { SubscriptionsService } from '../subscriptions/subscriptions.service';
import { CartService, CartKey } from '../cart/cart.service';
import { AffiliatesService } from '../affiliates/affiliates.service';
import type { CartLine } from '../cart/schemas/cart.schema';
import { resolveSubscriptionFrequency } from '../cart/subscription-frequency';
import { tierForLifetimeSales } from '../affiliates/commission-tiers';

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
    private readonly affiliatesService: AffiliatesService,
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

  // ---- Stripe Connect (affiliate payouts) ----

  /** Creates a Connect Express account for an affiliate if they don't have one yet, then returns an
   * onboarding link URL to send them to. Safe to call repeatedly — reuses the existing account. */
  async startConnectOnboarding(params: {
    affiliateId: string;
    existingAccountId?: string;
    email: string;
    returnUrl: string;
    refreshUrl: string;
  }): Promise<string> {
    const stripe = this.requireStripe();
    let accountId = params.existingAccountId;
    if (!accountId) {
      const account = await stripe.accounts.create({
        type: 'express',
        email: params.email,
        capabilities: { transfers: { requested: true } },
        metadata: { affiliateId: params.affiliateId },
      });
      accountId = account.id;
      await this.affiliatesService.setStripeConnectAccountId(params.affiliateId, accountId);
    }
    const link = await stripe.accountLinks.create({
      account: accountId,
      type: 'account_onboarding',
      return_url: params.returnUrl,
      refresh_url: params.refreshUrl,
    });
    return link.url;
  }

  /** Live onboarding status for a Connect account — checked on demand rather than via webhook for simplicity. */
  async getConnectStatus(accountId: string): Promise<{ chargesEnabled: boolean; payoutsEnabled: boolean; detailsSubmitted: boolean }> {
    const stripe = this.requireStripe();
    const account = await stripe.accounts.retrieve(accountId);
    return {
      chargesEnabled: Boolean(account.charges_enabled),
      payoutsEnabled: Boolean(account.payouts_enabled),
      detailsSubmitted: Boolean(account.details_submitted),
    };
  }

  /** Moves money to an affiliate's Connect account. Throws if the account can't yet receive transfers. */
  async transferToConnectAccount(accountId: string, amountDollars: number): Promise<string> {
    const stripe = this.requireStripe();
    const transfer = await stripe.transfers.create({
      amount: toCents(amountDollars),
      currency: 'usd',
      destination: accountId,
    });
    return transfer.id;
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

  async createCheckoutSession(params: {
    key: CartKey;
    lines: CartLine[];
    email?: string;
    referralCode?: string;
  }): Promise<string> {
    const stripe = this.requireStripe();
    const hasSubscription = params.lines.some((l) => l.isSubscription);

    // Built from each cart line's own snapshotted price (not a pre-synced per-product Price ID) so that
    // a size/variant selected at add-to-cart time is charged at its own price, not the product's base price.
    const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = params.lines.map((line) => {
      const frequency = line.isSubscription ? resolveSubscriptionFrequency(line.subscriptionFrequency) : undefined;
      return {
        price_data: {
          currency: 'usd',
          unit_amount: toCents(line.price),
          product_data: { name: line.size ? `${line.name} — ${line.size}` : line.name },
          ...(frequency ? { recurring: { interval: frequency.interval, interval_count: frequency.intervalCount } } : {}),
        },
        quantity: line.qty,
      };
    });

    const cartKeyMetadata = 'userId' in params.key ? { userId: params.key.userId } : { guestCartId: params.key.guestCartId };

    const session = await stripe.checkout.sessions.create({
      mode: hasSubscription ? 'subscription' : 'payment',
      line_items: lineItems,
      customer_email: params.email,
      shipping_address_collection: { allowed_countries: ['US', 'CA'] },
      success_url: `${this.baseUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${this.baseUrl}/checkout/cancel`,
      metadata: { cartKey: JSON.stringify(cartKeyMetadata), referralCode: params.referralCode ?? '' },
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
      case 'charge.refunded':
        await this.handleChargeRefunded(event.data.object as Stripe.Charge);
        break;
      default:
        break;
    }
  }

  /** Sums commission per cart line so a product-specific rate override (set on the Product) wins over the
   * affiliate's own rate, which itself may come from a performance tier if the affiliate has opted in. */
  private async computeCommission(
    affiliate: { _id: unknown; commissionRate: number; tieringEnabled?: boolean },
    lines: CartLine[],
  ): Promise<number> {
    let baseRate = affiliate.commissionRate;
    if (affiliate.tieringEnabled) {
      const lifetimeSales = await this.ordersService.lifetimeSalesForAffiliate(String(affiliate._id));
      baseRate = tierForLifetimeSales(lifetimeSales).rate;
    }
    let total = 0;
    for (const line of lines) {
      let rate = baseRate;
      if (line.productId) {
        const product = await this.productsService.findByIdRaw(String(line.productId));
        const override = (product as { affiliateCommissionRate?: number } | null)?.affiliateCommissionRate;
        if (override !== undefined && override !== null) rate = override;
      }
      total += line.price * line.qty * rate;
    }
    return Math.round(total * 100) / 100;
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

    const referralCode = session.metadata?.referralCode || undefined;
    const resolvedReferral = referralCode ? await this.affiliatesService.resolveReferralCode(referralCode) : null;
    const affiliate = resolvedReferral?.affiliate ?? null;
    const commissionAmount = affiliate ? await this.computeCommission(affiliate, lines) : undefined;

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

    // Self-referral: an affiliate earning commission on their own purchase. The order is still recorded
    // for visibility, but the commission is rejected up front rather than paid out and clawed back later.
    const isSelfReferral =
      Boolean(affiliate) && Boolean(shipping?.email) && shipping!.email!.toLowerCase() === affiliate!.email.toLowerCase();

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
        subscriptionFrequency: l.subscriptionFrequency,
      })),
      subtotal,
      shipping,
      commissionRejected: isSelfReferral,
      commissionNote: isSelfReferral ? 'Rejected: affiliate purchased through their own referral link.' : undefined,
      referralCode: affiliate ? referralCode : undefined,
      affiliateId: affiliate ? String(affiliate._id) : undefined,
      commissionAmount,
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
          interval: resolveSubscriptionFrequency(subLine.subscriptionFrequency).label,
          currentPeriodStart: new Date(firstItem.current_period_start * 1000),
          currentPeriodEnd: new Date(firstItem.current_period_end * 1000),
          // A self-referral doesn't earn commission on the first invoice, and mustn't attach the affiliate
          // to the subscription either — otherwise every renewal would keep paying them regardless.
          affiliateId: affiliate && !isSelfReferral ? String(affiliate._id) : undefined,
          commissionRate: affiliate && !isSelfReferral ? affiliate.commissionRate : undefined,
        });
      }
    }

    if (cart) {
      await this.cartService.clear(cartKey);
    }

    if (affiliate && !isSelfReferral && commissionAmount) {
      await this.affiliatesService.notifyNewReferral(affiliate._id as Types.ObjectId, order.orderNumber, commissionAmount);
    }
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
    const price = (invoice.amount_paid ?? 0) / 100;
    const commissionAmount = sub.affiliateId && sub.commissionRate ? Math.round(price * sub.commissionRate * 100) / 100 : undefined;
    const renewalOrder = await this.ordersService.createRenewalOrder({
      userId: String(sub.user),
      subscriptionId,
      customerId: sub.stripe.customerId,
      slug: sub.productSlug,
      name: sub.productName,
      price,
      affiliateId: sub.affiliateId ? String(sub.affiliateId) : undefined,
      commissionAmount,
    });
    if (sub.affiliateId && commissionAmount) {
      await this.affiliatesService.notifyNewReferral(sub.affiliateId, renewalOrder.orderNumber, commissionAmount);
    }
  }

  /** Reverses (or flags for manual clawback) the commission on an order whose charge was refunded. */
  private async handleChargeRefunded(charge: Stripe.Charge) {
    const paymentIntentId = typeof charge.payment_intent === 'string' ? charge.payment_intent : undefined;
    if (!paymentIntentId) return;
    const order = await this.ordersService.findByPaymentIntentId(paymentIntentId);
    if (!order) return;
    await this.ordersService.handleRefund(order._id as Types.ObjectId);
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
