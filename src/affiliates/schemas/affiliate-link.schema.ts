import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, SchemaTypes, Types } from 'mongoose';

export type AffiliateLinkDocument = HydratedDocument<AffiliateLink>;

/** A named campaign link an affiliate creates themselves (e.g. "Instagram bio", "Fall email blast"),
 * distinct from their one default referralCode, so they can tell which channel referrals came from. */
@Schema({ timestamps: true })
export class AffiliateLink {
  @Prop({ type: SchemaTypes.ObjectId, ref: 'Affiliate', required: true, index: true })
  affiliateId: Types.ObjectId;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  code: string;

  /** Optional path (e.g. "/shop/product/vetrofen") the link should land on; homepage if unset. */
  @Prop()
  destinationPath?: string;

  @Prop({ default: 0 })
  clickCount: number;
}

export const AffiliateLinkSchema = SchemaFactory.createForClass(AffiliateLink);
