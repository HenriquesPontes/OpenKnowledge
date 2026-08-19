import { Button } from "@/components/ui/Button";
import { principle } from "@/lib/constants";
import { API_ORIGIN, GITHUB_URL } from "@/lib/catalog";

export default function DocsIndexPage() {
  return (
    <>
      <h1
        className="font-heading text-white tracking-[-0.03em] leading-[1.05]"
        style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
      >
        Introduction
      </h1>
      <p className="mt-4 text-muted text-lg sm:text-[21px] tracking-[-0.01em] leading-normal">
        ForroVivo is the platform. This site is the front door to the Linguistic
        Knowledge Base: attested lexicons, sources, and a public API.
      </p>
      <p className="mt-6 text-muted text-base leading-7 tracking-[-0.01em]">
        {principle}
      </p>
      <p className="mt-4 text-muted text-base leading-7 tracking-[-0.01em]">
        The API is GET-only. Each path serves one dataset. Parent indexes are
        not merged dictionaries. If a term is not attested, the service returns
        TERM_NOT_FOUND.
      </p>
      <div className="mt-8 flex flex-col sm:flex-row gap-3">
        <Button href="/docs/quickstart">Quickstart</Button>
        <Button href="/docs/methodology" variant="outline">
          Methodology
        </Button>
        <Button href={GITHUB_URL} variant="ghost">
          View source on GitHub
        </Button>
      </div>
      <p className="mt-10 text-muted text-base tracking-[-0.01em]">
        Public host: {API_ORIGIN}
      </p>
    </>
  );
}
