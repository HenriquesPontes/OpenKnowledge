import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Architecture } from "@/components/sections/Architecture";
import { GlobeWireframe } from "@/components/sections/GlobeWireframe";
import { translationArchitecture } from "@/lib/constants";

export const metadata = {
  title: "Machine translation",
};

export default function MachineTranslationPage() {
  return (
    <>
      <section className="pt-24 pb-8 sm:pt-36 sm:pb-12 lg:pt-44 lg:pb-12">
        <Container>
          <h1
            className="font-heading text-white tracking-[-0.03em] leading-[1.05]"
            style={{ fontSize: "clamp(1.85rem, 8vw, 4.5rem)" }}
          >
            Machine translation
          </h1>
          <p className="mt-2 max-w-[593px] text-muted text-base sm:text-lg lg:text-[21px] tracking-[-0.01em] leading-normal">
            Machine translation for African Creole languages, grounded in
            isolated lexicons and attested sources. Low-resource languages are
            especially vulnerable to fabricated vocabulary. This Open Knowledge
            site does not implement translation. Translation is a ForroVivo
            capability, not a product, and not a feature of this website.
          </p>
          <div className="mt-6 flex flex-col sm:flex-row gap-3 sm:gap-4 sm:items-center">
            <Button href="/#waitlist" className="w-full sm:w-auto">
              Join waitlist
            </Button>
            <Button href="/languages" variant="outline" className="w-full sm:w-auto">
              Isolated lexicons
            </Button>
          </div>
        </Container>
      </section>

      <div className="w-full shrink-0 aspect-square">
        <GlobeWireframe />
      </div>

      <Architecture
        title={translationArchitecture.title}
        description={translationArchitecture.description}
        steps={translationArchitecture.steps}
      />
    </>
  );
}
