import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  let firstName: string, email: string
  try {
    ;({ firstName, email } = await req.json())
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 })
  }

  if (!email || typeof email !== 'string' || !email.includes('@')) {
    return NextResponse.json({ error: 'Valid email required' }, { status: 400 })
  }
  if (!firstName || typeof firstName !== 'string') {
    return NextResponse.json({ error: 'First name required' }, { status: 400 })
  }

  const apiKey = process.env.BREVO_API_KEY!
  const headers = { 'api-key': apiKey, 'Content-Type': 'application/json' }

  // Add contact to Brevo list 6
  const contactRes = await fetch('https://api.brevo.com/v3/contacts', {
    method: 'POST',
    headers,
    body: JSON.stringify({
      email,
      attributes: { FIRSTNAME: firstName },
      listIds: [6],
      updateEnabled: true,
    }),
  })

  if (!contactRes.ok && contactRes.status !== 204) {
    console.error('[waitlist] Brevo contact error:', contactRes.status, await contactRes.text())
    return NextResponse.json({ error: 'Failed to subscribe' }, { status: 500 })
  }

  // Send confirmation email
  const emailRes = await fetch('https://api.brevo.com/v3/smtp/email', {
    method: 'POST',
    headers,
    body: JSON.stringify({
      sender: { name: 'Mike @ SalesRepOS', email: 'hello@salesrepos.com' },
      to: [{ email, name: firstName }],
      subject: "You're on the list.",
      htmlContent: `
        <div style="font-family: sans-serif; max-width: 560px; margin: 0 auto; color: #1a1a2e; padding: 40px 20px;">
          <p style="font-size: 16px; line-height: 1.6;">Hi ${firstName},</p>
          <p style="font-size: 16px; line-height: 1.6;">You're on the SalesRepOS waitlist.</p>
          <p style="font-size: 16px; line-height: 1.6;">
            We're putting the finishing touches on 17 sales execution systems built for modern reps —
            the kind of operator-level tools that make the difference between winging it and running a real process.
          </p>
          <p style="font-size: 16px; line-height: 1.6;">
            You'll be the first to know when we go live. Founding members get early access and a launch price
            that won't be available after opening day.
          </p>
          <p style="font-size: 16px; line-height: 1.6; margin-top: 32px;">— Mike @ SalesRepOS</p>
          <hr style="border: none; border-top: 1px solid #e0e7ff; margin: 32px 0;" />
          <p style="font-size: 12px; color: #999;">
            You're receiving this because you signed up at salesrepos.com.
            No spam — just one email when we launch.
          </p>
        </div>
      `,
    }),
  })

  if (!emailRes.ok) {
    // Contact was added successfully — don't fail the request over the confirmation email
    console.error('[waitlist] Brevo email error:', emailRes.status, await emailRes.text())
  }

  return NextResponse.json({ ok: true })
}
