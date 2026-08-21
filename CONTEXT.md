# Open Knowledge — Implementation Masterplan

> **Operator:** LIVLU TECHNOLOGIES LTD  
> **Pillar:** Open Knowledge  
> **Author & Creator:** Henriques Pontes  
> **Official Website:** [forrovivo.com](https://forrovivo.com) (`www` redirects here)  
> **Privacy Policy:** [forrovivo.com/legal/privacy](https://www.forrovivo.com/legal/privacy) · **Terms of Use:** [forrovivo.com/legal/terms](https://www.forrovivo.com/legal/terms) · **EULA:** [forrovivo.com/legal/eula](https://www.forrovivo.com/legal/eula) · **Company:** [forrovivo.com/legal/company](https://www.forrovivo.com/legal/company)  
> **GitHub:** [HenriquesPontes/OpenKnowledge](https://github.com/HenriquesPontes/OpenKnowledge) · Org [Forrovivo](https://github.com/Forrovivo)  
> **Contact:** support@forrovivo.com | geral@forrovivo.com  
> **License:** Proprietary (LIVLU TECHNOLOGIES LTD EULA) — Copyright © 2026 Henriques Pontes · Not open source  
> **Place in LIVLU TECHNOLOGIES:** Individual Open Knowledge team repo. Sister pillars: Learning (ForroVivo App) and Research (datasets + `api.forrovivo.com`).  
> **Quick Summary:** Public linguistic knowledge site, docs hub, and API playground. Lexical evidence stays in Research — this repo catalogs, presents, and routes developers. No AI-generated text treated as linguistic evidence.

---

## Big Picture Tracker

```
[DONE] Phase 1: Public site shell (nav, locale, isolation catalog)
       |
[DONE] Phase 2: Dictionary lookup + Africa map / research atlas
       |
[DONE] Phase 3: API playground (same-origin /api/v1 + curl → api.forrovivo.com)
       |
[DONE] Phase 4: Docs hub (Open Knowledge · App · Connect · API reference)
       |
[DONE] Phase 5: API Platform accounts (session + optional key issue)
       |
[DONE] Phase 6: Legal / company / careers surfaces + permanent /legal/* redirects
       |
[DONE] Phase 7: Forro Connect waitlist (/connect)
       |
[DONE] Phase 7b: Product overview (/overview) + product-family roadmap
       |
[DONE] Phase 7c: Turnstile production guard (dummy keys local/dev only)
       |
[DONE] Phase 8: Persistent API Platform (D1 + Vercel env + Turnstile + invite codes)
       |
[NEXT] Phase 9: Deeper developer onboarding & playground polish
       |
[NEXT] Phase 10: Stronger Research API contract surfacing (parity with Worker OpenAPI)
       |
[LATER] Dedicated developer host (e.g. developers.forrovivo.com) if product needs a split
[LATER] Additional product surfaces that stay proprietary (not open datasets)

Isolation rule: one variety ⇒ one folder / path. Similar spelling is not a merge reason.
Lexical JSON is never stored in this repository.
```

---

## API architecture (as shipped)

> Source of truth for how developers, this site, and Research relate.  
> Do **not** treat a single Cloudflare Worker as both the developer portal and the linguistic API.

### Pillar split

| Role | Host / surface | Who owns it |
|------|----------------|-------------|
| **Developer portal** | `forrovivo.com/api` (accounts, playground) · `forrovivo.com/docs` | Open Knowledge (this repo, Vercel / Next.js) |
| **Linguistic API** | `https://api.forrovivo.com` | Research (Cloudflare Worker) |
| **Attested evidence** | Research GitHub datasets | Research (isolated folders) |

There is **no** `developers.forrovivo.com` in production today. Public **GET is keyless** — curl may call `api.forrovivo.com` with no account.

### Request flow

```
Developers
  create account / login / get key / read docs
  curl GET (no account required)
        │
        ├─ forrovivo.com              Open Knowledge (Next.js / Vercel)
        │    /api                     playground + API Platform UI
        │    /api/login · /api/register
        │    /docs · /docs/api-reference
        │    GET  /api/v1/*           playground proxy (GET only)
        │    POST /api/keys           session required
        │              │
        │              └─ POST /v1/keys + X-ForroVivo-Keys-Issue
        │                   (KEYS_ISSUE_SECRET shared with Worker)
        │
        └─ api.forrovivo.com          Research (Cloudflare Worker)
             GET /v1/{family}/{variety}/...
             optional Authorization: Bearer <key>
                      │
                      └─ published isolated lexicons
                         (Research GitHub datasets)
```

### What this site does vs what Research does

| Concern | Open Knowledge (this repo) | Research Worker (`api.forrovivo.com`) |
|---------|----------------------------|--------------------------------------|
| Account create / login | Yes (scrypt + HMAC session cookie) | No |
| Session store | Signed httpOnly cookie; account rows in local JSON (`API accounts/`) | No D1 for portal sessions yet |
| Playground | Same-origin GET proxy `/api/v1/*` | Origin of truth for JSON |
| Key mint | `POST /api/keys` after login | `POST /v1/keys` with shared issue secret |
| Lookup / search / entries | Proxies GET only | Serves contract |
| Rate limit / CORS / OpenAPI | Documented; Worker enforces on API host | Yes |
| Lexical JSON on disk here | Never | Datasets live in Research repo |

### Isolation contract (API paths)

| Shape | Meaning |
|-------|---------|
| `/v1/{family}` | Country **index** only — not a merged dictionary |
| `/v1/{family}/{variety}` | One isolated lexicon |
| `/v1/{family}/{variety}/lookup?headword=` | Exact match **in that dataset only** |

Search never crosses datasets. Angola Contruy is `/v1/angola/contruy` — not Angolar of São Tomé, and not `/v1/angola` as a dictionary.

Machine-readable contract: `https://api.forrovivo.com/v1/openapi.yaml`. Human docs: `/docs/api-reference`.

### Target vs shipped (do not confuse)

Aspirational sketches that put **D1 users/sessions** and a host named **`developers.forrovivo.com`** under one Worker describe a **later** split. Shipped today:

- Portal = this site  
- API = Worker  
- Evidence = GitHub  

Persistent accounts on Vercel (D1, Postgres, or equivalent) are **Phase 8** — required before create-account works on production hosting.

### Production Turnstile

- Real keys: `NEXT_PUBLIC_TURNSTILE_SITE_KEY` + `TURNSTILE_SECRET_KEY` on Vercel.  
- Cloudflare dummy keys are **local/dev only**. Production must never fall back to the testing widget.

---

## PHASE 1: Site shell & isolation catalog (COMPLETED)

> **Goal:** Branded public surface that never mixes creole lexicons.

- [x] Next.js App Router site at forrovivo.com
- [x] English / Portuguese chrome (`fv_locale` cookie + footer switcher)
- [x] Country / variety catalog in `src/lib/constants.ts` with isolation helpers
- [x] Navbar / Footer / shared UI primitives

---

## PHASE 2: Knowledge surfaces (COMPLETED)

> **Goal:** Look up attested headwords and navigate geography without inventing glosses.

- [x] Dictionary lookup cards (glosses, IPA, examples, recordings, source when present)
- [x] Africa map + research atlas views
- [x] Angola country hub vs Contruy / Umbundu / Kimbundu / Kikongo isolation
- [x] Fetch from Linguistic Research API origin (`src/lib/catalog.ts`)

---

## PHASE 3: API playground (COMPLETED)

> **Goal:** Let developers explore the same contract the edge API serves.

- [x] Same-origin `/api/v1` explorer
- [x] Curl examples targeting `https://api.forrovivo.com`
- [x] Public GET remains usable without a key

---

## PHASE 4: Docs hub (COMPLETED)

> **Goal:** One documentation entry for Open Knowledge, Learning app, Connect, and API reference.

- [x] `/docs` product hub
- [x] `/docs/open-knowledge`, `/docs/app`, `/docs/connect`
- [x] `/docs/api-reference` full contract surface

---

## PHASE 5: API Platform (COMPLETED — local store)

> **Goal:** Optional developer accounts and key issue without requiring a key for public GET.

- [x] Register / login (email + password; Turnstile on register / waitlist where wired)
- [x] Signed httpOnly session cookie (`API_SESSION_SECRET` required in production)
- [x] Optional key issue via `POST /api/keys` → Research `POST /v1/keys`
- [x] Local JSON account store + scrypt hashes (see `TECH_REPORT_v2.0.md`)
- [ ] **Incomplete on Vercel:** durable account store (see Phase 8)

---

## PHASE 6: Legal & company (COMPLETED)

> **Goal:** Live policy surface operated by LIVLU TECHNOLOGIES LTD.

- [x] `/legal/company`, `/legal/terms`, `/legal/privacy`, `/legal/eula`
- [x] Permanent redirects for legacy legal paths where configured
- [x] Careers board exists (not required in Company menu)
- [x] Footer legal links

---

## PHASE 7: Forro Connect (COMPLETED)

> **Goal:** Waitlist for learners ↔ native speakers without hosting the Learning app.

- [x] `/connect` waitlist product page
- [x] Beehiiv on Vercel (local JSON off Vercel) per TECH_REPORT

---

## PHASE 7b–7c: Overview & Turnstile (COMPLETED)

- [x] `/overview` product family collage + product cards
- [x] Product roadmap section (`#roadmap`) on overview
- [x] Turnstile flexible widget; label only on API login / register
- [x] Production never uses Cloudflare dummy Turnstile keys

---

## PHASE 8: Persistent API Platform (IN PROGRESS — blocks production accounts)

> **Goal:** Create-account and key lifecycle work on Vercel without a local filesystem.  
> Build **one step at a time**.

### Step 1 — Store interface (DONE)

- [x] `ApiAccountStore` contract (`findByEmail` / `create` / `setKeyPrefix`)
- [x] JSON adapter for local hosts (`api-account-store-json.ts`)
- [x] Explicit unavailable store on Vercel without `DATABASE_URL`
- [x] `api-accounts.ts` keeps scrypt + registration codes; routes unchanged

### Step 2 — Durable adapter — Cloudflare D1 (DONE)

- [x] Choose backend: **Cloudflare D1** (same stack as Research)
- [x] D1 adapter via Cloudflare query API (`api-account-store-d1.ts`)
- [x] Schema: `scripts/d1-api-accounts.sql` (`api_accounts` table)
- [x] Env: `CLOUDFLARE_ACCOUNT_ID`, `CLOUDFLARE_API_TOKEN`, `CLOUDFLARE_D1_DATABASE_ID`
- [x] Keep scrypt password hashes and signed session cookie behaviour
- [x] Local JSON remains the fallback when D1 env is unset (non-Vercel)

Apply schema (once per database):

```bash
npx wrangler d1 execute <your-d1-name> --remote --file=./scripts/d1-api-accounts.sql
```

### Step 3 — Production env (DONE)

- [x] Create D1 database `open-knowledge-accounts` (WEUR)
- [x] Apply schema (`api_accounts` + index)
- [x] Set Cloudflare account / D1 id / auth on Vercel (Production / Preview / Development)
- [x] Local `.env.local` wired for D1
- [x] D1 adapter accepts Bearer API tokens **or** Global API Key + `CLOUDFLARE_EMAIL`
- [x] Verified D1 `INSERT` / `SELECT` / `DELETE` with write-capable credentials
- [x] Redeploy production
- [ ] Prefer replacing Global API Key with a scoped **Account → D1 → Edit** API token when practical
- [x] Confirm Turnstile production keys (widget created for forrovivo.com)
- [x] Set `API_REGISTRATION_CODES` on Vercel while registration is gated
- [ ] Smoke-test register → login → key issue on production UI (needs human Turnstile)

Database id is in env (not committed). Schema: `scripts/d1-api-accounts.sql`.

---

## PHASE 9–10: Developer polish (NEXT)

- [ ] Richer playground examples and error storytelling (`TERM_NOT_FOUND` honesty)
- [ ] Keep docs / OpenAPI narrative aligned with Research Worker package releases
- [ ] Product polish that does not pull lexicon files into this repo

---

## LATER (optional product split)

- [ ] Dedicated developer host only if product requires it — not a prerequisite for the current API
- [ ] Do not merge portal auth into the Linguistic Research Worker without an explicit architecture decision

---

## Tech Stack Cheat-Sheet

| What | Tool | Why |
|---|---|---|
| **Runtime** | Next.js App Router + React + TypeScript | Public site + route handlers |
| **UI** | Tailwind CSS + site sections | Knowledge / docs / API surfaces |
| **Locale** | `fv_locale` + `i18n` / `i18n-copy` | EN / PT site chrome |
| **Maps** | d3-geo + country overlays; cobe globe | Atlas without merging lexicons |
| **Accounts (now)** | JSON local · D1 when Cloudflare env set | Optional API Platform |
| **Accounts (next)** | Wire D1 env on Vercel (Phase 8 Step 3) | Production create-account |
| **Data origin** | Research API (`api.forrovivo.com`) | Attested lexicons stay in Research |
| **Hosting** | Vercel | Production forrovivo.com |
| **Docs** | `TECH_REPORT.md` · `TECH_REPORT_v2.0.md` · this file | Spec vs shipped site |

---

*This document is the active source of truth for step-by-step development of Open Knowledge.*
