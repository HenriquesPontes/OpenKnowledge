import { cookies } from "next/headers";
import { footer } from "@/lib/constants";
import { LOCALE_COOKIE, localeFromCookie, getSiteCopy } from "@/lib/i18n";

export const metadata = {
  title: "Privacy",
  description:
    "Privacy policy for Open Knowledge, Linguistic Research, the Forro Vivo App, Forro Connect, and the API Platform operated by LIVLU TECHNOLOGIES LTD.",
  alternates: { canonical: "/legal/privacy" },
};

export default async function LegalPrivacyPage() {
  const locale = localeFromCookie((await cookies()).get(LOCALE_COOKIE)?.value);
  const copy = getSiteCopy(locale);
  const docs = copy.legalPrivacy;

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
          {docs.whoTitle}
        </h2>
        <p>{docs.whoBody}</p>

        <h2 className="pt-4 font-heading text-white tracking-[-0.02em] text-2xl leading-tight">
          {docs.whatTitle}
        </h2>
        <p>{docs.waitlists}</p>
        <p>{docs.accounts}</p>
        <p>{docs.logs}</p>
        <p>{docs.app}</p>
        <p>{docs.connect}</p>

        <h2 className="pt-4 font-heading text-white tracking-[-0.02em] text-2xl leading-tight">
          {docs.researchTitle}
        </h2>
        <p>{docs.researchBody}</p>

        <h2 className="pt-4 font-heading text-white tracking-[-0.02em] text-2xl leading-tight">
          {docs.whyTitle}
        </h2>
        <p>{docs.whyBody}</p>

        <h2 className="pt-4 font-heading text-white tracking-[-0.02em] text-2xl leading-tight">
          {docs.sharingTitle}
        </h2>
        <p>{docs.sharingBody}</p>

        <h2 className="pt-4 font-heading text-white tracking-[-0.02em] text-2xl leading-tight">
          {docs.retentionTitle}
        </h2>
        <p>{docs.retentionBody}</p>

        <h2 className="pt-4 font-heading text-white tracking-[-0.02em] text-2xl leading-tight">
          {docs.choicesTitle}
        </h2>
        <p>
          {docs.choicesBefore}{" "}
          <a
            href={`mailto:${footer.contacts.privacy}`}
            className="text-white hover:text-white/70 transition-colors underline-offset-4 hover:underline"
          >
            {docs.writeToPrivacy}
          </a>
          {docs.choicesAfter}
        </p>

        <h2 className="pt-4 font-heading text-white tracking-[-0.02em] text-2xl leading-tight">
          {docs.securityTitle}
        </h2>
        <p>
          {docs.securityBefore}{" "}
          <a
            href={`mailto:${footer.contacts.security}`}
            className="text-white hover:text-white/70 transition-colors underline-offset-4 hover:underline"
          >
            {docs.reportSecurity}
          </a>
          {docs.securityAfter}
        </p>
      </div>
    </>
  );
}
