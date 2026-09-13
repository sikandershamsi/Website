import { Body, Controller, Get, Post, Query, Render, Req, Res, UseGuards } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import type { Request, Response } from 'express';
import { AffiliatesService } from '../affiliates/affiliates.service';
import { OrdersService } from '../orders/orders.service';
import { AffiliateGuard } from '../auth/guards/affiliate.guard';
import { ChangeAffiliatePasswordDto, SetPayoutEmailDto } from './dto/affiliate-settings.dto';
import type { AppConfig } from '../config/configuration';
import { toCsv } from '../admin/csv.util';
import { tierForLifetimeSales, nextTier } from '../affiliates/commission-tiers';

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
  async dashboard(@Req() req: Request, @Query('days') daysRaw?: string) {
    const affiliateId = req.session.userId as string;
    const days = Math.min(365, Math.max(7, Number(daysRaw) || 90));
    const affiliate = await this.affiliatesService.findById(affiliateId);
    const orders = await this.ordersService.findForAffiliate(affiliateId);
    const totals = await this.ordersService.commissionTotalsForAffiliate(affiliateId);
    const baseUrl = this.config.get('app.baseUrl', { infer: true }) as string;
    const clickCount = affiliate?.clickCount ?? 0;
    const conversionRate = clickCount > 0 ? (totals.orderCount / clickCount) * 100 : undefined;
    const [commissionTrend, clickTrend, lifetimeSales] = await Promise.all([
      this.ordersService.commissionTrendForAffiliate(affiliateId, days),
      this.affiliatesService.clickTrend(affiliateId, days),
      this.ordersService.lifetimeSalesForAffiliate(affiliateId),
    ]);
    const currentTier = tierForLifetimeSales(lifetimeSales);
    const upcomingTier = nextTier(lifetimeSales);
    const minPayoutThreshold = affiliate?.minPayoutThreshold ?? (this.config.get('affiliates.minPayoutThreshold', { infer: true }) as number);
    const thresholdProgressPct = minPayoutThreshold > 0 ? Math.min(100, Math.round((totals.pending / minPayoutThreshold) * 100)) : 100;
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
      commissionTrend,
      clickTrend,
      days,
      lifetimeSales,
      currentTier,
      upcomingTier,
      minPayoutThreshold,
      thresholdProgressPct,
    };
  }

  @Get('statement.csv')
  async statementCsv(@Req() req: Request, @Res() res: Response) {
    const affiliateId = req.session.userId as string;
    const orders = await this.ordersService.findForAffiliate(affiliateId);
    const csv = toCsv(
      orders.map((o) => ({
        orderNumber: o.orderNumber,
        date: o.createdAt ? new Date(o.createdAt as unknown as string).toISOString().slice(0, 10) : '',
        commissionAmount: o.commissionAmount ?? 0,
        status: o.commissionStatus ?? '',
        paidAt: o.commissionPaidAt ? new Date(o.commissionPaidAt as unknown as string).toISOString().slice(0, 10) : '',
      })),
      [
        { key: 'orderNumber', header: 'Order #' },
        { key: 'date', header: 'Date' },
        { key: 'commissionAmount', header: 'Commission Amount' },
        { key: 'status', header: 'Status' },
        { key: 'paidAt', header: 'Paid At' },
      ],
    );
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', `attachment; filename="my-earnings-statement.csv"`);
    res.send(csv);
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
