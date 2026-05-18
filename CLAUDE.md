# SalesRepOS — Project Context

## Product

A 17-skill Claude Code stack covering the full sales operating cycle — prospect research through commission tracking. Built for sales reps and account executives who manage multiple clients and accounts simultaneously.

## Stack

- **Framework:** Next.js 14, Tailwind CSS
- **Hosting:** Vercel — auto-deploy from `master`
- **Backend:** None yet — Stripe and Brevo pending

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
| In the meeting | Discovery Call Prep, NEPQ Appointment Script, Objection Handler |
| Post-call | Call Notes to CRM, Follow-up Sequencer, Proposal Writer |
| Account management | Multi-Client Tracker, Client Activity Report |
| Engagement lifecycle | New Client Onboarding, Win/Loss Debrief, Referral Ask, Commission Tracker |

**Methodology:** NEPQ (Jeremy Miner framework) baked into skill #11 (`nepq-appointment-script.md`)

## Key Files

| File | Purpose |
|---|---|
| `src/app/page.tsx` | Landing page — hero, workflow chain, skills breakdown, live proof, pricing, FAQ, closing CTA |
| `salesrepos/skills/*.md` | All 17 skill files |

## Current Phase

Landing page scaffolded. Connecting to Vercel and deploying to salesrepos.com.

**Pending infrastructure:**
- Stripe: $67 Core and $127 Full OS products
- Brevo: purchase delivery email + day-3 upsell sequence
- DNS: point `salesrepos.com` to Vercel deployment
- Skill files: copy from flexjobrx/skills/ and customize

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
