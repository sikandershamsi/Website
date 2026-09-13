import { Body, Controller, Get, NotFoundException, Param, Post, Query, Render, Res, UseGuards } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import type { Response } from 'express';
import { AffiliatesService } from '../affiliates/affiliates.service';
import { OrdersService } from '../orders/orders.service';
import { PayoutsService } from '../payouts/payouts.service';
import { StripeService } from '../stripe/stripe.service';
import { AdminGuard } from '../auth/guards/admin.guard';
import { AffiliateCommissionDto } from './dto/affiliate-commission.dto';
import { BulkIdsDto } from './dto/bulk-ids.dto';
import { AffiliateGroupDto, AssignGroupDto } from './dto/affiliate-group.dto';
import { SetTieringDto, SetMinPayoutThresholdDto } from './dto/affiliate-tiering.dto';
import { tierForLifetimeSales, nextTier } from '../affiliates/commission-tiers';
import type { AffiliateStatus } from '../affiliates/schemas/affiliate.schema';
import type { AppConfig } from '../config/configuration';
import { toCsv } from './csv.util';

@Controller('admin/affiliates')
@UseGuards(AdminGuard)
export class AdminAffiliatesController {
  constructor(
    private readonly affiliatesService: AffiliatesService,
    private readonly ordersService: OrdersService,
    private readonly payoutsService: PayoutsService,
    private readonly stripeService: StripeService,
    private readonly config: ConfigService<AppConfig>,
  ) {}

  @Get()
  @Render('admin/affiliates/index')
  async index(@Query('status') status?: AffiliateStatus, @Query('q') q?: string, @Query('page') page?: string) {
    const result = await this.affiliatesService.findAllPaged({ status, q, page: page ? Number(page) : 1 });
    return {
      title: 'Affiliates',
      affiliates: result.items,
      statusFilter: status || '',
      q: q || '',
      page: result.page,
      pages: result.pages,
      total: result.total,
    };
  }

  @Get('analytics')
  @Render('admin/affiliates/analytics')
  async analytics(@Query('days') daysRaw?: string) {
    const days = Math.min(365, Math.max(7, Number(daysRaw) || 90));
    const [summary, trend, clicks, leaderboard] = await Promise.all([
      this.ordersService.programCommissionSummary(),
      this.ordersService.commissionTrend(days),
      this.affiliatesService.programClickTrend(days),
      this.ordersService.affiliateLeaderboard(10),
    ]);
    return { title: 'Affiliate Analytics', summary, trend, clicks, leaderboard, days };
  }

  @Get('export.csv')
  async exportCsv(@Res() res: Response, @Query('from') fromRaw?: string, @Query('to') toRaw?: string, @Query('status') status?: string) {
    const from = fromRaw ? new Date(fromRaw) : undefined;
    const to = toRaw ? new Date(toRaw) : undefined;
    const rows = await this.ordersService.commissionExportRows({ from, to, status });
    const csv = toCsv(
      rows.map((r) => {
        const affiliate = r.affiliateId as unknown as { fullName?: string; email?: string } | undefined;
        return {
          orderNumber: r.orderNumber,
          date: r.createdAt ? new Date(r.createdAt as unknown as string).toISOString().slice(0, 10) : '',
          affiliate: affiliate?.fullName ?? '',
          affiliateEmail: affiliate?.email ?? '',
          commissionAmount: r.commissionAmount ?? 0,
          status: r.commissionStatus ?? '',
          paidAt: r.commissionPaidAt ? new Date(r.commissionPaidAt as unknown as string).toISOString().slice(0, 10) : '',
        };
      }),
      [
        { key: 'orderNumber', header: 'Order #' },
        { key: 'date', header: 'Date' },
        { key: 'affiliate', header: 'Affiliate' },
        { key: 'affiliateEmail', header: 'Affiliate Email' },
        { key: 'commissionAmount', header: 'Commission Amount' },
        { key: 'status', header: 'Status' },
        { key: 'paidAt', header: 'Paid At' },
      ],
    );
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', `attachment; filename="commissions-${new Date().toISOString().slice(0, 10)}.csv"`);
    res.send(csv);
  }

  @Post('bulk/approve')
  @Render('admin/affiliates/bulk-result')
  async bulkApprove(@Body() body: BulkIdsDto) {
    const results = await this.affiliatesService.bulkApprove(body.ids);
    const baseUrl = this.config.get('app.baseUrl', { infer: true }) as string;
    return {
      title: 'Bulk Approve',
      results: results.map((r) => ({
        fullName: r.affiliate.fullName,
        email: r.affiliate.email,
        password: r.plaintextPassword,
        referralLink: `${baseUrl}/?ref=${r.affiliate.referralCode}`,
      })),
    };
  }

  @Post('bulk/reject')
  async bulkReject(@Body() body: BulkIdsDto, @Res() res: Response) {
    await this.affiliatesService.bulkReject(body.ids);
    res.redirect(303, '/admin/affiliates?status=pending');
  }

  @Get('commissions')
  @Render('admin/affiliates/commissions')
  async commissions() {
    const rows = await this.ordersService.commissionExportRows({ status: 'pending' });
    const defaultThreshold = this.config.get('affiliates.minPayoutThreshold', { infer: true }) as number;

    // Group pending rows by affiliate so we can hide affiliates who haven't crossed their payout threshold yet.
    const byAffiliate = new Map<string, { affiliate: unknown; rows: typeof rows; pending: number }>();
    for (const row of rows) {
      const affiliate = row.affiliateId as unknown as { _id?: unknown; fullName?: string; minPayoutThreshold?: number } | undefined;
      if (!affiliate?._id) continue;
      const key = String(affiliate._id);
      const entry = byAffiliate.get(key) ?? { affiliate, rows: [], pending: 0 };
      entry.rows.push(row);
      entry.pending += row.commissionAmount ?? 0;
      byAffiliate.set(key, entry);
    }

    const payableRows: typeof rows = [];
    const belowThreshold: { fullName: string; pending: number; threshold: number }[] = [];
    for (const entry of byAffiliate.values()) {
      const affiliate = entry.affiliate as { fullName?: string; minPayoutThreshold?: number };
      const threshold = affiliate.minPayoutThreshold ?? defaultThreshold;
      if (entry.pending >= threshold) {
        payableRows.push(...entry.rows);
      } else {
        belowThreshold.push({ fullName: affiliate.fullName ?? 'Unknown', pending: entry.pending, threshold });
      }
    }

    return { title: 'Pending Commissions', rows: payableRows, belowThreshold, defaultThreshold };
  }

  @Post('commissions/bulk-mark-paid')
  @Render('admin/affiliates/bulk-paid-result')
  async bulkMarkPaid(@Body() body: BulkIdsDto) {
    const batch = await this.payoutsService.createManualBatch(body.ids, 'Bulk-paid from admin commissions list');
    return { title: 'Commissions Paid', batch };
  }

  @Get('payouts')
  @Render('admin/affiliates/payouts')
  async payouts() {
    const batches = await this.payoutsService.findAll();
    return { title: 'Payout History', batches };
  }

  @Get('groups')
  @Render('admin/affiliates/groups')
  async groups() {
    const [groupList, affiliates] = await Promise.all([
      this.affiliatesService.listGroups(),
      this.affiliatesService.findAll('approved'),
    ]);
    const counts = new Map<string, number>();
    for (const a of affiliates) {
      if (a.groupId) counts.set(String(a.groupId), (counts.get(String(a.groupId)) ?? 0) + 1);
    }
    const groupsWithCounts = groupList.map((g) => ({ ...g, memberCount: counts.get(String(g._id)) ?? 0 }));
    return { title: 'Affiliate Groups', groups: groupsWithCounts };
  }

  @Post('groups')
  async createGroup(@Body() body: AffiliateGroupDto, @Res() res: Response) {
    await this.affiliatesService.createGroup(body);
    res.redirect(303, '/admin/affiliates/groups');
  }

  @Post('groups/:id/delete')
  async deleteGroup(@Param('id') id: string, @Res() res: Response) {
    await this.affiliatesService.deleteGroup(id);
    res.redirect(303, '/admin/affiliates/groups');
  }

  @Post(':id/group')
  async setGroup(@Param('id') id: string, @Body() body: AssignGroupDto, @Res() res: Response) {
    await this.affiliatesService.assignGroup(id, body.groupId);
    res.redirect(303, `/admin/affiliates/${id}`);
  }

  @Post(':id/suspend')
  async suspend(@Param('id') id: string, @Res() res: Response) {
    await this.affiliatesService.suspend(id);
    res.redirect(303, `/admin/affiliates/${id}`);
  }

  @Post(':id/reactivate')
  async reactivate(@Param('id') id: string, @Res() res: Response) {
    await this.affiliatesService.reactivate(id);
    res.redirect(303, `/admin/affiliates/${id}`);
  }

  @Get(':id/export.csv')
  async exportAffiliateCsv(@Param('id') id: string, @Res() res: Response) {
    const affiliate = await this.affiliatesService.findById(id);
    if (!affiliate) throw new NotFoundException('Affiliate not found');
    const rows = await this.ordersService.commissionExportRows({ affiliateId: id });
    const csv = toCsv(
      rows.map((r) => ({
        orderNumber: r.orderNumber,
        date: r.createdAt ? new Date(r.createdAt as unknown as string).toISOString().slice(0, 10) : '',
        commissionAmount: r.commissionAmount ?? 0,
        status: r.commissionStatus ?? '',
        paidAt: r.commissionPaidAt ? new Date(r.commissionPaidAt as unknown as string).toISOString().slice(0, 10) : '',
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
    res.setHeader('Content-Disposition', `attachment; filename="${affiliate.fullName.replace(/[^a-z0-9]+/gi, '-')}-commissions.csv"`);
    res.send(csv);
  }

  @Get(':id')
  @Render('admin/affiliates/show')
  async show(@Param('id') id: string) {
    const affiliate = await this.affiliatesService.findById(id);
    if (!affiliate) throw new NotFoundException('Affiliate not found');
    const orders = await this.ordersService.findForAffiliate(id);
    const totals = await this.ordersService.commissionTotalsForAffiliate(id);
    const groups = await this.affiliatesService.listGroups();
    const anomalies = affiliate.status === 'approved' ? await this.affiliatesService.clickAnomalies(id) : [];
    const lifetimeSales = await this.ordersService.lifetimeSalesForAffiliate(id);
    const currentTier = tierForLifetimeSales(lifetimeSales);
    const upcomingTier = nextTier(lifetimeSales);
    const minPayoutThreshold = this.config.get('affiliates.minPayoutThreshold', { infer: true }) as number;
    let connectStatus: { chargesEnabled: boolean; payoutsEnabled: boolean; detailsSubmitted: boolean } | undefined;
    if (affiliate.stripeConnectAccountId && this.stripeService.isConfigured()) {
      connectStatus = await this.stripeService.getConnectStatus(affiliate.stripeConnectAccountId).catch(() => undefined);
    }
    return {
      title: affiliate.fullName,
      affiliate,
      orders,
      totals,
      groups,
      anomalies,
      lifetimeSales,
      currentTier,
      upcomingTier,
      minPayoutThreshold,
      connectStatus,
      stripeConfigured: this.stripeService.isConfigured(),
    };
  }

  @Post(':id/stripe-payout')
  async stripePayout(@Param('id') id: string, @Res() res: Response) {
    try {
      await this.payoutsService.createStripeConnectBatch(id);
    } catch {
      // surfaced via the batch's own 'failed' record and the affiliate detail page; nothing further to do here
    }
    res.redirect(303, `/admin/affiliates/${id}`);
  }

  @Post(':id/tiering')
  async setTiering(@Param('id') id: string, @Body() body: SetTieringDto, @Res() res: Response) {
    await this.affiliatesService.setTieringEnabled(id, body.tieringEnabled);
    res.redirect(303, `/admin/affiliates/${id}`);
  }

  @Post(':id/min-payout-threshold')
  async setMinPayoutThreshold(@Param('id') id: string, @Body() body: SetMinPayoutThresholdDto, @Res() res: Response) {
    await this.affiliatesService.setMinPayoutThreshold(id, body.minPayoutThreshold);
    res.redirect(303, `/admin/affiliates/${id}`);
  }

  @Post(':id/approve')
  @Render('admin/affiliates/show')
  async approve(@Param('id') id: string) {
    const { affiliate, plaintextPassword } = await this.affiliatesService.approve(id);
    const orders = await this.ordersService.findForAffiliate(id);
    const totals = await this.ordersService.commissionTotalsForAffiliate(id);
    const baseUrl = this.config.get('app.baseUrl', { infer: true }) as string;
    return {
      title: affiliate.fullName,
      affiliate,
      orders,
      totals,
      justApprovedPassword: plaintextPassword,
      justApprovedReferralLink: `${baseUrl}/?ref=${affiliate.referralCode}`,
    };
  }

  @Post(':id/reject')
  async reject(@Param('id') id: string, @Res() res: Response) {
    await this.affiliatesService.reject(id);
    res.redirect(303, `/admin/affiliates/${id}`);
  }

  @Post(':id/commission-rate')
  async setCommissionRate(@Param('id') id: string, @Body() body: AffiliateCommissionDto, @Res() res: Response) {
    await this.affiliatesService.setCommissionRate(id, body.commissionRate);
    res.redirect(303, `/admin/affiliates/${id}`);
  }

  @Post(':id/orders/:orderId/mark-paid')
  async markPaid(@Param('id') id: string, @Param('orderId') orderId: string, @Res() res: Response) {
    await this.ordersService.markCommissionPaid(orderId);
    res.redirect(303, `/admin/affiliates/${id}`);
  }
}
