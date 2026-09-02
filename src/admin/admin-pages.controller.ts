import { Body, Controller, Get, NotFoundException, Param, Post, Render, Res, UseGuards } from '@nestjs/common';
import type { Response } from 'express';
import { AdminGuard } from '../auth/guards/admin.guard';
import { PagesService } from '../pages/pages.service';
import { getSectionType } from '../pages/section-types';

@Controller('admin/pages/home')
@UseGuards(AdminGuard)
export class AdminPagesController {
  constructor(private readonly pagesService: PagesService) {}

  @Get()
  @Render('admin/pages/home')
  async home() {
    const page = await this.pagesService.findBySlugOrThrow('home');
    const sections = [...page.sections].sort((a, b) => a.order - b.order);
    return { title: 'Home Page', sections };
  }

  @Get('sections/:key')
  @Render('admin/pages/section-edit')
  async editSection(@Param('key') key: string) {
    const page = await this.pagesService.findBySlugOrThrow('home');
    const section = page.sections.find((s) => s.key === key);
    if (!section) throw new NotFoundException('Section not found');
    const definition = getSectionType(section.type);
    if (!definition) throw new NotFoundException(`Unknown section type "${section.type}"`);
    return { title: definition.label, section, partial: definition.adminPartial };
  }

  @Post('sections/:key')
  async updateSection(@Param('key') key: string, @Body() body: Record<string, unknown>, @Res() res: Response) {
    const page = await this.pagesService.findBySlugOrThrow('home');
    const section = page.sections.find((s) => s.key === key);
    if (!section) throw new NotFoundException('Section not found');
    const definition = getSectionType(section.type);
    if (!definition) throw new NotFoundException(`Unknown section type "${section.type}"`);
    const data = definition.parseFormData(body);
    await this.pagesService.updateSectionData('home', key, data);
    res.redirect('/admin/pages/home');
  }
}
