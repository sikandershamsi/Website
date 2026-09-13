import { Body, Controller, Get, Post, Query, Render, Req, Res } from '@nestjs/common';
import type { Request, Response } from 'express';
import { affiliateAudiences } from '../content/site.data';
import { AffiliateApplicationDto } from './affiliate-application.dto';
import { AffiliatesService } from '../affiliates/affiliates.service';
import { RequestPasswordResetDto, ResetPasswordDto } from './dto/password-reset.dto';

/** Matches the earnings calculator's own slider bounds (5-40%) on the professionals page. */
function clampRatePercent(raw?: string): number | undefined {
  const n = Number(raw);
  if (!raw || Number.isNaN(n)) return undefined;
  return Math.min(40, Math.max(5, Math.round(n)));
}

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
  applyForm(@Query('rate') rate?: string) {
    const requestedRatePercent = clampRatePercent(rate);
    return { title: 'Affiliate Application', activeNav: 'professionals', requestedRatePercent };
  }

  @Post('apply')
  @Render('professionals/apply')
  async submitApplication(@Body() body: AffiliateApplicationDto) {
    try {
      const requestedRatePercent = clampRatePercent(String(body.requestedRatePercent ?? ''));
      await this.affiliatesService.createApplication({
        ...body,
        commissionRate: requestedRatePercent !== undefined ? requestedRatePercent / 100 : undefined,
      });
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

  @Get('verify-email')
  @Render('professionals/verify-email')
  async verifyEmail(@Query('token') token?: string) {
    const verified = token ? await this.affiliatesService.verifyEmail(token) : false;
    return { title: 'Verify Email', activeNav: 'professionals', verified };
  }

  @Get('forgot-password')
  @Render('professionals/forgot-password')
  forgotPasswordForm() {
    return { title: 'Forgot Password', activeNav: 'professionals' };
  }

  @Post('forgot-password')
  @Render('professionals/forgot-password')
  async submitForgotPassword(@Body() body: RequestPasswordResetDto) {
    await this.affiliatesService.requestPasswordReset(body.email);
    return { title: 'Forgot Password', activeNav: 'professionals', submitted: true };
  }

  @Get('reset-password')
  @Render('professionals/reset-password')
  resetPasswordForm(@Query('token') token?: string) {
    return { title: 'Reset Password', activeNav: 'professionals', token };
  }

  @Post('reset-password')
  @Render('professionals/reset-password')
  async submitResetPassword(@Body() body: ResetPasswordDto) {
    const ok = await this.affiliatesService.resetPassword(body.token, body.newPassword);
    if (!ok) {
      return { title: 'Reset Password', activeNav: 'professionals', token: body.token, notice: 'This reset link is invalid or has expired.' };
    }
    return { title: 'Reset Password', activeNav: 'professionals', success: true };
  }
}
