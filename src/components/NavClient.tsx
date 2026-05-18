'use client'

import { useEffect, useState } from 'react'

export default function NavClient() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 72)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white border-b border-gray-200 shadow-sm'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-inner mx-auto px-6 h-16 flex items-center justify-end">
        <button
          type="button"
          onClick={() => window.dispatchEvent(new CustomEvent('openWaitlist'))}
          className={`inline-flex items-center gap-2 text-sm font-semibold px-5 py-2.5 rounded transition-all duration-300 ${
            scrolled
              ? 'bg-navy text-white hover:bg-navy-muted'
              : 'bg-white/15 text-white border border-white/30 hover:bg-white/25 backdrop-blur-sm'
          }`}
        >
          Join the Waitlist
        </button>
      </div>
    </header>
  )
}
