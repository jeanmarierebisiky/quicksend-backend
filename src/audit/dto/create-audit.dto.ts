import {
  IsString,
  IsOptional,
  IsNumber,
} from 'class-validator';

export class CreateAuditDto {
  @IsOptional()
  @IsNumber()
  userId?: number;

  @IsString()
  entityType!: string;

  @IsString()
  entityId!: string;

  @IsString()
  action!: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  metadata?: any;

  @IsOptional()
  @IsString()
  ipAddress?: string;
}
