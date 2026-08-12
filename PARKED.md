# SalesRepOS — PARKED 2026-08-12

Founder decision (Mike, 2026-08-12): SalesRepOS is parked. Taken off the public internet,
**IP preserved, nothing deleted.** Every action below is reversible.

## Safety checks that cleared the park

- **Stripe live customers: NONE.** Zero subscriptions on any SalesRepOS price (all its prices
  are `one_time`, so a subscription was never possible). Full lifetime charge history reviewed
  (17 charges, `has_more:false`) — **no successful SalesRepOS payment has ever occurred.**
  - One **failed** $127 attempt: `py_3TZBkmHhw9qqOoDR0h9JiH8B`, Eric Goodnack
    <egoodie130@gmail.com>, 2026-05-21, `generic_decline`, `paid:false`. Not a customer, but the
    only real purchase intent this product ever saw — worth a follow-up if it un-parks.
  - Three $1 charges are Mike's own self-tests on the retired $1 test prices.
- **No customer was cut off. No refund is owed.**
- **No other property calls SalesRepOS.** Only a display tile in
  `obtainr-com/data/executive-console.json` (`"Site: Live"`) — now stale, see Loose Ends.

## What was changed

| Thing | Before | After | Reverse with |
|---|---|---|---|
| Vercel domains | `salesrepos.com` + `www` attached to project `salesrepos` | detached (2 aliases removed) | `vercel domains add salesrepos.com salesrepos` (+ www) |
| Site | 200 | **404 `DEPLOYMENT_NOT_FOUND`** | re-attach domain |
| Stripe webhook `we_1TYVmXHhw9qqOoDRlv0F7ksH` | `enabled` | **`disabled`** (not deleted) | set `disabled: false` |
| Brevo API key `SalesRepOS` (`xkeysib-…XE5qAP`) | active, unused 3mo | **left to lapse** ~2026-08-19 | mint a NEW key — this one is gone |
| `.env.stats` | untracked, committable | gitignored | — (keep it ignored) |

**Deliberately NOT done** (needs Mike's explicit go): Vercel project delete, domain
deregistration, Stripe product/price archival.

## What was preserved

- **Code:** fully pushed to `github.com/Myke130/salesrepos` @ `9c185cf`. 0 unpushed commits.
  Rescued `35e675f` (was local-only) and committed the untracked `src/salesrepos_logo.png`.
- **Full archive** (incl. `.env`, `.git`): `backups/salesrepos-park-2026-08-12/salesrepos-full-2026-08-12.tar.gz`
  — 826K, 426 files. `backups/` is gitignored.
- **Supabase:** nothing to export — **SalesRepOS never used Supabase.** No DB, no tables.
- **Stripe:** products/prices left active and intact; all history retained in Stripe.

## Domain

`salesrepos.com` — **still registered**, registrar **NameCheap**, expires **2027-05-17**.
DNS is at NameCheap (`dns1/dns2.registrar-servers.com`), A record `76.76.21.21` → Vercel, and
that A record is **still in place** — which is why the domain now returns Vercel's 404 rather
than failing to resolve. Left registered deliberately to preserve the brand for revival.
Nothing was changed at the registrar.

## Un-parking checklist

1. **Mint a NEW Brevo API key** — the old one will have lapsed. Set `BREVO_API_KEY` in the
   salesrepos Vercel Production env. **Without this the waitlist and the post-purchase email
   fail silently** (`api/waitlist/route.ts`, `lib/brevo.ts` → Stripe webhook).
2. Re-attach domains: `vercel domains add salesrepos.com salesrepos` and the `www` variant.
3. Redeploy production (`vercel --prod`).
4. Re-enable Stripe webhook `we_1TYVmXHhw9qqOoDRlv0F7ksH` (`disabled: false`) and confirm
   `STRIPE_WEBHOOK_SECRET` still matches.
5. Verify: `curl -s -o /dev/null -w "%{http_code}" https://salesrepos.com` → 200, then a real
   $1 test purchase end-to-end (checkout → webhook → email).

## Loose ends for Mike

- **Brevo list 6 (waitlist) was NOT exported.** No usable Brevo API key exists on disk (the
  local one is the literal placeholder `xkeysib-...`) and Vercel masks the real value, so this
  cannot be done from code. **Export it from the Brevo UI before ~2026-08-19**, or the
  subscriber list becomes unreachable when the key lapses. Signup volume is also unknown for
  the same reason.
- `obtainr-com/data/executive-console.json` still advertises SalesRepOS as **"Site: Live"** —
  now false. Update when convenient.
