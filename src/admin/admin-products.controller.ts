import { Body, Controller, Get, NotFoundException, Param, Post, Render, Res, UseGuards } from '@nestjs/common';
import type { Response } from 'express';
import { AdminGuard } from '../auth/guards/admin.guard';
import { ProductsService } from '../products/products.service';
import { CategoriesService } from '../products/categories.service';
import { StripeService } from '../stripe/stripe.service';
import { ProductFormDto } from './dto/product-form.dto';

@Controller('admin/products')
@UseGuards(AdminGuard)
export class AdminProductsController {
  constructor(
    private readonly productsService: ProductsService,
    private readonly categoriesService: CategoriesService,
    private readonly stripeService: StripeService,
  ) {}

  @Get()
  @Render('admin/products/index')
  async index() {
    const products = await this.productsService.findAllRaw();
    return { title: 'Products', products };
  }

  @Get('new')
  @Render('admin/products/form')
  async newForm() {
    const categories = await this.categoriesService.findAll();
    return { title: 'New Product', categories, isNew: true, product: {} };
  }

  @Post('new')
  async create(@Body() body: ProductFormDto, @Res() res: Response) {
    const doc = await this.productsService.upsertBySlug(body.slug, body);
    if (this.stripeService.isConfigured()) {
      await this.stripeService.syncProductToStripe(String(doc._id)).catch(() => undefined);
    }
    res.redirect('/admin/products');
  }

  @Get(':id/edit')
  @Render('admin/products/form')
  async editForm(@Param('id') id: string) {
    const product = await this.productsService.findByIdRaw(id);
    if (!product) throw new NotFoundException('Product not found');
    const categories = await this.categoriesService.findAll();
    return { title: `Edit ${product.name}`, categories, isNew: false, product };
  }

  @Post(':id')
  async update(@Param('id') id: string, @Body() body: ProductFormDto, @Res() res: Response) {
    await this.productsService.updateAdminFields(id, body);
    if (this.stripeService.isConfigured()) {
      await this.stripeService.syncProductToStripe(id).catch(() => undefined);
    }
    res.redirect('/admin/products');
  }

  @Post(':id/delete')
  async softDelete(@Param('id') id: string, @Res() res: Response) {
    await this.productsService.setActive(id, false);
    res.redirect('/admin/products');
  }
}
