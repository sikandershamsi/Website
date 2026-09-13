import { Controller, Get, NotFoundException, Param, Post, Query, Render, Res, UseGuards } from '@nestjs/common';
import type { Response } from 'express';
import { AdminGuard } from '../auth/guards/admin.guard';
import { SubscriptionsService } from '../subscriptions/subscriptions.service';
import { StripeService } from '../stripe/stripe.service';
import type { SubscriptionStatus } from '../subscriptions/schemas/subscription.schema';

@Controller('admin/subscriptions')
@UseGuards(AdminGuard)
export class AdminSubscriptionsController {
  constructor(
    private readonly subscriptionsService: SubscriptionsService,
    private readonly stripeService: StripeService,
  ) {}

  @Get()
  @Render('admin/subscriptions/index')
  async index(@Query('status') status?: SubscriptionStatus, @Query('q') q?: string, @Query('page') page?: string) {
    const result = await this.subscriptionsService.findAllPaged({ status, q, page: page ? Number(page) : 1 });
    return {
      title: 'Subscriptions',
      subscriptions: result.items,
      statusFilter: status || '',
      q: q || '',
      page: result.page,
      pages: result.pages,
      total: result.total,
    };
  }

  @Get(':id')
  @Render('admin/subscriptions/show')
  async show(@Param('id') id: string) {
    const subscription = await this.subscriptionsService.findById(id);
    if (!subscription) throw new NotFoundException('Subscription not found');
    return { title: subscription.productName, subscription };
  }

  @Post(':id/cancel')
  async cancel(@Param('id') id: string, @Res() res: Response) {
    const subscription = await this.subscriptionsService.findById(id);
    if (subscription) {
      await this.stripeService.cancelAtPeriodEnd(subscription.stripe.subscriptionId);
    }
    res.redirect(303, `/admin/subscriptions/${id}`);
  }
}
