# ForroVivo
## African Creole Knowledge & Language Technology Project

**Document:** Product brand story

The public website wordmark and metadata title are **Open Knowledge**. ForroVivo is the platform. LIVLU TECHNOLOGIES LTD is the operator.

> Open linguistic research. Open knowledge. Open technology.
> Building a digital foundation for African Creole languages.

---

# 1. Project Overview

## What is ForroVivo?

ForroVivo is an open research and technology initiative dedicated to documenting, preserving, structuring and expanding access to the linguistic and cultural knowledge of African Creole and contact languages.

The project began in 2023 with a focus on Forro, the Creole language of São Tomé and Príncipe.

The original idea was to use technology to make Forro easier to learn and preserve for future generations.

The project has since evolved into a broader vision:

> Build an open linguistic knowledge infrastructure for African Creole languages that can support language preservation, education, research, AI, NLP and machine translation.

ForroVivo is not only a dictionary.

It is not only a language-learning application.

It is not only a machine translation project.

It is an ecosystem combining:

- Open linguistic knowledge
- Cultural knowledge
- Research data
- Structured datasets
- Language-learning technology
- Human language teaching
- Developer APIs
- AI/NLP research
- Machine translation
- Community economic opportunities

---

# 2. Vision

## Our Vision

> Language should not disappear because technology failed to understand it.

Many African Creole and contact languages remain significantly underrepresented in modern digital technology.

Their linguistic and cultural knowledge may exist across:

- Dictionaries
- Academic publications
- Books
- Archives
- Community knowledge
- Recordings
- Historical documents
- Oral traditions
- Cultural practices

These resources can be fragmented, difficult to access and difficult for modern technology to use.

ForroVivo aims to connect this knowledge into an open, structured and traceable infrastructure.

The long-term vision is to create a platform where:

- Researchers can access reliable linguistic data.
- Developers can build applications using an API.
- Educators can create learning resources.
- Communities can contribute and preserve knowledge.
- AI researchers can build better low-resource language systems.
- Language learners can learn from real people and verified resources.
- Future generations can access knowledge that might otherwise become fragmented or disappear.

---

# 3. Founding Story

## 2023

ForroVivo began in 2023 with an idea from Henriques Pontes.

The original question was:

> How can technology help preserve and make the Forro language accessible to future generations?

Luís Lima became involved during the early brainstorming stage.

Together, they discussed and challenged the original concept, exploring what a technology platform for the language could become.

At that stage there was:

- No large knowledge base
- No public API
- No large research infrastructure
- No mature application

There was simply an idea and a desire to use technology to preserve language.

That idea evolved into ForroVivo.

---

# 4. Founders

## Henriques Pontes

### Founder & Project Lead

Henriques Pontes is a technology professional, independent developer and AI-focused project builder.

He founded ForroVivo around the idea of using technology to preserve and make accessible the linguistic heritage of São Tomé and Príncipe.

He leads:

- Project vision
- Product direction
- Technology
- Research structure
- Data architecture
- AI strategy
- Open-source development
- Platform development

His work combines technology, AI and digital preservation with a focus on underrepresented languages.

---

## Luís Lima

### Early Collaborator

Luís Lima has been involved with ForroVivo since its earliest conceptual stage in 2023.

He helped brainstorm and challenge the original project idea.

As the project developed, Luís continued to provide feedback and became an important testing and product-feedback collaborator.

His role includes:

- Early brainstorming
- Concept development
- Product feedback
- Testing
- User perspective
- Continuous iteration

---

# 5. The Core Problem

African Creole and contact languages face several connected challenges.

## Digital underrepresentation

Many languages have limited:

- Digital dictionaries
- Searchable linguistic databases
- NLP resources
- Translation systems
- Speech technology
- Educational technology
- AI training data

## Fragmented knowledge

Language information may be distributed across:

- Academic publications
- Dictionaries
- Books
- Archives
- Community knowledge
- Historical documents

## Low-resource AI

Modern AI systems are heavily influenced by the amount and quality of available digital language data.

Languages with limited datasets can therefore receive poor:

- Translation
- Speech recognition
- Text generation
- Language identification
- Spell correction
- Search support

## Risk of AI hallucination

Low-resource languages are especially vulnerable to fabricated vocabulary and incorrect translations.

An AI system can produce something that looks like a real word without any linguistic evidence.

ForroVivo addresses this with an evidence-first methodology.

---

# 6. Core Principle

## Evidence Before AI

AI should help organize and use linguistic knowledge.

It should not invent linguistic knowledge.

ForroVivo follows:

```text
Research
    ↓
Source
    ↓
Extraction
    ↓
Verification
    ↓
Structured Data
    ↓
Review
    ↓
Publication
    ↓
API / Applications
```

---

# 7. Language Isolation

Isolation is the primary data invariant. Similar spelling is not a reason to copy, merge, or infer across folders.

Open Knowledge catalogs isolated lexicons in four country folders:

| Folder | ISO | Country | Datasets |
| --- | --- | --- | --- |
| `saotome` | ST | São Tomé and Príncipe | Forro, Angolar, Lung’Ie |
| `caboverde` | CV | Cabo Verde | Kabuverdianu island varieties |
| `guinebissau` | GW | Guiné-Bissau | Regional Kriol varieties |
| `angola` | AO | Angola | Angola Contruy |

Country indexes are not merged dictionaries. `/v1/angola` is Angola Contruy. It is not Angolar / Ngola of São Tomé.

Official Portuguese of these countries is not treated as a creole lexicon.

Each variety is its own folder. Lookup and search stay inside one named dataset.

---

# 8. Ecosystem

Domain architecture is **forrovivo.com**.

ForroVivo is a product family operated by LIVLU TECHNOLOGIES LTD. The public product domain is `https://www.forrovivo.com`. Other properties are not the domain architecture.

```text
FORROVIVO.COM
├── Open Knowledge (this Next.js site)
└── Connect (learners with native speakers; waitlist at /connect)
```

The Forro Vivo App is on the App Store. It is not this domain.

The Linguistic Research API is at `https://api.forrovivo.com`.

LIVLUTECHNOLOGIES.COM is the planned institutional company website. It is not ready yet. It is not the product domain.

## LIVLUTECHNOLOGIES.COM

The planned institutional company website of LIVLU TECHNOLOGIES LTD. It is not ready yet.

Company identity today is LIVLU TECHNOLOGIES LTD, registered in England and Wales, with the filing record on Companies House. The Open Knowledge site names the company and links Companies House. It does not link livlutechnologies.com until that website is published.

This is the company layer: who operates the products, legal identity, and corporate presence. It is not the language-learning product and not the public knowledge platform.

## FORROVIVO.COM

Domain architecture: `https://www.forrovivo.com`.

### Open Knowledge

Open Knowledge is this Next.js site at `https://www.forrovivo.com`.

The site wordmark and metadata title are Open Knowledge.

This repository is:

- Catalog of isolated lexicons
- Documentation
- Waitlist
- Lookup proxy into the public Linguistic Research API

It catalogs, explains, and routes to isolated datasets hosted elsewhere. Lexical data is not stored here.

Dictionary login and register collect email through the waitlist. They are not identity. They do not issue sessions or API keys.

There is no automated test suite in this repository.

The site `metadataBase` defaults to `https://www.forrovivo.com`.

Linguistic claims remain evidence-first. AI-generated text is not treated as linguistic evidence.

### Connect

Forro Connect connects learners directly with real Forro speakers and cultural knowledge holders.

How it works: learner, native speaker, direct match, live lesson, cultural knowledge, community income.

On this Open Knowledge site the public surface is `/connect`, with a waitlist.

## App Store

The Forro Vivo App is the learning product on the App Store: dictionary, lessons, exercises and language practice. The product page on this site is `/app`. The app is not this Open Knowledge website.

---

# 9. Current Stage

## Open Knowledge (this repository)

Open Knowledge is this Next.js site at `https://www.forrovivo.com`.

This repository is catalog, docs, waitlist, and lookup proxy.

- Login is not identity.
- There is no test suite.
- Lexical data lives elsewhere: the Linguistic Research API and the research datasets, isolated in ST, CV, GW, and AO folders.

Open Knowledge is the public front door to that knowledge. It is not the Learning Engine, it is not the mobile learning app, and it does not implement machine translation. Machine translation is a ForroVivo capability in the product family. It is not a feature of this site.

## Product family

The Forro Vivo App is the learning product on the App Store.

Forro Connect connects learners with native speakers. The public surface is `/connect`, with a waitlist.

Domain architecture is forrovivo.com.

The next problem is not whether Open Knowledge can exist. The next problem is how to turn the ForroVivo platform into a sustainable business, with a clear go-to-market, a durable value proposition, and a structure that can raise capital without losing the mission.

---

# 10. What We Need

The project now needs three things.

## Strategic mentorship

Mentorship to refine:

- The business model
- Monetisation structure
- Growth roadmap
- Go-to-market strategy
- Value proposition

The goal is to validate these choices before scaling, so growth is deliberate rather than fragile.

## Specialists and technology partners

Access to people and partners who can strengthen:

- AI applied to language teaching
- User experience
- Integration with linguistic and cultural APIs

The project has global potential. It needs technical guidance and the right partners to move faster without weakening the evidence-first linguistic core.

## Fundraising support

Support through the investment process:

- Pitch
- Metrics
- Storytelling
- Financial plans
- Company structure

The objective is to prepare ForroVivo for a pre-seed round in 2026.

---

# 11. How the Work Is Done

ForroVivo is built with direct experience in digital products, especially in education, AI and culture.

The development approach follows modern startup practice:

- Fast MVP
- Short iteration cycles
- User testing
- Metrics
- Deep UX work
- Scalable architecture

This is not a side sketch. Open Knowledge is a working public site: catalog, docs, waitlist and lookup proxy, with lexical data published elsewhere. The learning app and Forro Connect are separate products in the same family.

---

# 12. Independent, Seeking a Program

ForroVivo is not currently in an incubation or acceleration program.

The project is being developed independently.

That is why a program is needed now: not to invent the product, but to add orientation, structure, networks and real acceleration so the existing platform can become a sustainable company.