"use client";

import { usePathname } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { useLocale } from "@/components/locale/LocaleProvider";
import { footer } from "@/lib/constants";
import { localeLabels, locales, type Locale } from "@/lib/i18n";

export function Footer() {
  const pathname = usePathname();
  const { locale, dictionary, setLocale } = useLocale();
  const authScreen =
    pathname === "/api/login" || pathname === "/api/register";
  const year = new Date().getFullYear();
  const t = dictionary.footer;

  const links = [
    { label: t.legal, href: "/legal" },
    { label: t.terms, href: "/legal/terms" },
    { label: t.privacy, href: "/legal/privacy" },
    { label: t.eula, href: "/legal/eula" },
  ] as const;

  if (authScreen) return null;

  return (
    <footer className="mt-auto">
      <Container>
        <div className="pt-8 pb-[max(2.5rem,env(safe-area-inset-bottom))] sm:pt-10 sm:pb-14">
          <p className="text-center text-foreground text-sm tracking-[-0.01em] break-words">
            {footer.companyName}
          </p>
          <p className="mt-2 text-center text-muted text-sm tracking-[-0.01em] px-2 leading-6">
            {t.registration}. {t.companyNumber} {footer.companyNumber}.
          </p>
          <nav className="mt-6 flex flex-wrap items-center justify-center gap-x-7 gap-y-2">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-muted hover:text-foreground transition-colors duration-150 text-sm tracking-[-0.01em] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/25 rounded-sm"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div
            role="group"
            aria-label={t.language}
            className="mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-2"
          >
            {locales.map((code: Locale) => {
              const active = code === locale;
              return (
                <button
                  key={code}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setLocale(code)}
                  className={`text-sm tracking-[-0.01em] transition-colors duration-150 rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/25 ${
                    active
                      ? "text-foreground"
                      : "text-muted hover:text-foreground"
                  }`}
                >
                  {localeLabels[code]}
                </button>
              );
            })}
          </div>

          <p
            className="mt-6 text-center text-muted/80 text-sm tracking-[-0.01em]"
            suppressHydrationWarning
          >
            © {year} {footer.companyName}
          </p>
        </div>
      </Container>
    </footer>
  );
}
