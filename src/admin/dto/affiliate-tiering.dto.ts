import { Transform } from 'class-transformer';
import { IsBoolean, IsNumber, IsOptional, Min } from 'class-validator';

export class SetTieringDto {
  @Transform(({ value }) => value === 'true' || value === true)
  @IsBoolean()
  tieringEnabled: boolean;
}

export class SetMinPayoutThresholdDto {
  @IsOptional()
  @Transform(({ value }) => (value === '' || value === undefined ? undefined : Number(value)))
  @IsNumber()
  @Min(0)
  minPayoutThreshold?: number;
}
