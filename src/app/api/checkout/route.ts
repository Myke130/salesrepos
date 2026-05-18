import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

export async function POST(req: NextRequest) {
  let priceId: string
  try {
    ;({ priceId } = await req.json())
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 })
  }

  if (!priceId || typeof priceId !== 'string') {
    return NextResponse.json({ error: 'priceId required' }, { status: 400 })
  }

  const origin = req.headers.get('origin') ?? 'https://salesrepos.com'

  const session = await stripe.checkout.sessions.create({
    mode: 'payment',
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: `${origin}/?checkout=success`,
    cancel_url:  `${origin}/#pricing`,
  })

  return NextResponse.json({ url: session.url })
}
