# Open Knowledge — Technical Report

**Product:** Open Knowledge  
**Platform:** ForroVivo  
**Operator:** LIVLU TECHNOLOGIES LTD (registered in England and Wales)  
**Company website:** livlutechnologies.com (not ready yet)  
**Repository:** [HenriquesPontes/OpenKnowledge](https://github.com/HenriquesPontes/OpenKnowledge)  
**Package name:** `open-knowledge`  
**Report date:** 19 August 2026

This document is the technical report for the Open Knowledge website as implemented in this repository: this Next.js site at `https://www.forrovivo.com`. It records full route and stack detail, and waitlist, Beehiiv, and lookup-proxy implementation.

It is the public front door to ForroVivo’s Linguistic Knowledge Base: attested Creole lexicons, sources, documentation, and a public API. Lexical data is not stored here. This app catalogs, explains, and routes to isolated datasets hosted elsewhere.

---

## 1. Purpose

Open Knowledge documents Creole languages of São Tomé and Príncipe, Cabo Verde, Guiné-Bissau, and Angola. The site exists to:

- Explain the evidence-first methodology (no AI-generated linguistic claims as evidence).
- Present isolated lexicons by country and variety, without merging them.
- Proxy headword lookup into the public Linguistic Research API.
- Document GET-only API usage for researchers and developers.
- Collect waitlist and dictionary-access interest.
- Situate Open Knowledge inside the ForroVivo product family (learning app and Forro Connect).

Governing principle, as published on the site:

> The ForroVivo Knowledge Base does not treat AI-generated information as linguistic evidence. Every documented linguistic claim should be traceable to a source.

---

## 2. Product context

ForroVivo is the platform. Open Knowledge is one product in that platform.

Domain architecture is `https://www.forrovivo.com`.

| Product | Role | Host |
| --- | --- | --- |
| Open Knowledge | Public linguistic knowledge site, documentation, dictionary lookup UI | This Next.js site at `https://www.forrovivo.com` |
| Linguistic Research API | Read-only JSON API over published datasets | `https://api.forrovivo.com` |
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
| `angola` | Angola | `angola` | AO | Angola Contruy (country dataset) |

Country routes under `/v1/saotome`, `/v1/caboverde`, and `/v1/guinebissau` are indexes, not merged dictionaries. `/v1/angola` is Angola Contruy, not Angolar / Ngola of São Tomé.

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

Angola Contruy has no ISO 639-3 in this catalog. It must not be confused with Angolar.

Static catalog, isolation copy, GitHub folder URLs, and geographic anchors live in `src/lib/constants.ts`. Live entry counts and knowledge-field tallies come from `GET https://api.forrovivo.com/v1/languages`.

---

## 4. System architecture

```
Browser
  │
  ├─ Next.js App Router (this repo)
  │    ├─ Static/SSR pages (docs, about, legal, connect)
  │    ├─ Server pages that fetch the languages catalog
  │    ├─ Client UI (maps, waitlist, dictionary search, globe)
  │    ├─ POST /api/waitlist  → local JSON (non-Vercel) and/or Beehiiv
  │    └─ GET  /api/lookup    → proxy to api.forrovivo.com
  │
  ├─ Linguistic Research API  (api.forrovivo.com)
  │    └─ published JSON per isolated dataset
  │
  └─ GitHub Linguistic Research repo
       └─ source of truth for datasets, methodology, bibliography
```

This application does **not**:

- Store lexical entries.
- Write to the Linguistic Research API.
- Merge languages at search or lookup time.
- Authenticate API consumers (the public API is GET-only and currently keyless).
- Implement machine translation. Machine translation is a ForroVivo platform capability, not a feature of this site.

Dictionary login/register pages collect email via the waitlist route. They do not issue sessions or API keys.

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
    sections/             Feature sections (hero, maps, docs chrome, research viz)
    ui/                   Button, Container
  data/
    africa-countries.json Continent GeoJSON
  lib/
    catalog.ts            API origin, catalog fetch, aggregations
    constants.ts          Navigation, countries, languages, copy, API paths
    map-path.ts           GeoJSON → SVG path layout; country SVG parser
    rewind-geo.ts         Polygon winding for d3-geo
    cn.ts                 Tailwind class merge
public/
  images/logo-icon.png
  images/maps/africa/     Per-country SVG overlays (ISO alpha-2 filenames)
Join waitlist/            Local waitlist JSON (gitignored)
```

Path alias: import `@/lib/catalog` rather than relative climbs.

`ProductShowcase` exists in `src/components/sections/ProductShowcase.tsx` but is not imported by any page. Create-next-app default SVGs (`next.svg`, `vercel.svg`, `file.svg`, `globe.svg`, `window.svg`) remain in `public/` and are unused by application pages.

---

## 7. Routing

Next.js App Router. Root layout wraps every page with skip-link, Navbar, `<main id="main">`, and Footer.

### 7.1 Pages

| Path | File | Role |
| --- | --- | --- |
| `/` | `src/app/page.tsx` | Hero waitlist, Africa map, methodology pipeline |
| `/languages` | `src/app/languages/page.tsx` | Isolated lexicons grouped by country; `?q=` search |
| `/languages/[id]` | `src/app/languages/[id]/page.tsx` | Country hub or variety profile |
| `/dictionaries` | `src/app/dictionaries/page.tsx` | Headword lookup UI |
| `/dictionaries/login` | `src/app/dictionaries/login/page.tsx` | Email waitlist framed as login |
| `/dictionaries/register` | `src/app/dictionaries/register/page.tsx` | Email waitlist framed as account request |
| `/docs` | `src/app/docs/page.tsx` | Introduction |
| `/docs/quickstart` | `src/app/docs/quickstart/page.tsx` | curl examples |
| `/docs/api-reference` | `src/app/docs/api-reference/page.tsx` | Documented GET paths |
| `/docs/methodology` | `src/app/docs/methodology/page.tsx` | Evidence pipeline |
| `/knowledge` | `src/app/knowledge/page.tsx` | Knowledge Base overview + product tree |
| `/research` | `src/app/research/page.tsx` | Live lexicon atlas (flow + isolation network) |
| `/about` | `src/app/about/page.tsx` | Mission, pipeline, founders |
| `/api` | `src/app/api/page.tsx` | Public API marketing page (not a route handler) |
| `/developers` | `src/app/developers/page.tsx` | Auth/rate-limit posture |
| `/connect` | `src/app/connect/page.tsx` | Forro Connect |
| `/app` | `src/app/app/page.tsx` | Forro Vivo App |
| `/legal` | `src/app/legal/page.tsx` | Company, privacy, EULA |
| `/foundation` | `src/app/foundation/page.tsx` | Redirects to `/dictionaries` |

`/languages/[id]` uses `generateStaticParams` for country IDs (except Angola as a hub — Angola is a language id) and all language IDs. Unknown IDs call `notFound()`.

Docs pages share `src/app/docs/layout.tsx` (sidebar from `docsNav`).

### 7.2 Route handlers

| Method | Path | File |
| --- | --- | --- |
| `POST` | `/api/waitlist` | `src/app/api/waitlist/route.ts` |
| `GET` | `/api/lookup` | `src/app/api/lookup/route.ts` |

---

## 8. External Linguistic Research API

Host: `API_ORIGIN` = `https://api.forrovivo.com` (`src/lib/catalog.ts`).

Documented in `apiPaths` (`src/lib/constants.ts`) and rendered on `/api` and `/docs/api-reference`.

| Method | Path | Purpose |
| --- | --- | --- |
| GET | `/v1` | Service identity and catalog links |
| GET | `/v1/kb` | Knowledge Base collection map |
| GET | `/v1/languages` | Isolated lexicons (not a merged word list) |
| GET | `/v1/datasets` | Published dataset index |
| GET | `/v1/saotome/forro/lookup?headword=` | One Forro headword |
| GET | `/v1/caboverde/{island}/lookup?headword=` | One Kabuverdianu island variety |
| GET | `/v1/guinebissau/{region}/lookup?headword=` | One regional Kriol variety |
| GET | `/v1/angola/lookup?headword=` | Angola Contruy (not Angolar) |
| GET | `/v1/search?dataset=…&q=` | Search inside one named dataset only |
| GET | `/v1/{dataset}/entries` | Lexical entries from that folder |
| GET | `/v1/{dataset}/sources` | Bibliography for that folder |

Rules the site documents:

- GET-only. This frontend never POSTs to the linguistic API.
- No API key today. Rate limits and signed keys are deferred until usage requires them.
- Missing terms return `TERM_NOT_FOUND`. Empty fields stay empty; the service does not invent glosses.
- Search requires `dataset=` and never crosses folders.

OpenAPI playground: `https://api.forrovivo.com/docs`.

Catalog fetch (`fetchLanguagesCatalog`) uses Next.js ISR-style revalidation of six hours. Lookup proxy revalidates for two minutes. Failures return `null` (catalog) or a generic 502 (lookup), so pages still render from the static constants catalog.

---

## 9. Internal APIs

### 9.1 Waitlist — `POST /api/waitlist`

Accepts `{ email }`. Normalizes to lowercase trim. Validates with a simple email pattern.

Persistence strategy:

1. **Local (non-Vercel):** append to `Join waitlist/waitlist.json` via write-to-temp then `rename` (atomic replace). Duplicate emails return `exists` without duplicating rows. The JSON path is gitignored.
2. **Beehiiv:** `POST https://api.beehiiv.com/v2/publications/{id}/subscriptions` with Bearer `BEEHIIV_API_KEY`. HTTP 409 (already subscribed) counts as success. UTM source: `waitlist-forrovivo`.
3. **Vercel:** filesystem persist is skipped (`process.env.VERCEL`). Beehiiv credentials are required; otherwise the route returns 503.

Success if either store succeeded (`201`). Validation errors `400`. Unexpected errors `500` with a generic message.

Used by:

- Home hero (`Hero`)
- Dictionary login and register (`DictionaryAccountForm`)

This is interest capture, not authentication.

### 9.2 Dictionary lookup — `GET /api/lookup`

Query: `dataset`, `headword`.

`dataset` must match `^[a-z0-9]+(?:\/[a-z0-9]+)?$` (for example `saotome/forro` or `angola`). Invalid input returns 400.

The handler forwards to:

```
GET {API_ORIGIN}/v1/{dataset}/lookup?headword={encoded}
```

It relays status and JSON (or a generic error body). Upstream failure surfaces as 502.

Client: `DictionarySearch` on `/dictionaries`.

---

## 10. Data layer in this repo

### 10.1 Static catalog — `src/lib/constants.ts`

Single source for:

- Navigation (header links, mega-menu, dictionary-mode CTAs)
- Hero, map, architecture, connect, docs, API, footer copy
- Country and language records (IDs, aliases, autonyms, groups, ISO codes, isolation notes, GitHub folder URLs)
- `lexiconLocations` (lat/lon per dataset, used to pin maps)
- Documented API paths

### 10.2 Live catalog — `src/lib/catalog.ts`

```ts
type LanguageRecord = {
  dataset: string;
  language: string;
  language_name?: string;
  iso_639_3?: string;
  entry_count?: number;
  knowledge?: Record<string, number>;
  path?: string;
  url?: string;
  collections?: Record<string, string>;
};
```

Helpers:

- `recordForDataset` — find one live row
- `sampleByCountry` — one sample dataset per country family for the API page mockup
- `countryEntryTotal` — sum `entry_count` for a prefix (`saotome` includes `saotome/forro`, etc.)

Pages that consume the live catalog: `/languages`, `/languages/[id]`, `/knowledge`, `/research`, `/api`, `/dictionaries`. If the API is down, UI still lists varieties from constants; live counts simply omit.

### 10.3 GeoJSON — `src/data/africa-countries.json`

FeatureCollection of African countries. Properties used by the map: `id` (ISO alpha-2), `name`, `subregion`. Northern Africa is filled lighter than other subregions.

---

## 11. Mapping and visualization

### 11.1 Africa map — `AfricaMap`

Continent view: `d3-geo` Mercator (`geoMercator` + `geoPath`) over the GeoJSON. São Tomé and Cabo Verde get extra island markers because small islands are otherwise hard to tap.

Country focus:

1. Prefer a static SVG from `/images/maps/africa/{iso}.svg` (parsed by `parseCountrySvgLayout`: `viewBox`, `#features` paths, `#label_points` circles).
2. Fall back to splitting the country’s MultiPolygon into focus paths (`buildFocusLayout`).

Clicking a country on the continent opens that country’s map. Locked focus (`focusCountryId`) is used on language profiles and dictionary search. Variety focus uses `lexiconLocations` (GeoJSON fallback) or SVG region name matching (diacritic-folded). Dictionary search can change dataset by clicking a region (`onFocusDataset`).

`rewindForD3` forces clockwise exteriors so RFC 7946 / geoBoundaries CCW polygons do not project as inverted globe fills.

Dictionary search loads the map with `next/dynamic` and `ssr: false`.

### 11.2 Research studio — `ResearchStudio` in `FeatureGrid.tsx`

Two live visualizations from the languages catalog:

- **Lexicon flow:** bars of published `entry_count` per isolated folder, coloured by country, flowing into country nodes.
- **Isolation network:** force-layout graph of countries, varieties, and knowledge-field keys. Edges exist within a country index, not between countries. Nodes are draggable. Clicking a variety navigates to its profile.

Respects `prefers-reduced-motion` (fewer layout ticks).

### 11.3 Globe — `GlobeWireframe`

`cobe` canvas on `/connect`, markers at São Tomé, Santiago, Bissau, and Luanda, with connecting arcs. ResizeObserver + IntersectionObserver pause animation off-screen. Device pixel ratio capped. Sample count scales with size. SVG wireframe shows until/alongside the canvas. Reduced-motion users get a static phi.

---

## 12. UI system

Dark-first. Compact. White primary actions on `#141414`.

### 12.1 Tokens — `src/app/globals.css`

| Token | Role |
| --- | --- |
| `--background` `#141414` | Page |
| `--foreground` `#ffffff` | Primary text |
| `--muted` `#818181` | Secondary text |
| `--border` `#2a2a2a` | Dividers |
| `--surface` / `--surface-alt` / `--surface-elevated` | Cards |
| `--font-heading` | Ovo (Google Font via `next/font`) |
| `--font-sans` | System UI stack |

Tailwind v4 `@theme inline` maps these to utility colors (`bg-background`, `text-muted`, `border-border`, `font-heading`).

Shared `.field` styles pill inputs/selects. `.wordmark` / `.wordmark-char` animate the header title.

`prefers-reduced-motion: reduce` collapses scroll-behavior and animation/transition durations.

Safe-area insets on body and footer for notched devices. Skip-to-content link in the root layout.

### 12.2 Primitives

- **Container:** max width `77.5rem`, responsive horizontal padding.
- **Button:** `primary` | `outline` | `ghost`; `default` | `sm`. Renders `<a>` when `href` is set; external http(s) opens in a new tab with `noopener noreferrer`.
- **Navbar:** fixed, blur on scroll, three-column Forro Vivo mega-menu. On `/dictionaries/*` the CTAs switch to dictionary login/register.
- **Footer:** company legal name, registration, Legal / Privacy / EULA, current year.

Heading sizes use `clamp()` rather than fixed marketing type scales.

---

## 13. Metadata, SEO, and viewport

Root `src/app/layout.tsx`:

- `metadataBase` from `NEXT_PUBLIC_SITE_URL`, defaulting to `https://www.forrovivo.com`
- Title template: `%s | Open Knowledge`
- Icons: `/images/logo-icon.png`
- Open Graph / Twitter summary cards
- `html lang="en"` with `class="dark"`
- Viewport: device-width, `viewportFit: cover`, `colorScheme: dark`, `themeColor: #141414`

Most pages set a local `metadata.title`. Language profiles set title from country or variety name.

---

## 14. Performance and Next.js configuration

`next.config.ts`:

- `compress: true`
- `poweredByHeader: false`
- Images: AVIF and WebP; long `minimumCacheTTL`; qualities 75 and 100 (logo uses 100)
- Production `compiler.removeConsole` except `error`
- `experimental.optimizePackageImports` for `motion` and `d3-geo`

Other tactics in components:

- `content-visibility: auto` on architecture and country grids
- Globe animation gated by intersection
- Logo `priority` + tight `sizes`
- Catalog revalidation so language counts are not fetched on every request

---

## 15. Accessibility

- Skip link to `#main`
- Focus-visible rings on interactive chrome
- Map regions are keyboard-operable (`role="button"`, Enter/Space)
- `aria-label` on maps, globe (decorative `aria-hidden`), pipeline SVG
- `prefers-reduced-motion` for CSS, globe, and research force layout
- Semantic `<main>`, headings, and footer nav
- External links use `rel="noopener noreferrer"` when opened in a new tab

---

## 16. Security and privacy

- Linguistic API is public and read-only; this app does not mint secrets for it.
- Waitlist emails: processed to notify product availability; not sold. On Vercel they go to Beehiiv when credentials exist. Locally they are written under `Join waitlist/` (gitignored).
- Legal page states that the public Linguistic Research API is not used to collect personal data; server logs may include IP for operations.
- `BEEHIIV_API_KEY` and `BEEHIIV_PUBLICATION_ID` are server-only. `.env*` is gitignored.
- Lookup dataset is constrained by regex to avoid open path construction.
- Waitlist write uses a unique temp file then rename.
- `poweredByHeader` is disabled.
- No session cookies, CSRF tokens, or user database in this repo.

Dictionary “log in” / “create an account” do not authenticate. They enqueue the same waitlist.

---

## 17. Environment variables

| Variable | Scope | Purpose |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Public | Canonical origin for metadata |
| `BEEHIIV_API_KEY` | Server | Beehiiv subscriptions |
| `BEEHIIV_PUBLICATION_ID` | Server | Beehiiv publication |
| `VERCEL` | Injected | Skip local filesystem waitlist; require Beehiiv |
| `NODE_ENV` | Injected | Console stripping in production |

---

## 18. Deployment

- Framework: Next.js on Vercel (`vercel.json`: `buildCommand` `next build`, `installCommand` `npm install`).
- Scripts: `dev`, `build`, `start`, `lint`.
- `allowScripts` in `package.json` permits native installs used by the Next toolchain (`sharp`, `unrs-resolver`).
- Git remote: `origin` → `https://github.com/HenriquesPontes/OpenKnowledge.git`, branch `main`.

Local waitlist files will not persist on serverless hosts; Beehiiv is the production store.

---

## 19. Design and content conventions

Copy and navigation are centralized in `constants.ts` so pages stay presentational. Isolation warnings are repeated on country hubs, variety pages, docs, API, and legal so the invariant cannot be missed.

Visual language: charcoal ground, paper-white Africa map with a drop-shadow “cut-out”, Ovo for titles, system sans for body, pill buttons, tight tracking. Research visualizations use a small country colour set (São Tomé, Cabo Verde, Guiné-Bissau, Angola) only in those charts—not as a general theme.

---

## 20. Known gaps (current codebase)

These are observations, not a roadmap.

- Dictionary login/register are waitlist forms, not identity.
- `ProductShowcase` (git clone copy control) is unused.
- Default Create Next App SVGs remain in `public/`.
- `/foundation` is only a redirect.
- Live lexical data and methodology source of truth live in the Linguistic Research GitHub repository and API, not in this app. This site can go stale on copy if those hosts change paths.
- No automated test suite in this repository.
- Waitlist has no rate limiting or CAPTCHA in-app.

---

## 21. How to run

```bash
npm install
npm run dev
```

Open the local Next.js origin. Production build: `npm run build` then `npm start`. Lint: `npm run lint`.

For waitlist on Vercel, set Beehiiv credentials. For local waitlist without Beehiiv, POST succeeds by writing `Join waitlist/waitlist.json`.

---

## 22. File index (application source)

| Area | Files |
| --- | --- |
| App shell | `src/app/layout.tsx`, `src/app/globals.css`, `src/app/page.tsx` |
| Route handlers | `src/app/api/waitlist/route.ts`, `src/app/api/lookup/route.ts` |
| Catalog | `src/lib/catalog.ts`, `src/lib/constants.ts` |
| Maps | `src/lib/map-path.ts`, `src/lib/rewind-geo.ts`, `src/data/africa-countries.json`, `src/components/sections/AfricaMap.tsx` |
| Layout UI | `src/components/layout/Navbar.tsx`, `src/components/layout/Footer.tsx` |
| Sections | `Hero`, `Architecture`, `FeatureGrid`, `DictionarySearch`, `DictionaryAccountForm`, `GlobeWireframe`, `BrowserMockup`, `ProductShowcase` |
| Primitives | `src/components/ui/Button.tsx`, `src/components/ui/Container.tsx`, `src/lib/cn.ts` |
| Config | `next.config.ts`, `tsconfig.json`, `vercel.json`, `eslint.config.mjs`, `postcss.config.mjs`, `package.json` |

---

*End of technical report. This document reflects the repository as of 19 August 2026.*
