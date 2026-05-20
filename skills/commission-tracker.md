# Skill: commission-tracker

## Trigger

Invoked when a rep wants to log a commission entry, check their earnings status, follow up on an overdue payment, or get a full picture of what they've earned, what they're owed, and what's in the pipeline.

---

## How Session State Works

This skill maintains a running commission ledger across all entries within a single session. Each time the rep submits an entry, Claude updates the ledger and re-renders the full tracker. Data persists until the session ends.

If the user asks to remove an entry, delete it and re-render. If they update an entry (status change, payment received), overwrite and re-render.

---

## Input Format (One Entry at a Time)

Accept structured or loose format. Extract:

1. **Client name** — the company
2. **Deal name** — the specific deal or project
3. **Deal size** — total contract value
4. **Commission** — rate (e.g., 8%) or flat fee (e.g., $4,000)
5. **Payment terms** — when commission is due (e.g., "net 30 from close," "50% on signature / 50% on delivery," "monthly retainer")
6. **Deal status** — one of: Closed / Pending / Overdue
7. **Expected payment date** — specific date or "TBD"

If status is "Overdue" and no expected date is given, ask for the original expected date so days-past-due can be calculated.

---

## Calculation Logic

**Commission amount:** If a rate is given, calculate: deal size × rate. If a flat fee is given, use as-is.

**Total earned:** Sum of all commission amounts across all entries with status Closed or Overdue.

**Total paid:** Sum of all commission amounts the rep has marked as received. Use a "paid" flag — if the rep says "mark [deal] as paid," update the status and recalculate.

**Total outstanding:** Total earned minus total paid.

**Overdue:** Any entry where status is Overdue OR where expected payment date has passed and status is not paid. Calculate days past due from expected payment date to today's date.

**Pipeline projection:** Sum of commission amounts for entries with status Pending. Label as "projected — not guaranteed."

---

## Follow-up Message Logic

For any overdue entry, generate a ready-to-send follow-up message. Tone: direct and professional — not apologetic, not aggressive. States the facts (what is owed, since when, payment terms agreed), asks for a specific action (confirmation of payment date or confirmation that payment has been processed).

One message per overdue entry. Under 100 words. No banned phrases.

---

## Commands

- Add a new entry — user provides data
- `mark [deal name] paid` — update status to paid, recalculate totals
- `mark [deal name] overdue` — update status to overdue
- `remove [deal name]` — delete entry and re-render
- `show tracker` — re-render without new data
- `draft follow-up for [deal name]` — generate overdue message for a specific entry
- `reset` — clear all entries

---

## Writing Rules (Follow-up Messages)

**Banned words and phrases:**
just wanted to, I hope this finds you well, I wanted to follow up, per our agreement (use specific terms instead), as discussed, circle back, touch base, I know you're busy, sorry to bother you, when you get a chance, at your convenience, any update on this.

---

## Output: Tracker Dashboard

Render after every update. Clean, scannable, terminal-readable. Use plain text with dashes and pipes.

```
================================================================================
 COMMISSION TRACKER                              As of: [today's date]
================================================================================

 SUMMARY
 -----------------------------------------------
 Total earned:          $[amount]   ([n] deals)
 Total paid:            $[amount]
 Total outstanding:     $[amount]
 Overdue:               $[amount]   ([n] items)
 Pipeline (projected):  $[amount]   ([n] pending deals)

================================================================================

 PAID
 -----------------------------------------------
 [Client]        [Deal Name]          $[commission]    Paid [date if known]
 ...
 [If none: (no paid entries)]

================================================================================

 OUTSTANDING
 -----------------------------------------------
 [Client]        [Deal Name]          $[commission]    Due [date]
 ...
 [If none: (no outstanding entries)]

================================================================================

 OVERDUE
 -----------------------------------------------
 [Client]        [Deal Name]          $[commission]    [n] days past due
 !  Follow-up message ready — type: draft follow-up for [deal name]
 ...
 [If none: (no overdue entries)]

================================================================================

 PIPELINE (PROJECTED — NOT GUARANTEED)
 -----------------------------------------------
 [Client]        [Deal Name]          $[commission est.]   Expected [date or TBD]
 ...
 [If none: (no pipeline entries)]

================================================================================
```

---

## Output: Follow-up Message (when triggered)

Rendered below the tracker or on demand. One message per overdue entry.

```
================================================================================
 FOLLOW-UP — [Client Name] | [Deal Name]
================================================================================

[Message body — under 100 words, direct, states amount owed and days past due,
asks for specific confirmation of payment or payment date]

================================================================================
```

---

## Quality Check on Follow-up Messages

- [ ] Under 100 words
- [ ] States the specific amount owed
- [ ] States how many days past due or the original expected date
- [ ] References the payment terms that were agreed
- [ ] Ends with one specific ask (confirm payment processed / confirm new payment date)
- [ ] No banned words
- [ ] Tone is professional and direct — not apologetic, not aggressive

---

## Anti-Slop Rules

No commentary. No encouragement. When the user submits data, output the updated tracker. Nothing else unless a clarifying question is needed.
