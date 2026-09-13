import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, SchemaTypes, Types } from 'mongoose';

export type AffiliateActivityDocument = HydratedDocument<AffiliateActivity>;
export type AffiliateActivityType = 'signup' | 'approved' | 'new_referral' | 'payout_sent';

/** A lightweight event log reused as both the email trigger record and the in-portal activity feed's
 * data source — one write, two surfaces. */
@Schema({ timestamps: { createdAt: true, updatedAt: false } })
export class AffiliateActivity {
  @Prop({ type: SchemaTypes.ObjectId, ref: 'Affiliate', required: true, index: true })
  affiliateId: Types.ObjectId;

  @Prop({ required: true, enum: ['signup', 'approved', 'new_referral', 'payout_sent'] })
  type: AffiliateActivityType;

  @Prop({ required: true })
  message: string;

  createdAt?: Date;
}

export const AffiliateActivitySchema = SchemaFactory.createForClass(AffiliateActivity);
