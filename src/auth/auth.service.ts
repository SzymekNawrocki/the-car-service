import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { LoginDto } from './dtos/login-dto';
import * as bcrypt from 'bcrypt';
import { User } from '../users/entity/user.entity';
import { CreateUserDto } from '../users/dtos/create-user.dto';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async login(loginDto: LoginDto, session: any): Promise<string> {
    const { email, password } = loginDto;

    const user = await this.usersService.findOneByEmail(email);
    if (!user) {
      throw new NotFoundException('User with this email does not exist');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    session.user = { id: user.id, email: user.email };
    return 'Login successful';
  }

  async register(createUserDto: CreateUserDto): Promise<User> {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const userWithHashedPassword = { ...createUserDto, password: hashedPassword };
    return this.usersService.create(userWithHashedPassword);
  }

  async logout(session: any): Promise<string> {
    return new Promise((resolve, reject) => {
      session.destroy((err: Error) => {
        if (err) {
          reject(err);
        } else {
          resolve('Logged out successfully');
        }
      });
    });
  }

  isLoggedIn(session: any): boolean {
    return session && session.user;
  }
}
