import {
  IsString,
  IsInt,
  IsPositive,
  IsNotEmpty,
  IsNumber,
} from 'class-validator';

export class CreateCarDto {
  @IsString()
  @IsNotEmpty()
  make: string;

  @IsString()
  @IsNotEmpty()
  model: string;

  @IsNumber()
  @IsPositive()
  price: number;

  @IsInt()
  @IsPositive()
  doors: number;

  @IsString()
  @IsNotEmpty()
  engine: string;
}
