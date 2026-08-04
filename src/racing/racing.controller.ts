import { Controller, Get, Render } from '@nestjs/common';
import {
  performanceCascade,
  ownersTrainersFace,
  industryEffects,
  homeostasisSystems,
  homeostasisImpact,
  homeostasisComparison,
} from '../content/racing.data';
import { vetrofitTestimonials } from '../content/site.data';

@Controller('racing')
export class RacingController {
  @Get()
  @Render('racing/index')
  index() {
    return { title: 'Racing', activeNav: 'racing', racingTab: 'racing' };
  }

  @Get('industry-reality')
  @Render('racing/industry-reality')
  industryReality() {
    return {
      title: 'Racing — The Industry Reality',
      activeNav: 'racing',
      racingTab: 'industry-reality',
      performanceCascade,
      ownersTrainersFace,
      industryEffects,
    };
  }

  @Get('kidney-homeostasis')
  @Render('racing/kidney-homeostasis')
  kidneyHomeostasis() {
    return {
      title: 'Kidney Homeostasis',
      activeNav: 'racing',
      racingTab: 'kidney-homeostasis',
      homeostasisSystems,
      homeostasisImpact,
    };
  }

  @Get('kidney-distress')
  @Render('racing/kidney-distress')
  kidneyDistress() {
    return {
      title: 'Kidney Distress',
      activeNav: 'racing',
      racingTab: 'kidney-distress',
      comparison: homeostasisComparison,
    };
  }

  @Get('vetrofit')
  @Render('racing/vetrofit')
  vetrofit() {
    return {
      title: 'VetroFit for Racing',
      activeNav: 'racing',
      racingTab: 'vetrofit',
      testimonials: vetrofitTestimonials,
    };
  }
}
