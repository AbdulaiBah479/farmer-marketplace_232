import Anthropic from '@anthropic-ai/sdk'

export const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY!,
})

export const AI_MODELS = {
  fast: 'claude-haiku-4-5-20251001',
  balanced: 'claude-sonnet-4-6',
  powerful: 'claude-opus-4-8',
} as const

export type AIModel = keyof typeof AI_MODELS

export interface AIGenerateOptions {
  model?: AIModel
  maxTokens?: number
  temperature?: number
  systemPrompt?: string
}

export async function generateText(
  prompt: string,
  options: AIGenerateOptions = {}
): Promise<string> {
  const {
    model = 'balanced',
    maxTokens = 2048,
    systemPrompt,
  } = options

  const message = await anthropic.messages.create({
    model: AI_MODELS[model],
    max_tokens: maxTokens,
    system: systemPrompt,
    messages: [{ role: 'user', content: prompt }],
  })

  return message.content[0].type === 'text' ? message.content[0].text : ''
}

export async function* streamText(
  prompt: string,
  options: AIGenerateOptions = {}
) {
  const { model = 'balanced', maxTokens = 2048, systemPrompt } = options

  const stream = await anthropic.messages.stream({
    model: AI_MODELS[model],
    max_tokens: maxTokens,
    system: systemPrompt,
    messages: [{ role: 'user', content: prompt }],
  })

  for await (const chunk of stream) {
    if (
      chunk.type === 'content_block_delta' &&
      chunk.delta.type === 'text_delta'
    ) {
      yield chunk.delta.text
    }
  }
}

// ============ AI MODULE SERVICES ============

export const AILeadService = {
  async generateLeadScore(leadData: Record<string, any>): Promise<number> {
    const prompt = `Analyze this lead and return a score from 0-100 based on their likelihood to convert. Return ONLY a number.

Lead data: ${JSON.stringify(leadData, null, 2)}

Consider: company size, job title, industry, engagement, budget signals.
Score: `
    const result = await generateText(prompt, { model: 'fast', maxTokens: 10 })
    return Math.min(100, Math.max(0, parseInt(result.trim()) || 50))
  },

  async enrichLeadData(email: string, company: string): Promise<Record<string, any>> {
    const prompt = `Based on the email domain and company name, provide realistic business intelligence about this lead.
Email: ${email}
Company: ${company}

Return a JSON object with: industry, estimatedSize, estimatedRevenue, technologies (array), insights (string), score (0-100).
Return ONLY valid JSON.`
    const result = await generateText(prompt, { model: 'fast', maxTokens: 500 })
    try {
      const jsonMatch = result.match(/\{[\s\S]*\}/)
      return jsonMatch ? JSON.parse(jsonMatch[0]) : {}
    } catch {
      return {}
    }
  },

  async generateOutreachMessage(leadData: Record<string, any>, tone: string = 'professional'): Promise<string> {
    return generateText(
      `Write a personalized cold outreach email for this lead. Tone: ${tone}.
Lead: ${JSON.stringify(leadData)}
Keep it under 150 words. Be specific to their industry/role. No generic fluff.`,
      { model: 'balanced', maxTokens: 300 }
    )
  },
}

export const AICRMService = {
  async summarizeContact(contactHistory: Record<string, any>): Promise<string> {
    return generateText(
      `Create a concise 2-sentence summary of this customer relationship for a sales rep.
History: ${JSON.stringify(contactHistory)}`,
      { model: 'fast', maxTokens: 200 }
    )
  },

  async predictDealCloseProbability(dealData: Record<string, any>): Promise<number> {
    const prompt = `Analyze this sales deal and predict close probability (0-100). Return ONLY a number.
Deal: ${JSON.stringify(dealData)}`
    const result = await generateText(prompt, { model: 'fast', maxTokens: 10 })
    return Math.min(100, Math.max(0, parseInt(result.trim()) || 50))
  },

  async suggestNextAction(dealData: Record<string, any>): Promise<string> {
    return generateText(
      `What is the single most important next action to move this deal forward? Be specific and actionable. Max 2 sentences.
Deal: ${JSON.stringify(dealData)}`,
      { model: 'fast', maxTokens: 150 }
    )
  },
}

export const AIEmailService = {
  async generateEmail(context: {
    purpose: string
    recipient: string
    tone: string
    keyPoints?: string[]
    length?: 'short' | 'medium' | 'long'
  }): Promise<{ subject: string; body: string }> {
    const prompt = `Write a professional email.
Purpose: ${context.purpose}
Recipient: ${context.recipient}
Tone: ${context.tone}
Key points: ${context.keyPoints?.join(', ') || 'none'}
Length: ${context.length || 'medium'}

Return JSON: {"subject": "...", "body": "..."}
Return ONLY valid JSON.`

    const result = await generateText(prompt, { model: 'balanced', maxTokens: 800 })
    try {
      const jsonMatch = result.match(/\{[\s\S]*\}/)
      return jsonMatch ? JSON.parse(jsonMatch[0]) : { subject: 'Follow Up', body: result }
    } catch {
      return { subject: 'Follow Up', body: result }
    }
  },

  async improveEmail(originalEmail: string, instruction: string): Promise<string> {
    return generateText(
      `Improve this email: ${instruction}\n\nOriginal:\n${originalEmail}\n\nReturn only the improved email body.`,
      { model: 'balanced', maxTokens: 600 }
    )
  },
}

export const AIProposalService = {
  async generateProposal(context: {
    clientName: string
    projectDescription: string
    budget?: number
    timeline?: string
    services: string[]
    companyName: string
  }): Promise<string> {
    return generateText(
      `Generate a professional business proposal in Markdown format.
Client: ${context.clientName}
Project: ${context.projectDescription}
Budget: ${context.budget ? `$${context.budget}` : 'TBD'}
Timeline: ${context.timeline || 'TBD'}
Services: ${context.services.join(', ')}
Our Company: ${context.companyName}

Include: Executive Summary, Understanding of Requirements, Proposed Solution, Timeline & Milestones, Investment, Why Choose Us, Next Steps.
Make it compelling, specific, and professional.`,
      { model: 'powerful', maxTokens: 3000 }
    )
  },
}

export const AIContentService = {
  async generateBlogPost(topic: string, keywords: string[], audience: string): Promise<string> {
    return generateText(
      `Write a high-quality, SEO-optimized blog post.
Topic: ${topic}
Target keywords: ${keywords.join(', ')}
Audience: ${audience}

Include: Compelling headline, hook, 5-7 sections with H2 headers, practical examples, conclusion with CTA.
Word count: ~1000 words. Use Markdown formatting.`,
      { model: 'powerful', maxTokens: 2000 }
    )
  },

  async generateSocialPost(topic: string, platform: string, tone: string): Promise<string> {
    const limits: Record<string, number> = {
      twitter: 280, linkedin: 3000, instagram: 2200, facebook: 63206,
    }
    const limit = limits[platform.toLowerCase()] || 500

    return generateText(
      `Write a ${platform} post about: ${topic}
Tone: ${tone}
Character limit: ${limit}
Include relevant hashtags. Make it engaging and platform-appropriate.`,
      { model: 'balanced', maxTokens: 500 }
    )
  },
}

export const AIAnalyticsService = {
  async generateInsights(metricsData: Record<string, any>): Promise<string[]> {
    const prompt = `Analyze these business metrics and generate 3-5 actionable insights.
Data: ${JSON.stringify(metricsData)}

Return JSON array of insight strings. Each insight should be specific and actionable.
Return ONLY valid JSON array like: ["insight1", "insight2"]`

    const result = await generateText(prompt, { model: 'balanced', maxTokens: 500 })
    try {
      const jsonMatch = result.match(/\[[\s\S]*\]/)
      return jsonMatch ? JSON.parse(jsonMatch[0]) : [result]
    } catch {
      return [result]
    }
  },

  async forecastRevenue(historicalData: number[], periods: number = 3): Promise<number[]> {
    const prompt = `Based on this revenue history: ${JSON.stringify(historicalData)}
Forecast the next ${periods} periods. Return ONLY a JSON array of numbers.
Example: [12500, 13200, 14100]`

    const result = await generateText(prompt, { model: 'fast', maxTokens: 100 })
    try {
      const jsonMatch = result.match(/\[[\s\S]*\]/)
      return jsonMatch ? JSON.parse(jsonMatch[0]) : []
    } catch {
      return []
    }
  },
}

export const AISupportService = {
  async generateResponse(
    ticketContent: string,
    knowledgeBase: string = '',
    tone: string = 'professional'
  ): Promise<string> {
    return generateText(
      `Generate a helpful customer support response.
Customer message: ${ticketContent}
${knowledgeBase ? `Relevant knowledge: ${knowledgeBase}` : ''}
Tone: ${tone}
Be empathetic, clear, and provide actionable solutions. Keep it concise.`,
      { model: 'balanced', maxTokens: 400 }
    )
  },

  async categorizeTicket(ticketContent: string): Promise<{
    category: string
    priority: string
    sentiment: string
  }> {
    const prompt = `Categorize this support ticket.
Ticket: ${ticketContent}

Return JSON: {"category": "billing|technical|general|feature_request", "priority": "low|medium|high|urgent", "sentiment": "positive|neutral|negative|frustrated"}
Return ONLY valid JSON.`

    const result = await generateText(prompt, { model: 'fast', maxTokens: 100 })
    try {
      const jsonMatch = result.match(/\{[\s\S]*\}/)
      return jsonMatch ? JSON.parse(jsonMatch[0]) : { category: 'general', priority: 'medium', sentiment: 'neutral' }
    } catch {
      return { category: 'general', priority: 'medium', sentiment: 'neutral' }
    }
  },
}
