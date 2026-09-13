import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type AffiliateGroupDocument = HydratedDocument<AffiliateGroup>;

/** A segment (e.g. "Ambassadors", "Veterinary Partners") an admin can assign affiliates to, carrying its own
 * default commission rate. Assigning a group can override an individual affiliate's flat rate. */
@Schema({ timestamps: true })
export class AffiliateGroup {
  @Prop({ required: true, unique: true, trim: true })
  name: string;

  @Prop()
  description?: string;

  @Prop({ required: true, default: 0.2 })
  defaultCommissionRate: number;
}

export const AffiliateGroupSchema = SchemaFactory.createForClass(AffiliateGroup);
