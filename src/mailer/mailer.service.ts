import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';
import type { AppConfig } from '../config/configuration';

/** Thin wrapper around nodemailer, gated the same way StripeService gates itself on STRIPE_SECRET_KEY:
 * with no SMTP credentials configured, every send is logged and skipped rather than throwing, so the rest
 * of the app (approvals, notifications, password resets) keeps working without email actually going out. */
@Injectable()
export class MailerService {
  private readonly logger = new Logger(MailerService.name);
  private readonly transporter: nodemailer.Transporter | null;
  private readonly from: string;

  constructor(private readonly config: ConfigService<AppConfig>) {
    const host = this.config.get('mail.host', { infer: true }) as string;
    const user = this.config.get('mail.user', { infer: true }) as string;
    const pass = this.config.get('mail.pass', { infer: true }) as string;
    this.from = this.config.get('mail.from', { infer: true }) as string;
    if (host && user && pass) {
      this.transporter = nodemailer.createTransport({
        host,
        port: this.config.get('mail.port', { infer: true }) as number,
        secure: false,
        auth: { user, pass },
      });
    } else {
      this.transporter = null;
      this.logger.warn('SMTP_HOST/SMTP_USER/SMTP_PASS not set — outgoing email is disabled until configured.');
    }
  }

  isConfigured(): boolean {
    return this.transporter !== null;
  }

  async send(params: { to: string; subject: string; html: string; text?: string }): Promise<void> {
    if (!this.transporter) {
      this.logger.log(`[email skipped — not configured] to=${params.to} subject="${params.subject}"`);
      return;
    }
    try {
      await this.transporter.sendMail({ from: this.from, to: params.to, subject: params.subject, html: params.html, text: params.text });
    } catch (err) {
      this.logger.error(`Failed to send email to ${params.to}: ${(err as Error).message}`);
    }
  }
}
