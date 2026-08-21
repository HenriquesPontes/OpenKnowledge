import { cookies } from "next/headers";
import { Button } from "@/components/ui/Button";
import { APP_STORE_URL } from "@/lib/catalog";
import { LOCALE_COOKIE, localeFromCookie, getSiteCopy } from "@/lib/i18n";

export const metadata = {
  title: "Forro Vivo App",
  description:
    "Documentation for the Forro Vivo App: download, features, roadmap, and how it relates to Open Knowledge.",
  alternates: { canonical: "/docs/app" },
};

export default async function AppDocsPage() {
  const locale = localeFromCookie((await cookies()).get(LOCALE_COOKIE)?.value);
  const copy = getSiteCopy(locale);
  const docs = copy.docsApp;

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
        <h2 className="font-heading text-white text-2xl sm:text-3xl tracking-[-0.02em]">
          {docs.getAppTitle}
        </h2>
        <p className="mt-3 max-w-[40rem] text-muted text-base leading-7 tracking-[-0.01em]">
          {docs.getAppBody}
        </p>
        <div className="mt-6 flex flex-col sm:flex-row gap-3">
          <Button href={APP_STORE_URL}>{docs.downloadCta}</Button>
          <Button href="/app" variant="outline">
            {docs.productPage}
          </Button>
        </div>
      </div>

      <h2 className="mt-12 text-white text-lg sm:text-[21px] tracking-[-0.01em]">
        {copy.appVision.title}
      </h2>
      <p className="mt-4 text-muted text-base leading-7 tracking-[-0.01em]">
        {copy.appVision.about}
      </p>
      <p className="mt-3 text-muted text-base leading-7 tracking-[-0.01em]">
        {copy.appVision.body}
      </p>

      <h2 className="mt-12 text-white text-lg sm:text-[21px] tracking-[-0.01em]">
        {docs.explore}
      </h2>
      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
        <a
          href="/app#roadmap"
          className="rounded-2xl border border-border bg-surface px-6 py-6 transition-colors hover:border-white/25"
        >
          <h3 className="text-white font-heading text-xl tracking-[-0.02em]">
            {docs.roadmapTitle}
          </h3>
          <p className="mt-2 text-muted text-base leading-7 tracking-[-0.01em]">
            {docs.roadmapBody}
          </p>
          <span className="mt-5 inline-block text-sm text-white/70">
            {docs.openRoadmap}
          </span>
        </a>
        <a
          href="/app/credits"
          className="rounded-2xl border border-border bg-surface px-6 py-6 transition-colors hover:border-white/25"
        >
          <h3 className="text-white font-heading text-xl tracking-[-0.02em]">
            {docs.creditsTitle}
          </h3>
          <p className="mt-2 text-muted text-base leading-7 tracking-[-0.01em]">
            {docs.creditsBody}
          </p>
          <span className="mt-5 inline-block text-sm text-white/70">
            {docs.openCredits}
          </span>
        </a>
      </div>

      <h2 className="mt-12 text-white text-lg sm:text-[21px] tracking-[-0.01em]">
        {copy.appFaq.title}
      </h2>
      <ul className="mt-4 divide-y divide-border border-t border-b border-border">
        {copy.appFaq.items.map((item) => (
          <li key={item.question} className="py-4">
            <p className="text-white text-base tracking-[-0.01em]">
              {item.question}
            </p>
            <p className="mt-1 text-muted text-base leading-7 tracking-[-0.01em]">
              {item.answer}
            </p>
          </li>
        ))}
      </ul>
    </>
  );
}
