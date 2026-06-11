import { db } from '@/lib/db'
import { auth } from '@/lib/auth'
import { z } from 'zod'

const createLeadSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().optional(),
  email: z.string().email().optional(),
  phone: z.string().optional(),
  company: z.string().optional(),
  jobTitle: z.string().optional(),
  website: z.string().optional(),
  industry: z.string().optional(),
  source: z.enum(['WEBSITE', 'REFERRAL', 'SOCIAL_MEDIA', 'EMAIL_CAMPAIGN', 'COLD_OUTREACH', 'PAID_ADS', 'ORGANIC_SEARCH', 'EVENT', 'OTHER']).default('OTHER'),
  notes: z.string().optional(),
})

export async function GET(req: Request) {
  try {
    const session = await auth()
    if (!session?.user?.organizationId) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(req.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '20')
    const search = searchParams.get('search') || ''
    const status = searchParams.get('status') || ''

    const where: any = {
      organizationId: session.user.organizationId,
    }

    if (search) {
      where.OR = [
        { firstName: { contains: search, mode: 'insensitive' } },
        { lastName: { contains: search, mode: 'insensitive' } },
        { email: { contains: search, mode: 'insensitive' } },
        { company: { contains: search, mode: 'insensitive' } },
      ]
    }

    if (status) where.status = status

    const [leads, total] = await Promise.all([
      db.lead.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * limit,
        take: limit,
      }),
      db.lead.count({ where }),
    ])

    return Response.json({
      leads,
      pagination: { total, page, limit, totalPages: Math.ceil(total / limit) },
    })
  } catch (error) {
    return Response.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const session = await auth()
    if (!session?.user?.organizationId) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await req.json()
    const data = createLeadSchema.parse(body)

    const lead = await db.lead.create({
      data: {
        ...data,
        organizationId: session.user.organizationId,
      },
    })

    return Response.json(lead, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return Response.json({ error: 'Validation error', details: error.errors }, { status: 400 })
    }
    return Response.json({ error: 'Internal server error' }, { status: 500 })
  }
}
