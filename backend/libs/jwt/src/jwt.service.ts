import {
  Injectable,
  Optional,
  UnauthorizedException,
  Logger,
} from '@nestjs/common';
import { SignJWT, jwtVerify } from 'jose';
import { TextEncoder } from 'node:util';
import type { AppJwtPayload } from '@app/dto';

// Re-export types for convenience
export type { AppJwtPayload } from '@app/dto';

/**
 * Type guard để validate AppJwtPayload
 * Hỗ trợ cả JWTPayload (từ jose verify) và unknown (từ manual decode)
 */
function isAppJwtPayload(obj: unknown): obj is AppJwtPayload {
  if (typeof obj !== 'object' || obj === null) {
    return false;
  }

  const payload = obj as Record<string, unknown>;
  return (
    typeof payload.sub === 'string' &&
    typeof payload.email === 'string' &&
    typeof payload.role === 'string'
  );
}

/**
 * Config cho JWT
 */
export interface JwtConfig {
  secret: string;
  expiresIn: string;
  refreshSecret: string;
  refreshExpiresIn: string;
}

@Injectable()
export class AppJwtService {
  private readonly logger = new Logger(AppJwtService.name);
  private readonly config: JwtConfig;
  private readonly accessTokenSecret: Uint8Array;
  private readonly refreshTokenSecret: Uint8Array;

  constructor(@Optional() config?: Partial<JwtConfig>) {
    this.config = {
      secret:
        config?.secret || process.env.JWT_SECRET || 'your-super-secret-key',
      expiresIn: config?.expiresIn || process.env.JWT_EXPIRES_IN || '15m',
      refreshSecret:
        config?.refreshSecret ||
        process.env.JWT_REFRESH_SECRET ||
        'your-super-secret-refresh-key',
      refreshExpiresIn:
        config?.refreshExpiresIn ||
        process.env.REFRESH_TOKEN_EXPIRES_IN ||
        '7d',
    };

    // Convert strings sang Uint8Array cho jose
    this.accessTokenSecret = new TextEncoder().encode(this.config.secret);
    this.refreshTokenSecret = new TextEncoder().encode(
      this.config.refreshSecret,
    );
  }

  /**
   * Tạo Access Token (đối xứng - HS256)
   */
  async generateAccessToken(
    payload: Omit<AppJwtPayload, 'iat' | 'exp'>,
  ): Promise<string> {
    try {
      const token = await new SignJWT(payload)
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime(this.config.expiresIn)
        .sign(this.accessTokenSecret);
      return token;
    } catch (error) {
      this.logger.error(
        `Failed to generate access token: ${error instanceof Error ? error.message : 'unknown error'}`,
      );
      throw new Error('Failed to generate access token');
    }
  }

  /**
   * Tạo Refresh Token (đối xứng - HS256)
   */
  async generateRefreshToken(
    payload: Omit<AppJwtPayload, 'iat' | 'exp'>,
  ): Promise<string> {
    try {
      const token = await new SignJWT(payload)
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime(this.config.refreshExpiresIn)
        .sign(this.refreshTokenSecret);
      return token;
    } catch (error) {
      this.logger.error(
        `Failed to generate refresh token: ${error instanceof Error ? error.message : 'unknown error'}`,
      );
      throw new Error('Failed to generate refresh token');
    }
  }

  /**
   * Verify Access Token
   */
  async verifyAccessToken(token: string): Promise<AppJwtPayload> {
    try {
      const verified = await jwtVerify(token, this.accessTokenSecret);
      const payload = verified.payload;

      if (!isAppJwtPayload(payload)) {
        throw new Error('Invalid JWT payload structure');
      }

      return payload;
    } catch (error) {
      this.logger.error(
        `Failed to verify access token: ${error instanceof Error ? error.message : 'unknown error'}`,
      );
      throw new UnauthorizedException('Invalid or expired access token');
    }
  }

  /**
   * Verify Refresh Token
   */
  async verifyRefreshToken(token: string): Promise<AppJwtPayload> {
    try {
      const verified = await jwtVerify(token, this.refreshTokenSecret);
      const payload = verified.payload;

      if (!isAppJwtPayload(payload)) {
        throw new Error('Invalid JWT payload structure');
      }

      return payload;
    } catch (error) {
      this.logger.error(
        `Failed to verify refresh token: ${error instanceof Error ? error.message : 'unknown error'}`,
      );
      throw new UnauthorizedException('Invalid or expired refresh token');
    }
  }

  /**
   * Decode token mà không verify (chỉ để lấy payload)
   */
  decodeToken(token: string): AppJwtPayload | null {
    try {
      // jose không hỗ trợ decode trực tiếp, nên dùng manual parsing
      const parts = token.split('.');
      if (parts.length !== 3) {
        return null;
      }

      const decoded: unknown = JSON.parse(
        Buffer.from(parts[1], 'base64url').toString('utf-8'),
      );

      if (!isAppJwtPayload(decoded)) {
        this.logger.warn('Decoded token has invalid payload structure');
        return null;
      }

      return decoded;
    } catch (error) {
      this.logger.error(
        `Failed to decode token: ${error instanceof Error ? error.message : 'unknown error'}`,
      );
      return null;
    }
  }

  /**
   * Lấy expiration time của access token theo format
   */
  getAccessTokenExpiresIn(): string {
    return this.config.expiresIn;
  }

  /**
   * Convert expiresIn string sang seconds (e.g., "15m" -> 900)
   */
  getExpiresInSeconds(expiresIn: string): number {
    const regex = /^(\d+)([smhd])$/;
    const match = regex.exec(expiresIn);
    if (!match) {
      throw new Error('Invalid expiresIn format');
    }

    const [, value, unit] = match;
    const num = Number.parseInt(value, 10);

    const unitToSeconds = {
      s: 1,
      m: 60,
      h: 60 * 60,
      d: 24 * 60 * 60,
    };

    return num * (unitToSeconds[unit as keyof typeof unitToSeconds] || 1);
  }
}
