"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  useTransition,
  type ReactNode,
} from "react";
import { useRouter } from "next/navigation";
import {
  LOCALE_COOKIE,
  defaultLocale,
  getDictionary,
  getSiteCopy,
  isLocale,
  type Dictionary,
  type Locale,
  type SiteCopy,
} from "@/lib/i18n";

type LocaleContextValue = {
  locale: Locale;
  dictionary: Dictionary;
  copy: SiteCopy;
  setLocale: (locale: Locale) => void;
};

const LocaleContext = createContext<LocaleContextValue | null>(null);

function writeLocaleCookie(locale: Locale) {
  const maxAge = 60 * 60 * 24 * 365;
  document.cookie = `${LOCALE_COOKIE}=${locale}; path=/; max-age=${maxAge}; samesite=lax`;
}

export function LocaleProvider({
  initialLocale = defaultLocale,
  children,
}: {
  initialLocale?: Locale;
  children: ReactNode;
}) {
  const router = useRouter();
  const [locale, setLocaleState] = useState<Locale>(
    isLocale(initialLocale) ? initialLocale : defaultLocale,
  );
  const [, startTransition] = useTransition();

  useEffect(() => {
    document.documentElement.lang = locale === "pt" ? "pt" : "en";
  }, [locale]);

  const value = useMemo<LocaleContextValue>(
    () => ({
      locale,
      dictionary: getDictionary(locale),
      copy: getSiteCopy(locale),
      setLocale: (next) => {
        if (!isLocale(next) || next === locale) return;
        writeLocaleCookie(next);
        startTransition(() => {
          setLocaleState(next);
          router.refresh();
        });
      },
    }),
    [locale, router],
  );

  return (
    <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
  );
}

export function useLocale() {
  const context = useContext(LocaleContext);
  if (context) return context;

  return {
    locale: defaultLocale,
    dictionary: getDictionary(defaultLocale),
    copy: getSiteCopy(defaultLocale),
    setLocale: () => undefined,
  };
}
