import { Injectable, NestMiddleware } from '@nestjs/common';
import type { Request, Response, NextFunction } from 'express';

/** /professionals/portal renders inside layouts/portal.hbs instead of the marketing layouts/main.hbs. */
@Injectable()
export class PortalLayoutMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    res.locals.layoutName = 'portal';
    res.locals.loggedIn = Boolean(req.session?.userId && req.session.role === 'affiliate');
    next();
  }
}
