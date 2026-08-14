import { Body, Controller, Get, Post, Render } from '@nestjs/common';
import {
  performanceCascade,
  cascadeSummary,
  ownersTrainersFace,
  kidneyHomeostasisBanner,
  kidneyMasterRegulator,
  oxygenTransport,
  kidneyDistressBanner,
  industryEffects,
  homeostasisSystems,
  homeostasisImpact,
  homeostasisComparison,
  vetrofitRacingBanner,
  scienceBehindVetrofit,
  physiologyToFormulation,
  brandsVsAnimalife,
  performanceEvaluationBanner,
} from '../content/racing.data';
import { findProduct } from '../content/products.data';
import { vetrofitTestimonials } from '../content/site.data';
import { PerformanceEvaluationDto } from './performance-evaluation.dto';

@Controller('racing')
export class RacingController {
  @Get()
  @Render('racing/index')
  index() {
    const vetrofitPrimary = findProduct('vetrofit');
    return {
      title: 'Racing',
      activeNav: 'racing',
      racingTab: 'racing',
      performanceCascade,
      cascadeSummary,
      ownersTrainersFace,
      kidneyHomeostasisBanner,
      kidneyMasterRegulator,
      oxygenTransport,
      kidneyDistressBanner,
      homeostasisComparison,
      vetrofitRacingBanner,
      testimonials: vetrofitTestimonials,
      scienceBehindVetrofit,
      physiologyBenefits: vetrofitPrimary?.physiologyBenefits,
      physiologyToFormulation,
      vetrofitPrimary,
      brandsVsAnimalife,
      performanceEvaluationBanner,
    };
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

  @Get('performance-evaluation')
  @Render('racing/performance-evaluation')
  performanceEvaluation() {
    return {
      title: 'VetroFit® Performance Evaluation Program',
      activeNav: 'racing',
      racingTab: 'vetrofit',
    };
  }

  @Get('performance-evaluation/apply')
  @Render('racing/performance-evaluation-apply')
  performanceEvaluationApply() {
    return {
      title: 'Performance Evaluation Program — Application',
      activeNav: 'racing',
      racingTab: 'vetrofit',
    };
  }

  @Post('performance-evaluation/apply')
  @Render('racing/performance-evaluation-apply')
  submitPerformanceEvaluation(@Body() body: PerformanceEvaluationDto) {
    return {
      title: 'Performance Evaluation Program — Application',
      activeNav: 'racing',
      racingTab: 'vetrofit',
      submitted: true,
      submittedName: `${body.firstName} ${body.lastName}`.trim(),
    };
  }
}
