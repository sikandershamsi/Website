import { Body, Controller, Get, Post, Render, Req, Res, UseGuards } from '@nestjs/common';
import type { Request, Response } from 'express';
import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator';
import { AuthService } from '../auth/auth.service';
import { AuthGuard } from '../auth/guards/auth.guard';
import { OrdersService } from '../orders/orders.service';
import { SubscriptionsService } from '../subscriptions/subscriptions.service';

class LoginDto {
  @IsEmail() email: string;
  @IsString() @MinLength(1) password: string;
}

class RegisterDto {
  @IsEmail() email: string;
  @IsString() @MinLength(8) password: string;
  @IsOptional() @IsString() name?: string;
}

@Controller('account')
export class AccountController {
  constructor(
    private readonly authService: AuthService,
    private readonly ordersService: OrdersService,
    private readonly subscriptionsService: SubscriptionsService,
  ) {}

  @Get()
  @Render('account/login')
  login(@Req() req: Request) {
    if (req.session?.userId) {
      return { title: 'My Account', activeNav: 'account', loggedIn: true };
    }
    return { title: 'My Account', activeNav: 'account' };
  }

  @Post('login')
  async submitLogin(@Req() req: Request, @Res() res: Response, @Body() body: LoginDto) {
    try {
      const user = await this.authService.validateLogin(body.email, body.password);
      req.session.userId = String(user._id);
      req.session.role = user.role;
      req.session.email = user.email;
      await this.authService.loginAndMergeCart(String(user._id), req.cartId);
      res.redirect('/account/orders');
    } catch {
      res.render('account/login', {
        title: 'My Account',
        activeNav: 'account',
        notice: 'Invalid email or password.',
      });
    }
  }

  @Get('register')
  @Render('account/register')
  register() {
    return { title: 'Create Account', activeNav: 'account' };
  }

  @Post('register')
  async submitRegister(@Req() req: Request, @Res() res: Response, @Body() body: RegisterDto) {
    try {
      const user = await this.authService.register(body.email, body.password, body.name, req.cartId);
      req.session.userId = String(user._id);
      req.session.role = user.role;
      req.session.email = user.email;
      res.redirect('/account/orders');
    } catch (err) {
      res.render('account/register', {
        title: 'Create Account',
        activeNav: 'account',
        notice: err instanceof Error ? err.message : 'Could not create account.',
      });
    }
  }

  @Post('logout')
  logout(@Req() req: Request, @Res() res: Response) {
    req.session.destroy(() => res.redirect('/'));
  }

  @Get('orders')
  @UseGuards(AuthGuard)
  @Render('account/orders')
  async orders(@Req() req: Request) {
    const orders = await this.ordersService.findForUser(req.session.userId as string);
    return {
      title: 'My Orders',
      activeNav: 'account',
      accountTab: 'orders',
      heading: 'My Orders',
      orders,
      isEmpty: orders.length === 0,
    };
  }

  @Get('subscriptions')
  @UseGuards(AuthGuard)
  @Render('account/subscriptions')
  async subscriptions(@Req() req: Request) {
    const subscriptions = await this.subscriptionsService.findForUser(req.session.userId as string);
    return {
      title: 'Subscriptions',
      activeNav: 'account',
      accountTab: 'subscriptions',
      heading: 'Subscriptions',
      subscriptions,
      isEmpty: subscriptions.length === 0,
    };
  }

  @Get('downloads')
  @UseGuards(AuthGuard)
  @Render('account/section')
  downloads() {
    return {
      title: 'Downloads',
      activeNav: 'account',
      accountTab: 'downloads',
      heading: 'Downloads',
      emptyText: 'White papers, feeding guides, and product PDFs you request will appear here.',
      ctaHref: '/horse-iq',
      ctaText: 'Browse Horse IQ',
    };
  }

  @Get('wishlist')
  @UseGuards(AuthGuard)
  @Render('account/section')
  wishlist() {
    return {
      title: 'Wishlist',
      activeNav: 'account',
      accountTab: 'wishlist',
      heading: 'Wishlist',
      emptyText: "You haven't saved any products yet.",
      ctaHref: '/shop',
      ctaText: 'Explore Products',
    };
  }

  @Get('addresses')
  @UseGuards(AuthGuard)
  @Render('account/section')
  addresses() {
    return {
      title: 'Addresses',
      activeNav: 'account',
      accountTab: 'addresses',
      heading: 'Addresses',
      emptyText: 'Save a shipping address at checkout to have it ready for next time.',
      ctaHref: '/checkout',
      ctaText: 'Go to Checkout',
    };
  }
}
