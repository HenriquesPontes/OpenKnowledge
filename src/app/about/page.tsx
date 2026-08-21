import { cookies } from "next/headers";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { GITHUB_URL } from "@/lib/catalog";
import { LOCALE_COOKIE, localeFromCookie, getSiteCopy } from "@/lib/i18n";

export default async function AboutPage() {
  const locale = localeFromCookie((await cookies()).get(LOCALE_COOKIE)?.value);
  const copy = getSiteCopy(locale);

  return (
    <section className="pt-28 pb-20 sm:pt-36">
      <Container>
        <p className="text-muted text-sm sm:text-base tracking-[-0.01em]">
          {copy.about.eyebrow}
        </p>

        <h1
          className="mt-4 font-heading text-white tracking-[-0.03em] leading-[1.05]"
          style={{ fontSize: "clamp(2rem, 5vw, 3.75rem)" }}
        >
          {copy.about.title}
        </h1>

        <p className="mt-4 max-w-[720px] text-muted text-lg sm:text-[21px] tracking-[-0.01em] leading-normal">
          {copy.about.p1}
        </p>

        <p className="mt-6 max-w-[720px] text-muted text-base leading-7 tracking-[-0.01em]">
          {copy.about.p2}
        </p>

        <p className="mt-6 max-w-[760px] text-muted text-base leading-7 tracking-[-0.01em]">
          {copy.principle}
        </p>

        <div className="mt-10 flex flex-col sm:flex-row gap-3">
          <Button href="/">{copy.about.ctaHome}</Button>
          <Button href="/languages" variant="outline">
            {copy.about.ctaLanguages}
          </Button>
          <Button href={GITHUB_URL} variant="ghost">
            {copy.about.ctaGithub}
          </Button>
        </div>

        <div className="mt-16 max-w-[760px] divide-y divide-border border-t border-b border-border">
          {copy.about.principles.map((item) => (
            <div key={item.title} className="py-5 sm:py-6">
              <p className="font-heading text-white text-lg sm:text-xl tracking-[-0.02em]">
                {item.title}
              </p>
              <p className="mt-2 text-muted text-base leading-7 tracking-[-0.01em]">
                {item.body}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
