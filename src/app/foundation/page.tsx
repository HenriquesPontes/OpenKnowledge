import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { principle, footer } from "@/lib/constants";
import { GITHUB_URL } from "@/lib/catalog";

export const metadata = {
  title: "Foundation — Open Knowledge",
};

export default function FoundationPage() {
  return (
    <section className="pt-28 pb-20 sm:pt-36">
      <Container>
        <p className="text-muted text-sm sm:text-base tracking-[-0.01em]">
          Foundation
        </p>
        <h1
          className="mt-4 font-heading text-white tracking-[-0.03em] leading-[1.05]"
          style={{ fontSize: "clamp(2rem, 5vw, 3.75rem)" }}
        >
          The knowledge foundation
        </h1>
        <p className="mt-4 max-w-[640px] text-muted text-lg sm:text-[21px] tracking-[-0.01em] leading-normal">
          Open Knowledge is the evidence-first linguistic foundation under
          ForroVivo, operated by {footer.companyName}.
        </p>
        <p className="mt-6 max-w-[640px] text-muted text-base leading-7 tracking-[-0.01em]">
          {principle}
        </p>
        <p className="mt-6 max-w-[640px] text-muted text-base leading-7 tracking-[-0.01em]">
          Isolated datasets, named sources, and a public read-only API are how
          that foundation is published. Missing data stays empty. Claims stay
          traceable.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row gap-3">
          <Button href="/knowledge">Knowledge</Button>
          <Button href="/research" variant="outline">
            Research
          </Button>
          <Button href={GITHUB_URL} variant="ghost">
            View source on GitHub
          </Button>
        </div>
      </Container>
    </section>
  );
}
