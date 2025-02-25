import { z } from 'zod';
import { router, publicProcedure } from '../trpc';
import { hash, compare } from 'bcryptjs';
import { prisma } from '../db';
import { TRPCError } from '@trpc/server';
import { mailService } from '@/lib/mail/service';
import { emailTemplates } from '@/lib/mail/templates';
import { randomBytes } from 'crypto';

export const authRouter = router({
  signin: publicProcedure
    .input(
      z.object({
        email: z.string().email(),
        password: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      const { email, password } = input;

      const user = await prisma.user.findUnique({
        where: { email },
      });

      if (!user || !user.password) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'User not found',
        });
      }

      if (!user.emailVerified) {
        throw new TRPCError({
          code: 'UNAUTHORIZED',
          message: 'Please verify your email before signing in',
        });
      }

      const isValid = await compare(password, user.password);

      if (!isValid) {
        throw new TRPCError({
          code: 'UNAUTHORIZED',
          message: 'Invalid password',
        });
      }

      return {
        id: user.id,
        email: user.email,
        name: user.name,
      };
    }),

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
      const verificationToken = randomBytes(32).toString("hex");
      const expires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

    
      await prisma.user.create({
        data: {
          email,
          password: hashedPassword,
          name,
          emailVerified: false,
          verificationToken,
          verificationTokenExpires: expires,
        },
      });

      const verificationLink = `${process.env.NEXTAUTH_URL}/auth/verify?token=${verificationToken}`;

      await mailService.sendMail({
        to: email,
        subject: 'Verify your email',
        html: emailTemplates.verification({
          name,
          link: verificationLink,
        }),
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
        const user = await prisma.user.findFirst({
          where: {
            verificationToken: input.token,
            verificationTokenExpires: {
              gt: new Date(),
            },
          },
        });

        if (!user) {
          throw new TRPCError({
            code: 'NOT_FOUND',
            message: 'Invalid or expired verification token',
          });
        }

        await prisma.user.update({
          where: { id: user.id },
          data: {
            emailVerified: true,
            verificationToken: null,
            verificationTokenExpires: null,
          },
        });

        return {
          status: 'success',
          message: 'Email verified successfully',
        };
      } catch {
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
        const resetPasswordToken = randomBytes(32).toString("hex");
        const expires = new Date(Date.now() + 1 * 60 * 60 * 1000); // 1 hour

        await prisma.user.update({
          where: { id: user.id },
          data: {
            resetPasswordToken,
            resetPasswordExpires: expires,
          },
        });

        const resetLink = `${process.env.NEXTAUTH_URL}/auth/reset-password?token=${resetPasswordToken}`;

        await mailService.sendMail({
          to: input.email,
          subject: 'Reset your password',
          html: emailTemplates.resetPassword({
            link: resetLink,
          }),
        });
      }

      // Always return success to prevent email enumeration
      return {
        status: 'success',
        message: 'If an account exists, we sent a reset link',
      };
    }),
}); 