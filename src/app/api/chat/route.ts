import { NextRequest, NextResponse } from 'next/server'
import ZAI from 'z-ai-web-dev-sdk'
import { z } from 'zod'

const chatSchema = z.object({
  messages: z
    .array(
      z.object({
        role: z.enum(['user', 'assistant', 'system']),
        content: z.string().min(1),
      })
    )
    .min(1),
})

const SYSTEM_PROMPT = `You are Carter Digitals' AI assistant. You help potential clients learn about our web design and business tool services. Key facts: We are a 100% Black-owned B-BBEE Level 1 digital agency based in Soshanguve, Pretoria. We build SME websites (from R7,950), dashboards & internal tools (from R15,000), and SEO & growth packages (from R22,000). We use Next.js + Google Cloud Platform. We deliver most sites in 2-3 weeks. Contact: 072 402 6893, info@carterdigitals.co.za. Be friendly, concise, and helpful. If asked about pricing, mention our transparent packages. Always encourage contacting us for a custom quote.`

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const result = chatSchema.safeParse(body)
    if (!result.success) {
      const firstError = result.error.issues[0]
      return NextResponse.json(
        { success: false, error: firstError?.message || 'Validation failed' },
        { status: 400 }
      )
    }

    const { messages } = result.data

    // Prepend system prompt
    const chatMessages = [
      { role: 'system' as const, content: SYSTEM_PROMPT },
      ...messages.map((m) => ({
        role: m.role as 'user' | 'assistant',
        content: m.content,
      })),
    ]

    const zai = await ZAI.create()
    const response = await zai.chat.completions.create({
      messages: chatMessages,
      stream: false,
    })

    const assistantMessage =
      response?.choices?.[0]?.message?.content ||
      response?.content ||
      "I'm sorry, I couldn't generate a response. Please try again."

    return NextResponse.json({
      success: true,
      message: assistantMessage,
    })
  } catch (error) {
    console.error('Chat API error:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Something went wrong. Please try again later.',
      },
      { status: 500 }
    )
  }
}
