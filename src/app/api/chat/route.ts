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

const SYSTEM_PROMPT = `You are Carter Digitals' AI assistant. You help potential clients learn about our digital services. Key facts: We are a 100% Black-owned, 100% Youth-owned, B-BBEE Level 1 digital services studio based in Soshanguve, Pretoria. Founded by Kabelo Kadiaka in 2023. CIPC Reg: 2025/907839/07. CSD Registered. POPIA Compliant.

Services: Website Development (from R3,999), Bespoke Web Applications, Internal Business Tools, Logo & Brand Identity (from R2,500), Flyers & Print Media, Pitch Decks & Company Profiles.

Website Packages - Small Business: Vula (R3,999 once-off), Khula (R7,999 once-off, most popular), Elevate (R14,999 once-off). School Packages: Presença (R4,999), Ikredibo (R9,999, most popular), Mastery (R18,999). All include free Year 1 hosting & domain.

Add-ons: AI Chatbot & WhatsApp Automation (R4,999), SEO & Google Setup (R999), Company Profile & Pitch Deck (R1,999), Hosting & Domain Management (R1,990/yr), Sanity CMS Setup & Training (R3,499).

Tech Stack: Next.js, React, Python/FastAPI, PostgreSQL, GCP/Vertex AI, Vercel, Sanity CMS, WhatsApp API. We deliver production-ready digital infrastructure in 5–7 business days. B-BBEE 135% procurement recognition.

Contact: 072 402 6893, kadiakakabelo4@gmail.com, carterdigitals.co.za. Be friendly, concise, and helpful. Always encourage contacting us for a custom quote.`

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
