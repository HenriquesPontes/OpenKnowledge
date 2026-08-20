import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { translationPage } from "@/lib/constants";

export const metadata = {
  title: "Translation capability",
  description: translationPage.description,
  alternates: { canonical: "/translation" },
};

function Arrow() {
  return (
    <span aria-hidden="true" className="inline-block translate-y-px">
      →
    </span>
  );
}

export default function TranslationCapabilityPage() {
  return (
    <div className="flex flex-1 flex-col bg-background text-foreground">
      <section className="pt-28 pb-12 sm:pt-36 sm:pb-16 lg:pt-40">
        <Container>
          <p className="text-muted text-sm sm:text-base tracking-[-0.01em]">
            {translationPage.eyebrow}
          </p>
          <div className="mt-4 grid gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:items-start lg:gap-20">
            <h1
              className="font-heading text-white tracking-[-0.03em] leading-[1.05]"
              style={{ fontSize: "clamp(2.25rem, 6vw, 4.25rem)" }}
            >
              {translationPage.heroLead}{" "}
              <span className="underline decoration-white decoration-[1.5px] underline-offset-[0.18em]">
                {translationPage.heroEmphasisA}
              </span>
              {translationPage.heroMid}
              <span className="underline decoration-white decoration-[1.5px] underline-offset-[0.18em]">
                {translationPage.heroEmphasisB}
              </span>
              {translationPage.heroTail}
            </h1>
            <p className="text-muted text-lg sm:text-[21px] leading-normal tracking-[-0.01em] lg:pt-2">
              {translationPage.description}
            </p>
          </div>
        </Container>
      </section>

      <section className="px-4 sm:px-6 lg:px-8 pb-16 sm:pb-24">
        <div className="mx-auto max-w-[77.5rem] rounded-[1.75rem] border border-border bg-surface px-6 py-20 text-center sm:px-12 sm:py-28">
          <h2
            className="mx-auto max-w-[40rem] font-heading text-white tracking-[-0.03em] leading-[1.2]"
            style={{ fontSize: "clamp(1.85rem, 4.5vw, 3.25rem)" }}
          >
            {translationPage.questionsTitle}
          </h2>
          <p className="mx-auto mt-5 max-w-[32rem] text-muted text-sm sm:text-base tracking-[-0.01em] leading-6">
            {translationPage.questionsBody}
          </p>
          <Button href={translationPage.questionsHref} className="mt-8">
            {translationPage.questionsCta}
            <Arrow />
          </Button>
        </div>
      </section>

      <section id="evidence" className="pb-16 sm:pb-24">
        <Container>
          <h2 className="font-heading text-white tracking-[-0.03em] text-2xl sm:text-3xl">
            {translationPage.releasesTitle}
          </h2>
          <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-3">
            {translationPage.releases.map((card) => (
              <article
                key={card.href}
                className="flex h-full flex-col rounded-2xl border border-border bg-surface p-7 sm:p-8"
              >
                <h3 className="font-heading text-white tracking-[-0.02em] text-[1.65rem] leading-tight">
                  {card.title}
                </h3>
                <p className="mt-4 text-muted text-base leading-7 tracking-[-0.01em]">
                  {card.body}
                </p>
                <a
                  href={card.href}
                  className="mt-5 text-[13px] tracking-[-0.01em] text-white hover:text-white/70 transition-colors underline-offset-4 hover:underline"
                >
                  {card.linkLabel} <Arrow />
                </a>
                <div className="mt-auto pt-8">
                  <dl className="border-t border-border pt-4 space-y-3">
                    <div className="flex items-baseline justify-between gap-4">
                      <dt className="text-[11px] tracking-[0.08em] uppercase text-muted">
                        Layer
                      </dt>
                      <dd className="text-[13px] tracking-[-0.01em] text-white text-right">
                        {card.layer}
                      </dd>
                    </div>
                    <div className="flex items-baseline justify-between gap-4 border-t border-border pt-3">
                      <dt className="text-[11px] tracking-[0.08em] uppercase text-muted">
                        Surface
                      </dt>
                      <dd className="text-[13px] tracking-[-0.01em] text-white text-right">
                        {card.surface}
                      </dd>
                    </div>
                  </dl>
                  <Button href={card.href} size="sm" className="mt-8 w-fit">
                    {card.linkLabel} <Arrow />
                  </Button>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="pb-20 sm:pb-28">
        <Container>
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
            <p
              className="font-heading text-white tracking-[-0.03em] leading-[1.15]"
              style={{ fontSize: "clamp(1.6rem, 3.5vw, 2.35rem)" }}
            >
              {translationPage.wellBeing}
            </p>
            <ul>
              {translationPage.links.map((item) => (
                <li key={item.href} className="border-t border-border">
                  <a
                    href={item.href}
                    className="flex flex-col gap-1 py-5 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/25 rounded-sm"
                  >
                    <span className="text-[12px] tracking-[-0.01em] text-muted">
                      {item.heading}
                    </span>
                    <span className="font-heading text-xl sm:text-2xl text-white tracking-[-0.02em] group-hover:underline underline-offset-4">
                      {item.label}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>
    </div>
  );
}
