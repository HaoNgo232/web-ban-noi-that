import {
  IsString,
  IsNotEmpty,
  IsEmail,
  IsOptional,
  IsEnum,
  MinLength,
  MaxLength,
  IsNumber,
  Min,
  Matches,
} from 'class-validator';
import { PartialType, OmitType } from '@nestjs/mapped-types';

// ==================== ENUMS ====================

export enum UserRole {
  ADMIN = 'ADMIN',
  CUSTOMER = 'CUSTOMER',
  STAFF = 'STAFF',
}

export enum UserStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  BANNED = 'BANNED',
}

// ==================== DTOs ====================

/**
 * DTO để tạo user mới
 */
export class CreateUserDto {
  @IsEmail()
  @IsNotEmpty()
  @MaxLength(255)
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(255)
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/, {
    message:
      'Password phải chứa ít nhất 1 chữ hoa, 1 chữ thường, 1 số và 1 ký tự đặc biệt',
  })
  password: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(100)
  firstName: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(100)
  lastName: string;

  @IsString()
  @IsOptional()
  @MaxLength(20)
  @Matches(/^[+]?[\d\s-]+$/, {
    message: 'Số điện thoại không hợp lệ',
  })
  phone?: string;

  @IsString()
  @IsOptional()
  @MaxLength(500)
  avatar?: string;

  @IsString()
  @IsOptional()
  address?: string;

  @IsEnum(UserRole)
  @IsOptional()
  role?: UserRole;
}

/**
 * DTO để cập nhật user - loại bỏ password, sử dụng endpoint riêng cho đổi password
 */
export class UpdateUserDto extends PartialType(
  OmitType(CreateUserDto, ['password', 'email'] as const),
) {
  @IsEnum(UserStatus)
  @IsOptional()
  status?: UserStatus;
}

/**
 * DTO để cập nhật user qua microservice (cần id)
 */
export class UpdateUserPayloadDto extends UpdateUserDto {
  @IsString()
  @IsNotEmpty()
  id: string;
}

/**
 * DTO để đổi password
 */
export class ChangePasswordDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(255)
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/, {
    message:
      'Password phải chứa ít nhất 1 chữ hoa, 1 chữ thường, 1 số và 1 ký tự đặc biệt',
  })
  newPassword: string;
}

/**
 * DTO trả về thông tin user (không bao gồm password)
 */
export class UserResponseDto {
  id: string;

  email: string;

  firstName: string;

  lastName: string;

  phone: string | null;

  avatar: string | null;

  address: string | null;

  role: 'ADMIN' | 'CUSTOMER' | 'STAFF';

  status: 'ACTIVE' | 'INACTIVE' | 'BANNED';

  lastLoginAt: Date | null;

  createdAt: Date;

  updatedAt: Date;
}

/**
 * DTO query để lấy danh sách users
 */
export class GetUsersQueryDto {
  @IsOptional()
  @IsNumber()
  @Min(1)
  page?: number = 1;

  @IsOptional()
  @IsNumber()
  @Min(1)
  limit?: number = 20;

  @IsOptional()
  @IsEnum(UserRole)
  role?: UserRole;

  @IsOptional()
  @IsEnum(UserStatus)
  status?: UserStatus;

  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @IsString()
  sortBy?: 'email' | 'firstName' | 'lastName' | 'createdAt';

  @IsOptional()
  @IsString()
  sortOrder?: 'asc' | 'desc';
}

/**
 * DTO response danh sách users với pagination
 */
export class GetUsersResponseDto {
  data: UserResponseDto[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// ==================== MESSAGE PATTERNS ====================

/**
 * Định nghĩa các message patterns cho microservice communication
 */
export const USER_MESSAGE_PATTERNS = {
  CREATE: 'user.create',
  FIND_ALL: 'user.findAll',
  FIND_ONE: 'user.findOne',
  FIND_BY_EMAIL: 'user.findByEmail',
  UPDATE: 'user.update',
  REMOVE: 'user.remove',
  CHANGE_PASSWORD: 'user.changePassword',
} as const;
