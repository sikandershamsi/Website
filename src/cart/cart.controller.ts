import { Body, Controller, Get, NotFoundException, Param, Post, Query, Render, Req, Res } from '@nestjs/common';
import type { Request, Response } from 'express';
import { CartService, CartKey } from './cart.service';
import { AddToCartDto, UpdateCartDto } from './cart.dto';
import { StripeService } from '../stripe/stripe.service';

function cartKeyFromRequest(req: Request): CartKey {
  if (req.session?.userId) return { userId: req.session.userId };
  return { guestCartId: req.cartId };
}

@Controller()
export class CartController {
  constructor(
    private readonly cartService: CartService,
    private readonly stripeService: StripeService,
  ) {}

  @Get('cart')
  @Render('cart/index')
  async viewCart(@Req() req: Request) {
    const key = cartKeyFromRequest(req);
    const lines = await this.cartService.get(key);
    const subtotal = await this.cartService.subtotal(key);
    return {
      title: 'Your Cart',
      activeNav: '',
      lines,
      subtotal,
      isEmpty: lines.length === 0,
    };
  }

  @Post('cart/add')
  async addToCart(@Req() req: Request, @Res() res: Response, @Body() body: AddToCartDto) {
    const key = cartKeyFromRequest(req);
    await this.cartService.add(key, body.slug, Number(body.qty) || 1, Boolean(body.isSubscription));
    res.redirect(303, body.redirectTo || '/cart');
  }

  @Post('cart/update')
  async updateCart(@Req() req: Request, @Res() res: Response, @Body() body: UpdateCartDto) {
    const key = cartKeyFromRequest(req);
    await this.cartService.updateQty(key, body.slug, Number(body.qty));
    res.redirect(303, '/cart');
  }

  @Post('cart/remove/:slug')
  async removeFromCart(@Req() req: Request, @Res() res: Response, @Param('slug') slug: string) {
    const key = cartKeyFromRequest(req);
    await this.cartService.remove(key, slug);
    res.redirect(303, '/cart');
  }

  @Get('checkout')
  @Render('cart/checkout')
  async checkout(@Req() req: Request, @Query('error') error?: string) {
    const key = cartKeyFromRequest(req);
    const lines = await this.cartService.get(key);
    const subtotal = await this.cartService.subtotal(key);
    return {
      title: 'Checkout',
      activeNav: '',
      lines,
      subtotal,
      isEmpty: lines.length === 0,
      multipleSubscriptionsError: error === 'multiple-subscriptions',
    };
  }

  @Post('checkout/start')
  async startCheckout(@Req() req: Request, @Res() res: Response) {
    const key = cartKeyFromRequest(req);
    const lines = await this.cartService.get(key);
    if (lines.length === 0) {
      return res.redirect(303, '/cart');
    }
    const subscriptionLines = lines.filter((l) => l.isSubscription);
    if (subscriptionLines.length > 1) {
      // Stripe Checkout only supports one recurring price per session.
      return res.redirect(303, '/checkout?error=multiple-subscriptions');
    }
    const url = await this.stripeService.createCheckoutSession({
      key,
      lines,
      email: req.session?.email,
    });
    res.redirect(303, url);
  }

  @Get('checkout/success')
  @Render('cart/order-confirmation')
  async checkoutSuccess(@Query('session_id') sessionId: string) {
    if (!sessionId) throw new NotFoundException('Missing checkout session.');
    const order = await this.stripeService.getOrderForSession(sessionId);
    if (!order) throw new NotFoundException('Order not found for this checkout session.');
    return {
      title: 'Order Confirmed',
      activeNav: '',
      lines: order.lines,
      subtotal: order.subtotal,
      orderNumber: order.orderNumber,
    };
  }

  @Get('checkout/cancel')
  @Render('cart/checkout')
  async checkoutCancel(@Req() req: Request) {
    const key = cartKeyFromRequest(req);
    const lines = await this.cartService.get(key);
    const subtotal = await this.cartService.subtotal(key);
    return {
      title: 'Checkout',
      activeNav: '',
      lines,
      subtotal,
      isEmpty: lines.length === 0,
      cancelled: true,
    };
  }
}
