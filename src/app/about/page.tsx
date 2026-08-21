import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { principle } from "@/lib/constants";
import { GITHUB_URL } from "@/lib/catalog";

export default function AboutPage() {
  return (
    <section className="pt-28 pb-20 sm:pt-36">
      <Container>
        <p className="text-muted text-sm sm:text-base tracking-[-0.01em]">
          Platform
        </p>

        <h1
          className="mt-4 font-heading text-white tracking-[-0.03em] leading-[1.05]"
          style={{ fontSize: "clamp(2rem, 5vw, 3.75rem)" }}
        >
          ForroVivo
        </h1>

        <p className="mt-4 max-w-[720px] text-muted text-lg sm:text-[21px] tracking-[-0.01em] leading-normal">
          ForroVivo is the platform. It documents, preserves, and structures
          African Creole languages. Open Knowledge is this site, the public
          front door to the Linguistic Knowledge Base.
        </p>

        <p className="mt-6 max-w-[720px] text-muted text-base leading-7 tracking-[-0.01em]">
          Where AI supports learning, the underlying language knowledge remains
          source-traceable and evidence-first. The broader aim is to make these
          languages accessible to new generations without mixing one into
          another, and without erasing the cultures connected to them.
        </p>

        <p className="mt-6 max-w-[760px] text-muted text-base leading-7 tracking-[-0.01em]">
          {principle}
        </p>

        <div className="mt-10 flex flex-col sm:flex-row gap-3">
          <Button href="/">Open Knowledge</Button>
          <Button href="/languages" variant="outline">
            Browse languages
          </Button>
          <Button href={GITHUB_URL} variant="ghost">
            Contribute on GitHub
          </Button>
        </div>

        <div className="mt-16 max-w-[760px] divide-y divide-border border-t border-b border-border">
          {[
            {
              title: "Isolated lexicons",
              body: "Structured content with provenance and language context.",
            },
            {
              title: "Cultural responsibility",
              body: "Community knowledge published with rights and attribution.",
            },
            {
              title: "Evidence before output",
              body: "Verification keeps claims traceable and auditable.",
            },
            {
              title: "Public API & tooling",
              body: "Machine-readable access for research, education, and language technology.",
            },
          ].map((item) => (
            <div key={item.title} className="py-5 sm:py-6">
              <p className="font-heading text-white text-lg sm:text-xl tracking-[-0.02em]">
                {item.title}
              </p>
              <p className="mt-2 text-muted text-base leading-7 tracking-[-0.01em]">
                {item.body}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
