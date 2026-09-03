import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Affiliate, AffiliateSchema } from './schemas/affiliate.schema';
import { AffiliatesService } from './affiliates.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: Affiliate.name, schema: AffiliateSchema }])],
  providers: [AffiliatesService],
  exports: [AffiliatesService],
})
export class AffiliatesModule {}
