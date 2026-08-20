import { Container } from "@/components/ui/Container";
import { DictionaryAccountForm } from "@/components/sections/DictionaryAccountForm";
import { nav } from "@/lib/constants";

export const metadata = {
  title: "Create an account",
};

export default function ApiRegisterPage() {
  return (
    <section className="pt-24 pb-20 sm:pt-36 lg:pt-44">
      <Container>
        <p className="text-muted text-sm sm:text-base tracking-[-0.01em]">
          API Platform
        </p>
        <h1
          className="mt-4 font-heading text-white tracking-[-0.03em] leading-[1.05]"
          style={{ fontSize: "clamp(1.85rem, 8vw, 4.5rem)" }}
        >
          Create an account
        </h1>
        <p className="mt-2 max-w-[593px] text-muted text-base sm:text-lg lg:text-[21px] tracking-[-0.01em] leading-normal">
          It&apos;s free. Use your email to request access to the API Platform.
        </p>
        <DictionaryAccountForm mode="register" surface="api" />
        <p className="mt-6 text-muted text-sm tracking-[-0.01em]">
          Already have access?{" "}
          <a
            href={nav.apiAuth.loginHref}
            className="text-white hover:text-white/70 transition-colors"
          >
            Log in
          </a>
        </p>
      </Container>
    </section>
  );
}
