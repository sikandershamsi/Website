import { Controller, Get, Redirect, Render } from '@nestjs/common';
import { products } from '../content/products.data';
import { ingredientLibrary, inflammationBenefits, sciencePillars } from '../content/site.data';

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
      sciencePillars,
      inflammationBenefits,
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
      sciencePillars,
      inflammationBenefits,
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

  // Racing & Kidney content moved to their own top-level /racing section.
  @Get('racing')
  @Redirect('/racing/industry-reality', 301)
  racingRedirect() {}

  @Get('kidney-homeostasis')
  @Redirect('/racing/kidney-homeostasis', 301)
  kidneyRedirect() {}
}
