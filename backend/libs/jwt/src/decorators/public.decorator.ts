import { SetMetadata } from '@nestjs/common';

export const IS_PUBLIC_KEY = 'isPublic';

/**
 * Decorator để mark endpoint không cần JWT token
 * Sử dụng: @Public()
 */
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
