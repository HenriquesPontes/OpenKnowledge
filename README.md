# Open Knowledge

Public linguistic knowledge site for **ForroVivo**, operated by **LIVLU TECHNOLOGIES LTD**.

This repository is the Next.js website at [www.forrovivo.com](https://www.forrovivo.com). The site wordmark and metadata title are Open Knowledge. ForroVivo is the platform.

It catalogs, documents, and looks up attested Creole lexicons of São Tomé and Príncipe, Cabo Verde, Guiné-Bissau, and Angola. Lexical data is not stored here. Isolated datasets live in the Linguistic Research API and the research repository.

The Knowledge Base does not treat AI-generated information as linguistic evidence. Every documented linguistic claim should be traceable to a source. Similar spelling is not a reason to merge folders (ST, CV, GW, AO).

## What this repository is

- Isolated lexicon catalog
- Documentation
- Waitlist
- Lookup proxy into the public Linguistic Research API

Dictionary login and register collect email. They are not identity. There is no automated test suite in this repository.

This site is not the Forro Vivo App (App Store), and it does not implement machine translation. Forro Connect is on `/connect`: it connects learners with native speakers. The public CTA is the waitlist.

## Run locally

```bash
npm install
npm run dev
```

Then open the local Next.js origin. Production build: `npm run build` then `npm start`. Lint: `npm run lint`.

## Environment

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Canonical origin for metadata. Defaults to `https://www.forrovivo.com`. |
| `BEEHIIV_API_KEY` | Server. Waitlist subscriptions. |
| `BEEHIIV_PUBLICATION_ID` | Server. Beehiiv publication. |
| `CLOUDFLARE_ACCOUNT_ID` | Server. Cloudflare account. |
| `CLOUDFLARE_API_TOKEN` | Server. Cloudflare API. |
| `R2_ACCESS_KEY_ID` | Server. R2 S3 access key. |
| `R2_SECRET_ACCESS_KEY` | Server. R2 S3 secret. |
| `R2_S3_ENDPOINT` | Server. R2 S3 API origin. |

On Vercel, waitlist persistence uses Beehiiv. Locally, without those credentials, the waitlist writes `Join waitlist/waitlist.json` (gitignored).

## Related products

| Product | Role |
| --- | --- |
| Open Knowledge | This website |
| Linguistic Research API | `https://api.forrovivo.com` |
| Forro Vivo App | App Store. Product page at `/app` |
| Forro Connect | Connects learners with native speakers. Waitlist on `/connect`. |

livlutechnologies.com is the planned company website. It is not ready yet.
