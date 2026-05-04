import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { db } from '@/lib/db'

const newsletterSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const result = newsletterSchema.safeParse(body)
    if (!result.success) {
      const firstError = result.error.issues[0]
      return NextResponse.json(
        { success: false, error: firstError?.message || 'Validation failed' },
        { status: 400 }
      )
    }

    const { email } = result.data

    // Check if already subscribed
    const existing = await db.newsletterSubscriber.findUnique({
      where: { email },
    })

    if (existing) {
      return NextResponse.json({
        success: true,
        message: "You're already subscribed! Thank you for staying with us.",
      })
    }

    // Save to database
    await db.newsletterSubscriber.create({
      data: { email },
    })

    return NextResponse.json({
      success: true,
      message: 'Welcome aboard! Check your inbox for a confirmation.',
    })
  } catch (error) {
    console.error('Newsletter subscription error:', error)
    return NextResponse.json(
      { success: false, error: 'Something went wrong. Please try again later.' },
      { status: 500 }
    )
  }
}
