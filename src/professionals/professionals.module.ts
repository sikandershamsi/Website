import { Module } from '@nestjs/common';
import { ProfessionalsController } from './professionals.controller';
import { AffiliatePortalController } from './affiliate-portal.controller';
import { AffiliatesModule } from '../affiliates/affiliates.module';
import { OrdersModule } from '../orders/orders.module';
import { PayoutsModule } from '../payouts/payouts.module';
import { StripeModule } from '../stripe/stripe.module';

@Module({
  imports: [AffiliatesModule, OrdersModule, PayoutsModule, StripeModule],
  controllers: [ProfessionalsController, AffiliatePortalController],
})
export class ProfessionalsModule {}
