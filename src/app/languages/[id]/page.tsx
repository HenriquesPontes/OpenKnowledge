import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { AfricaMap } from "@/components/sections/AfricaMap";
import { VarietyGrid } from "@/components/sections/FeatureGrid";
import { countries, languages } from "@/lib/constants";
import {
  API_ORIGIN,
  countryEntryTotal,
  fetchLanguagesCatalog,
  recordForDataset,
} from "@/lib/catalog";
import { LOCALE_COOKIE, localeFromCookie, getSiteCopy } from "@/lib/i18n";
import type { SiteCopy } from "@/lib/i18n";

type Props = { params: Promise<{ id: string }> };

function countryTitle(
  countryId: string | undefined,
  countriesCopy: SiteCopy["countries"],
  fallback: string | undefined,
) {
  if (!countryId) return fallback;
  return countriesCopy[countryId as keyof SiteCopy["countries"]] ?? fallback;
}

export function generateStaticParams() {
  const countryIds = countries.map((country) => ({ id: country.id }));
  const languageIds = languages.map((language) => ({ id: language.id }));
  return [...countryIds, ...languageIds];
}

export async function generateMetadata({ params }: Props) {
  const { id } = await params;
  const country = countries.find((item) => item.id === id);
  const language = languages.find((item) => item.id === id);
  const title = country?.title ?? language?.title;
  const description = country
    ? `The languages of ${country.title}: ${country.aliases}. Each language and variety is documented separately, never mixed.`
    : language
      ? `${language.title} (${language.aliases}). Documented on its own terms in Open Knowledge.`
      : undefined;
  return {
    title: title ?? { absolute: "Open Knowledge" },
    description,
    alternates: title ? { canonical: `/languages/${id}` } : undefined,
  };
}

export default async function LanguageProfilePage({ params }: Props) {
  const locale = localeFromCookie((await cookies()).get(LOCALE_COOKIE)?.value);
  const copy = getSiteCopy(locale);
  const { id } = await params;
  const catalog = await fetchLanguagesCatalog();
  const records = catalog?.languages ?? [];

  const countryHub = countries.find((item) => item.id === id);
  if (countryHub) {
    const total = countryEntryTotal(records, countryHub.datasetPrefix);
    const title = countryTitle(countryHub.id, copy.countries, countryHub.title);
    return (
      <section className="pt-28 pb-20 sm:pt-36">
        <Container>
          <a
            href="/languages"
            className="text-muted hover:text-white transition-colors text-sm sm:text-base tracking-[-0.01em]"
          >
            {copy.languageDetail.breadcrumb}
          </a>
          <h1
            className="mt-4 font-heading text-white tracking-[-0.03em] leading-[1.05]"
            style={{ fontSize: "clamp(2rem, 5vw, 3.75rem)" }}
          >
            {title}
          </h1>
          <p className="mt-3 text-muted text-lg sm:text-[21px] tracking-[-0.01em]">
            {countryHub.aliases}
          </p>
          <p className="mt-6 max-w-[640px] text-muted text-base leading-7 tracking-[-0.01em]">
            {countryHub.isolation}
          </p>
          {total > 0 ? (
            <p className="mt-4 text-white text-base tracking-[-0.01em]">
              {total.toLocaleString(locale === "pt" ? "pt-PT" : "en-GB")}{" "}
              {copy.languageDetail.lexicalAcrossFolders}
            </p>
          ) : null}
          {countryHub.isoA2 ? (
            <div className="mt-12">
              <AfricaMap focusCountryId={countryHub.isoA2} />
            </div>
          ) : null}
          <div className="mt-12">
            <VarietyGrid countryId={countryHub.id} catalog={records} />
          </div>
        </Container>
      </section>
    );
  }

  const language = languages.find((item) => item.id === id);
  if (!language) notFound();

  const live = recordForDataset(records, language.dataset);
  const knowledge = live?.knowledge ?? {};
  const publishedKnowledge = Object.entries(knowledge).filter(
    ([, count]) => typeof count === "number" && count > 0,
  );
  const country = countries.find((item) => item.id === language.country);
  const countryHref = `/languages/${language.country}`;
  const localizedCountry = countryTitle(
    language.country,
    copy.countries,
    country?.title,
  );

  return (
    <section className="pt-28 pb-20 sm:pt-36">
      <Container>
        <a
          href={countryHref}
          className="text-muted hover:text-white transition-colors text-sm sm:text-base tracking-[-0.01em]"
        >
          {localizedCountry} · {language.group}
        </a>
        <h1
          className="mt-4 font-heading text-white tracking-[-0.03em] leading-[1.05]"
          style={{ fontSize: "clamp(2rem, 5vw, 3.75rem)" }}
        >
          {language.title}
        </h1>
        <p className="mt-3 text-muted text-lg sm:text-[21px] tracking-[-0.01em]">
          {language.aliases}
        </p>
        <p className="mt-6 max-w-[640px] text-muted text-base leading-7 tracking-[-0.01em]">
          {language.isolation}
        </p>

        {country?.isoA2 ? (
          <div className="mt-10">
            <AfricaMap
              focusCountryId={country.isoA2}
              focusDataset={language.dataset}
            />
          </div>
        ) : null}

        <dl className="mt-10 max-w-[480px] divide-y divide-border border-t border-b border-border">
          {language.iso ? (
            <div className="flex justify-between gap-6 py-4">
              <dt className="text-muted">{copy.languageDetail.isoLabel}</dt>
              <dd className="text-white">{language.iso}</dd>
            </div>
          ) : null}
          <div className="flex justify-between gap-6 py-4">
            <dt className="text-muted">{copy.languageDetail.datasetLabel}</dt>
            <dd className="text-white">{language.dataset}</dd>
          </div>
          {typeof live?.entry_count === "number" ? (
            <div className="flex justify-between gap-6 py-4">
              <dt className="text-muted">
                {copy.languageDetail.lexicalEntriesLabel}
              </dt>
              <dd className="text-white">
                {live.entry_count.toLocaleString(
                  locale === "pt" ? "pt-PT" : "en-GB",
                )}
              </dd>
            </div>
          ) : null}
          {publishedKnowledge.map(([name, count]) => (
            <div key={name} className="flex justify-between gap-6 py-4">
              <dt className="text-muted capitalize">{name}</dt>
              <dd className="text-white">
                {count.toLocaleString(locale === "pt" ? "pt-PT" : "en-GB")}
              </dd>
            </div>
          ))}
        </dl>

        <div className="mt-10 flex flex-col sm:flex-row gap-3">
          <Button href={`${API_ORIGIN}/v1/${language.dataset}`}>
            {copy.languageDetail.openApi}
          </Button>
          <Button href={language.github} variant="outline">
            {copy.languageDetail.viewGithub}
          </Button>
          <Button
            href={`${API_ORIGIN}/v1/${language.dataset}/entries`}
            variant="ghost"
          >
            {copy.languageDetail.downloadJson}
          </Button>
        </div>
      </Container>
    </section>
  );
}
