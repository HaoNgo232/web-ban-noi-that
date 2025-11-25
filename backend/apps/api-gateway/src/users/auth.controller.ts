import {
  Controller,
  Post,
  Body,
  Inject,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { BaseGatewayController } from '../base.controller';
import { LoginDto, RefreshTokenDto, AUTH_MESSAGE_PATTERNS } from '@app/dto';
import { Public } from '../auth/public.decorator';

@Controller('auth')
export class AuthController extends BaseGatewayController {
  constructor(@Inject('USERS_SERVICE') protected readonly client: ClientProxy) {
    super(client);
  }

  /**
   * Login
   * POST /auth/login
   */
  @Public()
  @Post('login')
  @HttpCode(HttpStatus.OK)
  login(@Body() loginDto: LoginDto) {
    return this.send(AUTH_MESSAGE_PATTERNS.LOGIN, loginDto);
  }

  /**
   * Refresh access token
   * POST /auth/refresh
   */
  @Public()
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  refreshToken(@Body() refreshTokenDto: RefreshTokenDto) {
    return this.send(AUTH_MESSAGE_PATTERNS.REFRESH_TOKEN, refreshTokenDto);
  }

  /**
   * Logout
   * POST /auth/logout
   */
  @Post('logout')
  @HttpCode(HttpStatus.OK)
  logout(@Body('userId') userId: string) {
    return this.send(AUTH_MESSAGE_PATTERNS.LOGOUT, userId);
  }
}
