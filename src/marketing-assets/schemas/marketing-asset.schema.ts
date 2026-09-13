import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type MarketingAssetDocument = HydratedDocument<MarketingAsset>;
export type MarketingAssetType = 'image' | 'copy';

/** A banner/image or a piece of swipe copy an admin can add to the affiliate Marketing Resources page
 * without a code deploy. Images reference an existing path under /public (e.g. /images/products/...)
 * rather than a raw upload — keeps this dependency-free while still being fully admin-editable. */
@Schema({ timestamps: true })
export class MarketingAsset {
  @Prop({ required: true, enum: ['image', 'copy'] })
  type: MarketingAssetType;

  @Prop({ required: true })
  title: string;

  /** Image path (type: image) or the copy text itself (type: copy). */
  @Prop({ required: true })
  content: string;

  @Prop({ default: 0 })
  order: number;
}

export const MarketingAssetSchema = SchemaFactory.createForClass(MarketingAsset);
