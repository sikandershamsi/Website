import { Injectable, ConflictException, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { CartService } from '../cart/cart.service';
import type { UserRole } from '../users/schemas/user.schema';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly cartService: CartService,
  ) {}

  async register(email: string, password: string, name: string | undefined, guestCartId?: string) {
    const existing = await this.usersService.findByEmail(email);
    if (existing) throw new ConflictException('An account with this email already exists.');
    const user = await this.usersService.create(email, password, name, 'customer');
    if (guestCartId) {
      await this.cartService.mergeGuestCartIntoUser(guestCartId, String(user._id));
    }
    return user;
  }

  async validateLogin(email: string, password: string, expectedRole?: UserRole) {
    const user = await this.usersService.findByEmail(email);
    if (!user) throw new UnauthorizedException('Invalid email or password.');
    const ok = await this.usersService.validatePassword(user, password);
    if (!ok) throw new UnauthorizedException('Invalid email or password.');
    if (expectedRole && user.role !== expectedRole) {
      throw new UnauthorizedException('Invalid email or password.');
    }
    return user;
  }

  async loginAndMergeCart(userId: string, guestCartId?: string) {
    if (guestCartId) {
      await this.cartService.mergeGuestCartIntoUser(guestCartId, userId);
    }
  }
}
