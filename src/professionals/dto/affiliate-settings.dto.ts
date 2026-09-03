import { IsEmail, IsString, MinLength } from 'class-validator';

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
