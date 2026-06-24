'use client'

import { useEffect } from 'react'

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void
  }
}

/**
 * Meta Pixel events for the SalesRepOS sales page:
 *  - ViewContent on every load of the sales page (this is the only page).
 *  - Purchase when Stripe redirects back with ?checkout=success, deduped via
 *    sessionStorage so a refresh never double-counts the conversion. Value and
 *    currency are read from the query params set by the checkout route.
 */
export default function SalesPixel() {
  useEffect(() => {
    window.fbq?.('track', 'ViewContent')

    const params = new URLSearchParams(window.location.search)
    if (params.get('checkout') !== 'success') return
    if (sessionStorage.getItem('fbq_purchase')) return
    sessionStorage.setItem('fbq_purchase', '1')

    const value = Number(params.get('value'))
    window.fbq?.(
      'track',
      'Purchase',
      value ? { value, currency: params.get('currency') ?? 'USD' } : undefined,
    )
  }, [])

  return null
}
