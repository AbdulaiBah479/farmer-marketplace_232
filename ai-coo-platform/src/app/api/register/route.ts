import { db } from '@/lib/db'
import { hashPassword } from '@/lib/auth'
import { z } from 'zod'

const registerSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(8),
})

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { name, email, password } = registerSchema.parse(body)

    const existing = await db.user.findUnique({ where: { email } })
    if (existing) {
      return Response.json({ error: 'Email already registered' }, { status: 409 })
    }

    const hashedPassword = await hashPassword(password)
    const user = await db.user.create({
      data: { name, email, password: hashedPassword },
      select: { id: true, name: true, email: true, createdAt: true },
    })

    return Response.json(user, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return Response.json({ error: 'Validation error', details: error.errors }, { status: 400 })
    }
    return Response.json({ error: 'Registration failed' }, { status: 500 })
  }
}
