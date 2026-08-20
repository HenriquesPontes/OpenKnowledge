import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Architecture } from "@/components/sections/Architecture";
import { connectIncome, productOverview } from "@/lib/constants";

export const metadata = {
  title: "Community income",
  description: connectIncome.description,
};

export default function CommunityIncomePage() {
  return (
    <div className="flex flex-1 flex-col bg-background">
      <section className="pt-24 pb-10 sm:pt-36 lg:pt-44 sm:pb-16">
        <Container>
          <a
            href="/connect"
            className="text-muted hover:text-white transition-colors text-sm sm:text-base tracking-[-0.01em]"
          >
            {connectIncome.eyebrow}
          </a>
          <h1
            className="mt-4 font-heading text-white tracking-[-0.03em] leading-[1.05]"
            style={{ fontSize: "clamp(1.85rem, 8vw, 4.5rem)" }}
          >
            {connectIncome.title}
          </h1>
          <p className="mt-4 max-w-[720px] text-muted text-lg sm:text-[21px] tracking-[-0.01em] leading-normal">
            {connectIncome.description}
          </p>
          <p className="mt-6 max-w-[720px] text-muted text-base leading-7 tracking-[-0.01em]">
            {connectIncome.body}
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4 sm:items-center">
            <Button href="/#waitlist">Join waitlist</Button>
            <Button href="/connect" variant="outline">
              Forro Connect
            </Button>
          </div>
        </Container>
      </section>

      <section className="pb-10 sm:pb-16">
        <Container className="max-w-[90rem]">
          <div className="relative aspect-[16/9] overflow-hidden rounded-[1.25rem] sm:rounded-[2rem] sm:aspect-[2.2/1]">
            <Image
              src={connectIncome.image.src}
              alt={connectIncome.image.alt}
              fill
              priority
              className="object-cover"
              sizes="100vw"
            />
          </div>
          <p className="mt-4 text-muted text-sm tracking-[-0.01em]">
            {productOverview.photoCredit.label}:{" "}
            <a
              href={productOverview.photoCredit.href}
              className="text-white hover:text-white/70 transition-colors"
            >
              {productOverview.photoCredit.name}
            </a>
          </p>
        </Container>
      </section>

      <Architecture
        id="breakdown"
        title={connectIncome.flowTitle}
        description={connectIncome.flowDescription}
        steps={connectIncome.flow}
      />

      <section className="pt-10 pb-14 sm:pt-16 sm:pb-20">
        <Container>
          <h2
            className="font-heading text-white tracking-[-0.03em] leading-[1.05]"
            style={{ fontSize: "clamp(2rem, 5vw, 3.75rem)" }}
          >
            {connectIncome.partiesTitle}
          </h2>
          <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-3">
            {connectIncome.parties.map((party) => (
              <div
                key={party.title}
                className="rounded-2xl border border-border bg-surface px-6 py-7"
              >
                <h3 className="font-heading text-white tracking-[-0.02em] text-[28px] leading-tight">
                  {party.title}
                </h3>
                <p className="mt-2 text-muted text-sm sm:text-base tracking-[-0.01em]">
                  {party.role}
                </p>
                <p className="mt-4 text-muted text-base leading-7 tracking-[-0.01em]">
                  {party.body}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="pt-10 pb-14 sm:pt-16 sm:pb-20">
        <Container>
          <h2
            className="font-heading text-white tracking-[-0.03em] leading-[1.05]"
            style={{ fontSize: "clamp(2rem, 5vw, 3.75rem)" }}
          >
            {connectIncome.breakdownTitle}
          </h2>
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-3">
            {connectIncome.breakdown.map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-border bg-surface px-6 py-7"
              >
                <h3 className="font-heading text-white tracking-[-0.02em] text-[28px] leading-tight">
                  {item.title}
                </h3>
                <p className="mt-4 text-muted text-base leading-7 tracking-[-0.01em]">
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="pt-10 pb-14 sm:pt-16 sm:pb-20">
        <Container>
          <h2
            className="font-heading text-white tracking-[-0.03em] leading-[1.05]"
            style={{ fontSize: "clamp(2rem, 5vw, 3.75rem)" }}
          >
            {connectIncome.howTitle}
          </h2>
          <ol className="mt-10 max-w-[720px] space-y-8">
            {connectIncome.how.map((step, index) => (
              <li key={step.title}>
                <p className="text-muted text-sm tracking-[0.04em] uppercase">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-2 font-heading text-white tracking-[-0.02em] text-[28px] leading-tight">
                  {step.title}
                </h3>
                <p className="mt-3 text-muted text-base leading-7 tracking-[-0.01em]">
                  {step.body}
                </p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section className="pt-10 pb-14 sm:pt-16 sm:pb-20">
        <Container>
          <h2
            className="font-heading text-white tracking-[-0.03em] leading-[1.05]"
            style={{ fontSize: "clamp(2rem, 5vw, 3.75rem)" }}
          >
            {connectIncome.notTitle}
          </h2>
          <div className="mt-10 max-w-[720px] space-y-10">
            {connectIncome.not.map((item) => (
              <section key={item.title}>
                <h3 className="font-heading text-white tracking-[-0.02em] text-[28px] leading-tight">
                  {item.title}
                </h3>
                <p className="mt-4 text-muted text-base leading-7 tracking-[-0.01em]">
                  {item.body}
                </p>
              </section>
            ))}
          </div>
        </Container>
      </section>

      <section className="pt-10 pb-14 sm:pt-16 sm:pb-20">
        <Container>
          <h2
            className="font-heading text-white tracking-[-0.03em] leading-[1.05]"
            style={{ fontSize: "clamp(2rem, 5vw, 3.75rem)" }}
          >
            {connectIncome.outcomesTitle}
          </h2>
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2">
            {connectIncome.outcomes.map((outcome) => (
              <div
                key={outcome.title}
                className="rounded-2xl border border-border bg-surface px-6 py-7"
              >
                <h3 className="font-heading text-white tracking-[-0.02em] text-[28px] leading-tight">
                  {outcome.title}
                </h3>
                <p className="mt-4 text-muted text-base leading-7 tracking-[-0.01em]">
                  {outcome.body}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="pt-10 pb-20 sm:pt-16 sm:pb-28">
        <Container>
          <h2
            className="font-heading text-white tracking-[-0.03em] leading-[1.05]"
            style={{ fontSize: "clamp(2rem, 5vw, 3.75rem)" }}
          >
            {connectIncome.compareTitle}
          </h2>
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2">
            {connectIncome.compare.map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-border bg-surface px-6 py-7"
              >
                <h3 className="font-heading text-white tracking-[-0.02em] text-[28px] leading-tight">
                  {item.title}
                </h3>
                <p className="mt-4 text-muted text-base leading-7 tracking-[-0.01em]">
                  {item.body}
                </p>
                <div className="mt-6">
                  <Button href={item.href} variant="outline">
                    {item.linkLabel}
                  </Button>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-10">
            <Button href="/#waitlist">Join waitlist</Button>
          </div>
        </Container>
      </section>
    </div>
  );
}
