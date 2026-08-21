# Open Knowledge

> **LIVLU TECHNOLOGIES** · **Open Knowledge** pillar  
> Public linguistic knowledge site operated by **LIVLU TECHNOLOGIES LTD**. Isolated Creole lexicons, attested sources, and a developer API surface — no AI-generated text treated as linguistic evidence.

> Live site: [forrovivo.com](https://forrovivo.com) (`www.forrovivo.com` redirects there). The wordmark and metadata title are Open Knowledge.

[![Next.js](https://img.shields.io/badge/Next.js-16-black)](https://nextjs.org)
[![React](https://img.shields.io/badge/React-19-blue)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)](https://www.typescriptlang.org)
[![License](https://img.shields.io/badge/License-Proprietary-important)](LICENSE)

---

## Place in LIVLU TECHNOLOGIES

Individual team project. One company goal with Learning and Research.

```
LIVLU TECHNOLOGIES
├── Open Knowledge  ← this repository (site → API → developers → AI / NLP / MT)
├── Learning        → ForroVivo App (separate repos)
└── Research        → Datasets + api.forrovivo.com (separate repo)
```

Lexical data is **not** stored here. Sister projects keep their own git history, license, and release cadence.

---

## 📽️ Demo

Open the production site: [https://forrovivo.com](https://forrovivo.com)

Try the API playground: [https://forrovivo.com/api](https://forrovivo.com/api)

Curl and other clients call [https://api.forrovivo.com](https://api.forrovivo.com) directly.

---

## ✨ Features

### Knowledge
- 🗺️ **Isolated catalog** — Creole lexicons of São Tomé and Príncipe, Cabo Verde, Guiné-Bissau, and Angola. Each variety stays in its own folder.
- 📖 **Dictionary lookup** — Headword results as cards (glosses, IPA, examples, recordings, source). Country indexes are not merged dictionaries.
- 🔬 **Research atlas** — Live lexicon flow and isolation network from the published languages catalog.
- 🧭 **Africa map** — Country focus, variety pins, and region taps that stay inside one dataset.

### Developers
- 🔌 **API playground** — Same-origin `/api/v1` explorer. Curl examples target `api.forrovivo.com`.
- 🔑 **API Platform** — Email and password accounts, signed session, optional key issue. Public GET still works without a key.
- 📚 **Docs hub** — Open Knowledge, Forro Vivo App (Learning), and Forro Connect. Full Research API contract at `/docs/api-reference`.

### Sister products (other pillars)
- 📱 **Learning — Forro Vivo App** — App Store product page at `/app`.
- 🤝 **Forro Connect** — Learners with native speakers. Waitlist on `/connect`.
- 🌐 **English / Portuguese** — Locale cookie `fv_locale`. Switcher in the footer.

Similar spelling is not a reason to merge folders (ST, CV, GW, AO). Angola Contruy is `/v1/angola/contruy`. It is not Angolar of São Tomé and not `/v1/angola`.

---

## 🏗️ Architecture

```
Open knowledge/
├── src/
│   ├── app/                 # App Router pages and route handlers
│   ├── components/
│   │   ├── layout/          # Navbar, Footer
│   │   ├── locale/          # LocaleProvider
│   │   ├── sections/        # Hero, maps, docs, API Platform, dictionary
│   │   └── ui/              # Button, Container
│   ├── data/                # Africa GeoJSON
│   └── lib/
│       ├── catalog.ts       # Linguistic API origin, fetch, isolation helpers
│       ├── constants.ts     # Nav, countries, languages, API paths
│       ├── i18n.ts          # Locale cookie, chrome strings
│       ├── i18n-copy.ts     # English / Portuguese page copy
│       ├── api-accounts.ts  # API Platform accounts (local JSON)
│       ├── api-session.ts   # Signed session cookie
│       └── turnstile.ts     # Create-account human check
├── TECH_REPORT.md           # v1.0 baseline
├── TECH_REPORT_v2.0.md      # Incremental v2.0 report
└── CONTEXT.md               # Implementation masterplan
```

**Pattern:** Next.js App Router + React Server Components + client islands  
**Lexical data:** not in this repo — [Linguistic Research](https://github.com/Forrovivo/linguistic-research) and `https://api.forrovivo.com`

---

## 📱 Requirements

| Item | Requirement |
|------|-------------|
| Runtime | Node.js + npm |
| Framework | Next.js 16 |
| Site | Production at `https://forrovivo.com` |
| API | Public Linguistic Research API at `https://api.forrovivo.com` |
| Waitlist (Vercel) | Beehiiv publication credentials |
| API Platform (local) | Writable filesystem for `API accounts/` |

This site does not implement machine translation. It does not store dictionary JSON.

---

## 🚀 Getting Started

### 1. Clone & install

```bash
git clone https://github.com/HenriquesPontes/OpenKnowledge.git
cd OpenKnowledge

npm install
```

### 2. Run locally

```bash
npm run dev
```

Open the local Next.js origin printed in the terminal.

### 3. Production build

```bash
npm run build
npm start
```

Lint: `npm run lint`.

### 4. Environment

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Canonical origin for metadata. Defaults to `https://www.forrovivo.com`. Production is served at `https://forrovivo.com`. |
| `BEEHIIV_API_KEY` | Server. Waitlist subscriptions. |
| `BEEHIIV_PUBLICATION_ID` | Server. Beehiiv publication. |
| `API_SESSION_SECRET` | Server. Signs API Platform dashboard sessions. |
| `API_REGISTRATION_CODES` | Server. Optional comma-separated registration codes for `/api/register`. |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | Public. Cloudflare Turnstile site key for create-account. |
| `TURNSTILE_SECRET_KEY` | Server. Cloudflare Turnstile secret for siteverify. |

On Vercel, waitlist persistence uses Beehiiv. Locally, without those credentials, the waitlist writes `Join waitlist/waitlist.json` (gitignored). API Platform accounts write `API accounts/accounts.json` (gitignored) on persistent hosts; password hashes use scrypt. Create-account is unavailable on Vercel until a persistent store is wired.

---

## 🔗 Related projects (same goal, separate teams)

| Pillar | Project | Role |
|--------|---------|------|
| **Open Knowledge** | This website | Site, docs hub, API playground at `/api` |
| **Research** | Linguistic Research API | `https://api.forrovivo.com` |
| **Research** | Linguistic Research repo | Isolated datasets and methodology |
| **Learning** | Forro Vivo App | App Store. Product page at `/app` |
| Open Knowledge surface | Forro Connect | Learners with native speakers. Waitlist on `/connect` |

livlutechnologies.com is the planned company website. It is not ready yet.

---

## 🔒 Privacy & Security

- **No lexicon store** — attested entries live in the Linguistic Research API and GitHub datasets.
- **Waitlist emails** — used to notify product availability; not sold. On Vercel they go to Beehiiv when credentials exist.
- **API Platform** — passwords hashed (scrypt); session cookie is httpOnly and signed. Register uses Turnstile.
- **Public GET** — the linguistic API is readable without a key. Optional keys are issued only to a signed-in session.
- **Legal** — company, terms, privacy, and EULA at `/legal`.

Dictionary login/register permanently redirect to API Platform. They are not a separate identity system.

---

## 🗺️ Roadmap

- [ ] Persistent API Platform accounts on Vercel
- [ ] Require `API_SESSION_SECRET` in production
- [ ] Waitlist abuse controls
- [ ] Route tests for auth, lookup proxy, and isolation helpers

---

## 🤝 Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md). Pull requests for site and docs fixes are welcome; open an issue first for major changes. Lexical evidence belongs in Research, not in this repository.

**Setup for contributors:**

1. Follow Getting Started above.
2. Keep isolation: do not merge ST, CV, GW, or AO folders, and do not treat `/v1/angola` as Angolar.
3. User-facing copy belongs in `src/lib/i18n-copy.ts` (English and Portuguese). Catalog IDs stay in `src/lib/constants.ts`.
4. There is no automated test suite in this repository yet.

---

## 📄 License

**Operator:** LIVLU TECHNOLOGIES LTD · **Pillar:** Open Knowledge  

This website and repository are **proprietary**. They are **not** open source. See [LICENSE](LICENSE) and the [EULA](https://forrovivo.com/legal/eula).

**Open source applies only to the Research pillar** (Linguistic Research datasets and project-original materials: CC BY 4.0 + source terms). Linking to or displaying that data here does not relicense this site.

## Legal & contact

- Company: [forrovivo.com/legal/company](https://www.forrovivo.com/legal/company)
- Terms: [forrovivo.com/legal/terms](https://www.forrovivo.com/legal/terms) · product [TERMS.md](TERMS.md)
- Privacy: [forrovivo.com/legal/privacy](https://www.forrovivo.com/legal/privacy) · product [PRIVACY.md](PRIVACY.md)
- EULA: [forrovivo.com/legal/eula](https://www.forrovivo.com/legal/eula)
- Contact: support@forrovivo.com | geral@forrovivo.com

---

## 📚 Technical Documentation

- [CONTEXT.md](CONTEXT.md) — Implementation masterplan (phases, next work)
- [DESIGN_SYSTEM.md](DESIGN_SYSTEM.md) — Site theme tokens (`globals.css`) and UI principles
- [CONTRIBUTING.md](CONTRIBUTING.md) — How to contribute site code and docs (lexicon data goes to Research)
- [TERMS.md](TERMS.md) — Product-only terms (company umbrella: workspace `LEGAL/TERMS.md` · live site)
- [PRIVACY.md](PRIVACY.md) — Product-only privacy (company umbrella: workspace `LEGAL/PRIVACY.md` · live site)
- [TECH_REPORT.md](TECH_REPORT.md) — v1.0 baseline (isolation, playground, waitlist, hosts)
- [TECH_REPORT_v2.0.md](TECH_REPORT_v2.0.md) — v2.0 incremental report (accounts, docs hub, locale, legal)
