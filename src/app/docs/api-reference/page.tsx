import type { ReactNode } from "react";
import { cookies } from "next/headers";
import { Button } from "@/components/ui/Button";
import { BrowserMockup } from "@/components/sections/BrowserMockup";
import { apiPaths } from "@/lib/constants";
import { API_ORIGIN, GITHUB_URL } from "@/lib/catalog";
import { LOCALE_COOKIE, localeFromCookie, getSiteCopy } from "@/lib/i18n";

export const metadata = {
  title: "API documentation",
  description:
    "Full documentation for the ForroVivo Linguistic Research API: base URL, auth, headers, errors, lookup, search, catalog, entries, knowledge, audio, and routes.",
  alternates: { canonical: "/docs/api-reference" },
};

function Section({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-28">
      <h2 className="mt-12 text-white text-lg sm:text-[21px] tracking-[-0.01em]">
        {title}
      </h2>
      <div className="mt-4 space-y-4 text-muted text-base leading-7 tracking-[-0.01em]">
        {children}
      </div>
    </section>
  );
}

function Code({ children }: { children: ReactNode }) {
  return <code className="text-white">{children}</code>;
}

export default async function ApiReferencePage() {
  const locale = localeFromCookie((await cookies()).get(LOCALE_COOKIE)?.value);
  const copy = getSiteCopy(locale);
  const docs = copy.docsApiReference;
  const host = API_ORIGIN.replace("https://", "");
  const lookupExample = `curl "${API_ORIGIN}/v1/saotome/forro/lookup?headword=kume"`;
  const searchExample = `curl "${API_ORIGIN}/v1/search?dataset=saotome/forro&q=kume"`;
  const languagesExample = `curl "${API_ORIGIN}/v1/languages"`;
  const keyExample = `curl -H "Authorization: Bearer fv_live_…" "${API_ORIGIN}/v1/saotome/forro/lookup?headword=kume"`;

  return (
    <>
      <h1
        className="font-heading text-white tracking-[-0.03em] leading-[1.05]"
        style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
      >
        {docs.title}
      </h1>
      <p className="mt-4 text-muted text-lg sm:text-[21px] tracking-[-0.01em] leading-normal">
        {docs.intro}
      </p>

      <Section id="base-url" title={docs.baseUrlTitle}>
        <p>{docs.baseUrlBody}</p>
        <p>
          <Code>{API_ORIGIN}</Code>
        </p>
      </Section>

      <Section id="principles" title={docs.principlesTitle}>
        <p>{docs.principlesP1}</p>
        <p>{docs.principlesP2}</p>
      </Section>

      <Section id="versioning" title={docs.versioningTitle}>
        <p>{docs.versioningBody}</p>
      </Section>

      <Section id="naming" title={docs.namingTitle}>
        <p>{docs.namingBody}</p>
        <ul className="list-disc pl-5 space-y-2">
          {docs.namingBullets.map((bullet) => (
            <li key={bullet}>{bullet}</li>
          ))}
        </ul>
      </Section>

      <Section id="authentication" title={docs.authenticationTitle}>
        <p>{docs.authenticationP1}</p>
        <p>{docs.authenticationP2}</p>
        <div className="mt-4">
          <BrowserMockup
            command={keyExample}
            body={docs.authenticationMock}
          />
        </div>
      </Section>

      <Section id="headers" title={docs.headersTitle}>
        <ul className="list-disc pl-5 space-y-2">
          {docs.headersBullets.map((bullet) => (
            <li key={bullet}>{bullet}</li>
          ))}
        </ul>
      </Section>

      <Section id="cors" title={docs.corsTitle}>
        <p>{docs.corsBody}</p>
      </Section>

      <Section id="rate-limits" title={docs.rateLimitsTitle}>
        <p>{docs.rateLimitsBody}</p>
      </Section>

      <Section id="attribution" title={docs.attributionTitle}>
        <p>{docs.attributionBody}</p>
      </Section>

      <Section id="pagination" title={docs.paginationTitle}>
        <p>{docs.paginationBody}</p>
      </Section>

      <Section id="errors" title={docs.errorsTitle}>
        <p>{docs.errorsIntro}</p>
        <ul className="list-disc pl-5 space-y-2">
          {docs.errorsBullets.map((bullet) => (
            <li key={bullet}>{bullet}</li>
          ))}
        </ul>
      </Section>

      <Section id="catalog" title={docs.catalogTitle}>
        <p>{docs.catalogBody}</p>
        <div className="mt-4">
          <BrowserMockup
            command={languagesExample}
            body={docs.catalogMock}
          />
        </div>
      </Section>

      <Section id="lookup" title={docs.lookupTitle}>
        <p>{docs.lookupP1}</p>
        <p>{docs.lookupP2}</p>
        <div className="mt-4">
          <BrowserMockup
            command={lookupExample}
            body='{"dataset":"saotome/forro","match":"exact","count":…,"entries":[…],"attribution":{…}}'
          />
        </div>
      </Section>

      <Section id="search" title={docs.searchTitle}>
        <p>{docs.searchP1}</p>
        <p>{docs.searchP2}</p>
        <div className="mt-4">
          <BrowserMockup command={searchExample} body={docs.searchMock} />
        </div>
      </Section>

      <Section id="entries" title={docs.entriesTitle}>
        <p>{docs.entriesBody}</p>
      </Section>

      <Section id="knowledge" title={docs.knowledgeTitle}>
        <p>{docs.knowledgeBody}</p>
      </Section>

      <Section id="audio" title={docs.audioTitle}>
        <p>{docs.audioBody}</p>
      </Section>

      <Section id="web-ui" title={docs.webUiTitle}>
        <p>{docs.webUiBody}</p>
      </Section>

      <Section id="openapi" title={docs.openapiTitle}>
        <p>
          {docs.openapiBody}{" "}
          <a
            href={`${API_ORIGIN}/v1/openapi.yaml`}
            className="text-white hover:text-white/70 break-all"
          >
            {host}/v1/openapi.yaml
          </a>
          .{" "}
          <a
            href={GITHUB_URL}
            className="text-white hover:text-white/70 break-all"
          >
            {GITHUB_URL.replace("https://", "")}
          </a>
        </p>
      </Section>

      <Section id="routes" title={docs.routesTitle}>
        <p>{docs.routesBody}</p>
      </Section>

      <ul className="mt-6 divide-y divide-border border-t border-b border-border">
        {apiPaths.map((item) => (
          <li key={item.path} className="py-4">
            <p className="text-white text-base tracking-[-0.01em] break-all">
              {item.method} {item.path}
            </p>
            <p className="mt-1 text-muted text-base tracking-[-0.01em]">
              {item.detail}
            </p>
          </li>
        ))}
      </ul>

      <div className="mt-8 flex flex-col sm:flex-row gap-3">
        <Button href="/docs/quickstart" variant="outline">
          {docs.ctaQuickstart}
        </Button>
        <Button href="/api/login">{docs.ctaPlatform}</Button>
        <Button href={`${API_ORIGIN}/v1/openapi.yaml`} variant="ghost">
          {docs.ctaOpenapi}
        </Button>
      </div>
    </>
  );
}
