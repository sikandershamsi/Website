import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, SchemaTypes, Types } from 'mongoose';

export type OrderDocument = HydratedDocument<Order>;
export type OrderStatus = 'pending' | 'paid' | 'fulfilled' | 'cancelled' | 'refunded';
export type OrderSource = 'checkout' | 'subscription_renewal';

@Schema({ _id: false })
export class OrderLine {
  @Prop({ type: SchemaTypes.ObjectId, ref: 'Product' })
  productId?: Types.ObjectId;

  @Prop({ required: true })
  slug: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  price: number;

  @Prop()
  size?: string;

  @Prop()
  image?: string;

  @Prop({ required: true, default: 1 })
  qty: number;

  @Prop({ default: false })
  isSubscription: boolean;
}
const OrderLineSchema = SchemaFactory.createForClass(OrderLine);

@Schema({ _id: false })
export class OrderShipping {
  @Prop() fullName?: string;
  @Prop() email?: string;
  @Prop() address?: string;
  @Prop() city?: string;
  @Prop() state?: string;
  @Prop() zip?: string;
  @Prop() country?: string;
}
const OrderShippingSchema = SchemaFactory.createForClass(OrderShipping);

@Schema({ _id: false })
export class OrderStripeRefs {
  @Prop() checkoutSessionId?: string;
  @Prop() paymentIntentId?: string;
  @Prop() subscriptionId?: string;
  @Prop() customerId?: string;
}
const OrderStripeRefsSchema = SchemaFactory.createForClass(OrderStripeRefs);

@Schema({ timestamps: true })
export class Order {
  @Prop({ required: true, unique: true })
  orderNumber: string;

  @Prop({ type: SchemaTypes.ObjectId, ref: 'User' })
  user?: Types.ObjectId;

  @Prop()
  guestEmail?: string;

  @Prop({ type: [OrderLineSchema], default: [] })
  lines: OrderLine[];

  @Prop({ required: true })
  subtotal: number;

  @Prop({ type: OrderShippingSchema })
  shipping?: OrderShipping;

  @Prop({ required: true, enum: ['pending', 'paid', 'fulfilled', 'cancelled', 'refunded'], default: 'pending' })
  status: OrderStatus;

  @Prop({ required: true, enum: ['checkout', 'subscription_renewal'], default: 'checkout' })
  source: OrderSource;

  @Prop({ type: OrderStripeRefsSchema, default: () => ({}) })
  stripe: OrderStripeRefs;

  @Prop({ default: 'usd' })
  currency: string;

  @Prop()
  paidAt?: Date;

  @Prop()
  referralCode?: string;

  @Prop({ type: SchemaTypes.ObjectId, ref: 'Affiliate' })
  affiliateId?: Types.ObjectId;

  @Prop()
  commissionAmount?: number;

  @Prop({ enum: ['pending', 'paid'] })
  commissionStatus?: 'pending' | 'paid';
}

export const OrderSchema = SchemaFactory.createForClass(Order);
