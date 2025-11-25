import { SetMetadata } from '@nestjs/common';

export const ROLES_KEY = 'roles';

/**
 * Decorator để mark endpoint yêu cầu role cụ thể
 * Sử dụng: @Roles('admin', 'staff')
 */
export const Roles = (...roles: string[]) => SetMetadata(ROLES_KEY, roles);
