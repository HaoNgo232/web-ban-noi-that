import { SetMetadata } from '@nestjs/common';

/**
 * Decorator để mark endpoint yêu cầu role cụ thể
 * Sử dụng: @Roles('admin', 'staff')
 */
export const Roles = (...roles: string[]) => SetMetadata('roles', roles);
