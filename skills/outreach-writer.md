# Skill: outreach-writer

## Trigger

Invoked when the user asks to write cold outreach, a cold email, a LinkedIn message, or first-touch copy for a prospect — especially after running the prospect-research skill.

---

## Input Required

A completed 6-section account brief from the prospect-research skill, containing at minimum:
- Company Snapshot (recent news, growth signal, or funding detail)
- Decision Maker Profile (title, role context, any recent activity)
- Pain Point Hypothesis (at least one sourced pain)
- Conversation Hooks (specific openers tied to real findings)

If the brief is missing or incomplete, ask the user to run `/prospect-research` first or paste the relevant sections.

---

## Output

Two pieces of copy. Nothing else — no commentary, no explanations, no "here's what I did." Just the copy, labeled and ready to paste.

---

## Writing Rules (Enforce on Every Output)

**Banned words and phrases — replace every instance with something specific:**
leverage, synergies, robust, cutting-edge, circle back, touch base, delve, seamless, streamline, empower, game-changer, transformative, innovative, excited to connect, hope this finds you well, I wanted to reach out, just following up, would love to, pick your brain, at the end of the day, move the needle.

**Tone:**
- Peer-to-peer. Write like one operator talking to another, not a vendor pitching a buyer.
- Direct. State the observation, connect it to a question or outcome. No windup.
- Specific. Every opener must reference a real finding from the brief — a company name, a product launch, a hire, a job posting count, a quote. Never a generic industry observation.

**Structure logic:**
- Open with the finding (not a compliment, not a question about their day)
- Connect the finding to a tension or gap (one sentence)
- State what the rep's client does about that specific gap (one sentence)
- Close with one low-friction ask (a question or a specific time offer — not "let me know if you're interested")

---

## Output 1: Cold Email

**Constraints:**
- Subject line: under 8 words, no clickbait, no questions, no exclamation marks
- Body: under 100 words total (subject line not counted)
- No signature block — user will add their own
- Must reference one specific finding from the brief (product launch, hire, job posting, revenue signal, or exec quote)
- One ask only — a specific question or a time offer

**Format:**
```
Subject: [subject line]

[Email body]
```

---

## Output 2: LinkedIn DM

**Constraints:**
- Under 75 words
- No subject line
- Opens directly with the finding — no "Hi [Name], hope you're well" setup
- One ask only — a question or a soft time offer
- Reads like a message from someone who did their homework, not a sales sequence

**Format:**
```
[DM body]
```

---

## Process

1. Read the brief. Identify the single strongest finding — the one most specific to this person's role and situation.
2. Write the email first. Use the strongest finding as the opener.
3. Write the LinkedIn DM second. It can use the same finding or the second strongest — do not reuse identical phrasing from the email.
4. Run the quality check below before outputting anything.

---

## Quality Check (Run Before Delivering)

- [ ] Subject line is under 8 words and contains no banned phrases
- [ ] Email body is under 100 words
- [ ] LinkedIn DM is under 75 words
- [ ] Both pieces open with a specific finding from the brief — not a generic observation
- [ ] No banned words appear anywhere in either piece
- [ ] There is exactly one ask in each piece
- [ ] Tone is direct and peer-to-peer — no vendor language
- [ ] Neither piece explains what the rep's client does before establishing why it matters to this specific person

If any check fails, rewrite and re-check before delivering.

---

## Output Format

Deliver both pieces with no preamble. Use this exact structure:

---

**Cold Email**

Subject: [subject line]

[body]

---

**LinkedIn DM**

[body]

---
