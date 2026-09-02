import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { UsersModule } from '../users/users.module';
import { CartModule } from '../cart/cart.module';
import { AuthService } from './auth.service';
import { RedirectExceptionFilter } from './redirect.exception';

@Module({
  imports: [UsersModule, CartModule],
  providers: [AuthService, { provide: APP_FILTER, useClass: RedirectExceptionFilter }],
  exports: [AuthService],
})
export class AuthModule {}
