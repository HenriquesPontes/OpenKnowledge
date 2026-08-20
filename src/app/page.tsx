import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { AfricaMap } from "@/components/sections/AfricaMap";
import { Architecture } from "@/components/sections/Architecture";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = {
  title: {
    absolute:
      "Open Knowledge — Creole languages of São Tomé, Cabo Verde, Guiné-Bissau, and Angola",
  },
  description:
    "Open knowledge for the Creole languages of São Tomé and Príncipe, Cabo Verde, Guiné-Bissau, and Angola. Isolated lexicons, attested sources, and a public API. Home of Forro Vivo.",
  alternates: { canonical: "/" },
};

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
