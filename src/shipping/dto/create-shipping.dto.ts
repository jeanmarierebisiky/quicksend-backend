import {
  IsString,
  IsNumber,
} from 'class-validator';

export class CreateShippingDto {
  @IsString()
  code: string;

  @IsString()
  label: string;

  @IsNumber()
  amount: number;
}