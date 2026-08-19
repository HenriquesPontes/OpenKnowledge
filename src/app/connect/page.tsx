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
            style={{ fontSize: "clamp(2.25rem, 6vw, 4.5rem)" }}
          >
            Forro Connect
          </h1>
          <p className="mt-2 max-w-[593px] text-muted text-lg sm:text-[21px] tracking-[-0.01em] leading-normal">
            While ForroVivo uses technology to help people discover and learn
            Forro, Forro Connect connects learners directly with real Forro
            speakers and cultural knowledge holders.
          </p>
          <div className="mt-6 flex flex-col sm:flex-row gap-4 sm:items-center">
            <Button href="/#waitlist">Join waitlist</Button>
            <Button href={APP_ORIGIN} variant="outline">
              Try Forro Vivo
            </Button>
          </div>
        </Container>
      </section>

      <div className="w-full shrink-0" style={{ aspectRatio: "1 / 1" }}>
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
