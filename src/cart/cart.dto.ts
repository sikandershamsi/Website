import { IsIn, IsInt, IsOptional, IsString, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { products } from '../content/products.data';

const slugs = products.map((p) => p.slug);

export class AddToCartDto {
  @IsIn(slugs)
  slug: string;

  @Type(() => Number)
  @IsInt()
  @Min(1)
  qty: number;

  @IsOptional()
  @IsString()
  redirectTo?: string;
}

export class UpdateCartDto {
  @IsIn(slugs)
  slug: string;

  @Type(() => Number)
  @IsInt()
  @Min(0)
  qty: number;
}
