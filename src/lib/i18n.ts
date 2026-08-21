export const locales = ["en", "pt"] as const;
export type Locale = (typeof locales)[number];

export const LOCALE_COOKIE = "fv_locale";
export const defaultLocale: Locale = "en";

export function isLocale(value: string | undefined | null): value is Locale {
  return value === "en" || value === "pt";
}

export function localeFromCookie(value: string | undefined): Locale {
  return isLocale(value) ? value : defaultLocale;
}

export const localeLabels: Record<Locale, string> = {
  en: "English",
  pt: "Português",
};

const en = {
  footer: {
    registration: "Registered in England and Wales",
    companyNumber: "Company number",
    legal: "Legal",
    terms: "Terms",
    privacy: "Privacy",
    eula: "EULA",
    language: "Language",
  },
  nav: {
    howItWorks: "How it works",
    dictionaries: "Dictionaries",
    products: "Products",
    roadmap: "Roadmap",
    overview: "Overview",
    forroVivoApp: "Forro Vivo App",
    forroConnect: "Forro Connect",
    languages: "Languages",
    documentation: "Documentation",
    apiPlatform: "API Platform",
    methodology: "Methodology",
    research: "Research",
    machineTranslation: "Machine Translation",
    about: "About",
    careers: "Careers",
    github: "GitHub",
    legal: "Legal",
    exploreProducts: "Explore products",
    learn: "Learn",
    company: "Company",
    tryForroVivo: "Try Forro Vivo",
    logIn: "Log in",
    createAccount: "Create an account — It's free",
  },
} as const;

const pt = {
  footer: {
    registration: "Registada em Inglaterra e País de Gales",
    companyNumber: "Número da empresa",
    legal: "Legal",
    terms: "Termos",
    privacy: "Privacidade",
    eula: "EULA",
    language: "Idioma",
  },
  nav: {
    howItWorks: "Como funciona",
    dictionaries: "Dicionários",
    products: "Produtos",
    roadmap: "Roteiro",
    overview: "Visão geral",
    forroVivoApp: "Forro Vivo App",
    forroConnect: "Forro Connect",
    languages: "Línguas",
    documentation: "Documentação",
    apiPlatform: "API Platform",
    methodology: "Metodologia",
    research: "Investigação",
    machineTranslation: "Tradução automática",
    about: "Sobre",
    careers: "Carreiras",
    github: "GitHub",
    legal: "Legal",
    exploreProducts: "Explorar produtos",
    learn: "Aprender",
    company: "Empresa",
    tryForroVivo: "Experimentar Forro Vivo",
    logIn: "Iniciar sessão",
    createAccount: "Criar uma conta — é grátis",
  },
} as const;

export const dictionaries = { en, pt } as const;
export type Dictionary = (typeof dictionaries)[Locale];

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}

export { getSiteCopy, type SiteCopy } from "./i18n-copy";
