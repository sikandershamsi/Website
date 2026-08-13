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
        {
          name: 'Hydrolyzed Collagen Type II',
          origin: 'Brazil',
          image: '/images/ingredients/vetroflex/hydrolyzed-collagen.jpg',
        },
        {
          name: 'ACV (Chondroitin)',
          origin: 'France',
          image: '/images/ingredients/vetroflex/acv-chondroitin.jpg',
        },
        {
          name: 'FOS (Fructooligosaccharides)',
          origin: 'Belgium',
          image: '/images/ingredients/vetroflex/fos.jpg',
        },
        {
          name: 'Manganese, Copper & Zinc',
          origin: 'Global',
          image: '/images/ingredients/vetroflex/manganese-copper-zinc.jpg',
        },
        {
          name: 'Biotin',
          origin: 'Switzerland',
          image: '/images/ingredients/vetroflex/biotin.jpg',
        },
      ],
    };
  }
}
