import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { API_ORIGIN, GITHUB_URL } from "@/lib/catalog";

export const metadata = {
  title: "Developers",
};

export default function DevelopersPage() {
  return (
    <section className="pt-28 pb-20 sm:pt-36">
      <Container>
        <p className="text-muted text-sm sm:text-base tracking-[-0.01em]">
          Developers
        </p>
        <h1
          className="mt-4 font-heading text-white tracking-[-0.03em] leading-[1.05]"
          style={{ fontSize: "clamp(2rem, 5vw, 3.75rem)" }}
        >
          Public access first
        </h1>
        <p className="mt-4 max-w-[640px] text-muted text-lg sm:text-[21px] tracking-[-0.01em] leading-normal">
          The Linguistic Research API is public and read-only. Authentication
          and API keys are not required.
        </p>
        <p className="mt-6 max-w-[640px] text-muted text-base leading-7 tracking-[-0.01em]">
          Rate limits and signed keys will be introduced when usage requires
          them. Until then, query one isolated dataset at a time.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row gap-3">
          <Button href="/docs/quickstart">Quickstart</Button>
          <Button href={`${API_ORIGIN}/docs`} variant="outline">
            Try the API
          </Button>
          <Button href={GITHUB_URL} variant="ghost">
            View source on GitHub
          </Button>
        </div>
      </Container>
    </section>
  );
}
