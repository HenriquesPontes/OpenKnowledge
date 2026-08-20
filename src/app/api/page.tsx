import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { ApiExplorer } from "@/components/sections/ApiExplorer";
import { apiPaths, languages } from "@/lib/constants";
import { API_ORIGIN, fetchLanguagesCatalog } from "@/lib/catalog";

export const metadata = {
  title: "API Platform",
  description:
    "Public, read-only linguistic API at api.forrovivo.com. GET only. Does not invent translations, merge languages, or write lexicon data.",
  alternates: { canonical: "/api" },
};

export default async function ApiPage() {
  const catalog = await fetchLanguagesCatalog();
  const catalogOptions =
    catalog?.languages
      ?.filter((item) => item.dataset)
      .map((item) => ({
        dataset: item.dataset,
        label: item.language_name
          ? `${item.language_name} (${item.dataset})`
          : item.dataset,
      })) ?? [];

  const datasets =
    catalogOptions.length > 0
      ? catalogOptions
      : languages.map((language) => ({
          dataset: language.dataset,
          label: `${language.title} (${language.dataset})`,
        }));

  return (
    <section className="pt-28 pb-20 sm:pt-36">
      <Container>
        <p className="text-muted text-sm sm:text-base tracking-[-0.01em]">
          Product
        </p>
        <h1
          className="mt-4 font-heading text-white tracking-[-0.03em] leading-[1.05]"
          style={{ fontSize: "clamp(2rem, 5vw, 3.75rem)" }}
        >
          API Platform
        </h1>
        <p className="mt-4 max-w-[640px] text-muted text-lg sm:text-[21px] tracking-[-0.01em] leading-normal">
          Public, read-only linguistic API. Versioned under /v1. GET only. Loads
          the published JSON. Does not invent translations, merge languages, or
          write lexicon data. No API key. Each match keeps its cited source.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row gap-3">
          <Button href="#try" className="w-full sm:w-auto">
            Try the API
          </Button>
          <Button href="/docs/quickstart" variant="outline" className="w-full sm:w-auto">
            Quickstart
          </Button>
          <Button href="/docs/api-reference" variant="ghost" className="w-full sm:w-auto">
            API reference
          </Button>
        </div>

        <div className="mt-12">
          <ApiExplorer datasets={datasets} />
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
        <p className="mt-8 max-w-[720px] text-muted text-base leading-7 tracking-[-0.01em]">
          Curl and other clients should call {API_ORIGIN.replace("https://", "")}.
          This page is the web UI for the same isolated /v1 routes.
        </p>
      </Container>
    </section>
  );
}
