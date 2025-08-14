import { NextRequest, NextResponse } from 'next/server'
import { prismaDirect } from '@/lib/prisma-direct'
import { getResend, FROM_EMAIL } from '@/lib/resend'
import { z } from 'zod'

const subscribeSchema = z.object({
  email: z.string().email('Invalid email address'),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validate input
    const result = subscribeSchema.safeParse(body)
    if (!result.success) {
      return NextResponse.json(
        { error: result.error.issues[0].message },
        { status: 400 }
      )
    }

    const { email } = result.data
    
    // Generate confirmation token
    const token = crypto.randomUUID()
    
    // Check if email already exists
    const existing = await prismaDirect.subscription.findUnique({
      where: { email }
    })
    
    if (existing) {
      return NextResponse.json({ error: 'Email already subscribed.' }, { status: 409 })
    }

    // Insert new subscription
    await prismaDirect.subscription.create({
      data: {
        email,
        token,
        status: 'PENDING'
      }
    })

    // Send confirmation email
    const resend = getResend();
      await resend.emails.send({
        from: FROM_EMAIL,
        to: email,
        subject: 'Confirm your subscription to TechPulse',
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
            <h2>Welcome to TechPulse!</h2>
            <p>Thank you for subscribing to our newsletter. Please confirm your subscription by clicking the link below:</p>
            <p style="margin: 30px 0;">
              <a href="${process.env.NEXT_PUBLIC_SITE_URL}/confirm?token=${token}" 
                 style="background-color: #00D4FF; color: #000; padding: 12px 24px; text-decoration: none; border-radius: 4px; display: inline-block;">
                Confirm Subscription
              </a>
            </p>
            <p style="color: #666; font-size: 14px;">If you didn't subscribe to TechPulse, you can safely ignore this email.</p>
          </div>
        `
      })
      
      return NextResponse.json({
        message: 'Subscription successful! Please check your email to confirm.',
        success: true,
      })
    } catch (error) {
      console.error('Newsletter subscription error:', error)
      return NextResponse.json(
        { error: 'Failed to subscribe. Please try again.' },
        { status: 500 }
      )
    }
}
