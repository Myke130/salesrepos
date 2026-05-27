import type { Metadata } from 'next'
import { Sora, DM_Sans, JetBrains_Mono } from 'next/font/google'
import './globals.css'

const sora = Sora({
  subsets: ['latin'],
  variable: '--font-sora',
  display: 'swap',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  display: 'swap',
})

const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'SalesRepOS — The Operating System for Sales Reps',
  description:
    '17 Claude-powered skills for sales reps. Research, outreach, call prep, CRM notes, commission tracking — handled. Founding member price $97.',
  metadataBase: new URL('https://salesrepos.com'),
  alternates: {
    canonical: 'https://salesrepos.com',
  },
  openGraph: {
    title: 'SalesRepOS — The Operating System for Sales Reps',
    description:
      '17 Claude-powered skills for sales reps. Research, outreach, call prep, CRM notes, commission tracking — handled. Founding member price $97.',
    url: 'https://salesrepos.com',
    siteName: 'SalesRepOS',
    type: 'website',
    images: [
      {
        url: '/salesrepos-logo.png',
        width: 1200,
        height: 630,
        alt: 'SalesRepOS — The Operating System for Sales Reps',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SalesRepOS — The Operating System for Sales Reps',
    description:
      '17 Claude-powered skills for sales reps. Research, outreach, call prep, CRM notes, commission tracking — handled. Founding member price $97.',
    images: ['/salesrepos-logo.png'],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${sora.variable} ${dmSans.variable} ${jetbrains.variable}`}>
      <body className="font-sans bg-white text-navy antialiased">
        {children}
      </body>
    </html>
  )
}
