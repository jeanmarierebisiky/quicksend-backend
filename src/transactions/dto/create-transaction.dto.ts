import {
  IsNumber,
  IsString,
  IsOptional,
  IsDateString,
} from 'class-validator';

export class CreateTransactionDto {
  @IsNumber()
  transactionTypeId: number;

  @IsNumber()
  transactionNatureId: number;

  @IsNumber()
  userId: number;

  @IsNumber()
  amount: number;

  @IsString()
  reference: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsDateString()
  transactionDate: Date;
}