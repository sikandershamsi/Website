import { Controller, Get, Post, Render } from '@nestjs/common';

@Controller('account')
export class AccountController {
  @Get()
  @Render('account/login')
  login() {
    return { title: 'My Account', activeNav: 'account' };
  }

  @Post('login')
  @Render('account/login')
  submitLogin() {
    return {
      title: 'My Account',
      activeNav: 'account',
      notice: 'Account sign-in is being finalized. Create an order at checkout to set up your account automatically.',
    };
  }

  @Get('orders')
  @Render('account/section')
  orders() {
    return {
      title: 'My Orders',
      activeNav: 'account',
      accountTab: 'orders',
      heading: 'My Orders',
      emptyText: "You haven't placed any orders yet.",
      ctaHref: '/shop',
      ctaText: 'Start Shopping',
    };
  }

  @Get('subscriptions')
  @Render('account/section')
  subscriptions() {
    return {
      title: 'Subscriptions',
      activeNav: 'account',
      accountTab: 'subscriptions',
      heading: 'Subscriptions',
      emptyText: 'You have no active subscriptions. Set up recurring delivery on any product page to never run out.',
      ctaHref: '/shop',
      ctaText: 'Shop Products',
    };
  }

  @Get('downloads')
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
