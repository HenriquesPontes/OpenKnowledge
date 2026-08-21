import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { DictionarySearch } from "@/components/sections/DictionarySearch";
import { languages, lexiconSelectLabel, isCountryDataset } from "@/lib/constants";
import { fetchLanguagesCatalog } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "Dictionaries",
  description:
    "Search words in Forro, Angolar, Lung’Ie, Cabo Verdean island varieties, Guinea-Bissau Kriol, Umbundu, Kimbundu, and Kikongo. Each language has its own dictionary.",
  alternates: { canonical: "/dictionaries" },
};

export default async function DictionariesPage() {
  const catalog = await fetchLanguagesCatalog();
  const catalogOptions =
    catalog?.languages
      ?.filter((item) => item.dataset && !isCountryDataset(item.dataset, item))
      .map((item) => ({
        dataset: item.dataset,
        label: lexiconSelectLabel(item.dataset, item.language_name),
      })) ?? [];

  const datasets =
    catalogOptions.length > 0
      ? catalogOptions
      : languages.map((language) => ({
          dataset: language.dataset,
          label: lexiconSelectLabel(language.dataset),
        }));

  return (
    <section className="pt-24 pb-20 sm:pt-36 lg:pt-44">
      <Container>
        <DictionarySearch datasets={datasets}>
          <p className="text-muted text-sm sm:text-base tracking-[-0.01em]">
            Dictionaries
          </p>
          <h1
            className="mt-4 font-heading text-white tracking-[-0.03em] leading-[1.05]"
            style={{ fontSize: "clamp(1.85rem, 8vw, 4.5rem)" }}
          >
            Online dictionaries
          </h1>
          <p className="mt-2 max-w-[593px] text-muted text-base sm:text-lg lg:text-[21px] tracking-[-0.01em] leading-normal">
            Search words in Forro, Angolar, Lung’Ie, Cabo Verdean island
            varieties, Guinea-Bissau Kriol, Umbundu, Kimbundu, and Kikongo.
            Each language has its own dictionary, built from real sources.
          </p>
        </DictionarySearch>
      </Container>
    </section>
  );
}
