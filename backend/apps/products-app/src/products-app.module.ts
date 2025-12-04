import { Module } from '@nestjs/common';
import { ProductsModule } from './products/products.module';
import { CollectionsModule } from './collections/collections.module';

@Module({
  imports: [ProductsModule, CollectionsModule],
  controllers: [],
  providers: [],
})
export class ProductsAppModule {}
