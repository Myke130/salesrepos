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
      <head>
        {/* TODO: Remove Scupe.ai test pixel before production cleanup */}
        {/* Start Scupe.ai integration script for Obtainr LLC */}
        <script
          dangerouslySetInnerHTML={{
            __html: `!function(w,d,s,u,dbg){var js,js2,fjs=d.getElementsByTagName(s)[0];window.rdcndbg=dbg;js=d.createElement(s);js.async=!0;js.src=u;fjs.parentNode.insertBefore(js,fjs);js2=d.createElement(s);js2.async=!0;js2.src='https://app.scupe.ai/scupe.ai.min.js';fjs.parentNode.insertBefore(js2,fjs);}(window,document,'script','https://rdcdn.com/rtjs?aid=34221',!1);`,
          }}
        />
        {/* End Scupe.ai integration script for Obtainr LLC */}
      </head>
      <body className="font-sans bg-white text-navy antialiased">
        {children}
      </body>
    </html>
  )
}
