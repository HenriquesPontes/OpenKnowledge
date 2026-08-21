import { Button } from "@/components/ui/Button";
import { BrowserMockup } from "@/components/sections/BrowserMockup";
import { apiSection, principle } from "@/lib/constants";
import { API_ORIGIN, GITHUB_URL } from "@/lib/catalog";

export const metadata = {
  title: "Open Knowledge",
  description:
    "Documentation for Open Knowledge: isolated lexicons, Linguistic Research API, methodology, and API Platform.",
  alternates: { canonical: "/docs/open-knowledge" },
};

export default function OpenKnowledgeDocsPage() {
  return (
    <>
      <h1
        className="font-heading text-white tracking-[-0.03em] leading-[1.05]"
        style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
      >
        Open Knowledge
      </h1>
      <p className="mt-4 text-muted text-lg sm:text-[21px] tracking-[-0.01em] leading-normal">
        Public linguistic knowledge site for ForroVivo. Isolated lexicons,
        attested sources, and a read-only API.
      </p>

      <div className="mt-10 rounded-2xl border border-border bg-surface px-6 py-7 sm:px-8 sm:py-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-10 lg:items-center">
          <div>
            <h2 className="font-heading text-white text-2xl sm:text-3xl tracking-[-0.02em]">
              Developer quickstart
            </h2>
            <p className="mt-3 text-muted text-base leading-7 tracking-[-0.01em]">
              Make your first API request in minutes. Full auth, errors, and
              routes live only in the API reference.
            </p>
            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <Button href="/docs/quickstart">Get started</Button>
              <Button href="/api/login" variant="outline">
                Create API key
              </Button>
            </div>
          </div>
          <BrowserMockup
            command={apiSection.command}
            body="Returns every published lexicon with entry counts."
          />
        </div>
      </div>

      <h2 className="mt-12 text-white text-lg sm:text-[21px] tracking-[-0.01em]">
        Explore
      </h2>
      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
        <a
          href="/docs/api-reference"
          className="rounded-2xl border border-border bg-surface px-6 py-6 transition-colors hover:border-white/25"
        >
          <h3 className="text-white font-heading text-xl tracking-[-0.02em]">
            API documentation
          </h3>
          <p className="mt-2 text-muted text-base leading-7 tracking-[-0.01em]">
            The source of truth for /v1 on {API_ORIGIN.replace("https://", "")}:
            authentication, errors, lookup, search, and every route.
          </p>
          <span className="mt-5 inline-block text-sm text-white/70">
            Open API documentation →
          </span>
        </a>
        <a
          href="/docs/methodology"
          className="rounded-2xl border border-border bg-surface px-6 py-6 transition-colors hover:border-white/25"
        >
          <h3 className="text-white font-heading text-xl tracking-[-0.02em]">
            Methodology
          </h3>
          <p className="mt-2 text-muted text-base leading-7 tracking-[-0.01em]">
            {principle}
          </p>
          <span className="mt-5 inline-block text-sm text-white/70">
            Read methodology →
          </span>
        </a>
      </div>

      <div className="mt-8 flex flex-col sm:flex-row gap-3">
        <Button href="/languages" variant="outline">
          Languages
        </Button>
        <Button href={GITHUB_URL} variant="ghost">
          View source on GitHub
        </Button>
      </div>
    </>
  );
}
