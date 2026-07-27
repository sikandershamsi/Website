import { Controller, Get, Render } from '@nestjs/common';
import { products } from '../content/products.data';
import { ingredientLibrary } from '../content/site.data';

@Controller('the-science')
export class ScienceController {
  @Get()
  @Render('science/philosophy')
  philosophy() {
    return { title: 'Our Philosophy', activeNav: 'science', scienceTab: 'philosophy' };
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
}
