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
      testimonials: testimonials.slice(0, 8),
      products,
      featuredIngredients: [
        { name: 'Hyaluronic Acid', origin: 'Origin: Global', icon: 'beaker' },
        { name: 'Collagen Type II', origin: 'Origin: Brazil', icon: 'leaf' },
        { name: 'MSM', origin: 'Origin: Global', icon: 'flask' },
        { name: 'Glucosamine', origin: 'Origin: Global', icon: 'shield-check' },
        { name: 'ACV Chondroitin', origin: 'Origin: France', icon: 'flask' },
        { name: 'Biotin', origin: 'Origin: Switzerland', icon: 'horseshoe' },
      ],
    };
  }
}
