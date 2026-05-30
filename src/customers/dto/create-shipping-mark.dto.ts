import { IsString, IsNumber } from 'class-validator';

export class CreateShippingMarkDto {
  @IsString()
  code!: string;

  @IsNumber()
  customerId!: number;
}
