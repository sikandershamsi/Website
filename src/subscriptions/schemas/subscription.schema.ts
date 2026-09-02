import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, SchemaTypes, Types } from 'mongoose';

export type SubscriptionDocument = HydratedDocument<Subscription>;
export type SubscriptionStatus = 'active' | 'trialing' | 'past_due' | 'canceled' | 'incomplete';

@Schema({ _id: false })
export class SubscriptionStripeRefs {
  @Prop({ required: true, unique: true })
  subscriptionId: string;

  @Prop({ required: true })
  customerId: string;

  @Prop({ required: true })
  priceId: string;
}
const SubscriptionStripeRefsSchema = SchemaFactory.createForClass(SubscriptionStripeRefs);

@Schema({ timestamps: true })
export class Subscription {
  @Prop({ type: SchemaTypes.ObjectId, ref: 'User', required: true })
  user: Types.ObjectId;

  @Prop({ type: SchemaTypes.ObjectId, ref: 'Product' })
  productId?: Types.ObjectId;

  @Prop({ required: true })
  productSlug: string;

  @Prop({ required: true })
  productName: string;

  @Prop({ type: SubscriptionStripeRefsSchema, required: true })
  stripe: SubscriptionStripeRefs;

  @Prop({
    required: true,
    enum: ['active', 'trialing', 'past_due', 'canceled', 'incomplete'],
    default: 'active',
  })
  status: SubscriptionStatus;

  @Prop({ default: 'month' })
  interval: string;

  @Prop({ default: 1 })
  quantity: number;

  @Prop()
  currentPeriodStart?: Date;

  @Prop()
  currentPeriodEnd?: Date;

  @Prop({ default: false })
  cancelAtPeriodEnd: boolean;
}

export const SubscriptionSchema = SchemaFactory.createForClass(Subscription);
