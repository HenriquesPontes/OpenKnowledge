import type { ReactNode } from "react";
import { Button } from "@/components/ui/Button";
import { BrowserMockup } from "@/components/sections/BrowserMockup";
import { apiPaths } from "@/lib/constants";
import { API_ORIGIN, GITHUB_URL } from "@/lib/catalog";

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

export default function ApiReferencePage() {
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
        API documentation
      </h1>
      <p className="mt-4 text-muted text-lg sm:text-[21px] tracking-[-0.01em] leading-normal">
        Full documentation for the ForroVivo Linguistic Research API on {host}.
        This page is the source of truth. Quickstart shows first calls only.
      </p>

      <Section id="base-url" title="Base URL">
        <p>
          Production host: <Code>{API_ORIGIN}</Code>. All data routes live under{" "}
          <Code>/v1</Code>. The site root redirects to <Code>/v1</Code>. Curl
          and other clients call this host directly. The website playground at{" "}
          <Code>/api</Code> proxies through <Code>/api/v1</Code> on forrovivo.com
          for the browser UI only.
        </p>
      </Section>

      <Section id="principles" title="Principles">
        <p>
          The API is read-only for lexicon data. It does not invent translations,
          merge languages, or write into datasets. Missing data is preferable to
          incorrect data. Each path serves one isolated dataset. Parent country
          indexes are not merged dictionaries.
        </p>
        <p>
          Gloss fields are concepts the headword means. They are not proof that
          the word belongs to Portuguese or English.
        </p>
      </Section>

      <Section id="versioning" title="Versioning">
        <p>
          Responses send <Code>API-Version: v1</Code>. The identity document at{" "}
          <Code>GET /v1</Code> includes <Code>api</Code> (the URL family) and{" "}
          <Code>version</Code> (the release). Breaking changes ship under a new
          family, not by silently changing <Code>/v1</Code> behaviour.
        </p>
      </Section>

      <Section id="naming" title="Endpoint naming">
        <p>
          Lexicons use{" "}
          <Code>/v1/{"{family}/{variety}/{collection}"}</Code>. Country indexes
          are <Code>/v1/{"{family}"}</Code> and list child lexicons; they are not
          lookup targets for headwords.
        </p>
        <ul className="list-disc pl-5 space-y-2">
          <li>
            Look up Forro at <Code>/v1/saotome/forro/lookup</Code>
          </li>
          <li>
            Look up Umbundu at <Code>/v1/angola/umbundu/lookup</Code>
          </li>
          <li>
            Do not look up at <Code>/v1/angola/lookup</Code> — that is the country
            index path shape, not a merged Angola lexicon
          </li>
          <li>
            Angolar of São Tomé is <Code>/v1/saotome/angolar</Code>, not Angola
          </li>
        </ul>
      </Section>

      <Section id="authentication" title="Authentication">
        <p>
          Public <Code>GET</Code>, <Code>HEAD</Code>, and <Code>OPTIONS</Code>{" "}
          work without a key. Optional keys identify your client. Create an
          account at{" "}
          <a href="/api/register" className="text-white hover:text-white/70">
            /api/register
          </a>
          , sign in at{" "}
          <a href="/api/login" className="text-white hover:text-white/70">
            /api/login
          </a>
          , then get or replace a key in the API Platform dashboard. Keys are
          shown once.
        </p>
        <p>
          Send the key as <Code>Authorization: Bearer &lt;key&gt;</Code> or{" "}
          <Code>X-Api-Key: &lt;key&gt;</Code>. Keys use the{" "}
          <Code>fv_live_</Code> prefix. <Code>POST /v1/keys</Code> issues or
          replaces a key for an email; replacing invalidates the previous key.
        </p>
        <div className="mt-4">
          <BrowserMockup
            command={keyExample}
            body="Same lookup response. The key identifies the client; public GET still works without it."
          />
        </div>
      </Section>

      <Section id="headers" title="Response headers">
        <ul className="list-disc pl-5 space-y-2">
          <li>
            <Code>API-Version</Code> — URL family, currently <Code>v1</Code>
          </li>
          <li>
            <Code>Link</Code> — <Code>rel=index</Code>,{" "}
            <Code>rel=describedby</Code> (OpenAPI), <Code>rel=source</Code>{" "}
            (GitHub), <Code>rel=license</Code>
          </li>
          <li>
            <Code>RateLimit-Policy</Code> — fair-use policy for this deployment
          </li>
          <li>
            <Code>RateLimit-Limit</Code> — when present, the applied limit
          </li>
          <li>
            <Code>Retry-After</Code> — seconds to wait after{" "}
            <Code>RATE_LIMITED</Code>
          </li>
        </ul>
      </Section>

      <Section id="cors" title="CORS">
        <p>
          Browser clients may call the API from any origin. Credentials are not
          used. Preflight allows <Code>GET</Code>, <Code>HEAD</Code>,{" "}
          <Code>POST</Code> (keys), and <Code>OPTIONS</Code>. Exposed headers
          include <Code>API-Version</Code>, <Code>Link</Code>, and rate-limit
          headers.
        </p>
      </Section>

      <Section id="rate-limits" title="Rate limits">
        <p>
          Fair-use limits apply per client. When a client exceeds the policy the
          API returns <Code>429</Code> with code <Code>RATE_LIMITED</Code> and{" "}
          <Code>Retry-After</Code>. Always read <Code>RateLimit-Policy</Code> on
          the response rather than hard-coding a budget. Health and OpenAPI
          paths stay exempt.
        </p>
      </Section>

      <Section id="attribution" title="Source attribution">
        <p>
          Every linguistic claim stays tied to a cited source. Lookup envelopes
          include an <Code>attribution</Code> object (dataset, GitHub tree,
          sources path, license). Each entry carries <Code>source</Code> and{" "}
          <Code>graph.documented_by</Code> when present. Project materials are
          CC BY 4.0. Source extracts keep their original terms.
        </p>
      </Section>

      <Section id="pagination" title="Pagination">
        <p>
          List routes such as entries accept <Code>offset</Code> (default{" "}
          <Code>0</Code>) and <Code>limit</Code>. Stay within the server’s
          accepted range; oversized values are clamped. Responses include the
          page of items for that dataset only.
        </p>
      </Section>

      <Section id="errors" title="Errors">
        <p>Error bodies use a stable <Code>code</Code> and a human{" "}
          <Code>message</Code>. Common codes:</p>
        <ul className="list-disc pl-5 space-y-2">
          <li>
            <Code>TERM_NOT_FOUND</Code> — no matching headword in that dataset
          </li>
          <li>
            <Code>DATASET_NOT_FOUND</Code> — unknown family or variety path
          </li>
          <li>
            <Code>DATASET_REQUIRED</Code> — search called without{" "}
            <Code>dataset=</Code>
          </li>
          <li>
            <Code>QUERY_REQUIRED</Code> — search called without <Code>q=</Code>
          </li>
          <li>
            <Code>RATE_LIMITED</Code> — fair-use limit exceeded (
            <Code>429</Code>)
          </li>
        </ul>
      </Section>

      <Section id="catalog" title="Catalog">
        <p>
          <Code>GET /v1</Code> returns service identity and links.{" "}
          <Code>GET /v1/languages</Code> lists isolated lexicons (not country
          indexes). <Code>GET /v1/datasets</Code> lists published datasets
          including indexes. <Code>GET /v1/kb</Code> maps Knowledge Base
          collections.
        </p>
        <div className="mt-4">
          <BrowserMockup
            command={languagesExample}
            body="One object per isolated lexicon, with entry counts per dataset."
          />
        </div>
      </Section>

      <Section id="lookup" title="Lookup">
        <p>
          <Code>GET /v1/{"{family}/{variety}"}/lookup?headword=</Code> returns
          exact matches from that dataset only. Required query:{" "}
          <Code>headword</Code>. The envelope includes <Code>dataset</Code>,{" "}
          <Code>attribution</Code>, <Code>query</Code>, <Code>match</Code>,{" "}
          <Code>count</Code>, and <Code>entries</Code>.
        </p>
        <p>
          Each entry may include headword, orthography, part of speech,
          translations, examples, pronunciation, source fields, verification
          status, graph edges, and audio links. Empty fields stay{" "}
          <Code>null</Code> or empty arrays — they are never invented.
        </p>
        <div className="mt-4">
          <BrowserMockup
            command={lookupExample}
            body='{"dataset":"saotome/forro","match":"exact","count":…,"entries":[…],"attribution":{…}}'
          />
        </div>
      </Section>

      <Section id="search" title="Search">
        <p>
          <Code>GET /v1/search?dataset={"{family}/{variety}"}&amp;q=</Code>{" "}
          searches inside one named dataset. Both <Code>dataset</Code> and{" "}
          <Code>q</Code> are required. Search never crosses datasets.
        </p>
        <p>
          Dataset-scoped search also exists at{" "}
          <Code>GET /v1/{"{family}/{variety}"}/search?q=</Code> and covers
          entries, knowledge, and sources inside that dataset.
        </p>
        <div className="mt-4">
          <BrowserMockup
            command={searchExample}
            body="Hits from that dataset only. Missing dataset returns DATASET_REQUIRED."
          />
        </div>
      </Section>

      <Section id="entries" title="Entries">
        <p>
          <Code>GET /v1/{"{family}/{variety}"}/entries</Code> lists lexical
          entries for one dataset. Optional <Code>q</Code>, <Code>offset</Code>,
          and <Code>limit</Code>. Fetch one record with{" "}
          <Code>/entries/{"{entry_id}"}</Code>.
        </p>
      </Section>

      <Section id="knowledge" title="Knowledge and sources">
        <p>
          <Code>GET /v1/{"{family}/{variety}"}/sources</Code> returns the
          bibliography for that dataset. Knowledge collections such as{" "}
          <Code>grammar</Code> return attested records or an empty list until a
          cited source fills them. Country-level collection indexes list paths
          per isolated dataset; they do not merge records.
        </p>
      </Section>

      <Section id="audio" title="Audio">
        <p>
          When an entry includes audio, each clip points at{" "}
          <Code>
            /v1/{"{family}/{variety}"}/audio/{"{filename}"}
          </Code>
          . Files stay inside the same isolated dataset as the entry.
        </p>
      </Section>

      <Section id="web-ui" title="Web UI">
        <p>
          API Platform on this site is <Code>/api</Code>. Sign in at{" "}
          <Code>/api/login</Code> for the dashboard and optional key. The live
          try form sends requests through <Code>/api/v1</Code> on this origin,
          then to the Linguistic Research API. First examples are in{" "}
          <a href="/docs/quickstart" className="text-white hover:text-white/70">
            Quickstart
          </a>
          .
        </p>
      </Section>

      <Section id="openapi" title="OpenAPI contract">
        <p>
          Machine-readable contract:{" "}
          <a
            href={`${API_ORIGIN}/v1/openapi.yaml`}
            className="text-white hover:text-white/70 break-all"
          >
            {host}/v1/openapi.yaml
          </a>
          . Research repository:{" "}
          <a
            href={GITHUB_URL}
            className="text-white hover:text-white/70 break-all"
          >
            {GITHUB_URL.replace("https://", "")}
          </a>
          .
        </p>
      </Section>

      <Section id="routes" title="Routes">
        <p>
          Country families include saotome, caboverde, guinebissau, angola, and
          the other published country indexes. Indexes are not merged lexicons.
        </p>
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
          Quickstart
        </Button>
        <Button href="/api/login">API Platform</Button>
        <Button href={`${API_ORIGIN}/v1/openapi.yaml`} variant="ghost">
          OpenAPI YAML
        </Button>
      </div>
    </>
  );
}
