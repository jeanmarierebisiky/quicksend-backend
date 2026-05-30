import {
  IsOptional,
  IsNumber,
  IsString,
  IsDateString,
} from 'class-validator';

export class UpdatePackageDto {
  @IsOptional()
  @IsNumber()
  statusId?: number;

  @IsOptional()
  @IsString()
  nomBox?: string;

  @IsOptional()
  @IsDateString()
  dateExp?: Date;

  @IsOptional()
  @IsDateString()
  dateArriv?: Date;

  @IsOptional()
  @IsString()
  motifReturn?: string;
}