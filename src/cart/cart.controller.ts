import { Body, Controller, Get, Param, Post, Render, Req, Res } from '@nestjs/common';
import type { Request, Response } from 'express';
import { CartService } from './cart.service';
import { AddToCartDto, UpdateCartDto } from './cart.dto';

@Controller()
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Get('cart')
  @Render('cart/index')
  viewCart(@Req() req: Request) {
    const lines = this.cartService.get(req.cartId);
    const subtotal = this.cartService.subtotal(req.cartId);
    return {
      title: 'Your Cart',
      activeNav: '',
      lines,
      subtotal,
      isEmpty: lines.length === 0,
    };
  }

  @Post('cart/add')
  addToCart(@Req() req: Request, @Res() res: Response, @Body() body: AddToCartDto) {
    this.cartService.add(req.cartId, body.slug, Number(body.qty) || 1);
    res.redirect(body.redirectTo || '/cart');
  }

  @Post('cart/update')
  updateCart(@Req() req: Request, @Res() res: Response, @Body() body: UpdateCartDto) {
    this.cartService.updateQty(req.cartId, body.slug, Number(body.qty));
    res.redirect('/cart');
  }

  @Post('cart/remove/:slug')
  removeFromCart(@Req() req: Request, @Res() res: Response, @Param('slug') slug: string) {
    this.cartService.remove(req.cartId, slug);
    res.redirect('/cart');
  }

  @Get('checkout')
  @Render('cart/checkout')
  checkout(@Req() req: Request) {
    const lines = this.cartService.get(req.cartId);
    const subtotal = this.cartService.subtotal(req.cartId);
    return {
      title: 'Checkout',
      activeNav: '',
      lines,
      subtotal,
      isEmpty: lines.length === 0,
    };
  }

  @Post('checkout/place-order')
  @Render('cart/order-confirmation')
  placeOrder(@Req() req: Request) {
    const lines = this.cartService.get(req.cartId);
    const subtotal = this.cartService.subtotal(req.cartId);
    const orderNumber = 'AL-' + Math.floor(100000 + Math.random() * 900000);
    this.cartService.clear(req.cartId);
    return {
      title: 'Order Confirmed',
      activeNav: '',
      lines,
      subtotal,
      orderNumber,
    };
  }
}
