import { Body, Controller, Get, Post, Render } from '@nestjs/common';
import { affiliateAudiences } from '../content/site.data';
import { AffiliateApplicationDto } from './affiliate-application.dto';

@Controller('professionals')
export class ProfessionalsController {
  @Get()
  @Render('professionals/index')
  index() {
    return { title: 'Professionals Rewards Program', activeNav: 'professionals', affiliateAudiences };
  }

  @Get('apply')
  @Render('professionals/apply')
  applyForm() {
    return { title: 'Affiliate Application', activeNav: 'professionals' };
  }

  @Post('apply')
  @Render('professionals/apply')
  submitApplication(@Body() body: AffiliateApplicationDto) {
    return {
      title: 'Affiliate Application',
      activeNav: 'professionals',
      submitted: true,
      submittedName: body.fullName,
    };
  }

  @Get('login')
  @Render('professionals/login')
  login() {
    return { title: 'Affiliate Login', activeNav: 'professionals' };
  }

  @Post('login')
  @Render('professionals/login')
  submitLogin() {
    return {
      title: 'Affiliate Login',
      activeNav: 'professionals',
      notice: 'The Affiliate Portal is being finalized. In the meantime, our team can look up your account directly — reach out at partnerships@animalifeusa.com.',
    };
  }
}
