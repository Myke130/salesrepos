# CHANGELOG — SalesRepOS

All file changes are logged here for surgical manual deploys.

---

## [0.1.0] — 2026-05-18

### Added
- Initial project scaffold from FlexJobRX template
- `src/app/page.tsx` — Full landing page (hero, workflow chain, skills breakdown, live proof, pricing, FAQ, closing CTA)
- `src/app/layout.tsx` — Root layout with Sora, DM Sans, JetBrains Mono fonts
- `src/app/globals.css` — Global styles, hero-bg, skill cards, pricing cards, animations
- `src/app/api/waitlist/route.ts` — Brevo waitlist signup endpoint
- `src/components/NavClient.tsx` — Scroll-aware sticky nav
- `src/components/WaitlistButton.tsx` — Client button that fires openWaitlist event
- `src/components/WaitlistModal.tsx` — Email capture modal
- `src/components/ScrollReveal.tsx` — IntersectionObserver scroll reveal
- `CLAUDE.md` — Project context
- `CHANGELOG.md` — This file
