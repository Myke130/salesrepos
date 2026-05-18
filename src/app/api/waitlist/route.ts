import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  let email: string
  try {
    ;({ email } = await req.json())
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 })
  }

  if (!email || typeof email !== 'string' || !email.includes('@')) {
    return NextResponse.json({ error: 'Valid email required' }, { status: 400 })
  }

  const listIdEnv = process.env.BREVO_WAITLIST_LIST_ID
  const listIds   = listIdEnv ? [parseInt(listIdEnv, 10)] : []

  const res = await fetch('https://api.brevo.com/v3/contacts', {
    method: 'POST',
    headers: {
      'api-key':      process.env.BREVO_API_KEY!,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, listIds, updateEnabled: true }),
  })

  // 204 = contact already existed and was updated; treat as success
  if (!res.ok && res.status !== 204) {
    console.error('[waitlist] Brevo error:', res.status, await res.text())
    return NextResponse.json({ error: 'Failed to subscribe' }, { status: 500 })
  }

  return NextResponse.json({ ok: true })
}
