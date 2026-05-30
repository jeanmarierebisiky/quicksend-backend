import {
  IsString,
  IsOptional,
} from 'class-validator';

export class CreateAuditDto {
  @IsOptional()
  userId?: number;

  @IsString()
  entityType: string;

  @IsString()
  entityId: string;

  @IsString()
  action: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  metadata?: any;

  @IsOptional()
  @IsString()
  ipAddress?: string;
}