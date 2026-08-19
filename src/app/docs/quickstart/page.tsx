import { Button } from "@/components/ui/Button";
import { BrowserMockup } from "@/components/sections/BrowserMockup";
import { apiSection } from "@/lib/constants";
import { API_ORIGIN } from "@/lib/catalog";

export const metadata = {
  title: "Quickstart",
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
        No API key. Read the catalog, then query one isolated dataset.
      </p>

      <h2 className="mt-10 text-white text-lg sm:text-[21px] tracking-[-0.01em]">
        1. List languages
      </h2>
      <div className="mt-4">
        <BrowserMockup
          command={apiSection.command}
          body="Returns isolated lexicons. Counts are per folder."
        />
      </div>

      <h2 className="mt-10 text-white text-lg sm:text-[21px] tracking-[-0.01em]">
        2. Look up a headword in one dataset
      </h2>
      <div className="mt-4">
        <BrowserMockup
          command={lookup}
          body="Exact matches from that folder only, for example saotome/forro, caboverde/santiago, guinebissau/bissau, or angola. Missing terms return TERM_NOT_FOUND."
        />
      </div>

      <h2 className="mt-10 text-white text-lg sm:text-[21px] tracking-[-0.01em]">
        3. Search inside one dataset
      </h2>
      <div className="mt-4">
        <BrowserMockup
          command={`curl "${API_ORIGIN}/v1/search?dataset=saotome/forro&q=kume"`}
          body="Search never crosses folders. dataset= is required."
        />
      </div>

      <div className="mt-8">
        <Button href="/docs/api-reference">API reference</Button>
      </div>
    </>
  );
}
