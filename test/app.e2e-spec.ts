import { Test, TestingModule } from '@nestjs/testing';
import { NestExpressApplication } from '@nestjs/platform-express';
import request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from './../src/app.module';
import { configureApp } from './../src/configure-app';

describe('AppController (e2e)', () => {
  let app: NestExpressApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication<NestExpressApplication>();
    configureApp(app);
    await app.init();
  });

  it('/ (GET) renders the homepage', () => {
    return request(app.getHttpServer() as App)
      .get('/')
      .expect(200)
      .expect((res) => {
        if (!res.text.includes('Feel the difference')) {
          throw new Error('Homepage did not render expected hero copy');
        }
      });
  });

  it('/shop/product/vetroflex (GET) renders a product page', () => {
    return request(app.getHttpServer() as App).get('/shop/product/vetroflex').expect(200);
  });

  afterEach(async () => {
    await app.close();
  });
});
