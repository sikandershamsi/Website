import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product, ProductDocument } from './schemas/product.schema';

/**
 * Flattens `marketingBlocks` back onto the top level so existing Handlebars templates
 * (which reference `product.whatItIs`, `product.kidneyShowcase`, etc. directly) keep
 * working unchanged. Typed fields win on any name collision.
 */
export function toProductViewModel(doc: ProductDocument | (Product & { _id: unknown })) {
  const plain = typeof (doc as ProductDocument).toObject === 'function' ? (doc as ProductDocument).toObject() : doc;
  const { marketingBlocks, ...typed } = plain as Product & { marketingBlocks?: Record<string, unknown> };
  return { ...(marketingBlocks ?? {}), ...typed, id: String((plain as { _id: unknown })._id) };
}

@Injectable()
export class ProductsService {
  constructor(@InjectModel(Product.name) private readonly productModel: Model<ProductDocument>) {}

  async findAll(includeInactive = false) {
    const filter = includeInactive ? {} : { active: true };
    const docs = await this.productModel.find(filter).sort({ createdAt: 1 }).exec();
    return docs.map(toProductViewModel);
  }

  async findAllRaw(includeInactive = true) {
    const filter = includeInactive ? {} : { active: true };
    return this.productModel.find(filter).sort({ createdAt: 1 }).lean().exec();
  }

  async findBySlug(slug: string, includeInactive = false) {
    const filter: Record<string, unknown> = { slug };
    if (!includeInactive) filter.active = true;
    const doc = await this.productModel.findOne(filter).exec();
    if (!doc) return null;
    return toProductViewModel(doc);
  }

  async findBySlugOrThrow(slug: string) {
    const product = await this.findBySlug(slug);
    if (!product) throw new NotFoundException(`Product "${slug}" not found`);
    return product;
  }

  async findByCategorySlug(categorySlug: string) {
    const docs = await this.productModel.find({ categorySlug, active: true }).sort({ createdAt: 1 }).exec();
    return docs.map(toProductViewModel);
  }

  async findByIdRaw(id: string) {
    return this.productModel.findById(id).lean().exec();
  }

  async upsertBySlug(slug: string, data: Partial<Product>) {
    return this.productModel
      .findOneAndUpdate({ slug }, { $set: data }, { upsert: true, returnDocument: 'after', setDefaultsOnInsert: true })
      .exec();
  }

  async setStripeLinks(
    productId: string,
    links: { productId: string; oneTimePriceId: string; subscriptionPriceId: string },
  ) {
    return this.productModel
      .findByIdAndUpdate(productId, {
        $set: {
          'stripe.productId': links.productId,
          'stripe.oneTimePriceId': links.oneTimePriceId,
          'stripe.subscriptionPriceId': links.subscriptionPriceId,
        },
      })
      .exec();
  }

  async updateAdminFields(id: string, data: Partial<Product>) {
    const doc = await this.productModel.findByIdAndUpdate(id, { $set: data }, { returnDocument: 'after' }).exec();
    if (!doc) throw new NotFoundException('Product not found');
    return doc;
  }

  async setActive(id: string, active: boolean) {
    return this.productModel.findByIdAndUpdate(id, { $set: { active } }, { returnDocument: 'after' }).exec();
  }
}
