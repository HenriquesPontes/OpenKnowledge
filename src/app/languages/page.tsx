import { cookies } from "next/headers";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { VarietyGrid } from "@/components/sections/FeatureGrid";
import { countries, languages } from "@/lib/constants";
import { fetchLanguagesCatalog } from "@/lib/catalog";
import { LOCALE_COOKIE, localeFromCookie, getSiteCopy } from "@/lib/i18n";
import type { SiteCopy } from "@/lib/i18n";

export const metadata = {
  title: "Languages",
  description:
    "The documented languages of São Tomé and Príncipe, Cabo Verde, Guiné-Bissau, and Angola. Each language and variety is kept separate, never mixed.",
  alternates: { canonical: "/languages" },
};

type Props = {
  searchParams: Promise<{ q?: string }>;
};

function matchesQuery(
  query: string,
  values: Array<string | null | undefined>,
) {
  const needle = query.trim().toLowerCase();
  if (!needle) return true;
  return values.some((value) => value?.toLowerCase().includes(needle));
}

function countryTitle(
  countryId: string,
  countriesCopy: SiteCopy["countries"],
  fallback: string,
) {
  return countriesCopy[countryId as keyof SiteCopy["countries"]] ?? fallback;
}

export default async function LanguagesPage({ searchParams }: Props) {
  const locale = localeFromCookie((await cookies()).get(LOCALE_COOKIE)?.value);
  const copy = getSiteCopy(locale);
  const { q = "" } = await searchParams;
  const catalog = await fetchLanguagesCatalog();
  const records = catalog?.languages ?? [];
  const query = q.trim();

  const visibleCountries = countries.filter((country) => {
    if (!query) return true;
    const localizedTitle = countryTitle(
      country.id,
      copy.countries,
      country.title,
    );
    const countryHit = matchesQuery(query, [
      country.title,
      localizedTitle,
      country.aliases,
      country.id,
    ]);
    const varietyHit = languages.some(
      (language) =>
        language.country === country.id &&
        matchesQuery(query, [
          language.title,
          language.aliases,
          language.autonym,
          language.group,
          language.dataset,
        ]),
    );
    return countryHit || varietyHit;
  });

  return (
    <section className="pt-28 pb-20 sm:pt-36">
      <Container>
        <p className="text-muted text-sm sm:text-base tracking-[-0.01em]">
          {copy.languagesPage.title}
        </p>
        <h1
          className="mt-4 font-heading text-white tracking-[-0.03em] leading-[1.05]"
          style={{ fontSize: "clamp(2rem, 5vw, 3.75rem)" }}
        >
          {copy.languagesPage.headline}
        </h1>
        <p className="mt-4 max-w-[640px] text-muted text-lg sm:text-[21px] tracking-[-0.01em] leading-normal">
          {query
            ? `${copy.languagesPage.resultsBodyPrefix}${query}${copy.languagesPage.resultsBodySuffix}`
            : copy.languagesPage.defaultBody}
        </p>

        <form action="/languages" method="get" className="mt-8">
          <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
            <input
              type="search"
              name="q"
              defaultValue={query}
              placeholder={copy.languagesPage.searchPlaceholder}
              className="h-10 w-full sm:w-[285px] rounded-full border border-[#454545] bg-[#252525] px-4 text-base text-white placeholder-[#6e6e6e] tracking-[-0.01em] outline-none focus:border-[#666]"
            />
            <Button type="submit" className="w-full sm:w-auto">
              {copy.languagesPage.searchCta}
            </Button>
          </div>
        </form>

        {visibleCountries.length === 0 ? (
          <p className="mt-16 text-muted text-base tracking-[-0.01em]">
            {copy.languagesPage.empty}
          </p>
        ) : (
          <div className="mt-16 space-y-16">
            {visibleCountries.map((country) => (
              <section key={country.id} id={country.id}>
                <h2 className="text-white text-lg sm:text-[21px] tracking-[-0.01em]">
                  {countryTitle(country.id, copy.countries, country.title)}
                </h2>
                <p className="mt-2 mb-6 text-muted text-base tracking-[-0.01em]">
                  {country.aliases}
                </p>
                <VarietyGrid
                  countryId={country.id}
                  catalog={records}
                  query={query}
                />
              </section>
            ))}
          </div>
        )}
      </Container>
    </section>
  );
}
