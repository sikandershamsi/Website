import { Body, Controller, Get, Post, Render, Req, Res } from '@nestjs/common';
import type { Request, Response } from 'express';
import { affiliateAudiences } from '../content/site.data';
import { AffiliateApplicationDto } from './affiliate-application.dto';
import { AffiliatesService } from '../affiliates/affiliates.service';

@Controller('professionals')
export class ProfessionalsController {
  constructor(private readonly affiliatesService: AffiliatesService) {}

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
  async submitApplication(@Body() body: AffiliateApplicationDto) {
    try {
      await this.affiliatesService.createApplication({ ...body });
      return {
        title: 'Affiliate Application',
        activeNav: 'professionals',
        submitted: true,
        submittedName: body.fullName,
      };
    } catch {
      return {
        title: 'Affiliate Application',
        activeNav: 'professionals',
        notice: 'An application with this email already exists. If you’ve applied before, our team will be in touch, or reach out at partnerships@animalifeusa.com.',
      };
    }
  }

  @Get('login')
  @Render('professionals/login')
  login(@Req() req: Request) {
    const alreadyIn = Boolean(req.session?.userId && req.session.role === 'affiliate');
    return { title: 'Affiliate Login', activeNav: 'professionals', alreadyIn };
  }

  @Post('login')
  async submitLogin(@Req() req: Request, @Res() res: Response, @Body('email') email: string, @Body('password') password: string) {
    try {
      const affiliate = await this.affiliatesService.validateLogin(email, password);
      req.session.userId = String(affiliate._id);
      req.session.role = 'affiliate';
      req.session.email = affiliate.email;
      res.redirect(303, '/professionals/portal');
    } catch {
      res.render('professionals/login', {
        title: 'Affiliate Login',
        activeNav: 'professionals',
        notice: 'Invalid email or password. If your application was recently approved, check your inbox for login details.',
      });
    }
  }

  @Post('logout')
  logout(@Req() req: Request, @Res() res: Response) {
    req.session.destroy(() => res.redirect(303, '/professionals/login'));
  }
}
