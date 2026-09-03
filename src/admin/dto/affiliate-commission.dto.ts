import { Transform } from 'class-transformer';
import { IsNumber, Max, Min } from 'class-validator';

/** Admin enters a whole-number percent (e.g. 20); stored on the Affiliate as a decimal (0.2). */
export class AffiliateCommissionDto {
  @Transform(({ value }) => Number(value) / 100)
  @IsNumber()
  @Min(0)
  @Max(1)
  commissionRate: number;
}
