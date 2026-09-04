import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { AppModule } from '../app.module';
import { CategoriesService } from '../products/categories.service';
import { ProductsService } from '../products/products.service';
import { StripeService } from '../stripe/stripe.service';
import { UsersService } from '../users/users.service';
import { PagesService } from '../pages/pages.service';
import { AffiliatesService } from '../affiliates/affiliates.service';
import * as bcrypt from 'bcrypt';
import { categories, products as staticProducts, type Product as StaticProduct } from '../content/products.data';
import { horseTruths, standards, testimonials } from '../content/site.data';

const logger = new Logger('Seed');

/**
 * Splits the static Product shape into the typed commerce fields the Mongoose schema
 * knows about, plus a `marketingBlocks` bucket holding everything else verbatim
 * (whatItIs, outcomes, comparison, descriptionShowcase, feedingRows, ...).
 */
function splitProduct(p: StaticProduct) {
  const {
    slug,
    name,
    trademark,
    category,
    categorySlug,
    tagline,
    price,
    size,
    heroStat,
    image,
    description,
    keyIngredients,
    primaryIngredients,
    primaryIngredientsFooter,
    supports,
    faqs,
    accent,
    ...rest
  } = p;
  return {
    typed: {
      slug,
      name,
      trademark,
      category,
      categorySlug,
      tagline,
      price,
      size,
      heroStat,
      image,
      description,
      keyIngredients,
      primaryIngredients,
      primaryIngredientsFooter,
      supports,
      faqs,
      accent,
      active: true,
    },
    marketingBlocks: rest,
  };
}

async function seed() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const categoriesService = app.get(CategoriesService);
  const productsService = app.get(ProductsService);
  const stripeService = app.get(StripeService);
  const usersService = app.get(UsersService);
  const pagesService = app.get(PagesService);
  const affiliatesService = app.get(AffiliatesService);

  logger.log(`Seeding ${categories.length} categories...`);
  for (const category of categories) {
    await categoriesService.upsertBySlug(category.slug, category as Record<string, unknown>);
  }

  logger.log(`Seeding ${staticProducts.length} products...`);
  for (const product of staticProducts) {
    const { typed, marketingBlocks } = splitProduct(product);
    const doc = await productsService.upsertBySlug(typed.slug, { ...typed, marketingBlocks });
    if (stripeService.isConfigured()) {
      try {
        await stripeService.syncProductToStripe(String(doc._id));
        logger.log(`  synced "${typed.slug}" to Stripe`);
      } catch (err) {
        logger.warn(`  could not sync "${typed.slug}" to Stripe: ${(err as Error).message}`);
      }
    }
  }
  if (!stripeService.isConfigured()) {
    logger.warn('STRIPE_SECRET_KEY not set — skipped Stripe product sync. Checkout will not work until this runs.');
  }

  logger.log('Seeding Home page sections...');
  await pagesService.upsertPage('home', 'Home', [
    {
      key: 'horse-truths',
      type: 'horse-truths',
      order: 0,
      visible: true,
      data: { items: horseTruths },
    },
    {
      key: 'standards',
      type: 'standards',
      order: 1,
      visible: true,
      data: { items: standards },
    },
    {
      key: 'testimonials',
      type: 'testimonial-slider',
      order: 2,
      visible: true,
      data: { items: testimonials.slice(0, 8) },
    },
    {
      key: 'featured-products',
      type: 'product-picker',
      order: 3,
      visible: true,
      data: {
        items: [
          {
            slug: 'vetroflex',
            trademark: 'VetroFlex®',
            category: 'Cartilage – Joint – Connective Tissue Repair',
            tagline: 'Joint, Cartilage & Connective Tissue Support',
            price: 79,
            image: '/images/products/vetroflex-tub.webp',
          },
          {
            slug: 'vetrofen',
            trademark: 'VetroFen®',
            category: 'Inflammation & Pain Management',
            tagline: 'Advanced Inflammation & Pain Management Support',
            price: 69,
            image: '/images/products/vetrofen-tub.webp',
          },
          {
            slug: 'vetrofen',
            trademark: 'VetroFen®',
            category: 'Inflammation & Pain Management',
            tagline: 'Advanced Inflammation & Pain Management Support',
            price: 39,
            image: '/images/products/vetrofen-syringe.webp',
          },
          {
            slug: 'vetrofit',
            trademark: 'VetroFit®',
            category: 'Kidney Homeostasis Management',
            tagline: 'Oxygen Transport, Endurance & Recovery Support',
            price: 59,
            image: '/images/products/vetrofit-syringe.webp',
          },
        ],
      },
    },
    {
      key: 'featured-ingredients',
      type: 'ingredient-grid',
      order: 4,
      visible: true,
      data: {
        items: [
          { name: 'Hydrolyzed Collagen Type II', origin: 'Brazil', image: '/images/ingredients/inspired/hydrolyzed-collagen.jpg' },
          { name: 'ACV (Chondroitin)', origin: 'France', image: '/images/ingredients/inspired/acv-chondroitin.jpg' },
          { name: 'FOS (Fructooligosaccharides)', origin: 'Belgium', image: '/images/ingredients/inspired/fos.jpg' },
          { name: 'Manganese, Copper & Zinc', origin: 'Global', image: '/images/ingredients/inspired/manganese-copper-zinc.jpg' },
          { name: 'Biotin', origin: 'Switzerland', image: '/images/ingredients/inspired/biotin.jpg' },
        ],
      },
    },
  ]);

  const adminCount = await usersService.countAdmins();
  if (adminCount === 0) {
    const email = process.env.ADMIN_SEED_EMAIL;
    const password = process.env.ADMIN_SEED_PASSWORD;
    if (email && password) {
      await usersService.create(email, password, 'Admin', 'admin');
      logger.log(`Created admin user: ${email}`);
    } else {
      logger.warn('No admin user exists and ADMIN_SEED_EMAIL/ADMIN_SEED_PASSWORD are not set — skipped.');
    }
  } else {
    logger.log(`${adminCount} admin user(s) already exist — skipped admin seeding.`);
  }

  const affiliateEmail = process.env.AFFILIATE_SEED_EMAIL;
  const affiliatePassword = process.env.AFFILIATE_SEED_PASSWORD;
  if (affiliateEmail && affiliatePassword) {
    const { affiliate, created } = await affiliatesService.seedApproved(
      {
        fullName: process.env.AFFILIATE_SEED_NAME || 'Affiliate Partner',
        email: affiliateEmail,
        profession: 'Trainer',
        experience: '10+ years',
        reach: 'Seeded demo account for local testing.',
        currentlyRecommends: 'N/A',
        salesGoal: 'N/A',
        personalStatement: 'Seeded demo account for local testing.',
        agree: true,
      },
      affiliatePassword,
    );
    logger.log(created ? `Created affiliate user: ${affiliateEmail}` : `Affiliate user already exists: ${affiliateEmail} — skipped.`);
  } else {
    logger.warn('AFFILIATE_SEED_EMAIL/AFFILIATE_SEED_PASSWORD are not set — skipped affiliate seeding.');
  }

  logger.log('Seed complete.');
  await app.close();
}

seed().catch((err) => {
  logger.error(err);
  process.exit(1);
});
