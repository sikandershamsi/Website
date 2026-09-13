import { Transform } from 'class-transformer';
import { ArrayNotEmpty, IsArray, IsString } from 'class-validator';

/** Normalizes a checkbox group's `ids` field — a single value posts as a string, multiple as an array. */
function toArray({ value }: { value: unknown }): string[] {
  if (Array.isArray(value)) return value.map(String);
  if (typeof value === 'string' && value) return [value];
  return [];
}

export class BulkIdsDto {
  @Transform(toArray)
  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  ids: string[];
}
