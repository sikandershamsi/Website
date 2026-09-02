// Vercel serverless entry point. Requires the already-built `dist/` output
// (produced by `npm run build`, which the Vercel Build Command runs) rather
// than the TypeScript source, so Nest's decorator metadata — emitted by tsc,
// not by Vercel's esbuild-based function bundler — is already baked in.
//
// The Nest app is bootstrapped once per warm Lambda container (`app.init()`,
// never `app.listen()` — there's no port to bind in a serverless function)
// and its underlying Express instance is reused directly as the request
// handler, since an Express app already has the `(req, res)` signature
// Vercel's Node.js runtime expects.

const { NestFactory } = require('@nestjs/core');
const { AppModule } = require('../dist/app.module');
const { configureApp } = require('../dist/configure-app');

let appPromise;

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { rawBody: true });
  configureApp(app);
  await app.init();
  return app;
}

function getApp() {
  if (!appPromise) appPromise = bootstrap();
  return appPromise;
}

module.exports = async (req, res) => {
  try {
    const app = await getApp();
    const instance = app.getHttpAdapter().getInstance();
    instance(req, res);
  } catch (err) {
    appPromise = undefined; // don't cache a failed boot — let the next request retry
    console.error('Serverless bootstrap/handler error:', err);
    if (!res.headersSent) {
      res.statusCode = 500;
      res.end('Internal Server Error');
    }
  }
};
