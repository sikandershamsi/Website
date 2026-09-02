import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CategoryDocument = HydratedDocument<Category>;

@Schema({ _id: false })
export class CategoryBenefit {
  @Prop() icon: string;
  @Prop() title: string;
  @Prop() body: string;
}
const CategoryBenefitSchema = SchemaFactory.createForClass(CategoryBenefit);

@Schema({ timestamps: true })
export class Category {
  @Prop({ required: true, unique: true, trim: true })
  slug: string;

  @Prop({ required: true })
  name: string;

  @Prop()
  short?: string;

  @Prop()
  strapline?: string;

  @Prop()
  accent?: string;

  @Prop()
  accentLabel?: string;

  @Prop()
  summary?: string;

  @Prop()
  image?: string;

  @Prop()
  panel?: string;

  @Prop()
  image2x?: string;

  @Prop()
  imageWidth?: number;

  @Prop()
  imageHeight?: number;

  @Prop()
  panelWidth?: number;

  @Prop()
  panelHeight?: number;

  @Prop()
  rangeLine?: string;

  @Prop()
  cta?: string;

  @Prop({ type: [CategoryBenefitSchema], default: [] })
  benefits: CategoryBenefit[];

  @Prop({ type: [String], default: [] })
  icons: string[];
}

export const CategorySchema = SchemaFactory.createForClass(Category);
