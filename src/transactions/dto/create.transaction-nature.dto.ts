import { IsString } from 'class-validator';

export class CreateTransactionNatureDto {
  @IsString()
  code: string;

  @IsString()
  label: string;
}