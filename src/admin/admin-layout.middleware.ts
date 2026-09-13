import { Injectable, NestMiddleware } from '@nestjs/common';
import type { Request, Response, NextFunction } from 'express';

/** Maps a request path to a dot-delimited nav section key (e.g. "affiliates.analytics") so the sidebar
 * can highlight the right top-level item and sub-item without re-implementing routing logic in Handlebars. */
function resolveNavSection(path: string): string {
  if (path === '/admin') return 'dashboard';
  if (path === '/admin/categories' || path.startsWith('/admin/categories/')) return 'products.categories';
  if (path.startsWith('/admin/products')) return 'products.all';
  if (path.startsWith('/admin/orders')) return 'orders';
  if (path.startsWith('/admin/subscriptions')) return 'subscriptions';
  if (path === '/admin/affiliates/analytics') return 'affiliates.analytics';
  if (path === '/admin/affiliates/commissions') return 'affiliates.commissions';
  if (path === '/admin/affiliates/payouts') return 'affiliates.payouts';
  if (path.startsWith('/admin/affiliates/groups')) return 'affiliates.groups';
  if (path.startsWith('/admin/affiliates')) return 'affiliates.all';
  if (path.startsWith('/admin/marketing-assets')) return 'marketing-assets';
  if (path.startsWith('/admin/pages')) return 'pages';
  return '';
}

/** Every /admin/* view renders inside layouts/admin.hbs instead of the marketing layouts/main.hbs. */
@Injectable()
export class AdminLayoutMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    res.locals.layoutName = 'admin';
    res.locals.loggedIn = Boolean(req.session?.userId && req.session.role === 'admin');
    res.locals.navSection = resolveNavSection(req.path);
    res.locals.adminEmail = req.session?.email;
    next();
  }
}
