import { Body, Controller, Get, Post, Query, Render, Req, Res } from '@nestjs/common';
import type { Request, Response } from 'express';
import { horseIQItems } from '../content/horse-iq.data';

@Controller('horse-iq')
export class HorseIqController {
  @Post('subscribe')
  subscribe(@Body('email') email: string, @Req() req: Request, @Res() res: Response) {
    const referer = req.get('referer') || '/';
    const separator = referer.includes('?') ? '&' : '?';
    res.redirect(email ? `${referer}${separator}subscribed=1` : referer);
  }

  @Get()
  @Render('horse-iq/index')
  index(@Query('q') q?: string) {
    const query = (q || '').trim().toLowerCase();
    const items = query
      ? horseIQItems.filter(
          (item) =>
            item.title.toLowerCase().includes(query) ||
            item.description.toLowerCase().includes(query),
        )
      : horseIQItems;
    return {
      title: 'Horse IQ',
      activeNav: 'horseiq',
      items,
      query: q || '',
    };
  }
}
