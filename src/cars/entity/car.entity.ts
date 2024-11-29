import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('cars')
export class Car {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  make: string; 

  @Column()
  model: string; 

  @Column()
  price: number; 

  @Column()
  doors: number; 

  @Column()
  engine: string;
}
