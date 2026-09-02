import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import type { Request } from 'express';
import { RedirectException } from '../redirect.exception';

/** Requires a logged-in user (any role). Redirects to /account on failure. */
@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest<Request>();
    if (req.session?.userId) return true;
    throw new RedirectException(`/account?redirect=${encodeURIComponent(req.originalUrl)}`);
  }
}
