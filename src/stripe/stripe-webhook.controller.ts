import { BadRequestException, Controller, Headers, HttpCode, Post, Req } from '@nestjs/common';
import type { RawBodyRequest } from '@nestjs/common';
import type { Request } from 'express';
import { StripeService } from './stripe.service';

@Controller('stripe')
export class StripeWebhookController {
  constructor(private readonly stripeService: StripeService) {}

  @Post('webhook')
  @HttpCode(200)
  async handleWebhook(@Req() req: RawBodyRequest<Request>, @Headers('stripe-signature') signature: string) {
    if (!req.rawBody) {
      throw new BadRequestException('Missing raw request body for webhook signature verification.');
    }
    if (!signature) {
      throw new BadRequestException('Missing Stripe-Signature header.');
    }
    const event = this.stripeService.constructEvent(req.rawBody, signature);
    await this.stripeService.handleWebhookEvent(event);
    return { received: true };
  }
}
