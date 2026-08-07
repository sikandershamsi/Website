import { Body, Controller, Get, Post, Render } from '@nestjs/common';
import { disciplines } from '../content/site.data';
import { AmbassadorApplicationDto } from './ambassador-application.dto';

@Controller('ambassadors')
export class AmbassadorsController {
  @Get()
  @Render('ambassadors/index')
  index() {
    return { title: 'Ambassadors', activeNav: 'ambassadors', disciplines };
  }

  @Get('jenni-mcallister')
  @Render('ambassadors/profile')
  jenniProfile() {
    return { title: 'Jenni McAllister | Ambassadors', activeNav: 'ambassadors' };
  }

  @Post('apply')
  @Render('ambassadors/index')
  apply(@Body() body: AmbassadorApplicationDto) {
    return {
      title: 'Ambassadors',
      activeNav: 'ambassadors',
      disciplines,
      submitted: true,
      submittedName: body.fullName,
    };
  }
}
