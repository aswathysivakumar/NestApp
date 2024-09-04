import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCreatedResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

import { SignupDto } from './dto/signUp.dto';
import { LoginDto } from './dto/login.dto';
import { refreshTokenDto } from './dto/refreshToken.dto';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup') // auth/signup
  @ApiCreatedResponse({ description: 'Created New User', type: SignupDto })
  @ApiBadRequestResponse({ description: 'User cannot be created' })
  @ApiBody({ type: SignupDto })
  async signUp(@Body() signUpData: SignupDto) {
    return this.authService.signup(signUpData);
  }

  @ApiCreatedResponse({ description: 'User logged in successfully' })
  @ApiUnauthorizedResponse({ description: 'User cannot be logged in' })
  @Post('login') // auth/login
  async login(@Body() credentials: LoginDto) {
    return this.authService.login(credentials);
  }

  @ApiCreatedResponse({ description: 'Token refreshed successfully' })
  @ApiUnauthorizedResponse({ description: 'Token cannot be refreshed' })
  @Post('refreshToken') // auth/refreshToken
  async refreshToken(@Body() refteshTokenDto: refreshTokenDto) {
    return this.authService.refreshToken(refteshTokenDto);
  }
}
