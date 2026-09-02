import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import type { Request } from 'express';
import { RedirectException } from '../redirect.exception';

/** Requires a logged-in user with role 'admin'. Redirects to /admin/login on failure. */
@Injectable()
export class AdminGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest<Request>();
    if (req.session?.userId && req.session.role === 'admin') return true;
    throw new RedirectException('/admin/login');
  }
}
