import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Order, OrderDocument } from './schemas/order.schema';

@Injectable()
export class OrdersService {
  constructor(@InjectModel(Order.name) private readonly orderModel: Model<OrderDocument>) {}

  private async generateOrderNumber(): Promise<string> {
    for (let attempt = 0; attempt < 5; attempt++) {
      const candidate = 'AL-' + Math.floor(100000 + Math.random() * 900000);
      const exists = await this.orderModel.exists({ orderNumber: candidate });
      if (!exists) return candidate;
    }
    return 'AL-' + Date.now();
  }

  async findByCheckoutSessionId(checkoutSessionId: string) {
    return this.orderModel.findOne({ 'stripe.checkoutSessionId': checkoutSessionId }).exec();
  }

  async createFromCheckoutSession(data: {
    checkoutSessionId: string;
    paymentIntentId?: string;
    subscriptionId?: string;
    customerId?: string;
    userId?: string;
    guestEmail?: string;
    lines: Array<{
      productId?: Types.ObjectId;
      slug: string;
      name: string;
      price: number;
      size?: string;
      image?: string;
      qty: number;
      isSubscription: boolean;
    }>;
    subtotal: number;
    shipping?: Record<string, unknown>;
    referralCode?: string;
    affiliateId?: string;
    commissionAmount?: number;
  }) {
    const orderNumber = await this.generateOrderNumber();
    return this.orderModel.create({
      orderNumber,
      user: data.userId ? new Types.ObjectId(data.userId) : undefined,
      guestEmail: data.guestEmail,
      lines: data.lines,
      subtotal: data.subtotal,
      shipping: data.shipping,
      status: 'paid',
      source: 'checkout',
      paidAt: new Date(),
      stripe: {
        checkoutSessionId: data.checkoutSessionId,
        paymentIntentId: data.paymentIntentId,
        subscriptionId: data.subscriptionId,
        customerId: data.customerId,
      },
      referralCode: data.referralCode,
      affiliateId: data.affiliateId ? new Types.ObjectId(data.affiliateId) : undefined,
      commissionAmount: data.commissionAmount,
      commissionStatus: data.affiliateId ? 'pending' : undefined,
    });
  }

  async createRenewalOrder(data: {
    userId: string;
    subscriptionId: string;
    customerId: string;
    slug: string;
    name: string;
    price: number;
    size?: string;
    image?: string;
    affiliateId?: string;
    commissionAmount?: number;
  }) {
    const orderNumber = await this.generateOrderNumber();
    return this.orderModel.create({
      orderNumber,
      user: new Types.ObjectId(data.userId),
      lines: [
        {
          slug: data.slug,
          name: data.name,
          price: data.price,
          size: data.size,
          image: data.image,
          qty: 1,
          isSubscription: true,
        },
      ],
      subtotal: data.price,
      status: 'paid',
      source: 'subscription_renewal',
      paidAt: new Date(),
      stripe: { subscriptionId: data.subscriptionId, customerId: data.customerId },
      affiliateId: data.affiliateId ? new Types.ObjectId(data.affiliateId) : undefined,
      commissionAmount: data.commissionAmount,
      commissionStatus: data.affiliateId ? 'pending' : undefined,
    });
  }

  async findForUser(userId: string) {
    return this.orderModel.find({ user: new Types.ObjectId(userId) }).sort({ createdAt: -1 }).lean().exec();
  }

  async findAll(limit = 50) {
    return this.orderModel.find().sort({ createdAt: -1 }).limit(limit).lean().exec();
  }

  async findById(id: string) {
    return this.orderModel.findById(id).lean().exec();
  }

  async setStatus(id: string, status: Order['status']) {
    return this.orderModel.findByIdAndUpdate(id, { $set: { status } }, { returnDocument: 'after' }).exec();
  }

  async countRecent(sinceDays = 7) {
    const since = new Date(Date.now() - sinceDays * 24 * 60 * 60 * 1000);
    return this.orderModel.countDocuments({ createdAt: { $gte: since } }).exec();
  }

  async findForAffiliate(affiliateId: string) {
    return this.orderModel
      .find({ affiliateId: new Types.ObjectId(affiliateId) })
      .sort({ createdAt: -1 })
      .lean()
      .exec();
  }

  async commissionTotalsForAffiliate(affiliateId: string) {
    const orders = await this.findForAffiliate(affiliateId);
    const pending = orders
      .filter((o) => o.commissionStatus === 'pending')
      .reduce((sum, o) => sum + (o.commissionAmount ?? 0), 0);
    const paid = orders
      .filter((o) => o.commissionStatus === 'paid')
      .reduce((sum, o) => sum + (o.commissionAmount ?? 0), 0);
    return { pending, paid, lifetime: pending + paid, orderCount: orders.length };
  }

  async markCommissionPaid(orderId: string) {
    return this.orderModel
      .findByIdAndUpdate(orderId, { $set: { commissionStatus: 'paid', commissionPaidAt: new Date() } }, { returnDocument: 'after' })
      .exec();
  }
}
