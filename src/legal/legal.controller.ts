import { Controller, Get, Render } from '@nestjs/common';

@Controller()
export class LegalController {
  @Get('privacy-policy')
  @Render('legal/privacy-policy')
  privacyPolicy() {
    return { title: 'Privacy Policy' };
  }

  @Get('terms-of-use')
  @Render('legal/terms-of-use')
  termsOfUse() {
    return { title: 'Terms of Use' };
  }
}
