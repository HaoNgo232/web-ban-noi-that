import * as dotenv from 'dotenv';
dotenv.config();

import { NestFactory } from '@nestjs/core';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { ProductsAppModule } from './products-app.module';

async function bootstrap() {
  const port = Number.parseInt(process.env.PORT || '3001', 10);
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    ProductsAppModule,
    {
      transport: Transport.TCP,
      options: {
        host: '0.0.0.0',
        port,
      },
    },
  );
  await app.listen();
  console.log(`Products microservice is running on TCP port ${port}`);
}
void bootstrap();
