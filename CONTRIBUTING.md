# Contributing

**ForroVivo** is the platform and ecosystem. This repository is the **Open Knowledge** pillar: the public knowledge site, docs hub, and API playground at [forrovivo.com](https://forrovivo.com), operated by **LIVLU TECHNOLOGIES LTD**.

| Surface | Role |
|---|---|
| [ForroVivo.com](https://www.forrovivo.com) | This product (public brand + knowledge site) |
| [This GitHub repository](https://github.com/HenriquesPontes/OpenKnowledge) | Open Knowledge site (proprietary) |
| [Linguistic Research](https://github.com/Forrovivo/linguistic-research) | Open attested datasets |
| [api.forrovivo.com](https://api.forrovivo.com) | Machine-readable linguistic data |
| [ForroVivo on the App Store](https://apps.apple.com/app/id6751409176) | Learning product (separate repos) |

**Operator:** LIVLU TECHNOLOGIES LTD  
**Founder and idealist:** Henriques Pontes  
**Place in LIVLU TECHNOLOGIES:** Individual Open Knowledge team repo. Sister pillars: Learning (ForroVivo App) and Research (datasets + API).

Contribute **site code, docs, and playground fixes** here. Do not store lexical JSON in this repository. Do not add the App Store app or Research Worker into this folder.

Follow [CONTEXT.md](CONTEXT.md) for the implementation masterplan and [TECH_REPORT.md](TECH_REPORT.md) / [TECH_REPORT_v2.0.md](TECH_REPORT_v2.0.md) for shipped surfaces. Collection rules for attested data live in Research: [CONTRIBUTING.md](https://github.com/Forrovivo/linguistic-research/blob/main/CONTRIBUTING.md) and that repo’s methodology docs.

## What to contribute

- Bug fixes in App Router pages, components, and route handlers
- Documentation and copy that match live routes (EN / PT via `fv_locale`)
- Isolation-safe catalog / nav updates that do **not** merge varieties
- API playground and docs improvements that stay honest about `TERM_NOT_FOUND`
- Clear issues for broken links, locale gaps, or legal page drift

Do not contribute:

- Lexicon files, guessed translations, or AI-generated text treated as linguistic evidence
- Vocabulary copied across creoles, islands, or regions because spelling looks similar
- Merging Angola Contruy with Angolar, or mixing Umbundu / Kimbundu / Kikongo folders in the catalog
- Learning app source or Research dataset trees inside this repo
- Write endpoints here that invent translations
- Secrets, session signing keys, Turnstile secrets, or Beehiiv tokens in git

## Where to put work

| Area | Canonical path |
|---|---|
| Pages & route handlers | `src/app/` |
| UI sections / layout | `src/components/` |
| Catalog, locale, API helpers | `src/lib/` |
| Product docs | `README.md`, `CONTEXT.md`, `TECH_REPORT.md`, `TECH_REPORT_v2.0.md` |
| Legal identity | `LICENSE`, `NOTICE`, `/legal/*` routes |

Lexical data is fetched from Research / `api.forrovivo.com`. Keep country hubs as indexes, not merged dictionaries.

## How to contribute

1. Read [CONTEXT.md](CONTEXT.md) and confirm the surface you are touching.
2. Open an issue before a large PR.
3. Preserve isolation: one variety ⇒ one path. Similar spelling is not a merge reason.
4. Do not add dictionary JSON to this tree — contribute attested entries upstream in Research.
5. Keep public linguistic GET documented as usable without a key; optional API Platform keys are not a licence to invent glosses.
6. Never commit `.env` secrets or local account stores that contain real credentials.

## License and attribution

This repository is **proprietary**. Use is governed by the LIVLU TECHNOLOGIES LTD [EULA](https://www.forrovivo.com/legal/eula), [Terms](https://www.forrovivo.com/legal/terms), and [Privacy Policy](https://www.forrovivo.com/legal/privacy). See [LICENSE](LICENSE) and [NOTICE](NOTICE).

Open linguistic datasets remain under the Research repository’s licence (CC BY 4.0 for project-original materials, with third-party source terms unchanged). That open licence does **not** grant rights to this site source or product.

Contact: support@forrovivo.com | geral@forrovivo.com
