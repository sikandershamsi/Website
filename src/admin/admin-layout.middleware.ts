import { Injectable, NestMiddleware } from '@nestjs/common';
import type { Request, Response, NextFunction } from 'express';

/** Every /admin/* view renders inside layouts/admin.hbs instead of the marketing layouts/main.hbs. */
@Injectable()
export class AdminLayoutMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    res.locals.layoutName = 'admin';
    res.locals.loggedIn = Boolean(req.session?.userId && req.session.role === 'admin');
    next();
  }
}
