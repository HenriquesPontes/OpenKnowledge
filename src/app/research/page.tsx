import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { ResearchStudio } from "@/components/sections/FeatureGrid";
import { fetchLanguagesCatalog, GITHUB_URL } from "@/lib/catalog";

export const metadata = {
  title: "Research",
};

export default async function ResearchPage() {
  const catalog = await fetchLanguagesCatalog();

  return (
    <section className="pt-28 pb-20 sm:pt-36">
      <Container>
        <p className="text-muted text-sm sm:text-base tracking-[-0.01em]">
          Research
        </p>
        <h1
          className="mt-4 font-heading text-white tracking-[-0.03em] leading-[1.05] max-w-[16ch]"
          style={{ fontSize: "clamp(2rem, 5vw, 3.75rem)" }}
        >
          Sources, isolation, and provenance
        </h1>
        <p className="mt-4 max-w-[640px] text-muted text-lg sm:text-[21px] tracking-[-0.01em] leading-normal">
          The Linguistic Research initiative started on 23 March 2023. Founder
          and idealist: Henriques Pontes. Linguistic Research co-founder: Luis
          Lima.
        </p>
        <p className="mt-6 max-w-[640px] text-muted text-base leading-7 tracking-[-0.01em]">
          Linguistic Research is the public evidence layer for Forro, Angolar,
          Lung’Ie, Kabuverdianu island varieties, Guinea-Bissau Kriol regions,
          and Angola Contruy. Every lexical field should name a source.
          Third-party dictionaries and papers keep their original licenses.
          Project-original material is CC BY 4.0.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row gap-3">
          <Button href="/docs/methodology">Methodology</Button>
          <Button href={`${GITHUB_URL}/tree/main/research/sources`} variant="outline">
            Bibliography on GitHub
          </Button>
        </div>

        <ResearchStudio catalog={catalog?.languages ?? []} />
      </Container>
    </section>
  );
}
