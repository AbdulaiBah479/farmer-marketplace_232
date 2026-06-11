import { anthropic, AI_MODELS } from '@/lib/ai'
import { auth } from '@/lib/auth'
import { db } from '@/lib/db'

export async function POST(req: Request) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { message, module, conversationHistory = [] } = await req.json()

    if (!message) {
      return Response.json({ error: 'Message is required' }, { status: 400 })
    }

    const systemPrompts: Record<string, string> = {
      leads: 'You are an expert AI Lead Generation specialist for a business. Help users find, qualify, and manage leads. Provide specific, actionable advice.',
      crm: 'You are an expert AI CRM assistant. Help users manage contacts, deals, and customer relationships. Provide data-driven insights.',
      email: 'You are an expert AI Email Copywriter. Write compelling, personalized emails that get responses. Focus on conversion optimization.',
      proposals: 'You are an expert AI Business Proposal writer. Create winning proposals that close deals. Focus on client value and ROI.',
      contracts: 'You are an expert AI Contract assistant. Help draft, review, and analyze business contracts.',
      social: 'You are an expert AI Social Media strategist. Create engaging content that grows audiences and drives engagement.',
      content: 'You are an expert AI Content Creator. Produce high-quality, SEO-optimized content across all formats.',
      support: 'You are an expert AI Customer Support agent. Resolve customer issues quickly and empathetically.',
      projects: 'You are an expert AI Project Manager. Help plan, track, and deliver projects on time and on budget.',
      analytics: 'You are an expert AI Business Analyst. Interpret data, identify trends, and recommend strategic actions.',
      finance: 'You are an expert AI Financial Advisor for small businesses. Help with invoicing, cash flow, and financial planning.',
      default: 'You are AI COO, a world-class AI Chief Operating Officer. You help businesses automate operations, increase revenue, and scale efficiently. Be specific, actionable, and data-driven.',
    }

    const systemPrompt = systemPrompts[module] || systemPrompts.default

    const messages = [
      ...conversationHistory.slice(-10),
      { role: 'user' as const, content: message },
    ]

    const encoder = new TextEncoder()

    const stream = new ReadableStream({
      async start(controller) {
        try {
          const anthropicStream = await anthropic.messages.stream({
            model: AI_MODELS.balanced,
            max_tokens: 1024,
            system: systemPrompt,
            messages,
          })

          for await (const chunk of anthropicStream) {
            if (chunk.type === 'content_block_delta' && chunk.delta.type === 'text_delta') {
              const data = JSON.stringify({ type: 'text', text: chunk.delta.text })
              controller.enqueue(encoder.encode(`data: ${data}\n\n`))
            }
          }

          const final = await anthropicStream.finalMessage()

          if (session.user.organizationId) {
            await db.aIUsageLog.create({
              data: {
                organizationId: session.user.organizationId,
                userId: session.user.id,
                model: AI_MODELS.balanced,
                module: module || 'chat',
                action: 'chat',
                inputTokens: final.usage.input_tokens,
                outputTokens: final.usage.output_tokens,
                totalTokens: final.usage.input_tokens + final.usage.output_tokens,
              },
            }).catch(console.error)
          }

          controller.enqueue(encoder.encode(`data: ${JSON.stringify({ type: 'done' })}\n\n`))
          controller.close()
        } catch (error) {
          controller.enqueue(encoder.encode(`data: ${JSON.stringify({ type: 'error', error: 'AI generation failed' })}\n\n`))
          controller.close()
        }
      },
    })

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    })
  } catch (error) {
    return Response.json({ error: 'Internal server error' }, { status: 500 })
  }
}
