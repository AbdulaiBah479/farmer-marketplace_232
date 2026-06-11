import { auth } from '@/lib/auth'
import { generateText, AI_MODELS } from '@/lib/ai'
import { db } from '@/lib/db'
import { z } from 'zod'

const generateSchema = z.object({
  type: z.enum(['email', 'proposal', 'content', 'social', 'contract', 'lead_score', 'insights']),
  prompt: z.string().min(1).max(5000),
  context: z.record(z.any()).optional(),
  model: z.enum(['fast', 'balanced', 'powerful']).default('balanced'),
})

const systemPrompts: Record<string, string> = {
  email: 'You are an expert email copywriter. Write compelling, personalized professional emails.',
  proposal: 'You are an expert business proposal writer. Create winning proposals that demonstrate clear value.',
  content: 'You are an expert content creator and SEO specialist. Write engaging, optimized content.',
  social: 'You are an expert social media strategist. Create engaging posts for specific platforms.',
  contract: 'You are an expert business contract writer. Create clear, professional contract documents.',
  lead_score: 'You are a lead qualification expert. Analyze leads and provide accurate scoring with reasoning.',
  insights: 'You are a business intelligence analyst. Provide clear, actionable insights from data.',
}

export async function POST(req: Request) {
  try {
    const session = await auth()
    if (!session?.user?.organizationId) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await req.json()
    const { type, prompt, context, model } = generateSchema.parse(body)

    const fullPrompt = context
      ? `Context: ${JSON.stringify(context)}\n\nRequest: ${prompt}`
      : prompt

    const result = await generateText(fullPrompt, {
      model,
      systemPrompt: systemPrompts[type],
      maxTokens: model === 'powerful' ? 4096 : 2048,
    })

    await db.aIUsageLog.create({
      data: {
        organizationId: session.user.organizationId,
        userId: session.user.id,
        model: AI_MODELS[model],
        module: type,
        action: 'generate',
        totalTokens: Math.floor(result.length / 4),
      },
    }).catch(console.error)

    return Response.json({ result, type })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return Response.json({ error: 'Validation error', details: error.errors }, { status: 400 })
    }
    return Response.json({ error: 'Generation failed' }, { status: 500 })
  }
}
