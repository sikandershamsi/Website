import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import type { Request } from 'express';
import { RedirectException } from '../redirect.exception';

/** Requires a logged-in user with role 'affiliate'. Redirects to /professionals/login on failure. */
@Injectable()
export class AffiliateGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest<Request>();
    if (req.session?.userId && req.session.role === 'affiliate') return true;
    throw new RedirectException('/professionals/login');
  }
}
