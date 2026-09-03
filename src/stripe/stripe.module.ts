import { forwardRef, Module } from '@nestjs/common';
import { StripeService } from './stripe.service';
import { StripeWebhookController } from './stripe-webhook.controller';
import { ProductsModule } from '../products/products.module';
import { OrdersModule } from '../orders/orders.module';
import { SubscriptionsModule } from '../subscriptions/subscriptions.module';
import { CartModule } from '../cart/cart.module';
import { AffiliatesModule } from '../affiliates/affiliates.module';

@Module({
  imports: [ProductsModule, OrdersModule, SubscriptionsModule, forwardRef(() => CartModule), AffiliatesModule],
  controllers: [StripeWebhookController],
  providers: [StripeService],
  exports: [StripeService],
})
export class StripeModule {}
