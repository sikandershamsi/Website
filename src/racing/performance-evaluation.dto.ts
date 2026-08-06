import { Transform } from 'class-transformer';
import { IsBoolean, IsEmail, IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

const toArray = ({ value }: { value: unknown }) =>
  value === undefined ? [] : Array.isArray(value) ? value : [value];

const toBool = ({ value }: { value: unknown }) => value === 'on' || value === true || value === 'true';

const emptyToUndefined = ({ value }: { value: unknown }) => (value === '' ? undefined : value);

export class PerformanceEvaluationDto {
  // Section 1 — Applicant Information
  @IsNotEmpty() @IsString() @MaxLength(80) firstName: string;
  @IsNotEmpty() @IsString() @MaxLength(80) lastName: string;
  @IsOptional() @IsString() @MaxLength(120) farmName?: string;
  @IsOptional() @IsString() @MaxLength(60) position?: string;
  @IsOptional() @IsString() @MaxLength(60) positionOther?: string;
  @IsEmail() email: string;
  @IsNotEmpty() @IsString() @MaxLength(40) mobilePhone: string;
  @IsOptional() @IsString() @MaxLength(80) city?: string;
  @IsOptional() @IsString() @MaxLength(80) state?: string;
  @IsOptional() @IsString() @MaxLength(80) country?: string;
  @IsOptional() @IsString() @MaxLength(200) website?: string;
  @IsOptional() @IsString() @MaxLength(200) socialMedia?: string;

  // Section 2 — Racing Experience
  @IsOptional() @IsString() yearsTraining?: string;
  @IsOptional() @Transform(toArray) racingCircuits?: string[];
  @IsOptional() @IsString() @MaxLength(120) racingCircuitOther?: string;
  @IsOptional() @Transform(toArray) primaryBreed?: string[];
  @IsOptional() @IsString() @MaxLength(120) primaryBreedOther?: string;

  // Section 3 — Stable Profile
  @IsOptional() @IsString() horsesInTraining?: string;
  @IsOptional() @Transform(toArray) highestLevel?: string[];
  @IsOptional() @IsString() @MaxLength(200) biggestRaceWon?: string;

  // Section 4 — Stable Operations & Investment
  @IsOptional() @IsString() vetExpenditure?: string;
  @IsOptional() @IsString() feedExpenditure?: string;
  @IsOptional() @IsString() horsesRacingMonthly?: string;
  @IsOptional() @Transform(toArray) stableFocus?: string[];

  // Section 5 — Training & Management Practices
  @IsOptional() @Transform(toArray) trainingProgram?: string[];
  @IsOptional() @IsString() @MaxLength(500) currentSupplements?: string;
  @IsOptional() @IsString() @MaxLength(500) currentRecoveryProtocols?: string;
  @IsOptional() @IsString() raceDaySupplements?: string;
  @IsOptional() @IsString() @MaxLength(500) raceDaySupplementsList?: string;

  // Section 6 — Trial Horse Information
  @IsOptional() @IsString() @MaxLength(120) horse1Name?: string;
  @IsOptional() @IsString() @MaxLength(20) horse1Age?: string;
  @IsOptional() @IsString() @MaxLength(20) horse1Sex?: string;
  @IsOptional() @IsString() @MaxLength(120) horse1Trainer?: string;
  @IsOptional() @IsString() @MaxLength(80) horse1Distance?: string;
  @IsOptional() @IsString() @MaxLength(20) horse1Starts?: string;
  @IsOptional() @IsString() @MaxLength(200) horse1Status?: string;
  @IsOptional() @IsString() @MaxLength(120) horse2Name?: string;
  @IsOptional() @IsString() @MaxLength(20) horse2Age?: string;
  @IsOptional() @IsString() @MaxLength(20) horse2Sex?: string;
  @IsOptional() @IsString() @MaxLength(120) horse2Trainer?: string;
  @IsOptional() @IsString() @MaxLength(80) horse2Distance?: string;
  @IsOptional() @IsString() @MaxLength(20) horse2Starts?: string;
  @IsOptional() @IsString() @MaxLength(200) horse2Status?: string;

  // Section 7 — Trial Objectives
  @IsOptional() @Transform(toArray) trialInterests?: string[];
  @IsOptional() @IsString() @MaxLength(120) trialInterestOther?: string;

  // Section 8 — Evaluation Commitment
  @IsOptional() @Transform(toArray) commitments?: string[];

  // Section 9 — Professional References
  @IsOptional() @IsString() @MaxLength(120) vetName?: string;
  @IsOptional() @IsString() @MaxLength(120) vetClinic?: string;
  @IsOptional() @IsString() @MaxLength(40) vetPhone?: string;
  @IsOptional() @Transform(emptyToUndefined) @IsEmail() vetEmail?: string;
  @IsOptional() @IsString() @MaxLength(120) feedCompany?: string;
  @IsOptional() @IsString() @MaxLength(120) farrier?: string;

  // Section 10 — Program Discovery
  @IsOptional() @IsString() discoverySource?: string;
  @IsOptional() @IsString() @MaxLength(120) discoverySourceOther?: string;

  // Section 11 — Agreement & Signature
  @IsNotEmpty() @IsString() @MaxLength(120) applicantName: string;
  @IsNotEmpty() @IsString() @MaxLength(120) signature: string;
  @IsOptional() @IsString() date?: string;
  @Transform(toBool) @IsBoolean() agree: boolean;
}
