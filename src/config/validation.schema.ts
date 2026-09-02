import * as Joi from 'joi';

export const validationSchema = Joi.object({
  PORT: Joi.number().default(3000),
  APP_BASE_URL: Joi.string().uri().default('http://localhost:3000'),
  MONGODB_URI: Joi.string().uri().required(),
  SESSION_SECRET: Joi.string().min(16).required(),
  STRIPE_SECRET_KEY: Joi.string().allow('').default(''),
  STRIPE_WEBHOOK_SECRET: Joi.string().allow('').default(''),
  STRIPE_PUBLISHABLE_KEY: Joi.string().allow('').default(''),
  ADMIN_SEED_EMAIL: Joi.string().email().required(),
  ADMIN_SEED_PASSWORD: Joi.string().min(8).required(),
});
