import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Architecture } from "@/components/sections/Architecture";
import { GlobeWireframe } from "@/components/sections/GlobeWireframe";
import { connectArchitecture } from "@/lib/constants";
import { APP_ORIGIN } from "@/lib/catalog";

export const metadata = {
  title: "Forro Connect — ForroVivo",
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
          <div className="mt-6 flex flex-col sm:flex-row gap-3 sm:gap-4 sm:items-center">
            <Button href="/#waitlist" className="w-full sm:w-auto">
              Join waitlist
            </Button>
            <Button href={APP_ORIGIN} variant="outline" className="w-full sm:w-auto">
              Try Forro Vivo
            </Button>
          </div>
        </Container>
      </section>

      <div className="mx-auto w-full max-w-[min(100%,40rem)] shrink-0 aspect-square">
        <GlobeWireframe />
      </div>

      <Architecture
        title={connectArchitecture.title}
        description={connectArchitecture.description}
        steps={connectArchitecture.steps}
      />
    </>
  );
}
