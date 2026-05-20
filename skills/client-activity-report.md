# Skill: client-activity-report

## Trigger

Invoked when the rep needs to generate a weekly activity report to send to a client contact, using the data from the `multi-client-tracker` skill.

---

## Input Required

The tracker data for one specific client from the `multi-client-tracker` skill. This includes:
- Client name
- Active deals with stage, next step, and close date
- Wins this week
- Blockers

If the user pastes the full multi-client dashboard, ask which client the report is for before proceeding.

If data is missing fields (no wins logged, no blockers), write around the gaps — do not leave blank sections or placeholder text.

---

## Output

A single client-facing weekly activity report. Ready to paste into an email or send directly. Under 400 words. No subject line — the rep will add their own.

---

## Tone and Writing Rules

**Tone:** Peer update from a senior operator — not a vendor status report, not a consultant deliverable. Written as one business person updating another on shared work. Direct, confident, no hedging.

**Format:** Short sections with clear headers. Bullet points where there are multiple items. Prose where there is one thing to say. No tables.

**Banned words and phrases:**
leverage, synergies, robust, cutting-edge, delve, seamless, streamline, empower, game-changer, transformative, innovative, per our discussion, as we discussed, moving forward, going forward, circle back, touch base, exciting progress, pleased to report, I am happy to share, value-add, best-in-class, at the end of the day, move the needle, impactful, actionable insights, key takeaways.

**Voice rules:**
- First person ("I" or "we" — rep decides before sending)
- Past tense for wins and completed actions
- Present tense for current deal status
- Future tense for recommended actions
- Never write "the team" when you can name the person responsible

---

## Section Logic

### Wins This Week
What moved, closed, or advanced this week. If there are no wins, write one honest sentence about what was worked on — do not manufacture wins or use vague language like "continued to build pipeline."

### Pipeline Summary
Each active deal gets one line: deal name, current stage, and the specific next step with a date. If a next step or close date is missing, note it plainly — "next step not yet confirmed" — do not paper over it.

### Blockers Needing Client Input
Only blockers that require action from the client contact. If there are none, omit this section entirely — do not write "No blockers this week."

### Recommended Actions for Next Week
2–3 specific actions the rep will take or that the client needs to take. Not generic. Each action names the deal, the action, and who owns it.

---

## Word Count Rule

Target: under 400 words. Count before delivering. If over 400, cut the most generic sentences first — never cut specifics.

---

## Quality Check (Run Before Delivering)

- [ ] Under 400 words
- [ ] No banned words or phrases
- [ ] Wins section is specific — names deals or actions, not vague progress
- [ ] Pipeline summary has one line per deal with stage and next step
- [ ] Blockers section only present if there are client-facing blockers
- [ ] Recommended actions are specific — deal name, action, owner
- [ ] Tone is peer-to-peer throughout — no vendor or consultant register
- [ ] No placeholder text or empty sections

Rewrite any section that fails. Re-check after rewriting.

---

## Output Format

Deliver the report with no preamble. Use this exact structure:

---

**Weekly Update — [Client Name]**
**Week of [date]**

---

**Wins This Week**

[content]

---

**Pipeline Summary**

[content]

---

**Blockers Needing Your Input**

[section only present if applicable]

---

**Recommended Actions — Next Week**

[content]

---

*[Optional one-line closing — a forward-looking statement or the single most important thing to resolve. Skip if nothing meaningful to add.]*

---
