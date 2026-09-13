import { Module } from '@nestjs/common';
import { ProfessionalsController } from './professionals.controller';
import { AffiliatePortalController } from './affiliate-portal.controller';
import { AffiliatesModule } from '../affiliates/affiliates.module';
import { OrdersModule } from '../orders/orders.module';
import { PayoutsModule } from '../payouts/payouts.module';

@Module({
  imports: [AffiliatesModule, OrdersModule, PayoutsModule],
  controllers: [ProfessionalsController, AffiliatePortalController],
})
export class ProfessionalsModule {}
