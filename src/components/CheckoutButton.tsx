'use client'

import { useState } from 'react'
import { PRICE_AMOUNTS } from '@/lib/prices'

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void
  }
}

export default function CheckoutButton({
  priceId,
  className,
  children,
}: {
  priceId: string
  className: string
  children: React.ReactNode
}) {
  const [loading, setLoading] = useState(false)

  async function handleClick() {
    setLoading(true)
    // Meta Pixel — user started checkout
    window.fbq?.('track', 'InitiateCheckout', {
      value: PRICE_AMOUNTS[priceId],
      currency: 'USD',
    })
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ priceId }),
      })
      const { url } = await res.json()
      window.location.href = url
    } catch {
      setLoading(false)
    }
  }

  return (
    <button type="button" className={className} onClick={handleClick} disabled={loading}>
      {loading ? 'Redirecting…' : children}
    </button>
  )
}
