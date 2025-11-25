import * as dotenv from 'dotenv';
dotenv.config();

import { NestFactory } from '@nestjs/core';
import { UsersAppModule } from './users-app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { Logger, ValidationPipe } from '@nestjs/common';

const logger = new Logger('UsersApp');

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    UsersAppModule,
    {
      transport: Transport.TCP,
      options: {
        host: process.env.USERS_SERVICE_HOST || 'localhost',
        port: Number.parseInt(process.env.USERS_SERVICE_PORT || '3002', 10),
      },
    },
  );

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }),
  );

  await app.listen();
  logger.log(
    `Users microservice is running on port ${process.env.USERS_SERVICE_PORT || 3002}`,
  );
}

void bootstrap();
