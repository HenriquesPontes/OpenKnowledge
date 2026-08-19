import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Architecture } from "@/components/sections/Architecture";
import { GlobeWireframe } from "@/components/sections/GlobeWireframe";
import { appArchitecture } from "@/lib/constants";
import { APP_STORE_URL } from "@/lib/catalog";

export const metadata = {
  title: "Forro Vivo App",
};

export default function ForroVivoAppPage() {
  return (
    <>
      <section className="pt-24 pb-8 sm:pt-36 sm:pb-12 lg:pt-44 lg:pb-12">
        <Container>
          <p className="text-muted text-sm sm:text-base tracking-[-0.01em]">
            Product
          </p>
          <h1
            className="mt-2 font-heading text-white tracking-[-0.03em] leading-[1.05]"
            style={{ fontSize: "clamp(1.85rem, 8vw, 4.5rem)" }}
          >
            Forro Vivo App
          </h1>
          <p className="mt-2 max-w-[593px] text-muted text-base sm:text-lg lg:text-[21px] tracking-[-0.01em] leading-normal">
            The learning product for Forro and related Creole languages:
            dictionary, lessons, exercises and language practice. It is on the
            App Store. This Open Knowledge site is the public knowledge front
            door, not the app.
          </p>
          <div className="mt-6 flex flex-col sm:flex-row gap-3 sm:gap-4 sm:items-center">
            <Button href={APP_STORE_URL} className="w-full sm:w-auto">
              Download on the App Store
            </Button>
            <Button href="/connect" variant="outline" className="w-full sm:w-auto">
              Forro Connect
            </Button>
          </div>
        </Container>
      </section>

      <div className="w-full shrink-0 aspect-square">
        <GlobeWireframe />
      </div>

      <Architecture
        title={appArchitecture.title}
        description={appArchitecture.description}
        steps={appArchitecture.steps}
      />
    </>
  );
}
