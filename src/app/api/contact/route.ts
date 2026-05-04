import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

// ── Validation Schema ───────────────────────────────────────────────────────
const contactSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  businessName: z.string().min(1, 'Business name is required'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(1, 'Phone number is required'),
  service: z.string().optional(),
  budget: z.string().optional(),
  message: z.string().optional(),
})

// ── POST Handler ────────────────────────────────────────────────────────────
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate the incoming data
    const result = contactSchema.safeParse(body)

    if (!result.success) {
      const firstError = result.error.issues[0]
      return NextResponse.json(
        {
          success: false,
          error: firstError?.message || 'Validation failed',
          details: result.error.issues.map((issue) => ({
            field: issue.path.join('.'),
            message: issue.message,
          })),
        },
        { status: 400 }
      )
    }

    const data = result.data

    // Log the contact submission (replace with email sending later)
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
    console.log('📬 New Contact Form Submission')
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
    console.log(`  Name:          ${data.name}`)
    console.log(`  Business:      ${data.businessName}`)
    console.log(`  Email:         ${data.email}`)
    console.log(`  Phone:         ${data.phone}`)
    console.log(`  Service:       ${data.service || 'Not specified'}`)
    console.log(`  Budget:        ${data.budget || 'Not specified'}`)
    console.log(`  Message:       ${data.message || 'No message provided'}`)
    console.log(`  Timestamp:     ${new Date().toISOString()}`)
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')

    return NextResponse.json({
      success: true,
      message: `Thank you, ${data.name}! We've received your enquiry and will respond within 4 business hours.`,
    })
  } catch (error) {
    console.error('Contact form error:', error)

    // Handle JSON parse errors
    if (error instanceof SyntaxError) {
      return NextResponse.json(
        { success: false, error: 'Invalid request body' },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { success: false, error: 'Something went wrong. Please try again later.' },
      { status: 500 }
    )
  }
}
