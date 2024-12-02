import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsInt, IsPositive, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class CreateCarDto {
  @ApiProperty({ description: 'The make of the car', example: 'Toyota' })
  @IsString()
  @IsNotEmpty()
  make: string;

  @ApiProperty({ description: 'The model of the car', example: 'Corolla' })
  @IsString()
  @IsNotEmpty()
  model: string;

  @ApiProperty({ description: 'The price of the car', example: 20000 })
  @IsNumber()
  @IsPositive()
  price: number;

  @ApiProperty({ description: 'Number of doors in the car', example: 4 })
  @IsInt()
  @IsPositive()
  doors: number;

  @ApiProperty({ description: 'The type of engine used by the car', example: 'Hybrid' })
  @IsString()
  @IsNotEmpty()
  engine: string;
}
