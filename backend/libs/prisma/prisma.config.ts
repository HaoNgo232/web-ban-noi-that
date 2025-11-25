// Prisma configuration file
// Load environment variables from .env
import dotenv from 'dotenv';
import path from 'node:path';
import { defineConfig, env } from 'prisma/config';

// Load .env from backend root directory
dotenv.config({ path: path.join(__dirname, '../../.env') });

export default defineConfig({
  schema: path.join(__dirname, 'prisma/schema.prisma'),
  migrations: {
    path: path.join(__dirname, 'prisma/migrations'),
  },
  datasource: {
    url: env('DATABASE_URL'),
  },
});
