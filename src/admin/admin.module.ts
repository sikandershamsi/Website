import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { ProductsModule } from '../products/products.module';
import { OrdersModule } from '../orders/orders.module';
import { SubscriptionsModule } from '../subscriptions/subscriptions.module';
import { StripeModule } from '../stripe/stripe.module';
import { PagesModule } from '../pages/pages.module';
import { AffiliatesModule } from '../affiliates/affiliates.module';
import { AdminLayoutMiddleware } from './admin-layout.middleware';
import { AdminAuthController } from './admin-auth.controller';
import { AdminDashboardController } from './admin-dashboard.controller';
import { AdminProductsController } from './admin-products.controller';
import { AdminCategoriesController } from './admin-categories.controller';
import { AdminOrdersController } from './admin-orders.controller';
import { AdminSubscriptionsController } from './admin-subscriptions.controller';
import { AdminPagesController } from './admin-pages.controller';
import { AdminAffiliatesController } from './admin-affiliates.controller';

@Module({
  imports: [AuthModule, ProductsModule, OrdersModule, SubscriptionsModule, StripeModule, PagesModule, AffiliatesModule],
  controllers: [
    AdminAuthController,
    AdminDashboardController,
    AdminProductsController,
    AdminCategoriesController,
    AdminOrdersController,
    AdminSubscriptionsController,
    AdminPagesController,
    AdminAffiliatesController,
  ],
})
export class AdminModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AdminLayoutMiddleware)
      .forRoutes(
        AdminAuthController,
        AdminDashboardController,
        AdminProductsController,
        AdminCategoriesController,
        AdminOrdersController,
        AdminSubscriptionsController,
        AdminPagesController,
        AdminAffiliatesController,
      );
  }
}
