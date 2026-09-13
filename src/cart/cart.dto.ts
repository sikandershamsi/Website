import { IsBoolean, IsIn, IsInt, IsOptional, IsString, Min } from 'class-validator';
import { Transform, Type } from 'class-transformer';
import { SUBSCRIPTION_FREQUENCIES } from './subscription-frequency';

const FREQUENCY_CODES = SUBSCRIPTION_FREQUENCIES.map((f) => f.code);

/** Handles HTML form values ("true"/"false" strings) correctly, unlike the naive Boolean() cast. */
function toBoolean({ value }: { value: unknown }): boolean | unknown {
  if (typeof value === 'boolean') return value;
  if (typeof value === 'string') return value.toLowerCase() === 'true';
  return value;
}

export class AddToCartDto {
  @IsString()
  slug: string;

  @Type(() => Number)
  @IsInt()
  @Min(1)
  qty: number;

  @IsOptional()
  @IsString()
  redirectTo?: string;

  @IsOptional()
  @Transform(toBoolean)
  @IsBoolean()
  isSubscription?: boolean;

  @IsOptional()
  @IsString()
  size?: string;

  @IsOptional()
  @IsIn(FREQUENCY_CODES)
  subscriptionFrequency?: string;
}

export class UpdateCartDto {
  @IsString()
  slug: string;

  @Type(() => Number)
  @IsInt()
  @Min(0)
  qty: number;

  @IsOptional()
  @IsString()
  size?: string;

  @IsOptional()
  @Transform(toBoolean)
  @IsBoolean()
  isSubscription?: boolean;

  @IsOptional()
  @IsIn(FREQUENCY_CODES)
  subscriptionFrequency?: string;
}
