import NextAuth from 'next-auth'
import { PrismaAdapter } from '@auth/prisma-adapter'
import GitHub from 'next-auth/providers/github'
import Google from 'next-auth/providers/google'
import Nodemailer from 'next-auth/providers/nodemailer'
// import EmailProvider from 'next-auth/providers/email'
import { prisma } from '../database'
import { createStripeCustomer } from '../stripe'

export const { auth, handlers } = NextAuth({
  pages: {
    signIn: '/auth',
    signOut: '/auth',
    error: '/auth',
    verifyRequest: '/auth',
    newUser: '/app',
  },
  adapter: PrismaAdapter(prisma),
  providers: [
    Google,
    GitHub,
    Nodemailer({
      server: {
        host: process.env.EMAIL_SERVER_HOST as string,
        port: parseInt(process.env.EMAIL_SERVER_PORT as string) || 0,
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASSWORD,
        },
      },
      from: process.env.EMAIL_FROM,
    }),
  ],
  events: {
    createUser: async (message) => {
      await createStripeCustomer({
        name: message.user.name as string,
        email: message.user.email as string,
      })
    },
  },
})
