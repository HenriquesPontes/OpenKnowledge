import { cookies } from "next/headers";
import { Button } from "@/components/ui/Button";
import { MethodologyPipeline } from "@/components/sections/Architecture";
import { GITHUB_URL } from "@/lib/catalog";
import { LOCALE_COOKIE, localeFromCookie, getSiteCopy } from "@/lib/i18n";

export const metadata = {
  title: "Methodology",
};

export default async function MethodologyPage() {
  const locale = localeFromCookie((await cookies()).get(LOCALE_COOKIE)?.value);
  const copy = getSiteCopy(locale);
  const docs = copy.docsMethodology;

  return (
    <>
      <h1
        className="font-heading text-white tracking-[-0.03em] leading-[1.05]"
        style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
      >
        {docs.title}
      </h1>
      <p className="mt-4 text-muted text-lg sm:text-[21px] tracking-[-0.01em] leading-normal">
        {docs.subtitle}
      </p>
      <p className="mt-6 text-muted text-base leading-7 tracking-[-0.01em]">
        {copy.principle}
      </p>
      <p className="mt-4 text-muted text-base leading-7 tracking-[-0.01em]">
        {docs.p1}
      </p>
      <p className="mt-4 text-muted text-base leading-7 tracking-[-0.01em]">
        {docs.p2}
      </p>
      <p className="mt-4 text-muted text-base leading-7 tracking-[-0.01em]">
        {docs.p3}
      </p>

      <div id="how-it-works" className="-mx-6 sm:mx-0 mt-4">
        <MethodologyPipeline />
      </div>

      <div className="mt-4 flex justify-center">
        <Button href={`${GITHUB_URL}/blob/main/docs/methodology.md`}>
          {docs.githubCta}
        </Button>
      </div>
    </>
  );
}
