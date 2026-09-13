import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { randomBytes } from 'crypto';
import { Affiliate, AffiliateDocument, AffiliateStatus } from './schemas/affiliate.schema';
import { AffiliateClick, AffiliateClickDocument } from './schemas/affiliate-click.schema';
import { AffiliateGroup, AffiliateGroupDocument } from './schemas/affiliate-group.schema';

const SALT_ROUNDS = 12;

export interface DayCount {
  date: string;
  clicks: number;
}

export interface AffiliatePage {
  items: AffiliateDocument[];
  total: number;
  page: number;
  perPage: number;
  pages: number;
}

function slugifyName(name: string): string {
  return (
    name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')
      .slice(0, 24) || 'affiliate'
  );
}

@Injectable()
export class AffiliatesService {
  constructor(
    @InjectModel(Affiliate.name) private readonly affiliateModel: Model<AffiliateDocument>,
    @InjectModel(AffiliateClick.name) private readonly clickModel: Model<AffiliateClickDocument>,
    @InjectModel(AffiliateGroup.name) private readonly groupModel: Model<AffiliateGroupDocument>,
  ) {}

  async createApplication(dto: Record<string, unknown> & { email: string; fullName: string }) {
    const email = dto.email.toLowerCase().trim();
    const existing = await this.affiliateModel.findOne({ email }).exec();
    if (existing) {
      throw new ConflictException('An application with this email already exists.');
    }
    return this.affiliateModel.create({ ...dto, email, status: 'pending' });
  }

  async findAll(status?: AffiliateStatus) {
    const query = status ? { status } : {};
    return this.affiliateModel.find(query).sort({ createdAt: -1 }).lean().exec();
  }

  /** Searchable, paginated affiliate list for the admin index. */
  async findAllPaged(opts: { status?: AffiliateStatus; q?: string; page?: number; perPage?: number }): Promise<AffiliatePage> {
    const perPage = opts.perPage && opts.perPage > 0 ? opts.perPage : 25;
    const page = opts.page && opts.page > 0 ? opts.page : 1;
    const filter: Record<string, unknown> = {};
    if (opts.status) filter.status = opts.status;
    if (opts.q?.trim()) {
      const escaped = opts.q.trim().replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const re = new RegExp(escaped, 'i');
      filter.$or = [{ fullName: re }, { email: re }];
    }
    const [items, total] = await Promise.all([
      this.affiliateModel
        .find(filter)
        .sort({ createdAt: -1 })
        .skip((page - 1) * perPage)
        .limit(perPage)
        .lean()
        .exec(),
      this.affiliateModel.countDocuments(filter).exec(),
    ]);
    return { items: items as unknown as AffiliateDocument[], total, page, perPage, pages: Math.max(1, Math.ceil(total / perPage)) };
  }

  /** All affiliates matching a filter, unpaginated — for bulk actions and CSV export. */
  async findAllIds(status?: AffiliateStatus) {
    const query = status ? { status } : {};
    return this.affiliateModel.find(query).select('_id').lean().exec();
  }

  async findById(id: string) {
    return this.affiliateModel.findById(id).lean().exec();
  }

  async findByReferralCode(code: string) {
    return this.affiliateModel.findOne({ referralCode: code, status: 'approved' }).lean().exec();
  }

  private async generateReferralCode(fullName: string): Promise<string> {
    const base = slugifyName(fullName);
    for (let attempt = 0; attempt < 8; attempt++) {
      const suffix = randomBytes(2).toString('hex');
      const candidate = `${base}-${suffix}`;
      const exists = await this.affiliateModel.exists({ referralCode: candidate });
      if (!exists) return candidate;
    }
    return `${base}-${Date.now()}`;
  }

  /** Approves a pending application, generating a referral code and a one-time password (returned in plaintext for the admin to hand off). */
  async approve(id: string): Promise<{ affiliate: AffiliateDocument; plaintextPassword: string }> {
    const affiliate = await this.affiliateModel.findById(id).exec();
    if (!affiliate) throw new NotFoundException('Affiliate not found');

    const plaintextPassword = randomBytes(9).toString('base64').replace(/[+/=]/g, '').slice(0, 12);
    affiliate.passwordHash = await bcrypt.hash(plaintextPassword, SALT_ROUNDS);
    affiliate.referralCode = affiliate.referralCode || (await this.generateReferralCode(affiliate.fullName));
    affiliate.status = 'approved';
    affiliate.approvedAt = new Date();
    await affiliate.save();

    return { affiliate, plaintextPassword };
  }

  async reject(id: string) {
    return this.affiliateModel.findByIdAndUpdate(id, { $set: { status: 'rejected' } }, { returnDocument: 'after' }).exec();
  }

  /** Approves every given pending application. Each gets its own referral code and one-time password;
   * returns the list so the admin can hand off/download all the credentials from a single screen. */
  async bulkApprove(ids: string[]): Promise<Array<{ affiliate: AffiliateDocument; plaintextPassword: string }>> {
    const results: Array<{ affiliate: AffiliateDocument; plaintextPassword: string }> = [];
    for (const id of ids) {
      try {
        results.push(await this.approve(id));
      } catch {
        // skip affiliates that no longer exist or were already handled
      }
    }
    return results;
  }

  async bulkReject(ids: string[]): Promise<number> {
    const res = await this.affiliateModel.updateMany({ _id: { $in: ids } }, { $set: { status: 'rejected' } }).exec();
    return res.modifiedCount;
  }

  /** Pauses an approved affiliate: blocks login and new commissions while keeping all history intact. */
  async suspend(id: string) {
    const affiliate = await this.affiliateModel.findById(id).exec();
    if (!affiliate) throw new NotFoundException('Affiliate not found');
    if (affiliate.status !== 'approved') throw new ConflictException('Only an approved affiliate can be suspended.');
    affiliate.statusBeforeSuspend = 'approved';
    affiliate.status = 'suspended';
    await affiliate.save();
    return affiliate;
  }

  async reactivate(id: string) {
    return this.affiliateModel
      .findByIdAndUpdate(id, { $set: { status: 'approved' }, $unset: { statusBeforeSuspend: 1 } }, { returnDocument: 'after' })
      .exec();
  }

  // ---- Groups ----

  async createGroup(data: { name: string; description?: string; defaultCommissionRate: number }) {
    return this.groupModel.create(data);
  }

  async listGroups() {
    return this.groupModel.find().sort({ name: 1 }).lean().exec();
  }

  async deleteGroup(id: string) {
    await this.affiliateModel.updateMany({ groupId: id }, { $unset: { groupId: 1 } }).exec();
    await this.groupModel.findByIdAndDelete(id).exec();
  }

  /** Assigns (or clears, if groupId is empty) an affiliate's group. When a group is assigned, its default
   * rate becomes the affiliate's commission rate unless keepOwnRate is set. */
  async assignGroup(id: string, groupId: string | undefined, keepOwnRate = false) {
    if (!groupId) {
      return this.affiliateModel.findByIdAndUpdate(id, { $unset: { groupId: 1 } }, { returnDocument: 'after' }).exec();
    }
    const update: Record<string, unknown> = { groupId };
    if (!keepOwnRate) {
      const group = await this.groupModel.findById(groupId).lean().exec();
      if (group) update.commissionRate = group.defaultCommissionRate;
    }
    return this.affiliateModel.findByIdAndUpdate(id, { $set: update }, { returnDocument: 'after' }).exec();
  }

  async setCommissionRate(id: string, rate: number) {
    return this.affiliateModel.findByIdAndUpdate(id, { $set: { commissionRate: rate } }, { returnDocument: 'after' }).exec();
  }

  async setTieringEnabled(id: string, enabled: boolean) {
    return this.affiliateModel.findByIdAndUpdate(id, { $set: { tieringEnabled: enabled } }, { returnDocument: 'after' }).exec();
  }

  async setMinPayoutThreshold(id: string, threshold?: number) {
    if (threshold === undefined) {
      return this.affiliateModel.findByIdAndUpdate(id, { $unset: { minPayoutThreshold: 1 } }, { returnDocument: 'after' }).exec();
    }
    return this.affiliateModel.findByIdAndUpdate(id, { $set: { minPayoutThreshold: threshold } }, { returnDocument: 'after' }).exec();
  }

  async validateLogin(email: string, password: string) {
    const affiliate = await this.affiliateModel.findOne({ email: email.toLowerCase().trim() }).exec();
    if (!affiliate || !affiliate.passwordHash) throw new UnauthorizedException('Invalid email or password.');
    if (affiliate.status !== 'approved') throw new UnauthorizedException('Invalid email or password.');
    const valid = await bcrypt.compare(password, affiliate.passwordHash);
    if (!valid) throw new UnauthorizedException('Invalid email or password.');
    return affiliate;
  }

  async countByStatus(status: AffiliateStatus) {
    return this.affiliateModel.countDocuments({ status }).exec();
  }

  /** Idempotent: creates an approved affiliate with a known password for seeding/dev use, or no-ops if the email already exists. */
  async seedApproved(data: Record<string, unknown> & { email: string; fullName: string }, plaintextPassword: string) {
    const email = data.email.toLowerCase().trim();
    const existing = await this.affiliateModel.findOne({ email }).exec();
    if (existing) return { affiliate: existing, created: false };

    const passwordHash = await bcrypt.hash(plaintextPassword, SALT_ROUNDS);
    const referralCode = await this.generateReferralCode(data.fullName);
    const affiliate = await this.affiliateModel.create({
      ...data,
      email,
      passwordHash,
      referralCode,
      status: 'approved',
      approvedAt: new Date(),
    });
    return { affiliate, created: true };
  }

  /** Fire-and-forget click tracking for a referral link visit; silently no-ops for unknown/unapproved codes.
   * Writes a timestamped event (source of truth for trend charts) and keeps the fast `clickCount` total in sync. */
  async recordClick(code: string, meta?: { referrer?: string; ipHash?: string }): Promise<void> {
    const affiliate = await this.affiliateModel
      .findOneAndUpdate({ referralCode: code, status: 'approved' }, { $inc: { clickCount: 1 } })
      .exec();
    if (!affiliate) return;
    await this.clickModel.create({
      affiliateId: affiliate._id,
      code,
      referrer: meta?.referrer?.slice(0, 500),
      ipHash: meta?.ipHash,
    });
  }

  /** Per-day click counts for one affiliate over a trailing window — feeds the portal's click/conversion chart. */
  async clickTrend(affiliateId: string, days: number): Promise<DayCount[]> {
    const since = new Date(Date.now() - days * 86400000);
    const rows = await this.clickModel.aggregate([
      { $match: { affiliateId: new Types.ObjectId(affiliateId), createdAt: { $gte: since } } },
      { $group: { _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } }, clicks: { $sum: 1 } } },
      { $sort: { _id: 1 } },
    ]);
    return rows.map((r) => ({ date: r._id as string, clicks: r.clicks as number }));
  }

  /** Same as clickTrend but across every affiliate — feeds the admin program-wide dashboard. */
  async programClickTrend(days: number): Promise<DayCount[]> {
    const since = new Date(Date.now() - days * 86400000);
    const rows = await this.clickModel.aggregate([
      { $match: { createdAt: { $gte: since } } },
      { $group: { _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } }, clicks: { $sum: 1 } } },
      { $sort: { _id: 1 } },
    ]);
    return rows.map((r) => ({ date: r._id as string, clicks: r.clicks as number }));
  }

  /** Click bursts from a single hashed IP against one affiliate's link, trailing window — a fraud-review signal, not a block. */
  async clickAnomalies(affiliateId: string, days = 7, minClicksFromSameIp = 20) {
    const since = new Date(Date.now() - days * 86400000);
    const rows = await this.clickModel.aggregate([
      { $match: { affiliateId: new Types.ObjectId(affiliateId), createdAt: { $gte: since }, ipHash: { $ne: null } } },
      { $group: { _id: '$ipHash', clicks: { $sum: 1 }, lastSeen: { $max: '$createdAt' } } },
      { $match: { clicks: { $gte: minClicksFromSameIp } } },
      { $sort: { clicks: -1 } },
      { $limit: 10 },
    ]);
    return rows.map((r) => ({ ipHash: r._id as string, clicks: r.clicks as number, lastSeen: r.lastSeen as Date }));
  }

  async changePassword(id: string, currentPassword: string, newPassword: string) {
    const affiliate = await this.affiliateModel.findById(id).exec();
    if (!affiliate || !affiliate.passwordHash) throw new NotFoundException('Affiliate not found');
    const valid = await bcrypt.compare(currentPassword, affiliate.passwordHash);
    if (!valid) throw new UnauthorizedException('Current password is incorrect.');
    affiliate.passwordHash = await bcrypt.hash(newPassword, SALT_ROUNDS);
    await affiliate.save();
  }

  async setPayoutEmail(id: string, payoutEmail: string) {
    return this.affiliateModel.findByIdAndUpdate(id, { $set: { payoutEmail } }, { returnDocument: 'after' }).exec();
  }
}
