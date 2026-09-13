import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Subscription, SubscriptionDocument, SubscriptionStatus } from './schemas/subscription.schema';

export interface SubscriptionPage {
  items: SubscriptionDocument[];
  total: number;
  page: number;
  perPage: number;
  pages: number;
}

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
    interval?: string;
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
      interval: data.interval,
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

  /** Searchable, paginated subscription list for the admin index. */
  async findAllPaged(opts: { status?: SubscriptionStatus; q?: string; page?: number; perPage?: number }): Promise<SubscriptionPage> {
    const perPage = opts.perPage && opts.perPage > 0 ? opts.perPage : 25;
    const page = opts.page && opts.page > 0 ? opts.page : 1;
    const filter: Record<string, unknown> = {};
    if (opts.status) filter.status = opts.status;
    if (opts.q?.trim()) {
      const escaped = opts.q.trim().replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      filter.productName = new RegExp(escaped, 'i');
    }
    const [items, total] = await Promise.all([
      this.subscriptionModel
        .find(filter)
        .sort({ createdAt: -1 })
        .skip((page - 1) * perPage)
        .limit(perPage)
        .lean()
        .exec(),
      this.subscriptionModel.countDocuments(filter).exec(),
    ]);
    return { items: items as unknown as SubscriptionDocument[], total, page, perPage, pages: Math.max(1, Math.ceil(total / perPage)) };
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
