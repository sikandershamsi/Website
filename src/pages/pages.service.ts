import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Page, PageDocument } from './schemas/page.schema';
import { Section } from './schemas/section.schema';

@Injectable()
export class PagesService {
  constructor(@InjectModel(Page.name) private readonly pageModel: Model<PageDocument>) {}

  async findBySlug(slug: string) {
    const doc = await this.pageModel.findOne({ slug }).exec();
    return doc ? doc.toObject() : null;
  }

  async findBySlugOrThrow(slug: string) {
    const page = await this.findBySlug(slug);
    if (!page) throw new NotFoundException(`Page "${slug}" not found`);
    return page;
  }

  /** Returns { [sectionKey]: section.data } for visible sections, ordered — a convenient shape for controllers. */
  async getSectionDataByKey(slug: string): Promise<Record<string, unknown>> {
    const page = await this.findBySlug(slug);
    if (!page) return {};
    const visible = [...page.sections].filter((s) => s.visible).sort((a, b) => a.order - b.order);
    return Object.fromEntries(visible.map((s) => [s.key, s.data]));
  }

  async upsertPage(slug: string, title: string, sections: Section[]) {
    return this.pageModel
      .findOneAndUpdate({ slug }, { $set: { title, sections } }, { upsert: true, returnDocument: 'after', setDefaultsOnInsert: true })
      .exec();
  }

  async updateSectionData(slug: string, sectionKey: string, data: Record<string, unknown>) {
    const doc = await this.pageModel.findOne({ slug }).exec();
    if (!doc) throw new NotFoundException(`Page "${slug}" not found`);
    const section = doc.sections.find((s) => s.key === sectionKey);
    if (!section) throw new NotFoundException(`Section "${sectionKey}" not found on page "${slug}"`);
    section.data = data;
    await doc.save();
    return doc;
  }
}
