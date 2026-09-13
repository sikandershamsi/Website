import { Transform } from 'class-transformer';
import { IsIn, IsInt, IsOptional, IsString, MinLength } from 'class-validator';

export class MarketingAssetDto {
  @IsIn(['image', 'copy'])
  type: 'image' | 'copy';

  @IsString() @MinLength(1)
  title: string;

  @IsString() @MinLength(1)
  content: string;

  @IsOptional()
  @Transform(({ value }) => (value === '' || value === undefined ? 0 : Number(value)))
  @IsInt()
  order?: number;
}
