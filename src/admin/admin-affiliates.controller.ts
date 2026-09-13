import { Body, Controller, Get, NotFoundException, Param, Post, Query, Render, Res, UseGuards } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import type { Response } from 'express';
import { AffiliatesService } from '../affiliates/affiliates.service';
import { OrdersService } from '../orders/orders.service';
import { AdminGuard } from '../auth/guards/admin.guard';
import { AffiliateCommissionDto } from './dto/affiliate-commission.dto';
import type { AffiliateStatus } from '../affiliates/schemas/affiliate.schema';
import type { AppConfig } from '../config/configuration';
import { toCsv } from './csv.util';

@Controller('admin/affiliates')
@UseGuards(AdminGuard)
export class AdminAffiliatesController {
  constructor(
    private readonly affiliatesService: AffiliatesService,
    private readonly ordersService: OrdersService,
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
    return { title: affiliate.fullName, affiliate, orders, totals };
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
