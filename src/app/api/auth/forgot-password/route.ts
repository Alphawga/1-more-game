import { NextResponse } from 'next/server';
import { prisma } from '@/server/db';
import { createTransport } from 'nodemailer';
import { sign } from 'jsonwebtoken';

const EMAIL_SERVER = {
  host: process.env.SMTP_Server,
  port: Number(process.env.SMTP_Port),
  auth: {
    user: process.env.SMTP_Login,
    pass: process.env.SMTP_Password,
  },
};
const EMAIL_FROM = process.env.SMTP_Login;
const RESET_TOKEN_SECRET = process.env.RESET_TOKEN_SECRET || 'your-secret-key';

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return NextResponse.json(
        { message: 'If an account exists, we sent a reset link' },
        { status: 200 }
      );
    }

    const token = sign({ userId: user.id }, RESET_TOKEN_SECRET, {
      expiresIn: '1h',
    });

    const resetLink = `${process.env.NEXTAUTH_URL}/auth/reset-password?token=${token}`;

    const transporter = createTransport(EMAIL_SERVER);

    await transporter.sendMail({
      from: EMAIL_FROM,
      to: email,
      subject: 'Reset your password',
      html: `Click <a href="${resetLink}">here</a> to reset your password.`,
    });

    return NextResponse.json(
      { message: 'If an account exists, we sent a reset link' },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: 'Something went wrong' },
      { status: 500 }
    );
  }
} 