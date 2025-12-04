import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AuthService } from './auth.service';
import {
  LoginDto,
  RefreshTokenDto,
  CreateUserDto,
  AUTH_MESSAGE_PATTERNS,
} from '@app/dto';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @MessagePattern(AUTH_MESSAGE_PATTERNS.REGISTER)
  async register(@Payload() createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto);
  }

  @MessagePattern(AUTH_MESSAGE_PATTERNS.LOGIN)
  async login(@Payload() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @MessagePattern(AUTH_MESSAGE_PATTERNS.REFRESH_TOKEN)
  async refreshToken(@Payload() refreshTokenDto: RefreshTokenDto) {
    return this.authService.refreshToken(refreshTokenDto);
  }

  @MessagePattern(AUTH_MESSAGE_PATTERNS.VERIFY_TOKEN)
  async verifyToken(@Payload() token: string) {
    return this.authService.verifyToken(token);
  }

  @MessagePattern(AUTH_MESSAGE_PATTERNS.LOGOUT)
  logout(@Payload() userId: string) {
    // Logic logout nếu cần (e.g., blacklist token)
    return { message: 'Logged out successfully', userId };
  }
}
