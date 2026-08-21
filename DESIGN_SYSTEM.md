# Design System — Open Knowledge

> **Operator:** LIVLU TECHNOLOGIES LTD  
> **Pillar:** Open Knowledge  
> **Code source of truth:** [`src/app/globals.css`](src/app/globals.css)  
> **UI primitives:** `src/components/ui/` · layout `src/components/layout/` · sections `src/components/sections/`  
> **Locale:** English / Portuguese via `fv_locale` (`src/lib/i18n.ts`, `i18n-copy.ts`)  

Change CSS variables and `@theme` tokens in `globals.css`. Prefer shared Button / Container primitives over one-off page chrome.

---

## Place in LIVLU TECHNOLOGIES

Public knowledge site and API playground visual language. Not the Learning app cartoon chrome. Lexical evidence comes from Research — this theme must never imply invented glosses are “complete” or AI-authored.

---

## Principles

1. **Dark knowledge surface** — Default site is near-black (`#141414`) with white foreground; high contrast for reading.
2. **Forro theme accent** — `html.forro-theme` shifts to forest greens and brand ring (`#58CC02` glow) for product-flavored routes without leaving the dark family.
3. **Isolation honesty** — Maps and catalogs keep varieties separate; UI must not look like a merged pan-creole dictionary.
4. **Accessibility-first type** — Raised body scale in `@theme` (see sizes below); respect `prefers-reduced-motion`.
5. **Proprietary product chrome** — Distinct from Research open-data packaging; still links clearly to attested API results.

---

## Color tokens (`:root` / `@theme`)

| CSS variable | Default | Role |
|--------------|---------|------|
| `--background` | `#141414` | Page background |
| `--foreground` | `#ffffff` | Primary text |
| `--muted` | `#9a9a9a` | Secondary text |
| `--border` | `#2a2a2a` | Dividers / edges |
| `--surface` | `#1a1a1a` | Cards / panels |
| `--surface-alt` | `#232323` | Alternate panels |
| `--surface-elevated` | `#3a3a3a` | Elevated chrome |
| `--ring` | white 16% | Focus / emphasis |

**`html.forro-theme` overrides:** forest background `#121c17`, muted `#a6b0bd`, border `#598c6b`, surfaces green-tinted, ring `rgba(88, 204, 2, 0.35)`.

Tailwind maps these via `@theme inline` (`--color-background`, etc.).

---

## Typography

| Token | Size | Role |
|-------|------|------|
| `--text-xs` | 0.8125rem | Fine labels |
| `--text-sm` | 1rem | Small UI |
| `--text-base` | 1.125rem | Body default |
| `--text-lg` | 1.25rem | Emphasized body |
| `--text-xl` | 1.375rem | Section leads |
| `--text-2xl` | 1.625rem | Titles |
| `--text-3xl` | 2rem | Display |

- **Sans:** system UI stack (`--font-sans`)
- **Heading:** `--font-heading` (Ovo via `--font-ovo` when loaded)
- Body line-height ≈ 1.6; antialiased rendering

---

## Components & patterns

| Area | Path | Notes |
|------|------|--------|
| Button, Container | `src/components/ui/` | Prefer these |
| Navbar / Footer | `src/components/layout/` | Locale + legal links in footer |
| Maps / API / Docs shells | `src/components/sections/` | Isolation-safe catalog UI |
| Fields | `.field` in `globals.css` | Pill inputs, dark fill |

Legal and docs pages stay calm: one job per section, clear policy hierarchy, no gamified Learning chrome.

---

## Motion

- Default page background transition ≈ 700ms ease-out.
- Under `prefers-reduced-motion: reduce`, kill decorative animation / transition durations.

---

## Do not

- Merge ST / CV / GW / AO visuals into one “Africa dictionary” collage that implies one lexicon
- Style API errors as success; keep `TERM_NOT_FOUND` honest
- Drop Learning mascot cartoon extrusion onto the marketing site unless a product page explicitly needs it
- Commit one-off hex for brand greens outside `globals.css` theme variables
- Store lexicon JSON in this repo to “match the design”

---

*Implementation tracker: [CONTEXT.md](CONTEXT.md). Spec: [TECH_REPORT.md](TECH_REPORT.md).*
