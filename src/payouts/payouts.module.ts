import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PayoutBatch, PayoutBatchSchema } from './schemas/payout-batch.schema';
import { PayoutsService } from './payouts.service';
import { OrdersModule } from '../orders/orders.module';

@Module({
  imports: [MongooseModule.forFeature([{ name: PayoutBatch.name, schema: PayoutBatchSchema }]), OrdersModule],
  providers: [PayoutsService],
  exports: [PayoutsService],
})
export class PayoutsModule {}
