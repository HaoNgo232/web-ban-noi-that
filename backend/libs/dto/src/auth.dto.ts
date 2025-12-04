import { IsString, IsNotEmpty, IsEmail, MinLength } from 'class-validator';
import type { JWTPayload } from 'jose';

// ==================== INTERFACES ====================

/**
 * App-specific JWT payload extending jose's JWTPayload
 * sub: user id (đã có trong JWTPayload)
 */
export interface AppJwtPayload extends JWTPayload {
  email: string;
  role: string;
}

// ==================== DTOs ====================

/**
 * DTO để login
 */
export class LoginDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  password: string;
}

/**
 * DTO response khi login thành công
 */
export class AuthResponseDto {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
  user: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    role: string;
  };
}

/**
 * DTO để refresh token
 */
export class RefreshTokenDto {
  @IsString()
  @IsNotEmpty()
  refreshToken: string;
}

/**
 * DTO response khi refresh token thành công
 */
export class RefreshTokenResponseDto {
  accessToken: string;
  expiresIn: number;
}

/**
 * DTO response verify token
 */
export class VerifyTokenResponseDto {
  valid: boolean;
  payload?: AppJwtPayload;
}

// ==================== MESSAGE PATTERNS ====================

/**
 * Message patterns cho auth microservice
 */
export const AUTH_MESSAGE_PATTERNS = {
  LOGIN: 'auth.login',
  REGISTER: 'auth.register',
  REFRESH_TOKEN: 'auth.refreshToken',
  VERIFY_TOKEN: 'auth.verifyToken',
  LOGOUT: 'auth.logout',
} as const;
