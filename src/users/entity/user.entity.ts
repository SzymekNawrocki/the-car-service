import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import * as bcrypt from 'bcrypt';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  @ApiProperty({ description: 'The unique identifier for the user' })
  id: number;

  @Column()
  @ApiProperty({ description: 'The first name of the user' })
  firstName: string;

  @Column()
  @ApiProperty({ description: 'The last name of the user' })
  lastName: string;

  @Column({ unique: true })
  @ApiProperty({ description: 'The email address of the user', uniqueItems: true })
  email: string;

  @Column()
  @ApiProperty({ description: 'The password for the user (hashed)', writeOnly: true })
  password: string;

  @BeforeInsert()
  async hashPassword() {
    if (this.password) {
      this.password = await bcrypt.hash(this.password, 10);
    }
  }
}
