import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PayoutBatch, PayoutBatchSchema } from './schemas/payout-batch.schema';
import { PayoutsService } from './payouts.service';
import { OrdersModule } from '../orders/orders.module';
import { StripeModule } from '../stripe/stripe.module';
import { AffiliatesModule } from '../affiliates/affiliates.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: PayoutBatch.name, schema: PayoutBatchSchema }]),
    OrdersModule,
    AffiliatesModule,
    forwardRef(() => StripeModule),
  ],
  providers: [PayoutsService],
  exports: [PayoutsService],
})
export class PayoutsModule {}
