import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { BrowserMockup } from "@/components/sections/BrowserMockup";
import { apiPaths, apiSection } from "@/lib/constants";
import { API_ORIGIN, fetchLanguagesCatalog, sampleByCountry } from "@/lib/catalog";

export const metadata = {
  title: "API — ForroVivo",
};

export default async function ApiPage() {
  const catalog = await fetchLanguagesCatalog();
  const sampleRecords = catalog?.languages
    ? sampleByCountry(catalog.languages)
    : [];
  const sample = JSON.stringify(
    sampleRecords.length
      ? {
          isolation: catalog?.isolation,
          languages: sampleRecords.map((language) => ({
            dataset: language.dataset,
            language: language.language,
            language_name: language.language_name,
            path: language.path,
          })),
        }
      : { host: API_ORIGIN, path: "/v1/languages" },
    null,
    2,
  );

  return (
    <section className="pt-28 pb-20 sm:pt-36">
      <Container>
        <p className="text-muted text-sm sm:text-base tracking-[-0.01em]">
          API
        </p>
        <h1
          className="mt-4 font-heading text-white tracking-[-0.03em] leading-[1.05]"
          style={{ fontSize: "clamp(2rem, 5vw, 3.75rem)" }}
        >
          Public, read-only linguistic API
        </h1>
        <p className="mt-4 max-w-[640px] text-muted text-lg sm:text-[21px] tracking-[-0.01em] leading-normal">
          Hosted at api.forrovivo.com. GET only. Loads the published JSON. Does
          not invent translations, merge languages, or write lexicon data.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row gap-3">
          <Button href="/docs/quickstart" className="w-full sm:w-auto">
            Quickstart
          </Button>
          <Button
            href={apiSection.playground}
            variant="outline"
            className="w-full sm:w-auto"
          >
            Try the API
          </Button>
        </div>

        <div className="mt-12">
          <BrowserMockup command={apiSection.command} body={sample} />
        </div>

        <ul className="mt-12 divide-y divide-border border-t border-b border-border max-w-[720px]">
          {apiPaths.map((item) => (
            <li key={item.path} className="py-4">
              <p className="text-white text-sm sm:text-base tracking-[-0.01em] break-all">
                {item.method} {item.path}
              </p>
              <p className="mt-1 text-muted text-base tracking-[-0.01em]">
                {item.detail}
              </p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
