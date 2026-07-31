import { Controller, Get, Render } from '@nestjs/common';
import { products } from '../content/products.data';
import { ingredientLibrary, vetrofitTestimonials } from '../content/site.data';

@Controller('the-science')
export class ScienceController {
  @Get()
  @Render('science/performance')
  index() {
    return {
      title: 'The Science Behind Performance',
      activeNav: 'science',
      scienceTab: 'performance',
      products,
    };
  }

  @Get('philosophy')
  @Render('science/philosophy')
  philosophyPage() {
    return { title: 'Our Philosophy', activeNav: 'science', scienceTab: 'philosophy' };
  }

  @Get('performance')
  @Render('science/performance')
  performance() {
    return {
      title: 'The Science Behind Performance',
      activeNav: 'science',
      scienceTab: 'performance',
      products,
    };
  }

  @Get('ingredients')
  @Render('science/ingredients')
  ingredients() {
    return {
      title: 'Ingredient Library',
      activeNav: 'science',
      scienceTab: 'ingredients',
      ingredientLibrary,
    };
  }

  @Get('racing')
  @Render('science/racing')
  racing() {
    return {
      title: 'Racing — The Industry Reality',
      activeNav: 'science',
      scienceTab: 'racing',
    };
  }

  @Get('kidney-homeostasis')
  @Render('science/kidney')
  kidney() {
    return {
      title: 'Kidney Homeostasis',
      activeNav: 'science',
      scienceTab: 'kidney',
      testimonials: vetrofitTestimonials,
    };
  }
}
