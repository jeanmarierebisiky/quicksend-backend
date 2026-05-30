import {
  IsOptional,
  IsNumber,
  IsString,
  IsDateString,
} from 'class-validator';

export class UpdateParcelDto {
  @IsOptional()
  @IsNumber()
  statusId?: number;

  @IsOptional()
  @IsDateString()
  dateExp?: Date;

  @IsOptional()
  @IsDateString()
  dateArriv?: Date;

  @IsOptional()
  @IsString()
  description?: string;
}