import { NextResponse } from 'next/server';
import { hash } from 'bcryptjs';
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

export async function POST(req: Request) {
  try {
    const { email, password, name } = await req.json();

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { message: 'User already exists' },
        { status: 400 }
      );
    }

    const hashedPassword = await hash(password, 10);
    const verificationToken = sign({ email }, process.env.NEXTAUTH_SECRET!, {
      expiresIn: '1d',
    });

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        emailVerified: false,
        verificationToken,
      },
    });

    // Send verification email
    const transporter = createTransport(EMAIL_SERVER);
    const verificationLink = `${process.env.NEXTAUTH_URL}/auth/verify?token=${verificationToken}`;

    await transporter.sendMail({
      from: process.env.SMTP_Login,
      to: email,
      subject: 'Verify your email',
      html: `Please click <a href="${verificationLink}">here</a> to verify your email.`,
    });

    return NextResponse.json(
      { message: 'User created successfully' },
      { status: 201 }
    );
  } catch (error) {
    console.error('Signup error:', error);
    return NextResponse.json(
      { message: 'Something went wrong' },
      { status: 500 }
    );
  }
} 