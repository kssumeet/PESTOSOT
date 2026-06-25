import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Lead } from '@prisma/client';
import * as nodemailer from 'nodemailer';
import type { Transporter } from 'nodemailer';

@Injectable()
export class MailService implements OnModuleInit {
  private readonly logger = new Logger(MailService.name);
  private transporter: Transporter | null = null;

  constructor(private readonly config: ConfigService) {}

  onModuleInit(): void {
    const host = this.config.get<string>('SMTP_HOST');

    if (!host) {
      this.logger.warn('SMTP_HOST not configured — emails will be logged to console instead of sent.');
      return;
    }

    this.transporter = nodemailer.createTransport({
      host,
      port: Number(this.config.get<string>('SMTP_PORT') ?? '587'),
      secure: Number(this.config.get<string>('SMTP_PORT') ?? '587') === 465,
      auth: {
        user: this.config.get<string>('SMTP_USER') ?? '',
        pass: this.config.get<string>('SMTP_PASS') ?? '',
      },
    });
  }

  async notifyNewLead(lead: Lead): Promise<void> {
    const from = this.config.get<string>('MAIL_FROM') ?? 'PESTOSOT <no-reply@pestosot.com>';
    const to = this.config.get<string>('LEAD_NOTIFY_TO') ?? 'bookings@pestosot.com';
    const subject = `New Lead: ${lead.name} — ${lead.serviceType}`;
    const text = this.buildLeadText(lead);
    const html = this.buildLeadHtml(lead);

    if (!this.transporter) {
      this.logger.log(
        `[MAIL:console] To: ${to} | From: ${from} | Subject: ${subject}\n${text}`,
      );
      return;
    }

    await this.transporter.sendMail({ from, to, subject, text, html });
    this.logger.log(`Lead notification email sent for lead ${lead.id} to ${to}`);
  }

  private buildLeadText(lead: Lead): string {
    return [
      `New lead received via ${lead.source}.`,
      ``,
      `Name: ${lead.name}`,
      `Phone: ${lead.phone}`,
      `Email: ${lead.email ?? '-'}`,
      `Service: ${lead.serviceType}`,
      `Property: ${lead.propertyType}`,
      `City: ${lead.city}`,
      `Locality: ${lead.locality ?? '-'}`,
      `Preferred date: ${lead.preferredDate ? lead.preferredDate.toISOString() : '-'}`,
      `Preferred time: ${lead.preferredTime ?? '-'}`,
      `Message: ${lead.message ?? '-'}`,
      `Status: ${lead.status}`,
      `Created: ${lead.createdAt.toISOString()}`,
    ].join('\n');
  }

  private buildLeadHtml(lead: Lead): string {
    return `
      <h2>New PESTOSOT Lead</h2>
      <p>Received via <strong>${lead.source}</strong>.</p>
      <table cellpadding="6" style="border-collapse:collapse">
        <tr><td><strong>Name</strong></td><td>${lead.name}</td></tr>
        <tr><td><strong>Phone</strong></td><td>${lead.phone}</td></tr>
        <tr><td><strong>Email</strong></td><td>${lead.email ?? '-'}</td></tr>
        <tr><td><strong>Service</strong></td><td>${lead.serviceType}</td></tr>
        <tr><td><strong>Property</strong></td><td>${lead.propertyType}</td></tr>
        <tr><td><strong>City</strong></td><td>${lead.city}</td></tr>
        <tr><td><strong>Locality</strong></td><td>${lead.locality ?? '-'}</td></tr>
        <tr><td><strong>Preferred date</strong></td><td>${lead.preferredDate ? lead.preferredDate.toISOString() : '-'}</td></tr>
        <tr><td><strong>Preferred time</strong></td><td>${lead.preferredTime ?? '-'}</td></tr>
        <tr><td><strong>Message</strong></td><td>${lead.message ?? '-'}</td></tr>
      </table>
    `;
  }
}
