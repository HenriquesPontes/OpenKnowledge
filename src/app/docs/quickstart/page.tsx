import { Button } from "@/components/ui/Button";
import { BrowserMockup } from "@/components/sections/BrowserMockup";
import { apiSection } from "@/lib/constants";
import { API_ORIGIN } from "@/lib/catalog";

export const metadata = {
  title: "Quickstart",
  description:
    "First curl calls against the Linguistic Research API. Auth, errors, and routes are in the API reference.",
  alternates: { canonical: "/docs/quickstart" },
};

export default function QuickstartPage() {
  const lookup = `curl "${API_ORIGIN}/v1/saotome/forro/lookup?headword=kume"`;

  return (
    <>
      <h1
        className="font-heading text-white tracking-[-0.03em] leading-[1.05]"
        style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
      >
        Quickstart
      </h1>
      <p className="mt-4 text-muted text-lg sm:text-[21px] tracking-[-0.01em] leading-normal">
        Three calls to get started. Rules for keys, errors, CORS, and naming are
        only in the{" "}
        <a href="/docs/api-reference" className="text-white hover:text-white/70">
          API reference
        </a>
        .
      </p>

      <h2 className="mt-10 text-white text-lg sm:text-[21px] tracking-[-0.01em]">
        1. List languages
      </h2>
      <div className="mt-4">
        <BrowserMockup
          command={apiSection.command}
          body="Catalog of published lexicons."
        />
      </div>

      <h2 className="mt-10 text-white text-lg sm:text-[21px] tracking-[-0.01em]">
        2. Look up a headword in one dataset
      </h2>
      <div className="mt-4">
        <BrowserMockup
          command={lookup}
          body="One folder only, for example saotome/forro or angola/umbundu."
        />
      </div>

      <h2 className="mt-10 text-white text-lg sm:text-[21px] tracking-[-0.01em]">
        3. Search inside one dataset
      </h2>
      <div className="mt-4">
        <BrowserMockup
          command={`curl "${API_ORIGIN}/v1/search?dataset=saotome/forro&q=kume"`}
          body="Requires dataset=."
        />
      </div>

      <div className="mt-8 flex flex-col sm:flex-row gap-3">
        <Button href="/docs/api-reference">API documentation</Button>
        <Button href="/api/login" variant="outline">
          API Platform
        </Button>
      </div>
    </>
  );
}
