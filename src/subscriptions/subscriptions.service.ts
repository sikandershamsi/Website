import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Subscription, SubscriptionDocument, SubscriptionStatus } from './schemas/subscription.schema';

@Injectable()
export class SubscriptionsService {
  constructor(
    @InjectModel(Subscription.name) private readonly subscriptionModel: Model<SubscriptionDocument>,
  ) {}

  async create(data: {
    userId: string;
    productId?: string;
    productSlug: string;
    productName: string;
    subscriptionId: string;
    customerId: string;
    priceId: string;
    currentPeriodStart: Date;
    currentPeriodEnd: Date;
    affiliateId?: string;
    commissionRate?: number;
  }) {
    return this.subscriptionModel.create({
      user: new Types.ObjectId(data.userId),
      productId: data.productId ? new Types.ObjectId(data.productId) : undefined,
      productSlug: data.productSlug,
      productName: data.productName,
      stripe: {
        subscriptionId: data.subscriptionId,
        customerId: data.customerId,
        priceId: data.priceId,
      },
      status: 'active',
      currentPeriodStart: data.currentPeriodStart,
      currentPeriodEnd: data.currentPeriodEnd,
      affiliateId: data.affiliateId ? new Types.ObjectId(data.affiliateId) : undefined,
      commissionRate: data.commissionRate,
    });
  }

  async findByStripeId(subscriptionId: string) {
    return this.subscriptionModel.findOne({ 'stripe.subscriptionId': subscriptionId }).exec();
  }

  async findForUser(userId: string) {
    return this.subscriptionModel.find({ user: new Types.ObjectId(userId) }).sort({ createdAt: -1 }).lean().exec();
  }

  async findAll(limit = 50) {
    return this.subscriptionModel.find().sort({ createdAt: -1 }).limit(limit).lean().exec();
  }

  async findById(id: string) {
    return this.subscriptionModel.findById(id).lean().exec();
  }

  async updatePeriod(subscriptionId: string, start: Date, end: Date) {
    return this.subscriptionModel
      .findOneAndUpdate(
        { 'stripe.subscriptionId': subscriptionId },
        { $set: { currentPeriodStart: start, currentPeriodEnd: end, status: 'active' } },
        { returnDocument: 'after' },
      )
      .exec();
  }

  async updateStatus(subscriptionId: string, status: SubscriptionStatus, cancelAtPeriodEnd?: boolean) {
    const update: Record<string, unknown> = { status };
    if (cancelAtPeriodEnd !== undefined) update.cancelAtPeriodEnd = cancelAtPeriodEnd;
    return this.subscriptionModel
      .findOneAndUpdate({ 'stripe.subscriptionId': subscriptionId }, { $set: update }, { returnDocument: 'after' })
      .exec();
  }

  async countActive() {
    return this.subscriptionModel.countDocuments({ status: 'active' }).exec();
  }
}
