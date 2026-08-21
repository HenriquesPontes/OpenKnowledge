import { cookies } from "next/headers";
import { Button } from "@/components/ui/Button";
import { BrowserMockup } from "@/components/sections/BrowserMockup";
import { apiSection } from "@/lib/constants";
import { API_ORIGIN } from "@/lib/catalog";
import { LOCALE_COOKIE, localeFromCookie, getSiteCopy } from "@/lib/i18n";

export const metadata = {
  title: "Quickstart",
  description:
    "First curl calls against the Linguistic Research API. Auth, errors, and routes are in the API reference.",
  alternates: { canonical: "/docs/quickstart" },
};

export default async function QuickstartPage() {
  const locale = localeFromCookie((await cookies()).get(LOCALE_COOKIE)?.value);
  const copy = getSiteCopy(locale);
  const docs = copy.docsQuickstart;
  const lookup = `curl "${API_ORIGIN}/v1/saotome/forro/lookup?headword=kume"`;

  return (
    <>
      <h1
        className="font-heading text-white tracking-[-0.03em] leading-[1.05]"
        style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
      >
        {docs.title}
      </h1>
      <p className="mt-4 text-muted text-lg sm:text-[21px] tracking-[-0.01em] leading-normal">
        {docs.introBefore}{" "}
        <a href="/docs/api-reference" className="text-white hover:text-white/70">
          {docs.apiReferenceLink}
        </a>
        {docs.introAfter}
      </p>

      <h2 className="mt-10 text-white text-lg sm:text-[21px] tracking-[-0.01em]">
        {docs.step1}
      </h2>
      <div className="mt-4">
        <BrowserMockup command={apiSection.command} body={docs.step1Body} />
      </div>

      <h2 className="mt-10 text-white text-lg sm:text-[21px] tracking-[-0.01em]">
        {docs.step2}
      </h2>
      <div className="mt-4">
        <BrowserMockup command={lookup} body={docs.step2Body} />
      </div>

      <h2 className="mt-10 text-white text-lg sm:text-[21px] tracking-[-0.01em]">
        {docs.step3}
      </h2>
      <div className="mt-4">
        <BrowserMockup
          command={`curl "${API_ORIGIN}/v1/search?dataset=saotome/forro&q=kume"`}
          body={docs.step3Body}
        />
      </div>

      <div className="mt-8 flex flex-col sm:flex-row gap-3">
        <Button href="/docs/api-reference">{docs.apiDocumentation}</Button>
        <Button href="/api/login" variant="outline">
          {docs.apiPlatform}
        </Button>
      </div>
    </>
  );
}
