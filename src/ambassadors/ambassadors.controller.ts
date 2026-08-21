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
    return {
      title: 'Jenni McAllister | Ambassadors',
      activeNav: 'ambassadors',
      featuredProducts: [
        {
          slug: 'vetroflex',
          trademark: 'VetroFlex®',
          category: 'Cartilage – Joint – Connective Tissue Repair',
          tagline: 'Joint, Cartilage & Connective Tissue Support',
          price: 79,
          image: '/images/products/vetroflex-tub.webp',
        },
        {
          slug: 'vetrofen',
          trademark: 'VetroFen®',
          category: 'Inflammation & Pain Management',
          tagline: 'Advanced Inflammation & Pain Management Support',
          price: 69,
          image: '/images/products/vetrofen-tub.webp',
        },
        {
          slug: 'vetrofit',
          trademark: 'VetroFit®',
          category: 'Kidney Homeostasis Management',
          tagline: 'Oxygen Transport, Endurance & Recovery Support',
          price: 59,
          image: '/images/products/vetrofit-syringe.webp',
        },
      ],
    };
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
