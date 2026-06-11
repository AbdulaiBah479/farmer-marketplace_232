import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const db = new PrismaClient()

async function main() {
  console.log('🌱 Seeding database...')

  const hashedPassword = await bcrypt.hash('Password123!', 12)

  const user = await db.user.upsert({
    where: { email: 'demo@aicoo.io' },
    update: {},
    create: {
      name: 'Demo User',
      email: 'demo@aicoo.io',
      password: hashedPassword,
      emailVerified: new Date(),
    },
  })

  const org = await db.organization.upsert({
    where: { slug: 'demo-workspace' },
    update: {},
    create: {
      name: 'Demo Workspace',
      slug: 'demo-workspace',
      industry: 'Technology',
      currency: 'USD',
      members: {
        create: {
          userId: user.id,
          role: 'ADMIN',
          joinedAt: new Date(),
        },
      },
    },
  })

  await db.subscription.upsert({
    where: { organizationId: org.id },
    update: {},
    create: {
      organizationId: org.id,
      plan: 'PROFESSIONAL',
      status: 'ACTIVE',
      aiCreditsLimit: 5000,
    },
  })

  // Seed sample leads
  const leads = [
    { firstName: 'Sarah', lastName: 'Miller', email: 'sarah@techventures.com', company: 'TechVentures Inc', jobTitle: 'VP Operations', source: 'SOCIAL_MEDIA' as const, status: 'QUALIFIED' as const, score: 87 },
    { firstName: 'James', lastName: 'Wilson', email: 'james@growthagency.co', company: 'Growth Agency Co', jobTitle: 'CEO', source: 'WEBSITE' as const, status: 'NEW' as const, score: 72 },
    { firstName: 'Aisha', lastName: 'Rahman', email: 'aisha@consultify.pro', company: 'Consultify Pro', jobTitle: 'Founder', source: 'REFERRAL' as const, status: 'CONTACTED' as const, score: 91 },
  ]

  for (const lead of leads) {
    await db.lead.create({
      data: { ...lead, organizationId: org.id },
    })
  }

  // Seed sample contacts
  await db.contact.create({
    data: {
      firstName: 'Alex',
      lastName: 'Chen',
      email: 'alex@example.com',
      company: 'Example Corp',
      jobTitle: 'CTO',
      organizationId: org.id,
      type: 'CUSTOMER',
    },
  })

  // Seed sample project
  await db.project.create({
    data: {
      name: 'Website Redesign',
      description: 'Complete redesign of company website',
      status: 'ACTIVE',
      priority: 'HIGH',
      progress: 65,
      organizationId: org.id,
      dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    },
  })

  console.log('✅ Database seeded successfully!')
  console.log('📧 Demo login: demo@aicoo.io / Password123!')
}

main()
  .catch(console.error)
  .finally(() => db.$disconnect())
