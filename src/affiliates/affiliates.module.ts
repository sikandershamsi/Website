import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Affiliate, AffiliateSchema } from './schemas/affiliate.schema';
import { AffiliateClick, AffiliateClickSchema } from './schemas/affiliate-click.schema';
import { AffiliateGroup, AffiliateGroupSchema } from './schemas/affiliate-group.schema';
import { AffiliateLink, AffiliateLinkSchema } from './schemas/affiliate-link.schema';
import { AffiliatesService } from './affiliates.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Affiliate.name, schema: AffiliateSchema },
      { name: AffiliateClick.name, schema: AffiliateClickSchema },
      { name: AffiliateGroup.name, schema: AffiliateGroupSchema },
      { name: AffiliateLink.name, schema: AffiliateLinkSchema },
    ]),
  ],
  providers: [AffiliatesService],
  exports: [AffiliatesService],
})
export class AffiliatesModule {}
