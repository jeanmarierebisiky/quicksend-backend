import { Type } from 'class-transformer';
import {
  IsArray,
  IsDateString,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

export class CreateInvoiceItemDto {
  @IsOptional()
  @IsNumber()
  parcelId?: number;

  @IsNumber()
  shippingTypeId!: number;

  @IsString()
  trackingNumber!: string;

  @IsOptional()
  @IsString()
  boxName?: string;

  @IsNumber()
  price!: number;

  @IsOptional()
  @IsString()
  packageType?: string;

  @IsNumber()
  weightKg!: number;

  @IsOptional()
  @IsNumber()
  packingWeightKg?: number;

  @IsOptional()
  @IsNumber()
  packingWeightPercentage?: number;

  @IsNumber()
  billableWeightKg!: number;
}

export class CreateInvoiceDto {
  @IsString()
  invoiceNumber!: string;

  @IsDateString()
  invoiceDate!: string;

  @IsNumber()
  customerId!: number;

  @IsNumber()
  statusId!: number;

  @IsNumber()
  paymentMethodId!: number;

  @IsNumber()
  createdById!: number;

  @IsNumber()
  discountAmount!: number;

  @IsNumber()
  extraFee!: number;

  @IsString()
  receverName!: string;

  @IsString()
  receverContact!: string;

  @IsOptional()
  @IsString()
  paymentReference?: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateInvoiceItemDto)
  items!: CreateInvoiceItemDto[];
}