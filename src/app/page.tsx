import { Hero } from "@/components/sections/Hero";
import { AfricaMap } from "@/components/sections/AfricaMap";
import { Architecture } from "@/components/sections/Architecture";
import { Container } from "@/components/ui/Container";

export default function Home() {
  return (
    <>
      <Hero />
      <section className="pb-10 sm:pb-20">
        <Container>
          <AfricaMap />
        </Container>
      </section>
      <Architecture />
    </>
  );
}
