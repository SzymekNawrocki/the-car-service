import {
  Controller,
  Post,
  Body,
  Get,
  Req,
  Res,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dtos/login-dto';
import { Request, Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(
    @Body() loginDto: LoginDto,
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<void> {
    try {
      const message = await this.authService.login(loginDto, req.session);
      res.send({ message });
    } catch (error) {
      res.status(error.status || HttpStatus.UNAUTHORIZED).send({
        error: error.message || 'Login failed',
      });
    }
  }

  @Get('status')
  @HttpCode(HttpStatus.OK)
  async checkStatus(@Req() req: Request): Promise<{ message: string; user?: any }> {
    if (this.authService.isLoggedIn(req.session)) {
      return { message: 'User is logged in', user: req.session.user };
    }
    return { message: 'User is not logged in' };
  }

  @Get('logout')
  async logout(@Req() req: Request, @Res() res: Response): Promise<void> {
    try {
      const message = await this.authService.logout(req.session);
      res.status(HttpStatus.OK).send({ message });
    } catch (error) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
        error: 'Logout failed',
      });
    }
  }
}
