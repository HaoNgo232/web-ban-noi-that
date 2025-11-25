import { Module } from '@nestjs/common';
import { ProductsModule } from './products/products.module';
import { UsersModule } from './users/users.module';
import { AppJwtModule } from '@app/jwt';

@Module({
  imports: [AppJwtModule, ProductsModule, UsersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
