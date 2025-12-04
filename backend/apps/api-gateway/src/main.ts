import * as dotenv from 'dotenv';
import * as path from 'node:path';
import { existsSync } from 'node:fs';
dotenv.config();

import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // Serve static files from public/images directory
  // Try multiple path resolution strategies to ensure it works in all environments
  let imagesPath: string;

  // Strategy 1: From process.cwd() (when running from backend directory)
  const cwdPath = path.resolve(process.cwd(), 'public/images');

  // Strategy 2: From __dirname (when running compiled code)
  // __dirname in compiled code will be apps/api-gateway/dist/src
  const dirnamePath = path.resolve(__dirname, '../../public/images');

  // Check which path exists
  if (existsSync(cwdPath)) {
    imagesPath = cwdPath;
  } else if (existsSync(dirnamePath)) {
    imagesPath = dirnamePath;
  } else {
    // Fallback: use process.cwd() path
    imagesPath = cwdPath;
  }

  console.log(`Serving static images from: ${imagesPath}`);
  console.log(`__dirname: ${__dirname}`);
  console.log(`process.cwd(): ${process.cwd()}`);
  console.log(`Path exists: ${existsSync(imagesPath)}`);

  app.useStaticAssets(imagesPath, {
    prefix: '/images',
  });

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
