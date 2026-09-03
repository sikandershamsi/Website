import { Body, Controller, Get, Post, Render, Req, Res, UseGuards } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import type { Request, Response } from 'express';
import { AffiliatesService } from '../affiliates/affiliates.service';
import { OrdersService } from '../orders/orders.service';
import { AffiliateGuard } from '../auth/guards/affiliate.guard';
import { ChangeAffiliatePasswordDto, SetPayoutEmailDto } from './dto/affiliate-settings.dto';
import type { AppConfig } from '../config/configuration';

@Controller('professionals/portal')
@UseGuards(AffiliateGuard)
export class AffiliatePortalController {
  constructor(
    private readonly affiliatesService: AffiliatesService,
    private readonly ordersService: OrdersService,
    private readonly config: ConfigService<AppConfig>,
  ) {}

  @Get()
  @Render('professionals/portal/dashboard')
  async dashboard(@Req() req: Request) {
    const affiliate = await this.affiliatesService.findById(req.session.userId as string);
    const orders = await this.ordersService.findForAffiliate(req.session.userId as string);
    const totals = await this.ordersService.commissionTotalsForAffiliate(req.session.userId as string);
    const baseUrl = this.config.get('app.baseUrl', { infer: true }) as string;
    const clickCount = affiliate?.clickCount ?? 0;
    const conversionRate = clickCount > 0 ? (totals.orderCount / clickCount) * 100 : undefined;
    return {
      title: 'Affiliate Portal',
      activeNav: 'professionals',
      portalTab: 'dashboard',
      affiliate,
      referralLink: `${baseUrl}/?ref=${affiliate?.referralCode}`,
      orders,
      totals,
      clickCount,
      conversionRate,
    };
  }

  @Get('resources')
  @Render('professionals/portal/resources')
  async resources(@Req() req: Request) {
    const affiliate = await this.affiliatesService.findById(req.session.userId as string);
    const baseUrl = this.config.get('app.baseUrl', { infer: true }) as string;
    return {
      title: 'Marketing Resources',
      activeNav: 'professionals',
      portalTab: 'resources',
      affiliate,
      referralLink: `${baseUrl}/?ref=${affiliate?.referralCode}`,
      shopLink: `${baseUrl}/shop?ref=${affiliate?.referralCode}`,
    };
  }

  @Get('settings')
  @Render('professionals/portal/settings')
  async settingsForm(@Req() req: Request) {
    const affiliate = await this.affiliatesService.findById(req.session.userId as string);
    return { title: 'Account Settings', activeNav: 'professionals', portalTab: 'settings', affiliate };
  }

  @Post('settings/password')
  async changePassword(@Req() req: Request, @Res() res: Response, @Body() body: ChangeAffiliatePasswordDto) {
    const affiliate = await this.affiliatesService.findById(req.session.userId as string);
    const base = { title: 'Account Settings', activeNav: 'professionals', portalTab: 'settings', affiliate };
    try {
      await this.affiliatesService.changePassword(req.session.userId as string, body.currentPassword, body.newPassword);
      res.render('professionals/portal/settings', { ...base, passwordUpdated: true });
    } catch {
      res.render('professionals/portal/settings', { ...base, notice: 'Current password is incorrect.' });
    }
  }

  @Post('settings/payout-email')
  async setPayoutEmail(@Req() req: Request, @Res() res: Response, @Body() body: SetPayoutEmailDto) {
    await this.affiliatesService.setPayoutEmail(req.session.userId as string, body.payoutEmail);
    res.redirect(303, '/professionals/portal/settings');
  }
}
