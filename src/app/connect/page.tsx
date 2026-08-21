import { cookies } from "next/headers";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Architecture } from "@/components/sections/Architecture";
import { GlobeWireframe } from "@/components/sections/GlobeWireframe";
import { DictionaryAccountForm } from "@/components/sections/DictionaryAccountForm";
import { connectArchitecture as connectArchitectureEn } from "@/lib/constants";
import { LOCALE_COOKIE, localeFromCookie, getSiteCopy } from "@/lib/i18n";

export const metadata = {
  title: "Forro Connect — Live Forro lessons",
  description: connectArchitectureEn.description,
  alternates: { canonical: "/connect" },
};

export default async function ForroConnectPage() {
  const locale = localeFromCookie((await cookies()).get(LOCALE_COOKIE)?.value);
  const copy = getSiteCopy(locale);

  return (
    <>
      <section className="pt-24 pb-8 sm:pt-36 sm:pb-12 lg:pt-44 lg:pb-12">
        <Container>
          <h1
            className="font-heading text-white tracking-[-0.03em] leading-[1.05]"
            style={{ fontSize: "clamp(1.85rem, 8vw, 4.5rem)" }}
          >
            {copy.connectPage.title}
          </h1>
          <p className="mt-2 max-w-[593px] text-muted text-base sm:text-lg lg:text-[21px] tracking-[-0.01em] leading-normal">
            {copy.connectPage.description}
          </p>
          <div id="waitlist" className="mt-6 max-w-[593px]">
            <DictionaryAccountForm surface="connect" />
          </div>
        </Container>
      </section>

      <div className="w-full shrink-0 aspect-square">
        <GlobeWireframe />
      </div>

      <Architecture
        title={copy.connectArchitecture.title}
        description={copy.connectArchitecture.description}
        steps={copy.connectArchitecture.steps}
      />

      <section className="pt-10 pb-20 sm:pt-16 sm:pb-28">
        <Container>
          <h2
            className="font-heading text-white tracking-[-0.03em] leading-[1.05] text-center"
            style={{ fontSize: "clamp(2rem, 5vw, 3.75rem)" }}
          >
            {copy.connectIncome.title}
          </h2>
          <p className="mt-4 mx-auto max-w-[720px] text-center text-muted text-lg sm:text-[21px] tracking-[-0.01em] leading-normal">
            {copy.connectIncome.description}
          </p>
          <div className="mt-8 flex justify-center">
            <Button href={copy.connectIncome.href}>
              {copy.connectPage.incomeCta}
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}
