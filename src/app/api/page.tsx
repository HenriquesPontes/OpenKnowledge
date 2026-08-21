import { cookies } from "next/headers";
import { ApiPlatformShell } from "@/components/sections/ApiPlatformShell";
import {
  countries,
  languageForDataset,
  languages,
} from "@/lib/constants";
import {
  fetchLanguagesCatalog,
  isCountryDataset,
} from "@/lib/catalog";
import { findAccount } from "@/lib/api-accounts";
import { readApiSession } from "@/lib/api-session";
import { LOCALE_COOKIE, localeFromCookie, getSiteCopy } from "@/lib/i18n";
import type { DashboardDataset } from "@/components/sections/ApiDashboard";

export const metadata = {
  title: "API Platform",
  description:
    "Build with attested linguistic data. Manage your API keys and try live requests. The full reference is in Documentation.",
  alternates: { canonical: "/api" },
};

function familyId(dataset: string) {
  return dataset.includes("/") ? dataset.split("/")[0] : dataset;
}

function familyTitle(family: string) {
  return (
    countries.find((country) => country.id === family)?.title ?? family
  );
}

export default async function ApiPage() {
  const locale = localeFromCookie((await cookies()).get(LOCALE_COOKIE)?.value);
  const copy = getSiteCopy(locale);
  const session = await readApiSession();
  const account = session ? await findAccount(session.email) : null;
  const catalog = await fetchLanguagesCatalog();
  const catalogRows =
    catalog?.languages
      ?.filter((item) => item.dataset)
      .map((item): DashboardDataset => {
        const language = languageForDataset(item.dataset);
        const family = familyId(item.dataset);
        const name =
          item.language_name || language?.title || item.dataset;
        return {
          dataset: item.dataset,
          label: `${name} (${item.dataset})`,
          name,
          family,
          familyLabel: familyTitle(family),
          entries: item.entry_count ?? 0,
          iso: item.iso_639_3 || language?.iso,
          index: isCountryDataset(item.dataset, item),
        };
      }) ?? [];

  const datasets: DashboardDataset[] =
    catalogRows.length > 0
      ? catalogRows
      : languages.map((language) => ({
          dataset: language.dataset,
          label: `${language.title} (${language.dataset})`,
          name: language.title,
          family: language.country,
          familyLabel: familyTitle(language.country),
          entries: 0,
          iso: language.iso,
          index: false,
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
