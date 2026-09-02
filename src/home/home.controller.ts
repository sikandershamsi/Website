import { Controller, Get, Render } from '@nestjs/common';
import { PagesService } from '../pages/pages.service';
import { ProductsService } from '../products/products.service';

@Controller()
export class HomeController {
  constructor(
    private readonly pagesService: PagesService,
    private readonly productsService: ProductsService,
  ) {}

  @Get('/')
  @Render('home/index')
  async index() {
    const sections = await this.pagesService.getSectionDataByKey('home');
    const products = await this.productsService.findAll();

    const horseTruths = (sections['horse-truths'] as { items?: unknown[] })?.items ?? [];
    const standards = (sections['standards'] as { items?: unknown[] })?.items ?? [];
    const testimonials = (sections['testimonials'] as { items?: unknown[] })?.items ?? [];
    const featuredProducts = (sections['featured-products'] as { items?: unknown[] })?.items ?? [];
    const featuredIngredients = (sections['featured-ingredients'] as { items?: unknown[] })?.items ?? [];

    return {
      title: undefined,
      activeNav: 'home',
      horseTruths,
      standards,
      testimonials,
      products,
      featuredProducts,
      featuredIngredients,
    };
  }
}
