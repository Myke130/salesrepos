'use client'

import { useEffect, useState } from 'react'

type Status = 'idle' | 'submitting' | 'success' | 'error'

export default function WaitlistModal() {
  const [open, setOpen]     = useState(false)
  const [email, setEmail]   = useState('')
  const [status, setStatus] = useState<Status>('idle')

  useEffect(() => {
    const handler = () => setOpen(true)
    window.addEventListener('openWaitlist', handler)
    return () => window.removeEventListener('openWaitlist', handler)
  }, [])

  function close() {
    setOpen(false)
    setEmail('')
    setStatus('idle')
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('submitting')
    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      if (!res.ok) throw new Error()
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.65)' }}
      onClick={close}
    >
      <div
        className="relative bg-white rounded-2xl p-8 w-full max-w-md shadow-2xl"
        onClick={e => e.stopPropagation()}
      >
        <button
          onClick={close}
          aria-label="Close"
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 text-xl leading-none"
        >
          ✕
        </button>

        {status === 'success' ? (
          <div className="text-center py-4">
            <div className="w-12 h-12 rounded-full bg-green/10 flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-green" viewBox="0 0 20 20" fill="none">
                <path d="M4 10l4 4 8-8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <h2 className="font-sora font-black text-2xl text-navy mb-2">You&rsquo;re on the list.</h2>
            <p className="text-slate-500 text-sm">We&rsquo;ll reach out when SalesRepOS opens. Watch your inbox.</p>
          </div>
        ) : (
          <>
            <h2 className="font-sora font-black text-2xl text-navy mb-2">Join the Waitlist</h2>
            <p className="text-slate-500 text-sm mb-6">
              SalesRepOS is in active development. Drop your email and we&rsquo;ll notify you the moment it&rsquo;s ready.
            </p>
            <form onSubmit={submit} className="flex flex-col gap-3">
              <input
                type="email"
                required
                placeholder="your@email.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                disabled={status === 'submitting'}
                className="w-full border border-[#e0e7ff] rounded-lg px-4 py-3 text-navy text-sm focus:outline-none focus:border-blue transition-colors"
              />
              {status === 'error' && (
                <p className="text-red-500 text-xs">Something went wrong — try again.</p>
              )}
              <button
                type="submit"
                disabled={status === 'submitting'}
                className="bg-navy text-white font-sora font-bold py-3 rounded-lg hover:bg-navy-muted transition-colors disabled:opacity-60"
              >
                {status === 'submitting' ? 'Joining…' : 'Join the Waitlist'}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  )
}
