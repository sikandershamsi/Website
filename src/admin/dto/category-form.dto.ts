import { IsOptional, IsString, MinLength } from 'class-validator';

export class CategoryFormDto {
  @IsString() @MinLength(1)
  slug: string;

  @IsString() @MinLength(1)
  name: string;

  @IsOptional() @IsString() short?: string;
  @IsOptional() @IsString() strapline?: string;
  @IsOptional() @IsString() accent?: string;
  @IsOptional() @IsString() accentLabel?: string;
  @IsOptional() @IsString() summary?: string;
  @IsOptional() @IsString() image?: string;
  @IsOptional() @IsString() rangeLine?: string;
  @IsOptional() @IsString() cta?: string;
}
