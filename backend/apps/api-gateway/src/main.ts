import * as dotenv from 'dotenv';
dotenv.config();

import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);

  // Enable CORS - Allow all origins (for development)
  app.enableCors({
    origin: true, // Allow all origins
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
    credentials: true,
  });

  // Enable validation pipe with transformation
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true, // Transform query params to correct types
      transformOptions: {
        enableImplicitConversion: true,
      },
      whitelist: true, // Strip unknown properties
      forbidNonWhitelisted: false,
    }),
  );

  await app.listen(process.env.PORT ?? 3000);

  console.log(`API Gateway is running on: ${await app.getUrl()}`);
}

void bootstrap();
