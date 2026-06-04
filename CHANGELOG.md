# CHANGELOG — SalesRepOS

All file changes are logged here for surgical manual deploys.

---

## [0.5.1] — 2026-05-21

### No Changes
- No code or content updates today.

---

## [0.5.0] — 2026-05-20

### Changed
- `src/app/page.tsx` — Removed WaitlistButton/WaitlistModal; replaced all 4 CTAs with CheckoutButton (Core $67, Full OS $127); hero CTA now links to #pricing; added one-sentence skill explanation above pricing cards; upgraded money-back guarantee to shield callout with bold label; updated hero badge chips (removed 'Founding member price $97')
- `src/components/NavClient.tsx` — Replaced 'Join the Waitlist' dispatch button with 'Get SalesRepOS' anchor to #pricing

### Added
- `src/lib/brevo.ts` — sendEmail helper with SalesRepOS branded sender
- `src/app/api/webhooks/stripe/route.ts` — Handles `checkout.session.completed`; detects Core vs Full OS via line_items price ID; sends delivery email + day-3 upsell for Core buyers
- `public/downloads/salesrepos-core.zip` — 7 Core skills for post-purchase delivery
- `public/downloads/salesrepos-full-os.zip` — All 17 skills for post-purchase delivery
- `skills/*.md` — All 17 skill markdown files (copied from FlexJobRX)
- `STRIPE_PRICE_CORE` and `STRIPE_PRICE_FULL_OS` added to Vercel env (Production + Development)
- `STRIPE_SECRET_KEY` added to Vercel Production (was missing — only Development + Preview)

---

## [0.4.0] — 2026-05-18

### Added
- `src/app/api/waitlist/route.ts` — Adds contact to Brevo list 6, sends confirmation email via Brevo SMTP
- `src/components/WaitlistModal.tsx` — Email capture modal triggered by openWaitlist event
- `src/components/WaitlistButton.tsx` — Client button that dispatches openWaitlist event

---

## [0.3.0] — 2026-05-18

### Added
- `src/app/api/checkout/route.ts` — Creates Stripe checkout session; accepts priceId; success/cancel URLs set to salesrepos.com
- `src/components/CheckoutButton.tsx` — Client button that POSTs to /api/checkout and redirects to Stripe

---

## [0.2.2] — 2026-05-18

### Changed
- `src/app/page.tsx` — Increased logo width from 400px to 550px

---

## [0.2.1] — 2026-05-18

### Changed
- `src/app/page.tsx` — Enlarged logo to 400px, removed duplicate tagline text below logo

---

## [0.2.0] — 2026-05-18

### Added
- `public/salesrepos-logo.png` — SalesRepOS logo asset
- `src/app/page.tsx` — Replaced text logo with salesrepos-logo.png img tag

---

## [0.1.0] — 2026-05-18

### Added
- Initial project scaffold from FlexJobRX template
- `src/app/page.tsx` — Full landing page (hero, workflow chain, skills breakdown, live proof, pricing, FAQ, closing CTA)
- `src/app/layout.tsx` — Root layout with Sora, DM Sans, JetBrains Mono fonts
- `src/app/globals.css` — Global styles, hero-bg, skill cards, pricing cards, animations
- `src/components/NavClient.tsx` — Scroll-aware sticky nav
- `src/components/ScrollReveal.tsx` — IntersectionObserver scroll reveal
- `CLAUDE.md` — Project context
- `CHANGELOG.md` — This file
