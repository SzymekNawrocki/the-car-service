import { Controller, Post, Body, Get, UseGuards, Session } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login-dto';
import { User } from './decorators/user.decorator';
import { AuthGuard } from './guards/auth.guard';

interface SessionData {
  user?: any;
}

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  async login(@Body() loginDto: LoginDto, @Session() session: SessionData): Promise<{ message: string }> {
    return await this.authService.login(loginDto, session);
  }

  @UseGuards(AuthGuard)
  @Get('status')
  async checkStatus(@User() user: any): Promise<{ message: string; user?: any }> {
    return { message: 'User is logged in', user };
  }

  @UseGuards(AuthGuard)
  @Get()
  async logout(@Session() session: SessionData): Promise<string> {
    return await this.authService.logout(session);
  }
}
