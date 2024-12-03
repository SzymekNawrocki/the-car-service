import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/users/entity/user.entity';

@Entity('cars')
export class Car {
  @PrimaryGeneratedColumn()
  @ApiProperty({ description: 'The unique identifier for the car' })
  id: number;

  @Column()
  @ApiProperty({ description: 'The manufacturer of the car' })
  make: string;

  @Column()
  @ApiProperty({ description: 'The model of the car' })
  model: string;

  @Column()
  @ApiProperty({ description: 'The price of the car', example: 25000 })
  price: number;

  @Column()
  @ApiProperty({ description: 'The number of doors in the car', example: 4 })
  doors: number;

  @Column()
  @ApiProperty({ description: 'The type of engine in the car', example: 'V8' })
  engine: string;

  @ManyToOne(() => User, (user) => user.cars, { onDelete: 'CASCADE' })
  @ApiProperty({ description: 'The owner of the car', type: () => User })
  owner: User;
}
