import { cookies } from "next/headers";
import { LOCALE_COOKIE, localeFromCookie, getSiteCopy } from "@/lib/i18n";

export const metadata = {
  title: "Legal",
  description:
    "Legal policies for ForroVivo: company information, terms of service, privacy, and EULA for Open Knowledge, the Forro Vivo App, Forro Connect, and Linguistic Research.",
  alternates: { canonical: "/legal" },
};

export default async function LegalPage() {
  const locale = localeFromCookie((await cookies()).get(LOCALE_COOKIE)?.value);
  const copy = getSiteCopy(locale);
  const policies = copy.legalNav.filter((item) => item.href !== "/legal");

  return (
    <>
      <h1
        className="font-heading text-white tracking-[-0.03em] leading-[1.05]"
        style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
      >
        {copy.legalOverview.title}
      </h1>
      <p className="mt-4 max-w-[40rem] text-muted text-lg sm:text-[21px] tracking-[-0.01em] leading-normal">
        {copy.legalOverview.intro}
      </p>

      <div className="mt-10 divide-y divide-border border-t border-b border-border">
        {policies.map((item) => (
          <a
            key={item.href}
            href={item.href}
            className="group flex flex-col gap-2 py-6 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/25 rounded-sm"
          >
            <span className="font-heading text-white text-xl sm:text-2xl tracking-[-0.02em] group-hover:underline underline-offset-4">
              {item.label}
            </span>
            <span className="text-muted text-base leading-7 tracking-[-0.01em]">
              {item.description}
            </span>
          </a>
        ))}
      </div>
    </>
  );
}
