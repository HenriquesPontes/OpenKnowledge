import type { ReactNode } from "react";
import { Button } from "@/components/ui/Button";
import { apiPaths } from "@/lib/constants";
import { API_ORIGIN } from "@/lib/catalog";

export const metadata = {
  title: "API reference",
  description:
    "Public /v1 linguistic API: naming, versioning, attribution, rate limits, CORS, and routes.",
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
      <h2 className="mt-10 text-white text-lg sm:text-[21px] tracking-[-0.01em]">
        {title}
      </h2>
      <div className="mt-4 space-y-4 text-muted text-base leading-7 tracking-[-0.01em]">
        {children}
      </div>
    </section>
  );
}

export default function ApiReferencePage() {
  const host = API_ORIGIN.replace("https://", "");

  return (
    <>
      <h1
        className="font-heading text-white tracking-[-0.03em] leading-[1.05]"
        style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
      >
        API reference
      </h1>
      <p className="mt-4 text-muted text-lg sm:text-[21px] tracking-[-0.01em] leading-normal">
        Read-only GET routes on {host}. No API key. Each path serves one isolated
        dataset.
      </p>

      <Section id="versioning" title="Versioning">
        <p>
          All data routes live under <code className="text-white">/v1</code>. The
          root path redirects there. Responses send{" "}
          <code className="text-white">API-Version: v1</code>. The identity
          document at <code className="text-white">GET /v1</code> includes{" "}
          <code className="text-white">api</code> (the URL family) and{" "}
          <code className="text-white">version</code> (the release).
        </p>
      </Section>

      <Section id="naming" title="Endpoint naming">
        <p>
          Lexicons use{" "}
          <code className="text-white">/v1/{"{family}/{variety}/{collection}"}</code>
          . Country indexes are <code className="text-white">/v1/{"{family}"}</code>{" "}
          and are not merged dictionaries. Look up Angola Contruy at{" "}
          <code className="text-white">/v1/angola/contruy/lookup</code>, not{" "}
          <code className="text-white">/v1/angola/lookup</code>. Angolar of São
          Tomé is <code className="text-white">/v1/saotome/angolar</code>.
        </p>
      </Section>

      <Section id="authentication" title="Authentication">
        <p>
          None. The API is public and read-only. Allowed methods are GET, HEAD,
          and OPTIONS. It does not invent translations, merge languages, or write
          lexicon data.
        </p>
      </Section>

      <Section id="cors" title="CORS">
        <p>
          Browser clients may call the API from any origin. Credentials are not
          used. Preflight is limited to GET, HEAD, and OPTIONS.
        </p>
      </Section>

      <Section id="rate-limits" title="Rate limits">
        <p>
          Fair-use limits apply per client. When a client exceeds the policy the
          API returns <code className="text-white">429</code> with code{" "}
          <code className="text-white">RATE_LIMITED</code> and{" "}
          <code className="text-white">Retry-After</code>. Read{" "}
          <code className="text-white">RateLimit-Policy</code> on the response.
        </p>
      </Section>

      <Section id="attribution" title="Source attribution">
        <p>
          Every linguistic claim stays tied to a cited source. Lookup responses
          include an <code className="text-white">attribution</code> object
          (folder, GitHub tree, sources path, license). Each entry also carries{" "}
          <code className="text-white">source</code> and{" "}
          <code className="text-white">graph.documented_by</code>. HTTP{" "}
          <code className="text-white">Link</code> headers point at the GitHub
          repository (<code className="text-white">rel=source</code>) and the
          project license (<code className="text-white">rel=license</code>).
          Project materials are CC BY 4.0. Source extracts keep their original
          terms.
        </p>
      </Section>

      <Section id="errors" title="Errors">
        <p>
          Missing headwords return <code className="text-white">TERM_NOT_FOUND</code>{" "}
          for that folder only. Unknown paths return{" "}
          <code className="text-white">DATASET_NOT_FOUND</code>. Search without{" "}
          <code className="text-white">dataset=</code> returns{" "}
          <code className="text-white">DATASET_REQUIRED</code>.
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
            <p className="text-white text-base tracking-[-0.01em]">
              {item.method} {item.path}
            </p>
            <p className="mt-1 text-muted text-base tracking-[-0.01em]">
              {item.detail}
            </p>
          </li>
        ))}
      </ul>

      <div className="mt-8 flex flex-col sm:flex-row gap-3">
        <Button href="/api#try">Try the API</Button>
        <Button href="/docs/quickstart" variant="outline">
          Quickstart
        </Button>
      </div>
    </>
  );
}
