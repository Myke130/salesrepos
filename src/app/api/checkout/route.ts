import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { PRICE_AMOUNTS } from '@/lib/prices'

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

  // Pass the purchase amount to the success page so the Meta Pixel Purchase
  // event can report a value (the success page has no other access to it).
  const amount = PRICE_AMOUNTS[priceId] ?? ''

  const session = await stripe.checkout.sessions.create({
    mode: 'payment',
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: `${origin}/?checkout=success&value=${amount}&currency=USD`,
    cancel_url:  `${origin}/#pricing`,
  })

  return NextResponse.json({ url: session.url })
}
