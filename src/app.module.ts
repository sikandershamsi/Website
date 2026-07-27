import { Module } from '@nestjs/common';
import { CartModule } from './cart/cart.module';
import { HomeModule } from './home/home.module';
import { ScienceModule } from './science/science.module';
import { ShopModule } from './shop/shop.module';
import { AboutModule } from './about/about.module';
import { AmbassadorsModule } from './ambassadors/ambassadors.module';
import { ProfessionalsModule } from './professionals/professionals.module';
import { HorseIqModule } from './horse-iq/horse-iq.module';
import { AccountModule } from './account/account.module';

@Module({
  imports: [
    CartModule,
    HomeModule,
    ScienceModule,
    ShopModule,
    AboutModule,
    AmbassadorsModule,
    ProfessionalsModule,
    HorseIqModule,
    AccountModule,
  ],
})
export class AppModule {}
