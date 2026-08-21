import { cookies } from "next/headers";
import { footer } from "@/lib/constants";
import { LOCALE_COOKIE, localeFromCookie, getSiteCopy } from "@/lib/i18n";

export const metadata = {
  title: "Company",
  description:
    "Company information for LIVLU TECHNOLOGIES LTD and the ForroVivo product family: Open Knowledge, Linguistic Research, the Forro Vivo App, and Forro Connect.",
  alternates: { canonical: "/legal/company" },
};

export default async function LegalCompanyPage() {
  const locale = localeFromCookie((await cookies()).get(LOCALE_COOKIE)?.value);
  const copy = getSiteCopy(locale);
  const docs = copy.legalCompany;

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
        <p>
          {docs.p1BeforeHouse}{" "}
          <a
            href={footer.companiesHouseHref}
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-white/70 transition-colors"
          >
            {docs.companiesHouse}
          </a>
          {docs.p1AfterHouse}
        </p>
        <p>{docs.p2}</p>

        <h2 className="pt-4 font-heading text-white tracking-[-0.02em] text-2xl leading-tight">
          {docs.familyTitle}
        </h2>
        <p>{docs.openKnowledge}</p>
        <p>{docs.linguisticResearch}</p>
        <p>{docs.forroVivoApp}</p>
        <p>{docs.forroConnect}</p>
        <p>{docs.apiPlatform}</p>

        <h2 className="pt-4 font-heading text-white tracking-[-0.02em] text-2xl leading-tight">
          {docs.marksTitle}
        </h2>
        <p>{docs.marksBody}</p>

        <h2 className="pt-4 font-heading text-white tracking-[-0.02em] text-2xl leading-tight">
          {docs.questionsTitle}
        </h2>
        <p>
          {docs.questionsBefore}{" "}
          <a
            href={`mailto:${footer.contacts.legal}`}
            className="text-white hover:text-white/70 transition-colors underline-offset-4 hover:underline"
          >
            {docs.writeToLegal}
          </a>
          {docs.questionsAfter}
        </p>
      </div>
    </>
  );
}
