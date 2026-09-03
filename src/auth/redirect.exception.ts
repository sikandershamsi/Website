import { HttpException, HttpStatus, ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import type { Response } from 'express';

/** Thrown by guards to redirect an unauthenticated/unauthorized browser request. */
export class RedirectException extends HttpException {
  constructor(public readonly location: string) {
    super('Redirect', HttpStatus.FOUND);
  }
}

@Catch(RedirectException)
export class RedirectExceptionFilter implements ExceptionFilter {
  catch(exception: RedirectException, host: ArgumentsHost) {
    const res = host.switchToHttp().getResponse<Response>();
    res.redirect(303, exception.location);
  }
}
