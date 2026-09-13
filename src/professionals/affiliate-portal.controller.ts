import { Body, Controller, Get, Param, Post, Query, Render, Req, Res, UseGuards } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import type { Request, Response } from 'express';
import { AffiliatesService } from '../affiliates/affiliates.service';
import { OrdersService } from '../orders/orders.service';
import { AffiliateGuard } from '../auth/guards/affiliate.guard';
import { ChangeAffiliatePasswordDto, SetPayoutEmailDto, CreateAffiliateLinkDto } from './dto/affiliate-settings.dto';
import type { AppConfig } from '../config/configuration';
import { toCsv } from '../admin/csv.util';
import { tierForLifetimeSales, nextTier } from '../affiliates/commission-tiers';
import { PayoutsService } from '../payouts/payouts.service';
import { StripeService } from '../stripe/stripe.service';
import { MarketingAssetsService } from '../marketing-assets/marketing-assets.service';

@Controller('professionals/portal')
@UseGuards(AffiliateGuard)
export class AffiliatePortalController {
  constructor(
    private readonly affiliatesService: AffiliatesService,
    private readonly ordersService: OrdersService,
    private readonly payoutsService: PayoutsService,
    private readonly stripeService: StripeService,
    private readonly marketingAssetsService: MarketingAssetsService,
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
    const affiliateId = req.session.userId as string;
    const affiliate = await this.affiliatesService.findById(affiliateId);
    const baseUrl = this.config.get('app.baseUrl', { infer: true }) as string;
    const links = await this.affiliatesService.listLinksForAffiliate(affiliateId);
    const shopLink = `${baseUrl}/shop?ref=${affiliate?.referralCode}`;
    const [images, copyBlocks] = await Promise.all([
      this.marketingAssetsService.listByType('image', shopLink),
      this.marketingAssetsService.listByType('copy', shopLink),
    ]);
    return {
      title: 'Marketing Resources',
      activeNav: 'professionals',
      portalTab: 'resources',
      affiliate,
      referralLink: `${baseUrl}/?ref=${affiliate?.referralCode}`,
      shopLink,
      baseUrl,
      links: links.map((l) => ({ ...l, fullUrl: `${baseUrl}${l.destinationPath || '/'}?ref=${l.code}` })),
      images,
      copyBlocks,
    };
  }

  @Post('links')
  async createLink(@Req() req: Request, @Res() res: Response, @Body() body: CreateAffiliateLinkDto) {
    await this.affiliatesService.createLink(req.session.userId as string, body.name, body.destinationPath);
    res.redirect(303, '/professionals/portal/resources');
  }

  @Post('links/:id/delete')
  async deleteLink(@Req() req: Request, @Res() res: Response, @Param('id') id: string) {
    await this.affiliatesService.deleteLink(id, req.session.userId as string);
    res.redirect(303, '/professionals/portal/resources');
  }

  @Get('settings')
  @Render('professionals/portal/settings')
  async settingsForm(@Req() req: Request) {
    const affiliate = await this.affiliatesService.findById(req.session.userId as string);
    const stripeConfigured = this.stripeService.isConfigured();
    let connectStatus: { chargesEnabled: boolean; payoutsEnabled: boolean; detailsSubmitted: boolean } | undefined;
    if (affiliate?.stripeConnectAccountId && stripeConfigured) {
      connectStatus = await this.stripeService.getConnectStatus(affiliate.stripeConnectAccountId).catch(() => undefined);
    }
    return { title: 'Account Settings', activeNav: 'professionals', portalTab: 'settings', affiliate, stripeConfigured, connectStatus };
  }

  @Get('connect/start')
  async startConnect(@Req() req: Request, @Res() res: Response) {
    const affiliate = await this.affiliatesService.findById(req.session.userId as string);
    if (!affiliate || !this.stripeService.isConfigured()) return res.redirect(303, '/professionals/portal/settings');
    const baseUrl = this.config.get('app.baseUrl', { infer: true }) as string;
    const url = await this.stripeService.startConnectOnboarding({
      affiliateId: String(affiliate._id),
      existingAccountId: affiliate.stripeConnectAccountId,
      email: affiliate.email,
      returnUrl: `${baseUrl}/professionals/portal/connect/return`,
      refreshUrl: `${baseUrl}/professionals/portal/connect/start`,
    });
    res.redirect(303, url);
  }

  @Get('connect/return')
  connectReturn(@Res() res: Response) {
    res.redirect(303, '/professionals/portal/settings');
  }

  @Get('payouts')
  @Render('professionals/portal/payouts')
  async payoutHistory(@Req() req: Request) {
    const batches = await this.payoutsService.findForAffiliate(req.session.userId as string);
    return { title: 'Payout History', activeNav: 'professionals', portalTab: 'payouts', batches };
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

  @Post('settings/email-preferences')
  async setEmailPreferences(@Req() req: Request, @Res() res: Response, @Body() body: Record<string, unknown>) {
    await this.affiliatesService.setEmailPreferences(req.session.userId as string, {
      emailOnNewReferral: body.emailOnNewReferral === 'true',
      emailOnPayout: body.emailOnPayout === 'true',
    });
    res.redirect(303, '/professionals/portal/settings');
  }

  @Get('activity')
  @Render('professionals/portal/activity')
  async activity(@Req() req: Request) {
    const items = await this.affiliatesService.listActivity(req.session.userId as string);
    return { title: 'Activity', activeNav: 'professionals', portalTab: 'activity', items };
  }
}
