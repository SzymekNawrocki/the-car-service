import { IsString, IsInt, IsPositive, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class UpdateCarDto {
  @IsString()
  @IsOptional()
  make?: string; 

  @IsString()
  @IsOptional()
  model?: string; 

  @IsNumber()
  @IsPositive()
  @IsOptional()
  price?: number; 

  @IsInt()
  @IsPositive()
  @IsOptional()
  doors?: number; 

  @IsString()
  @IsOptional()
  engine?: string; 
}
