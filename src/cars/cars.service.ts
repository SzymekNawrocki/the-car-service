import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Car } from './entity/car.entity';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import { User } from 'src/users/entity/user.entity';

@Injectable()
export class CarsService {
  constructor(
    @InjectRepository(Car)
    private carRepository: Repository<Car>,
  ) {}

  async create(createCarDto: CreateCarDto, user: User): Promise<Car> {
    const car = this.carRepository.create({ ...createCarDto, owner: user });
    return this.carRepository.save(car);
  }

  async findAll(): Promise<Car[]> {
    return this.carRepository.find({ relations: ['owner'] });
  }

  async findOne(id: number): Promise<Car> {
    const car = await this.carRepository.findOne({
      where: { id },
      relations: ['owner'],
    });
    if (!car) {
      throw new NotFoundException(`Car with ID ${id} not found`);
    }
    return car;
  }

  async update(id: number, updateCarDto: UpdateCarDto, user: User): Promise<Car> {
    const car = await this.findOne(id);
    if (car.owner.id !== user.id) {
      throw new ForbiddenException('You are not allowed to update this car');
    }
    Object.assign(car, updateCarDto);
    return this.carRepository.save(car);
  }

  async remove(id: number, user: User): Promise<void> {
    const car = await this.findOne(id);
    if (car.owner.id !== user.id) {
      throw new ForbiddenException('You are not allowed to delete this car');
    }
    await this.carRepository.remove(car);
  }
}
