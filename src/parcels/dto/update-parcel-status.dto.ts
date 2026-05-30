import { IsString } from 'class-validator';

export class UpdateParcelStatusDto {
  @IsString()
  label: string;

  @IsString()
  code: string;
}