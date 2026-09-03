import { Controller, Get, Render, Req, UseGuards } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import type { Request } from 'express';
import { AffiliatesService } from '../affiliates/affiliates.service';
import { OrdersService } from '../orders/orders.service';
import { AffiliateGuard } from '../auth/guards/affiliate.guard';
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
    return {
      title: 'Affiliate Portal',
      affiliate,
      referralLink: `${baseUrl}/?ref=${affiliate?.referralCode}`,
      orders,
      totals,
    };
  }
}
