import {
  IsString,
  IsNumber,
  IsOptional,
  IsDateString,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateParcelDto {
  @IsString()
  trackingNumber: string;

  @IsNumber()
  @Type(() => Number)
  weight: number;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsDateString()
  dateExp?: Date;

  @IsOptional()
  @IsDateString()
  dateArriv?: Date;

  @IsNumber()
  @Type(() => Number)
  shippingMarkId: number;

  @IsNumber()
  @Type(() => Number)
  statusId: number;

  @IsNumber()
  @Type(() => Number)
  shippingTypeId: number;
}