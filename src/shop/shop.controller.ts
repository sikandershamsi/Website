import { Controller, Get, NotFoundException, Param, Render } from '@nestjs/common';
import { categories, findProduct, productsByCategory, products } from '../content/products.data';
import { testimonials, vetrofitTestimonials } from '../content/site.data';

@Controller('shop')
export class ShopController {
  @Get()
  @Render('shop/index')
  index() {
    return {
      title: 'Shop All Products',
      activeNav: 'shop',
      categories,
      products,
    };
  }

  @Get('category/:slug')
  @Render('shop/category')
  category(@Param('slug') slug: string) {
    const category = categories.find((c) => c.slug === slug);
    if (!category) throw new NotFoundException('Category not found');
    return {
      title: category.name,
      activeNav: 'shop',
      category,
      products: productsByCategory(slug),
    };
  }

  @Get('product/:slug')
  @Render('shop/product')
  product(@Param('slug') slug: string) {
    const product = findProduct(slug);
    if (!product) throw new NotFoundException('Product not found');
    const reviews =
      slug === 'vetrofit'
        ? vetrofitTestimonials.map((t) => ({ ...t, product: 'VetroFit' }))
        : testimonials.filter((t) => t.product.toLowerCase() === product.name.toLowerCase());
    return {
      title: product.name,
      activeNav: 'shop',
      product,
      related: products.filter((p) => p.slug !== slug),
      reviews,
    };
  }
}
