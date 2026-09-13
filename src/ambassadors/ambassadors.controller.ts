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
      stats: [
        { icon: 'horse', label: 'Discipline', value: 'Show Jumping' },
        { icon: 'clock', label: 'Years Competing', value: '30+' },
        { icon: 'globe', label: 'Country', value: 'USA' },
        { icon: 'map-pin', label: 'Home Base', value: 'Ocala, FL' },
      ],
      featuredProducts: [
        {
          slug: 'vetroflex',
          trademark: 'VetroFlex®',
          category: 'Joint Health & Connective Tissue',
          image: '/images/products/vetroflex-tub.webp',
        },
        {
          slug: 'vetrofen',
          trademark: 'Vetrofen®',
          category: 'Inflammation & Pain Management',
          image: '/images/products/vetrofen-tub.webp',
        },
        {
          slug: 'vetrofen-syringe',
          trademark: 'Vetrofen® Paste',
          category: 'Targeted Support & Recovery',
          image: '/images/products/vetrofen-syringe.webp',
        },
      ],
      usageCards: [
        { icon: 'gauge', label: 'Performance & Stamina', image: '/images/ambassadors/jenni/hero.jpg' },
        { icon: 'joint', label: 'Joint Mobility', image: '/images/ambassadors/disciplines/dressage.jpg' },
        { icon: 'shield-check', label: 'Inflammation Response', image: '/images/racing/distress/horse.jpg' },
        { icon: 'refresh', label: 'Recovery & Wellness', image: '/images/home/inspired-nature-horse.jpg' },
        { icon: 'heart', label: 'Senior Wellness', image: '/images/ambassadors/hero-horse.jpg' },
        { icon: 'leaf', label: 'Young Horse Development', image: '/images/ambassadors/disciplines/western.jpg' },
        { icon: 'shield-plus', label: 'Preventative Daily Maintenance', image: '/images/ambassadors/disciplines/jumping.jpg' },
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
