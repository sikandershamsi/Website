import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MarketingAsset, MarketingAssetSchema } from './schemas/marketing-asset.schema';
import { MarketingAssetsService } from './marketing-assets.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: MarketingAsset.name, schema: MarketingAssetSchema }])],
  providers: [MarketingAssetsService],
  exports: [MarketingAssetsService],
})
export class MarketingAssetsModule {}
