# Open Knowledge v2.0 Technical Report

> Authored: 2026-08-21
> Version: v2.0 (Feature Complete)
> Based on: v1.0 → v2.0 Incremental Iteration
> Project Path: `<project-root>/Open knowledge/`

---

## I. v2.0 Overview

Building upon the public knowledge site in v1.0 (catalog, dictionary lookup, `/api` playground, isolation, waitlist), v2.0 focuses on **developer accounts**, **product documentation**, **locale**, and **legal surface**. It does not change the isolation invariant or move lexical data into this repository.

| Direction | Main Changes |
|-----------|--------------|
| API Platform | Email/password accounts, signed session cookie, optional key issue via `POST /v1/keys`, Turnstile on register. |
| Documentation hub | `/docs` lists Open Knowledge, Forro Vivo App, and Forro Connect. Full API reference lives under `/docs/api-reference`. |
| Locale | English and Portuguese site copy. Cookie `fv_locale`. Footer switcher. |
| Legal & company | Policy pages (company, terms, privacy, EULA). Careers board exists; Careers is not in the Company menu. |
| Isolation catalog | Angola is a country hub. Lookup uses Umbundu, Kimbundu, and Kikongo. Contruy stays an API folder, not a merged dictionary. |
| Interaction polish | Map hydration after mount, raised type scale and muted contrast, waitlist CTA sizing, Connect / methodology layout. |

Production remains `https://forrovivo.com` (`www` redirects there). Curl still uses `https://api.forrovivo.com`.

---

## II. Technology Stack

Same as v1.0, with the following additions:

| Layer | Technology Choice |
|-------|-------------------|
| Runtime | Node.js (Next.js server) |
| Framework | Next.js 16 App Router |
| UI | React 19, Tailwind CSS 4 |
| Language | TypeScript (`strict`) |
| Maps | `d3-geo` + country SVG overlays |
| Globe | `cobe` |
| Locale | Cookie `fv_locale`; `src/lib/i18n.ts` + `src/lib/i18n-copy.ts` |
| Accounts | Local JSON store, scrypt password hashes |
| Sessions | HMAC-signed httpOnly cookie `fv_api_session` |
| Human check | Cloudflare Turnstile on API Platform registration |
| Waitlist | Beehiiv on Vercel; local JSON off Vercel |
| Hosting | Vercel |

Public linguistic GET stays keyless. This site POSTs to the Linguistic Research API only to issue or replace a key.

---

## III. Directory Structure (v2.0 Changes)

```
Open knowledge/
├── TECH_REPORT.md                    # v1.0 baseline inventory
├── TECH_REPORT_v2.0.md               # This document
├── next.config.ts                    # v2.0 Changed: extra permanent redirects
└── src/
    ├── app/
    │   ├── layout.tsx                # v2.0 Changed: LocaleProvider, html lang
    │   ├── template.tsx
    │   ├── sitemap.ts                # v2.0 Changed: docs, legal, careers paths
    │   ├── robots.ts                 # v2.0 Changed: disallow /api/auth, /api/keys
    │   ├── docs/
    │   │   ├── page.tsx              # v2.0 Changed: product hub
    │   │   ├── layout.tsx            # v2.0 Changed: DocsShell
    │   │   ├── open-knowledge/       # v2.0 Added
    │   │   ├── app/                  # v2.0 Added
    │   │   ├── connect/              # v2.0 Added
    │   │   └── api-reference/        # v2.0 Changed: full contract
    │   ├── api/
    │   │   ├── page.tsx              # v2.0 Changed: ApiPlatformShell
    │   │   ├── login/ page.tsx
    │   │   ├── register/ page.tsx
    │   │   ├── auth/register/        # v2.0 Added
    │   │   ├── auth/session/         # v2.0 Added
    │   │   └── keys/                 # v2.0 Added
    │   ├── legal/                    # v2.0 Added: layout + policies
    │   └── careers/                  # v2.0 Added
    ├── components/
    │   ├── locale/LocaleProvider.tsx # v2.0 Added
    │   ├── layout/Footer.tsx         # v2.0 Changed: locale switcher, legal links
    │   └── sections/
    │       ├── ApiPlatformShell.tsx  # v2.0 Added
    │       ├── ApiDashboard.tsx      # v2.0 Added
    │       ├── ApiAuthForm.tsx       # v2.0 Changed: Turnstile on register
    │       ├── TurnstileWidget.tsx   # v2.0 Added
    │       ├── DocsShell.tsx         # v2.0 Added
    │       └── AfricaMap.tsx         # v2.0 Changed: paint paths after mount
    └── lib/
        ├── i18n.ts                   # v2.0 Added
        ├── i18n-copy.ts              # v2.0 Added
        ├── api-accounts.ts           # v2.0 Added
        ├── api-session.ts            # v2.0 Added
        ├── turnstile.ts              # v2.0 Added
        ├── catalog.ts                # v2.0 Changed: isCountryDataset (Contruy)
        └── constants.ts              # v2.0 Changed: Angola varieties, docs navs
```

Gitignored stores: `Join waitlist/*.json`, `API accounts/*.json`.

---

## IV. Detailed v2.0 Core Changes

### 4.1 API Platform accounts and optional keys

**Background**: In v1.0, `/api/login` and `/api/register` were waitlist doors. The playground could call `/v1` without an identity. Developers had no way to issue a key from this site.

**Solution**:

```
Browser
  ├─ POST /api/auth/register  → scrypt hash → API accounts/accounts.json → session cookie
  ├─ POST /api/auth/session   → authenticate → session cookie
  ├─ GET  /api/auth/session   → { authenticated, email, key_prefix }
  ├─ DELETE /api/auth/session → clear cookie
  └─ POST /api/keys           → session required → POST {API}/v1/keys
```

**Flow** (create account):

```
/api/register
    ↓
Turnstile token
    ↓
POST /api/auth/register
  ├─ validate email / password / optional registration code
  ├─ createAccount() — refused on Vercel (no persistent filesystem)
  └─ writeApiSession() — httpOnly cookie fv_api_session
    ↓
/api → ApiPlatformShell sees session → ApiDashboard
```

**Flow** (issue key):

```
ApiDashboard → POST /api/keys
    ↓
readApiSession()
    ↓
fetchResearchApi POST /v1/keys { email }
    ↓
Return key once. Store prefix on session (and on the account file when writable).
```

**Key details**:
- Public GET to the linguistic API remains usable without a key.
- Registration uses Turnstile. Waitlist forms do not.
- `API_SESSION_SECRET` should be set in production. Locally the signer falls back to other server secrets.

---

### 4.2 Product documentation hub

**Background**: v1.0 `/docs` was an Open Knowledge introduction. App and Connect had product pages but no docs sidebar of their own. API paths were listed on `/api` and a short reference page.

**Solution**: `/docs` is a three-product hub. `DocsShell` picks a nav from the path:

| Path prefix | Nav |
|-------------|-----|
| `/docs/app` | `appDocsNav` |
| `/docs/connect` | `connectDocsNav` |
| other `/docs/*` | `openKnowledgeDocsNav` |

`/docs/api-reference` is the full Linguistic Research contract (base URL, auth, headers, errors, lookup, search, catalog, entries, knowledge, audio, routes, OpenAPI). `/api` is the playground and account surface, not the reference.

`next.config.ts` permanently redirects `/docs/api` → `/docs/api-reference` and `/developers` → `/docs`.

---

### 4.3 English / Portuguese locale

**Background**: v1.0 copy lived only in `constants.ts`. `html lang` was always `en`.

**Solution**:

```
Cookie fv_locale = en | pt   (default en)
    ↓
Root layout: localeFromCookie → getSiteCopy(locale) → <html lang>
    ↓
LocaleProvider hydrates the same locale
    ↓
Footer buttons call setLocale() → cookie + router.refresh()
```

Chrome strings (nav, footer) live in `src/lib/i18n.ts`. Page copy lives in `src/lib/i18n-copy.ts`. Catalog IDs, GitHub paths, and isolation dataset keys stay in `constants.ts` (not translated as data).

---

### 4.4 Angola as a country hub

**Background**: v1.0 treated Angola Contruy as the Angola language row and looked up `/v1/angola` or a single country dataset. That collides with Angolar of São Tomé and with the published folder `angola/contruy`.

**Solution**:

| Surface | Behaviour |
|---------|-----------|
| Country hub | `/languages/angola` lists Umbundu, Kimbundu, Kikongo |
| Lookup picker | Country indexes and Contruy are excluded (`isCountryDataset`) |
| API path | Contruy lookup is `/v1/angola/contruy/lookup`, never `/v1/angola/lookup` |
| Map | Angola SVG regions map to the three variety datasets |

---

### 4.5 Africa map hydration

**Issue**: `d3-geo` path strings differ slightly between Node SSR and the browser, so SVG `d` attributes failed hydration.

**Fix**: Paint continent paths only after mount.

```ts
const [mapReady, setMapReady] = useState(false);

useEffect(() => {
  setMapReady(true);
}, []);
```

Dictionary search still loads the map with `next/dynamic` and `ssr: false`. Home and language profiles import `AfricaMap` as a client component and rely on `mapReady`.

---

### 4.6 Legal policies and careers

**Background**: v1.0 `/legal` was a single page. There was no careers board.

**Solution**: `/legal` is a hub. `src/app/legal/layout.tsx` renders a sidebar from `legalNav`:

| Path | Role |
|------|------|
| `/legal` | Overview |
| `/legal/company` | LIVLU TECHNOLOGIES LTD and the product family |
| `/legal/terms` | Terms of service |
| `/legal/privacy` | Waitlists, accounts, product data |
| `/legal/eula` | Licence for the site and research materials |

`/careers` and `/careers/[id]` describe roles. They are in `sitemap.ts`. Careers is **not** in the Company mega-menu (About, GitHub, Legal only).

---

### 4.7 User-experience boundary fixes

| Issue | v1.0 Status | v2.0 Fix |
|-------|-------------|----------|
| API login was waitlist | Email capture only | Real accounts + session (local filesystem) |
| Docs mixed products | One Open Knowledge intro | Hub + product-specific sidebars |
| UI English only | `constants.ts` | `en` / `pt` copy + footer switcher |
| Angola vs Angolar | Contruy as the Angola language | Country hub + three lexicons |
| Map hydration mismatch | SSR path `d` vs browser | Render paths after mount |
| Type contrast | Smaller muted grey | Raised type scale, muted `#9a9a9a` |
| Waitlist buttons | Full-width stretch | Size to label |

---

## V. Data Layer Changes

### 5.1 What this repo stores

Lexical JSON still does not live here. v2.0 adds identity data on persistent hosts:

| Store | Path | Notes |
|-------|------|-------|
| Waitlist | `Join waitlist/waitlist.json` | Gitignored. Skipped on Vercel. |
| API Platform accounts | `API accounts/accounts.json` | Gitignored. Create refused on Vercel. |
| Session | Cookie `fv_api_session` | Signed payload: email, created_at, key_prefix. |
| Locale | Cookie `fv_locale` | `en` or `pt`. |

### 5.2 Catalog helpers (v1.0 → v2.0)

| Helper | Change |
|--------|--------|
| `LanguageRecord` | Optional `type` / `kind` from the live API |
| `isCountryDataset` | Indexes, slash-less keys, `contruy` / `country` slugs, Contruy names |
| `countryEntryTotal` | Excludes country-index rows so Angola totals do not double-count |
| `SAMPLE_DATASETS` | Angola sample is `angola/umbundu` |

Live counts still come from `GET /v1/languages` via `fetchResearchApi` (custom domain, then Workers fallback).

---

## VI. Build & Deployment

Same as v1.0, with extra env for accounts and Turnstile.

### 6.1 Development environment

| Item | Value |
|------|-------|
| Runtime | Node.js + npm |
| Framework | Next.js on Vercel |
| Production | `https://forrovivo.com` |
| Linguistic API | `https://api.forrovivo.com` |
| Git remote | `HenriquesPontes/OpenKnowledge`, branch `main` |

### 6.2 Standard build flow

```bash
cd /path/to/Open\ knowledge

npm install
npm run dev
npm run build
npm start
npm run lint
```

### 6.3 Environment (new in v2.0)

| Variable | Scope | Purpose |
|----------|-------|---------|
| `API_SESSION_SECRET` | Server | Signs API Platform sessions |
| `API_REGISTRATION_CODES` | Server | Optional comma-separated codes for register |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | Public | Turnstile widget |
| `TURNSTILE_SECRET_KEY` | Server | Turnstile siteverify |

Waitlist still uses `BEEHIIV_API_KEY` and `BEEHIIV_PUBLICATION_ID` on Vercel. Locally, waitlist writes JSON; Turnstile uses Cloudflare dummy keys outside production unless keys are set.

---

## VII. Complete Differences from v1.0

### 7.1 New files

| File | Notes |
|------|-------|
| `src/lib/i18n.ts` | Locale cookie, chrome dictionary |
| `src/lib/i18n-copy.ts` | English and Portuguese page copy |
| `src/lib/api-accounts.ts` | Account create / authenticate / scrypt |
| `src/lib/api-session.ts` | Signed session cookie |
| `src/lib/turnstile.ts` | Siteverify helper |
| `src/components/locale/LocaleProvider.tsx` | Client locale context |
| `src/components/sections/ApiPlatformShell.tsx` | Session gate on `/api` |
| `src/components/sections/ApiDashboard.tsx` | Issue key, sign out |
| `src/components/sections/TurnstileWidget.tsx` | Register challenge |
| `src/components/sections/DocsShell.tsx` | Product-specific docs sidebar |
| `src/app/api/auth/register/route.ts` | Create account |
| `src/app/api/auth/session/route.ts` | Login / logout / session |
| `src/app/api/keys/route.ts` | Proxy `POST /v1/keys` |
| `src/app/docs/open-knowledge/page.tsx` | Open Knowledge docs overview |
| `src/app/docs/app/page.tsx` | App docs |
| `src/app/docs/connect/page.tsx` | Connect docs |
| `src/app/legal/**` | Policy hub and pages |
| `src/app/careers/**` | Role board |
| `TECH_REPORT_v2.0.md` | This document |

### 7.2 Modified files summary

| File | Change Summary |
|------|----------------|
| `src/app/layout.tsx` | LocaleProvider, `html lang`, skip-link copy |
| `src/app/docs/page.tsx` | Three-product hub |
| `src/app/docs/layout.tsx` | DocsShell |
| `src/app/docs/api-reference/page.tsx` | Full API contract |
| `src/app/api/page.tsx` | ApiPlatformShell + explorer |
| `src/components/sections/ApiAuthForm.tsx` | Real login/register + Turnstile |
| `src/components/layout/Navbar.tsx` | Localized labels; Company without Careers |
| `src/components/layout/Footer.tsx` | Locale switcher; Terms / Privacy / EULA |
| `src/components/sections/AfricaMap.tsx` | `mapReady` hydration fix; Angola regions |
| `src/lib/catalog.ts` | `isCountryDataset`, Contruy excluded from lookup totals |
| `src/lib/constants.ts` | Angola varieties, docs navs, legal nav, careers copy |
| `src/app/sitemap.ts` | Docs, legal, careers URLs |
| `src/app/robots.ts` | Disallow auth and keys |
| `src/app/globals.css` | Type scale, muted contrast, `forro-theme` |
| `next.config.ts` | Redirects for docs/api, dictionaries/login |
| `TECH_REPORT.md` | v1.0 inventory kept as baseline |

---

## VIII. v2.0 Boundary Notes (same release)

Issues found while shipping v2.0 on 21 August 2026, fixed in the same window rather than a numbered patch:

### 8.1 Careers in the Company menu

**Issue**: Careers sat next to About in the mega-menu before the board was ready as a hiring surface.

**Fix**: Company column is About, GitHub, Legal. `/careers` remains routable and in the sitemap.

**Affected file**: `src/lib/constants.ts` (`nav.menu`), `src/components/layout/Navbar.tsx`

### 8.2 Account create on Vercel

**Issue**: `createAccount` writes `API accounts/accounts.json`. Vercel has no durable filesystem.

**Fix**: Throw `FILESYSTEM_UNAVAILABLE` and return 503 with a message that a persistent host is required. Session-based key issue still needs that store for new sign-ups.

**Affected file**: `src/lib/api-accounts.ts`

This remains an open limitation (see section IX).

---

## IX. Known Issues & Limitations (Inherited and new)

| Issue | Impact | Suggested Solution |
|-------|--------|--------------------|
| API Platform accounts are a local JSON file | Create-account fails on Vercel | Persistent store (D1, Postgres, or similar) |
| Session signer can fall back to other secrets locally | Weaker isolation of session key | Require `API_SESSION_SECRET` in production |
| Waitlist has no in-app CAPTCHA or rate limit | Abuse risk | Turnstile or edge rate limit on `/api/waitlist` |
| Careers not in navigation | Roles only via URL / sitemap | Add to Company menu when hiring is public |
| `ProductShowcase` unused | Dead UI | Wire it or leave until product needs it |
| Lexical source of truth is the research repo/API | Site copy can drift | Keep docs tied to `/v1` contract, not duplicated numbers |
| No automated test suite in this repository | Regressions caught in production | Add route tests for auth, lookup proxy, `isCountryDataset` |

---

## X. Key Code Explanations (New in v2.0)

### 10.1 Country indexes are not lexicons

```ts
export function isCountryDataset(
  dataset: string,
  meta?: { type?: string; kind?: string; language?: string; language_name?: string },
) {
  if (meta?.type === "country" || meta?.kind === "index" || meta?.kind === "country") {
    return true;
  }
  if (!dataset.includes("/")) return true;
  const slug = dataset.split("/")[1]?.toLowerCase();
  if (slug === "country" || slug === "contruy") return true;
  const name = `${meta?.language ?? ""} ${meta?.language_name ?? ""}`.toLowerCase();
  return name.includes("contruy");
}
```

Lookup pickers and `countryEntryTotal` skip these rows so `/v1/angola` is never treated as Umbundu or Angolar.

### 10.2 Signed API Platform session

```ts
export const API_SESSION_COOKIE = "fv_api_session";

function sign(payload: string) {
  return createHmac("sha256", sessionSecret()).update(payload).digest("base64url");
}

function encodeSession(session: ApiSession) {
  const payload = Buffer.from(JSON.stringify(session), "utf8").toString("base64url");
  return `${payload}.${sign(payload)}`;
}
```

Verify with `timingSafeEqual`. Cookie is httpOnly, `SameSite=lax`, `secure` in production.

### 10.3 Optional key issue

```ts
const session = await readApiSession();
if (!session) {
  return NextResponse.json({ error: UNAUTHORIZED }, { status: 401 });
}

const response = await fetchResearchApi("/v1/keys", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ email: session.email }),
  cache: "no-store",
});
```

The playground proxy (`GET /api/v1/*`) stays GET-only. Keys use this dedicated route.

### 10.4 Map paths after mount

```ts
const [mapReady, setMapReady] = useState(false);

useEffect(() => {
  setMapReady(true);
}, []);
```

Avoids SSR vs browser `d3-geo` path mismatches on the continent view.

---

## XI. Future Development Suggestions

1. **[High] Persistent API Platform accounts**: Replace the JSON file so register and login work on Vercel.
2. **[High] Production session secret**: Fail closed if `API_SESSION_SECRET` is missing in production.
3. **[Medium] Waitlist abuse controls**: Turnstile or edge rate limiting on `POST /api/waitlist`.
4. **[Medium] Route tests**: Auth, lookup proxy allowlist, `isCountryDataset`, locale cookie.
5. **[Low] Careers in Company nav**: When the board is an active hiring surface.
6. **[Low] Canonical origin**: `metadataBase` still defaults to `www`; production is the apex.

---

*This report covers the v2.0 deliverable state (21 August 2026). For the v1.0 baseline (isolation model, playground proxy, waitlist, dictionary cards, production hosts), see `TECH_REPORT.md`.*
