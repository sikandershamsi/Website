import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator';

export class ChangeAffiliatePasswordDto {
  @IsString()
  currentPassword: string;

  @IsString()
  @MinLength(8)
  newPassword: string;
}

export class SetPayoutEmailDto {
  @IsEmail()
  payoutEmail: string;
}

export class CreateAffiliateLinkDto {
  @IsString() @MinLength(1)
  name: string;

  @IsOptional() @IsString()
  destinationPath?: string;
}
