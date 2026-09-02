import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, SchemaTypes, Types } from 'mongoose';

export type CartDocument = HydratedDocument<Cart>;

@Schema({ _id: false })
export class CartLine {
  @Prop({ type: SchemaTypes.ObjectId, ref: 'Product' })
  productId: Types.ObjectId;

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
export const CartLineSchema = SchemaFactory.createForClass(CartLine);

@Schema({ timestamps: { createdAt: false, updatedAt: true } })
export class Cart {
  @Prop({ index: { unique: true, sparse: true } })
  guestCartId?: string;

  @Prop({ type: SchemaTypes.ObjectId, ref: 'User', index: { unique: true, sparse: true } })
  userId?: Types.ObjectId;

  @Prop({ type: [CartLineSchema], default: [] })
  lines: CartLine[];
}

export const CartSchema = SchemaFactory.createForClass(Cart);
