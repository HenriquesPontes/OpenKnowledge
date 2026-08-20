import { Container } from "@/components/ui/Container";
import { DictionaryAccountForm } from "@/components/sections/DictionaryAccountForm";
import { nav } from "@/lib/constants";

export const metadata = {
  title: "Log in",
  robots: { index: false, follow: true },
};

export default function DictionaryLoginPage() {
  return (
    <section className="pt-24 pb-20 sm:pt-36 lg:pt-44">
      <Container>
        <p className="text-muted text-sm sm:text-base tracking-[-0.01em]">
          Dictionaries
        </p>
        <h1
          className="mt-4 font-heading text-white tracking-[-0.03em] leading-[1.05]"
          style={{ fontSize: "clamp(1.85rem, 8vw, 4.5rem)" }}
        >
          Log in to the dictionary
        </h1>
        <p className="mt-2 max-w-[593px] text-muted text-base sm:text-lg lg:text-[21px] tracking-[-0.01em] leading-normal">
          Access the online dictionaries with your email.
        </p>
        <DictionaryAccountForm mode="login" redirectTo="/dictionaries" />
        <p className="mt-6 text-muted text-sm tracking-[-0.01em]">
          New here?{" "}
          <a
            href={nav.dictionaryAuth.ctaHref}
            className="text-white hover:text-white/70 transition-colors"
          >
            {nav.dictionaryAuth.cta}
          </a>
        </p>
      </Container>
    </section>
  );
}
