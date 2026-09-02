import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Section, SectionSchema } from './section.schema';

export type PageDocument = HydratedDocument<Page>;

@Schema({ timestamps: true })
export class Page {
  @Prop({ required: true, unique: true })
  slug: string;

  @Prop({ required: true })
  title: string;

  @Prop({ type: [SectionSchema], default: [] })
  sections: Section[];
}

export const PageSchema = SchemaFactory.createForClass(Page);
