import { Injectable, Logger, HttpStatus } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { AppJwtService } from '@app/jwt';
import { PrismaService } from '@app/prisma';
import {
  LoginDto,
  AuthResponseDto,
  RefreshTokenDto,
  RefreshTokenResponseDto,
  AppJwtPayload,
} from '@app/dto';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private readonly jwtService: AppJwtService,
    private readonly prisma: PrismaService,
    private readonly usersService: UsersService,
  ) {}

  /**
   * Login với email và password
   */
  async login(loginDto: LoginDto): Promise<AuthResponseDto> {
    const { email, password } = loginDto;

    // Tìm user theo email
    const user = await this.usersService.findByEmail(email);

    // Kiểm tra password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new RpcException({
        statusCode: HttpStatus.UNAUTHORIZED,
        message: 'Email hoặc password không đúng',
      });
    }

    // Kiểm tra user status
    if (user.status !== 'ACTIVE') {
      throw new RpcException({
        statusCode: HttpStatus.UNAUTHORIZED,
        message: 'User account không hoạt động',
      });
    }

    // Tạo JWT payload
    const payload: Omit<AppJwtPayload, 'iat' | 'exp'> = {
      sub: user.id,
      email: user.email,
      role: user.role,
    };

    // Tạo access token và refresh token
    const accessToken = await this.jwtService.generateAccessToken(payload);
    const refreshToken = await this.jwtService.generateRefreshToken(payload);

    // Cập nhật lastLoginAt
    await this.prisma.user.update({
      where: { id: user.id },
      data: { lastLoginAt: new Date() },
    });

    const expiresInSeconds = this.jwtService.getExpiresInSeconds(
      this.jwtService.getAccessTokenExpiresIn(),
    );

    return {
      accessToken,
      refreshToken,
      expiresIn: expiresInSeconds,
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
      },
    };
  }

  /**
   * Refresh access token
   */
  async refreshToken(
    refreshTokenDto: RefreshTokenDto,
  ): Promise<RefreshTokenResponseDto> {
    const { refreshToken } = refreshTokenDto;

    // Verify refresh token
    const payload = await this.jwtService.verifyRefreshToken(refreshToken);

    // Tạo payload mới
    const newPayload: Omit<AppJwtPayload, 'iat' | 'exp'> = {
      sub: payload.sub,
      email: payload.email,
      role: payload.role,
    };

    // Tạo access token mới
    const accessToken = await this.jwtService.generateAccessToken(newPayload);

    const expiresInSeconds = this.jwtService.getExpiresInSeconds(
      this.jwtService.getAccessTokenExpiresIn(),
    );

    return {
      accessToken,
      expiresIn: expiresInSeconds,
    };
  }

  /**
   * Verify access token
   */
  async verifyToken(token: string): Promise<AppJwtPayload> {
    return this.jwtService.verifyAccessToken(token);
  }

  /**
   * Kiểm tra xem user còn hoạt động không
   */
  async validateUser(userId: string): Promise<boolean> {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user || user.status !== 'ACTIVE') {
      return false;
    }

    return true;
  }
}
