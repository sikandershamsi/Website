import { Controller, Get, Render } from '@nestjs/common';
import { horseTruths, standards, testimonials } from '../content/site.data';
import { products } from '../content/products.data';

@Controller()
export class HomeController {
  @Get('/')
  @Render('home/index')
  index() {
    return {
      title: undefined,
      activeNav: 'home',
      horseTruths,
      standards,
      testimonials: testimonials.slice(0, 6),
      products,
    };
  }
}
