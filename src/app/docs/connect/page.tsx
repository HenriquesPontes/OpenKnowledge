import { cookies } from "next/headers";
import { Button } from "@/components/ui/Button";
import { LOCALE_COOKIE, localeFromCookie, getSiteCopy } from "@/lib/i18n";

export const metadata = {
  title: "Forro Connect",
  description:
    "Documentation for Forro Connect: live lessons with Forro speakers, waitlist, and community income.",
  alternates: { canonical: "/docs/connect" },
};

export default async function ConnectDocsPage() {
  const locale = localeFromCookie((await cookies()).get(LOCALE_COOKIE)?.value);
  const copy = getSiteCopy(locale);
  const docs = copy.docsConnect;

  return (
    <>
      <h1
        className="font-heading text-white tracking-[-0.03em] leading-[1.05]"
        style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
      >
        {docs.title}
      </h1>
      <p className="mt-4 text-muted text-lg sm:text-[21px] tracking-[-0.01em] leading-normal">
        {copy.connectArchitecture.description}
      </p>

      <div className="mt-10 rounded-2xl border border-border bg-surface px-6 py-7 sm:px-8 sm:py-8">
        <h2 className="font-heading text-white text-2xl sm:text-3xl tracking-[-0.02em]">
          {docs.waitlistTitle}
        </h2>
        <p className="mt-3 max-w-[40rem] text-muted text-base leading-7 tracking-[-0.01em]">
          {docs.waitlistBody}
        </p>
        <div className="mt-6 flex flex-col sm:flex-row gap-3">
          <Button href="/connect#waitlist">{docs.joinWaitlist}</Button>
          <Button href="/connect" variant="outline">
            {docs.productPage}
          </Button>
        </div>
      </div>

      <h2 className="mt-12 text-white text-lg sm:text-[21px] tracking-[-0.01em]">
        {copy.connectArchitecture.title}
      </h2>
      <ul className="mt-4 divide-y divide-border border-t border-b border-border max-w-[40rem]">
        {copy.connectArchitecture.steps.map((step) => (
          <li key={step.label} className="py-3 text-muted text-base tracking-[-0.01em]">
            {step.label}
          </li>
        ))}
      </ul>

      <h2 className="mt-12 text-white text-lg sm:text-[21px] tracking-[-0.01em]">
        {docs.explore}
      </h2>
      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
        <a
          href="/connect#how-it-works"
          className="rounded-2xl border border-border bg-surface px-6 py-6 transition-colors hover:border-white/25"
        >
          <h3 className="text-white font-heading text-xl tracking-[-0.02em]">
            {docs.howItWorksTitle}
          </h3>
          <p className="mt-2 text-muted text-base leading-7 tracking-[-0.01em]">
            {docs.howItWorksBody}
          </p>
          <span className="mt-5 inline-block text-sm text-white/70">
            {docs.openHowItWorks}
          </span>
        </a>
        <a
          href={copy.connectIncome.href}
          className="rounded-2xl border border-border bg-surface px-6 py-6 transition-colors hover:border-white/25"
        >
          <h3 className="text-white font-heading text-xl tracking-[-0.02em]">
            {copy.connectIncome.title}
          </h3>
          <p className="mt-2 text-muted text-base leading-7 tracking-[-0.01em]">
            {docs.incomeBody}
          </p>
          <span className="mt-5 inline-block text-sm text-white/70">
            {docs.openBreakdown}
          </span>
        </a>
      </div>
    </>
  );
}
