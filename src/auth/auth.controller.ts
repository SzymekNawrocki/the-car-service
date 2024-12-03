import { Controller, Post, Body, Get, UseGuards, Session } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login-dto';
import { User } from './decorators/user.decorator';
import { AuthGuard } from './guards/auth.guard';

interface SessionData {
  user?: any;
}

@ApiTags('Authentication') 
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  @ApiOperation({ summary: 'Login a user' })
  @ApiResponse({ status: 200, description: 'Login successful' })
  @ApiResponse({ status: 404, description: 'User not found' })
  async login(@Body() loginDto: LoginDto, @Session() session: SessionData): Promise<{ message: string }> {
    return await this.authService.login(loginDto, session);
  }

  @UseGuards(AuthGuard)
  @Get('status')
  @ApiOperation({ summary: 'Check login status' })
  @ApiResponse({ status: 200, description: 'User is logged in' })
  async checkStatus(@User() user: any): Promise<{ message: string; user?: any }> {
    return { message: 'User is logged in', user };
  }

  @UseGuards(AuthGuard)
  @Get()
  @ApiOperation({ summary: 'Logout a user' })
  @ApiResponse({ status: 200, description: 'Logged out successfully' })
  async logout(@Session() session: SessionData): Promise<string> {
    return await this.authService.logout(session);
  }
}
