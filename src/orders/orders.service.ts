import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Order, OrderDocument, OrderStatus } from './schemas/order.schema';

export interface OrderPage {
  items: OrderDocument[];
  total: number;
  page: number;
  perPage: number;
  pages: number;
}

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

  async findByPaymentIntentId(paymentIntentId: string) {
    return this.orderModel.findOne({ 'stripe.paymentIntentId': paymentIntentId }).exec();
  }

  /** Refund clawback: an unpaid commission is reversed automatically; an already-paid one is flagged
   * for a human to claw back manually rather than silently ignored. */
  async handleRefund(orderId: Types.ObjectId): Promise<void> {
    const order = await this.orderModel.findById(orderId).exec();
    if (!order || !order.commissionStatus) return;
    if (order.commissionStatus === 'pending') {
      order.commissionStatus = 'reversed';
      order.commissionNote = 'Order refunded before commission was paid.';
      await order.save();
    } else if (order.commissionStatus === 'paid') {
      order.refundFlaggedForClawback = true;
      order.commissionNote = 'Order refunded after commission was already paid — needs manual clawback.';
      await order.save();
    }
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
      subscriptionFrequency?: string;
    }>;
    subtotal: number;
    shipping?: Record<string, unknown>;
    referralCode?: string;
    affiliateId?: string;
    commissionAmount?: number;
    /** Set by the caller when the referral is disqualified (e.g. self-referral) — the order still records
     * the attribution for visibility, but no payable commission is created. */
    commissionRejected?: boolean;
    commissionNote?: string;
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
      commissionStatus: data.affiliateId ? (data.commissionRejected ? 'rejected' : 'pending') : undefined,
      commissionNote: data.commissionNote,
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

  /** Searchable, paginated order list for the admin index. */
  async findAllPaged(opts: { status?: OrderStatus; q?: string; page?: number; perPage?: number }): Promise<OrderPage> {
    const perPage = opts.perPage && opts.perPage > 0 ? opts.perPage : 25;
    const page = opts.page && opts.page > 0 ? opts.page : 1;
    const filter: Record<string, unknown> = {};
    if (opts.status) filter.status = opts.status;
    if (opts.q?.trim()) {
      const escaped = opts.q.trim().replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const re = new RegExp(escaped, 'i');
      filter.$or = [{ orderNumber: re }, { guestEmail: re }];
    }
    const [items, total] = await Promise.all([
      this.orderModel
        .find(filter)
        .sort({ createdAt: -1 })
        .skip((page - 1) * perPage)
        .limit(perPage)
        .lean()
        .exec(),
      this.orderModel.countDocuments(filter).exec(),
    ]);
    return { items: items as unknown as OrderDocument[], total, page, perPage, pages: Math.max(1, Math.ceil(total / perPage)) };
  }

  async countByStatus(status: OrderStatus) {
    return this.orderModel.countDocuments({ status }).exec();
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

  /** Total order value (not commission) an affiliate has driven, lifetime — the basis for performance tiers. */
  async lifetimeSalesForAffiliate(affiliateId: string): Promise<number> {
    const orders = await this.findForAffiliate(affiliateId);
    return orders.reduce((sum, o) => sum + o.subtotal, 0);
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

  /** Marks every given order's commission paid in one write — powers admin bulk-pay and payout batches. */
  async markCommissionsPaidBulk(orderIds: string[]) {
    return this.orderModel
      .updateMany(
        { _id: { $in: orderIds.map((id) => new Types.ObjectId(id)) } },
        { $set: { commissionStatus: 'paid', commissionPaidAt: new Date() } },
      )
      .exec();
  }

  /** Per-day pending/paid commission totals for one affiliate — feeds the portal earnings-trend chart. */
  async commissionTrendForAffiliate(affiliateId: string, days: number) {
    return this.commissionTrend(days, new Types.ObjectId(affiliateId));
  }

  /** Per-day pending/paid commission totals, optionally scoped to one affiliate — feeds admin + portal charts. */
  async commissionTrend(days: number, affiliateId?: Types.ObjectId) {
    const since = new Date(Date.now() - days * 86400000);
    const match: Record<string, unknown> = { createdAt: { $gte: since }, commissionStatus: { $exists: true } };
    if (affiliateId) match.affiliateId = affiliateId;
    const rows = await this.orderModel.aggregate([
      { $match: match },
      {
        $group: {
          _id: { date: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } }, status: '$commissionStatus' },
          amount: { $sum: '$commissionAmount' },
        },
      },
      { $sort: { '_id.date': 1 } },
    ]);
    const byDate = new Map<string, { date: string; pending: number; paid: number }>();
    for (const row of rows) {
      const date = row._id.date as string;
      const status = row._id.status as string;
      const entry = byDate.get(date) ?? { date, pending: 0, paid: 0 };
      if (status === 'pending') entry.pending = row.amount as number;
      if (status === 'paid') entry.paid = row.amount as number;
      byDate.set(date, entry);
    }
    return Array.from(byDate.values()).sort((a, b) => a.date.localeCompare(b.date));
  }

  /** Program-wide paid/pending commission totals across every affiliate — admin dashboard headline numbers. */
  async programCommissionSummary() {
    const rows = await this.orderModel.aggregate([
      { $match: { commissionStatus: { $exists: true } } },
      { $group: { _id: '$commissionStatus', amount: { $sum: '$commissionAmount' }, count: { $sum: 1 } } },
    ]);
    const summary = { pending: 0, paid: 0, reversed: 0, orderCount: 0 };
    for (const row of rows) {
      const status = row._id as string;
      if (status === 'pending') summary.pending = row.amount as number;
      else if (status === 'paid') summary.paid = row.amount as number;
      else if (status === 'reversed' || status === 'rejected') summary.reversed += row.amount as number;
      summary.orderCount += row.count as number;
    }
    return summary;
  }

  /** Top affiliates by lifetime commission — admin dashboard leaderboard. */
  async affiliateLeaderboard(limit = 10) {
    const rows = await this.orderModel.aggregate([
      { $match: { affiliateId: { $exists: true, $ne: null } } },
      {
        $group: {
          _id: '$affiliateId',
          lifetime: { $sum: '$commissionAmount' },
          pending: { $sum: { $cond: [{ $eq: ['$commissionStatus', 'pending'] }, '$commissionAmount', 0] } },
          paid: { $sum: { $cond: [{ $eq: ['$commissionStatus', 'paid'] }, '$commissionAmount', 0] } },
          orders: { $sum: 1 },
        },
      },
      { $sort: { lifetime: -1 } },
      { $limit: limit },
      {
        $lookup: {
          from: 'affiliates',
          localField: '_id',
          foreignField: '_id',
          as: 'affiliate',
        },
      },
      { $unwind: '$affiliate' },
      {
        $project: {
          _id: 0,
          affiliateId: '$_id',
          fullName: '$affiliate.fullName',
          email: '$affiliate.email',
          lifetime: 1,
          pending: 1,
          paid: 1,
          orders: 1,
        },
      },
    ]);
    return rows as Array<{
      affiliateId: Types.ObjectId;
      fullName: string;
      email: string;
      lifetime: number;
      pending: number;
      paid: number;
      orders: number;
    }>;
  }

  /** Pending-commission orders by id — used to validate + total a payout batch selection. */
  async findPendingCommissionOrdersByIds(orderIds: string[]) {
    return this.orderModel
      .find({ _id: { $in: orderIds.map((id) => new Types.ObjectId(id)) }, commissionStatus: 'pending' })
      .lean()
      .exec();
  }

  /** All commission-bearing orders in a date range, optionally filtered — CSV export source. */
  async commissionExportRows(opts: { from?: Date; to?: Date; affiliateId?: string; status?: string }) {
    const match: Record<string, unknown> = { commissionStatus: { $exists: true } };
    if (opts.from || opts.to) {
      match.createdAt = {};
      if (opts.from) (match.createdAt as Record<string, Date>).$gte = opts.from;
      if (opts.to) (match.createdAt as Record<string, Date>).$lte = opts.to;
    }
    if (opts.affiliateId) match.affiliateId = new Types.ObjectId(opts.affiliateId);
    if (opts.status) match.commissionStatus = opts.status;
    return this.orderModel
      .find(match)
      .populate('affiliateId', 'fullName email')
      .sort({ createdAt: -1 })
      .lean()
      .exec();
  }
}
