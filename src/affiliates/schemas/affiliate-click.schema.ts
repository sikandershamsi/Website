import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, SchemaTypes, Types } from 'mongoose';

export type AffiliateClickDocument = HydratedDocument<AffiliateClick>;

/** One document per referral-link visit. Source of truth for click trend charts and future fraud signals;
 * `Affiliate.clickCount` stays as a fast denormalized total kept in sync alongside this. */
@Schema({ timestamps: { createdAt: true, updatedAt: false } })
export class AffiliateClick {
  @Prop({ type: SchemaTypes.ObjectId, ref: 'Affiliate', required: true, index: true })
  affiliateId: Types.ObjectId;

  @Prop({ required: true, index: true })
  code: string;

  @Prop()
  referrer?: string;

  /** SHA-256 of the visitor IP, truncated to 16 hex chars — enough to spot repeat-IP bursts without storing a real IP. */
  @Prop()
  ipHash?: string;

  createdAt?: Date;
}

export const AffiliateClickSchema = SchemaFactory.createForClass(AffiliateClick);
AffiliateClickSchema.index({ affiliateId: 1, createdAt: -1 });
