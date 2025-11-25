import { SetMetadata } from '@nestjs/common';

/**
 * Decorator để mark endpoint không cần JWT token
 * Sử dụng: @Public()
 */
export const Public = () => SetMetadata('isPublic', true);
