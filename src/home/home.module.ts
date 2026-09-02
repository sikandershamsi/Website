import { Module } from '@nestjs/common';
import { HomeController } from './home.controller';
import { PagesModule } from '../pages/pages.module';
import { ProductsModule } from '../products/products.module';

@Module({
  imports: [PagesModule, ProductsModule],
  controllers: [HomeController],
})
export class HomeModule {}
