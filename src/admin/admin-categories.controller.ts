import { Body, Controller, Get, NotFoundException, Param, Post, Render, Res, UseGuards } from '@nestjs/common';
import type { Response } from 'express';
import { AdminGuard } from '../auth/guards/admin.guard';
import { CategoriesService } from '../products/categories.service';
import { CategoryFormDto } from './dto/category-form.dto';

@Controller('admin/categories')
@UseGuards(AdminGuard)
export class AdminCategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get()
  @Render('admin/categories/index')
  async index() {
    const categories = await this.categoriesService.findAll();
    return { title: 'Categories', categories };
  }

  @Get('new')
  @Render('admin/categories/form')
  newForm() {
    return { title: 'New Category', isNew: true, category: {} };
  }

  @Post('new')
  async create(@Body() body: CategoryFormDto, @Res() res: Response) {
    await this.categoriesService.upsertBySlug(body.slug, body);
    res.redirect(303, '/admin/categories');
  }

  @Get(':slug/edit')
  @Render('admin/categories/form')
  async editForm(@Param('slug') slug: string) {
    const category = await this.categoriesService.findBySlug(slug);
    if (!category) throw new NotFoundException('Category not found');
    return { title: `Edit ${category.name}`, isNew: false, category };
  }

  @Post(':slug')
  async update(@Param('slug') slug: string, @Body() body: CategoryFormDto, @Res() res: Response) {
    await this.categoriesService.upsertBySlug(slug, body);
    res.redirect(303, '/admin/categories');
  }
}
