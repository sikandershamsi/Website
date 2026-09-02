import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Category, CategoryDocument } from './schemas/category.schema';

@Injectable()
export class CategoriesService {
  constructor(@InjectModel(Category.name) private readonly categoryModel: Model<CategoryDocument>) {}

  async findAll() {
    const docs = await this.categoryModel.find().sort({ createdAt: 1 }).exec();
    return docs.map((d) => d.toObject());
  }

  async findBySlug(slug: string) {
    const doc = await this.categoryModel.findOne({ slug }).exec();
    return doc ? doc.toObject() : null;
  }

  async findBySlugOrThrow(slug: string) {
    const category = await this.findBySlug(slug);
    if (!category) throw new NotFoundException(`Category "${slug}" not found`);
    return category;
  }

  async upsertBySlug(slug: string, data: Partial<Category>) {
    return this.categoryModel
      .findOneAndUpdate({ slug }, { $set: data }, { upsert: true, returnDocument: 'after', setDefaultsOnInsert: true })
      .exec();
  }
}
