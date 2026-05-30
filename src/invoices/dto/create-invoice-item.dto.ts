import { IsNumber, IsOptional } from 'class-validator';

export class CreateInvoiceItemDto {
  @IsOptional()
  @IsNumber()
  parcelId?: number;

  @IsNumber()
  shippingTypeId!: number;

  @IsNumber()
  price!: number;
}
