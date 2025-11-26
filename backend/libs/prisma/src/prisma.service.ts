import {
  Injectable,
  OnModuleInit,
  OnModuleDestroy,
  Logger,
} from '@nestjs/common';
import { PrismaClient } from './generated/prisma';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  private readonly logger = new Logger(PrismaService.name);

  constructor() {
    super();
  }

  async onModuleInit(): Promise<void> {
    try {
      await this.$connect();
      this.logger.log('Database connection established successfully');
    } catch (error: unknown) {
      const errorMessage: string =
        error instanceof Error ? error.message : String(error);
      this.logger.error('Failed to connect to database', errorMessage);
      throw error;
    }
  }

  async onModuleDestroy(): Promise<void> {
    await this.$disconnect();
    this.logger.log('Database connection closed');
  }
}
