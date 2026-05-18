'use client'

export default function WaitlistButton({
  className,
  children,
}: {
  className: string
  children: React.ReactNode
}) {
  return (
    <button
      type="button"
      className={className}
      onClick={() => window.dispatchEvent(new CustomEvent('openWaitlist'))}
    >
      {children}
    </button>
  )
}
