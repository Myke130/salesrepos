# Skill: multi-client-tracker

## Trigger

Invoked when a fractional sales rep wants to log a client update, refresh their deal tracker, or get a dashboard view across all active client engagements.

---

## How Session State Works

This skill maintains a running tracker across all clients within a single session. Each time the rep submits an update for one client, Claude updates that client's record in memory and re-renders the full dashboard showing all clients.

If this is the first update of the session, start a fresh tracker. Each subsequent update adds or overwrites that client's data. Data persists until the session ends.

If the user asks to clear a client, remove them from the tracker and re-render.

---

## Input Format (One Client at a Time)

The user provides an update for one client per message. Accept any of these formats — structured or loose:

**Structured:**
- Client name
- Active deals: each deal needs [deal name, stage, next step, close date]
- Blockers (anything preventing deal progress)
- Wins this week (closed deals, meetings booked, proposals sent, positive signals)

**Loose:** If the user gives a brain dump, extract the above fields from it. Ask one clarifying question only if a critical field (client name or deal stage) is missing.

---

## Momentum Score Logic

Assign each client a momentum score of 1, 2, or 3 based on the week's update:

| Score | Label | Criteria |
|---|---|---|
| 3 | Moving | Most deals have a confirmed next step + close date; wins present; no blockers |
| 2 | Mixed | Some deals advancing, some without a next step or close date; minor blockers |
| 1 | Stalled | No wins; deals missing next steps or close dates; active blockers present |

Score is based only on data provided — do not inflate. If a deal has no next step and no close date, it pulls the score down.

---

## Deal Stage Codes (Abbreviated for Dashboard)

Use these short codes in the dashboard to keep columns compact:

| Code | Stage |
|---|---|
| AWARE | Awareness |
| DISC | Discovery |
| QUAL | Qualified |
| SOL | Solution Presented |
| EVAL | Evaluation |
| NEG | Negotiation |
| WON | Closed Won |
| LOST | Closed Lost |
| STALL | Stalled |

---

## Output: Dashboard

Render the full dashboard every time an update is submitted. Re-render all clients, not just the updated one.

**Format requirements:**
- Terminal-readable: use plain text, pipes, dashes, and fixed-width spacing
- No markdown tables with pipes that break in narrow terminals — use padded columns
- Fits in an 80-character terminal width where possible
- Each client gets its own block separated by a divider line

---

## Dashboard Format

Use this exact structure. Render every client block, then the summary footer.

```
================================================================================
 FRACTIONAL SALES TRACKER          Session: [date]
================================================================================

CLIENT: [Client Name]                              MOMENTUM: [score]/3 ([label])
--------------------------------------------------------------------------------
 DEAL NAME           STAGE    NEXT STEP                          CLOSE DATE
 -----------------------------------------------------------------------
 [deal name]         [CODE]   [next step, truncated to 35 chars] [date or TBD]
 [deal name]         [CODE]   [next step, truncated to 35 chars] [date or TBD]

 WINS THIS WEEK
 > [win 1]
 > [win 2 if any]

 BLOCKERS
 ! [blocker 1]
 ! [blocker 2 if any]
 [If none: (none logged)]

================================================================================

CLIENT: [Next Client Name]                         MOMENTUM: [score]/3 ([label])
--------------------------------------------------------------------------------
 [same structure]

================================================================================

 SUMMARY                          [date]
 -----------------------------------------------
 Active clients:    [n]
 Total deals:       [n]
 Deals with next step confirmed:  [n] / [total]
 Deals missing close date:        [n]
 Clients at momentum 1 (stalled): [list names or "none"]
 Highest priority next action:    [the single most time-sensitive next step
                                   across all clients — deal name + action]

================================================================================
```

**Notes on rendering:**
- Truncate deal names to 20 characters, next steps to 35, with no ellipsis — just cut
- If a next step is missing, display: `(no next step logged)`
- If a close date is missing, display: `TBD`
- Wins and blockers are bullet lines — keep each to one line, truncate at 60 characters
- The summary footer always reflects the full current state of all clients in session

---

## Commands the User Can Give

- `update [client name]` — submit a new update for that client
- `clear [client name]` — remove that client from the tracker
- `show tracker` — re-render the dashboard without submitting new data
- `reset` — clear all clients and start fresh

---

## Anti-Slop Rules

No commentary, no encouragement, no "great update!" responses. When the user submits data, output the updated dashboard. Nothing else unless a clarifying question is needed.
