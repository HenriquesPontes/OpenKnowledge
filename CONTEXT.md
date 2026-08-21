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
[NEXT] Phase 8: Deeper developer onboarding & playground polish
       |
[NEXT] Phase 9: Stronger Research API contract surfacing (parity with Worker OpenAPI)
       |
[LATER] Additional product surfaces that stay proprietary (not open datasets)

Isolation rule: one variety ⇒ one folder / path. Similar spelling is not a merge reason.
Lexical JSON is never stored in this repository.
```

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

## PHASE 5: API Platform (COMPLETED)

> **Goal:** Optional developer accounts and key issue without requiring a key for public GET.

- [x] Register / login (email + password; Turnstile on register)
- [x] Signed httpOnly session cookie
- [x] Optional `POST /v1/keys` path via platform UI
- [x] Local JSON account store + scrypt hashes (see `TECH_REPORT_v2.0.md`)

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

## PHASE 8–9: Next work (IN PROGRESS)

- [ ] Richer playground examples and error storytelling (`TERM_NOT_FOUND` honesty)
- [ ] Keep docs / OpenAPI narrative aligned with Research Worker package releases
- [ ] Product polish that does not pull lexicon files into this repo

---

## Tech Stack Cheat-Sheet

| What | Tool | Why |
|---|---|---|
| **Runtime** | Next.js App Router + React + TypeScript | Public site + route handlers |
| **UI** | Tailwind CSS + site sections | Knowledge / docs / API surfaces |
| **Locale** | `fv_locale` + `i18n` / `i18n-copy` | EN / PT site chrome |
| **Maps** | d3-geo + country overlays; cobe globe | Atlas without merging lexicons |
| **Accounts** | Local JSON + HMAC session + Turnstile | Optional API Platform |
| **Data origin** | Research API (`api.forrovivo.com`) | Attested lexicons stay in Research |
| **Hosting** | Vercel | Production forrovivo.com |
| **Docs** | `TECH_REPORT.md` · `TECH_REPORT_v2.0.md` · this file | Spec vs shipped site |

---

*This document is the active source of truth for step-by-step development of Open Knowledge.*
