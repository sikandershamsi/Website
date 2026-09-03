import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { randomBytes } from 'crypto';
import { Affiliate, AffiliateDocument, AffiliateStatus } from './schemas/affiliate.schema';

const SALT_ROUNDS = 12;

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
  constructor(@InjectModel(Affiliate.name) private readonly affiliateModel: Model<AffiliateDocument>) {}

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

  async setCommissionRate(id: string, rate: number) {
    return this.affiliateModel.findByIdAndUpdate(id, { $set: { commissionRate: rate } }, { returnDocument: 'after' }).exec();
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

  /** Fire-and-forget click tracking for a referral link visit; silently no-ops for unknown/unapproved codes. */
  async recordClick(code: string): Promise<void> {
    await this.affiliateModel.updateOne({ referralCode: code, status: 'approved' }, { $inc: { clickCount: 1 } }).exec();
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
