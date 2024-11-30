import { Controller, Post, Body, Get, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dtos/login-dto';
import { Request } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto, @Req() req: Request): Promise<{ message: string }> {
    const message = await this.authService.login(loginDto, req.session);
    return { message };
  }

  @Get('status')
  async checkStatus(@Req() req: Request): Promise<{ message: string; user?: any }> {
    if (this.authService.isLoggedIn(req.session)) {
      return { message: 'User is logged in', user: req.session.user };
    }
    return { message: 'User is not logged in' };
  }

  @Get('logout')
  async logout(@Req() req: Request): Promise<{ message: string }> {
    const message = await this.authService.logout(req.session);
    return { message };
  }
}
