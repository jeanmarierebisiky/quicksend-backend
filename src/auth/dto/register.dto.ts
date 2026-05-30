import { IsString } from 'class-validator';

export class RegisterDto {
  @IsString()
  name!: string;

  @IsString()
  login!: string;

  @IsString()
  password!: string;

  @IsString()
  role?: string;
}
