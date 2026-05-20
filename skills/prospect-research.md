# Skill: prospect-research

## Trigger

Invoked when the user asks to research a prospect, prep for a sales call, or build an account brief.

---

## Inputs Required

Collect all three before proceeding. If any are missing, ask for them.

1. **Company** — name or URL
2. **Contact LinkedIn URL** — full profile URL
3. **What the rep's client sells** — one sentence (the product/service being sold into this account)

---

## Research Protocol

Run all searches in parallel. Use `WebSearch` and `WebFetch` for every data point. **Never hallucinate.** If a data point is unavailable, say "Not found" — do not infer or fabricate.

**Banned words:** leverage, robust, synergies, cutting-edge, delve, seamless, streamline, empower, holistic, game-changer, transformative. If you catch yourself writing one, replace it with a specific fact.

### Company Research (5–7 searches)

Search for:
- Recent news (last 90 days) — press releases, product launches, executive hires
- Funding rounds — Crunchbase, TechCrunch, announcement pages
- Job postings — LinkedIn Jobs, Greenhouse, Lever, Indeed; note departments hiring and volume
- Revenue or headcount signals — recent earnings, layoffs, expansions
- Technology stack — BuiltWith, job posting requirements, G2/Capterra reviews
- Stated priorities — investor decks, CEO interviews, blog posts, earnings calls

Fetch the company website homepage and about/leadership page.

### Contact Research (3–4 searches)

Fetch the LinkedIn profile URL provided. Also search:
- `"[First Last]" "[Company]"` — find quotes, interviews, podcast appearances, conference talks
- `"[First Last]" site:linkedin.com` — cross-reference public posts or activity
- `"[First Last]" "[Company]" announcement OR promotion OR joined` — confirm tenure and transitions

Capture: current title, department, estimated tenure, stated focus areas, any public content (posts, articles, comments), any recent role changes.

---

## Output Format

Deliver as a structured 6-section brief. Use headers, bullets, and plain language. Target: **5-minute pre-call read**. Every line must reference a specific finding — no generic statements.

---

### [COMPANY NAME] — Account Brief
**Prepared for:** [rep name if provided, otherwise omit]
**Date:** [today's date]
**What [rep's client] sells:** [one sentence from input]

---

### 1. Company Snapshot

| Field | Detail |
|---|---|
| Industry | |
| Headcount | |
| Revenue (if known) | |
| HQ | |
| Key products/services | |
| Recent funding | |
| Growth signal | |

2–3 sentence narrative covering the most important thing happening at the company right now — tied to a specific, sourced finding.

---

### 2. Decision Maker Profile

| Field | Detail |
|---|---|
| Name | |
| Title | |
| Department | |
| Tenure in role | |
| Tenure at company | |
| Reports to (if known) | |

**What they care about (based on evidence):**
- [Specific signal — quote, post, job posting language, press release attribution]
- [Second signal if found]

**Recent activity:**
- [Any public post, article, conference appearance, or announcement in last 6 months — with source]
- If none found: "No recent public activity found."

---

### 3. Pain Point Hypothesis

Based on the company's growth signals, hiring patterns, tech stack, and the contact's role — identify 2–3 specific operational or commercial pressures that [what rep's client sells] directly addresses.

Format each as:
**Pain:** [specific friction or gap]
**Evidence:** [the finding that indicates this — job posting, news item, public statement]
**Relevance:** [one sentence on why this maps to what the rep is selling]

Do not list generic pains. If you cannot tie a pain to a specific evidence source, omit it.

---

### 4. Conversation Hooks

Three specific openers to use in the first 60 seconds. Each must be grounded in a real, verifiable finding from the research above. No generic relationship-building lines.

**Hook 1 — [Category: News / Hiring / Product / Quote / etc.]**
> "[Exact suggested opener — first-person, direct, referencing the specific finding]"
Source: [where you found this]

**Hook 2 — [Category]**
> "[Opener]"
Source: [source]

**Hook 3 — [Category]**
> "[Opener]"
Source: [source]

---

### 5. Objection Forecast

2–3 most likely pushbacks this contact will raise, based on their role, company stage, and what is being sold. For each:

**Objection:** "[Likely exact wording]"
**Why they'll say it:** [1 sentence — grounded in their situation]
**Suggested response:** [2–3 sentences — specific, no clichés, acknowledges their reality before pivoting]

---

### 6. Recommended First Move

One clear, specific action to take before or immediately after the call. Choose one:
- Email to send (with subject line and 3-sentence body)
- LinkedIn message (under 75 words)
- Call objective (the one question or commitment to walk away with)

State which one and write it out, ready to copy-paste.

**Rationale:** [One sentence on why this move fits this specific contact and moment.]

---

## Quality Check (Run Before Delivering)

Before outputting the brief, verify:
- [ ] Every bullet references a specific finding, not a generic claim
- [ ] No banned words used
- [ ] Any unavailable data is marked "Not found" — nothing inferred
- [ ] Conversation hooks are copy-paste ready, not frameworks
- [ ] Objection responses are specific to this person's situation
- [ ] First Move is written out in full, not described

If any check fails, fix it before delivering.
