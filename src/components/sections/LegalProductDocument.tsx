import { cookies } from "next/headers";
import { LOCALE_COOKIE, localeFromCookie, getSiteCopy } from "@/lib/i18n";
import type { SiteCopy } from "@/lib/i18n-copy";

type ProductLegalCopy =
  | SiteCopy["legalProductOpenKnowledge"]
  | SiteCopy["legalProductApp"]
  | SiteCopy["legalProductResearch"];

export function LegalProductDocument({ docs }: { docs: ProductLegalCopy }) {
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

      <p className="mt-6 max-w-[42rem] text-muted text-base leading-7 tracking-[-0.01em]">
        {docs.umbrellaBefore}{" "}
        <a href="/legal/terms" className="text-white hover:text-white/70 transition-colors">
          {docs.umbrellaTerms}
        </a>
        {" · "}
        <a href="/legal/privacy" className="text-white hover:text-white/70 transition-colors">
          {docs.umbrellaPrivacy}
        </a>
        {" · "}
        <a href="/legal/eula" className="text-white hover:text-white/70 transition-colors">
          {docs.umbrellaEula}
        </a>
        {docs.umbrellaAfter}
      </p>

      <div className="mt-10 max-w-[42rem] space-y-6 text-muted text-base leading-7 tracking-[-0.01em]">
        <h2 className="pt-2 font-heading text-white tracking-[-0.02em] text-2xl leading-tight">
          {docs.termsTitle}
        </h2>
        {docs.termsBody.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}

        <h2
          id="privacy"
          className="pt-4 font-heading text-white tracking-[-0.02em] text-2xl leading-tight scroll-mt-28"
        >
          {docs.privacyTitle}
        </h2>
        {docs.privacyBody.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}

        <p>
          {docs.rightsBefore}{" "}
          <a
            href="/legal/privacy"
            className="text-white hover:text-white/70 transition-colors"
          >
            {docs.rightsPrivacy}
          </a>{" "}
          {docs.rightsAfter}
        </p>
      </div>
    </>
  );
}

export async function readLocale() {
  return localeFromCookie((await cookies()).get(LOCALE_COOKIE)?.value);
}

export async function readSiteCopy() {
  return getSiteCopy(await readLocale());
}
