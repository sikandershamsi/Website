import { BadRequestException, Inject, Injectable, forwardRef } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { PayoutBatch, PayoutBatchDocument, PayoutMethod } from './schemas/payout-batch.schema';
import { OrdersService } from '../orders/orders.service';
import { AffiliatesService } from '../affiliates/affiliates.service';
import { StripeService } from '../stripe/stripe.service';

@Injectable()
export class PayoutsService {
  constructor(
    @InjectModel(PayoutBatch.name) private readonly batchModel: Model<PayoutBatchDocument>,
    private readonly ordersService: OrdersService,
    private readonly affiliatesService: AffiliatesService,
    @Inject(forwardRef(() => StripeService)) private readonly stripeService: StripeService,
  ) {}

  /** Marks every given order's commission paid and records the run as one batch. */
  async createManualBatch(orderIds: string[], notes?: string): Promise<PayoutBatchDocument> {
    if (orderIds.length === 0) throw new BadRequestException('Select at least one commission to pay.');
    const selected = await this.ordersService.findPendingCommissionOrdersByIds(orderIds);
    if (selected.length === 0) throw new BadRequestException('None of the selected commissions are payable.');

    await this.ordersService.markCommissionsPaidBulk(selected.map((o) => String(o._id)));

    const totalAmount = selected.reduce((sum, o) => sum + (o.commissionAmount ?? 0), 0);
    const affiliateIds = Array.from(new Set(selected.map((o) => String(o.affiliateId)).filter(Boolean)));

    return this.batchModel.create({
      method: 'manual' as PayoutMethod,
      totalAmount,
      orderIds: selected.map((o) => new Types.ObjectId(String(o._id))),
      affiliateIds: affiliateIds.map((id) => new Types.ObjectId(id)),
      status: 'completed',
      notes,
    });
  }

  /** Pays one affiliate's entire pending balance via a real Stripe Connect transfer, then records the batch. */
  async createStripeConnectBatch(affiliateId: string): Promise<PayoutBatchDocument> {
    const affiliate = await this.affiliatesService.findById(affiliateId);
    if (!affiliate) throw new BadRequestException('Affiliate not found.');
    if (!affiliate.stripeConnectAccountId) {
      throw new BadRequestException('This affiliate has not connected a Stripe account yet.');
    }
    const status = await this.stripeService.getConnectStatus(affiliate.stripeConnectAccountId);
    if (!status.payoutsEnabled) {
      throw new BadRequestException("This affiliate's Stripe Connect onboarding isn't complete yet — payouts aren't enabled.");
    }

    const pendingOrders = await this.ordersService.commissionExportRows({ affiliateId, status: 'pending' });
    if (pendingOrders.length === 0) throw new BadRequestException('No pending commission for this affiliate.');
    const totalAmount = pendingOrders.reduce((sum, o) => sum + (o.commissionAmount ?? 0), 0);

    let transferId: string;
    try {
      transferId = await this.stripeService.transferToConnectAccount(affiliate.stripeConnectAccountId, totalAmount);
    } catch (err) {
      await this.batchModel.create({
        method: 'stripe_connect' as PayoutMethod,
        totalAmount,
        orderIds: [],
        affiliateIds: [affiliateId],
        status: 'failed',
        notes: (err as Error).message,
      });
      throw new BadRequestException(`Stripe transfer failed: ${(err as Error).message}`);
    }

    await this.ordersService.markCommissionsPaidBulk(pendingOrders.map((o) => String(o._id)));

    return this.batchModel.create({
      method: 'stripe_connect' as PayoutMethod,
      totalAmount,
      orderIds: pendingOrders.map((o) => new Types.ObjectId(String(o._id))),
      affiliateIds: [new Types.ObjectId(affiliateId)],
      status: 'completed',
      notes: `Stripe transfer ${transferId}`,
    });
  }

  async findAll(limit = 50) {
    return this.batchModel.find().sort({ createdAt: -1 }).limit(limit).lean().exec();
  }

  async findById(id: string) {
    return this.batchModel.findById(id).lean().exec();
  }

  /** Payout batches that included this affiliate — powers their portal payout-history tab. */
  async findForAffiliate(affiliateId: string) {
    return this.batchModel
      .find({ affiliateIds: new Types.ObjectId(affiliateId) })
      .sort({ createdAt: -1 })
      .lean()
      .exec();
  }

  async recordBatch(data: {
    method: PayoutMethod;
    totalAmount: number;
    orderIds: string[];
    affiliateIds: string[];
    status: 'completed' | 'partial' | 'failed';
    notes?: string;
  }) {
    return this.batchModel.create({
      ...data,
      orderIds: data.orderIds.map((id) => new Types.ObjectId(id)),
      affiliateIds: data.affiliateIds.map((id) => new Types.ObjectId(id)),
    });
  }
}
