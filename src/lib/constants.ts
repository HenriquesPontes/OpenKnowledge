import { API_ORIGIN, APP_ORIGIN, APP_STORE_URL, GITHUB_URL } from "./catalog";

export const nav = {
  links: [
    { label: "How it works", href: "/#how-it-works" },
    { label: "Dictionaries", href: "/dictionaries" },
  ],
  menu: {
    label: "Products",
    columns: [
      {
        heading: "Explore products",
        size: "large",
        items: [
          { label: "Overview", href: "/overview" },
          { label: "Forro Vivo App", href: "/app" },
          { label: "Forro Connect", href: "/connect" },
          { label: "Languages", href: "/languages" },
          { label: "API Platform", href: "/api" },
        ],
      },
      {
        heading: "Learn",
        size: "medium",
        items: [
          { label: "Documentation", href: "/docs" },
          { label: "Quickstart", href: "/docs/quickstart" },
          { label: "Methodology", href: "/docs/methodology" },
          { label: "Research", href: "/research" },
          { label: "Knowledge Base", href: "/knowledge" },
          { label: "Machine translation", href: "/translation" },
        ],
      },
      {
        heading: "Company",
        size: "medium",
        items: [
          { label: "About", href: "/about" },
          { label: "Developers", href: "/developers" },
          { label: "GitHub", href: GITHUB_URL, external: true },
          { label: "Legal", href: "/legal" },
        ],
      },
    ],
  },
  cta: "Try Forro Vivo",
  ctaHref: APP_STORE_URL,
  login: {
    label: "API Platform",
    href: `${API_ORIGIN}/docs`,
  },
  dictionaryAuth: {
    loginLabel: "Log in",
    loginHref: "/dictionaries/login",
    cta: "Create an account — It's free",
    ctaHref: "/dictionaries/register",
  },
} as const;

export const hero = {
  headline: "Open knowledge for the Creole languages",
  subheadline:
    "The first open-source project for Creole languages in the world.",
  waitlistPlaceholder: "Enter email",
  waitlistCta: "Join waitlist",
} as const;

export const africaMap = {
  title: "Explore a world of African Languages",
  subtitle:
    "Discover Africa's rich linguistic heritage. Click on any country to learn more about its history and global presence.",
} as const;

export const countries = [
  {
    id: "saotome",
    number: "1",
    title: "São Tomé and Príncipe",
    aliases: "Forro, Angolar, Lung’Ie",
    isoA2: "ST",
    href: "/languages/saotome",
    datasetPrefix: "saotome",
    isolation:
      "Index only. Forro, Angolar, and Lung’Ie are separate datasets. Do not copy between them. Do not insert Cabo Verdean or Guinea-Bissau vocabulary.",
  },
  {
    id: "caboverde",
    number: "2",
    title: "Cabo Verde",
    aliases: "Kabuverdianu island varieties",
    isoA2: "CV",
    href: "/languages/caboverde",
    datasetPrefix: "caboverde",
    isolation:
      "Index only. Each inhabited island is a separate dataset. Do not copy between islands. Do not insert Guinea-Bissau Kriol, Forro, Angolar, or Lung’Ie.",
  },
  {
    id: "guinebissau",
    number: "3",
    title: "Guiné-Bissau",
    aliases: "Kriol regional varieties",
    isoA2: "GW",
    href: "/languages/guinebissau",
    datasetPrefix: "guinebissau",
    isolation:
      "Index only. Each region is a separate dataset. Do not copy between regions. Do not insert Cabo Verdean island creoles, Casamance Kriyol, Forro, Angolar, or Lung’Ie.",
  },
  {
    id: "angola",
    number: "4",
    title: "Angola",
    aliases: "Angola Contruy",
    isoA2: "AO",
    href: "/languages/angola",
    datasetPrefix: "angola",
    isolation:
      "Angola Contruy is the Angola country dataset. It is not Angolar / Ngola of São Tomé.",
  },
] as const;

export const languages = [
  {
    id: "forro",
    country: "saotome",
    title: "Forro",
    aliases: "Santome / Santomense",
    autonym: "lungwa santome",
    group: "São Tomé",
    iso: "cri",
    dataset: "saotome/forro",
    href: "/languages/forro",
    github: `${GITHUB_URL}/tree/main/data/saotome_dataset/forro`,
    isolation:
      "Forro / Santome / Santomense only. Do not insert Angolar or Lung’Ie vocabulary.",
  },
  {
    id: "angolar",
    country: "saotome",
    title: "Angolar",
    aliases: "Ngola",
    autonym: "n'golá",
    group: "São Tomé",
    iso: "aoa",
    dataset: "saotome/angolar",
    href: "/languages/angolar",
    github: `${GITHUB_URL}/tree/main/data/saotome_dataset/angolar`,
    isolation:
      "Angolar / Ngola only. This is not Angola Contruy and not data/angola_dataset/.",
  },
  {
    id: "lungie",
    country: "saotome",
    title: "Lung’Ie",
    aliases: "Principense",
    autonym: "lung’Ie",
    group: "Príncipe",
    iso: "pre",
    dataset: "saotome/lungie",
    href: "/languages/lungie",
    github: `${GITHUB_URL}/tree/main/data/saotome_dataset/lungie`,
    isolation: "Lung’Ie / Principense only. Do not insert Forro or Angolar vocabulary.",
  },
  {
    id: "santiago",
    country: "caboverde",
    title: "Santiago",
    aliases: "Kabuverdianu of Santiago",
    autonym: "Santiagu / Badiu",
    group: "Sotavento",
    iso: "kea",
    dataset: "caboverde/santiago",
    href: "/languages/santiago",
    github: `${GITHUB_URL}/tree/main/data/caboverde_dataset/santiago`,
    isolation:
      "Kabuverdianu of Santiago only. Do not insert other island varieties, Guinea-Bissau Kriol, or a São Tomé creole.",
  },
  {
    id: "fogo",
    country: "caboverde",
    title: "Fogo",
    aliases: "Kabuverdianu of Fogo",
    autonym: "Fogo",
    group: "Sotavento",
    iso: "kea",
    dataset: "caboverde/fogo",
    href: "/languages/fogo",
    github: `${GITHUB_URL}/tree/main/data/caboverde_dataset/fogo`,
    isolation:
      "Kabuverdianu of Fogo only. Do not insert other island varieties, Guinea-Bissau Kriol, or a São Tomé creole.",
  },
  {
    id: "maio",
    country: "caboverde",
    title: "Maio",
    aliases: "Kabuverdianu of Maio",
    autonym: "Maio",
    group: "Sotavento",
    iso: "kea",
    dataset: "caboverde/maio",
    href: "/languages/maio",
    github: `${GITHUB_URL}/tree/main/data/caboverde_dataset/maio`,
    isolation:
      "Kabuverdianu of Maio only. Do not insert other island varieties, Guinea-Bissau Kriol, or a São Tomé creole.",
  },
  {
    id: "brava",
    country: "caboverde",
    title: "Brava",
    aliases: "Kabuverdianu of Brava",
    autonym: "Brava",
    group: "Sotavento",
    iso: "kea",
    dataset: "caboverde/brava",
    href: "/languages/brava",
    github: `${GITHUB_URL}/tree/main/data/caboverde_dataset/brava`,
    isolation:
      "Kabuverdianu of Brava only. Do not insert other island varieties, Guinea-Bissau Kriol, or a São Tomé creole.",
  },
  {
    id: "saovicente",
    country: "caboverde",
    title: "São Vicente",
    aliases: "Kabuverdianu of São Vicente",
    autonym: "São Vicente",
    group: "Barlavento",
    iso: "kea",
    dataset: "caboverde/saovicente",
    href: "/languages/saovicente",
    github: `${GITHUB_URL}/tree/main/data/caboverde_dataset/saovicente`,
    isolation:
      "Kabuverdianu of São Vicente only. Do not insert other island varieties, Guinea-Bissau Kriol, or a São Tomé creole.",
  },
  {
    id: "santoantao",
    country: "caboverde",
    title: "Santo Antão",
    aliases: "Kabuverdianu of Santo Antão",
    autonym: "Santo Antão",
    group: "Barlavento",
    iso: "kea",
    dataset: "caboverde/santoantao",
    href: "/languages/santoantao",
    github: `${GITHUB_URL}/tree/main/data/caboverde_dataset/santoantao`,
    isolation:
      "Kabuverdianu of Santo Antão only. Do not insert other island varieties, Guinea-Bissau Kriol, or a São Tomé creole.",
  },
  {
    id: "saonicolau",
    country: "caboverde",
    title: "São Nicolau",
    aliases: "Kabuverdianu of São Nicolau",
    autonym: "São Nicolau",
    group: "Barlavento",
    iso: "kea",
    dataset: "caboverde/saonicolau",
    href: "/languages/saonicolau",
    github: `${GITHUB_URL}/tree/main/data/caboverde_dataset/saonicolau`,
    isolation:
      "Kabuverdianu of São Nicolau only. Do not insert other island varieties, Guinea-Bissau Kriol, or a São Tomé creole.",
  },
  {
    id: "sal",
    country: "caboverde",
    title: "Sal",
    aliases: "Kabuverdianu of Sal",
    autonym: "Sal",
    group: "Barlavento",
    iso: "kea",
    dataset: "caboverde/sal",
    href: "/languages/sal",
    github: `${GITHUB_URL}/tree/main/data/caboverde_dataset/sal`,
    isolation:
      "Kabuverdianu of Sal only. Do not insert other island varieties, Guinea-Bissau Kriol, or a São Tomé creole.",
  },
  {
    id: "boavista",
    country: "caboverde",
    title: "Boa Vista",
    aliases: "Kabuverdianu of Boa Vista",
    autonym: "Boa Vista",
    group: "Barlavento",
    iso: "kea",
    dataset: "caboverde/boavista",
    href: "/languages/boavista",
    github: `${GITHUB_URL}/tree/main/data/caboverde_dataset/boavista`,
    isolation:
      "Kabuverdianu of Boa Vista only. Do not insert other island varieties, Guinea-Bissau Kriol, or a São Tomé creole.",
  },
  {
    id: "bissau",
    country: "guinebissau",
    title: "Bissau",
    aliases: "Kriol of Bissau",
    autonym: "Bissau",
    group: "Setor Autónomo de Bissau",
    iso: "pov",
    dataset: "guinebissau/bissau",
    href: "/languages/bissau",
    github: `${GITHUB_URL}/tree/main/data/guinebissau_dataset/bissau`,
    isolation:
      "Kriol of Bissau only. Do not insert other regions, Cabo Verdean island creoles, Casamance Kriyol, or a São Tomé creole.",
  },
  {
    id: "biombo",
    country: "guinebissau",
    title: "Biombo",
    aliases: "Kriol of Biombo",
    autonym: "Biombo",
    group: "Região de Biombo",
    iso: "pov",
    dataset: "guinebissau/biombo",
    href: "/languages/biombo",
    github: `${GITHUB_URL}/tree/main/data/guinebissau_dataset/biombo`,
    isolation:
      "Kriol of Biombo only. Do not insert other regions, Cabo Verdean island creoles, Casamance Kriyol, or a São Tomé creole.",
  },
  {
    id: "cacheu",
    country: "guinebissau",
    title: "Cacheu",
    aliases: "Kriol of Cacheu",
    autonym: "Cacheu",
    group: "Região de Cacheu",
    iso: "pov",
    dataset: "guinebissau/cacheu",
    href: "/languages/cacheu",
    github: `${GITHUB_URL}/tree/main/data/guinebissau_dataset/cacheu`,
    isolation:
      "Kriol of Cacheu only. Do not insert other regions, Cabo Verdean island creoles, Casamance Kriyol, or a São Tomé creole.",
  },
  {
    id: "oio",
    country: "guinebissau",
    title: "Oio",
    aliases: "Kriol of Oio",
    autonym: "Oio",
    group: "Região de Oio",
    iso: "pov",
    dataset: "guinebissau/oio",
    href: "/languages/oio",
    github: `${GITHUB_URL}/tree/main/data/guinebissau_dataset/oio`,
    isolation:
      "Kriol of Oio only. Do not insert other regions, Cabo Verdean island creoles, Casamance Kriyol, or a São Tomé creole.",
  },
  {
    id: "bafata",
    country: "guinebissau",
    title: "Bafatá",
    aliases: "Kriol of Bafatá",
    autonym: "Bafatá",
    group: "Região de Bafatá",
    iso: "pov",
    dataset: "guinebissau/bafata",
    href: "/languages/bafata",
    github: `${GITHUB_URL}/tree/main/data/guinebissau_dataset/bafata`,
    isolation:
      "Kriol of Bafatá only. Do not insert other regions, Cabo Verdean island creoles, Casamance Kriyol, or a São Tomé creole.",
  },
  {
    id: "gabu",
    country: "guinebissau",
    title: "Gabú",
    aliases: "Kriol of Gabú",
    autonym: "Gabú",
    group: "Região de Gabú",
    iso: "pov",
    dataset: "guinebissau/gabu",
    href: "/languages/gabu",
    github: `${GITHUB_URL}/tree/main/data/guinebissau_dataset/gabu`,
    isolation:
      "Kriol of Gabú only. Do not insert other regions, Cabo Verdean island creoles, Casamance Kriyol, or a São Tomé creole.",
  },
  {
    id: "quinara",
    country: "guinebissau",
    title: "Quinara",
    aliases: "Kriol of Quinara",
    autonym: "Quinara",
    group: "Região de Quinara",
    iso: "pov",
    dataset: "guinebissau/quinara",
    href: "/languages/quinara",
    github: `${GITHUB_URL}/tree/main/data/guinebissau_dataset/quinara`,
    isolation:
      "Kriol of Quinara only. Do not insert other regions, Cabo Verdean island creoles, Casamance Kriyol, or a São Tomé creole.",
  },
  {
    id: "tombali",
    country: "guinebissau",
    title: "Tombali",
    aliases: "Kriol of Tombali",
    autonym: "Tombali",
    group: "Região de Tombali",
    iso: "pov",
    dataset: "guinebissau/tombali",
    href: "/languages/tombali",
    github: `${GITHUB_URL}/tree/main/data/guinebissau_dataset/tombali`,
    isolation:
      "Kriol of Tombali only. Do not insert other regions, Cabo Verdean island creoles, Casamance Kriyol, or a São Tomé creole.",
  },
  {
    id: "bolama",
    country: "guinebissau",
    title: "Bolama",
    aliases: "Kriol of Bolama-Bijagós",
    autonym: "Bolama",
    group: "Região de Bolama-Bijagós",
    iso: "pov",
    dataset: "guinebissau/bolama",
    href: "/languages/bolama",
    github: `${GITHUB_URL}/tree/main/data/guinebissau_dataset/bolama`,
    isolation:
      "Kriol of Bolama only. Do not insert other regions, Cabo Verdean island creoles, Casamance Kriyol, or a São Tomé creole.",
  },
  {
    id: "angola",
    country: "angola",
    title: "Angola Contruy",
    aliases: "Angola (country)",
    autonym: "Angola Contruy",
    group: "Angola",
    iso: null,
    dataset: "angola",
    href: "/languages/angola",
    github: `${GITHUB_URL}/tree/main/data/angola_dataset`,
    isolation:
      "Angola Contruy is the Angola country dataset. It is not Angolar / Ngola of São Tomé. Do not copy data/saotome_dataset/angolar/ into this folder.",
  },
] as const;

export const lexiconLocations: Record<string, { lat: number; lon: number }> = {
  "saotome/forro": { lat: 0.3365, lon: 6.7273 },
  "saotome/angolar": { lat: 0.1333, lon: 6.65 },
  "saotome/lungie": { lat: 1.6136, lon: 7.4058 },
  "caboverde/santiago": { lat: 14.933, lon: -23.513 },
  "caboverde/fogo": { lat: 14.896, lon: -24.498 },
  "caboverde/maio": { lat: 15.138, lon: -23.208 },
  "caboverde/brava": { lat: 14.871, lon: -24.696 },
  "caboverde/saovicente": { lat: 16.89, lon: -24.988 },
  "caboverde/santoantao": { lat: 17.019, lon: -25.065 },
  "caboverde/saonicolau": { lat: 16.615, lon: -24.298 },
  "caboverde/sal": { lat: 16.755, lon: -22.945 },
  "caboverde/boavista": { lat: 16.176, lon: -22.917 },
  "guinebissau/bissau": { lat: 11.863, lon: -15.598 },
  "guinebissau/biombo": { lat: 11.887, lon: -15.851 },
  "guinebissau/cacheu": { lat: 12.271, lon: -16.165 },
  "guinebissau/oio": { lat: 12.483, lon: -15.217 },
  "guinebissau/bafata": { lat: 12.167, lon: -14.658 },
  "guinebissau/gabu": { lat: 12.28, lon: -14.222 },
  "guinebissau/quinara": { lat: 11.583, lon: -15 },
  "guinebissau/tombali": { lat: 11.283, lon: -15.25 },
  "guinebissau/bolama": { lat: 11.583, lon: -15.483 },
  angola: { lat: -8.838, lon: 13.234 },
};

export const apiSection = {
  title: "Build with attested linguistic knowledge",
  command: `curl ${API_ORIGIN}/v1/languages`,
  tryHref: "/api",
  playground: `${API_ORIGIN}/docs`,
} as const;

export const cloneSection = {
  command: `git clone ${GITHUB_URL}.git`,
  github: GITHUB_URL,
  cta: "View on GitHub",
} as const;

export const architecture = {
  title: "How it works",
  steps: [
    { label: "Source", href: "/docs/methodology" },
    { label: "Extraction", href: "/docs/methodology" },
    { label: "Verification", href: "/docs/methodology" },
    { label: "Structured entry", href: "/knowledge" },
    { label: "Review", href: "/docs/methodology" },
    { label: "Published dataset", href: GITHUB_URL },
    { label: "API", href: "/api" },
  ],
  tree: {
    root: { label: "ForroVivo", href: APP_ORIGIN },
    products: [
      {
        label: "Open Knowledge",
        href: "/",
        items: [
          { label: "Research", href: "/research" },
          { label: "Dictionary", href: "/languages" },
          { label: "Culture", href: "/about" },
          { label: "Data", href: "/knowledge" },
          { label: "API", href: "/api" },
        ],
      },
      {
        label: "ForroVivo App",
        href: "/app",
        items: [
          { label: "Free learning", href: APP_STORE_URL },
          { label: "Dictionary", href: APP_STORE_URL },
          { label: "Lessons", href: APP_STORE_URL },
          { label: "Exercises", href: APP_STORE_URL },
        ],
      },
      {
        label: "Forro Connect",
        href: "/connect",
        items: [
          { label: "Waitlist matching", href: "/connect" },
          { label: "Learner to native speaker" },
        ],
      },
    ],
    outcomes: [
      { label: "Language preservation" },
      { label: "Community empowerment" },
    ],
  },
} as const;

export const appArchitecture = {
  title: "How it works",
  description:
    "The Forro Vivo App is the learning product: dictionary, lessons, exercises and language practice. It lives on the App Store. It is not this Open Knowledge website.",
  steps: [
    { label: "Dictionary" },
    { label: "Lessons" },
    { label: "Exercises" },
    { label: "Language practice" },
    { label: "App Store" },
  ],
} as const;

export const appLanding = {
  title: "Aprenda Forro. Preserve a Cultura.",
  description:
    "O primeiro aplicativo completo dedicado à língua Forro de São Tomé e Príncipe. Vocabulário, lições e contexto cultural na ponta dos seus dedos.",
} as const;

export const appWhy = {
  title: "Why Choose Forro Vivo?",
  cards: [
    {
      title: "Stronger Family Connections",
      body: "Communicate with family and friends, deepening your bond through shared language.",
      image: "/images/app/why-family.png",
      imageAlt: "A family weaving together at home",
    },
    {
      title: "New Global Opportunities",
      body: "Language proficiency unlocks unique business and personal growth opportunities across the continent.",
      image: "/images/app/why-opportunities.png",
      imageAlt: "A family exploring connections across Africa on a tablet",
    },
    {
      title: "Richer Travel Experiences",
      body: "Enhance your African adventures with deeper immersion and genuine connections with communities. All of our greatest memories always start with a simple Olá, bom dia, boa tarde, boa noite.",
      image: "/images/app/why-travel.png",
      imageAlt: "A Forro language lesson outdoors with the community",
    },
  ],
} as const;

export const appRoadmap = {
  title: "Roadmap",
  description:
    "From Linguistic Research to a public learning app. Early betas built the dictionary and the academy. Version 4 went public. Voice and audio arrive in 5.0.0, now a reliable beta on track for release.",
  steps: [
    {
      label: "Foundation",
      date: "23 March 2023",
      description:
        "Linguistic Research begins. There is no app yet, only the question of how to preserve Forro. Founder: Henriques Pontes. Early collaborator: Luís Lima.",
      href: "/research",
    },
    {
      label: "1.0.0",
      date: "Beta",
      description:
        "First TestFlight. The dictionary and lexicon go into people’s hands: look up Forro, Portuguese, and English.",
    },
    {
      label: "2.0.2",
      date: "Beta",
      description:
        "Early TestFlight continues. The lexicon grows. There is still no voice and no audio in the app.",
    },
    {
      label: "3.5.0",
      date: "Beta",
      description:
        "Academy and lessons. Forro becomes a path to walk, not only a list of words. Still without voice or audio.",
    },
    {
      label: "4.0.0",
      date: "January 2026",
      description:
        "The jump to public. Forro Vivo leaves TestFlight and ships on the App Store dictionary and academy, not voice.",
    },
    {
      label: "4.0.5",
      date: "March 2026",
      description:
        "A total redesign: modern, clean aesthetic and functionality. This is the current public release. Voice and audio are not in 4.",
    },
    {
      label: "5.0.0",
      date: "Beta",
      description:
        "Voice capability and audio arrive here. Reliable beta, on track for public release.",
    },
  ],
} as const;

export const connectArchitecture = {
  title: "How it works",
  description:
    "Forro Connect connects learners directly with real Forro speakers and cultural knowledge holders.",
  steps: [
    { label: "Learner" },
    { label: "Native speaker" },
    { label: "Direct match" },
    { label: "Live lesson" },
    { label: "Cultural knowledge" },
    { label: "Community income" },
  ],
} as const;

export const productOverview = {
  eyebrow: "Products",
  title: "Overview",
  description:
    "ForroVivo products for learning, community, languages, and public linguistic data. Open Knowledge is this site. Machine translation is a capability, not a product.",
  statement: {
    before: "Our work is to ",
    preserve: "document, preserve, and structure",
    middle: " African Creole languages and make them ",
    accessible: "accessible",
    after: " to new generations.",
  },
  collage: [
    {
      src: "/images/overview/coconut.png",
      alt: "Opening a coconut",
      grow: 1.15,
    },
    {
      src: "/images/overview/palm.png",
      alt: "Climbing a palm tree",
      grow: 0.9,
    },
    {
      src: "/images/overview/rest.png",
      alt: "Resting in the shade",
      grow: 1.2,
    },
    {
      src: "/images/overview/bao.png",
      alt: "Playing Bao",
      grow: 1,
    },
    {
      src: "/images/overview/path.png",
      alt: "Walking at dusk",
      grow: 1.05,
    },
    {
      src: "/images/overview/market.png",
      alt: "A street market",
      grow: 1.3,
    },
    {
      src: "/images/overview/bicycle.png",
      alt: "A child riding a bicycle",
      grow: 0.85,
    },
    {
      src: "/images/overview/baskets.png",
      alt: "Baskets of coconuts",
      grow: 1.2,
    },
  ],
  products: [
    {
      label: "Forro Vivo App",
      href: "/app",
      description:
        "The learning product for Forro and related Creole languages: dictionary, lessons, exercises and language practice. On the App Store.",
    },
    {
      label: "Forro Connect",
      href: "/connect",
      description:
        "Connects learners directly with real Forro speakers and cultural knowledge holders.",
    },
    {
      label: "Languages",
      href: "/languages",
      description:
        "Isolated lexicons by country. São Tomé and Príncipe, Cabo Verde, Guiné-Bissau, and Angola. Each folder is its own lexicon.",
    },
    {
      label: "API Platform",
      href: "/api",
      description:
        "Public, read-only linguistic API at api.forrovivo.com. GET only. Does not invent translations, merge languages, or write lexicon data.",
    },
  ],
} as const;

export const translationArchitecture = {
  title: "How it works",
  description:
    "Translation is only as reliable as the evidence under it. Isolated datasets, verified entries, then grounded models. Missing data is preferable to incorrect data.",
  steps: [
    { label: "Isolated lexicon" },
    { label: "Attested sources" },
    { label: "Structured pairs" },
    { label: "Grounded model" },
    { label: "Human review" },
  ],
} as const;

export const translationPage = {
  description:
    "Machine translation for African Creole languages, grounded in isolated lexicons and attested sources. Low-resource languages are especially vulnerable to fabricated vocabulary.",
  heroLead: "Grounded",
  heroEmphasisA: "translation",
  heroMid: " for African Creole ",
  heroEmphasisB: "languages",
  heroTail: " that puts evidence first",
  questionsTitle: "Translation is only as reliable as the evidence under it.",
  questionsBody:
    "See how isolated lexicons, attested sources, and human review come before any model.",
  questionsCta: "Learn more",
  questionsHref: "/docs/methodology",
  releasesTitle: "How it works",
  releases: [
    {
      title: "Isolated lexicon",
      body: "Each folder is its own lexicon. São Tomé and Príncipe, Cabo Verde, Guiné-Bissau, and Angola stay separate. Do not copy between them.",
      href: "/languages",
      linkLabel: "Open languages",
      layer: "Isolated lexicon",
      surface: "Languages",
    },
    {
      title: "Attested sources",
      body: "The ForroVivo Knowledge Base does not treat AI-generated information as linguistic evidence. Every documented linguistic claim should be traceable to a source.",
      href: "/research",
      linkLabel: "Open research",
      layer: "Attested sources",
      surface: "Research",
    },
    {
      title: "Human review",
      body: "Structured pairs, then grounded models. Missing data is preferable to incorrect data. This Open Knowledge site does not implement translation.",
      href: "/docs/methodology",
      linkLabel: "Open methodology",
      layer: "Human review",
      surface: "Methodology",
    },
  ],
  wellBeing:
    "This Open Knowledge site does not implement translation. Translation is a ForroVivo capability, not a product.",
  links: [
    { heading: "Languages", label: "Isolated lexicons", href: "/languages" },
    { heading: "Research", label: "Linguistic Research", href: "/research" },
    { heading: "Methodology", label: "Evidence-first pipeline", href: "/docs/methodology" },
    { heading: "Knowledge", label: "Knowledge Base", href: "/knowledge" },
    { heading: "API", label: "API Platform", href: "/api" },
  ],
} as const;

export const docsNav = [
  {
    heading: "Getting started",
    links: [
      { label: "Introduction", href: "/docs" },
      { label: "Quickstart", href: "/docs/quickstart" },
      { label: "Authentication", href: "/developers" },
      { label: "Rate limits", href: "/developers" },
    ],
  },
  {
    heading: "Knowledge",
    links: [
      { label: "Languages", href: "/languages" },
      { label: "Lexical entries", href: "/knowledge" },
      { label: "Sources", href: "/research" },
    ],
  },
  {
    heading: "API reference",
    links: [
      { label: "GET /languages", href: "/docs/api-reference" },
      { label: "GET /entries", href: "/docs/api-reference" },
      { label: "GET /search", href: "/docs/api-reference" },
      { label: "GET /sources", href: "/docs/api-reference" },
    ],
  },
  {
    heading: "Research",
    links: [
      { label: "Methodology", href: "/docs/methodology" },
      { label: "Sources", href: "/research" },
      { label: "GitHub", href: GITHUB_URL },
    ],
  },
] as const;

export const apiPaths = [
  { method: "GET", path: "/v1", detail: "Service identity and catalog links." },
  { method: "GET", path: "/v1/kb", detail: "Knowledge Base collection map." },
  { method: "GET", path: "/v1/languages", detail: "Isolated lexicons. Not a merged word list." },
  { method: "GET", path: "/v1/datasets", detail: "Published dataset index." },
  {
    method: "GET",
    path: "/v1/saotome/forro/lookup?headword=",
    detail: "Look up one Forro headword.",
  },
  {
    method: "GET",
    path: "/v1/caboverde/{island}/lookup?headword=",
    detail: "Look up one Kabuverdianu island variety.",
  },
  {
    method: "GET",
    path: "/v1/guinebissau/{region}/lookup?headword=",
    detail: "Look up one Guinea-Bissau regional Kriol variety.",
  },
  {
    method: "GET",
    path: "/v1/angola/lookup?headword=",
    detail: "Look up Angola Contruy. This is not Angolar.",
  },
  {
    method: "GET",
    path: "/v1/search?dataset=saotome/forro&q=",
    detail: "Search inside one named dataset only.",
  },
  {
    method: "GET",
    path: "/v1/{dataset}/entries",
    detail: "Lexical entries from that folder only.",
  },
  {
    method: "GET",
    path: "/v1/{dataset}/sources",
    detail: "Bibliography for that folder.",
  },
] as const;

export const principle =
  "The ForroVivo Knowledge Base does not treat AI-generated information as linguistic evidence. Every documented linguistic claim should be traceable to a source.";

export const footer = {
  companyName: "LIVLU TECHNOLOGIES LTD",
  companyNumber: "16799761",
  registration: "Registered in England and Wales",
  companiesHouseHref:
    "https://find-and-update.company-information.service.gov.uk/company/16799761",
  links: [
    { label: "Legal", href: "/legal" },
    { label: "Privacy", href: "/legal#privacy" },
    { label: "EULA", href: "/legal#eula" },
  ],
} as const;
