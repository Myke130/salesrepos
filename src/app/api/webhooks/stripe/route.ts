import Stripe from 'stripe'
import { NextRequest, NextResponse } from 'next/server'
import { sendEmail } from '@/lib/brevo'

function getStripe() {
  return new Stripe(process.env.STRIPE_SECRET_KEY!)
}

const PRICE_CORE    = process.env.STRIPE_PRICE_CORE    ?? 'price_1TYUluHhw9qqOoDRRTsLxz5H'
const PRICE_FULL_OS = process.env.STRIPE_PRICE_FULL_OS ?? 'price_1TYUlwHhw9qqOoDRgcwcP0Mi'
const DOWNLOAD_BASE = 'https://salesrepos.com/downloads'
const FULL_OS_LINK  = 'https://salesrepos.com/#pricing'

// ─── Email templates ──────────────────────────────────────────────────────────

function coreDeliveryHtml(base: string) {
  return `
<div style="font-family:Arial,sans-serif;max-width:560px;margin:0 auto;color:#1a1a2e">
  <div style="background:#0d1b5e;padding:24px 32px">
    <span style="font-size:20px;font-weight:700;color:#fff">SalesRep<span style="color:#4CAF50">OS</span></span>
  </div>
  <div style="padding:32px">
    <h1 style="font-size:22px;font-weight:700;margin:0 0 16px">Your Core Stack is ready.</h1>
    <p style="color:#444;line-height:1.6;margin:0 0 24px">
      Seven skills. ICP builder through follow-up sequencer.
      Drop the files into your Claude Code workspace and you're ready to go.
    </p>
    <a href="${base}/salesrepos-core.zip"
       style="display:inline-block;background:#4CAF50;color:#fff;font-weight:700;padding:14px 28px;border-radius:8px;text-decoration:none;font-size:15px">
      Download Core Skills
    </a>
    <hr style="border:none;border-top:1px solid #e8e8e8;margin:32px 0">
    <p style="color:#666;font-size:13px;line-height:1.6;margin:0">
      Drop the <code>.md</code> files into your Claude Code workspace folder.
      Type <code>/icp-builder</code> in Claude to run your first skill.
    </p>
  </div>
  <div style="background:#f4f4f8;padding:16px 32px;font-size:12px;color:#888">
    &copy; 2026 Obtainr LLC &mdash; salesrepos.com
  </div>
</div>`
}

function fullOsDeliveryHtml(base: string) {
  return `
<div style="font-family:Arial,sans-serif;max-width:560px;margin:0 auto;color:#1a1a2e">
  <div style="background:#0d1b5e;padding:24px 32px">
    <span style="font-size:20px;font-weight:700;color:#fff">SalesRep<span style="color:#4CAF50">OS</span></span>
  </div>
  <div style="padding:32px">
    <h1 style="font-size:22px;font-weight:700;margin:0 0 16px">Your Full OS is ready.</h1>
    <p style="color:#444;line-height:1.6;margin:0 0 24px">
      All 17 skills. The complete sales operating system —
      from prospect research through commission tracking.
    </p>
    <a href="${base}/salesrepos-full-os.zip"
       style="display:inline-block;background:#4CAF50;color:#fff;font-weight:700;padding:14px 28px;border-radius:8px;text-decoration:none;font-size:15px">
      Download Full OS
    </a>
    <hr style="border:none;border-top:1px solid #e8e8e8;margin:32px 0">
    <p style="color:#666;font-size:13px;line-height:1.6;margin:0">
      Drop all <code>.md</code> files into your Claude Code workspace folder.
      Every skill runs as a <code>/command</code> directly in Claude.
    </p>
  </div>
  <div style="background:#f4f4f8;padding:16px 32px;font-size:12px;color:#888">
    &copy; 2026 Obtainr LLC &mdash; salesrepos.com
  </div>
</div>`
}

function upsellHtml() {
  return `
<div style="font-family:Arial,sans-serif;max-width:560px;margin:0 auto;color:#1a1a2e">
  <div style="background:#0d1b5e;padding:24px 32px">
    <span style="font-size:20px;font-weight:700;color:#fff">SalesRep<span style="color:#4CAF50">OS</span></span>
  </div>
  <div style="padding:32px">
    <h1 style="font-size:22px;font-weight:700;margin:0 0 16px">Upgrade to Full OS &mdash; $60 off for 48 hours.</h1>
    <p style="color:#444;line-height:1.6;margin:0 0 16px">
      You've had the Core Stack for a few days. The 10 skills you're missing are the ones
      that close the gaps: DQM appointment script, objection handler, proposal writer,
      multi-client tracker, and more.
    </p>
    <p style="color:#444;line-height:1.6;margin:0 0 24px">
      Full OS is normally $127. Use the code below and pay $67 &mdash; same as Core.
    </p>
    <div style="background:#f4f4f8;border:1px solid #e0e7ff;border-radius:8px;padding:20px;margin:0 0 24px;text-align:center">
      <p style="margin:0 0 6px;font-size:13px;color:#666">Your upgrade code</p>
      <p style="margin:0;font-size:28px;font-weight:700;letter-spacing:3px;color:#0d1b5e">FULLUPGRADE60</p>
    </div>
    <a href="${FULL_OS_LINK}"
       style="display:inline-block;background:#0d1b5e;color:#fff;font-weight:700;padding:14px 28px;border-radius:8px;text-decoration:none;font-size:15px">
      Upgrade to Full OS &rarr;
    </a>
    <p style="color:#888;font-size:12px;margin:20px 0 0">
      Enter code at checkout. One-time use. Expires 48 hours from this email.
    </p>
  </div>
  <div style="background:#f4f4f8;padding:16px 32px;font-size:12px;color:#888">
    &copy; 2026 Obtainr LLC &mdash; salesrepos.com
  </div>
</div>`
}

// ─── Webhook handler ──────────────────────────────────────────────────────────

export async function POST(req: NextRequest) {
  const body = await req.text()
  const sig = req.headers.get('stripe-signature') ?? ''

  const stripe = getStripe()
  let event: Stripe.Event
  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!)
  } catch {
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session
    const email = session.customer_details?.email

    console.log('[webhook] session:', session.id, '| email:', email ?? 'none')

    if (!email) {
      console.log('[webhook] No email — skipping')
      return NextResponse.json({ ok: true })
    }

    // Retrieve line items to identify which product was purchased
    const sessionWithItems = await stripe.checkout.sessions.retrieve(session.id, {
      expand: ['line_items'],
    })
    const priceId = sessionWithItems.line_items?.data[0]?.price?.id

    console.log('[webhook] priceId:', priceId)
    console.log('[webhook] PRICE_CORE:', PRICE_CORE)
    console.log('[webhook] PRICE_FULL_OS:', PRICE_FULL_OS)
    const isCore   = priceId === PRICE_CORE
    const isFullOs = priceId === PRICE_FULL_OS
    console.log('[webhook] match:', isCore ? 'CORE' : isFullOs ? 'FULL_OS' : 'NONE')

    if (isCore) {
      console.log('[webhook] Sending Core delivery email to', email)
      await sendEmail({
        to: email,
        subject: 'Your SalesRepOS Core Skills — Download Inside',
        html: coreDeliveryHtml(DOWNLOAD_BASE),
      })
      const day3 = new Date(Date.now() + 72 * 60 * 60 * 1000).toISOString()
      await sendEmail({
        to: email,
        subject: 'Upgrade to Full OS — $60 off, 48 hours only',
        html: upsellHtml(),
        scheduledAt: day3,
      })
      console.log('[webhook] Core delivery + day-3 upsell queued')
    } else if (isFullOs) {
      console.log('[webhook] Sending Full OS delivery email to', email)
      await sendEmail({
        to: email,
        subject: 'Your SalesRepOS Full OS — Download Inside',
        html: fullOsDeliveryHtml(DOWNLOAD_BASE),
      })
      console.log('[webhook] Full OS delivery sent')
    } else {
      console.log('[webhook] No match — priceId not recognized, no email sent')
    }
  }

  return NextResponse.json({ ok: true })
}
