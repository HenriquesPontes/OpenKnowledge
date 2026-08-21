import { cookies } from "next/headers";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { appCredits as appCreditsEn, footer } from "@/lib/constants";
import { LOCALE_COOKIE, localeFromCookie, getSiteCopy } from "@/lib/i18n";

export const metadata = {
  title: "Credits",
  description: appCreditsEn.description,
};

export default async function ForroVivoCreditsPage() {
  const locale = localeFromCookie((await cookies()).get(LOCALE_COOKIE)?.value);
  const copy = getSiteCopy(locale);
  const { appCredits, appCreditsPage } = copy;

  return (
    <div className="forro-app flex flex-1 flex-col bg-background">
      <section className="pt-24 pb-20 sm:pt-36 lg:pt-44 sm:pb-28">
        <Container>
          <a
            href="/app"
            className="text-muted hover:text-white transition-colors text-sm sm:text-base tracking-[-0.01em]"
          >
            {appCreditsPage.breadcrumb}
          </a>
          <h1
            className="mt-4 font-heading text-white tracking-[-0.03em] leading-[1.05]"
            style={{ fontSize: "clamp(1.85rem, 8vw, 4.5rem)" }}
          >
            {appCredits.title}
          </h1>
          <p className="mt-4 max-w-[640px] text-muted text-lg sm:text-[21px] tracking-[-0.01em] leading-normal">
            {appCredits.description}
          </p>

          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
            {appCredits.people.map((person) => (
              <div
                key={person.name}
                className="rounded-2xl border border-border bg-surface px-6 py-7"
              >
                <h2 className="font-heading text-white tracking-[-0.02em] text-[28px] leading-tight">
                  {person.name}
                </h2>
                <p className="mt-2 text-muted text-sm sm:text-base tracking-[-0.01em]">
                  {person.role}
                </p>
                <p className="mt-4 text-muted text-base leading-7 tracking-[-0.01em]">
                  {person.body}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-10 max-w-[720px] space-y-10">
            {appCredits.groups.map((group) => (
              <section key={group.title}>
                <h2 className="font-heading text-white tracking-[-0.02em] text-[28px] leading-tight">
                  {group.title}
                </h2>
                {group.people.length > 0 ? (
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {group.people.map((person) => (
                      <li
                        key={person.name}
                        className="rounded-full border border-border bg-surface px-4 py-2 text-white text-sm sm:text-base tracking-[-0.01em]"
                      >
                        {person.name}
                        <span className="text-muted"> · {person.role}</span>
                      </li>
                    ))}
                  </ul>
                ) : null}
                <p className="mt-4 text-muted text-base leading-7 tracking-[-0.01em]">
                  {group.body}
                </p>
                {group.href ? (
                  <div className="mt-6">
                    <Button href={group.href} variant="outline">
                      {group.linkLabel}
                    </Button>
                  </div>
                ) : null}
              </section>
            ))}

            <section>
              <h2 className="font-heading text-white tracking-[-0.02em] text-[28px] leading-tight">
                {appCreditsPage.companyTitle}
              </h2>
              <p className="mt-4 text-muted text-base leading-7 tracking-[-0.01em]">
                {appCreditsPage.companyBody}
              </p>
              <div className="mt-6">
                <Button href={footer.companiesHouseHref} variant="outline">
                  {appCreditsPage.companiesHouse}
                </Button>
              </div>
            </section>

            {appCredits.sections.map((section) => (
              <section key={section.title}>
                <h2 className="font-heading text-white tracking-[-0.02em] text-[28px] leading-tight">
                  {section.title}
                </h2>
                <p className="mt-4 text-muted text-base leading-7 tracking-[-0.01em]">
                  {section.body}
                </p>
                <div className="mt-6">
                  <Button href={section.href} variant="outline">
                    {section.linkLabel}
                  </Button>
                </div>
              </section>
            ))}
          </div>
        </Container>
      </section>
    </div>
  );
}
