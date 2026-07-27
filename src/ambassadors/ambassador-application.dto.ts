import { IsEmail, IsIn, IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

const disciplineSlugs = [
  'show-jumping',
  'dressage',
  'racing',
  'eventing',
  'western-reining',
  'polo',
  'four-in-hand',
  'other',
];

export class AmbassadorApplicationDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(120)
  fullName: string;

  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  @MaxLength(40)
  phone?: string;

  @IsIn(disciplineSlugs)
  discipline: string;

  @IsOptional()
  @IsString()
  @MaxLength(200)
  socialHandle?: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(2000)
  message: string;
}
