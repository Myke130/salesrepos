# Skill: followup-sequencer

## Trigger

Invoked when the user needs a follow-up sequence after a sales call, wants to write post-call outreach, or has a CRM entry from the call-notes-to-crm skill and needs the next 7 days of touches written out.

---

## Input Required

The structured CRM entry from the `call-notes-to-crm` skill. At minimum, the input must include:
- Summary (what was discussed)
- Next Step (what was agreed)
- Objections Raised (if any)
- Follow-up Trigger (if identified)

If the user provides raw notes instead of a CRM entry, ask them to run `/call-notes-to-crm` first, or extract the key fields manually before proceeding.

---

## Output

Three touch messages written out in full and ready to send. No frameworks. No fill-in-the-blank templates. Actual copy based on what happened on this specific call.

---

## Writing Rules

**Banned words and phrases — rewrite any sentence containing these:**
circle back, touch base, just checking in, following up, per my last, as discussed, I wanted to reach out, hope this finds you well, I'd love to, leverage, synergies, robust, cutting-edge, delve, seamless, streamline, empower, game-changer, transformative, excited, move the needle, value-add, best-in-class.

**Specificity rule:** Every touch must reference something specific from the call — a company name, a number, a problem discussed, a stakeholder mentioned, a timeline the prospect gave, or a commitment made. A touch that could be sent to any prospect is a failed touch.

**Tone:** Direct, peer-to-peer. Write like someone who was in the conversation and is continuing it — not like someone running a sales sequence.

**One ask per touch:** Each message ends with exactly one question or one request. No multiple options.

**Never re-pitch:** The rep already had the call. These touches are about advancing the next step, not re-explaining the product.

---

## Touch Structure

### Touch 1 — Same Day (Email)

**Purpose:** Confirm the call happened, deliver any promised materials, lock in the next step.
**Constraint:** Under 75 words. Subject line required (under 8 words, no question mark, no exclamation).
**What to include:**
- One sentence anchoring back to the most important thing discussed
- Any deliverable promised on the call (or a note that it's coming by [date])
- Confirm the agreed next step with a specific date or ask to set one if it wasn't locked

---

### Touch 2 — Day 3 (LinkedIn Message)

**Purpose:** Stay visible without re-pitching. Add one piece of value or observation tied to something from the call.
**Constraint:** Under 75 words. No subject line.
**What to include:**
- Reference something specific from the call (a problem they named, a number they mentioned, a stakeholder they referenced)
- One piece of value: a relevant stat, a short observation, or a question that advances the conversation
- Do not re-summarize the call or ask them to schedule again unless the next step wasn't confirmed

---

### Touch 3 — Day 7 (Email)

**Purpose:** Re-engage if no response, or advance the deal toward the next agreed milestone.
**Constraint:** Under 75 words. Subject line required (under 8 words, no question mark, no exclamation).
**What to include:**
- Reference the Follow-up Trigger from the CRM entry if one was identified — this is the hook
- One direct ask: confirm the next step, share a decision, or tell the rep where things stand
- If no trigger was identified, reference the agreed next step and ask for a status

---

## Process

1. Read the full CRM entry.
2. Identify the three most usable specifics: (a) the core problem or insight from the call, (b) the agreed next step or outstanding decision, (c) the follow-up trigger or timeline mentioned.
3. Write Touch 1 using (a) and (b).
4. Write Touch 2 using the specific problem or insight from the call — add one external observation or question that moves thinking forward.
5. Write Touch 3 using (b) and (c) — if the trigger has a date, reference it directly.
6. Run the quality check.

---

## Quality Check (Run Before Delivering)

- [ ] Touch 1 email is under 75 words and has a subject line under 8 words
- [ ] Touch 2 LinkedIn is under 75 words with no subject line
- [ ] Touch 3 email is under 75 words and has a subject line under 8 words
- [ ] Every touch references something specific from the call notes — not generic
- [ ] No banned words in any touch
- [ ] Exactly one ask per touch
- [ ] Nothing re-pitches the product — these advance the next step only
- [ ] Tone is peer-to-peer throughout

Rewrite any touch that fails. Re-check after rewriting.

---

## Output Format

Deliver all three touches with no preamble. Use this exact structure:

---

**Touch 1 — Same Day | Email**

Subject: [subject line]

[body]

---

**Touch 2 — Day 3 | LinkedIn**

[body]

---

**Touch 3 — Day 7 | Email**

Subject: [subject line]

[body]

---
