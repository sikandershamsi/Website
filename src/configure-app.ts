import { NestExpressApplication } from '@nestjs/platform-express';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { join } from 'path';
import hbs = require('hbs');
import cookieParser from 'cookie-parser';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import { randomUUID } from 'crypto';
import { registerHelpers } from './view-helpers';
import { hbsLayoutEngine } from './hbs-layout-engine';
import { CartService } from './cart/cart.service';
import type { AppConfig } from './config/configuration';

const CART_COOKIE = 'al_cart_id';

export function configureApp(app: NestExpressApplication) {
  const config = app.get(ConfigService<AppConfig>);
  const viewsDir = join(process.cwd(), 'views');
  app.useStaticAssets(join(process.cwd(), 'public'));
  app.setBaseViewsDir(viewsDir);
  hbs.registerPartials(join(viewsDir, 'partials'), { rename: (name: string) => name } as any); // includes section-head, testimonial-slider
  hbs.registerPartials(join(viewsDir, 'admin', 'pages', 'sections'), {
    rename: (name: string) => `pages/sections/${name}`,
  } as any);
  registerHelpers(hbs);
  app.engine('hbs', hbsLayoutEngine(viewsDir));
  app.setViewEngine('hbs');

  app.use(cookieParser());

  app.use(
    session({
      name: config.get('session.cookieName', { infer: true }),
      secret: config.get('session.secret', { infer: true }) as string,
      resave: false,
      saveUninitialized: false,
      store: MongoStore.create({ mongoUrl: config.get('mongo.uri', { infer: true }) as string }),
      cookie: {
        maxAge: config.get('session.maxAge', { infer: true }),
        httpOnly: true,
        sameSite: 'lax',
      },
    }),
  );

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
    const key = req.session?.userId ? { userId: req.session.userId } : { guestCartId: cartId };
    cartService
      .count(key)
      .then((count: number) => {
        res.locals.cartCount = count;
      })
      .catch(() => {
        res.locals.cartCount = 0;
      })
      .finally(() => next());
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );

  return app;
}
