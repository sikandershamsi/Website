import { Controller, Get, Redirect, Render } from '@nestjs/common';
import { findProduct, products } from '../content/products.data';
import { ingredientLibrary, sciencePillars, targetedSupportProducts } from '../content/site.data';

@Controller('the-science')
export class ScienceController {
  private performanceView() {
    return {
      title: 'The Science Behind Performance',
      activeNav: 'science',
      scienceTab: 'performance',
      products,
      sciencePillars,
      targetedSupportProducts,
      vetrofenPrimary: findProduct('vetrofen'),
    };
  }

  @Get()
  @Render('science/performance')
  index() {
    return this.performanceView();
  }

  @Get('philosophy')
  @Render('science/philosophy')
  philosophyPage() {
    return { title: 'Our Philosophy', activeNav: 'science', scienceTab: 'philosophy' };
  }

  @Get('performance')
  @Render('science/performance')
  performance() {
    return this.performanceView();
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

  // Racing & Kidney content moved to their own top-level /racing section.
  @Get('racing')
  @Redirect('/racing#industry-reality', 301)
  racingRedirect() {}

  @Get('kidney-homeostasis')
  @Redirect('/racing#kidney-homeostasis', 301)
  kidneyRedirect() {}
}
