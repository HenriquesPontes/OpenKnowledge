import { cookies } from "next/headers";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { ResearchStudio } from "@/components/sections/FeatureGrid";
import { fetchLanguagesCatalog, GITHUB_URL } from "@/lib/catalog";
import { LOCALE_COOKIE, localeFromCookie, getSiteCopy } from "@/lib/i18n";

export const metadata = {
  title: "Research",
  description:
    "The evidence behind the languages: sources, provenance, and separation for Forro, Angolar, Lung’Ie, Kabuverdianu, Guinea-Bissau Kriol, Umbundu, Kimbundu, and Kikongo.",
  alternates: { canonical: "/research" },
};

export default async function ResearchPage() {
  const locale = localeFromCookie((await cookies()).get(LOCALE_COOKIE)?.value);
  const copy = getSiteCopy(locale);
  const catalog = await fetchLanguagesCatalog();

  return (
    <section className="pt-28 pb-20 sm:pt-36">
      <Container>
        <p className="text-muted text-sm sm:text-base tracking-[-0.01em]">
          {copy.researchPage.title}
        </p>
        <h1
          className="mt-4 font-heading text-white tracking-[-0.03em] leading-[1.05] max-w-[16ch]"
          style={{ fontSize: "clamp(2rem, 5vw, 3.75rem)" }}
        >
          {copy.researchPage.headline}
        </h1>
        <p className="mt-4 max-w-[640px] text-muted text-lg sm:text-[21px] tracking-[-0.01em] leading-normal">
          {copy.researchPage.founder}
        </p>
        <p className="mt-6 max-w-[640px] text-muted text-base leading-7 tracking-[-0.01em]">
          {copy.researchPage.evidence}
        </p>
        <div className="mt-8 flex flex-col sm:flex-row gap-3">
          <Button href="/docs/methodology">
            {copy.researchPage.methodologyCta}
          </Button>
          <Button
            href={`${GITHUB_URL}/tree/main/research/sources`}
            variant="outline"
          >
            {copy.researchPage.bibliographyCta}
          </Button>
        </div>

        <ResearchStudio catalog={catalog?.languages ?? []} />
      </Container>
    </section>
  );
}
