import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { ApiExplorer } from "@/components/sections/ApiExplorer";
import { ApiPlatformShell } from "@/components/sections/ApiPlatformShell";
import { languages } from "@/lib/constants";
import { fetchLanguagesCatalog } from "@/lib/catalog";

export const metadata = {
  title: "API Platform",
  description:
    "API Platform dashboard and live try UI. Full reference is in Documentation.",
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
        <ApiPlatformShell
          marketing={
            <>
              <p className="text-muted text-sm sm:text-base tracking-[-0.01em]">
                Product
              </p>
              <h1
                className="mt-4 font-heading text-white tracking-[-0.03em] leading-[1.05]"
                style={{ fontSize: "clamp(2rem, 5vw, 3.75rem)" }}
              >
                API Platform
              </h1>
              <p className="mt-4 max-w-[480px] text-muted text-lg sm:text-[21px] tracking-[-0.01em] leading-normal">
                Keys and live try. Documentation is the source of truth.
              </p>
            </>
          }
        >
          <div className="mt-12">
            <ApiExplorer datasets={datasets} />
          </div>

          <div className="mt-10">
            <Button href="/docs" variant="outline" className="w-full sm:w-auto">
              Documentation
            </Button>
          </div>
        </ApiPlatformShell>
      </Container>
    </section>
  );
}
