import { API_ORIGIN, APP_ORIGIN, APP_STORE_URL, GITHUB_URL } from "./catalog";

export const howItWorks = {
  hash: "#how-it-works",
  home: "/#how-it-works",
  paths: ["/", "/connect", "/docs/methodology"],
} as const;

export function howItWorksHref(pathname: string) {
  if (pathname === "/connect" || pathname.startsWith("/connect/")) {
    return pathname === "/connect" ? howItWorks.hash : "/connect#how-it-works";
  }
  return (howItWorks.paths as readonly string[]).includes(pathname)
    ? howItWorks.hash
    : howItWorks.home;
}

export function sectionNavLink(pathname: string) {
  if (pathname === "/app" || pathname.startsWith("/app/")) {
    return {
      label: "Roadmap",
      href: pathname === "/app" ? "#roadmap" : "/app#roadmap",
    };
  }
  return { label: "How it works", href: howItWorksHref(pathname) };
}

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
        ],
      },
      {
        heading: "Learn",
        size: "medium",
        items: [
          { label: "Documentation", href: "/docs" },
          { label: "API Platform", href: "/api" },
          { label: "Methodology", href: "/docs/methodology" },
          { label: "Research", href: "/research" },
          { label: "Translation capability", href: "/translation" },
        ],
      },
      {
        heading: "Company",
        size: "medium",
        items: [
          { label: "About", href: "/about" },
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
    href: "/api/login",
  },
  dictionaryAuth: {
    loginLabel: "Log in",
    loginHref: "/dictionaries/login",
    cta: "Create an account — It's free",
    ctaHref: "/dictionaries/register",
  },
  apiAuth: {
    loginLabel: "Log in",
    loginHref: "/api/login",
    cta: "Create an account — It's free",
    ctaHref: "/api/register",
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

/** SVG admin1 path ids from public/images/maps/africa/{st,cv,gw}.svg → isolated lexicon. */
export const lexiconMapRegions: Record<string, string> = {
  STP: "saotome/lungie",
  ST01: "saotome/forro",
  ST02: "saotome/forro",
  ST03: "saotome/angolar",
  ST04: "saotome/forro",
  ST05: "saotome/forro",
  ST06: "saotome/forro",
  CVBR: "caboverde/brava",
  CVCF: "caboverde/fogo",
  CVMO: "caboverde/fogo",
  CVSF: "caboverde/fogo",
  CVTA: "caboverde/santiago",
  CVCA: "caboverde/santiago",
  CVRS: "caboverde/santiago",
  CVPR: "caboverde/santiago",
  CVSD: "caboverde/santiago",
  CVCR: "caboverde/santiago",
  CVSM: "caboverde/santiago",
  CVSS: "caboverde/santiago",
  CVSO: "caboverde/santiago",
  CVMA: "caboverde/maio",
  CVBV: "caboverde/boavista",
  CVRB: "caboverde/saonicolau",
  CVTS: "caboverde/saonicolau",
  CVSL: "caboverde/sal",
  CVSV: "caboverde/saovicente",
  CVRG: "caboverde/santoantao",
  CVPN: "caboverde/santoantao",
  CVPA: "caboverde/santoantao",
  GWGA: "guinebissau/gabu",
  GWTO: "guinebissau/tombali",
  GWBA: "guinebissau/bafata",
  GWOI: "guinebissau/oio",
  GWCA: "guinebissau/cacheu",
  GWBM: "guinebissau/biombo",
  GWBS: "guinebissau/bissau",
  GWQU: "guinebissau/quinara",
  GWBL: "guinebissau/bolama",
};

export const apiSection = {
  title: "Build with attested linguistic knowledge",
  command: `curl ${API_ORIGIN}/v1/languages`,
  tryHref: "/api",
  playground: "/api#try",
} as const;

export const cloneSection = {
  command: `git clone ${GITHUB_URL}.git`,
  github: GITHUB_URL,
  cta: "View on GitHub",
} as const;

export type ArchitectureProductItem = {
  label: string;
  href?: string;
};

export type ArchitectureProduct = {
  label: string;
  href: string;
  items: readonly ArchitectureProductItem[];
};

const architectureProducts: readonly ArchitectureProduct[] = [
  {
    label: "Open Knowledge",
    href: "/",
    items: [
      { label: "Research", href: "/research" },
      { label: "Dictionary", href: "/languages" },
      { label: "Culture", href: "/about" },
      { label: "Data", href: "/languages" },
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
      { label: "Learner to native speaker", href: "/connect" },
      { label: "Community income", href: "/connect/income" },
    ],
  },
];

export const architecture = {
  title: "How it works",
  steps: [
    { label: "Source", href: "/docs/methodology" },
    { label: "Extraction", href: "/docs/methodology" },
    { label: "Verification", href: "/docs/methodology" },
    { label: "Structured entry", href: "/languages" },
    { label: "Review", href: "/docs/methodology" },
    { label: "Published dataset", href: GITHUB_URL },
    { label: "API", href: "/api" },
  ],
  tree: {
    root: { label: "ForroVivo", href: APP_ORIGIN },
    products: architectureProducts,
    outcomes: [
      { label: "Language preservation" },
      { label: "Community empowerment" },
    ],
  },
} as const;

export const appLanding = {
  title: "Learn Forro. Preserve the culture.",
  titleLines: ["Learn Forro.", "Preserve the culture."],
  description:
    "The first learning app for African Creole languages, starting with Forro of São Tomé and Príncipe.",
  seoTitle: "Forro Vivo — Learn Forro, the first African Creole learning app",
  seoDescription:
    "The first learning app for African Creole languages, starting with Forro of São Tomé and Príncipe. Dictionary, lessons, and exercises. On the App Store.",
} as const;

export const appWhy = {
  title: "Why Choose Forro Vivo?",
  photoCredit: {
    label: "Photography",
    name: "Emanuel Silva Morgan",
    href: "https://www.instagram.com/silva_photography_stp/",
  },
  cards: [
    {
      title: "Family",
      body: "Speak with family and friends in the language you share.",
      image: "/images/photography/emanuel-silva-morgan/children.jpg",
      imageAlt:
        "Children looking through a wooden doorway in São Tomé and Príncipe. Photograph by Emanuel Silva Morgan.",
    },
    {
      title: "Opportunity",
      body: "Learn Forro for work, study, and life with the people who speak it.",
      image: "/images/photography/emanuel-silva-morgan/school.jpg",
      imageAlt:
        "Schoolchildren gathered on a street in São Tomé and Príncipe. Photograph by Emanuel Silva Morgan.",
    },
    {
      title: "Travel",
      body: "Enhance your African adventures with deeper immersion and genuine connections with communities. All of our greatest memories always start with a simple Olá, bom dia, boa tarde, boa noite.",
      image: "/images/photography/emanuel-silva-morgan/sunset.jpg",
      imageAlt:
        "Looking out over the sea at dusk in São Tomé and Príncipe. Photograph by Emanuel Silva Morgan.",
    },
  ],
} as const;

export const appVision = {
  title: "Our broader vision",
  about:
    "The Forro Vivo App starts with Forro. ForroVivo is the platform around it: Open Knowledge for isolated lexicons, and Forro Connect for live lessons with native speakers.",
  body: "The aim is to preserve African Creole languages and the cultures connected to them, without mixing one language into another.",
} as const;

export const appFaq = {
  title: "FAQ",
  items: [
    {
      question: "What is Forro Vivo?",
      answer:
        "Forro Vivo is the first learning app for African Creole languages, starting with Forro of São Tomé and Príncipe.",
    },
    {
      question: "How do I learn Forro?",
      answer:
        "Download Forro Vivo on the App Store. It is the first learning app for African Creole languages, starting with Forro of São Tomé and Príncipe.",
    },
    {
      question: "What does the app include?",
      answer:
        "A dictionary, lessons, exercises, translation, and pronunciation.",
    },
    {
      question: "Where can I download it?",
      answer:
        "On the App Store. Google Play is coming soon.",
    },
    {
      question: "Does the app have voice and audio?",
      answer:
        "Voice capability and audio arrive in version 5.",
    },
    {
      question: "Is this the same as Open Knowledge?",
      answer:
        "No. This is the learning app. Open Knowledge is the public linguistic knowledge site: lexicons, sources, and the read-only API.",
    },
    {
      question: "Is this Forro Connect?",
      answer:
        "No. The app is software: dictionary, lessons, and exercises. Forro Connect is live lessons with a native speaker.",
    },
    {
      question: "How is AI used?",
      answer:
        "The app uses custom language models for lessons and exercises. The language knowledge behind those lessons stays tied to sources.",
    },
    {
      question: "What about other African Creole languages?",
      answer:
        "The app starts with Forro from São Tomé and Príncipe. Other African Creole languages are coming soon.",
    },
  ],
} as const;

export const appCredits = {
  title: "Credits",
  description:
    "The people behind the Forro Vivo App, a ForroVivo product operated by LIVLU TECHNOLOGIES LTD.",
  people: [
    {
      name: "Henriques Pontes",
      role: "Founder & Project Lead · Product & Technology",
      body: "Henriques leads the Forro Vivo App and the ForroVivo African Creole Knowledge Project: research, structured datasets, and the learning product.",
    },
    {
      name: "Luís Lima",
      role: "Early Collaborator · Early tester",
      body: "Luís has been involved since the first ideas in 2023. He helped shape the product, tested builds, and kept the work grounded in real need in the community.",
    },
    {
      name: "Clara Armand-Delille",
      role: "Mentor · Early tester",
      body: "Clara mentored this project and tested early builds. She is founder of ThirdEyeMedia, a startup mentor, and a speaker on entrepreneurship and growth.",
    },
  ],
  groups: [
    {
      title: "Early testers",
      body: "Early testers used unfinished builds, reported what broke, and said what the product needed before the dictionary and academy were public. Luís Lima has been part of that work from the start. Clara Armand-Delille tested early builds while mentoring the project. Thanks also to everyone else who tested those builds and sent feedback.",
      people: [
        {
          name: "Luís Lima",
          role: "Early tester",
        },
        {
          name: "Clara Armand-Delille",
          role: "Early tester",
        },
      ],
    },
    {
      title: "Photography",
      body: "All photographs on this site are by Emanuel Silva Morgan. The images show São Tomé and Príncipe: daily life, markets, sea, forest, and cultural performance.",
      people: [
        {
          name: "Emanuel Silva Morgan",
          role: "Photographer",
        },
      ],
      href: "https://www.instagram.com/silva_photography_stp/",
      linkLabel: "Instagram",
    },
  ],
  sections: [
    {
      title: "Linguistic Research",
      body: "The app is built on linguistic research that began in May 2023. Isolated lexicons from the public source.",
      href: "/research",
      linkLabel: "Open research",
    },
    {
      title: "Licences",
      body: "Third-party dictionaries and papers keep their original licences. Project-original material is published under CC BY 4.0 unless a source page says otherwise. The ForroVivo name and related marks are used by LIVLU TECHNOLOGIES LTD.",
      href: "/legal",
      linkLabel: "Legal",
    },
  ],
} as const;

export const appRoadmap = {
  title: "Roadmap",
  description:
    "From linguistic research in 2023 to a public learning app. The current release is dictionary and academy. Voice and audio are in version 5, now in beta.",
  steps: [
    {
      label: "Foundation",
      date: "23 March 2023",
      description:
        "Linguistic research begins. Founder: Henriques Pontes. Early collaborator: Luís Lima.",
      href: "/research",
    },
    {
      label: "1.0.0",
      date: "Beta",
      description:
        "First TestFlight. Look up Forro, Portuguese, and English.",
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
        "Academy and lessons. Forro becomes a path to walk, not only a list of words.",
    },
    {
      label: "4.0.0",
      date: "January 2026",
      description:
        "The jump to public. Forro Vivo leaves TestFlight and ships on the App Store dictionary and academy.",
    },
    {
      label: "4.0.5",
      date: "March 2026",
      description:
        "A total redesign: modern, clean aesthetic and functionality. This is the current public release.",
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
    "Forro Connect connects learners directly with real Forro speakers and cultural knowledge holders. Paid live lessons are how the work is funded and how speakers earn.",
  steps: [
    {
      label: "Learner",
      description: "Someone who wants to learn Forro from a real speaker.",
    },
    {
      label: "Native speaker",
      description:
        "A Forro speaker or cultural knowledge holder in the community.",
    },
    {
      label: "Direct match",
      description: "Connect pairs them for a real lesson, not an anonymous feed.",
    },
    {
      label: "Live lesson",
      description: "They meet. Language is taught in living conversation.",
    },
    {
      label: "Cultural knowledge",
      description:
        "The lesson carries culture, not only words. That knowledge stays with the speaker.",
    },
    {
      label: "Community income",
      description:
        "The lesson is paid work. Speakers earn. The project is funded.",
      href: "/connect/income",
    },
  ],
} as const;

export const connectIncome = {
  title: "Community income",
  href: "/connect/income",
  eyebrow: "Forro Connect",
  description:
    "This is where Forro Connect has income and impact. A live lesson is work. The speaker is paid. The project is funded by making that match possible.",
  body: "The Forro Vivo App teaches with dictionary, lessons and exercises. Forro Connect is different: it puts a learner in a live lesson with a real Forro speaker. That session is the product. Community income is the last step of How it works because preservation only lasts if the people who hold the language can earn from teaching it.",
  image: {
    src: "/images/photography/emanuel-silva-morgan/basins.jpg",
    alt: "Women carrying basins through a market in São Tomé and Príncipe. Photograph by Emanuel Silva Morgan.",
  },
  flowTitle: "The breakdown",
  flowDescription:
    "One paid live lesson moves money and knowledge in the same direction: toward the people who speak Forro, and toward the product that makes the lesson possible.",
  flow: [
    { label: "Paid live lesson" },
    { label: "Speaker is paid" },
    { label: "Connect is funded" },
    { label: "Language stays in the community" },
  ],
  partiesTitle: "Who is in the exchange",
  parties: [
    {
      title: "Learner",
      role: "Pays for the lesson",
      body: "A person who wants to learn Forro from a real speaker. They pay for live time, conversation, and cultural knowledge — not for a scraped dictionary.",
    },
    {
      title: "Speaker",
      role: "Earns community income",
      body: "A native speaker or cultural knowledge holder. Teaching is their work. Community income is their pay for that lesson.",
    },
    {
      title: "Project",
      role: "Earns by operating Connect",
      body: "LIVLU TECHNOLOGIES LTD operates Forro Connect. Project income comes from matching, hosting the lesson, and keeping learner and speaker connected.",
    },
  ],
  breakdownTitle: "What a lesson is made of",
  breakdown: [
    {
      title: "Language",
      body: "Forro as it is spoken. The learner hears and uses the language with someone who lives it.",
    },
    {
      title: "Culture",
      body: "Knowledge that sits around the words: how people greet, cook, remember, and teach. That knowledge stays with the speaker. It is not extracted into a dataset and sold back.",
    },
    {
      title: "Time",
      body: "A live session is time. Time is what is paid. Community income is payment for that time, not a donation for existing.",
    },
  ],
  howTitle: "How a session becomes income",
  how: [
    {
      title: "A learner books a live lesson",
      body: "Someone who wants to learn Forro is matched with a native speaker or cultural knowledge holder. The match is direct. The lesson is live.",
    },
    {
      title: "The speaker is paid for the lesson",
      body: "Teaching Forro and sharing cultural knowledge is work. Community income means that work is paid, not asked as unpaid heritage labour.",
    },
    {
      title: "The project is funded by operating the match",
      body: "LIVLU TECHNOLOGIES LTD operates Forro Connect. Project income comes from running the matching, the lesson, and the continuity between learner and speaker. That is how Connect sustains itself without selling the language away from the community.",
    },
  ],
  notTitle: "What this is not",
  not: [
    {
      title: "Not the App Store product",
      body: "The Forro Vivo App is dictionary, lessons, and exercises. It does not replace a speaker. Community income lives on Connect, in the live lesson.",
    },
    {
      title: "Not unpaid extraction",
      body: "Recordings, words, and culture are not taken from the community to train a model and then sold without the speaker. The lesson is the product. The speaker is in it.",
    },
    {
      title: "Not a marketplace of the language itself",
      body: "Forro is not listed as a commodity. What is sold is teaching time with a real person. The language remains theirs.",
    },
  ],
  outcomesTitle: "Income and impact",
  outcomes: [
    {
      title: "Income",
      body: "Speakers and cultural knowledge holders earn from live lessons. The project earns by operating Connect. Both sides of that exchange are required for the product to exist.",
    },
    {
      title: "Impact",
      body: "Language preservation becomes paid teaching. Forro stays with the people who speak it, and learners meet the language as a living culture, not only as an app.",
    },
  ],
  compareTitle: "Two products, one mission",
  compare: [
    {
      title: "Forro Vivo App",
      body: "Software learning: dictionary, lessons, exercises, and language practice. On the App Store.",
      href: "/app",
      linkLabel: "Forro Vivo App",
    },
    {
      title: "Forro Connect",
      body: "Human teaching: learner, speaker, live lesson, community income. Waitlist open now.",
      href: "/connect",
      linkLabel: "Forro Connect",
    },
  ],
} as const;

export const productOverview = {
  eyebrow: "Products",
  title: "Overview",
  description:
    "ForroVivo products for learning, community, languages, and public linguistic data. Open Knowledge is this site. Machine translation is a capability, not a product.",
  statement: {
    lines: [
      [
        { text: "Our work is to " },
        { text: "document", color: "#4285F4" },
        { text: ", " },
        { text: "preserve", color: "#EA4335" },
        { text: ", and " },
        { text: "structure", color: "#FBBC05" },
      ],
      [
        { text: "African Creole languages and make them " },
        { text: "accessible", color: "#34A853" },
        { text: " to new generations." },
      ],
    ],
  },
  photoCredit: {
    label: "Photography",
    name: "Emanuel Silva Morgan",
    href: "https://www.instagram.com/silva_photography_stp/",
  },
  collage: [
    {
      src: "/images/photography/emanuel-silva-morgan/water-carriers.jpg",
      alt: "Children carrying water. Photograph by Emanuel Silva Morgan.",
      grow: 1,
    },
    {
      src: "/images/photography/emanuel-silva-morgan/jackfruit.jpg",
      alt: "A woman carrying jackfruit at market. Photograph by Emanuel Silva Morgan.",
      grow: 1.2,
    },
    {
      src: "/images/photography/emanuel-silva-morgan/tchiloli.jpg",
      alt: "Tchiloli procession in São Tomé. Photograph by Emanuel Silva Morgan.",
      grow: 1.25,
    },
    {
      src: "/images/photography/emanuel-silva-morgan/canoe.jpg",
      alt: "An outrigger canoe under sail. Photograph by Emanuel Silva Morgan.",
      grow: 0.9,
    },
    {
      src: "/images/photography/emanuel-silva-morgan/basins.jpg",
      alt: "Women carrying basins through a market. Photograph by Emanuel Silva Morgan.",
      grow: 1.2,
    },
    {
      src: "/images/photography/emanuel-silva-morgan/boy.jpg",
      alt: "A child at play in São Tomé and Príncipe. Photograph by Emanuel Silva Morgan.",
      grow: 1.1,
    },
    {
      src: "/images/photography/emanuel-silva-morgan/colonial.jpg",
      alt: "A historic building in São Tomé and Príncipe. Photograph by Emanuel Silva Morgan.",
      grow: 0.95,
    },
    {
      src: "/images/photography/emanuel-silva-morgan/musician.jpg",
      alt: "A musician playing at a gathering in São Tomé and Príncipe. Photograph by Emanuel Silva Morgan.",
      grow: 0.85,
    },
  ],
  products: [
    {
      label: "Forro Vivo App",
      href: "/app",
      description:
        "The first learning app for African Creole languages, starting with Forro of São Tomé and Príncipe. Dictionary, lessons, and exercises. On the App Store.",
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
  title: "What a translator would need",
  description:
    "Translation is only as reliable as the evidence under it. Isolated datasets, verified entries, then grounded models. Missing data is preferable to incorrect data. This site does not run a translator.",
  steps: [
    { label: "Isolated lexicon" },
    { label: "Attested sources" },
    { label: "Structured pairs" },
    { label: "Grounded model" },
    { label: "Human review" },
  ],
} as const;

export const translationPage = {
  eyebrow: "Capability",
  description:
    "Open Knowledge does not run a translator. Translation is a ForroVivo capability. This page is the evidence it would need: isolated lexicons, attested sources, and human review.",
  heroLead: "Not a",
  heroEmphasisA: "translator",
  heroMid: " on this site. ",
  heroEmphasisB: "Evidence",
  heroTail: " comes first",
  questionsTitle: "Translation is only as reliable as the evidence under it.",
  questionsBody:
    "See how isolated lexicons, attested sources, and human review come before any model. There is no translate box here.",
  questionsCta: "Read methodology",
  questionsHref: "/docs/methodology",
  releasesTitle: "What a translator would need",
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
    { heading: "API", label: "API Platform", href: "/api" },
  ],
} as const;

export const docsNav = [
  {
    heading: "Getting started",
    links: [
      { label: "Introduction", href: "/docs" },
      { label: "Quickstart", href: "/docs/quickstart" },
      { label: "Authentication", href: "/docs/api-reference#authentication" },
      { label: "Rate limits", href: "/docs/api-reference#rate-limits" },
    ],
  },
  {
    heading: "Knowledge",
    links: [
      { label: "Languages", href: "/languages" },
      { label: "Sources", href: "/research" },
    ],
  },
  {
    heading: "API reference",
    links: [
      { label: "Versioning", href: "/docs/api-reference#versioning" },
      { label: "CORS", href: "/docs/api-reference#cors" },
      { label: "Attribution", href: "/docs/api-reference#attribution" },
      { label: "GET /v1/languages", href: "/docs/api-reference#routes" },
      { label: "GET /v1/lookup", href: "/docs/api-reference#routes" },
      { label: "GET /v1/search", href: "/docs/api-reference#routes" },
      { label: "GET /v1/sources", href: "/docs/api-reference#routes" },
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
  { method: "GET", path: "/v1", detail: "Service identity, versioning, CORS, and catalog links." },
  { method: "GET", path: "/v1/health", detail: "Versioned health check." },
  { method: "GET", path: "/v1/kb", detail: "Knowledge Base collection map." },
  { method: "GET", path: "/v1/languages", detail: "Isolated lexicons. Not a merged word list." },
  { method: "GET", path: "/v1/datasets", detail: "Published dataset index." },
  {
    method: "GET",
    path: "/v1/{family}/{variety}/lookup?headword=",
    detail: "Look up one headword in that folder only. Example: /v1/saotome/forro/lookup?headword=kume.",
  },
  {
    method: "GET",
    path: "/v1/angola/contruy/lookup?headword=",
    detail: "Look up Angola Contruy. This is not Angolar of São Tomé.",
  },
  {
    method: "GET",
    path: "/v1/search?dataset={family}/{variety}&q=",
    detail: "Search inside one named dataset only. dataset= is required.",
  },
  {
    method: "GET",
    path: "/v1/{family}/{variety}/entries",
    detail: "Lexical entries from that folder only.",
  },
  {
    method: "GET",
    path: "/v1/{family}/{variety}/sources",
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
