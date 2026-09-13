import { Transform } from 'class-transformer';
import { IsNumber, IsOptional, IsString, Max, Min, MinLength } from 'class-validator';

export class AffiliateGroupDto {
  @IsString() @MinLength(1)
  name: string;

  @IsOptional() @IsString()
  description?: string;

  @Transform(({ value }) => Number(value) / 100)
  @IsNumber()
  @Min(0)
  @Max(1)
  defaultCommissionRate: number;
}

export class AssignGroupDto {
  @IsOptional() @IsString()
  groupId?: string;
}
