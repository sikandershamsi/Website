export interface AppConfig {
  app: {
    port: number;
    baseUrl: string;
  };
  mongo: {
    uri: string;
  };
  session: {
    secret: string;
    cookieName: string;
    maxAge: number;
  };
  stripe: {
    secretKey: string;
    webhookSecret: string;
    publishableKey: string;
  };
  seed: {
    adminEmail: string;
    adminPassword: string;
  };
}

export default (): AppConfig => ({
  app: {
    port: parseInt(process.env.PORT ?? '3000', 10),
    baseUrl: process.env.APP_BASE_URL ?? 'http://localhost:3000',
  },
  mongo: {
    uri: process.env.MONGODB_URI ?? '',
  },
  session: {
    secret: process.env.SESSION_SECRET ?? '',
    cookieName: 'al_session',
    maxAge: 1000 * 60 * 60 * 24 * 30,
  },
  stripe: {
    secretKey: process.env.STRIPE_SECRET_KEY ?? '',
    webhookSecret: process.env.STRIPE_WEBHOOK_SECRET ?? '',
    publishableKey: process.env.STRIPE_PUBLISHABLE_KEY ?? '',
  },
  seed: {
    adminEmail: process.env.ADMIN_SEED_EMAIL ?? '',
    adminPassword: process.env.ADMIN_SEED_PASSWORD ?? '',
  },
});
