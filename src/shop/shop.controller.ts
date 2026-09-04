import { Controller, Get, NotFoundException, Param, Query, Render } from '@nestjs/common';
import { testimonials, vetrofitTestimonials } from '../content/site.data';
import { ProductsService } from '../products/products.service';
import { CategoriesService } from '../products/categories.service';

@Controller('shop')
export class ShopController {
  constructor(
    private readonly productsService: ProductsService,
    private readonly categoriesService: CategoriesService,
  ) {}

  @Get()
  @Render('shop/index')
  async index(@Query('added') added?: string) {
    const [categories, products] = await Promise.all([
      this.categoriesService.findAll(),
      this.productsService.findAll(),
    ]);
    return {
      title: 'Shop All Products',
      activeNav: 'shop',
      categories,
      products,
      addedSlug: added,
    };
  }

  @Get('category/:slug')
  @Render('shop/category')
  async category(@Param('slug') slug: string) {
    const category = await this.categoriesService.findBySlug(slug);
    if (!category) throw new NotFoundException('Category not found');
    return {
      title: category.name,
      activeNav: 'shop',
      category,
      products: await this.productsService.findByCategorySlug(slug),
    };
  }

  @Get('product/:slug')
  @Render('shop/product')
  async product(@Param('slug') slug: string) {
    const product = await this.productsService.findBySlug(slug);
    if (!product) throw new NotFoundException('Product not found');
    const reviews =
      slug === 'vetrofit'
        ? vetrofitTestimonials.map((t) => ({ ...t, product: 'VetroFit' }))
        : testimonials.filter((t) => t.product.toLowerCase() === (product.name as string).toLowerCase());
    const allProducts = await this.productsService.findAll();
    return {
      title: product.name,
      activeNav: 'shop',
      product,
      related: allProducts.filter((p) => p.slug !== slug),
      reviews,
    };
  }
}
