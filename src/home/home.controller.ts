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
      featuredProducts: [
        {
          slug: 'vetroflex',
          trademark: 'VetroFlex®',
          category: 'Cartilage – Joint – Connective Tissue Repair',
          tagline: 'Joint, Cartilage & Connective Tissue Restoration',
          price: 79,
          image: '/images/products/vetroflex-tub.webp',
        },
        {
          slug: 'vetrofen',
          trademark: 'VetroFen®',
          category: 'Inflammation & Pain Management',
          tagline: 'Advanced Inflammation & Pain Management Support',
          price: 69,
          image: '/images/products/vetrofen-tub.webp',
        },
        {
          slug: 'vetrofen',
          trademark: 'VetroFen®',
          category: 'Inflammation & Pain Management',
          tagline: 'Advanced Inflammation & Pain Management Support',
          price: 39,
          image: '/images/products/vetrofen-syringe.webp',
        },
        {
          slug: 'vetrofit',
          trademark: 'VetroFit®',
          category: 'Kidney Homeostasis Management',
          tagline: 'Oxygen Transport, Endurance & Recovery Support',
          price: 59,
          image: '/images/products/vetrofit-syringe.webp',
        },
      ],
      featuredIngredients: [
        {
          name: 'Hydrolyzed Collagen Type II',
          origin: 'Brazil',
          image: '/images/ingredients/vetroflex/hydrolyzed-collagen-191ce7a6.jpg',
        },
        {
          name: 'ACV (Chondroitin)',
          origin: 'France',
          image: '/images/ingredients/vetroflex/acv-chondroitin-3f4f985b.jpg',
        },
        {
          name: 'FOS (Fructooligosaccharides)',
          origin: 'Belgium',
          image: '/images/ingredients/vetroflex/fos-4bcbb4ab.jpg',
        },
        {
          name: 'Manganese, Copper & Zinc',
          origin: 'Global',
          image: '/images/ingredients/vetroflex/manganese-copper-zinc-d5ab9500.jpg',
        },
        {
          name: 'Biotin',
          origin: 'Switzerland',
          image: '/images/ingredients/vetroflex/biotin-220c3700.jpg',
        },
      ],
    };
  }
}
