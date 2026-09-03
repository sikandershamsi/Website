import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type AffiliateDocument = HydratedDocument<Affiliate>;
export type AffiliateStatus = 'pending' | 'approved' | 'rejected';

@Schema({ timestamps: true })
export class Affiliate {
  // Application fields (mirror AffiliateApplicationDto)
  @Prop({ required: true }) fullName: string;
  @Prop() businessName?: string;
  @Prop() title?: string;

  @Prop({ required: true, unique: true, lowercase: true, trim: true })
  email: string;

  @Prop() phone?: string;
  @Prop() website?: string;
  @Prop() facebook?: string;
  @Prop() instagram?: string;
  @Prop() youtube?: string;
  @Prop() businessAddress?: string;
  @Prop() city?: string;
  @Prop() state?: string;
  @Prop() zip?: string;
  @Prop() country?: string;

  @Prop({ required: true }) profession: string;
  @Prop({ required: true }) experience: string;
  @Prop({ required: true }) reach: string;
  @Prop({ type: [String], default: [] }) disciplines: string[];
  @Prop({ required: true }) currentlyRecommends: string;
  @Prop() currentBrands?: string;
  @Prop({ type: [String], default: [] }) whyAnimalife: string[];
  @Prop({ type: [String], default: [] }) productInterest: string[];
  @Prop({ type: [String], default: [] }) promotion: string[];
  @Prop({ required: true }) salesGoal: string;
  @Prop({ required: true }) personalStatement: string;
  @Prop({ default: false }) agree: boolean;

  // Portal / account fields
  @Prop({ required: true, enum: ['pending', 'approved', 'rejected'], default: 'pending' })
  status: AffiliateStatus;

  @Prop() passwordHash?: string;

  @Prop({ unique: true, sparse: true })
  referralCode?: string;

  @Prop({ required: true, default: 0.2 })
  commissionRate: number;

  @Prop() approvedAt?: Date;
}

export const AffiliateSchema = SchemaFactory.createForClass(Affiliate);
