import { cookies } from "next/headers";
import { Container } from "@/components/ui/Container";
import { LOCALE_COOKIE, localeFromCookie, getSiteCopy } from "@/lib/i18n";

export default async function LegalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = localeFromCookie((await cookies()).get(LOCALE_COOKIE)?.value);
  const copy = getSiteCopy(locale);

  return (
    <section className="flex-1 pt-24 pb-20 sm:pt-28 lg:pt-36">
      <Container className="grid grid-cols-1 gap-10 lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-16">
        <aside>
          <a
            href="/legal"
            className="mb-3 inline-block text-muted hover:text-white transition-colors text-sm tracking-[-0.01em] lg:mb-6"
          >
            {copy.legalLayout.title}
          </a>
          <p className="text-white text-sm tracking-[-0.01em] mb-3 lg:mb-6">
            {copy.legalLayout.policies}
          </p>
          <nav className="flex gap-x-5 gap-y-3 overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 lg:block lg:space-y-2 lg:overflow-visible lg:pb-0">
            {copy.legalNav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="block whitespace-nowrap text-muted hover:text-white transition-colors duration-150 text-sm tracking-[-0.01em] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/25 rounded-sm lg:py-1"
              >
                {item.label}
              </a>
            ))}
          </nav>
        </aside>
        <div className="min-w-0">{children}</div>
      </Container>
    </section>
  );
}
