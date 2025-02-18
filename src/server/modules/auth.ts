import { z } from 'zod';
import { router, publicProcedure } from '../trpc';
import { hash, compare } from 'bcryptjs';
import { prisma } from '../db';
import { sign, verify } from 'jsonwebtoken';
import { createTransport } from 'nodemailer';
import { TRPCError } from '@trpc/server';

const EMAIL_SERVER = {
  host: process.env.SMTP_Server,
  port: Number(process.env.SMTP_Port),
  auth: {
    user: process.env.SMTP_Login,
    pass: process.env.SMTP_Password,
  },
};

export const authRouter = router({
  signup: publicProcedure
    .input(
      z.object({
        email: z.string().email(),
        password: z.string().min(6),
        name: z.string().min(2),
      })
    )
    .mutation(async ({ input }) => {
      const { email, password, name } = input;

      const existingUser = await prisma.user.findUnique({
        where: { email },
      });

      if (existingUser) {
        throw new TRPCError({
          code: 'CONFLICT',
          message: 'User already exists',
        });
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

      return {
        status: 'success',
        message: 'Verification email sent',
      };
    }),

  verifyEmail: publicProcedure
    .input(z.object({ token: z.string() }))
    .mutation(async ({ input }) => {
      try {
        const decoded = verify(input.token, process.env.NEXTAUTH_SECRET!) as {
          email: string;
        };

        const user = await prisma.user.findFirst({
          where: {
            email: decoded.email,
            verificationToken: input.token,
          },
        });

        if (!user) {
          throw new TRPCError({
            code: 'NOT_FOUND',
            message: 'Invalid verification token',
          });
        }

        await prisma.user.update({
          where: { id: user.id },
          data: {
            emailVerified: true,
            verificationToken: null,
          },
        });

        return {
          status: 'success',
          message: 'Email verified successfully',
        };
      } catch (error) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: 'Invalid verification token',
        });
      }
    }),

  forgotPassword: publicProcedure
    .input(z.object({ email: z.string().email() }))
    .mutation(async ({ input }) => {
      const user = await prisma.user.findUnique({
        where: { email: input.email },
      });

      if (user) {
        const token = sign({ userId: user.id }, process.env.RESET_TOKEN_SECRET!, {
          expiresIn: '1h',
        });

        const resetLink = `${process.env.NEXTAUTH_URL}/auth/reset-password?token=${token}`;
        const transporter = createTransport(EMAIL_SERVER);

        await transporter.sendMail({
          from: process.env.SMTP_Login,
          to: input.email,
          subject: 'Reset your password',
          html: `Click <a href="${resetLink}">here</a> to reset your password.`,
        });
      }

      // Always return success to prevent email enumeration
      return {
        status: 'success',
        message: 'If an account exists, we sent a reset link',
      };
    }),
}); 