export const API_ORIGIN = "https://api.forrovivo.com";
export const API_FALLBACK_ORIGIN =
  "https://linguistic-research-forro-vivo.pontes-18.workers.dev";
export const GITHUB_URL =
  "https://github.com/Forrovivo/linguistic-research";
export const APP_ORIGIN = "https://www.forrovivo.com";
export const APP_STORE_URL = "https://apps.apple.com/app/id6751409176";
export const PLAY_STORE_URL =
  "https://play.google.com/store/apps/details?id=com.telanon.forrovivo";

export function jsonLdScript(data: unknown) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export type LanguageRecord = {
  dataset: string;
  language: string;
  language_name?: string;
  type?: string;
  kind?: string;
  iso_639_3?: string;
  entry_count?: number;
  knowledge?: Record<string, number>;
  path?: string;
  url?: string;
  collections?: Record<string, string>;
};

type LanguagesResponse = {
  isolation?: string;
  languages?: LanguageRecord[];
};

const SAMPLE_DATASETS = [
  "saotome/forro",
  "caboverde/santiago",
  "guinebissau/bissau",
  "angola/umbundu",
] as const;

const RESEARCH_ORIGINS = [API_ORIGIN, API_FALLBACK_ORIGIN] as const;

export async function fetchResearchApi(
  pathAndQuery: string,
  init?: RequestInit,
): Promise<Response> {
  const suffix = pathAndQuery.startsWith("/") ? pathAndQuery : `/${pathAndQuery}`;
  let lastError: unknown;
  for (const origin of RESEARCH_ORIGINS) {
    const controller = new AbortController();
    const waitMs = origin === API_ORIGIN ? 2500 : 20000;
    const timer = setTimeout(() => controller.abort(), waitMs);
    const parent = init?.signal;
    if (parent) {
      if (parent.aborted) controller.abort();
      else parent.addEventListener("abort", () => controller.abort(), { once: true });
    }
    try {
      const response = await fetch(`${origin}${suffix}`, {
        ...init,
        signal: controller.signal,
      });
      clearTimeout(timer);
      return response;
    } catch (error) {
      clearTimeout(timer);
      lastError = error;
    }
  }
  throw lastError instanceof Error
    ? lastError
    : new Error("The linguistic API is unreachable.");
}

export async function fetchLanguagesCatalog(): Promise<LanguagesResponse | null> {
  try {
    const response = await fetchResearchApi("/v1/languages", {
      next: { revalidate: 21600 },
    });
    if (!response.ok) return null;
    return (await response.json()) as LanguagesResponse;
  } catch {
    return null;
  }
}

export function isCountryDataset(
  dataset: string,
  meta?: { type?: string; kind?: string; language?: string; language_name?: string },
) {
  if (meta?.type === "country" || meta?.kind === "index" || meta?.kind === "country") {
    return true;
  }
  if (!dataset.includes("/")) return true;
  const slug = dataset.split("/")[1]?.toLowerCase();
  if (slug === "country" || slug === "contruy") return true;
  const name = `${meta?.language ?? ""} ${meta?.language_name ?? ""}`.toLowerCase();
  return name.includes("contruy");
}

export function recordForDataset(
  languages: LanguageRecord[],
  dataset: string,
) {
  return languages.find((item) => item.dataset === dataset);
}

export function sampleByCountry(languages: LanguageRecord[]) {
  return SAMPLE_DATASETS.map((dataset) => recordForDataset(languages, dataset)).filter(
    (item): item is LanguageRecord => Boolean(item),
  );
}

export function countryEntryTotal(
  languages: LanguageRecord[],
  datasetPrefix: string,
) {
  return languages
    .filter((item) => {
      if (!item.dataset || isCountryDataset(item.dataset, item)) return false;
      return (
        item.dataset === datasetPrefix ||
        item.dataset.startsWith(`${datasetPrefix}/`)
      );
    })
    .reduce((sum, item) => sum + (item.entry_count ?? 0), 0);
}
