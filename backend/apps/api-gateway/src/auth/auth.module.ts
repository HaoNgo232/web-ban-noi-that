import { Module } from '@nestjs/common';
import { JwtGuard } from './jwt.guard';
import { RolesGuard } from './roles.guard';
import { AppJwtModule } from '@app/jwt';

@Module({
  imports: [AppJwtModule],
  providers: [JwtGuard, RolesGuard],
  exports: [JwtGuard, RolesGuard],
})
export class AuthModule {}
