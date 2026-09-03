import { Body, Controller, Get, Post, Render, Req, Res } from '@nestjs/common';
import type { Request, Response } from 'express';
import { IsEmail, IsString, MinLength } from 'class-validator';
import { AuthService } from '../auth/auth.service';

class AdminLoginDto {
  @IsEmail() email: string;
  @IsString() @MinLength(1) password: string;
}

@Controller('admin')
export class AdminAuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('login')
  @Render('admin/login')
  login(@Req() req: Request) {
    const alreadyIn = Boolean(req.session?.userId && req.session.role === 'admin');
    return { title: 'Sign In', alreadyIn };
  }

  @Post('login')
  async submitLogin(@Req() req: Request, @Res() res: Response, @Body() body: AdminLoginDto) {
    try {
      const user = await this.authService.validateLogin(body.email, body.password, 'admin');
      req.session.userId = String(user._id);
      req.session.role = user.role;
      req.session.email = user.email;
      res.redirect(303, '/admin');
    } catch {
      res.render('admin/login', { title: 'Sign In', notice: 'Invalid email or password.' });
    }
  }

  @Post('logout')
  logout(@Req() req: Request, @Res() res: Response) {
    req.session.destroy(() => res.redirect(303, '/admin/login'));
  }
}
