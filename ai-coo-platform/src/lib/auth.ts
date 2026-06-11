import NextAuth from 'next-auth'
import { PrismaAdapter } from '@auth/prisma-adapter'
import Google from 'next-auth/providers/google'
import GitHub from 'next-auth/providers/github'
import Credentials from 'next-auth/providers/credentials'
import bcrypt from 'bcryptjs'
import { db } from '@/lib/db'
import { z } from 'zod'

const credentialsSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
})

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(db),
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    GitHub({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
    Credentials({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const parsed = credentialsSchema.safeParse(credentials)
        if (!parsed.success) return null

        const user = await db.user.findUnique({
          where: { email: parsed.data.email },
        })

        if (!user?.password) return null

        const isValid = await bcrypt.compare(parsed.data.password, user.password)
        if (!isValid) return null

        return user
      },
    }),
  ],
  pages: {
    signIn: '/login',
    signOut: '/logout',
    error: '/auth/error',
    newUser: '/onboarding',
  },
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60,
  },
  callbacks: {
    async jwt({ token, user, account }) {
      if (user) {
        token.id = user.id
      }
      return token
    },
    async session({ session, token }) {
      if (token.id) {
        session.user.id = token.id as string

        const membership = await db.organizationMember.findFirst({
          where: { userId: token.id as string, isActive: true },
          include: { organization: true },
        })

        if (membership) {
          session.user.organizationId = membership.organizationId
          session.user.role = membership.role
        }
      }
      return session
    },
    async signIn({ user, account }) {
      if (account?.provider !== 'credentials') {
        const existingUser = await db.user.findUnique({
          where: { email: user.email! },
        })
        if (!existingUser) {
          return true
        }
      }
      return true
    },
  },
  events: {
    async createUser({ user }) {
      const org = await db.organization.create({
        data: {
          name: `${user.name || user.email}'s Workspace`,
          slug: `workspace-${Date.now()}`,
          members: {
            create: {
              userId: user.id!,
              role: 'ADMIN',
              joinedAt: new Date(),
            },
          },
        },
      })

      await db.subscription.create({
        data: {
          organizationId: org.id,
          plan: 'FREE',
          status: 'TRIALING',
          trialEndsAt: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
        },
      })
    },
  },
})

export async function hashPassword(password: string) {
  return bcrypt.hash(password, 12)
}

export async function getCurrentUser() {
  const session = await auth()
  return session?.user
}

export async function requireAuth() {
  const user = await getCurrentUser()
  if (!user) throw new Error('Unauthorized')
  return user
}
