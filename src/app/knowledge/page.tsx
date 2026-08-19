import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { ProductTree } from "@/components/sections/Architecture";
import { FeatureGrid } from "@/components/sections/FeatureGrid";
import { principle } from "@/lib/constants";
import { fetchLanguagesCatalog, GITHUB_URL } from "@/lib/catalog";

export const metadata = {
  title: "Knowledge — ForroVivo",
};

export default async function KnowledgePage() {
  const catalog = await fetchLanguagesCatalog();

  return (
    <section className="pt-28 pb-20 sm:pt-36">
      <Container>
        <p className="text-muted text-sm sm:text-base tracking-[-0.01em]">
          Knowledge
        </p>
        <h1
          className="mt-4 font-heading text-white tracking-[-0.03em] leading-[1.05]"
          style={{ fontSize: "clamp(2rem, 5vw, 3.75rem)" }}
        >
          Linguistic Knowledge Base
        </h1>
        <p className="mt-4 max-w-[640px] text-muted text-lg sm:text-[21px] tracking-[-0.01em] leading-normal">
          {principle}
        </p>
        <div className="mt-8 flex flex-col sm:flex-row gap-3">
          <Button href="/languages">Languages</Button>
          <Button href={GITHUB_URL} variant="outline">
            View source on GitHub
          </Button>
        </div>
      </Container>

      <div className="mt-16 sm:mt-20">
        <FeatureGrid catalog={catalog?.languages ?? []} />
      </div>

      <Container>
        <div className="mt-8 sm:mt-12">
          <ProductTree />
        </div>
      </Container>
    </section>
  );
}
