import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { CarsService } from './cars.service';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import { Car } from './entity/car.entity';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { User } from 'src/users/entity/user.entity';
import { User as CurrentUser } from 'src/auth/decorators/user.decorator';

@ApiTags('Cars')
@UseGuards(AuthGuard)
@Controller('cars')
export class CarsController {
  constructor(private readonly carsService: CarsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new car' })
  @ApiResponse({ status: 201, description: 'Car created successfully', type: Car })
  @ApiResponse({ status: 400, description: 'Invalid input data' })
  create(
    @Body() createCarDto: CreateCarDto,
    @CurrentUser() user: User,
  ): Promise<Car> {
    return this.carsService.create(createCarDto, user);
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
  @ApiResponse({ status: 403, description: 'Forbidden' })
  update(
    @Param('id') id: string,
    @Body() updateCarDto: UpdateCarDto,
    @CurrentUser() user: User,
  ): Promise<Car> {
    return this.carsService.update(+id, updateCarDto, user);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a specific car' })
  @ApiParam({ name: 'id', description: 'Unique identifier of the car', example: 1 })
  @ApiResponse({ status: 200, description: 'Car deleted successfully' })
  @ApiResponse({ status: 404, description: 'Car not found' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  remove(@Param('id') id: string, @CurrentUser() user: User): Promise<void> {
    return this.carsService.remove(+id, user);
  }
}
