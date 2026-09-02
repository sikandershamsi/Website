import { Module } from '@nestjs/common';
import { ShopController } from './shop.controller';
import { ProductsModule } from '../products/products.module';

@Module({
  imports: [ProductsModule],
  controllers: [ShopController],
})
export class ShopModule {}
