import { Transform } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsEmail,
  IsIn,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

const toArray = ({ value }: { value: unknown }) =>
  value === undefined ? [] : Array.isArray(value) ? value : [value];

const toBool = ({ value }: { value: unknown }) => value === 'on' || value === true || value === 'true';

export class AffiliateApplicationDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(120)
  fullName: string;

  @IsOptional()
  @IsString()
  @MaxLength(120)
  businessName?: string;

  @IsOptional()
  @IsString()
  @MaxLength(120)
  title?: string;

  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  @MaxLength(40)
  phone?: string;

  @IsOptional()
  @IsString()
  @MaxLength(200)
  website?: string;

  @IsOptional()
  @IsString()
  @MaxLength(200)
  facebook?: string;

  @IsOptional()
  @IsString()
  @MaxLength(200)
  instagram?: string;

  @IsOptional()
  @IsString()
  @MaxLength(200)
  youtube?: string;

  @IsOptional()
  @IsString()
  @MaxLength(200)
  businessAddress?: string;

  @IsOptional()
  @IsString()
  @MaxLength(80)
  city?: string;

  @IsOptional()
  @IsString()
  @MaxLength(80)
  state?: string;

  @IsOptional()
  @IsString()
  @MaxLength(20)
  zip?: string;

  @IsOptional()
  @IsString()
  @MaxLength(80)
  country?: string;

  @IsIn([
    'trainer',
    'veterinarian',
    'equine-therapist',
    'breeder',
    'professional-rider',
    'amateur-rider',
    'tack-store-owner',
    'equine-influencer',
    'farm-owner-manager',
    'equine-nutritionist',
    'equine-health-professional',
    'other',
  ])
  profession: string;

  @IsIn(['under-2', '2-5', '6-10', '11-20', '20-plus'])
  experience: string;

  @IsIn(['under-25', '25-50', '51-100', '101-250', '251-500', '500-1000', 'over-1000'])
  reach: string;

  @IsOptional()
  @Transform(toArray)
  @IsArray()
  disciplines?: string[];

  @IsIn(['yes', 'no'])
  currentlyRecommends: string;

  @IsOptional()
  @IsString()
  @MaxLength(500)
  currentBrands?: string;

  @IsOptional()
  @Transform(toArray)
  @IsArray()
  whyAnimalife?: string[];

  @IsOptional()
  @Transform(toArray)
  @IsArray()
  productInterest?: string[];

  @IsOptional()
  @Transform(toArray)
  @IsArray()
  promotion?: string[];

  @IsIn(['1-10', '11-25', '26-50', '51-100', '101-250', '250-plus'])
  salesGoal: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(3000)
  personalStatement: string;

  @Transform(toBool)
  @IsBoolean()
  agree: boolean;
}
