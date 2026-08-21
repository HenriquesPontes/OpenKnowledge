# Open Knowledge — Technical Report

**Product:** Open Knowledge  
**Platform:** ForroVivo  
**Operator:** LIVLU TECHNOLOGIES LTD (registered in England and Wales)  
**Company website:** livlutechnologies.com (not ready yet)  
**Repository:** [HenriquesPontes/OpenKnowledge](https://github.com/HenriquesPontes/OpenKnowledge)  
**Package name:** `open-knowledge`  
**Report date:** 21 August 2026

This document is the technical report for the Open Knowledge website as implemented in this repository: this Next.js site at `https://forrovivo.com` (`www.forrovivo.com` redirects there). It records routing, stack, waitlist, Beehiiv, dictionary lookup, the `/v1` playground and proxies, API Platform accounts, English/Portuguese locale switching, legal policy pages, and the product documentation hub.

It is the public front door to ForroVivo’s Linguistic Knowledge Base: attested Creole lexicons, sources, documentation, and a public API. Lexical data is not stored here. This app catalogs, explains, and routes to isolated datasets hosted elsewhere.

---

## 1. Purpose

Open Knowledge documents Creole languages of São Tomé and Príncipe, Cabo Verde, Guiné-Bissau, and Angola. The site exists to:

- Explain the evidence-first methodology (no AI-generated linguistic claims as evidence).
- Present isolated lexicons by country and variety, without merging them.
- Proxy headword lookup into the public Linguistic Research API.
- Host a same-origin API playground on `/api` for developers.
- Offer API Platform accounts (email and password) so developers can issue optional keys.
- Document GET-only linguistic API usage, plus optional key issue, for researchers and developers.
- Collect waitlist interest for the learning app and Forro Connect.
- Publish legal policies and a careers board.
- Serve the UI in English and Portuguese.
- Situate Open Knowledge inside the ForroVivo product family (learning app and Forro Connect).

Governing principle, as published on the site:

> The ForroVivo Knowledge Base does not treat AI-generated information as linguistic evidence. Every documented linguistic claim should be traceable to a source.

---

## 2. Product context

ForroVivo is the platform. Open Knowledge is one product in that platform.

Domain architecture is `forrovivo.com`. Production is served at `https://forrovivo.com`. `https://www.forrovivo.com` redirects there.

| Product | Role | Host |
| --- | --- | --- |
| Open Knowledge | Public linguistic knowledge site, documentation, dictionary lookup UI, API playground, API Platform accounts | This Next.js site at `https://forrovivo.com` |
| Linguistic Research API | Read-only JSON API over published datasets; optional key issue | `https://api.forrovivo.com` |
| Linguistic Research repository | Isolated JSON datasets, methodology, bibliography | [Forrovivo/LINGUISTIC-RESEARCH-Forro-Vivo-](https://github.com/Forrovivo/LINGUISTIC-RESEARCH-Forro-Vivo-) |
| Forro Vivo App | Learning product: dictionary, lessons, exercises | App Store. Product page at `/app` |
| Forro Connect | Connects learners with native speakers. How it works: learner, native speaker, direct match, live lesson. Public CTA is the waitlist. | `/connect` on this Next.js site |

Named on the site: Henriques Pontes (Founder & Project Lead) and Luís Lima (Early Collaborator). Linguistic Research is dated from 23 March 2023.

Licensing, as stated on Legal and Research: third-party dictionaries and papers keep their original licences; project-original material is CC BY 4.0 unless a source page says otherwise.

---

## 3. Isolation model

Isolation is the primary data invariant. Similar spelling is not a reason to copy, merge, or infer across folders.

### 3.1 Country indexes

| ID | Country | Dataset prefix | ISO 3166-1 alpha-2 | Varieties |
| --- | --- | --- | --- | --- |
| `saotome` | São Tomé and Príncipe | `saotome` | ST | Forro, Angolar, Lung’Ie |
| `caboverde` | Cabo Verde | `caboverde` | CV | Nine inhabited-island Kabuverdianu varieties |
| `guinebissau` | Guiné-Bissau | `guinebissau` | GW | Nine regional Kriol varieties |
| `angola` | Angola | `angola` | AO | Umbundu, Kimbundu, Kikongo (site catalog). The API also publishes Contruy. |

Country routes under `/v1/saotome`, `/v1/caboverde`, `/v1/guinebissau`, and `/v1/angola` are indexes, not merged dictionaries. `/v1/angola` is the Angola country index, not Angolar / Ngola of São Tomé. Look up Angola Contruy at `/v1/angola/contruy`, not at `/v1/angola`.

The site treats country indexes (and Contruy) as non-lexicon rows in lookup pickers and entry totals (`isCountryDataset` in `src/lib/catalog.ts`). Dictionary search maps a country tap to the first published variety under that prefix.

### 3.2 Isolated lexicons

Each row is its own folder. Official Portuguese of these countries is not treated as a creole lexicon.

**São Tomé and Príncipe**

| ID | Title | ISO 639-3 | Dataset |
| --- | --- | --- | --- |
| `forro` | Forro (Santome / Santomense) | cri | `saotome/forro` |
| `angolar` | Angolar (Ngola) | aoa | `saotome/angolar` |
| `lungie` | Lung’Ie (Principense) | pre | `saotome/lungie` |

**Cabo Verde (Kabuverdianu, ISO 639-3 `kea`)**

Sotavento: Santiago, Fogo, Maio, Brava.  
Barlavento: São Vicente, Santo Antão, São Nicolau, Sal, Boa Vista.

**Guiné-Bissau (Kriol, ISO 639-3 `pov`)**

Bissau, Biombo, Cacheu, Oio, Bafatá, Gabú, Quinara, Tombali, Bolama.

**Angola**

| ID | Title | ISO 639-3 | Dataset |
| --- | --- | --- | --- |
| `umbundu` | Umbundu | umb | `angola/umbundu` |
| `kimbundu` | Kimbundu | kmb | `angola/kimbundu` |
| `kikongo` | Kikongo | kng | `angola/kikongo` |

The Linguistic Research API also publishes `angola/contruy` (Angola Contruy). That path is not Angolar of São Tomé and is not a merged Angola dictionary.

The Angola country index has no ISO 639-3. It must not be confused with Angolar.

Static catalog, isolation copy, GitHub folder URLs, and geographic anchors live in `src/lib/constants.ts`. Translated UI strings live in `src/lib/i18n-copy.ts`. Live entry counts and knowledge-field tallies come from `GET https://api.forrovivo.com/v1/languages`.

---

## 4. System architecture

```
Browser
  │
  ├─ Next.js App Router (this repo)
  │    ├─ Static/SSR pages (docs hub, about, legal, connect, careers)
  │    ├─ Server pages that fetch the languages catalog
  │    ├─ Locale from cookie fv_locale (en | pt)
  │    ├─ Client UI (maps, waitlist, dictionary search, API playground, globe)
  │    ├─ POST /api/waitlist       → local JSON (non-Vercel) and/or Beehiiv
  │    ├─ GET  /api/lookup         → proxy to the Linguistic Research API
  │    ├─ GET  /api/v1/...         → same-origin playground proxy to /v1
  │    ├─ POST /api/auth/register  → API Platform account + session
  │    ├─ GET/POST/DELETE /api/auth/session → signed session cookie
  │    └─ POST /api/keys           → issue optional key via POST /v1/keys
  │
  ├─ Linguistic Research API  (api.forrovivo.com)
  │    └─ published JSON per isolated dataset; optional keys
  │
  └─ GitHub Linguistic Research repo
       └─ source of truth for datasets, methodology, bibliography
```

This application does **not**:

- Store lexical entries.
- Merge languages at search or lookup time.
- Implement machine translation. Machine translation is a ForroVivo platform capability, not a feature of this site.

Public linguistic GET remains usable without a key. This site **does** authenticate API Platform accounts for the dashboard and key issue. It POSTs to the linguistic API only to issue or replace a key (`POST /v1/keys`).

Site login is API Platform only (`/api/login`, `/api/register`). Former `/dictionaries/login` and `/dictionaries/register` paths permanently redirect there.

---

## 5. Technology stack

| Layer | Choice |
| --- | --- |
| Runtime | Node.js (Next.js server) |
| Framework | Next.js 16.1.6, App Router |
| UI | React 19.2.3, React DOM 19.2.3 |
| Language | TypeScript 5, `strict: true`, path alias `@/*` → `./src/*` |
| Styling | Tailwind CSS 4 via `@tailwindcss/postcss` |
| Animation | Motion (`motion` / `motion/react`) |
| Maps | `d3-geo` Mercator projection over GeoJSON; country SVG overlays |
| Globe | `cobe` canvas globe with SVG fallback |
| Locale | Cookie `fv_locale`; English and Portuguese site copy |
| Human check | Cloudflare Turnstile on API Platform registration |
| Class names | `clsx` + `tailwind-merge` (`src/lib/cn.ts`) |
| Lint | ESLint 9 with `eslint-config-next` (core-web-vitals + TypeScript) |
| Hosting | Vercel (`vercel.json` pins framework `nextjs`) |
| Package manager | npm (`package-lock.json`) |

TypeScript target is ES2017. JSX transform is `react-jsx`. JSON imports are enabled for GeoJSON.

---

## 6. Repository layout

```
src/
  app/                    App Router pages and route handlers
  components/
    layout/               Navbar, Footer
    locale/               LocaleProvider
    sections/             Feature sections (hero, maps, docs chrome, research viz, API Platform)
    ui/                   Button, Container
  data/
    africa-countries.json Continent GeoJSON
  lib/
    catalog.ts            API origin, catalog fetch, aggregations
    constants.ts          Navigation, countries, languages, English product copy, API paths
    i18n.ts               Locale cookie, chrome dictionary
    i18n-copy.ts          Full English and Portuguese site copy
    api-accounts.ts       Local API Platform account store
    api-session.ts        Signed session cookie
    turnstile.ts          Turnstile siteverify
    map-path.ts           GeoJSON → SVG path layout; country SVG parser
    rewind-geo.ts         Polygon winding for d3-geo
    cn.ts                 Tailwind class merge
public/
  images/app/forro-icon.png
  images/maps/africa/     Per-country SVG overlays (ISO alpha-2 filenames)
Join waitlist/            Local waitlist JSON (gitignored)
API accounts/             Local API Platform accounts JSON (gitignored)
```

Path alias: import `@/lib/catalog` rather than relative climbs.

`ProductShowcase` exists in `src/components/sections/ProductShowcase.tsx` but is not imported by any page. Create-next-app default SVGs (`next.svg`, `vercel.svg`, `file.svg`, `globe.svg`, `window.svg`) remain in `public/` and are unused by application pages.

---

## 7. Routing

Next.js App Router. Root layout wraps every page with `LocaleProvider`, skip-link, Navbar, `<main id="main">`, and Footer. `src/app/template.tsx` wraps page children in `.page-enter` for enter animation.

Permanent redirects in `next.config.ts`: `/knowledge` → `/languages`, `/developers` → `/docs`, `/foundation` → `/dictionaries`, `/dictionaries/login` → `/api/login`, `/docs/api` → `/docs/api-reference`. Matching `page.tsx` files also call `permanentRedirect` where a dedicated file remains (`/dictionaries/register` → `/api/register`).

### 7.1 Pages

| Path | File | Role |
| --- | --- | --- |
| `/` | `src/app/page.tsx` | Hero waitlist, Africa map, methodology pipeline (`Architecture`) |
| `/languages` | `src/app/languages/page.tsx` | Isolated lexicons grouped by country; `?q=` search |
| `/languages/[id]` | `src/app/languages/[id]/page.tsx` | Country hub or variety profile |
| `/dictionaries` | `src/app/dictionaries/page.tsx` | Headword lookup UI |
| `/dictionaries/login` | `src/app/dictionaries/login/page.tsx` | Permanent alias to `/api/login` |
| `/dictionaries/register` | `src/app/dictionaries/register/page.tsx` | Permanent alias to `/api/register` |
| `/docs` | `src/app/docs/page.tsx` | Product documentation hub |
| `/docs/open-knowledge` | `src/app/docs/open-knowledge/page.tsx` | Open Knowledge docs overview |
| `/docs/app` | `src/app/docs/app/page.tsx` | Forro Vivo App docs |
| `/docs/connect` | `src/app/docs/connect/page.tsx` | Forro Connect docs |
| `/docs/quickstart` | `src/app/docs/quickstart/page.tsx` | curl examples |
| `/docs/api-reference` | `src/app/docs/api-reference/page.tsx` | Full Linguistic Research API documentation |
| `/docs/methodology` | `src/app/docs/methodology/page.tsx` | Evidence pipeline |
| `/knowledge` | `src/app/knowledge/page.tsx` | Permanent alias to `/languages` |
| `/overview` | `src/app/overview/page.tsx` | Product family overview |
| `/research` | `src/app/research/page.tsx` | Live lexicon atlas (flow + isolation network) |
| `/about` | `src/app/about/page.tsx` | Mission, pipeline, founders |
| `/careers` | `src/app/careers/page.tsx` | Role board |
| `/careers/[id]` | `src/app/careers/[id]/page.tsx` | Role description |
| `/api` | `src/app/api/page.tsx` | API Platform (dashboard when signed in; playground) |
| `/api/login` | `src/app/api/login/page.tsx` | API Platform sign-in |
| `/api/register` | `src/app/api/register/page.tsx` | API Platform create-account (Turnstile) |
| `/developers` | `src/app/developers/page.tsx` | Permanent alias to `/docs` |
| `/connect` | `src/app/connect/page.tsx` | Forro Connect |
| `/connect/income` | `src/app/connect/income/page.tsx` | Community income |
| `/app` | `src/app/app/page.tsx` | Forro Vivo App product page (app dark-green tokens) |
| `/app/credits` | `src/app/app/credits/page.tsx` | App credits |
| `/translation` | `src/app/translation/page.tsx` | Translation capability explainer (this site does not run a translator) |
| `/legal` | `src/app/legal/page.tsx` | Legal overview |
| `/legal/company` | `src/app/legal/company/page.tsx` | Company identity |
| `/legal/terms` | `src/app/legal/terms/page.tsx` | Terms of service |
| `/legal/privacy` | `src/app/legal/privacy/page.tsx` | Privacy |
| `/legal/eula` | `src/app/legal/eula/page.tsx` | EULA |
| `/foundation` | `src/app/foundation/page.tsx` | Permanent alias to `/dictionaries` |

`/languages/[id]` uses `generateStaticParams` for country IDs (São Tomé, Cabo Verde, Guiné-Bissau, Angola) and all language IDs. Unknown IDs call `notFound()`.

Docs pages share `src/app/docs/layout.tsx` and `DocsShell`. Sidebar nav is product-specific: Open Knowledge, Forro Vivo App, or Forro Connect. Legal pages share `src/app/legal/layout.tsx`.

Careers pages are in the sitemap. Careers is not listed in the Company mega-menu.

### 7.2 Route handlers

| Method | Path | File |
| --- | --- | --- |
| `POST` | `/api/waitlist` | `src/app/api/waitlist/route.ts` |
| `GET` | `/api/lookup` | `src/app/api/lookup/route.ts` |
| `GET` | `/api/v1/*` | `src/app/api/v1/[[...path]]/route.ts` |
| `POST` | `/api/auth/register` | `src/app/api/auth/register/route.ts` |
| `GET` `POST` `DELETE` | `/api/auth/session` | `src/app/api/auth/session/route.ts` |
| `POST` | `/api/keys` | `src/app/api/keys/route.ts` |

---

## 8. External Linguistic Research API

Host: `API_ORIGIN` = `https://api.forrovivo.com` (`src/lib/catalog.ts`). Fallback origin is the Worker `workers.dev` host.

Documented in `apiPaths` (`src/lib/constants.ts`) and rendered on `/docs/api-reference`. The `/api` page is the playground and account surface, not the full reference.

| Method | Path | Purpose |
| --- | --- | --- |
| GET | `/v1` | Service identity, versioning, CORS, rate limit, attribution, catalog links |
| GET | `/v1/health` | Versioned health check |
| GET | `/v1/openapi.yaml` | OpenAPI 3 contract |
| POST | `/v1/keys` | Issue or replace an optional API key (shown once). Public GET still works without it |
| GET | `/v1/kb` | Knowledge Base collection map |
| GET | `/v1/languages` | Isolated lexicons (country indexes omitted) |
| GET | `/v1/datasets` | Published dataset index, including country indexes |
| GET | `/v1/{family}` | Country index metadata. Not a merged dictionary |
| GET | `/v1/{family}/{variety}` | One lexicon metadata document |
| GET | `/v1/{family}/{variety}/lookup?headword=` | One headword in that folder |
| GET | `/v1/search?dataset=…&q=` | Search inside one named dataset only |
| GET | `/v1/{family}/{variety}/search?q=` | Search entries, knowledge, and sources in that folder |
| GET | `/v1/{family}/{variety}/entries` | Lexical entries from that folder |
| GET | `/v1/{family}/{variety}/entries/{entry_id}` | One lexical entry |
| GET | `/v1/{family}/{variety}/sources` | Bibliography for that folder |
| GET | `/v1/{family}/{variety}/grammar` | Attested grammar records, or empty |
| GET | `/v1/{family}/{variety}/audio/{filename}` | Attested example audio |

Rules the site documents:

- Linguistic reads are GET-only from this frontend except optional key issue.
- No API key is required for public GET. Fair-use rate limits apply on the Worker. Browser CORS allows any origin.
- Missing terms return `TERM_NOT_FOUND`. Empty fields stay empty; the service does not invent glosses.
- Search requires `dataset=` (or a dataset path) and never crosses folders.
- Lookup envelopes include `attribution`. Responses send `API-Version` and `Link` (`rel=source`, `rel=license`).

Catalog fetch (`fetchLanguagesCatalog`) uses `fetchResearchApi`, which tries `API_ORIGIN` and then the Workers fallback origin. Catalog responses are revalidated. Failures return `null` (catalog) or a generic 502 (lookup), so pages still render from the static constants catalog.

The developer web UI is this site at `/api` (`https://forrovivo.com/api`). Curl and other clients call `https://api.forrovivo.com` directly. The Worker also serves HTML at `/docs`. The OpenAPI contract is at `https://api.forrovivo.com/v1/openapi.yaml`.

---

## 9. Internal APIs

### 9.1 Waitlist — `POST /api/waitlist`

Accepts `{ email, source }`. Normalizes email to lowercase trim. Validates with a simple email pattern. `source` is one of `home`, `connect`, `dictionary`, `api` (default `home`).

Persistence strategy:

1. **Local (non-Vercel):** append to `Join waitlist/waitlist.json` via write-to-temp then `rename` (atomic replace). Duplicate emails for the same source return `exists` without duplicating rows. The JSON path is gitignored.
2. **Beehiiv:** `POST https://api.beehiiv.com/v2/publications/{id}/subscriptions` with Bearer `BEEHIIV_API_KEY`. HTTP 409 (already subscribed) counts as success. UTM source depends on waitlist `source` (`waitlist-forrovivo`, `waitlist-forro-connect`, `waitlist-dictionary`, `waitlist-api`).
3. **Vercel:** filesystem persist is skipped (`process.env.VERCEL`). Beehiiv credentials are required; otherwise the route returns 503.

Success if either store succeeded (`201`). Validation errors `400`. Unexpected errors `500` with a generic message.

Used by:

- Home hero (`Hero`, source `home`)
- Forro Connect waitlist (`DictionaryAccountForm`, source `connect`)

This is interest capture, not authentication.

### 9.2 Dictionary lookup — `GET /api/lookup`

Query: `dataset`, `headword`.

`dataset` must match `^[a-z0-9]+(?:\/[a-z0-9]+)?$` (for example `saotome/forro` or `angola`). Invalid input returns 400.

The handler forwards via `fetchResearchApi` to:

```
GET {origin}/v1/{dataset}/lookup?headword={encoded}
```

It relays status and JSON (or a generic error body). Upstream failure surfaces as 502. Lookup responses are revalidated.

Client: `DictionarySearch` on `/dictionaries`. Results render as dictionary cards: a summary (lexicon, language, sense count, match type) and a card per sense (headword, IPA, part of speech, Portuguese and English glosses, example, recordings, source). Errors use the API `message` (including `TERM_NOT_FOUND`).

### 9.3 API playground proxy — `GET /api/v1/*`

Same-origin GET proxy for the playground on `/api`. Safe path segments only. Query keys are limited to `headword`, `q`, `dataset`, `offset`, and `limit`. The explorer shows curl against `api.forrovivo.com` and runs requests through this proxy.

### 9.4 API Platform accounts — `POST /api/auth/register`

Creates an email-and-password account. Password must meet the published length and character rules. Optional registration codes are checked against `API_REGISTRATION_CODES` when provided. Cloudflare Turnstile must succeed before create.

Accounts persist to `API accounts/accounts.json` (gitignored) on hosts with a writable filesystem. Password hashes use scrypt. On Vercel, create returns 503 because that filesystem is not available.

A signed session cookie is set on success.

### 9.5 Session — `GET` `POST` `DELETE` `/api/auth/session`

Signed httpOnly cookie `fv_api_session`. `GET` reports whether the browser is authenticated. `POST` logs in. `DELETE` logs out. Production cookies are `secure` and `SameSite=lax`.

`ApiPlatformShell` on `/api` reads the session: signed-in users see `ApiDashboard` (issue key, sign out); others see marketing plus login/register.

### 9.6 API keys — `POST /api/keys`

Requires a valid session. Forwards `POST /v1/keys` with the session email via `fetchResearchApi`. Returns the key once. Stores the key prefix on the session and, when the local account file is writable, on the account record.

`robots.ts` disallows `/api/waitlist`, `/api/lookup`, `/api/v1`, `/api/keys`, and `/api/auth`.

---

## 10. Data layer in this repo

### 10.1 Static catalog — `src/lib/constants.ts`

Single source for:

- Navigation (header links, mega-menu, dictionary-mode CTAs)
- Country and language records (IDs, aliases, autonyms, groups, ISO codes, isolation notes, GitHub folder URLs)
- `lexiconLocations` (lat/lon per dataset, used to pin maps)
- Documented API paths
- Legal nav, careers roles, English product copy used as metadata fallbacks

### 10.2 Locale copy — `src/lib/i18n.ts` and `src/lib/i18n-copy.ts`

Locales are `en` and `pt`. Cookie name `fv_locale`. Default `en`. Server pages read the cookie and pass `getSiteCopy(locale)` into the tree. `LocaleProvider` hydrates the same locale, writes the cookie on change, sets `document.documentElement.lang`, and refreshes the router. Footer buttons switch language. Chrome strings (nav, footer) live in `i18n.ts`; page copy lives in `i18n-copy.ts`.

### 10.3 Live catalog — `src/lib/catalog.ts`

```ts
type LanguageRecord = {
  dataset: string;
  language: string;
  language_name?: string;
  type?: string;
  kind?: string;
  iso_639_3?: string;
  entry_count?: number;
  knowledge?: Record<string, number>;
  path?: string;
  url?: string;
  collections?: Record<string, string>;
};
```

Helpers:

- `isCountryDataset` — country indexes and Contruy are not treated as lookup lexicons
- `recordForDataset` — find one live row
- `sampleByCountry` — one sample dataset per country family
- `countryEntryTotal` — sum `entry_count` for a prefix, excluding country-index rows (`saotome` includes `saotome/forro`, etc.)

Pages that consume the live catalog: `/languages`, `/languages/[id]`, `/research`, `/api`, `/dictionaries`. If the API is down, UI still lists varieties from constants; live counts simply omit.

### 10.4 GeoJSON — `src/data/africa-countries.json`

FeatureCollection of African countries. Properties used by the map: `id` (ISO alpha-2), `name`, `subregion`. Northern Africa is filled lighter than other subregions.

---

## 11. Mapping and visualization

### 11.1 Africa map — `AfricaMap`

Continent view: `d3-geo` Mercator (`geoMercator` + `geoPath`) over the GeoJSON. São Tomé and Cabo Verde get extra island markers because small islands are otherwise hard to tap.

Path `d` attributes are painted only after mount (`mapReady`) so Node SSR geometry does not mismatch the browser and cause hydration errors. Home and language profiles import the map as a client component. Dictionary search still loads it with `next/dynamic` and `ssr: false`.

Country focus:

1. Prefer a static SVG from `/images/maps/africa/{iso}.svg` (parsed by `parseCountrySvgLayout`: `viewBox`, `#features` paths, `#label_points` circles).
2. Fall back to splitting the country’s MultiPolygon into focus paths (`buildFocusLayout`).

Clicking a country on the continent opens that country’s map. Locked focus (`focusCountryId`) is used on language profiles and dictionary search. Variety focus uses `lexiconLocations` (GeoJSON fallback) or SVG region name matching (diacritic-folded). Dictionary search can change dataset by clicking a region (`onFocusDataset`).

`rewindForD3` forces clockwise exteriors so RFC 7946 / geoBoundaries CCW polygons do not project as inverted globe fills.

### 11.2 Research studio — `ResearchStudio` in `FeatureGrid.tsx`

Two live visualizations from the languages catalog:

- **Lexicon flow:** bars of published `entry_count` per isolated folder, coloured by country, flowing into country nodes.
- **Isolation network:** force-layout graph of countries, varieties, and knowledge-field keys. Edges exist within a country index, not between countries. Nodes are draggable. Clicking a variety navigates to its profile.

`VarietyGrid` on `/languages` lists isolated folders by country.

Respects `prefers-reduced-motion` (fewer layout ticks).

### 11.3 Globe — `GlobeWireframe`

`cobe` canvas on `/connect` and API auth screens, markers at São Tomé, Santiago, Bissau, and Luanda, with connecting arcs. ResizeObserver + IntersectionObserver pause animation off-screen. Device pixel ratio capped. Sample count scales with size. SVG wireframe shows until/alongside the canvas. Reduced-motion users get a static phi.

---

## 12. UI system

Dark-first. Compact. White primary actions on `#141414`. Muted text uses `#9a9a9a`. Body type is sized for readability (base size above typical 16px marketing stacks).

### 12.1 Tokens — `src/app/globals.css`

| Token | Role |
| --- | --- |
| `--background` `#141414` | Page |
| `--foreground` `#ffffff` | Primary text |
| `--muted` `#9a9a9a` | Secondary text |
| `--border` `#2a2a2a` | Dividers |
| `--surface` / `--surface-alt` / `--surface-elevated` | Cards |
| `--font-heading` | Ovo (Google Font via `next/font`) |
| `--font-sans` | System UI stack |

On `/app` and `/app/*` the Navbar adds `html.forro-theme` (dark green product tokens).

Tailwind v4 `@theme inline` maps these to utility colors (`bg-background`, `text-muted`, `border-border`, `font-heading`).

Shared `.field` styles pill inputs/selects. `.wordmark` / `.wordmark-char` animate the header title. `.page-enter` is the route template animation.

`prefers-reduced-motion: reduce` collapses scroll-behavior and animation/transition durations.

Safe-area insets on body and footer for notched devices. Skip-to-content link in the root layout (localized).

### 12.2 Primitives

- **Container:** max width `77.5rem`, responsive horizontal padding.
- **Button:** `primary` | `outline` | `ghost`; `default` | `sm`. Renders `<a>` when `href` is set; external http(s) opens in a new tab with `noopener noreferrer`.
- **Navbar:** fixed, blur on scroll, three-column Forro Vivo mega-menu. Company column is About, GitHub, Legal. On `/api` routes the CTAs switch to API Platform login/register. On `/app` the section link is Roadmap.
- **Footer:** company legal name, registration, Legal / Terms / Privacy / EULA, English/Portuguese switcher, current year. Hidden on API login/register screens.

Heading sizes use `clamp()` rather than fixed marketing type scales.

---

## 13. Metadata, SEO, and viewport

Root `src/app/layout.tsx`:

- `metadataBase` from `NEXT_PUBLIC_SITE_URL`, defaulting to `https://www.forrovivo.com` (production is served at `https://forrovivo.com`)
- Title template: `%s | Open Knowledge`
- Icons: `/images/app/forro-icon.png`
- Open Graph / Twitter summary cards
- Organization + WebSite JSON-LD
- `html lang` from locale (`en` or `pt`) with `class="dark"`
- Viewport: device-width, `viewportFit: cover`, `colorScheme: dark`, `themeColor: #141414`

Most pages set a local `metadata.title`. Language profiles set title from country or variety name. `sitemap.ts` includes product, docs, legal, careers, and language paths.

---

## 14. Performance and Next.js configuration

`next.config.ts`:

- `compress: true`
- `poweredByHeader: false`
- Images: AVIF and WebP; long `minimumCacheTTL`; qualities 75 and 100 (logo uses 100)
- Production `compiler.removeConsole` except `error`
- `experimental.optimizePackageImports` for `motion` and `d3-geo`
- Permanent redirects listed in section 7

Other tactics in components:

- `content-visibility: auto` on architecture and country grids
- Globe animation gated by intersection
- Logo `priority` + tight `sizes`
- Catalog revalidation so language counts are not fetched on every request
- Map path strings rendered after mount to avoid hydration mismatch

---

## 15. Accessibility

- Skip link to `#main`
- Focus-visible rings on interactive chrome
- Map regions are keyboard-operable (`role="button"`, Enter/Space)
- `aria-label` on maps, globe (decorative `aria-hidden`), pipeline SVG, locale switcher
- `prefers-reduced-motion` for CSS, globe, and research force layout
- Raised body type scale and muted contrast
- Semantic `<main>`, headings, and footer nav
- External links use `rel="noopener noreferrer"` when opened in a new tab

---

## 16. Security and privacy

- Linguistic GET is public and read-only; optional keys are issued only to a signed-in API Platform session.
- Waitlist emails: processed to notify product availability; not sold. On Vercel they go to Beehiiv when credentials exist. Locally they are written under `Join waitlist/` (gitignored).
- API Platform passwords are hashed (scrypt) in `API accounts/` (gitignored). Create-account uses Turnstile.
- Session cookie is httpOnly and signed. `API_SESSION_SECRET` should be set in production; the code falls back to other server secrets for local use.
- Legal pages describe company identity, terms, privacy, and EULA. Contacts include legal, privacy, security, support, and billing addresses on `forrovivo.com`.
- `BEEHIIV_API_KEY` and `BEEHIIV_PUBLICATION_ID` are server-only. `.env*` is gitignored.
- Lookup dataset is constrained by regex to avoid open path construction. The `/api/v1` playground proxy allows only safe path segments and an allowlisted query set.
- `robots.ts` disallows crawling of waitlist, lookup, `/api/v1`, keys, and auth routes.
- Waitlist write uses a unique temp file then rename.
- `poweredByHeader` is disabled.

Waitlist forms do not authenticate. API Platform login does.

---

## 17. Environment variables

| Variable | Scope | Purpose |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Public | Canonical origin for metadata |
| `BEEHIIV_API_KEY` | Server | Beehiiv subscriptions |
| `BEEHIIV_PUBLICATION_ID` | Server | Beehiiv publication |
| `API_SESSION_SECRET` | Server | Signs API Platform session cookies |
| `API_REGISTRATION_CODES` | Server | Optional comma-separated registration codes |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | Public | Turnstile widget on create-account |
| `TURNSTILE_SECRET_KEY` | Server | Turnstile siteverify |
| `VERCEL` | Injected | Skip local filesystem waitlist and accounts; require Beehiiv for waitlist |
| `NODE_ENV` | Injected | Console stripping in production; Turnstile test keys locally |

---

## 18. Deployment

- Framework: Next.js on Vercel (`vercel.json`: `buildCommand` `next build`, `installCommand` `npm install`). Production is aliased to `https://forrovivo.com`. `www.forrovivo.com` redirects there.
- Scripts: `dev`, `build`, `start`, `lint`.
- `allowScripts` in `package.json` permits native installs used by the Next toolchain (`sharp`, `unrs-resolver`).
- Git remote: `origin` → `https://github.com/HenriquesPontes/OpenKnowledge.git`, branch `main`.

Local waitlist and API Platform account files will not persist on serverless hosts; Beehiiv is the production waitlist store. Account create on Vercel needs a persistent store before it can succeed.

---

## 19. Design and content conventions

Navigation, catalog IDs, and English product constants live in `constants.ts`. User-facing sentences are duplicated in `i18n-copy.ts` for English and Portuguese. Isolation warnings are repeated on country hubs, variety pages, docs, API, and legal so the invariant cannot be missed.

Visual language: charcoal ground, paper-white Africa map with a drop-shadow “cut-out”, Ovo for titles, system sans for body, pill buttons, tight tracking. Research visualizations use a small country colour set (São Tomé, Cabo Verde, Guiné-Bissau, Angola) only in those charts—not as a general theme. The Forro Vivo App surfaces use a separate dark-green token set.

---

## 20. Known gaps (current codebase)

These are observations, not a roadmap.

- API Platform accounts write a local JSON file. Create-account is unavailable on Vercel until a persistent store is wired.
- Site account doors are API Platform only; `/dictionaries/login` and `/dictionaries/register` permanently redirect to `/api/login` and `/api/register`.
- Careers pages exist and are in the sitemap, but Careers is not in the Company menu.
- `ProductShowcase` (git clone copy control) is unused.
- Default Create Next App SVGs remain in `public/`.
- `/knowledge`, `/developers`, and `/foundation` are permanent aliases to `/languages`, `/docs`, and `/dictionaries`.
- Live lexical data and methodology source of truth live in the Linguistic Research GitHub repository and API, not in this app. This site can go stale on copy if those hosts change paths.
- No automated test suite in this repository.
- Waitlist has no rate limiting or CAPTCHA in-app (registration uses Turnstile).

---

## 21. How to run

```bash
npm install
npm run dev
```

Open the local Next.js origin. Production build: `npm run build` then `npm start`. Lint: `npm run lint`.

For waitlist on Vercel, set Beehiiv credentials. For local waitlist without Beehiiv, POST succeeds by writing `Join waitlist/waitlist.json`. Local API Platform accounts write `API accounts/accounts.json`. Turnstile uses Cloudflare dummy keys outside production unless site and secret keys are set.

---

## 22. File index (application source)

| Area | Files |
| --- | --- |
| App shell | `src/app/layout.tsx`, `src/app/template.tsx`, `src/app/globals.css`, `src/app/page.tsx` |
| Route handlers | `src/app/api/waitlist/route.ts`, `src/app/api/lookup/route.ts`, `src/app/api/v1/[[...path]]/route.ts`, `src/app/api/auth/register/route.ts`, `src/app/api/auth/session/route.ts`, `src/app/api/keys/route.ts` |
| Catalog and locale | `src/lib/catalog.ts`, `src/lib/constants.ts`, `src/lib/i18n.ts`, `src/lib/i18n-copy.ts` |
| Accounts | `src/lib/api-accounts.ts`, `src/lib/api-session.ts`, `src/lib/turnstile.ts` |
| Maps | `src/lib/map-path.ts`, `src/lib/rewind-geo.ts`, `src/data/africa-countries.json`, `src/components/sections/AfricaMap.tsx` |
| Layout UI | `src/components/layout/Navbar.tsx`, `src/components/layout/Footer.tsx`, `src/components/locale/LocaleProvider.tsx` |
| Sections | `Hero`, `Architecture`, `FeatureGrid`, `DictionarySearch`, `ApiExplorer`, `ApiPlatformShell`, `ApiDashboard`, `ApiAuthForm`, `TurnstileWidget`, `DocsShell`, `DictionaryAccountForm`, `GlobeWireframe`, `BrowserMockup`, `ProductShowcase` |
| Primitives | `src/components/ui/Button.tsx`, `src/components/ui/Container.tsx`, `src/lib/cn.ts` |
| Config | `next.config.ts`, `tsconfig.json`, `vercel.json`, `eslint.config.mjs`, `postcss.config.mjs`, `package.json` |

---

*End of technical report. This document reflects the repository as of 21 August 2026.*
