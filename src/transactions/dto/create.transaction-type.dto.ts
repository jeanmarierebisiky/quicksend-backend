import { IsString } from 'class-validator';

export class CreateTransactionTypeDto {
  @IsString()
  code: string;

  @IsString()
  label: string;
}