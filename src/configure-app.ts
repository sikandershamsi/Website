import { NestExpressApplication } from '@nestjs/platform-express';
import { ValidationPipe } from '@nestjs/common';
import { join } from 'path';
import hbs = require('hbs');
import cookieParser from 'cookie-parser';
import { randomUUID } from 'crypto';
import { registerHelpers } from './view-helpers';
import { hbsLayoutEngine } from './hbs-layout-engine';
import { CartService } from './cart/cart.service';

const CART_COOKIE = 'al_cart_id';

export function configureApp(app: NestExpressApplication) {
  const viewsDir = join(process.cwd(), 'views');
  app.useStaticAssets(join(process.cwd(), 'public'));
  app.setBaseViewsDir(viewsDir);
  hbs.registerPartials(join(viewsDir, 'partials'), { rename: (name: string) => name } as any);
  registerHelpers(hbs);
  app.engine('hbs', hbsLayoutEngine(viewsDir));
  app.setViewEngine('hbs');

  app.use(cookieParser());

  const cartService = app.get(CartService);
  app.use((req: any, res: any, next: any) => {
    let cartId = req.cookies?.[CART_COOKIE];
    if (!cartId) {
      cartId = randomUUID();
      res.cookie(CART_COOKIE, cartId, {
        maxAge: 1000 * 60 * 60 * 24 * 30,
        httpOnly: true,
        sameSite: 'lax',
      });
    }
    req.cartId = cartId;
    res.locals.cartCount = cartService.count(cartId);
    next();
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );

  return app;
}
