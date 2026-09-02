import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';
import { validationSchema } from './config/validation.schema';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ProductsModule } from './products/products.module';
import { OrdersModule } from './orders/orders.module';
import { SubscriptionsModule } from './subscriptions/subscriptions.module';
import { StripeModule } from './stripe/stripe.module';
import { PagesModule } from './pages/pages.module';
import { AdminModule } from './admin/admin.module';
import { CartModule } from './cart/cart.module';
import { HomeModule } from './home/home.module';
import { ScienceModule } from './science/science.module';
import { ShopModule } from './shop/shop.module';
import { AboutModule } from './about/about.module';
import { AmbassadorsModule } from './ambassadors/ambassadors.module';
import { ProfessionalsModule } from './professionals/professionals.module';
import { HorseIqModule } from './horse-iq/horse-iq.module';
import { AccountModule } from './account/account.module';
import { RacingModule } from './racing/racing.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      validate: (config: Record<string, unknown>) => {
        const { error, value } = validationSchema.validate(config, { allowUnknown: true, abortEarly: false });
        if (error) throw new Error(`Config validation error: ${error.message}`);
        return value as Record<string, unknown>;
      },
    }),
    DatabaseModule,
    UsersModule,
    AuthModule,
    ProductsModule,
    OrdersModule,
    SubscriptionsModule,
    StripeModule,
    PagesModule,
    AdminModule,
    CartModule,
    HomeModule,
    ScienceModule,
    ShopModule,
    AboutModule,
    AmbassadorsModule,
    ProfessionalsModule,
    HorseIqModule,
    AccountModule,
    RacingModule,
  ],
})
export class AppModule {}
