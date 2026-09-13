import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MarketingAsset, MarketingAssetDocument, MarketingAssetType } from './schemas/marketing-asset.schema';

/** Shown until an admin adds real assets, so the resources page is never empty on a fresh install —
 * mirrors what used to be hardcoded directly into the template. */
const DEFAULT_ASSETS: Array<{ type: MarketingAssetType; title: string; content: string; order: number }> = [
  { type: 'image', title: 'VetroFlex', content: '/images/products/vetroflex-tub.png', order: 0 },
  { type: 'image', title: 'VetroFen', content: '/images/products/vetrofen-tub.png', order: 1 },
  { type: 'image', title: 'VetroFit', content: '/images/products/vetrofit-syringe.png', order: 2 },
  {
    type: 'copy',
    title: 'Social Caption',
    content:
      "I trust Animalife USA's root-cause, science-backed nutrition for the horses in my care — from joint support to recovery. Check them out: {{shopLink}}",
    order: 0,
  },
  {
    type: 'copy',
    title: 'Email / Newsletter Blurb',
    content:
      "I've partnered with Animalife USA because their formulations target the physiological root causes of equine performance and recovery, not just symptoms. If you're looking to support your horse's joints, inflammation response, or long-term wellness, I recommend taking a look: {{shopLink}}",
    order: 1,
  },
];

@Injectable()
export class MarketingAssetsService {
  constructor(@InjectModel(MarketingAsset.name) private readonly assetModel: Model<MarketingAssetDocument>) {}

  async listByType(type: MarketingAssetType, shopLink: string) {
    const items = await this.assetModel.find({ type }).sort({ order: 1, createdAt: 1 }).lean().exec();
    const source = items.length > 0 ? items : DEFAULT_ASSETS.filter((a) => a.type === type);
    return source.map((a) => ({ ...a, content: a.content.replace('{{shopLink}}', shopLink) }));
  }

  async listAll() {
    return this.assetModel.find().sort({ type: 1, order: 1, createdAt: 1 }).lean().exec();
  }

  async create(data: { type: MarketingAssetType; title: string; content: string; order?: number }) {
    return this.assetModel.create(data);
  }

  async delete(id: string) {
    await this.assetModel.findByIdAndDelete(id).exec();
  }
}
