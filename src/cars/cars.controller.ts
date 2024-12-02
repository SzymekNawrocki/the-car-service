import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { CarsService } from './cars.service';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import { Car } from './entity/car.entity';

@ApiTags('Cars') 
@Controller('cars')
export class CarsController {
  constructor(private readonly carsService: CarsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new car' })
  @ApiResponse({ status: 201, description: 'Car created successfully', type: Car })
  @ApiResponse({ status: 400, description: 'Invalid input data' })
  create(@Body() createCarDto: CreateCarDto): Promise<Car> {
    return this.carsService.create(createCarDto);
  }

  @Get()
  @ApiOperation({ summary: 'Retrieve a list of all cars' })
  @ApiResponse({ status: 200, description: 'List of cars retrieved successfully', type: [Car] })
  findAll(): Promise<Car[]> {
    return this.carsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retrieve details of a specific car' })
  @ApiParam({ name: 'id', description: 'Unique identifier of the car', example: 1 })
  @ApiResponse({ status: 200, description: 'Car retrieved successfully', type: Car })
  @ApiResponse({ status: 404, description: 'Car not found' })
  findOne(@Param('id') id: string): Promise<Car> {
    return this.carsService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update details of a specific car' })
  @ApiParam({ name: 'id', description: 'Unique identifier of the car', example: 1 })
  @ApiResponse({ status: 200, description: 'Car updated successfully', type: Car })
  @ApiResponse({ status: 404, description: 'Car not found' })
  @ApiResponse({ status: 400, description: 'Invalid input data' })
  update(@Param('id') id: string, @Body() updateCarDto: UpdateCarDto): Promise<Car> {
    return this.carsService.update(+id, updateCarDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a specific car' })
  @ApiParam({ name: 'id', description: 'Unique identifier of the car', example: 1 })
  @ApiResponse({ status: 200, description: 'Car deleted successfully' })
  @ApiResponse({ status: 404, description: 'Car not found' })
  remove(@Param('id') id: string): Promise<void> {
    return this.carsService.remove(+id);
  }
}
