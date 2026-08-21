import { cookies } from "next/headers";
import { Button } from "@/components/ui/Button";
import { BrowserMockup } from "@/components/sections/BrowserMockup";
import { apiSection } from "@/lib/constants";
import { GITHUB_URL } from "@/lib/catalog";
import { LOCALE_COOKIE, localeFromCookie, getSiteCopy } from "@/lib/i18n";

export const metadata = {
  title: "Open Knowledge",
  description:
    "Documentation for Open Knowledge: isolated lexicons, Linguistic Research API, methodology, and API Platform.",
  alternates: { canonical: "/docs/open-knowledge" },
};

export default async function OpenKnowledgeDocsPage() {
  const locale = localeFromCookie((await cookies()).get(LOCALE_COOKIE)?.value);
  const copy = getSiteCopy(locale);
  const docs = copy.docsOpenKnowledge;

  return (
    <>
      <h1
        className="font-heading text-white tracking-[-0.03em] leading-[1.05]"
        style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
      >
        {docs.title}
      </h1>
      <p className="mt-4 text-muted text-lg sm:text-[21px] tracking-[-0.01em] leading-normal">
        {docs.description}
      </p>

      <div className="mt-10 rounded-2xl border border-border bg-surface px-6 py-7 sm:px-8 sm:py-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-10 lg:items-center">
          <div>
            <h2 className="font-heading text-white text-2xl sm:text-3xl tracking-[-0.02em]">
              {docs.quickstartTitle}
            </h2>
            <p className="mt-3 text-muted text-base leading-7 tracking-[-0.01em]">
              {docs.quickstartBody}
            </p>
            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <Button href="/docs/quickstart">{docs.getStarted}</Button>
              <Button href="/api/login" variant="outline">
                {docs.createApiKey}
              </Button>
            </div>
          </div>
          <BrowserMockup command={apiSection.command} body={docs.mockBody} />
        </div>
      </div>

      <h2 className="mt-12 text-white text-lg sm:text-[21px] tracking-[-0.01em]">
        {docs.explore}
      </h2>
      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
        <a
          href="/docs/api-reference"
          className="rounded-2xl border border-border bg-surface px-6 py-6 transition-colors hover:border-white/25"
        >
          <h3 className="text-white font-heading text-xl tracking-[-0.02em]">
            {docs.apiDocsTitle}
          </h3>
          <p className="mt-2 text-muted text-base leading-7 tracking-[-0.01em]">
            {docs.apiDocsBody}
          </p>
          <span className="mt-5 inline-block text-sm text-white/70">
            {docs.openApiDocs}
          </span>
        </a>
        <a
          href="/docs/methodology"
          className="rounded-2xl border border-border bg-surface px-6 py-6 transition-colors hover:border-white/25"
        >
          <h3 className="text-white font-heading text-xl tracking-[-0.02em]">
            {docs.methodologyTitle}
          </h3>
          <p className="mt-2 text-muted text-base leading-7 tracking-[-0.01em]">
            {copy.principle}
          </p>
          <span className="mt-5 inline-block text-sm text-white/70">
            {docs.readMethodology}
          </span>
        </a>
      </div>

      <div className="mt-8 flex flex-col sm:flex-row gap-3">
        <Button href="/languages" variant="outline">
          {docs.languages}
        </Button>
        <Button href={GITHUB_URL} variant="ghost">
          {docs.viewGithub}
        </Button>
      </div>
    </>
  );
}
