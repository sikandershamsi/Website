import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, SchemaTypes, Types } from 'mongoose';

export type PayoutBatchDocument = HydratedDocument<PayoutBatch>;
export type PayoutMethod = 'manual' | 'stripe_connect';
export type PayoutBatchStatus = 'completed' | 'partial' | 'failed';

/** One record per payout run — an audit trail of who got paid, how much, and when, beyond the
 * per-order commissionStatus flag. Created by both the admin bulk "mark paid" action and, later,
 * real Stripe Connect transfers. */
@Schema({ timestamps: true })
export class PayoutBatch {
  @Prop({ required: true, enum: ['manual', 'stripe_connect'], default: 'manual' })
  method: PayoutMethod;

  @Prop({ required: true })
  totalAmount: number;

  @Prop({ type: [SchemaTypes.ObjectId], ref: 'Order', default: [] })
  orderIds: Types.ObjectId[];

  @Prop({ type: [SchemaTypes.ObjectId], ref: 'Affiliate', default: [] })
  affiliateIds: Types.ObjectId[];

  @Prop({ required: true, enum: ['completed', 'partial', 'failed'], default: 'completed' })
  status: PayoutBatchStatus;

  @Prop()
  notes?: string;

  createdAt?: Date;
}

export const PayoutBatchSchema = SchemaFactory.createForClass(PayoutBatch);
