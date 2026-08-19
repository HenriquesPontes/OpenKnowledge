import { API_ORIGIN, APP_ORIGIN, APP_STORE_URL, GITHUB_URL } from "./catalog";

export const nav = {
  links: [
    { label: "How it works", href: "/#how-it-works" },
    { label: "Foundation", href: "/foundation" },
  ],
  menu: {
    label: "Forro Vivo",
    columns: [
      {
        heading: "Products",
        size: "large",
        items: [
          { label: "Forro Vivo", href: APP_ORIGIN, external: true },
          { label: "Open knowledge", href: "/" },
          { label: "Forro Connect" },
          { label: "Creole", href: "/languages" },
          { label: "Explore Forro Vivo", href: "/#how-it-works" },
          { label: "Release Notes", href: `${GITHUB_URL}/releases`, external: true },
        ],
      },
      {
        heading: "Business",
        size: "medium",
        items: [
          { label: "Overview", href: "/" },
          { label: "Solutions", href: "/#how-it-works" },
          { label: "Resources", href: "/docs" },
          { label: "Customer Stories", href: "/about" },
          { label: "Partner Network", href: "/developers" },
          { label: "Contact Sales", href: "/#waitlist" },
        ],
      },
      {
        heading: "Resources",
        size: "medium",
        items: [
          { label: "Research Overview", href: "/docs/methodology" },
          { label: "API Platform", href: "/api" },
          { label: "Doc", href: "/docs" },
          { label: "Research", href: "/research" },
          { label: "Developers", href: "/developers" },
          { label: "About Us", href: "/about" },
        ],
      },
    ],
  },
  cta: "Try Forro Vivo",
  ctaHref: APP_ORIGIN,
  login: {
    label: "Log in",
    items: [
      { label: "Forro Vivo", href: APP_ORIGIN, external: true },
      { label: "API Platform", href: `${API_ORIGIN}/docs`, external: true },
      { label: "Open knowledge", href: "/" },
    ],
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
        href: APP_STORE_URL,
        items: [
          { label: "Free learning", href: APP_ORIGIN },
          { label: "Dictionary", href: APP_ORIGIN },
          { label: "Lessons", href: APP_ORIGIN },
          { label: "Exercises", href: APP_ORIGIN },
        ],
      },
      {
        label: "ForroConnect",
        items: [
          { label: "Paid lessons" },
          { label: "Real teachers" },
          { label: "Native speakers" },
          { label: "Community income" },
        ],
      },
    ],
    outcomes: [
      { label: "Language preservation" },
      { label: "Community empowerment" },
    ],
  },
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
