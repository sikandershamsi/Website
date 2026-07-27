import { Controller, Get, Render } from '@nestjs/common';

@Controller('about')
export class AboutController {
  @Get()
  @Render('about/story')
  story() {
    return { title: 'Our Story', activeNav: 'about', aboutTab: 'story' };
  }

  @Get('difference')
  @Render('about/difference')
  difference() {
    return { title: 'The Animalife Difference', activeNav: 'about', aboutTab: 'difference' };
  }
}
