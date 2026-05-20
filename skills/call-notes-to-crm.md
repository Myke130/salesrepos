# Skill: call-notes-to-crm

## Trigger

Invoked when the user has raw call notes, a voice dump, or unstructured post-call text and needs a clean CRM entry.

---

## Input Required

Raw call notes — any format. This could be:
- A voice-to-text transcript
- Bullet points jotted during the call
- A stream-of-consciousness brain dump written immediately after hanging up
- A mix of fragments, names, action items, and half-sentences

Do not ask the user to clean up the input. Work with whatever they give you.

---

## Output

A single structured CRM entry ready to paste into HubSpot or Salesforce. Six fields. No extra commentary.

---

## Writing Rules

**Banned words and phrases:**
leverage, synergies, robust, cutting-edge, delve, seamless, circle back, touch base, empower, game-changer, transformative, innovative, moving forward, going forward, at the end of the day, it was a great conversation, they seemed interested (state what they actually said instead).

**Accuracy rule:** Only include information that was explicitly stated or clearly implied in the raw notes. Do not infer, embellish, or fill gaps with assumptions. If a field cannot be populated from the notes, write "Not mentioned."

**Field compatibility:**
- All fields map to standard HubSpot and Salesforce deal/contact record structures
- Summary maps to: HubSpot "Call Notes" / Salesforce "Description"
- Next Step maps to: HubSpot "Next Activity" / Salesforce "Next Step"
- Deal Stage maps to: HubSpot "Deal Stage" / Salesforce "Stage"
- Objections Raised maps to: HubSpot custom property or Salesforce "Description" append
- Stakeholders Mentioned maps to: HubSpot "Associated Contacts" / Salesforce "Contact Roles"

---

## Process

1. Read the full raw input once.
2. Extract: what was discussed, what was agreed, who was on the call, what objections came up, what the rep learned about the deal.
3. Determine deal stage based on the stage definitions below.
4. Populate all six fields from the extracted information only.

---

## Deal Stage Definitions

Use these to select the Deal Stage Recommendation:

| Stage | Criteria |
|---|---|
| **Awareness** | First contact made, no discovery completed |
| **Discovery** | Problem and current state discussed; fit not yet confirmed |
| **Qualified** | Budget, authority, need, and timeline at least partially confirmed |
| **Solution Presented** | Specific product or approach has been proposed |
| **Evaluation** | Prospect is actively comparing options or reviewing a proposal |
| **Negotiation** | Commercial terms or contract under discussion |
| **Closed Won** | Deal confirmed |
| **Closed Lost** | Prospect disqualified or went elsewhere |
| **Stalled** | No clear next step; prospect unresponsive or timeline unknown |

---

## Output Format

Deliver the CRM entry with no preamble. Use this exact structure:

---

### CRM Entry — [Company Name] | [Date if mentioned, otherwise "Date not provided"]

**Summary**
[2 sentences maximum. Sentence 1: what was discussed and what was learned. Sentence 2: what was agreed or what the clear next step is. Past tense. No filler.]

**Next Step**
[Single action item. Format: [Action] by [Owner] — [Date or "date TBD"]. Example: "Send pricing proposal to Sarah Chen — by May 16." If no next step was established, write "No next step confirmed — follow up to establish one."]

**Objections Raised**
[Bullet list. Each objection in the prospect's own words or as close as possible. If none raised, write "None raised."]
- [objection 1]
- [objection 2]

**Stakeholders Mentioned**
[Bullet list. Name, title if mentioned, and any context (decision-maker, influencer, blocker, not yet involved). If only one person on the call and no others mentioned, write "Only [Name] mentioned — no other stakeholders identified."]
- [Name] — [Title if known] — [Role in deal: decision-maker / influencer / blocker / unknown]

**Deal Stage Recommendation**
[Stage name from the definitions above]
*Rationale: [One sentence explaining why this stage — cite something from the notes.]*

**Follow-up Trigger**
[One sentence. The specific thing the rep should watch for or act on that could change the deal — a date, a pending decision, a stakeholder who needs to be looped in, or an event the prospect mentioned. This is the thing that, if missed, stalls the deal. If nothing specific was mentioned, write "No trigger identified — prioritize establishing a hard next step."]

---
