import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { Transporter } from 'nodemailer';
import * as process from 'node:process';

@Injectable()
export class MailService {
  private transporter: Transporter;
    constructor(private configService: ConfigService) {
        this.transporter = nodemailer.createTransport({
            service: 'Gmail',
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: configService.get<string>('app.email'),
                pass: configService.get<string>('app.password'),
            },
        });
    }
  async sendPhishingEmail(to: string, emailContent: string): Promise<void> {
    try {
      await this.transporter.sendMail({
        from: process.env.EMAIL_USER,
        to,
        subject: 'Security Awareness Test',
        html: emailContent,
      });

      console.log(`Email sent successfully to ${to}`);
    } catch (error) {
      console.log(error);
      throw new Error('Failed to send email');
    }
  }
}
