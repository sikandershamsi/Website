import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import type { Request } from 'express';

export interface CurrentUserPayload {
  userId: string;
  role: 'customer' | 'admin';
  email: string;
}

/** Reads the logged-in user's session data (assumes a guard already verified presence). */
export const CurrentUser = createParamDecorator((_: unknown, ctx: ExecutionContext): CurrentUserPayload | undefined => {
  const req = ctx.switchToHttp().getRequest<Request>();
  if (!req.session?.userId) return undefined;
  return {
    userId: req.session.userId,
    role: req.session.role ?? 'customer',
    email: req.session.email ?? '',
  };
});
