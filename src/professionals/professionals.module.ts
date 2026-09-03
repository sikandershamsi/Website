import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ProfessionalsController } from './professionals.controller';
import { AffiliatePortalController } from './affiliate-portal.controller';
import { PortalLayoutMiddleware } from './portal-layout.middleware';
import { AffiliatesModule } from '../affiliates/affiliates.module';
import { OrdersModule } from '../orders/orders.module';

@Module({
  imports: [AffiliatesModule, OrdersModule],
  controllers: [ProfessionalsController, AffiliatePortalController],
})
export class ProfessionalsModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(PortalLayoutMiddleware).forRoutes(AffiliatePortalController);
  }
}
