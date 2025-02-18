import { NextResponse } from 'next/server';
import { prisma } from '@/server/db';
import { verify } from 'jsonwebtoken';

export async function POST(req: Request) {
  try {
    const { token } = await req.json();

    const decoded = verify(token, process.env.NEXTAUTH_SECRET!) as { email: string };
    
    const user = await prisma.user.findFirst({
      where: {
        email: decoded.email,
        verificationToken: token,
      },
    });

    if (!user) {
      return NextResponse.json(
        { message: 'Invalid verification token' },
        { status: 400 }
      );
    }

    await prisma.user.update({
      where: { id: user.id },
      data: {
        emailVerified: true,
        verificationToken: null,
      },
    });

    return NextResponse.json(
      { message: 'Email verified successfully' },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: 'Invalid verification token' },
      { status: 400 }
    );
  }
} 