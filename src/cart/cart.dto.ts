import { IsBoolean, IsInt, IsOptional, IsString, Min } from 'class-validator';
import { Transform, Type } from 'class-transformer';

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
}

export class UpdateCartDto {
  @IsString()
  slug: string;

  @Type(() => Number)
  @IsInt()
  @Min(0)
  qty: number;
}
