import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { AppJwtModule } from '@app/jwt';
import { PrismaModule } from '@app/prisma';
import { UsersModule } from '../src/users/users.module';

@Module({
  imports: [AppJwtModule, PrismaModule, UsersModule],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
