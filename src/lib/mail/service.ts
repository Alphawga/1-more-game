import { createTransport, Transporter } from 'nodemailer';

interface EmailConfig {
  host: string;
  port: number;
  auth: {
    user: string;
    pass: string;
  };
}

interface EmailOptions {
  to: string;
  subject: string;
  html: string;
  from?: string;
}

class MailService {
  private transporter: Transporter;
  private defaultFrom: string;

  constructor(config: EmailConfig) {
    this.transporter = createTransport(config);
    this.defaultFrom = config.auth.user;
  }

  async sendMail(options: EmailOptions): Promise<void> {
    try {
      await this.transporter.sendMail({
        from: options.from || this.defaultFrom,
        to: options.to,
        subject: options.subject,
        html: options.html,
      });
    } catch (error) {
      console.error('Failed to send email:', error);
      throw new Error('Failed to send email');
    }
  }
}

// Create and export the mail service instance
export const mailService = new MailService({
  host: process.env.SMTP_Server!,
  port: Number(process.env.SMTP_Port),
  auth: {
    user: process.env.SMTP_Login!,
    pass: process.env.SMTP_Password!,
  },
}); 