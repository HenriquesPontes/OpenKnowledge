import { cookies } from "next/headers";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { ApiExplorer } from "@/components/sections/ApiExplorer";
import { ApiPlatformShell } from "@/components/sections/ApiPlatformShell";
import { languages } from "@/lib/constants";
import { fetchLanguagesCatalog } from "@/lib/catalog";
import { LOCALE_COOKIE, localeFromCookie, getSiteCopy } from "@/lib/i18n";

export const metadata = {
  title: "API Platform",
  description:
    "Build with attested linguistic data. Manage your API keys and try live requests. The full reference is in Documentation.",
  alternates: { canonical: "/api" },
};

export default async function ApiPage() {
  const locale = localeFromCookie((await cookies()).get(LOCALE_COOKIE)?.value);
  const copy = getSiteCopy(locale);
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
                {copy.apiPage.productEyebrow}
              </p>
              <h1
                className="mt-4 font-heading text-white tracking-[-0.03em] leading-[1.05]"
                style={{ fontSize: "clamp(2rem, 5vw, 3.75rem)" }}
              >
                {copy.apiPage.title}
              </h1>
              <p className="mt-4 max-w-[480px] text-muted text-lg sm:text-[21px] tracking-[-0.01em] leading-normal">
                {copy.apiPage.body}
              </p>
            </>
          }
        >
          <div className="mt-12">
            <ApiExplorer datasets={datasets} />
          </div>

          <div className="mt-10">
            <Button href="/docs" variant="outline" className="w-full sm:w-auto">
              {copy.apiPage.documentation}
            </Button>
          </div>
        </ApiPlatformShell>
      </Container>
    </section>
  );
}
