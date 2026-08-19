export const API_ORIGIN = "https://api.forrovivo.com";
export const GITHUB_URL =
  "https://github.com/Forrovivo/LINGUISTIC-RESEARCH-Forro-Vivo-";
export const APP_ORIGIN = "https://www.forrovivo.com";
export const APP_STORE_URL = "https://apps.apple.com/app/id6751409176";
export const PLAY_STORE_URL =
  "https://play.google.com/store/apps/details?id=com.telanon.forrovivo";

export type LanguageRecord = {
  dataset: string;
  language: string;
  language_name?: string;
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
  "angola",
] as const;

export async function fetchLanguagesCatalog(): Promise<LanguagesResponse | null> {
  try {
    const response = await fetch(`${API_ORIGIN}/v1/languages`, {
      next: { revalidate: 21600 },
    });
    if (!response.ok) return null;
    return (await response.json()) as LanguagesResponse;
  } catch {
    return null;
  }
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
    .filter(
      (item) =>
        item.dataset === datasetPrefix ||
        item.dataset.startsWith(`${datasetPrefix}/`),
    )
    .reduce((sum, item) => sum + (item.entry_count ?? 0), 0);
}
