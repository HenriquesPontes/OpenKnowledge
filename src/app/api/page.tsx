import { cookies } from "next/headers";
import { ApiPlatformShell } from "@/components/sections/ApiPlatformShell";
import { languages } from "@/lib/constants";
import { fetchLanguagesCatalog } from "@/lib/catalog";
import { findAccount } from "@/lib/api-accounts";
import { readApiSession } from "@/lib/api-session";
import { LOCALE_COOKIE, localeFromCookie, getSiteCopy } from "@/lib/i18n";

export const metadata = {
  title: "API Platform",
  description:
    "Build with attested linguistic data. Manage your API keys and try live requests. The full reference is in Documentation.",
  alternates: { canonical: "/api" },
};

export default async function ApiPage() {
  const locale = localeFromCookie((await cookies()).get(LOCALE_COOKIE)?.value);
  const copy = getSiteCopy(locale);
  const session = await readApiSession();
  const account = session ? await findAccount(session.email) : null;
  const catalog = await fetchLanguagesCatalog();
  const catalogOptions =
    catalog?.languages
      ?.filter((item) => item.dataset)
      .map((item) => ({
        dataset: item.dataset,
        label: item.language_name
          ? `${item.language_name} (${item.dataset})`
          : item.dataset,
      })) ?? [];

  const datasets =
    catalogOptions.length > 0
      ? catalogOptions
      : languages.map((language) => ({
          dataset: language.dataset,
          label: `${language.title} (${language.dataset})`,
        }));

  const initialSession = session
    ? {
        authenticated: true,
        email: session.email,
        key_prefix: session.key_prefix ?? account?.key_prefix ?? null,
        created_at: account?.created_at ?? null,
        signed_in_at: session.created_at,
      }
    : null;

  return (
    <ApiPlatformShell
      datasets={datasets}
      initialSession={initialSession}
      marketing={
        <>
          <p className="text-muted text-sm sm:text-base tracking-[-0.01em]">
            {copy.apiPage.productEyebrow}
          </p>
          <h1
            className="mt-4 font-heading text-white tracking-[-0.03em] leading-[1.05]"
            style={{ fontSize: "clamp(2rem, 5vw, 3.75rem)" }}
          >
            {copy.apiPage.title}
          </h1>
          <p className="mt-4 max-w-[480px] text-muted text-lg sm:text-[21px] tracking-[-0.01em] leading-normal">
            {copy.apiPage.body}
          </p>
        </>
      }
    />
  );
}
