'use client'

import { useEffect, useState } from 'react'

type Status = 'idle' | 'submitting' | 'success' | 'error'

export default function WaitlistModal() {
  const [open, setOpen]           = useState(false)
  const [firstName, setFirstName] = useState('')
  const [email, setEmail]         = useState('')
  const [status, setStatus]       = useState<Status>('idle')

  useEffect(() => {
    const handler = () => setOpen(true)
    window.addEventListener('openWaitlist', handler)
    return () => window.removeEventListener('openWaitlist', handler)
  }, [])

  function close() {
    setOpen(false)
    setFirstName('')
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
        body: JSON.stringify({ firstName, email }),
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
      style={{ background: 'rgba(0,0,0,0.75)' }}
      onClick={close}
    >
      <div
        className="relative rounded-2xl p-8 w-full max-w-md shadow-2xl"
        style={{ backgroundColor: '#0d1b5e', border: '1px solid rgba(255,255,255,0.15)' }}
        onClick={e => e.stopPropagation()}
      >
        <button
          onClick={close}
          aria-label="Close"
          className="absolute top-4 right-4 text-xl leading-none transition-colors"
          style={{ color: 'rgba(255,255,255,0.45)' }}
          onMouseOver={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.9)')}
          onMouseOut={e  => (e.currentTarget.style.color = 'rgba(255,255,255,0.45)')}
        >
          ✕
        </button>

        {status === 'success' ? (
          <div className="text-center py-4">
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4"
              style={{ backgroundColor: 'rgba(76,175,80,0.15)' }}
            >
              <svg className="w-6 h-6" viewBox="0 0 20 20" fill="none" style={{ color: '#4CAF50' }}>
                <path d="M4 10l4 4 8-8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <h2 className="font-sora font-black text-2xl text-white mb-2">You&rsquo;re on the list.</h2>
            <p className="text-sm" style={{ color: 'rgba(255,255,255,0.55)' }}>
              Check your inbox — a confirmation is on its way.
            </p>
          </div>
        ) : (
          <>
            <h2 className="font-sora font-black text-2xl text-white mb-1">Join the Waitlist</h2>
            <p className="text-sm mb-6" style={{ color: 'rgba(255,255,255,0.55)' }}>
              Be first in line when SalesRepOS launches.
            </p>
            <form onSubmit={submit} className="flex flex-col gap-3">
              <input
                type="text"
                required
                placeholder="First name"
                value={firstName}
                onChange={e => setFirstName(e.target.value)}
                disabled={status === 'submitting'}
                className="w-full rounded-lg px-4 py-3 text-white text-sm focus:outline-none transition-colors"
                style={{
                  backgroundColor: 'rgba(255,255,255,0.08)',
                  border: '1px solid rgba(255,255,255,0.15)',
                }}
                onFocus={e  => (e.currentTarget.style.borderColor = '#4CAF50')}
                onBlur={e   => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)')}
              />
              <input
                type="email"
                required
                placeholder="Email address"
                value={email}
                onChange={e => setEmail(e.target.value)}
                disabled={status === 'submitting'}
                className="w-full rounded-lg px-4 py-3 text-white text-sm focus:outline-none transition-colors"
                style={{
                  backgroundColor: 'rgba(255,255,255,0.08)',
                  border: '1px solid rgba(255,255,255,0.15)',
                }}
                onFocus={e  => (e.currentTarget.style.borderColor = '#4CAF50')}
                onBlur={e   => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)')}
              />
              {status === 'error' && (
                <p className="text-red-400 text-xs">Something went wrong — try again.</p>
              )}
              <button
                type="submit"
                disabled={status === 'submitting'}
                className="font-sora font-bold py-3 rounded-lg transition-colors disabled:opacity-60 text-white"
                style={{ backgroundColor: '#4CAF50' }}
                onMouseOver={e => { if (status !== 'submitting') e.currentTarget.style.backgroundColor = '#3d9142' }}
                onMouseOut={e  => { if (status !== 'submitting') e.currentTarget.style.backgroundColor = '#4CAF50'  }}
              >
                {status === 'submitting' ? 'Joining…' : 'Join the Waitlist'}
              </button>
            </form>
            <p className="text-xs text-center mt-4" style={{ color: 'rgba(255,255,255,0.35)' }}>
              No spam. You&rsquo;ll hear from us when we launch.
            </p>
          </>
        )}
      </div>
    </div>
  )
}
