import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { PayoutBatch, PayoutBatchDocument, PayoutMethod } from './schemas/payout-batch.schema';
import { OrdersService } from '../orders/orders.service';

@Injectable()
export class PayoutsService {
  constructor(
    @InjectModel(PayoutBatch.name) private readonly batchModel: Model<PayoutBatchDocument>,
    private readonly ordersService: OrdersService,
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
