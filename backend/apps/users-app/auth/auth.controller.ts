import { Controller, Logger } from '@nestjs/common';
import { MessagePattern, Payload, RpcException } from '@nestjs/microservices';
import { AuthService } from './auth.service';
import { LoginDto, RefreshTokenDto, AUTH_MESSAGE_PATTERNS } from '@app/dto';

@Controller()
export class AuthController {
  private readonly logger = new Logger(AuthController.name);

  constructor(private readonly authService: AuthService) {}

  @MessagePattern(AUTH_MESSAGE_PATTERNS.LOGIN)
  async login(@Payload() loginDto: LoginDto) {
    try {
      return await this.authService.login(loginDto);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error';
      this.logger.error(`Login error: ${errorMessage}`);
      throw new RpcException(errorMessage);
    }
  }

  @MessagePattern(AUTH_MESSAGE_PATTERNS.REFRESH_TOKEN)
  async refreshToken(@Payload() refreshTokenDto: RefreshTokenDto) {
    try {
      return await this.authService.refreshToken(refreshTokenDto);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error';
      this.logger.error(`Refresh token error: ${errorMessage}`);
      throw new RpcException(errorMessage);
    }
  }

  @MessagePattern(AUTH_MESSAGE_PATTERNS.VERIFY_TOKEN)
  async verifyToken(@Payload() token: string) {
    try {
      return await this.authService.verifyToken(token);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error';
      this.logger.error(`Verify token error: ${errorMessage}`);
      throw new RpcException(errorMessage);
    }
  }

  @MessagePattern(AUTH_MESSAGE_PATTERNS.LOGOUT)
  logout(@Payload() userId: string) {
    try {
      // Logic logout nếu cần (e.g., blacklist token)
      return { message: 'Logged out successfully', userId };
    } catch (error) {
      if (error instanceof Error) {
        this.logger.error(`Logout error: ${error.message}`);
        throw new RpcException(error.message);
      }
    }
  }
}
