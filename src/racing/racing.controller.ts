import { Body, Controller, Get, Post, Redirect, Render } from '@nestjs/common';
import {
  performanceCascade,
  cascadePlot,
  cascadeSummary,
  ownersTrainersFace,
  kidneyHomeostasisBanner,
  kidneyMasterRegulator,
  oxygenTransport,
  kidneyDistressBanner,
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
      performanceCascade,
      cascadePlot,
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
  @Redirect('/racing#industry-reality', 301)
  industryReality() {}

  @Get('kidney-homeostasis')
  @Redirect('/racing#kidney-homeostasis', 301)
  kidneyHomeostasis() {}

  @Get('kidney-distress')
  @Redirect('/racing#kidney-distress', 301)
  kidneyDistress() {}

  @Get('vetrofit')
  @Redirect('/racing#vetrofit', 301)
  vetrofit() {}

  @Get('performance-evaluation')
  @Render('racing/performance-evaluation')
  performanceEvaluation() {
    return {
      title: 'VetroFit® Performance Evaluation Program',
      activeNav: 'racing',
    };
  }

  @Get('performance-evaluation/apply')
  @Render('racing/performance-evaluation-apply')
  performanceEvaluationApply() {
    return {
      title: 'Performance Evaluation Program — Application',
      activeNav: 'racing',
    };
  }

  @Post('performance-evaluation/apply')
  @Render('racing/performance-evaluation-apply')
  submitPerformanceEvaluation(@Body() body: PerformanceEvaluationDto) {
    return {
      title: 'Performance Evaluation Program — Application',
      activeNav: 'racing',
      submitted: true,
      submittedName: `${body.firstName} ${body.lastName}`.trim(),
    };
  }
}
