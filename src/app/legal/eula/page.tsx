import { cookies } from "next/headers";
import { footer } from "@/lib/constants";
import { LOCALE_COOKIE, localeFromCookie, getSiteCopy } from "@/lib/i18n";

export const metadata = {
  title: "EULA",
  description:
    "End User License Agreement for Open Knowledge, Linguistic Research, the Forro Vivo App, and related ForroVivo software and data operated by LIVLU TECHNOLOGIES LTD.",
  alternates: { canonical: "/legal/eula" },
};

export default async function LegalEulaPage() {
  const locale = localeFromCookie((await cookies()).get(LOCALE_COOKIE)?.value);
  const copy = getSiteCopy(locale);
  const docs = copy.legalEula;

  return (
    <>
      <h1
        className="font-heading text-white tracking-[-0.03em] leading-[1.05]"
        style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
      >
        {docs.title}
      </h1>
      <p className="mt-4 max-w-[40rem] text-muted text-lg sm:text-[21px] tracking-[-0.01em] leading-normal">
        {docs.intro}
      </p>

      <div className="mt-10 max-w-[42rem] space-y-6 text-muted text-base leading-7 tracking-[-0.01em]">
        <p>{docs.opening}</p>

        <h2 className="pt-4 font-heading text-white tracking-[-0.02em] text-2xl leading-tight">
          {docs.grantTitle}
        </h2>
        <p>
          {docs.grantP1Before}{" "}
          <a
            href="/legal/terms"
            className="text-white hover:text-white/70 transition-colors"
          >
            {docs.termsOfService}
          </a>
          {docs.grantP1After}
        </p>
        <p>{docs.grantP2}</p>

        <h2 className="pt-4 font-heading text-white tracking-[-0.02em] text-2xl leading-tight">
          {docs.researchTitle}
        </h2>
        <p>{docs.researchP1}</p>
        <p>{docs.researchP2}</p>

        <h2 className="pt-4 font-heading text-white tracking-[-0.02em] text-2xl leading-tight">
          {docs.appTitle}
        </h2>
        <p>{docs.appBody}</p>

        <h2 className="pt-4 font-heading text-white tracking-[-0.02em] text-2xl leading-tight">
          {docs.connectTitle}
        </h2>
        <p>{docs.connectBody}</p>

        <h2 className="pt-4 font-heading text-white tracking-[-0.02em] text-2xl leading-tight">
          {docs.apiTitle}
        </h2>
        <p>{docs.apiP1}</p>
        <p>
          {docs.apiP2Before}{" "}
          <a
            href="/docs/api-reference"
            className="text-white hover:text-white/70 transition-colors"
          >
            {docs.apiDocumentation}
          </a>{" "}
          {docs.apiP2After}
        </p>

        <h2 className="pt-4 font-heading text-white tracking-[-0.02em] text-2xl leading-tight">
          {docs.restrictionsTitle}
        </h2>
        <p>
          {docs.restrictionsBefore}{" "}
          <a
            href="/legal"
            className="text-white hover:text-white/70 transition-colors"
          >
            {docs.legalLink}
          </a>{" "}
          {docs.restrictionsAfter}
        </p>

        <h2 className="pt-4 font-heading text-white tracking-[-0.02em] text-2xl leading-tight">
          {docs.terminationTitle}
        </h2>
        <p>{docs.terminationBody}</p>

        <h2 className="pt-4 font-heading text-white tracking-[-0.02em] text-2xl leading-tight">
          {docs.governingTitle}
        </h2>
        <p>
          {docs.governingBefore}{" "}
          <a
            href={`mailto:${footer.contacts.legal}`}
            className="text-white hover:text-white/70 transition-colors underline-offset-4 hover:underline"
          >
            {docs.writeToLegal}
          </a>
          {docs.governingAfter}
        </p>
      </div>
    </>
  );
}
