import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Architecture } from "@/components/sections/Architecture";
import { GlobeWireframe } from "@/components/sections/GlobeWireframe";
import { DictionaryAccountForm } from "@/components/sections/DictionaryAccountForm";
import { connectArchitecture, connectIncome } from "@/lib/constants";

export const metadata = {
  title: "Forro Connect — Live Forro lessons",
  description: connectArchitecture.description,
  alternates: { canonical: "/connect" },
};

export default function ForroConnectPage() {
  return (
    <>
      <section className="pt-24 pb-8 sm:pt-36 sm:pb-12 lg:pt-44 lg:pb-12">
        <Container>
          <h1
            className="font-heading text-white tracking-[-0.03em] leading-[1.05]"
            style={{ fontSize: "clamp(1.85rem, 8vw, 4.5rem)" }}
          >
            Forro Connect
          </h1>
          <p className="mt-2 max-w-[593px] text-muted text-base sm:text-lg lg:text-[21px] tracking-[-0.01em] leading-normal">
            While ForroVivo uses technology to help people discover and learn
            Forro, Forro Connect connects learners directly with real Forro
            speakers and cultural knowledge holders.
          </p>
          <div id="waitlist" className="mt-6 max-w-[593px]">
            <DictionaryAccountForm surface="connect" />
          </div>
          <div className="mt-4">
            <Button href="/app" variant="outline" className="w-full sm:w-auto">
              Forro Vivo App
            </Button>
          </div>
        </Container>
      </section>

      <div className="w-full shrink-0 aspect-square">
        <GlobeWireframe />
      </div>

      <Architecture
        title={connectArchitecture.title}
        description={connectArchitecture.description}
        steps={connectArchitecture.steps}
      />

      <section className="pt-10 pb-20 sm:pt-16 sm:pb-28">
        <Container>
          <h2
            className="font-heading text-white tracking-[-0.03em] leading-[1.05] text-center"
            style={{ fontSize: "clamp(2rem, 5vw, 3.75rem)" }}
          >
            {connectIncome.title}
          </h2>
          <p className="mt-4 mx-auto max-w-[720px] text-center text-muted text-lg sm:text-[21px] tracking-[-0.01em] leading-normal">
            {connectIncome.description}
          </p>
          <div className="mt-8 flex justify-center">
            <Button href={connectIncome.href}>
              Community income breakdown
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}
