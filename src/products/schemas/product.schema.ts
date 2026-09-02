import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, SchemaTypes } from 'mongoose';

export type ProductDocument = HydratedDocument<Product>;

@Schema({ _id: false })
export class ProductIngredient {
  @Prop() name: string;
  @Prop() origin: string;
  @Prop() image: string;
}
const ProductIngredientSchema = SchemaFactory.createForClass(ProductIngredient);

@Schema({ _id: false })
export class ProductFaq {
  @Prop() question: string;
  @Prop() answer: string;
}
const ProductFaqSchema = SchemaFactory.createForClass(ProductFaq);

@Schema({ _id: false })
export class ProductStripeLinks {
  @Prop() productId?: string;
  @Prop() oneTimePriceId?: string;
  @Prop() subscriptionPriceId?: string;
  @Prop({ default: 'month' }) subscriptionInterval: string;
}
const ProductStripeLinksSchema = SchemaFactory.createForClass(ProductStripeLinks);

/**
 * Typed fields cover commerce + admin-editable content. Everything else from the
 * original static Product shape (whatItIs, outcomes, comparison, descriptionShowcase,
 * kidneyShowcase, feedingRows, ...) lives in `marketingBlocks` untouched — those are
 * page-layout-specific blocks that don't need a dedicated admin form yet (Phase 2).
 */
@Schema({ timestamps: true })
export class Product {
  @Prop({ required: true, unique: true, trim: true })
  slug: string;

  @Prop({ required: true })
  name: string;

  @Prop()
  trademark?: string;

  @Prop()
  category?: string;

  @Prop({ index: true })
  categorySlug?: string;

  @Prop()
  tagline?: string;

  @Prop({ required: true })
  price: number;

  @Prop()
  size?: string;

  @Prop()
  heroStat?: string;

  @Prop()
  image?: string;

  @Prop()
  description?: string;

  @Prop({ type: [String], default: [] })
  keyIngredients: string[];

  @Prop({ type: [ProductIngredientSchema], default: [] })
  primaryIngredients: ProductIngredient[];

  @Prop()
  primaryIngredientsFooter?: string;

  @Prop({ type: [String], default: [] })
  supports: string[];

  @Prop({ type: [ProductFaqSchema], default: [] })
  faqs: ProductFaq[];

  @Prop()
  accent?: string;

  @Prop({ default: true })
  active: boolean;

  @Prop({ type: ProductStripeLinksSchema, default: () => ({}) })
  stripe: ProductStripeLinks;

  @Prop({ type: SchemaTypes.Mixed, default: {} })
  marketingBlocks: Record<string, unknown>;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
