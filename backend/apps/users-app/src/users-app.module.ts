import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { AuthModule } from '../auth/auth.module';
import { PrismaModule } from '@app/prisma';

@Module({
  imports: [PrismaModule, UsersModule, AuthModule],
  controllers: [],
  providers: [],
})
export class UsersAppModule {}
