import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

export type UserRole = 'customer' | 'admin';

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true, unique: true, lowercase: true, trim: true })
  email: string;

  @Prop({ required: true })
  passwordHash: string;

  @Prop({ trim: true })
  name?: string;

  @Prop({ required: true, enum: ['customer', 'admin'], default: 'customer' })
  role: UserRole;

  @Prop()
  stripeCustomerId?: string;

  @Prop({
    type: {
      fullName: String,
      address: String,
      city: String,
      state: String,
      zip: String,
      country: String,
    },
  })
  defaultAddress?: {
    fullName?: string;
    address?: string;
    city?: string;
    state?: string;
    zip?: string;
    country?: string;
  };
}

export const UserSchema = SchemaFactory.createForClass(User);
