import type { Locale } from "./i18n";
import {
  hero as heroEn,
  africaMap as africaMapEn,
  architecture as architectureEn,
  apiSection as apiSectionEn,
  cloneSection as cloneSectionEn,
  appLanding as appLandingEn,
  appWhy as appWhyEn,
  appVision as appVisionEn,
  appFaq as appFaqEn,
  appCredits as appCreditsEn,
  appRoadmap as appRoadmapEn,
  connectArchitecture as connectArchitectureEn,
  connectIncome as connectIncomeEn,
  productOverview as productOverviewEn,
  translationArchitecture as translationArchitectureEn,
  translationPage as translationPageEn,
  docsProducts as docsProductsEn,
  openKnowledgeDocsNav as openKnowledgeDocsNavEn,
  appDocsNav as appDocsNavEn,
  connectDocsNav as connectDocsNavEn,
  principle as principleEn,
  legalNav as legalNavEn,
  careersPage as careersPageEn,
} from "./constants";

function copyNav(
  nav: readonly {
    readonly heading: string;
    readonly links: readonly { readonly label: string; readonly href: string }[];
  }[],
) {
  return nav.map((group) => ({
    heading: group.heading,
    links: group.links.map((link) => ({ label: link.label, href: link.href })),
  }));
}

function copyLegalNav(
  items: readonly {
    readonly label: string;
    readonly href: string;
    readonly description: string;
  }[],
) {
  return items.map((item) => ({
    label: item.label,
    href: item.href,
    description: item.description,
  }));
}

function copyArchitecture() {
  return {
    title: architectureEn.title,
    description:
      "Evidence before generation. Missing data is preferable to incorrect data.",
    steps: architectureEn.steps.map((step) => ({ ...step })),
    tree: {
      root: { ...architectureEn.tree.root },
      products: architectureEn.tree.products.map((product) => ({
        label: product.label,
        href: product.href,
        items: product.items.map((item) => ({ ...item })),
      })),
      outcomes: architectureEn.tree.outcomes.map((item) => ({ ...item })),
    },
  };
}

function copyAppWhy() {
  return {
    title: appWhyEn.title,
    photoCredit: { ...appWhyEn.photoCredit },
    cards: appWhyEn.cards.map((card) => ({ ...card })),
  };
}

function copyAppFaq() {
  return {
    title: appFaqEn.title,
    items: appFaqEn.items.map((item) => ({ ...item })),
  };
}

function copyAppCredits() {
  return {
    title: appCreditsEn.title,
    description: appCreditsEn.description,
    people: appCreditsEn.people.map((person) => ({ ...person })),
    groups: appCreditsEn.groups.map((group) => ({
      title: group.title,
      body: group.body,
      people: group.people.map((person) => ({ ...person })),
      href: "href" in group ? group.href : undefined,
      linkLabel: "linkLabel" in group ? group.linkLabel : undefined,
    })),
    sections: appCreditsEn.sections.map((section) => ({ ...section })),
  };
}

function copyAppRoadmap() {
  return {
    title: appRoadmapEn.title,
    description: appRoadmapEn.description,
    steps: appRoadmapEn.steps.map((step) => ({ ...step })),
  };
}

function copyConnectArchitecture() {
  return {
    title: connectArchitectureEn.title,
    description: connectArchitectureEn.description,
    steps: connectArchitectureEn.steps.map((step) => ({ ...step })),
  };
}

function copyConnectIncome() {
  const src = connectIncomeEn;
  return {
    title: src.title,
    href: src.href,
    eyebrow: src.eyebrow,
    description: src.description,
    body: src.body,
    image: { ...src.image },
    flowTitle: src.flowTitle,
    flowDescription: src.flowDescription,
    flow: src.flow.map((item) => ({ ...item })),
    partiesTitle: src.partiesTitle,
    parties: src.parties.map((item) => ({ ...item })),
    breakdownTitle: src.breakdownTitle,
    breakdown: src.breakdown.map((item) => ({ ...item })),
    howTitle: src.howTitle,
    how: src.how.map((item) => ({ ...item })),
    notTitle: src.notTitle,
    not: src.not.map((item) => ({ ...item })),
    outcomesTitle: src.outcomesTitle,
    outcomes: src.outcomes.map((item) => ({ ...item })),
    compareTitle: src.compareTitle,
    compare: src.compare.map((item) => ({ ...item })),
  };
}

function copyProductOverview() {
  const src = productOverviewEn;
  return {
    eyebrow: src.eyebrow,
    title: src.title,
    description: src.description,
    statement: {
      lines: src.statement.lines.map((line) =>
        line.map((part) => ({ ...part })),
      ),
    },
    photoCredit: { ...src.photoCredit },
    collage: src.collage.map((item) => ({ ...item })),
    products: src.products.map((item) => ({ ...item })),
  };
}

function copyTranslationArchitecture() {
  return {
    title: translationArchitectureEn.title,
    description: translationArchitectureEn.description,
    steps: translationArchitectureEn.steps.map((step) => ({ ...step })),
  };
}

function copyTranslationPage() {
  const src = translationPageEn;
  return {
    eyebrow: src.eyebrow,
    headline: src.headline,
    headlineClose: src.headlineClose,
    description: src.description,
    questionsTitle: src.questionsTitle,
    questionsBody: src.questionsBody,
    questionsCta: src.questionsCta,
    questionsHref: src.questionsHref,
    releasesTitle: src.releasesTitle,
    releases: src.releases.map((item) => ({ ...item })),
    wellBeing: src.wellBeing,
    links: src.links.map((item) => ({ ...item })),
  };
}

function copyDocsProducts() {
  return {
    title: docsProductsEn.title,
    description: docsProductsEn.description,
    products: docsProductsEn.products.map((item) => ({ ...item })),
  };
}

function copyCareersPage() {
  return {
    title: careersPageEn.title,
    description: careersPageEn.description,
    applyLabel: careersPageEn.applyLabel,
    viewLabel: careersPageEn.viewLabel,
    roles: careersPageEn.roles.map((role) => ({
      id: role.id,
      title: role.title,
      team: role.team,
      location: role.location,
      summary: role.summary,
      about: [...role.about],
      responsibilities: [...role.responsibilities],
      requirements: [...role.requirements],
      applyHref: role.applyHref,
    })),
  };
}

const en = {
  hero: {
    headline: heroEn.headline,
    subheadline: heroEn.subheadline,
    waitlistPlaceholder: heroEn.waitlistPlaceholder,
    waitlistCta: heroEn.waitlistCta,
    joining: "Joining…",
    success: "You're on the list. We'll be in touch.",
    error: "Something went wrong. Please try again.",
  },
  africaMap: {
    title: africaMapEn.title,
    subtitle: africaMapEn.subtitle,
    interactiveMapAria: "Interactive map of Africa",
    countryFallback: "Country",
  },
  architecture: copyArchitecture(),
  apiSection: {
    title: apiSectionEn.title,
  },
  cloneSection: {
    cta: cloneSectionEn.cta,
    copy: "Copy",
    copied: "Copied",
  },
  appLanding: {
    title: appLandingEn.title,
    titleLines: [...appLandingEn.titleLines],
    description: appLandingEn.description,
    storeCta: appLandingEn.storeCta,
    playCta: appLandingEn.playCta,
    seoTitle: appLandingEn.seoTitle,
    seoDescription: appLandingEn.seoDescription,
    phoneAlt: "Forro Vivo on iPhone",
  },
  appWhy: copyAppWhy(),
  appVision: { ...appVisionEn },
  appFaq: copyAppFaq(),
  appCredits: copyAppCredits(),
  appRoadmap: copyAppRoadmap(),
  connectArchitecture: copyConnectArchitecture(),
  connectIncome: copyConnectIncome(),
  connectPage: {
    title: "Forro Connect",
    description:
      "While ForroVivo uses technology to help people discover and learn Forro, Forro Connect connects learners directly with real Forro speakers and cultural knowledge holders.",
    incomeCta: "Community income breakdown",
  },
  productOverview: copyProductOverview(),
  translationArchitecture: copyTranslationArchitecture(),
  translationPage: copyTranslationPage(),
  docsProducts: copyDocsProducts(),
  openKnowledgeDocsNav: copyNav(openKnowledgeDocsNavEn),
  appDocsNav: copyNav(appDocsNavEn),
  connectDocsNav: copyNav(connectDocsNavEn),
  principle: principleEn,
  legalNav: copyLegalNav(legalNavEn),
  careersPage: copyCareersPage(),

  about: {
    eyebrow: "About",
    title: "ForroVivo",
    p1: "ForroVivo documents, preserves, and structures African Creole languages, and makes them accessible to new generations. Open Knowledge is this site: the public home of that work.",
    p2: "Every language is documented on its own terms, never mixed into another, and never separated from the culture it belongs to. Where AI supports learning, the language knowledge underneath stays tied to real sources.",
    ctaHome: "Open Knowledge",
    ctaLanguages: "Browse languages",
    ctaGithub: "Contribute on GitHub",
    principles: [
      {
        title: "One language, one lexicon",
        body: "Every language and variety is documented separately, with its own sources and context.",
      },
      {
        title: "Cultural responsibility",
        body: "Community knowledge is published with rights and attribution, and stays connected to the people who hold it.",
      },
      {
        title: "Evidence before output",
        body: "Every claim is traceable to a source. A missing entry is better than an invented one.",
      },
      {
        title: "Open access",
        body: "A public API and open datasets for research, education, and language technology.",
      },
    ],
  },
  languagesPage: {
    title: "Languages",
    headline: "Every language on its own terms",
    defaultBody:
      "The languages of São Tomé and Príncipe, Cabo Verde, Guiné-Bissau, and Angola. Each language and variety is documented separately, never mixed.",
    resultsBodyPrefix: "Results for “",
    resultsBodySuffix: "”.",
    searchPlaceholder: "Search a country or variety",
    searchCta: "Search",
    empty: "No language matched that search.",
  },
  dictionariesPage: {
    title: "Dictionaries",
    headline: "Online dictionaries",
    intro:
      "Search words in Forro, Angolar, Lung’Ie, Cabo Verdean island varieties, Guinea-Bissau Kriol, Umbundu, Kimbundu, and Kikongo. Each language has its own dictionary, built from real sources.",
  },
  researchPage: {
    title: "Research",
    headline: "The evidence behind the languages",
    founder:
      "Linguistic research is where ForroVivo began, founded by Henriques Pontes with early collaborator Luís Lima.",
    evidence:
      "This is the public evidence layer for Forro, Angolar, Lung’Ie, Kabuverdianu island varieties, Guinea-Bissau Kriol, and Umbundu, Kimbundu, and Kikongo of Angola. Every entry should be traceable to a source. Third-party dictionaries and papers keep their original licenses. Open-source licensing applies to Linguistic Research project-original materials (CC BY 4.0). This Open Knowledge website is proprietary.",
    methodologyCta: "Methodology",
    bibliographyCta: "Bibliography on GitHub",
  },
  languageDetail: {
    breadcrumb: "Languages",
    lexicalAcrossFolders: "lexical entries across isolated folders",
    isoLabel: "ISO 639-3",
    datasetLabel: "Dataset",
    lexicalEntriesLabel: "Lexical entries",
    openApi: "Open in the API",
    viewGithub: "View dataset on GitHub",
    downloadJson: "Download JSON via API",
  },
  countries: {
    saotome: "São Tomé and Príncipe",
    caboverde: "Cabo Verde",
    guinebissau: "Guiné-Bissau",
    angola: "Angola",
  },
  waitlist: {
    joining: "Joining…",
    successHome: "You're on the list. We'll be in touch.",
    successConnect:
      "You're on the Forro Connect waitlist. We'll be in touch.",
    error: "Something went wrong. Please try again.",
    emailPlaceholder: "Email",
    joinCta: "Join waitlist",
  },
  featureGrid: {
    lexicalAcrossFolders: "lexical entries",
    lexicalEntries: "lexical entries",
    publishedTitle: "Published entries by language",
    publishedBody:
      "Each bar is one language or variety. Colour is the country it belongs to. Hover a bar to read the name; click a country node to isolate that cluster.",
    mostDocumented: "Most documented",
    leastDocumented: "Least documented",
    entriesByCountry: "Entries by country",
    sourceFootnote:
      "Source: ForroVivo Linguistic Research API · isolated lexicons only",
    isolationTitle: "Isolation is the method",
    isolationBody:
      "São Tomé, Cabo Verde, Guiné-Bissau, and Angola stay separate indexes. Varieties inside a country still keep their own folders. Close spelling is not a reason to merge.",
    graphTitle: "Knowledge graph of isolated communities",
    graphBody:
      "Colour is community. Label size follows published volume. Drag a node, hover to see neighbours, click a lexicon to open it. There are no edges between countries.",
    graphFootnote:
      "Colour marks country community. Size marks published lexical entries. Weights mark co-membership in the same isolated index, never a merged lexicon.",
    flowAria:
      "Published lexical entries by isolated lexicon, flowing into country nodes",
    networkAria:
      "Isolation network of countries, lexicons, and knowledge fields",
  },
  dictionarySearch: {
    exactMatch: "Exact match",
    spellingMatch: "Spelling match",
    accentMatch: "Match ignoring accents",
    orthography: "Orthography",
    semanticCategory: "Semantic category",
    regionalNote: "Regional note",
    usage: "Usage",
    notes: "Notes",
    crossLanguage: "Cross-language relation",
    lexicalEntry: "Lexical entry",
    senseOf: "Sense {index} of {total}",
    untitled: "Untitled entry",
    recording: "Recording",
    confidence: "confidence",
    portuguese: "Portuguese",
    english: "English",
    example: "Example",
    grammar: "Grammar",
    culturalContext: "Cultural context",
    etymology: "Etymology",
    variants: "Variants",
    synonyms: "Synonyms",
    relatedTerms: "Related terms",
    appearsIn: "Appears in",
    related: "Related",
    recordings: "Recordings",
    source: "Source",
    documentedOccurrence: "Documented occurrence",
    resultsFor: "Results for “{query}”",
    lookupResults: "Lookup results",
    sense: "sense",
    senses: "senses",
    in: "in",
    noEntry: "No entry found for that word in this dictionary.",
    lookupFailed: "The dictionary could not complete that lookup.",
    ariaDictionary: "Dictionary",
    placeholder: "Search a word",
    lookingUp: "Looking up…",
    lookUp: "Look up",
  },
  apiAuth: {
    workEmail: "Work email",
    email: "Email",
    registrationCode: "Registration code",
    optional: "Optional",
    apply: "Apply",
    password: "Password",
    repeatPassword: "Repeat password",
    placeholderEmail: "name@company.com",
    placeholderPassword: "12+ · number · symbol",
    agreeCreate:
      "By creating an account you agree to the terms, privacy policy, and EULA.",
    agreeLogin:
      "By continuing, you agree to the terms, privacy policy, and EULA.",
    staySignedIn: "Save email and stay signed in on this device",
    creating: "Creating account…",
    signingIn: "Signing in…",
    createAccount: "Create account",
    signIn: "Sign in",
    signUp: "Sign up",
    platformTitle: "API Platform",
    signInTitle: "Sign in to API Platform",
    createTitle: "Create your API account",
    subtitle: "Use your email and password to open the dashboard.",
    noAccount: "Don't have an account?",
    haveAccount: "Already have an account?",
    docs: "Docs",
    home: "Open Knowledge home",
    marketingTitle: "Where attested Forro data becomes callable.",
    marketingBody: "ForroVivo Linguistic Research API",
    documentation: "Documentation",
    emailRequired: "Email cannot be blank.",
    passwordRequired: "Password cannot be blank.",
    passwordMismatch: "Passwords do not match.",
    turnstileRequired: "Complete the human verification challenge.",
    invalidValue: "Invalid value.",
    couldNotContinue: "Could not continue.",
    couldNotCreate: "Could not create an account.",
    couldNotSignIn: "Could not sign in.",
  },
  apiPlatform: {
    logIn: "Log in",
    createAccount: "Create an account",
    checkingSession: "Checking session…",
  },
  apiDashboard: {
    opening: "Opening dashboard…",
    dashboard: "Dashboard",
    platform: "API Platform",
    signedInAs: "Signed in as",
    signOut: "Sign out",
    yourKey: "Your API key",
    shownOnce: "Shown once when you create or replace it.",
    activePrefix: "Active key prefix:",
    copyKey: "Copy this key now",
    howToUse: "How to use this key",
    issuing: "Issuing…",
    replaceKey: "Replace API key",
    getKey: "Get API key",
    tryApi: "Try the API",
    issueFailed: "The API could not issue a key.",
  },
  apiExplorer: {
    tryApi: "Try the API",
    headword: "Headword",
    searchQuery: "Search query",
    running: "Running…",
    run: "Run",
    emptyBody: "Run a request to see the JSON from one isolated dataset.",
    emptyResponse: "Empty response.",
    failed:
      "The dictionary API could not complete that request from this site.",
    routeAria: "API route",
    lexiconAria: "Isolated lexicon",
  },
  docsShell: {
    allProducts: "← All products",
    openKnowledge: "Open Knowledge",
    forroVivoApp: "Forro Vivo App",
    forroConnect: "Forro Connect",
  },
  productShowcase: {
    copy: "Copy",
    copied: "Copied",
  },
  layout: {
    skipToContent: "Skip to content",
    homeAria: "Forro Vivo home",
  },
  common: {
    credits: "Credits",
    forroVivoApp: "Forro Vivo App",
    forroConnect: "Forro Connect",
    surface: "Surface",
    openDocumentation: "Open documentation →",
    careersBreadcrumb: "Careers",
    aboutTheRole: "About the role",
    whatYouWillDo: "What you will do",
    whatWeLookFor: "What we look for",
    howToApply: "How to apply",
    applyBody:
      "Send a short note about why this role fits your work, with a CV or portfolio link. We read every application.",
  },
  docsHub: {
    openDocsCta: "Open documentation →",
  },

  docsOpenKnowledge: {
    title: "Open Knowledge",
    description:
      "Public linguistic knowledge site for ForroVivo. Isolated lexicons, attested sources, and a read-only API.",
    quickstartTitle: "Developer quickstart",
    quickstartBody:
      "Make your first API request in minutes. Full auth, errors, and routes live only in the API reference.",
    getStarted: "Get started",
    createApiKey: "Create API key",
    mockBody: "Returns every published lexicon with entry counts.",
    explore: "Explore",
    apiDocsTitle: "API documentation",
    apiDocsBody:
      "The source of truth for /v1 on the Linguistic Research API host: authentication, errors, lookup, search, and every route.",
    openApiDocs: "Open API documentation →",
    methodologyTitle: "Methodology",
    readMethodology: "Read methodology →",
    languages: "Languages",
    viewGithub: "View source on GitHub",
  },
  docsQuickstart: {
    title: "Quickstart",
    introBefore: "Three calls to get started. Rules for keys, errors, CORS, and naming are only in the",
    apiReferenceLink: "API reference",
    introAfter: ".",
    step1: "1. List languages",
    step1Body: "Catalog of published lexicons.",
    step2: "2. Look up a headword in one dataset",
    step2Body:
      "Exact matches from one dataset only, for example saotome/forro or angola/umbundu.",
    step3: "3. Search inside one dataset",
    step3Body:
      "Both dataset= and q= are required. Search never crosses datasets.",
    apiDocumentation: "API documentation",
    apiPlatform: "API Platform",
  },
  docsMethodology: {
    title: "Methodology",
    subtitle: "Evidence before generation",
    p1: "This is retrieval and verification, not generative translation. Never invent a gloss, infer a missing word, creolize Portuguese, or copy a form from one folder into another because the spelling looks close.",
    p2: "Forro, Angolar and Lung’Ie are documented as independent systems. Cabo Verde is one island, one folder. Guinea-Bissau is one region, one folder. Angola is Umbundu, Kimbundu, and Kikongo, each in its own folder; the Angola country index is not Angolar. Official Portuguese of these countries is not a creole lexicon in this knowledge base.",
    p3: "If evidence does not exist, the field stays empty. A missing translation is better than a guessed one. Disagreements are recorded, not silently resolved.",
    githubCta: "Full methodology on GitHub",
  },
  docsApp: {
    title: "Forro Vivo App",
    description:
      "The first learning app for African Creole languages, starting with Forro of São Tomé and Príncipe.",
    getAppTitle: "Get the app",
    getAppBody:
      "Dictionary, lessons, and exercises on the App Store. This documentation covers product scope; Open Knowledge holds the public lexicons and API.",
    downloadCta: "Download on the App Store",
    productPage: "Product page",
    explore: "Explore",
    roadmapTitle: "Roadmap",
    roadmapBody: "What ships next for the learning app.",
    openRoadmap: "Open roadmap →",
    creditsTitle: "Credits",
    creditsBody: "People and sources behind the app experience.",
    openCredits: "Open credits →",
  },
  docsConnect: {
    title: "Forro Connect",
    waitlistTitle: "Join the waitlist",
    waitlistBody:
      "Connect learners with real Forro speakers and cultural knowledge holders. Product details and signup live on the Forro Connect page.",
    joinWaitlist: "Join waitlist",
    productPage: "Product page",
    explore: "Explore",
    howItWorksTitle: "How it works",
    howItWorksBody: "The learner-to-speaker path on the product page.",
    openHowItWorks: "Open how it works →",
    incomeBody:
      "How a paid live lesson pays the speaker and funds the project.",
    openBreakdown: "Open breakdown →",
  },
  docsApiReference: {
    title: "API documentation",
    intro:
      "Full documentation for the ForroVivo Linguistic Research API. This page is the source of truth. Quickstart shows first calls only.",
    baseUrlTitle: "Base URL",
    baseUrlBody:
      "Production host is the Linguistic Research API origin. All data routes live under /v1. The site root redirects to /v1. Curl and other clients call this host directly. The website playground at /api proxies through /api/v1 on forrovivo.com for the browser UI only.",
    principlesTitle: "Principles",
    principlesP1:
      "The API is read-only for lexicon data. It does not invent translations, merge languages, or write into datasets. Missing data is preferable to incorrect data. Each path serves one isolated dataset. Parent country indexes are not merged dictionaries.",
    principlesP2:
      "Gloss fields are concepts the headword means. They are not proof that the word belongs to Portuguese or English.",
    versioningTitle: "Versioning",
    versioningBody:
      "Responses send API-Version: v1. The identity document at GET /v1 includes api (the URL family) and version (the release). Breaking changes ship under a new family, not by silently changing /v1 behaviour.",
    namingTitle: "Endpoint naming",
    namingBody:
      "Lexicons use /v1/{family}/{variety}/{collection}. Country indexes are /v1/{family} and list child lexicons; they are not lookup targets for headwords.",
    namingBullets: [
      "Look up Forro at /v1/saotome/forro/lookup",
      "Look up Umbundu at /v1/angola/umbundu/lookup",
      "Do not look up at /v1/angola/lookup — that is the country index path shape, not a merged Angola lexicon",
      "Angolar of São Tomé is /v1/saotome/angolar, not Angola",
    ],
    authenticationTitle: "Authentication",
    authenticationP1:
      "Public GET, HEAD, and OPTIONS work without a key. Optional keys identify your client. Create an account at /api/register, sign in at /api/login, then get or replace a key in the API Platform dashboard. Keys are shown once.",
    authenticationP2:
      "Send the key as Authorization: Bearer <key> or X-Api-Key: <key>. Keys use the fv_live_ prefix. POST /v1/keys issues or replaces a key for an email; replacing invalidates the previous key.",
    authenticationMock:
      "Same lookup response. The key identifies the client; public GET still works without it.",
    headersTitle: "Response headers",
    headersBullets: [
      "API-Version — URL family, currently v1",
      "Link — rel=index, rel=describedby (OpenAPI), rel=source (GitHub), rel=license",
      "RateLimit-Policy — fair-use policy for this deployment",
      "RateLimit-Limit — when present, the applied limit",
      "Retry-After — seconds to wait after RATE_LIMITED",
    ],
    corsTitle: "CORS",
    corsBody:
      "Browser clients may call the API from any origin. Credentials are not used. Preflight allows GET, HEAD, POST (keys), and OPTIONS. Exposed headers include API-Version, Link, and rate-limit headers.",
    rateLimitsTitle: "Rate limits",
    rateLimitsBody:
      "Fair-use limits apply per client. When a client exceeds the policy the API returns 429 with code RATE_LIMITED and Retry-After. Always read RateLimit-Policy on the response rather than hard-coding a budget. Health and OpenAPI paths stay exempt.",
    attributionTitle: "Source attribution",
    attributionBody:
      "Every linguistic claim stays tied to a cited source. Lookup envelopes include an attribution object (dataset, GitHub tree, sources path, license). Each entry carries source and graph.documented_by when present. Linguistic Research project materials are CC BY 4.0. Source extracts keep their original terms. This website remains proprietary under the LIVLU EULA.",
    paginationTitle: "Pagination",
    paginationBody:
      "List routes such as entries accept offset (default 0) and limit. Stay within the server’s accepted range; oversized values are clamped. Responses include the page of items for that dataset only.",
    errorsTitle: "Errors",
    errorsIntro:
      "Error bodies use a stable code and a human message. Common codes:",
    errorsBullets: [
      "TERM_NOT_FOUND — no matching headword in that dataset",
      "DATASET_NOT_FOUND — unknown family or variety path",
      "DATASET_REQUIRED — search called without dataset=",
      "QUERY_REQUIRED — search called without q=",
      "RATE_LIMITED — fair-use limit exceeded (429)",
    ],
    catalogTitle: "Catalog",
    catalogBody:
      "GET /v1 returns service identity and links. GET /v1/languages lists isolated lexicons (not country indexes). GET /v1/datasets lists published datasets including indexes. GET /v1/kb maps Knowledge Base collections.",
    catalogMock:
      "One object per isolated lexicon, with entry counts per dataset.",
    lookupTitle: "Lookup",
    lookupP1:
      "GET /v1/{family}/{variety}/lookup?headword= returns exact matches from that dataset only. Required query: headword. The envelope includes dataset, attribution, query, match, count, and entries.",
    lookupP2:
      "Each entry may include headword, orthography, part of speech, translations, examples, pronunciation, source fields, verification status, graph edges, and audio links. Empty fields stay null or empty arrays — they are never invented.",
    searchTitle: "Search",
    searchP1:
      "GET /v1/search?dataset={family}/{variety}&q= searches inside one named dataset. Both dataset and q are required. Search never crosses datasets.",
    searchP2:
      "Dataset-scoped search also exists at GET /v1/{family}/{variety}/search?q= and covers entries, knowledge, and sources inside that dataset.",
    searchMock:
      "Hits from that dataset only. Missing dataset returns DATASET_REQUIRED.",
    entriesTitle: "Entries",
    entriesBody:
      "GET /v1/{family}/{variety}/entries lists lexical entries for one dataset. Optional q, offset, and limit. Fetch one record with /entries/{entry_id}.",
    knowledgeTitle: "Knowledge and sources",
    knowledgeBody:
      "GET /v1/{family}/{variety}/sources returns the bibliography for that dataset. Knowledge collections such as grammar return attested records or an empty list until a cited source fills them. Country-level collection indexes list paths per isolated dataset; they do not merge records.",
    audioTitle: "Audio",
    audioBody:
      "When an entry includes audio, each clip points at /v1/{family}/{variety}/audio/{filename}. Files stay inside the same isolated dataset as the entry.",
    webUiTitle: "Web UI",
    webUiBody:
      "API Platform on this site is /api. Sign in at /api/login for the dashboard and optional key. The live try form sends requests through /api/v1 on this origin, then to the Linguistic Research API. First examples are in Quickstart.",
    openapiTitle: "OpenAPI contract",
    openapiBody:
      "Machine-readable contract at /v1/openapi.yaml. Research repository is on GitHub.",
    routesTitle: "Routes",
    routesBody:
      "Country families include saotome, caboverde, guinebissau, angola, and the other published country indexes. Indexes are not merged lexicons.",
    ctaQuickstart: "Quickstart",
    ctaPlatform: "API Platform",
    ctaOpenapi: "OpenAPI YAML",
  },
  legalOverview: {
    title: "Legal",
    intro:
      "Policies for Open Knowledge, Linguistic Research, the Forro Vivo App, and Forro Connect — operated by LIVLU TECHNOLOGIES LTD.",
  },
  legalLayout: {
    title: "Legal",
    policies: "Policies",
  },

  legalCompany: {
    title: "Company",
    intro: "Who operates ForroVivo, and how the products relate to each other.",
    p1BeforeHouse: "LIVLU TECHNOLOGIES LTD is a private limited company registered in England and Wales. Company number 16799761. You can confirm the filing record on",
    companiesHouse: "Companies House",
    p1AfterHouse: ".",
    p2: "ForroVivo is the platform name used by LIVLU TECHNOLOGIES LTD. It covers the work of documenting, preserving, and structuring African Creole languages, and making them accessible to new generations.",
    familyTitle: "The product family",
    openKnowledge:
      "Open Knowledge is this public website: languages, dictionaries, documentation, and the API Platform. It is the public home of the ForroVivo Linguistic Research work.",
    linguisticResearch:
      "Linguistic Research is the evidence layer behind the products: isolated lexicons, attested sources, methodology, and the read-only Linguistic Research API. Every linguistic claim is meant to stay traceable to a source.",
    forroVivoApp:
      "Forro Vivo App is the learning product for African Creole languages, starting with Forro of São Tomé and Príncipe. It provides dictionary, lessons, and exercises. It is software learning — not a replacement for a native speaker.",
    forroConnect:
      "Forro Connect connects learners with real Forro speakers and cultural knowledge holders for live lessons. Teaching time is the product. Community income for speakers is part of how Connect is designed to work.",
    apiPlatform:
      "API Platform is the developer surface on this site for keys and live requests against the Linguistic Research API. Full rules live in Documentation.",
    marksTitle: "Marks and naming",
    marksBody:
      "The ForroVivo name, Open Knowledge, Forro Vivo, Forro Connect, and related marks are used by LIVLU TECHNOLOGIES LTD. Use that does not confuse the public about who operates the products, or that suggests endorsement without permission, is not allowed.",
    questionsTitle: "Questions",
    questionsBefore: "For company and compliance questions,",
    writeToLegal: "write to legal",
    questionsAfter: ".",
  },
  legalTerms: {
    title: "Terms of service",
    intro: "The rules for using ForroVivo products and this website.",
    opening:
      "By using this website, joining a waitlist, creating an API Platform account, downloading or using the Forro Vivo App, or joining Forro Connect, you agree to these terms. If you use a product on behalf of an organisation, you confirm that you are allowed to bind that organisation.",
    researchTitle: "Open Knowledge and Linguistic Research",
    researchP1:
      "Open Knowledge publishes public linguistic knowledge for African Creole languages and related language work, including isolated lexicons and documentation. Linguistic Research is the evidence layer: sources, methodology, and the read-only Linguistic Research API.",
    researchP2:
      "You may use published data and the API for research, education, language learning, and language technology that respects dataset isolation. You must not invent, merge, or substitute lexical data across languages or varieties. You must not present generated or guessed forms as attested evidence from ForroVivo.",
    researchP3:
      "The knowledge base is not legal, medical, immigration, or official government advice. Empty fields mean evidence was not published — they are not an invitation to invent content.",
    appTitle: "Forro Vivo App",
    appP1:
      "The Forro Vivo App is a learning product: dictionary, lessons, and exercises, starting with Forro of São Tomé and Príncipe. It is software learning. It does not replace a native speaker, and it is not Forro Connect.",
    appP2:
      "You must use the app lawfully and in line with the App Store or other platform terms that apply to your download. You must not reverse engineer, scrape, or redistribute the app in a way that breaks those platform rules or these terms. Voice, audio, and other capabilities arrive according to the product roadmap and may change as the app develops.",
    connectTitle: "Forro Connect",
    connectP1:
      "Forro Connect matches learners with real Forro speakers and cultural knowledge holders for live lessons. The lesson is the product. Speakers are paid for teaching time. Cultural knowledge shared in a lesson remains with the speaker; Connect is not a marketplace that sells the language itself as a commodity.",
    connectP2:
      "Waitlist registration does not guarantee a match or a lesson time. When booking and payment open, the price and what it covers are shown before you pay. Learners and speakers must treat each other with respect. Harassment, fraud, or misuse of Connect may result in removal from the waitlist or service.",
    apiTitle: "API Platform",
    apiP1:
      "API Platform accounts are for operating keys and trying the Linguistic Research API. Keys identify your client. Public read access may still work without a key, subject to fair-use limits. You must keep keys secret, not share them publicly, and not use the API to attack, overload, or misrepresent the service.",
    apiP2Before: "Full authentication, errors, rate limits, and routes are defined in",
    documentation: "Documentation",
    apiP2After: ". Those technical rules form part of these terms for API use.",
    acceptableTitle: "Acceptable use",
    acceptableBody:
      "You must not attempt to disrupt the service, bypass access controls, harvest personal data, or use ForroVivo products in a way that harms speakers, sources, or the integrity of Linguistic Research. LIVLU TECHNOLOGIES LTD may suspend or close accounts, revoke keys, or refuse service when these terms are broken or abuse is suspected.",
    pricingTitle: "Pricing and billing",
    pricingBefore:
      "Free products on this site do not require payment. When a paid product or live lesson is offered, pricing is shown at the point of purchase or booking. For invoices, receipts, refunds, or payment questions,",
    contactBilling: "contact billing",
    pricingAfter: ".",
    liabilityTitle: "Liability",
    liabilityBody:
      "The site, research data, app, Connect, and API are provided so that people can learn, research, and build with care. To the fullest extent allowed by law, LIVLU TECHNOLOGIES LTD is not liable for indirect or consequential loss arising from use of the products. Nothing in these terms limits liability that cannot be limited under the laws of England and Wales.",
    governingTitle: "Governing law",
    governingBefore: "These terms are governed by the laws of England and Wales. For questions about these terms,",
    writeToLegal: "write to legal",
    governingAfter: ".",
  },
  legalPrivacy: {
    title: "Privacy",
    intro:
      "How LIVLU TECHNOLOGIES LTD handles personal data across ForroVivo products.",
    opening:
      "This policy explains what we collect, why we collect it, and how to reach us. It covers Open Knowledge, Linguistic Research surfaces on this site, waitlists, the API Platform, and related ForroVivo product pages. The Forro Vivo App and Forro Connect may also process data needed to deliver those products, as described below.",
    whoTitle: "Who is responsible",
    whoBody:
      "LIVLU TECHNOLOGIES LTD operates ForroVivo products and is responsible for personal data processed through this website and the related product surfaces described here. Registered in England and Wales. Company number 16799761.",
    whatTitle: "What we collect",
    waitlists:
      "Waitlists. If you join a waitlist for Open Knowledge, Forro Connect, dictionaries, or the API Platform, we process the email address you submit and which product waitlist you joined, so we can tell you when that product is available.",
    accounts:
      "API Platform accounts. If you create an account, we process your email address and authentication credentials to operate the account, issue or replace API keys, and protect the service. We may also process registration codes when you apply one.",
    logs:
      "Technical logs. Server logs may include IP address, request metadata, and similar technical data needed for security, reliability, and abuse prevention.",
    app:
      "Forro Vivo App. The learning app may process account or device information required by the App Store or other platforms, and in-app preferences needed to deliver dictionary, lessons, and exercises. Linguistic content in the app is language data, not a profile of your private life.",
    connect:
      "Forro Connect. When Connect is active, we process the information needed to match learners and speakers, schedule live lessons, and operate community income for teaching time. That may include contact details and lesson-related information you provide.",
    researchTitle: "Linguistic Research data",
    researchBody:
      "The Linguistic Research API and public lexicons are language documentation resources. They are not designed to collect personal profiles. We do not use the public research API to build advertising profiles. Attested linguistic entries remain tied to sources; they are not treated as personal data about end users of this site.",
    whyTitle: "Why we process data",
    whyBody:
      "We process personal data to provide the products you ask for, to communicate about waitlists and accounts, to secure the service, to meet legal obligations, and to improve reliability. When a newsletter or email provider is configured, waitlist addresses may also be sent to that provider so we can reach you about the product you joined.",
    sharingTitle: "Sharing",
    sharingBody:
      "We do not sell personal data. We may use processors that help us run email, hosting, security, or payment flows. Platform partners such as the App Store may process data under their own terms when you download or pay through their store. We share data when required by law or to protect the service and users from abuse or security risk.",
    retentionTitle: "Retention",
    retentionBody:
      "We keep waitlist, account, and log data only as long as needed for the purposes above, including security and legal requirements. When data is no longer needed, we delete or anonymise it where practical.",
    choicesTitle: "Your choices",
    choicesBefore:
      "You may ask for access to the personal data we hold about you, ask us to correct it, or ask us to delete waitlist or account data where applicable. You may also ask us to stop certain communications. To exercise privacy rights,",
    writeToPrivacy: "write to privacy",
    choicesAfter: ".",
    securityTitle: "Security reports",
    securityBefore:
      "If you believe an account or system has been compromised,",
    reportSecurity: "report a security issue",
    securityAfter:
      ". Include enough detail for us to investigate. Do not use findings to disrupt service or access data that is not yours.",
  },
  legalEula: {
    title: "End User License Agreement",
    intro:
      "The licence under which you may use ForroVivo software, documentation, and published research materials.",
    opening:
      "This End User License Agreement (“EULA”) is between you and LIVLU TECHNOLOGIES LTD. It covers this website, Open Knowledge documentation, the Linguistic Research API and related public materials, and ForroVivo software products including the Forro Vivo App, except where a platform store licence or a separate written agreement says otherwise.",
    grantTitle: "Licence grant",
    grantP1Before: "Subject to these terms and the",
    termsOfService: "Terms of service",
    grantP1After:
      ", LIVLU TECHNOLOGIES LTD grants you a limited, non-exclusive, non-transferable licence to use the applicable ForroVivo product for personal or organisational research, education, language learning, or development against the public API.",
    grantP2:
      "This licence does not transfer ownership of ForroVivo software, marks, or project-original materials. Platform stores may grant additional rights or limits for apps you download through them.",
    researchTitle: "Linguistic Research materials",
    researchP1:
      "Published Linguistic Research materials are provided for research and education. Third-party dictionaries and papers keep their original licences. Linguistic Research project-original material is published under CC BY 4.0 unless a source page says otherwise. Attribution should remain intact where CC BY 4.0 applies. The Open Knowledge website and the Forro Vivo App remain proprietary under this EULA and are not open source.",
    researchP2:
      "Dataset isolation is part of the licence conditions for research use: do not merge, invent, or substitute lexical forms across languages or varieties and then present them as ForroVivo-attested evidence. Missing data must remain missing rather than guessed.",
    appTitle: "Forro Vivo App",
    appBody:
      "The Forro Vivo App is licensed for use as a learning application — dictionary, lessons, and exercises — starting with Forro. You may not copy, modify, redistribute, or commercially exploit the app binary or its non-public assets except as allowed by the platform store terms and this EULA. Custom models and lesson systems in the app remain tied to ForroVivo’s product and source practices; they are not a grant to rebrand or resell the learning system.",
    connectTitle: "Forro Connect",
    connectBody:
      "Forro Connect is a service for live lessons with speakers. Access to matching, booking, or lesson tools is licensed only for that purpose. You may not use Connect to scrape speaker information, resell community contacts, or extract cultural knowledge into a competing dataset without the speaker’s informed agreement and any separate rights that apply.",
    apiTitle: "API and documentation",
    apiP1:
      "The Linguistic Research API is read-only for lexicon data. You may call published routes in line with Documentation, authentication rules, and fair-use limits. You may not use the API to invent translations, write into datasets, or misrepresent responses as something other than ForroVivo research output.",
    apiP2Before: "Technical rules in",
    apiDocumentation: "API documentation",
    apiP2After: "form part of this EULA for API clients.",
    restrictionsTitle: "Restrictions",
    restrictionsBefore:
      "Except where law forbids these limits, you may not reverse engineer ForroVivo software, remove proprietary notices, use ForroVivo marks in a misleading way, or sublicense the products as if you were the operator. Security testing must not disrupt service or access data that is not yours; report issues through the security contact on the",
    legalLink: "Legal",
    restrictionsAfter: "page.",
    terminationTitle: "Termination",
    terminationBody:
      "This licence continues until ended by you or by LIVLU TECHNOLOGIES LTD. It ends automatically if you break this EULA or the Terms of service. On termination, you must stop using the affected software and destroy local copies you are not otherwise licensed to keep. Provisions that by nature should survive — including ownership, licence limits on research misuse, and liability limits — continue to apply.",
    governingTitle: "Governing law",
    governingBefore:
      "This EULA is governed by the laws of England and Wales. Questions about licensing:",
    writeToLegal: "write to legal",
    governingAfter: ".",
  },
  apiPage: {
    productEyebrow: "Product",
    title: "API Platform",
    body: "Build with attested linguistic data. Manage your keys and try live requests — the full reference is in Documentation.",
    documentation: "Documentation",
  },
  appCreditsPage: {
    breadcrumb: "Forro Vivo App",
    companyTitle: "Company",
    companyBody:
      "LIVLU TECHNOLOGIES LTD is a private limited company registered in England and Wales. The Forro Vivo App is a ForroVivo product operated by LIVLU TECHNOLOGIES LTD.",
    companiesHouse: "Companies House",
  },
};

type WidenStrings<T> = T extends string
  ? string
  : T extends number | boolean | null | undefined
    ? T
    : T extends readonly (infer U)[]
      ? WidenStrings<U>[]
      : T extends object
        ? { -readonly [K in keyof T]: WidenStrings<T[K]> }
        : T;

export type SiteCopy = WidenStrings<typeof en>;

const siteCopyEn: SiteCopy = en as unknown as SiteCopy;


const pt: SiteCopy = {
  hero: {
    headline: "Conhecimento aberto para as línguas crioulas",
    subheadline:
      "O primeiro projecto open-source para línguas crioulas no mundo.",
    waitlistPlaceholder: "Introduza o email",
    waitlistCta: "Juntar-se à lista de espera",
    joining: "A juntar…",
    success: "Está na lista. Entraremos em contacto.",
    error: "Algo correu mal. Tente novamente.",
  },
  africaMap: {
    title: "Explore um mundo de línguas africanas",
    subtitle:
      "Descubra o rico património linguístico de África. Clique em qualquer país para saber mais sobre a sua história e presença global.",
    interactiveMapAria: "Mapa interactivo de África",
    countryFallback: "País",
  },
  architecture: {
    title: "Como funciona",
    description:
      "Evidência antes da geração. Dados em falta são preferíveis a dados incorrectos.",
    steps: [
      { label: "Fonte", href: "/docs/methodology" },
      { label: "Extracção", href: "/docs/methodology" },
      { label: "Verificação", href: "/docs/methodology" },
      { label: "Entrada estruturada", href: "/languages" },
      { label: "Revisão", href: "/docs/methodology" },
      { label: "Conjunto de dados publicado", href: architectureEn.steps[5].href },
      { label: "API", href: "/api" },
    ],
    tree: {
      root: { label: "ForroVivo", href: architectureEn.tree.root.href },
      products: [
        {
          label: "Open Knowledge",
          href: "/",
          items: [
            { label: "Investigação", href: "/research" },
            { label: "Dicionário", href: "/languages" },
            { label: "Cultura", href: "/about" },
            { label: "Dados", href: "/languages" },
            { label: "API", href: "/api" },
          ],
        },
        {
          label: "ForroVivo App",
          href: "/app",
          items: [
            { label: "Aprendizagem gratuita", href: architectureEn.tree.products[1].items[0].href },
            { label: "Dicionário", href: architectureEn.tree.products[1].items[1].href },
            { label: "Lições", href: architectureEn.tree.products[1].items[2].href },
            { label: "Exercícios", href: architectureEn.tree.products[1].items[3].href },
          ],
        },
        {
          label: "Forro Connect",
          href: "/connect",
          items: [
            { label: "Emparelhamento da lista de espera", href: "/connect" },
            { label: "Aprendiz e falante nativo", href: "/connect" },
            { label: "Rendimento comunitário", href: "/connect/income" },
          ],
        },
      ],
      outcomes: [
        { label: "Preservação linguística" },
        { label: "Empoderamento da comunidade" },
      ],
    },
  },
  apiSection: {
    title: "Construa com conhecimento linguístico atestado",
  },
  cloneSection: {
    cta: "Ver no GitHub",
    copy: "Copiar",
    copied: "Copiado",
  },
  appLanding: {
    title: "Aprenda Forro. Preserve a cultura.",
    titleLines: ["Aprenda Forro.", "Preserve a cultura."],
    description:
      "A primeira aplicação de aprendizagem para línguas crioulas africanas, começando pelo Forro de São Tomé e Príncipe.",
    storeCta: "Descarregar na App Store",
    playCta: "Google Play — Em breve",
    seoTitle:
      "Forro Vivo — Aprenda Forro, a primeira aplicação de aprendizagem de crioulo africano",
    seoDescription:
      "A primeira aplicação de aprendizagem para línguas crioulas africanas, começando pelo Forro de São Tomé e Príncipe. Dicionário, lições e exercícios. Na App Store.",
    phoneAlt: "Forro Vivo no iPhone",
  },
  appWhy: {
    title: "Porquê escolher o Forro Vivo?",
    photoCredit: { ...appWhyEn.photoCredit },
    cards: [
      {
        title: "Família",
        body: "Fale com a família e amigos na língua que partilham.",
        image: appWhyEn.cards[0].image,
        imageAlt:
          "Crianças a olhar através de uma porta de madeira em São Tomé e Príncipe. Fotografia de Emanuel Silva Morgan.",
      },
      {
        title: "Oportunidade",
        body: "Aprenda Forro para o trabalho, o estudo e a vida com quem o fala.",
        image: appWhyEn.cards[1].image,
        imageAlt:
          "Crianças escolares reunidas numa rua em São Tomé e Príncipe. Fotografia de Emanuel Silva Morgan.",
      },
      {
        title: "Viagem",
        body: "Enriqueça as suas aventuras africanas com uma imersão mais profunda e ligações genuínas com as comunidades. As nossas melhores memórias começam sempre com um simples Olá, bom dia, boa tarde, boa noite.",
        image: appWhyEn.cards[2].image,
        imageAlt:
          "Vista sobre o mar ao entardecer em São Tomé e Príncipe. Fotografia de Emanuel Silva Morgan.",
      },
    ],
  },
  appVision: {
    title: "A nossa visão mais ampla",
    about:
      "A Forro Vivo App começa pelo Forro. O ForroVivo é a plataforma em torno dela: Open Knowledge para léxicos isolados, e Forro Connect para lições ao vivo com falantes nativos.",
    body: "O objectivo é preservar as línguas crioulas africanas e as culturas a elas ligadas, sem misturar uma língua com outra.",
  },
  appFaq: {
    title: "FAQ",
    items: [
      {
        question: "O que é o Forro Vivo?",
        answer:
          "O Forro Vivo é a primeira aplicação de aprendizagem para línguas crioulas africanas, começando pelo Forro de São Tomé e Príncipe.",
      },
      {
        question: "Como aprendo Forro?",
        answer:
          "Descarregue o Forro Vivo na App Store. É a primeira aplicação de aprendizagem para línguas crioulas africanas, começando pelo Forro de São Tomé e Príncipe.",
      },
      {
        question: "O que inclui a aplicação?",
        answer: "Um dicionário, lições, exercícios, tradução e pronúncia.",
      },
      {
        question: "Onde a posso descarregar?",
        answer: "Na App Store. O Google Play chega em breve.",
      },
      {
        question: "A aplicação tem voz e áudio?",
        answer: "A capacidade de voz e o áudio chegam na versão 5.",
      },
      {
        question: "É o mesmo que Open Knowledge?",
        answer:
          "Não. Esta é a aplicação de aprendizagem. Open Knowledge é o site público de conhecimento linguístico: léxicos, fontes e a API só de leitura.",
      },
      {
        question: "Isto é o Forro Connect?",
        answer:
          "Não. A aplicação é software: dicionário, lições e exercícios. O Forro Connect são lições ao vivo com um falante nativo.",
      },
      {
        question: "Como é usada a IA?",
        answer:
          "A aplicação usa modelos de linguagem personalizados para lições e exercícios. O conhecimento linguístico por detrás dessas lições permanece ligado às fontes.",
      },
      {
        question: "E as outras línguas crioulas africanas?",
        answer:
          "A aplicação começa pelo Forro de São Tomé e Príncipe. Outras línguas crioulas africanas estão a caminho.",
      },
    ],
  },

  appCredits: {
    title: "Créditos",
    description:
      "As pessoas por detrás da Forro Vivo App, um produto ForroVivo operado pela LIVLU TECHNOLOGIES LTD.",
    people: [
      {
        name: "Henriques Pontes",
        role: "Fundador e líder do projecto · Produto e tecnologia",
        body: "Henriques lidera a Forro Vivo App e o projecto de conhecimento ForroVivo das línguas crioulas africanas: investigação, conjuntos de dados estruturados e o produto de aprendizagem.",
      },
      {
        name: "Luís Lima",
        role: "Colaborador inicial · Testador inicial",
        body: "Luís está envolvido desde as primeiras ideias em 2023. Ajudou a moldar o produto, testou builds e manteve o trabalho ancorado nas necessidades reais da comunidade.",
      },
      {
        name: "Clara Armand-Delille",
        role: "Mentora · Testadora inicial",
        body: "Clara mentoreou este projecto e testou builds iniciais. É fundadora da ThirdEyeMedia, mentora de startups e oradora sobre empreendedorismo e crescimento.",
      },
    ],
    groups: [
      {
        title: "Testadores iniciais",
        body: "Os testadores iniciais usaram builds inacabados, reportaram o que falhava e disseram o que o produto precisava antes de o dicionário e a academia serem públicos. Luís Lima faz parte desse trabalho desde o início. Clara Armand-Delille testou builds iniciais enquanto mentoreava o projecto. Obrigado também a todos os outros que testaram esses builds e enviaram feedback.",
        people: [
          { name: "Luís Lima", role: "Testador inicial" },
          { name: "Clara Armand-Delille", role: "Testadora inicial" },
        ],
        href: undefined,
        linkLabel: undefined,
      },
      {
        title: "Fotografia",
        body: "Todas as fotografias neste site são de Emanuel Silva Morgan. As imagens mostram São Tomé e Príncipe: vida quotidiana, mercados, mar, floresta e performance cultural.",
        people: [
          { name: "Emanuel Silva Morgan", role: "Fotógrafo" },
        ],
        href: "https://www.instagram.com/silva_photography_stp/",
        linkLabel: "Instagram",
      },
    ],
    sections: [
      {
        title: "Investigação linguística",
        body: "A aplicação assenta em investigação linguística iniciada em Maio de 2023. Léxicos isolados a partir da fonte pública.",
        href: "/research",
        linkLabel: "Abrir investigação",
      },
      {
        title: "Licenças",
        body: "Dicionários e artigos de terceiros mantêm as suas licenças originais. A licença open source aplica-se aos materiais originais de Linguistic Research (CC BY 4.0, salvo indicação em contrário numa página de fonte). Este website Open Knowledge e a Forro Vivo App são proprietários sob o EULA da LIVLU TECHNOLOGIES LTD. O nome ForroVivo e marcas relacionadas são usados pela LIVLU TECHNOLOGIES LTD.",
        href: "/legal",
        linkLabel: "Legal",
      },
    ],
  },
  appRoadmap: {
    title: "Roteiro",
    description:
      "Da investigação linguística em 2023 a uma aplicação pública de aprendizagem. A versão actual inclui dicionário e academia. Voz e áudio estão na versão 5, agora em beta.",
    steps: [
      {
        label: "Fundação",
        date: "23 de Março de 2023",
        description:
          "Começa a investigação linguística. Fundador: Henriques Pontes. Colaborador inicial: Luís Lima.",
        href: "/research",
      },
      {
        label: "1.0.0",
        date: "Beta",
        description:
          "Primeiro TestFlight. Consulte Forro, português e inglês.",
      },
      {
        label: "2.0.2",
        date: "Beta",
        description:
          "O TestFlight inicial continua. O léxico cresce. Ainda não há voz nem áudio na aplicação.",
      },
      {
        label: "3.5.0",
        date: "Beta",
        description:
          "Academia e lições. O Forro torna-se um caminho a percorrer, não apenas uma lista de palavras.",
      },
      {
        label: "4.0.0",
        date: "Janeiro de 2026",
        description:
          "O salto para o público. O Forro Vivo sai do TestFlight e chega à App Store com dicionário e academia.",
      },
      {
        label: "4.0.5",
        date: "Março de 2026",
        description:
          "Uma reformulação total: estética e funcionalidade modernas e limpas. Esta é a versão pública actual.",
      },
      {
        label: "5.0.0",
        date: "Beta",
        description:
          "A capacidade de voz e o áudio chegam aqui. Beta fiável, a caminho do lançamento público.",
      },
    ],
  },
  connectArchitecture: {
    title: "Como funciona",
    description:
      "O Forro Connect liga aprendizes directamente a falantes reais de Forro e detentores de conhecimento cultural. As lições ao vivo pagas são como o trabalho é financiado e como os falantes ganham.",
    steps: [
      {
        label: "Aprendiz",
        description: "Alguém que quer aprender Forro com um falante real.",
      },
      {
        label: "Falante nativo",
        description:
          "Um falante de Forro ou detentor de conhecimento cultural na comunidade.",
      },
      {
        label: "Emparelhamento directo",
        description:
          "O Connect emparelha-os para uma lição real, não para um feed anónimo.",
      },
      {
        label: "Lição ao vivo",
        description: "Encontram-se. A língua é ensinada em conversa viva.",
      },
      {
        label: "Conhecimento cultural",
        description:
          "A lição transporta cultura, não apenas palavras. Esse conhecimento permanece com o falante.",
      },
      {
        label: "Rendimento comunitário",
        description:
          "A lição é trabalho pago. Os falantes ganham. O projecto é financiado.",
        href: "/connect/income",
      },
    ],
  },
  connectIncome: {
    title: "Rendimento comunitário",
    href: "/connect/income",
    eyebrow: "Forro Connect",
    description:
      "É aqui que o Forro Connect tem rendimento e impacto. Uma lição ao vivo é trabalho. O falante é pago. O projecto é financiado ao tornar esse emparelhamento possível.",
    body: "A Forro Vivo App ensina com dicionário, lições e exercícios. O Forro Connect é diferente: coloca um aprendiz numa lição ao vivo com um falante real de Forro. Essa sessão é o produto. O rendimento comunitário é o último passo de Como funciona porque a preservação só dura se as pessoas que detêm a língua puderem ganhar ao ensiná-la.",
    image: {
      src: connectIncomeEn.image.src,
      alt: "Mulheres a transportar bacias num mercado em São Tomé e Príncipe. Fotografia de Emanuel Silva Morgan.",
    },
    flowTitle: "A decomposição",
    flowDescription:
      "Uma lição ao vivo paga move dinheiro e conhecimento na mesma direcção: para as pessoas que falam Forro, e para o produto que torna a lição possível.",
    flow: [
      { label: "Lição ao vivo paga" },
      { label: "O falante é pago" },
      { label: "O Connect é financiado" },
      { label: "A língua permanece na comunidade" },
    ],
    partiesTitle: "Quem está na troca",
    parties: [
      {
        title: "Aprendiz",
        role: "Paga a lição",
        body: "Uma pessoa que quer aprender Forro com um falante real. Paga tempo ao vivo, conversa e conhecimento cultural — não um dicionário raspado.",
      },
      {
        title: "Falante",
        role: "Ganha rendimento comunitário",
        body: "Um falante nativo ou detentor de conhecimento cultural. Ensinar é o seu trabalho. O rendimento comunitário é o pagamento por essa lição.",
      },
      {
        title: "Projecto",
        role: "Ganha ao operar o Connect",
        body: "A LIVLU TECHNOLOGIES LTD opera o Forro Connect. O rendimento do projecto vem do emparelhamento, da realização da lição e de manter aprendiz e falante ligados.",
      },
    ],
    breakdownTitle: "Do que é feita uma lição",
    breakdown: [
      {
        title: "Língua",
        body: "Forro como é falado. O aprendiz ouve e usa a língua com alguém que a vive.",
      },
      {
        title: "Cultura",
        body: "Conhecimento que rodeia as palavras: como as pessoas se cumprimentam, cozinham, lembram e ensinam. Esse conhecimento permanece com o falante. Não é extraído para um conjunto de dados e vendido de volta.",
      },
      {
        title: "Tempo",
        body: "Uma sessão ao vivo é tempo. O tempo é o que se paga. O rendimento comunitário é pagamento por esse tempo, não uma doação por existir.",
      },
    ],
    howTitle: "Como uma sessão se torna rendimento",
    how: [
      {
        title: "Um aprendiz reserva uma lição ao vivo",
        body: "Alguém que quer aprender Forro é emparelhado com um falante nativo ou detentor de conhecimento cultural. O emparelhamento é directo. A lição é ao vivo.",
      },
      {
        title: "O falante é pago pela lição",
        body: "Ensinar Forro e partilhar conhecimento cultural é trabalho. Rendimento comunitário significa que esse trabalho é pago, não pedido como trabalho de herança não remunerado.",
      },
      {
        title: "O projecto é financiado ao operar o emparelhamento",
        body: "A LIVLU TECHNOLOGIES LTD opera o Forro Connect. O rendimento do projecto vem de gerir o emparelhamento, a lição e a continuidade entre aprendiz e falante. É assim que o Connect se sustenta sem vender a língua afastada da comunidade.",
      },
    ],
    notTitle: "O que isto não é",
    not: [
      {
        title: "Não é o produto da App Store",
        body: "A Forro Vivo App é dicionário, lições e exercícios. Não substitui um falante. O rendimento comunitário vive no Connect, na lição ao vivo.",
      },
      {
        title: "Não é extracção não remunerada",
        body: "Gravações, palavras e cultura não são retiradas da comunidade para treinar um modelo e depois vendidas sem o falante. A lição é o produto. O falante faz parte dela.",
      },
      {
        title: "Não é um mercado da língua em si",
        body: "O Forro não é listado como mercadoria. O que se vende é tempo de ensino com uma pessoa real. A língua continua a ser deles.",
      },
    ],
    outcomesTitle: "Rendimento e impacto",
    outcomes: [
      {
        title: "Rendimento",
        body: "Falantes e detentores de conhecimento cultural ganham com lições ao vivo. O projecto ganha ao operar o Connect. Ambos os lados dessa troca são necessários para o produto existir.",
      },
      {
        title: "Impacto",
        body: "A preservação linguística torna-se ensino pago. O Forro permanece com quem o fala, e os aprendizes encontram a língua como cultura viva, não apenas como aplicação.",
      },
    ],
    compareTitle: "Dois produtos, uma missão",
    compare: [
      {
        title: "Forro Vivo App",
        body: "Aprendizagem por software: dicionário, lições, exercícios e prática linguística. Na App Store.",
        href: "/app",
        linkLabel: "Forro Vivo App",
      },
      {
        title: "Forro Connect",
        body: "Ensino humano: aprendiz, falante, lição ao vivo, rendimento comunitário. Lista de espera aberta agora.",
        href: "/connect",
        linkLabel: "Forro Connect",
      },
    ],
  },
  connectPage: {
    title: "Forro Connect",
    description:
      "Enquanto o ForroVivo usa tecnologia para ajudar as pessoas a descobrir e aprender Forro, o Forro Connect liga aprendizes directamente a falantes reais de Forro e detentores de conhecimento cultural.",
    incomeCta: "Decomposição do rendimento comunitário",
  },

  productOverview: {
    eyebrow: "Produtos",
    title: "Visão geral",
    description:
      "Tudo o que o ForroVivo constrói: a aplicação de aprendizagem, lições ao vivo com falantes nativos, línguas documentadas e dados linguísticos abertos.",
    statement: {
      lines: [
        [
          { text: "O nosso trabalho é " },
          { text: "documentar", color: "#4285F4" },
          { text: ", " },
          { text: "preservar", color: "#EA4335" },
          { text: " e " },
          { text: "estruturar", color: "#FBBC05" },
        ],
        [
          { text: "línguas crioulas africanas e torná-las " },
          { text: "acessíveis", color: "#34A853" },
          { text: " às novas gerações." },
        ],
      ],
    },
    photoCredit: { ...productOverviewEn.photoCredit },
    collage: productOverviewEn.collage.map((item, index) => {
      const alts = [
        "Crianças a transportar água. Fotografia de Emanuel Silva Morgan.",
        "Uma mulher a transportar jaca no mercado. Fotografia de Emanuel Silva Morgan.",
        "Cortejo de Tchiloli em São Tomé. Fotografia de Emanuel Silva Morgan.",
        "Uma canoa de outrigger à vela. Fotografia de Emanuel Silva Morgan.",
        "Mulheres a transportar bacias num mercado. Fotografia de Emanuel Silva Morgan.",
        "Uma criança a brincar em São Tomé e Príncipe. Fotografia de Emanuel Silva Morgan.",
        "Um edifício histórico em São Tomé e Príncipe. Fotografia de Emanuel Silva Morgan.",
        "Um músico a tocar numa reunião em São Tomé e Príncipe. Fotografia de Emanuel Silva Morgan.",
      ];
      return { ...item, alt: alts[index] ?? item.alt };
    }),
    products: [
      {
        label: "Forro Vivo App",
        href: "/app",
        description:
          "A primeira aplicação de aprendizagem para línguas crioulas africanas, começando pelo Forro de São Tomé e Príncipe. Dicionário, lições e exercícios. Na App Store.",
      },
      {
        label: "Forro Connect",
        href: "/connect",
        description:
          "Liga aprendizes directamente a falantes reais de Forro e detentores de conhecimento cultural.",
      },
      {
        label: "Línguas",
        href: "/languages",
        description:
          "As línguas documentadas de São Tomé e Príncipe, Cabo Verde, Guiné-Bissau e Angola. Cada língua mantida em separado, com as suas próprias fontes.",
      },
      {
        label: "API Platform",
        href: "/api",
        description:
          "Construa com os dados linguísticos. Crie uma conta, obtenha uma chave e experimente a Linguistic Research API em directo.",
      },
    ],
  },
  translationArchitecture: {
    title: "Evidência antes dos modelos",
    description:
      "Léxicos isolados, fontes atestadas e revisão humana vêm primeiro. Pares estruturados e modelos fundamentados seguem-se. Dados em falta são preferíveis a dados incorrectos.",
    steps: [
      { label: "Léxico isolado" },
      { label: "Fontes atestadas" },
      { label: "Pares estruturados" },
      { label: "Modelo fundamentado" },
      { label: "Revisão humana" },
    ],
  },
  translationPage: {
    eyebrow: "Tradução automática",
    headline: "Evidência antes dos modelos.",
    headlineClose: "A tradução segue o léxico.",
    description:
      "A tradução fiável para estas línguas começa com léxicos isolados, fontes atestadas e revisão humana. Open Knowledge detém essa evidência. A tradução é uma capacidade ForroVivo construída sobre ela.",
    questionsTitle: "A fiabilidade começa no léxico.",
    questionsBody:
      "Pastas isoladas, fontes atestadas e revisão humana vêm antes de qualquer modelo. Veja como o pipeline permanece centrado na evidência.",
    questionsCta: "Ler metodologia",
    questionsHref: "/docs/methodology",
    releasesTitle: "A fundação",
    releases: [
      {
        title: "Léxico isolado",
        body: "Cada língua permanece na sua própria pasta. São Tomé e Príncipe, Cabo Verde, Guiné-Bissau e Angola nunca são misturados nem copiados entre si.",
        href: "/languages",
        linkLabel: "Abrir línguas",
        surface: "Línguas",
      },
      {
        title: "Fontes atestadas",
        body: "Cada afirmação linguística deve ser rastreável até uma fonte. Texto gerado não é tratado como evidência na base de conhecimento.",
        href: "/research",
        linkLabel: "Abrir investigação",
        surface: "Investigação",
      },
      {
        title: "Revisão humana",
        body: "Pares estruturados e modelos fundamentados seguem a verificação. Campos vazios são preferíveis a campos incorrectos.",
        href: "/docs/methodology",
        linkLabel: "Abrir metodologia",
        surface: "Metodologia",
      },
    ],
    wellBeing:
      "Open Knowledge publica a camada de dados. O ForroVivo constrói a tradução sobre essa fundação.",
    links: [
      { heading: "Línguas", label: "Léxicos isolados", href: "/languages" },
      { heading: "Investigação", label: "Investigação linguística", href: "/research" },
      { heading: "Metodologia", label: "Pipeline centrado na evidência", href: "/docs/methodology" },
      { heading: "API", label: "API Platform", href: "/api" },
    ],
  },
  docsProducts: {
    title: "ForroVivo para programadores",
    description:
      "Documentação e recursos para o ajudar a construir com Open Knowledge, a Forro Vivo App e o Forro Connect.",
    products: [
      {
        label: "Open Knowledge",
        href: "/docs/open-knowledge",
        description:
          "Léxicos isolados, a Linguistic Research API pública, metodologia e API Platform.",
      },
      {
        label: "ForroVivo",
        href: "/docs/app",
        description:
          "Aplicação de aprendizagem para línguas crioulas africanas, começando pelo Forro. Dicionário, lições e exercícios.",
      },
      {
        label: "Forro Connect",
        href: "/docs/connect",
        description:
          "Lições ao vivo com falantes reais de Forro e detentores de conhecimento cultural.",
      },
    ],
  },
  openKnowledgeDocsNav: [
    {
      heading: "Começar",
      links: [
        { label: "Visão geral", href: "/docs/open-knowledge" },
        { label: "Início rápido", href: "/docs/quickstart" },
        { label: "API Platform", href: "/api/login" },
        { label: "Autenticação", href: "/docs/api-reference#authentication" },
      ],
    },
    {
      heading: "Conhecimento",
      links: [
        { label: "Línguas", href: "/languages" },
        { label: "Dicionários", href: "/dictionaries" },
        { label: "Fontes", href: "/research" },
        { label: "Metodologia", href: "/docs/methodology" },
      ],
    },
    {
      heading: "Documentação da API",
      links: openKnowledgeDocsNavEn[2].links.map((link) => ({
        label:
          (
            {
              Overview: "Visão geral",
              "Base URL": "URL base",
              Authentication: "Autenticação",
              Headers: "Cabeçalhos",
              Errors: "Erros",
              Lookup: "Consulta",
              Search: "Pesquisa",
              Catalog: "Catálogo",
              Entries: "Entradas",
              Knowledge: "Conhecimento",
              Audio: "Áudio",
              Routes: "Rotas",
              OpenAPI: "OpenAPI",
            } as Record<string, string>
          )[link.label] ?? link.label,
        href: link.href,
      })),
    },
    {
      heading: "Recursos",
      links: [
        { label: "GitHub", href: openKnowledgeDocsNavEn[3].links[0].href },
        { label: "Todos os produtos", href: "/docs" },
      ],
    },
  ],
  appDocsNav: [
    {
      heading: "Começar",
      links: [
        { label: "Visão geral", href: "/docs/app" },
        { label: "Descarregar", href: appDocsNavEn[0].links[1].href },
        { label: "Página do produto", href: "/app" },
      ],
    },
    {
      heading: "Produto",
      links: [
        { label: "Roteiro", href: "/app#roadmap" },
        { label: "Créditos", href: "/app/credits" },
        { label: "FAQ", href: "/app#faq" },
      ],
    },
    {
      heading: "Recursos",
      links: [
        { label: "Open Knowledge", href: "/docs/open-knowledge" },
        { label: "Forro Connect", href: "/docs/connect" },
        { label: "Todos os produtos", href: "/docs" },
      ],
    },
  ],
  connectDocsNav: [
    {
      heading: "Começar",
      links: [
        { label: "Visão geral", href: "/docs/connect" },
        { label: "Página do produto", href: "/connect" },
        { label: "Juntar-se à lista de espera", href: "/connect#waitlist" },
      ],
    },
    {
      heading: "Comunidade",
      links: [
        { label: "Rendimento comunitário", href: "/connect/income" },
        { label: "Como funciona", href: "/connect#how-it-works" },
      ],
    },
    {
      heading: "Recursos",
      links: [
        { label: "Open Knowledge", href: "/docs/open-knowledge" },
        { label: "Forro Vivo App", href: "/docs/app" },
        { label: "Todos os produtos", href: "/docs" },
      ],
    },
  ],
  principle:
    "A base de conhecimento ForroVivo não trata informação gerada por IA como evidência linguística. Cada afirmação linguística documentada deve ser rastreável até uma fonte.",
  legalNav: [
    {
      label: "Visão geral",
      href: "/legal",
      description:
        "Como os produtos ForroVivo são operados e onde encontrar cada política.",
    },
    {
      label: "Empresa",
      href: "/legal/company",
      description:
        "LIVLU TECHNOLOGIES LTD, registo e a família de produtos ForroVivo.",
    },
    {
      label: "Termos de serviço",
      href: "/legal/terms",
      description:
        "Regras para usar Open Knowledge, a aplicação, o Connect, a investigação e a API.",
    },
    {
      label: "Privacidade",
      href: "/legal/privacy",
      description:
        "Como são tratados as listas de espera, as contas e os dados dos produtos.",
    },
    {
      label: "EULA",
      href: "/legal/eula",
      description:
        "Licença para o site, dados de Linguistic Research e software relacionado.",
    },
  ],

  careersPage: {
    title: "Carreiras no ForroVivo",
    description:
      "Construa com Open Knowledge, Linguistic Research, a Forro Vivo App e o Forro Connect.",
    applyLabel: "Candidatar-se agora",
    viewLabel: "Ver função",
    roles: [
      {
        id: "android-developer",
        title: "Programador Android",
        team: "Forro Vivo App",
        location: "Remoto",
        summary:
          "Construa a experiência Android da Forro Vivo App — dicionário, lições e exercícios para línguas crioulas africanas, começando pelo Forro.",
        about: [
          "O ForroVivo documenta, preserva e estrutura línguas crioulas africanas. A Forro Vivo App é o produto de aprendizagem: software que ajuda as pessoas a estudar Forro com dicionário, lições e exercícios. Open Knowledge e Linguistic Research fornecem a camada linguística atestada por detrás.",
          "Estamos a contratar um programador Android para levar essa experiência de aprendizagem ao Android com o mesmo cuidado de isolamento, fontes e cultura que o resto da plataforma mantém.",
        ],
        responsibilities: [
          "Conceber, construir e publicar funcionalidades Android para consulta de dicionário, lições e exercícios.",
          "Trabalhar com produto e investigação para que o conteúdo linguístico no dispositivo permaneça ligado a fontes atestadas e nunca misture léxicos.",
          "Assumir desempenho, acessibilidade e qualidade de lançamento no Google Play quando a versão Android abrir.",
          "Colaborar com a direcção da aplicação iOS existente para que os aprendizes tenham uma experiência Forro Vivo coerente entre plataformas.",
        ],
        requirements: [
          "Forte experiência Android com Kotlin e arquitectura Android moderna.",
          "À-vontade a publicar aplicações de aprendizagem ou conteúdo para consumidores com UX clara.",
          "Cuidado com localização, padrões amigos de offline e código sustentável.",
          "Interesse em produtos de língua, cultura ou educação é uma mais-valia.",
        ],
        applyHref: careersPageEn.roles[0].applyHref,
      },
      {
        id: "linguistic-research-lexicon",
        title: "Investigação linguística",
        team: "Documentação de léxico",
        location: "Remoto",
        summary:
          "Documente léxicos isolados com proveniência — Forro, Angolar, Lung’Ie e o trabalho mais amplo das línguas crioulas — sem misturar uma língua com outra.",
        about: [
          "Linguistic Research é a camada de evidência do ForroVivo. Open Knowledge publica léxicos isolados; a Forro Vivo App e o Forro Connect dependem dessa integridade.",
          "Esta função foca-se na documentação de léxico: entradas estruturadas, ortografia clara e contexto linguístico que permanece na pasta e variedade correctas.",
        ],
        responsibilities: [
          "Documentar e estruturar entradas lexicais para línguas e variedades atribuídas.",
          "Manter cada léxico isolado — nunca copiar ou inventar formas entre línguas porque a grafia parece próxima.",
          "Registar proveniência e deixar campos vazios quando a evidência não existe.",
          "Trabalhar com metodologia e Open Knowledge para que os conjuntos de dados publicados permaneçam consistentes e auditáveis.",
        ],
        requirements: [
          "Formação em linguística, lexicografia, documentação linguística ou prática equivalente.",
          "Experiência com dicionários, corpora ou dados linguísticos estruturados.",
          "Rigor com fontes e à-vontade a dizer “desconhecido” em vez de adivinhar.",
          "Familiaridade com línguas crioulas de São Tomé e Príncipe, Cabo Verde, Guiné-Bissau ou Angola é uma mais-valia.",
        ],
        applyHref: careersPageEn.roles[1].applyHref,
      },
      {
        id: "linguistic-research-sources",
        title: "Investigação linguística",
        team: "Fontes e atestação",
        location: "Remoto",
        summary:
          "Rastreie cada afirmação linguística até uma fonte. Construa a bibliografia e a prática de atestação que mantém o ForroVivo centrado na evidência.",
        about: [
          "O ForroVivo não trata texto gerado como evidência linguística. Fontes, artigos e registos atestados são como Open Knowledge, a aplicação e o Connect permanecem dignos de confiança.",
          "Esta função assume fontes e atestação: bibliografia, prática de citação e verificação de que as afirmações permanecem rastreáveis.",
        ],
        responsibilities: [
          "Curar e manter registos de fontes para Linguistic Research e Open Knowledge.",
          "Verificar que as afirmações publicadas nomeiam as suas fontes e que as licenças de terceiros permanecem intactas.",
          "Apoiar revisões de metodologia quando as entradas discordam, conflitam ou carecem de evidência.",
          "Ajudar investigadores e equipas de produto a compreender o que está atestado e o que deve permanecer vazio.",
        ],
        requirements: [
          "Experiência com citação académica, trabalho de arquivo, documentação linguística ou prática de biblioteca/investigação.",
          "Precisão com bibliografia, licenças e metadados de proveniência.",
          "Capacidade de trabalhar com cuidado em fontes em português e inglês.",
          "Interesse em investigação de línguas crioulas e documentação respeitosa da comunidade é uma mais-valia.",
        ],
        applyHref: careersPageEn.roles[2].applyHref,
      },
      {
        id: "social-media-manager",
        title: "Gestor de redes sociais",
        team: "Comunicação",
        location: "Remoto",
        summary:
          "Conte a história do ForroVivo nos canais — Open Knowledge, Linguistic Research, a Forro Vivo App e o Forro Connect — com clareza e respeito pelas comunidades envolvidas.",
        about: [
          "O ForroVivo é uma plataforma para línguas crioulas africanas: conhecimento público, aprendizagem e lições ao vivo com falantes. A comunicação deve permanecer exacta sobre o que cada produto é e não é.",
          "Estamos a contratar um gestor de redes sociais para crescer a presença sem hype que apague a cultura ou confunda a aplicação com o Connect, ou a investigação com a invenção.",
        ],
        responsibilities: [
          "Planear e publicar conteúdo social para produtos e marcos ForroVivo.",
          "Manter a mensagem alinhada com a verdade do produto: investigação centrada na evidência, aplicação de aprendizagem e lições ao vivo com falantes.",
          "Envolver comunidades com respeito e escalar questões sensíveis de língua ou cultura à equipa certa.",
          "Acompanhar o que ressoa e melhorar o calendário sem perseguir métricas de vaidade em vez de confiança.",
        ],
        requirements: [
          "Experiência a gerir canais sociais para um produto, organização sem fins lucrativos, marca cultural ou educativa.",
          "Boa escrita em inglês; português é uma forte mais-valia.",
          "Juízo sobre representação, atribuição e voz da comunidade.",
          "À-vontade a trabalhar com fundadores e líderes de investigação/produto em textos exactos.",
        ],
        applyHref: careersPageEn.roles[3].applyHref,
      },
    ],
  },
  about: {
    eyebrow: "Sobre",
    title: "ForroVivo",
    p1: "O ForroVivo documenta, preserva e estrutura línguas crioulas africanas, e torna-as acessíveis às novas gerações. Open Knowledge é este site: a casa pública desse trabalho.",
    p2: "Cada língua é documentada nos seus próprios termos, nunca misturada com outra, e nunca separada da cultura a que pertence. Onde a IA apoia a aprendizagem, o conhecimento linguístico por baixo permanece ligado a fontes reais.",
    ctaHome: "Open Knowledge",
    ctaLanguages: "Explorar línguas",
    ctaGithub: "Contribuir no GitHub",
    principles: [
      {
        title: "Uma língua, um léxico",
        body: "Cada língua e variedade é documentada em separado, com as suas próprias fontes e contexto.",
      },
      {
        title: "Responsabilidade cultural",
        body: "O conhecimento comunitário é publicado com direitos e atribuição, e permanece ligado às pessoas que o detêm.",
      },
      {
        title: "Evidência antes do resultado",
        body: "Cada afirmação é rastreável até uma fonte. Uma entrada em falta é melhor do que uma inventada.",
      },
      {
        title: "Acesso aberto",
        body: "Uma API pública e conjuntos de dados abertos para investigação, educação e tecnologia linguística.",
      },
    ],
  },
  languagesPage: {
    title: "Línguas",
    headline: "Cada língua nos seus próprios termos",
    defaultBody:
      "As línguas de São Tomé e Príncipe, Cabo Verde, Guiné-Bissau e Angola. Cada língua e variedade é documentada em separado, nunca misturada.",
    resultsBodyPrefix: "Resultados para “",
    resultsBodySuffix: "”.",
    searchPlaceholder: "Pesquisar um país ou variedade",
    searchCta: "Pesquisar",
    empty: "Nenhuma língua correspondeu a essa pesquisa.",
  },
  dictionariesPage: {
    title: "Dicionários",
    headline: "Dicionários online",
    intro:
      "Pesquise palavras em Forro, Angolar, Lung’Ie, variedades insulares cabo-verdianas, Kriol da Guiné-Bissau, Umbundu, Kimbundu e Kikongo. Cada língua tem o seu próprio dicionário, construído a partir de fontes reais.",
  },
  researchPage: {
    title: "Investigação",
    headline: "A evidência por detrás das línguas",
    founder:
      "A investigação linguística é onde o ForroVivo começou, fundado por Henriques Pontes com o colaborador inicial Luís Lima.",
    evidence:
      "Esta é a camada pública de evidência para Forro, Angolar, Lung’Ie, variedades insulares de Kabuverdianu, Kriol da Guiné-Bissau, e Umbundu, Kimbundu e Kikongo de Angola. Cada entrada deve ser rastreável até uma fonte. Dicionários e artigos de terceiros mantêm as suas licenças originais. A licença open source aplica-se aos materiais originais de Linguistic Research (CC BY 4.0). Este website Open Knowledge é proprietário.",
    methodologyCta: "Metodologia",
    bibliographyCta: "Bibliografia no GitHub",
  },
  languageDetail: {
    breadcrumb: "Línguas",
    lexicalAcrossFolders: "entradas lexicais em pastas isoladas",
    isoLabel: "ISO 639-3",
    datasetLabel: "Conjunto de dados",
    lexicalEntriesLabel: "Entradas lexicais",
    openApi: "Abrir na API",
    viewGithub: "Ver conjunto de dados no GitHub",
    downloadJson: "Descarregar JSON via API",
  },
  countries: {
    saotome: "São Tomé e Príncipe",
    caboverde: "Cabo Verde",
    guinebissau: "Guiné-Bissau",
    angola: "Angola",
  },
  waitlist: {
    joining: "A juntar…",
    successHome: "Está na lista. Entraremos em contacto.",
    successConnect:
      "Está na lista de espera do Forro Connect. Entraremos em contacto.",
    error: "Algo correu mal. Tente novamente.",
    emailPlaceholder: "Email",
    joinCta: "Juntar-se à lista de espera",
  },
  featureGrid: {
    lexicalAcrossFolders: "entradas lexicais",
    lexicalEntries: "entradas lexicais",
    publishedTitle: "Entradas publicadas por língua",
    publishedBody:
      "Cada barra é uma língua ou variedade. A cor é o país a que pertence. Passe o rato sobre uma barra para ler o nome; clique num nó de país para isolar esse agrupamento.",
    mostDocumented: "Mais documentadas",
    leastDocumented: "Menos documentadas",
    entriesByCountry: "Entradas por país",
    sourceFootnote:
      "Fonte: ForroVivo Linguistic Research API · apenas léxicos isolados",
    isolationTitle: "O isolamento é o método",
    isolationBody:
      "São Tomé, Cabo Verde, Guiné-Bissau e Angola permanecem índices separados. As variedades dentro de um país mantêm as suas próprias pastas. Grafia próxima não é motivo para fundir.",
    graphTitle: "Grafo de conhecimento de comunidades isoladas",
    graphBody:
      "A cor é a comunidade. O tamanho do rótulo segue o volume publicado. Arraste um nó, passe o rato para ver vizinhos, clique num léxico para o abrir. Não há arestas entre países.",
    graphFootnote:
      "A cor marca a comunidade do país. O tamanho marca entradas lexicais publicadas. Os pesos marcam co-pertença no mesmo índice isolado, nunca um léxico fundido.",
    flowAria:
      "Entradas lexicais publicadas por léxico isolado, a fluir para nós de país",
    networkAria:
      "Rede de isolamento de países, léxicos e campos de conhecimento",
  },

  dictionarySearch: {
    exactMatch: "Correspondência exacta",
    spellingMatch: "Correspondência ortográfica",
    accentMatch: "Correspondência ignorando acentos",
    orthography: "Ortografia",
    semanticCategory: "Categoria semântica",
    regionalNote: "Nota regional",
    usage: "Uso",
    notes: "Notas",
    crossLanguage: "Relação interlinguística",
    lexicalEntry: "Entrada lexical",
    senseOf: "Acepção {index} de {total}",
    untitled: "Entrada sem título",
    recording: "Gravação",
    confidence: "confiança",
    portuguese: "Português",
    english: "Inglês",
    example: "Exemplo",
    grammar: "Gramática",
    culturalContext: "Contexto cultural",
    etymology: "Etimologia",
    variants: "Variantes",
    synonyms: "Sinónimos",
    relatedTerms: "Termos relacionados",
    appearsIn: "Aparece em",
    related: "Relacionado",
    recordings: "Gravações",
    source: "Fonte",
    documentedOccurrence: "Ocorrência documentada",
    resultsFor: "Resultados para “{query}”",
    lookupResults: "Resultados da consulta",
    sense: "acepção",
    senses: "acepções",
    in: "em",
    noEntry: "Nenhuma entrada encontrada para essa palavra neste dicionário.",
    lookupFailed: "O dicionário não conseguiu concluir essa consulta.",
    ariaDictionary: "Dicionário",
    placeholder: "Pesquisar uma palavra",
    lookingUp: "A consultar…",
    lookUp: "Consultar",
  },
  apiAuth: {
    workEmail: "Email profissional",
    email: "Email",
    registrationCode: "Código de registo",
    optional: "Opcional",
    apply: "Aplicar",
    password: "Palavra-passe",
    repeatPassword: "Repetir palavra-passe",
    placeholderEmail: "nome@empresa.com",
    placeholderPassword: "12+ · número · símbolo",
    agreeCreate:
      "Ao criar uma conta, concorda com os termos, a política de privacidade e o EULA.",
    agreeLogin:
      "Ao continuar, concorda com os termos, a política de privacidade e o EULA.",
    staySignedIn: "Guardar o email e manter a sessão neste dispositivo",
    creating: "A criar conta…",
    signingIn: "A iniciar sessão…",
    createAccount: "Criar conta",
    signIn: "Iniciar sessão",
    signUp: "Registar-se",
    platformTitle: "API Platform",
    signInTitle: "Iniciar sessão na API Platform",
    createTitle: "Criar a sua conta de API",
    subtitle: "Use o email e a palavra-passe para abrir o painel.",
    noAccount: "Ainda não tem conta?",
    haveAccount: "Já tem conta?",
    docs: "Docs",
    home: "Início Open Knowledge",
    marketingTitle: "Onde dados de Forro atestados se tornam invocáveis.",
    marketingBody: "ForroVivo Linguistic Research API",
    documentation: "Documentação",
    emailRequired: "O email não pode ficar em branco.",
    passwordRequired: "A palavra-passe não pode ficar em branco.",
    passwordMismatch: "As palavras-passe não coincidem.",
    turnstileRequired: "Conclua o desafio de verificação humana.",
    invalidValue: "Valor inválido.",
    couldNotContinue: "Não foi possível continuar.",
    couldNotCreate: "Não foi possível criar uma conta.",
    couldNotSignIn: "Não foi possível iniciar sessão.",
  },
  apiPlatform: {
    logIn: "Iniciar sessão",
    createAccount: "Criar uma conta",
    checkingSession: "A verificar a sessão…",
  },
  apiDashboard: {
    opening: "A abrir o painel…",
    dashboard: "Painel",
    platform: "API Platform",
    signedInAs: "Sessão iniciada como",
    signOut: "Terminar sessão",
    yourKey: "A sua chave de API",
    shownOnce: "Mostrada uma vez quando a cria ou substitui.",
    activePrefix: "Prefixo da chave activa:",
    copyKey: "Copie esta chave agora",
    howToUse: "Como usar esta chave",
    issuing: "A emitir…",
    replaceKey: "Substituir chave de API",
    getKey: "Obter chave de API",
    tryApi: "Experimentar a API",
    issueFailed: "A API não conseguiu emitir uma chave.",
  },
  apiExplorer: {
    tryApi: "Experimentar a API",
    headword: "Entrada",
    searchQuery: "Consulta de pesquisa",
    running: "A executar…",
    run: "Executar",
    emptyBody:
      "Execute um pedido para ver o JSON de um conjunto de dados isolado.",
    emptyResponse: "Resposta vazia.",
    failed:
      "A API do dicionário não conseguiu concluir esse pedido a partir deste site.",
    routeAria: "Rota da API",
    lexiconAria: "Léxico isolado",
  },
  docsShell: {
    allProducts: "← Todos os produtos",
    openKnowledge: "Open Knowledge",
    forroVivoApp: "Forro Vivo App",
    forroConnect: "Forro Connect",
  },
  productShowcase: {
    copy: "Copiar",
    copied: "Copiado",
  },
  layout: {
    skipToContent: "Saltar para o conteúdo",
    homeAria: "Início Forro Vivo",
  },
  common: {
    credits: "Créditos",
    forroVivoApp: "Forro Vivo App",
    forroConnect: "Forro Connect",
    surface: "Superfície",
    openDocumentation: "Abrir documentação →",
    careersBreadcrumb: "Carreiras",
    aboutTheRole: "Sobre a função",
    whatYouWillDo: "O que vai fazer",
    whatWeLookFor: "O que procuramos",
    howToApply: "Como candidatar-se",
    applyBody:
      "Envie uma breve nota sobre o motivo pelo qual esta função se adequa ao seu trabalho, com um CV ou ligação para portefólio. Lemos todas as candidaturas.",
  },
  docsHub: {
    openDocsCta: "Abrir documentação →",
  },
  docsOpenKnowledge: {
    title: "Open Knowledge",
    description:
      "Site público de conhecimento linguístico do ForroVivo. Léxicos isolados, fontes atestadas e uma API só de leitura.",
    quickstartTitle: "Início rápido para programadores",
    quickstartBody:
      "Faça o seu primeiro pedido à API em minutos. Autenticação completa, erros e rotas vivem apenas na referência da API.",
    getStarted: "Começar",
    createApiKey: "Criar chave de API",
    mockBody: "Devolve todos os léxicos publicados com contagens de entradas.",
    explore: "Explorar",
    apiDocsTitle: "Documentação da API",
    apiDocsBody:
      "A fonte de verdade para /v1 no anfitrião da Linguistic Research API: autenticação, erros, consulta, pesquisa e cada rota.",
    openApiDocs: "Abrir documentação da API →",
    methodologyTitle: "Metodologia",
    readMethodology: "Ler metodologia →",
    languages: "Línguas",
    viewGithub: "Ver código-fonte no GitHub",
  },
  docsQuickstart: {
    title: "Início rápido",
    introBefore:
      "Três chamadas para começar. As regras de chaves, erros, CORS e nomenclatura estão apenas na",
    apiReferenceLink: "referência da API",
    introAfter: ".",
    step1: "1. Listar línguas",
    step1Body: "Catálogo de léxicos publicados.",
    step2: "2. Consultar uma entrada num conjunto de dados",
    step2Body:
      "Correspondências exactas de um único conjunto de dados, por exemplo saotome/forro ou angola/umbundu.",
    step3: "3. Pesquisar dentro de um conjunto de dados",
    step3Body:
      "Tanto dataset= como q= são obrigatórios. A pesquisa nunca atravessa conjuntos de dados.",
    apiDocumentation: "Documentação da API",
    apiPlatform: "API Platform",
  },
  docsMethodology: {
    title: "Metodologia",
    subtitle: "Evidência antes da geração",
    p1: "Isto é recuperação e verificação, não tradução generativa. Nunca invente um glossário, infira uma palavra em falta, crioulize português, ou copie uma forma de uma pasta para outra porque a grafia parece próxima.",
    p2: "Forro, Angolar e Lung’Ie são documentados como sistemas independentes. Cabo Verde é uma ilha, uma pasta. A Guiné-Bissau é uma região, uma pasta. Angola é Umbundu, Kimbundu e Kikongo, cada um na sua pasta; o índice do país Angola não é Angolar. O português oficial destes países não é um léxico crioulo nesta base de conhecimento.",
    p3: "Se a evidência não existir, o campo permanece vazio. Uma tradução em falta é melhor do que uma adivinhada. As discordâncias são registadas, não resolvidas em silêncio.",
    githubCta: "Metodologia completa no GitHub",
  },
  docsApp: {
    title: "Forro Vivo App",
    description:
      "A primeira aplicação de aprendizagem para línguas crioulas africanas, começando pelo Forro de São Tomé e Príncipe.",
    getAppTitle: "Obter a aplicação",
    getAppBody:
      "Dicionário, lições e exercícios na App Store. Esta documentação cobre o âmbito do produto; Open Knowledge detém os léxicos públicos e a API.",
    downloadCta: "Descarregar na App Store",
    productPage: "Página do produto",
    explore: "Explorar",
    roadmapTitle: "Roteiro",
    roadmapBody: "O que chega a seguir para a aplicação de aprendizagem.",
    openRoadmap: "Abrir roteiro →",
    creditsTitle: "Créditos",
    creditsBody: "Pessoas e fontes por detrás da experiência da aplicação.",
    openCredits: "Abrir créditos →",
  },
  docsConnect: {
    title: "Forro Connect",
    waitlistTitle: "Juntar-se à lista de espera",
    waitlistBody:
      "Ligue aprendizes a falantes reais de Forro e detentores de conhecimento cultural. Os detalhes do produto e o registo estão na página do Forro Connect.",
    joinWaitlist: "Juntar-se à lista de espera",
    productPage: "Página do produto",
    explore: "Explorar",
    howItWorksTitle: "Como funciona",
    howItWorksBody: "O caminho do aprendiz ao falante na página do produto.",
    openHowItWorks: "Abrir como funciona →",
    incomeBody:
      "Como uma lição ao vivo paga remunera o falante e financia o projecto.",
    openBreakdown: "Abrir decomposição →",
  },

  docsApiReference: {
    title: "Documentação da API",
    intro:
      "Documentação completa da ForroVivo Linguistic Research API. Esta página é a fonte de verdade. O início rápido mostra apenas as primeiras chamadas.",
    baseUrlTitle: "URL base",
    baseUrlBody:
      "O anfitrião de produção é a origem da Linguistic Research API. Todas as rotas de dados vivem sob /v1. A raiz do site redirecciona para /v1. O curl e outros clientes chamam este anfitrião directamente. O playground do website em /api faz proxy através de /api/v1 em forrovivo.com apenas para a interface do browser.",
    principlesTitle: "Princípios",
    principlesP1:
      "A API é só de leitura para dados de léxico. Não inventa traduções, não funde línguas nem escreve em conjuntos de dados. Dados em falta são preferíveis a dados incorrectos. Cada caminho serve um conjunto de dados isolado. Os índices de país-mãe não são dicionários fundidos.",
    principlesP2:
      "Os campos de glossário são conceitos que a entrada significa. Não são prova de que a palavra pertence ao português ou ao inglês.",
    versioningTitle: "Versionamento",
    versioningBody:
      "As respostas enviam API-Version: v1. O documento de identidade em GET /v1 inclui api (a família de URL) e version (a versão). Alterações incompatíveis chegam numa nova família, não alterando silenciosamente o comportamento de /v1.",
    namingTitle: "Nomenclatura de endpoints",
    namingBody:
      "Os léxicos usam /v1/{family}/{variety}/{collection}. Os índices de país são /v1/{family} e listam léxicos filhos; não são alvos de consulta de entradas.",
    namingBullets: [
      "Consulte Forro em /v1/saotome/forro/lookup",
      "Consulte Umbundu em /v1/angola/umbundu/lookup",
      "Não consulte em /v1/angola/lookup — essa é a forma do índice de país, não um léxico fundido de Angola",
      "Angolar de São Tomé é /v1/saotome/angolar, não Angola",
    ],
    authenticationTitle: "Autenticação",
    authenticationP1:
      "GET, HEAD e OPTIONS públicos funcionam sem chave. Chaves opcionais identificam o seu cliente. Crie uma conta em /api/register, inicie sessão em /api/login e depois obtenha ou substitua uma chave no painel da API Platform. As chaves são mostradas uma vez.",
    authenticationP2:
      "Envie a chave como Authorization: Bearer <key> ou X-Api-Key: <key>. As chaves usam o prefixo fv_live_. POST /v1/keys emite ou substitui uma chave para um email; substituir invalida a chave anterior.",
    authenticationMock:
      "A mesma resposta de consulta. A chave identifica o cliente; GET público continua a funcionar sem ela.",
    headersTitle: "Cabeçalhos de resposta",
    headersBullets: [
      "API-Version — família de URL, actualmente v1",
      "Link — rel=index, rel=describedby (OpenAPI), rel=source (GitHub), rel=license",
      "RateLimit-Policy — política de uso justo desta implantação",
      "RateLimit-Limit — quando presente, o limite aplicado",
      "Retry-After — segundos a esperar após RATE_LIMITED",
    ],
    corsTitle: "CORS",
    corsBody:
      "Clientes de browser podem chamar a API a partir de qualquer origem. Credenciais não são usadas. O preflight permite GET, HEAD, POST (chaves) e OPTIONS. Os cabeçalhos expostos incluem API-Version, Link e cabeçalhos de limite de taxa.",
    rateLimitsTitle: "Limites de taxa",
    rateLimitsBody:
      "Aplicam-se limites de uso justo por cliente. Quando um cliente excede a política, a API devolve 429 com o código RATE_LIMITED e Retry-After. Leia sempre RateLimit-Policy na resposta em vez de codificar um orçamento. Os caminhos de saúde e OpenAPI permanecem isentos.",
    attributionTitle: "Atribuição de fontes",
    attributionBody:
      "Cada afirmação linguística permanece ligada a uma fonte citada. Os envelopes de consulta incluem um objecto attribution (conjunto de dados, árvore GitHub, caminho de fontes, licença). Cada entrada transporta source e graph.documented_by quando presentes. Materiais originais de Linguistic Research são CC BY 4.0. Extractos de fontes mantêm os seus termos originais. Este website permanece proprietário sob o EULA da LIVLU.",
    paginationTitle: "Paginação",
    paginationBody:
      "Rotas de lista como entries aceitam offset (predefinição 0) e limit. Permaneça dentro do intervalo aceite pelo servidor; valores excessivos são limitados. As respostas incluem a página de itens apenas desse conjunto de dados.",
    errorsTitle: "Erros",
    errorsIntro:
      "Os corpos de erro usam um code estável e uma message legível. Códigos comuns:",
    errorsBullets: [
      "TERM_NOT_FOUND — nenhuma entrada correspondente nesse conjunto de dados",
      "DATASET_NOT_FOUND — família ou variedade desconhecida no caminho",
      "DATASET_REQUIRED — pesquisa chamada sem dataset=",
      "QUERY_REQUIRED — pesquisa chamada sem q=",
      "RATE_LIMITED — limite de uso justo excedido (429)",
    ],
    catalogTitle: "Catálogo",
    catalogBody:
      "GET /v1 devolve a identidade do serviço e ligações. GET /v1/languages lista léxicos isolados (não índices de país). GET /v1/datasets lista conjuntos de dados publicados incluindo índices. GET /v1/kb mapeia colecções da Knowledge Base.",
    catalogMock:
      "Um objecto por léxico isolado, com contagens de entradas por conjunto de dados.",
    lookupTitle: "Consulta",
    lookupP1:
      "GET /v1/{family}/{variety}/lookup?headword= devolve correspondências exactas apenas desse conjunto de dados. Consulta obrigatória: headword. O envelope inclui dataset, attribution, query, match, count e entries.",
    lookupP2:
      "Cada entrada pode incluir entrada, ortografia, classe gramatical, traduções, exemplos, pronúncia, campos de fonte, estado de verificação, arestas do grafo e ligações de áudio. Campos vazios permanecem null ou arrays vazios — nunca são inventados.",
    searchTitle: "Pesquisa",
    searchP1:
      "GET /v1/search?dataset={family}/{variety}&q= pesquisa dentro de um conjunto de dados nomeado. Tanto dataset como q são obrigatórios. A pesquisa nunca atravessa conjuntos de dados.",
    searchP2:
      "A pesquisa no âmbito do conjunto de dados também existe em GET /v1/{family}/{variety}/search?q= e cobre entradas, conhecimento e fontes dentro desse conjunto de dados.",
    searchMock:
      "Resultados apenas desse conjunto de dados. Sem dataset devolve DATASET_REQUIRED.",
    entriesTitle: "Entradas",
    entriesBody:
      "GET /v1/{family}/{variety}/entries lista entradas lexicais de um conjunto de dados. q, offset e limit são opcionais. Obtenha um registo com /entries/{entry_id}.",
    knowledgeTitle: "Conhecimento e fontes",
    knowledgeBody:
      "GET /v1/{family}/{variety}/sources devolve a bibliografia desse conjunto de dados. Colecções de conhecimento como grammar devolvem registos atestados ou uma lista vazia até uma fonte citada as preencher. Índices de colecção ao nível do país listam caminhos por conjunto de dados isolado; não fundem registos.",
    audioTitle: "Áudio",
    audioBody:
      "Quando uma entrada inclui áudio, cada clip aponta para /v1/{family}/{variety}/audio/{filename}. Os ficheiros permanecem no mesmo conjunto de dados isolado da entrada.",
    webUiTitle: "Interface web",
    webUiBody:
      "A API Platform neste site é /api. Inicie sessão em /api/login para o painel e chave opcional. O formulário de teste ao vivo envia pedidos através de /api/v1 nesta origem, depois para a Linguistic Research API. Os primeiros exemplos estão no Início rápido.",
    openapiTitle: "Contrato OpenAPI",
    openapiBody:
      "Contrato legível por máquina em /v1/openapi.yaml. O repositório de investigação está no GitHub.",
    routesTitle: "Rotas",
    routesBody:
      "As famílias de país incluem saotome, caboverde, guinebissau, angola e os outros índices de país publicados. Os índices não são léxicos fundidos.",
    ctaQuickstart: "Início rápido",
    ctaPlatform: "API Platform",
    ctaOpenapi: "OpenAPI YAML",
  },
  legalOverview: {
    title: "Legal",
    intro:
      "Políticas para Open Knowledge, Linguistic Research, a Forro Vivo App e o Forro Connect — operados pela LIVLU TECHNOLOGIES LTD.",
  },
  legalLayout: {
    title: "Legal",
    policies: "Políticas",
  },
  legalCompany: {
    title: "Empresa",
    intro: "Quem opera o ForroVivo e como os produtos se relacionam entre si.",
    p1BeforeHouse:
      "A LIVLU TECHNOLOGIES LTD é uma sociedade por quotas registada em Inglaterra e País de Gales. Número da empresa 16799761. Pode confirmar o registo em",
    companiesHouse: "Companies House",
    p1AfterHouse: ".",
    p2: "ForroVivo é o nome da plataforma usado pela LIVLU TECHNOLOGIES LTD. Abrange o trabalho de documentar, preservar e estruturar línguas crioulas africanas, e torná-las acessíveis às novas gerações.",
    familyTitle: "A família de produtos",
    openKnowledge:
      "Open Knowledge é este website público: línguas, dicionários, documentação e a API Platform. É a casa pública do trabalho de Linguistic Research do ForroVivo.",
    linguisticResearch:
      "Linguistic Research é a camada de evidência por detrás dos produtos: léxicos isolados, fontes atestadas, metodologia e a Linguistic Research API só de leitura. Cada afirmação linguística deve permanecer rastreável até uma fonte.",
    forroVivoApp:
      "A Forro Vivo App é o produto de aprendizagem para línguas crioulas africanas, começando pelo Forro de São Tomé e Príncipe. Fornece dicionário, lições e exercícios. É aprendizagem por software — não uma substituição de um falante nativo.",
    forroConnect:
      "O Forro Connect liga aprendizes a falantes reais de Forro e detentores de conhecimento cultural para lições ao vivo. O tempo de ensino é o produto. O rendimento comunitário para falantes faz parte de como o Connect foi concebido para funcionar.",
    apiPlatform:
      "A API Platform é a superfície para programadores neste site para chaves e pedidos ao vivo contra a Linguistic Research API. As regras completas estão na Documentação.",
    marksTitle: "Marcas e nomenclatura",
    marksBody:
      "O nome ForroVivo, Open Knowledge, Forro Vivo, Forro Connect e marcas relacionadas são usados pela LIVLU TECHNOLOGIES LTD. Não é permitido uso que confunda o público sobre quem opera os produtos, ou que sugira endosso sem autorização.",
    questionsTitle: "Perguntas",
    questionsBefore: "Para questões de empresa e conformidade,",
    writeToLegal: "escreva para legal",
    questionsAfter: ".",
  },

  legalTerms: {
    title: "Termos de serviço",
    intro: "As regras para usar os produtos ForroVivo e este website.",
    opening:
      "Ao usar este website, juntar-se a uma lista de espera, criar uma conta na API Platform, descarregar ou usar a Forro Vivo App, ou juntar-se ao Forro Connect, concorda com estes termos. Se usar um produto em nome de uma organização, confirma que está autorizado a vincular essa organização.",
    researchTitle: "Open Knowledge e Linguistic Research",
    researchP1:
      "Open Knowledge publica conhecimento linguístico público para línguas crioulas africanas e trabalho linguístico relacionado, incluindo léxicos isolados e documentação. Linguistic Research é a camada de evidência: fontes, metodologia e a Linguistic Research API só de leitura.",
    researchP2:
      "Pode usar dados publicados e a API para investigação, educação, aprendizagem de línguas e tecnologia linguística que respeite o isolamento dos conjuntos de dados. Não deve inventar, fundir ou substituir dados lexicais entre línguas ou variedades. Não deve apresentar formas geradas ou adivinhadas como evidência atestada do ForroVivo.",
    researchP3:
      "A base de conhecimento não é aconselhamento jurídico, médico, de imigração ou oficial de governo. Campos vazios significam que a evidência não foi publicada — não são um convite a inventar conteúdo.",
    appTitle: "Forro Vivo App",
    appP1:
      "A Forro Vivo App é um produto de aprendizagem: dicionário, lições e exercícios, começando pelo Forro de São Tomé e Príncipe. É aprendizagem por software. Não substitui um falante nativo e não é o Forro Connect.",
    appP2:
      "Deve usar a aplicação de forma lícita e em conformidade com os termos da App Store ou de outras plataformas aplicáveis ao seu download. Não deve fazer engenharia inversa, raspar ou redistribuir a aplicação de forma que viole essas regras de plataforma ou estes termos. Voz, áudio e outras capacidades chegam segundo o roteiro do produto e podem mudar à medida que a aplicação se desenvolve.",
    connectTitle: "Forro Connect",
    connectP1:
      "O Forro Connect emparelha aprendizes com falantes reais de Forro e detentores de conhecimento cultural para lições ao vivo. A lição é o produto. Os falantes são pagos pelo tempo de ensino. O conhecimento cultural partilhado numa lição permanece com o falante; o Connect não é um mercado que vende a língua em si como mercadoria.",
    connectP2:
      "O registo na lista de espera não garante um emparelhamento nem um horário de lição. Quando a reserva e o pagamento abrirem, o preço e o que cobre são mostrados antes de pagar. Aprendizes e falantes devem tratar-se com respeito. Assédio, fraude ou uso indevido do Connect podem resultar na remoção da lista de espera ou do serviço.",
    apiTitle: "API Platform",
    apiP1:
      "As contas da API Platform destinam-se a operar chaves e experimentar a Linguistic Research API. As chaves identificam o seu cliente. O acesso de leitura público pode continuar a funcionar sem chave, sujeito a limites de uso justo. Deve manter as chaves secretas, não as partilhar publicamente e não usar a API para atacar, sobrecarregar ou deturpar o serviço.",
    apiP2Before:
      "A autenticação completa, erros, limites de taxa e rotas estão definidos na",
    documentation: "Documentação",
    apiP2After: ". Essas regras técnicas fazem parte destes termos para o uso da API.",
    acceptableTitle: "Uso aceitável",
    acceptableBody:
      "Não deve tentar perturbar o serviço, contornar controlos de acesso, recolher dados pessoais ou usar produtos ForroVivo de forma que prejudique falantes, fontes ou a integridade de Linguistic Research. A LIVLU TECHNOLOGIES LTD pode suspender ou encerrar contas, revogar chaves ou recusar serviço quando estes termos forem violados ou se suspeitar de abuso.",
    pricingTitle: "Preços e facturação",
    pricingBefore:
      "Os produtos gratuitos neste site não exigem pagamento. Quando for oferecido um produto pago ou uma lição ao vivo, o preço é mostrado no momento da compra ou reserva. Para facturas, recibos, reembolsos ou questões de pagamento,",
    contactBilling: "contacte facturação",
    pricingAfter: ".",
    liabilityTitle: "Responsabilidade",
    liabilityBody:
      "O site, os dados de investigação, a aplicação, o Connect e a API são fornecidos para que as pessoas possam aprender, investigar e construir com cuidado. Na máxima extensão permitida pela lei, a LIVLU TECHNOLOGIES LTD não é responsável por perdas indirectas ou consequenciais decorrentes do uso dos produtos. Nada nestes termos limita responsabilidade que não possa ser limitada ao abrigo das leis de Inglaterra e País de Gales.",
    governingTitle: "Lei aplicável",
    governingBefore:
      "Estes termos são regidos pelas leis de Inglaterra e País de Gales. Para questões sobre estes termos,",
    writeToLegal: "escreva para legal",
    governingAfter: ".",
  },
  legalPrivacy: {
    title: "Privacidade",
    intro:
      "Como a LIVLU TECHNOLOGIES LTD trata dados pessoais nos produtos ForroVivo.",
    opening:
      "Esta política explica o que recolhemos, porque o recolhemos e como nos contactar. Abrange Open Knowledge, superfícies de Linguistic Research neste site, listas de espera, a API Platform e páginas de produto ForroVivo relacionadas. A Forro Vivo App e o Forro Connect também podem processar dados necessários para prestar esses produtos, conforme descrito abaixo.",
    whoTitle: "Quem é responsável",
    whoBody:
      "A LIVLU TECHNOLOGIES LTD opera os produtos ForroVivo e é responsável pelos dados pessoais processados através deste website e das superfícies de produto relacionadas aqui descritas. Registada em Inglaterra e País de Gales. Número da empresa 16799761.",
    whatTitle: "O que recolhemos",
    waitlists:
      "Listas de espera. Se se juntar a uma lista de espera para Open Knowledge, Forro Connect, dicionários ou a API Platform, processamos o endereço de email que submete e a lista de espera do produto a que se juntou, para o informar quando esse produto estiver disponível.",
    accounts:
      "Contas da API Platform. Se criar uma conta, processamos o seu endereço de email e credenciais de autenticação para operar a conta, emitir ou substituir chaves de API e proteger o serviço. Também podemos processar códigos de registo quando os aplicar.",
    logs:
      "Registos técnicos. Os registos do servidor podem incluir endereço IP, metadados do pedido e dados técnicos semelhantes necessários para segurança, fiabilidade e prevenção de abuso.",
    app:
      "Forro Vivo App. A aplicação de aprendizagem pode processar informação de conta ou dispositivo exigida pela App Store ou por outras plataformas, e preferências na aplicação necessárias para prestar dicionário, lições e exercícios. O conteúdo linguístico na aplicação é dados de língua, não um perfil da sua vida privada.",
    connect:
      "Forro Connect. Quando o Connect estiver activo, processamos a informação necessária para emparelhar aprendizes e falantes, agendar lições ao vivo e operar o rendimento comunitário pelo tempo de ensino. Isso pode incluir detalhes de contacto e informação relacionada com a lição que fornecer.",
    researchTitle: "Dados de Linguistic Research",
    researchBody:
      "A Linguistic Research API e os léxicos públicos são recursos de documentação linguística. Não foram concebidos para recolher perfis pessoais. Não usamos a API pública de investigação para construir perfis publicitários. Entradas linguísticas atestadas permanecem ligadas a fontes; não são tratadas como dados pessoais sobre utilizadores finais deste site.",
    whyTitle: "Porque processamos dados",
    whyBody:
      "Processamos dados pessoais para prestar os produtos que pede, comunicar sobre listas de espera e contas, proteger o serviço, cumprir obrigações legais e melhorar a fiabilidade. Quando um fornecedor de newsletter ou email estiver configurado, os endereços das listas de espera também podem ser enviados a esse fornecedor para o contactarmos sobre o produto a que se juntou.",
    sharingTitle: "Partilha",
    sharingBody:
      "Não vendemos dados pessoais. Podemos usar processadores que nos ajudam a gerir email, alojamento, segurança ou fluxos de pagamento. Parceiros de plataforma como a App Store podem processar dados ao abrigo dos seus próprios termos quando descarrega ou paga através da respectiva loja. Partilhamos dados quando a lei o exige ou para proteger o serviço e os utilizadores de abuso ou risco de segurança.",
    retentionTitle: "Conservação",
    retentionBody:
      "Conservamos dados de listas de espera, contas e registos apenas durante o tempo necessário para os fins acima, incluindo segurança e requisitos legais. Quando os dados deixam de ser necessários, eliminamo-los ou anonimizamo-los sempre que for prático.",
    choicesTitle: "As suas escolhas",
    choicesBefore:
      "Pode pedir acesso aos dados pessoais que detemos sobre si, pedir-nos para os corrigir ou pedir-nos para eliminar dados de lista de espera ou de conta quando aplicável. Também nos pode pedir para interromper certas comunicações. Para exercer direitos de privacidade,",
    writeToPrivacy: "escreva para privacy",
    choicesAfter: ".",
    securityTitle: "Relatórios de segurança",
    securityBefore:
      "Se acredita que uma conta ou sistema foi comprometido,",
    reportSecurity: "reporte um problema de segurança",
    securityAfter:
      ". Inclua detalhe suficiente para investigarmos. Não use as descobertas para perturbar o serviço ou aceder a dados que não são seus.",
  },
  legalEula: {
    title: "Acordo de licença de utilizador final",
    intro:
      "A licença ao abrigo da qual pode usar software ForroVivo, documentação e materiais de investigação publicados.",
    opening:
      "Este Acordo de Licença de Utilizador Final (“EULA”) é celebrado entre si e a LIVLU TECHNOLOGIES LTD. Abrange este website, a documentação Open Knowledge, a Linguistic Research API e materiais públicos relacionados, e produtos de software ForroVivo incluindo a Forro Vivo App, excepto quando uma licença de loja de plataforma ou um acordo escrito em separado disponha de outro modo.",
    grantTitle: "Concessão de licença",
    grantP1Before: "Sujeito a estes termos e aos",
    termsOfService: "Termos de serviço",
    grantP1After:
      ", a LIVLU TECHNOLOGIES LTD concede-lhe uma licença limitada, não exclusiva e intransmissível para usar o produto ForroVivo aplicável para investigação pessoal ou organizacional, educação, aprendizagem de línguas ou desenvolvimento contra a API pública.",
    grantP2:
      "Esta licença não transfere a propriedade do software ForroVivo, das marcas ou dos materiais originais do projecto. As lojas de plataforma podem conceder direitos ou limites adicionais para aplicações que descarregue através delas.",
    researchTitle: "Materiais de Linguistic Research",
    researchP1:
      "Os materiais publicados de Linguistic Research são fornecidos para investigação e educação. Dicionários e artigos de terceiros mantêm as suas licenças originais. Material original de Linguistic Research é publicado sob CC BY 4.0, salvo indicação em contrário numa página de fonte. A atribuição deve permanecer intacta onde se aplica CC BY 4.0. O website Open Knowledge e a Forro Vivo App permanecem proprietários sob este EULA e não são open source.",
    researchP2:
      "O isolamento de conjuntos de dados faz parte das condições de licença para uso de investigação: não funda, invente ou substitua formas lexicais entre línguas ou variedades e depois as apresente como evidência atestada pelo ForroVivo. Dados em falta devem permanecer em falta em vez de serem adivinhados.",
    appTitle: "Forro Vivo App",
    appBody:
      "A Forro Vivo App é licenciada para uso como aplicação de aprendizagem — dicionário, lições e exercícios — começando pelo Forro. Não pode copiar, modificar, redistribuir ou explorar comercialmente o binário da aplicação ou os seus activos não públicos excepto conforme permitido pelos termos da loja de plataforma e por este EULA. Modelos personalizados e sistemas de lições na aplicação permanecem ligados às práticas de produto e fontes do ForroVivo; não constituem concessão para rebrandear ou revender o sistema de aprendizagem.",
    connectTitle: "Forro Connect",
    connectBody:
      "O Forro Connect é um serviço de lições ao vivo com falantes. O acesso a ferramentas de emparelhamento, reserva ou lição é licenciado apenas para esse fim. Não pode usar o Connect para raspar informação de falantes, revender contactos da comunidade ou extrair conhecimento cultural para um conjunto de dados concorrente sem o acordo informado do falante e quaisquer direitos em separado aplicáveis.",
    apiTitle: "API e documentação",
    apiP1:
      "A Linguistic Research API é só de leitura para dados de léxico. Pode chamar rotas publicadas em conformidade com a Documentação, as regras de autenticação e os limites de uso justo. Não pode usar a API para inventar traduções, escrever em conjuntos de dados ou apresentar respostas como algo diferente do resultado de investigação ForroVivo.",
    apiP2Before: "As regras técnicas na",
    apiDocumentation: "Documentação da API",
    apiP2After: "fazem parte deste EULA para clientes da API.",
    restrictionsTitle: "Restrições",
    restrictionsBefore:
      "Excepto quando a lei proíbe estes limites, não pode fazer engenharia inversa do software ForroVivo, remover avisos proprietários, usar marcas ForroVivo de forma enganosa ou sublicenciar os produtos como se fosse o operador. Testes de segurança não devem perturbar o serviço nem aceder a dados que não são seus; reporte problemas através do contacto de segurança na página",
    legalLink: "Legal",
    restrictionsAfter: ".",
    terminationTitle: "Cessação",
    terminationBody:
      "Esta licença continua até ser terminada por si ou pela LIVLU TECHNOLOGIES LTD. Cessa automaticamente se violar este EULA ou os Termos de serviço. Na cessação, deve deixar de usar o software afectado e destruir cópias locais que não esteja de outro modo licenciado a conservar. Disposições que pela sua natureza devam sobreviver — incluindo propriedade, limites de licença sobre uso indevido de investigação e limites de responsabilidade — continuam a aplicar-se.",
    governingTitle: "Lei aplicável",
    governingBefore:
      "Este EULA é regido pelas leis de Inglaterra e País de Gales. Questões sobre licenciamento:",
    writeToLegal: "escreva para legal",
    governingAfter: ".",
  },
  apiPage: {
    productEyebrow: "Produto",
    title: "API Platform",
    body: "Construa com dados linguísticos atestados. Faça a gestão das suas chaves e experimente pedidos ao vivo — a referência completa está na Documentação.",
    documentation: "Documentação",
  },
  appCreditsPage: {
    breadcrumb: "Forro Vivo App",
    companyTitle: "Empresa",
    companyBody:
      "A LIVLU TECHNOLOGIES LTD é uma sociedade por quotas registada em Inglaterra e País de Gales. A Forro Vivo App é um produto ForroVivo operado pela LIVLU TECHNOLOGIES LTD.",
    companiesHouse: "Companies House",
  },
};

export function getSiteCopy(locale: Locale): SiteCopy {
  return locale === "pt" ? pt : siteCopyEn;
}
