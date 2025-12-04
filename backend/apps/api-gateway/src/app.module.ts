import { Module } from '@nestjs/common';
import { ProductsModule } from './products/products.module';
import { UsersModule } from './users/users.module';
import { CollectionsModule } from './collections/collections.module';
import { AppJwtModule } from '@app/jwt';
import { HealthController } from './health.controller';

@Module({
  imports: [AppJwtModule, ProductsModule, UsersModule, CollectionsModule],
  controllers: [HealthController],
  providers: [],
})
export class AppModule {}
