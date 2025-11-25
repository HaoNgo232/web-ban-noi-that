import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { UsersController } from './users.controller';
import { AuthController } from './auth.controller';
import { AppJwtModule } from '@app/jwt';

@Module({
  imports: [
    AppJwtModule,
    ClientsModule.register([
      {
        name: 'USERS_SERVICE',
        transport: Transport.TCP,
        options: {
          host: process.env.USERS_SERVICE_HOST || 'localhost',
          port: Number.parseInt(process.env.USERS_SERVICE_PORT || '3002', 10),
        },
      },
    ]),
  ],
  controllers: [UsersController, AuthController],
  providers: [],
})
export class UsersModule {}
