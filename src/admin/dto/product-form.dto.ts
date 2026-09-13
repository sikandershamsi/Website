import { Transform } from 'class-transformer';
import { IsArray, IsBoolean, IsNumber, IsOptional, IsString, MinLength } from 'class-validator';

function toStringArray({ value }: { value: unknown }): string[] {
  if (Array.isArray(value)) return value.map(String).filter((v) => v.trim().length > 0);
  if (typeof value === 'string' && value.trim().length > 0) {
    return value
      .split('\n')
      .map((v) => v.trim())
      .filter(Boolean);
  }
  return [];
}

/** Parses "Size Label | Price" lines (one per row) into variant objects. Rows missing a valid price are dropped. */
function toVariants({ value }: { value: unknown }): { size: string; price: number }[] {
  if (typeof value !== 'string' || !value.trim()) return [];
  return value
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const [size, priceRaw] = line.split('|').map((v) => v.trim());
      return { size, price: Number(priceRaw) };
    })
    .filter((v) => v.size && Number.isFinite(v.price));
}

export class ProductFormDto {
  @IsString() @MinLength(1)
  slug: string;

  @IsString() @MinLength(1)
  name: string;

  @IsOptional() @IsString()
  trademark?: string;

  @IsOptional() @IsString()
  category?: string;

  @IsOptional() @IsString()
  categorySlug?: string;

  @IsOptional() @IsString()
  tagline?: string;

  @Transform(({ value }) => Number(value))
  @IsNumber()
  price: number;

  @IsOptional() @IsString()
  size?: string;

  @Transform(toVariants)
  @IsArray()
  variants: { size: string; price: number }[];

  @IsOptional() @IsString()
  heroStat?: string;

  @IsOptional() @IsString()
  image?: string;

  @IsOptional() @IsString()
  description?: string;

  @IsOptional() @IsString()
  accent?: string;

  @Transform(toStringArray)
  @IsArray()
  keyIngredients: string[];

  @Transform(toStringArray)
  @IsArray()
  supports: string[];

  @IsOptional()
  @Transform(({ value }) => value === 'true' || value === true)
  @IsBoolean()
  active: boolean;
}
