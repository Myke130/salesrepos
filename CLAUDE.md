# SalesRepOS — Project Context

## Product

A 17-skill Claude Code stack covering the full sales operating cycle — prospect research through commission tracking. Built for sales reps and account executives who manage multiple clients and accounts simultaneously.

## Stack

- **Framework:** Next.js 14, Tailwind CSS
- **Hosting:** Vercel — auto-deploy from `master`
- **Backend:** None yet — Stripe and Brevo pending

## Temporary Integrations

| Integration | File | Status | Action Required |
|---|---|---|---|
| Scupe.ai tracking pixel | `src/app/layout.tsx` | Active — test only | Remove `<script>` block in `<head>` when Scupe.ai testing is complete |

## Pricing Tiers

| Tier | Price | Contents |
|---|---|---|
| Core Stack | $67 one-time | Skills 1–7 (essential workflow) |
| Full OS | $127 one-time | All 17 skills |
| Full OS + Setup Call | $197 one-time | All 17 skills + onboarding call |

**Upsell:** Core buyers receive a Brevo email at day 3 with a $60-off coupon for Full OS upgrade.

## Skills

**Location:** `salesrepos/skills/` — 17 `.md` files

| Category | Skills |
|---|---|
| Pre-call | ICP Builder, Prospect Research |
| Outreach | Outreach Writer, Cold Call Script, LinkedIn Profile Optimizer |
| In the meeting | Discovery Call Prep, DQM Appointment Script, Objection Handler |
| Post-call | Call Notes to CRM, Follow-up Sequencer, Proposal Writer |
| Account management | Multi-Client Tracker, Client Activity Report |
| Engagement lifecycle | New Client Onboarding, Win/Loss Debrief, Referral Ask, Commission Tracker |

**Methodology:** Diagnostic Questioning Method (DQM) baked into skill #11 (`dqm-appointment-script.md`)

**Naming:** DQM is the only name used anywhere — file names, slash commands, prose, landing page, delivery emails. The methodology was previously labelled NEPQ; that name is retired and must not reappear. When a skill file changes, **rebuild the download zips** (below) — the rename shipped to the repo in May 2026 but not to the zips, so buyers kept receiving the old wording until 2026-07-27.

**Rebuilding the download zips (required after any `skills/*.md` change):**

```bash
cd salesrepos
rm -f public/downloads/salesrepos-full-os.zip public/downloads/salesrepos-core.zip
(cd skills && zip -q -X ../public/downloads/salesrepos-full-os.zip *.md)
(cd skills && zip -q -X ../public/downloads/salesrepos-core.zip \
  icp-builder.md prospect-research.md outreach-writer.md cold-call-script.md \
  discovery-call-prep.md call-notes-to-crm.md followup-sequencer.md)
```

Verify with `unzip -l` (17 files / 7 files) and by diffing an extracted file against `skills/`.

## Key Files

| File | Purpose |
|---|---|
| `src/app/page.tsx` | Landing page — hero, workflow chain, skills breakdown, live proof, pricing, FAQ, closing CTA |
| `salesrepos/skills/*.md` | All 17 skill files |

## Primary URL

**salesrepos.com** — live on Vercel, auto-deploy from `master`

## Current Phase

Product is live and publicly purchasable. Waitlist gate removed.

**Infrastructure status:**
- Stripe: ✅ $67 Core (`price_1TYUluHhw9qqOoDRRTsLxz5H`) and $127 Full OS (`price_1TYUlwHhw9qqOoDRgcwcP0Mi`) — live mode
- Brevo: ✅ Purchase delivery email + day-3 upsell (FULLUPGRADE60) via `/api/webhooks/stripe`
- Stripe webhook: registered at `https://salesrepos.com/api/webhooks/stripe`, event: `checkout.session.completed`
- DNS: ✅ salesrepos.com pointing to Vercel
- Skill files: ✅ All 17 skills in `salesrepos/skills/`
- Download zips: ✅ `public/downloads/salesrepos-core.zip` (7 skills), `public/downloads/salesrepos-full-os.zip` (17 skills)

## Key API Routes

| Route | Purpose |
|---|---|
| `POST /api/checkout` | Creates Stripe checkout session; accepts `priceId` |
| `POST /api/waitlist` | Adds contact to Brevo list 6; still active for future use |
| `POST /api/webhooks/stripe` | Handles `checkout.session.completed`; fires delivery email |

## Git Workflow

- `master` = production; Vercel auto-deploys on push
- Commit prefixes: `feat:`, `fix:`, `docs:`, `copy:`
- Never commit `.env`, `.next/`, or `node_modules/`

## Working Rules

Derived from Andrej Karpathy's observations on common LLM coding mistakes. Apply to every session.

**Surface assumptions before acting.**
If a request has multiple interpretations, list them and ask. Don't silently pick one. State uncertainty before writing code — clarifying questions belong before implementation, not after a wrong attempt.

**No features beyond what was asked.**
Write the minimal code that satisfies the request. No abstractions for single-use logic. No speculative parameters, config switches, or "we might need this later" patterns. If a solution is approaching 200 lines for what should be a simple change, stop and question it.

**Surgical edits only.**
Change only the lines that address the specific request. Don't refactor surrounding code that isn't broken. Don't change style, formatting, naming conventions, or comments in untouched areas. Note pre-existing issues but don't fix them unless explicitly asked.

**Concrete success criteria first.**
Before implementing multi-step work, state a verifiable outcome. "Fix the bug" → identify what correct behavior looks like and how to confirm it. "Add the feature" → define what done means before writing the first line. For multi-step tasks, name the verification checkpoint at each step.
