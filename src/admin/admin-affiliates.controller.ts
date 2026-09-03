import { Body, Controller, Get, NotFoundException, Param, Post, Query, Render, Res, UseGuards } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import type { Response } from 'express';
import { AffiliatesService } from '../affiliates/affiliates.service';
import { OrdersService } from '../orders/orders.service';
import { AdminGuard } from '../auth/guards/admin.guard';
import { AffiliateCommissionDto } from './dto/affiliate-commission.dto';
import type { AffiliateStatus } from '../affiliates/schemas/affiliate.schema';
import type { AppConfig } from '../config/configuration';

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
  async index(@Query('status') status?: AffiliateStatus) {
    const affiliates = await this.affiliatesService.findAll(status);
    return { title: 'Affiliates', affiliates, statusFilter: status || '' };
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
