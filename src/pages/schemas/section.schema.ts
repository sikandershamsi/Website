import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { SchemaTypes } from 'mongoose';

@Schema({ _id: false })
export class Section {
  @Prop({ required: true })
  key: string;

  @Prop({ required: true })
  type: string;

  @Prop({ required: true, default: 0 })
  order: number;

  @Prop({ default: true })
  visible: boolean;

  @Prop({ type: SchemaTypes.Mixed, default: {} })
  data: Record<string, unknown>;
}

export const SectionSchema = SchemaFactory.createForClass(Section);
