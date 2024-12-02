import { IsString, IsInt, IsPositive, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateCarDto {
  @ApiPropertyOptional({ description: 'The make of the car', example: 'Toyota' })
  @IsString()
  @IsOptional()
  make?: string;

  @ApiPropertyOptional({ description: 'The model of the car', example: 'Corolla' })
  @IsString()
  @IsOptional()
  model?: string;

  @ApiPropertyOptional({ description: 'The price of the car', example: 20000 })
  @IsNumber()
  @IsPositive()
  @IsOptional()
  price?: number;

  @ApiPropertyOptional({ description: 'Number of doors in the car', example: 4 })
  @IsInt()
  @IsPositive()
  @IsOptional()
  doors?: number;

  @ApiPropertyOptional({ description: 'The type of engine used by the car', example: 'Hybrid' })
  @IsString()
  @IsOptional()
  engine?: string;
}