import type { Metadata } from "next";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Architecture } from "@/components/sections/Architecture";
import { appFaq, appLanding, appRoadmap, appVision, appWhy, footer, nav } from "@/lib/constants";
import { APP_ORIGIN, APP_STORE_URL, jsonLdScript } from "@/lib/catalog";

export const metadata: Metadata = {
  title: { absolute: appLanding.seoTitle },
  description: appLanding.seoDescription,
  alternates: { canonical: "/app" },
  openGraph: {
    type: "website",
    url: `${APP_ORIGIN}/app`,
    title: appLanding.seoTitle,
    description: appLanding.seoDescription,
    images: [
      {
        url: "/images/app/phone-hero.png",
        alt: "Forro Vivo on iPhone",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: appLanding.seoTitle,
    description: appLanding.seoDescription,
    images: ["/images/app/phone-hero.png"],
  },
};

const appJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareApplication",
      name: "Forro Vivo",
      applicationCategory: "EducationalApplication",
      operatingSystem: "iOS",
      description: appLanding.seoDescription,
      url: `${APP_ORIGIN}/app`,
      downloadUrl: APP_STORE_URL,
      image: `${APP_ORIGIN}/images/app/phone-hero.png`,
      inLanguage: ["en", "cri"],
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
      },
      author: {
        "@type": "Organization",
        name: footer.companyName,
        url: APP_ORIGIN,
      },
    },
    {
      "@type": "FAQPage",
      mainEntity: appFaq.items.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.answer,
        },
      })),
    },
  ],
};

function ExternalArrow() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M3.5 8.5L8.5 3.5M8.5 3.5H4.5M8.5 3.5V7.5"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function ForroVivoAppPage() {
  return (
    <div className="forro-app flex flex-1 flex-col bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdScript(appJsonLd) }}
      />
      <section className="relative overflow-hidden pt-24 pb-8 sm:pt-36 sm:pb-12 lg:pt-44 lg:pb-12">
        <Container className="relative">
          <div className="grid items-center gap-12 md:grid-cols-2">
            <div>
              <h1
                className="font-heading text-white tracking-[-0.03em] leading-[1.05]"
                style={{ fontSize: "clamp(1.85rem, 8vw, 4.5rem)" }}
              >
                {appLanding.titleLines[0]}
                <br />
                {appLanding.titleLines[1]}
              </h1>
              <p className="mt-4 max-w-[593px] text-muted text-base sm:text-lg lg:text-[21px] tracking-[-0.01em] leading-normal">
                {appLanding.description}
              </p>
              <div className="mt-6 flex flex-col sm:flex-row gap-3 sm:gap-4 sm:items-center">
                <Button
                  href={APP_STORE_URL}
                  className="w-full sm:w-auto gap-1.5 bg-[#58CC02] text-[#121C17] hover:bg-[#4CAF50] focus-visible:ring-offset-[#121C17]"
                >
                  {nav.cta}
                  <ExternalArrow />
                </Button>
                <Button
                  variant="outline"
                  disabled
                  className="w-full sm:w-auto border-[#4CAF50] focus-visible:ring-offset-[#121C17]"
                >
                  Google Play — Coming soon
                </Button>
              </div>
            </div>

            <div className="relative flex items-center justify-center">
              <div
                className="relative mx-auto w-full max-w-[280px] drop-shadow-2xl md:max-w-[350px]"
                style={{ aspectRatio: "9 / 19.5" }}
              >
                <div className="absolute inset-[-2.63%_-5.97%]">
                  <Image
                    src="/images/app/phone-frame.png"
                    alt=""
                    fill
                    priority
                    quality={100}
                    unoptimized
                    className="object-contain"
                    sizes="(min-width: 768px) 400px, 320px"
                  />
                </div>
                <div className="absolute inset-[-5.84%_-19.79%_-0.01%_0] overflow-hidden rounded-[85px]">
                  <Image
                    src="/images/app/phone-hero.png"
                    alt="Forro Vivo on iPhone"
                    fill
                    priority
                    quality={100}
                    className="object-cover"
                    sizes="(min-width: 768px) 400px, 320px"
                  />
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <Architecture
        id="roadmap"
        title={appRoadmap.title}
        description={appRoadmap.description}
        steps={appRoadmap.steps}
      />

      <section className="pt-10 pb-14 sm:pt-16 sm:pb-20">
        <Container>
          <h2
            className="font-heading text-white tracking-[-0.03em] leading-[1.05] text-center"
            style={{ fontSize: "clamp(2rem, 5vw, 3.75rem)" }}
          >
            {appWhy.title}
          </h2>
          <div className="mt-10 grid grid-cols-1 gap-6 sm:mt-14 sm:grid-cols-3">
            {appWhy.cards.map((card) => (
              <div
                key={card.title}
                className="overflow-hidden rounded-2xl border border-border bg-surface transition-colors hover:border-[#58CC02]"
              >
                <div className="relative aspect-[4/3]">
                  <Image
                    src={card.image}
                    alt={card.imageAlt}
                    fill
                    className="object-cover"
                    sizes="(min-width: 640px) 33vw, 100vw"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-white font-heading text-lg tracking-[-0.02em]">
                    {card.title}
                  </h3>
                  <p className="mt-3 text-muted text-base leading-7 tracking-[-0.01em]">
                    {card.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <p className="mt-6 text-center text-muted text-sm tracking-[-0.01em]">
            {appWhy.photoCredit.label}:{" "}
            <a
              href={appWhy.photoCredit.href}
              className="text-white hover:text-white/70 transition-colors"
            >
              {appWhy.photoCredit.name}
            </a>
          </p>
        </Container>
      </section>

      <section id="vision" className="pt-10 pb-14 sm:pt-16 sm:pb-20">
        <Container>
          <h2
            className="font-heading text-white tracking-[-0.03em] leading-[1.05] text-center"
            style={{ fontSize: "clamp(2rem, 5vw, 3.75rem)" }}
          >
            {appVision.title}
          </h2>
          <p className="mt-6 mx-auto max-w-[720px] text-center text-muted text-lg sm:text-[21px] tracking-[-0.01em] leading-normal">
            {appVision.about}
          </p>
          <p className="mt-6 mx-auto max-w-[720px] text-center text-muted text-base leading-7 tracking-[-0.01em]">
            {appVision.body}
          </p>
        </Container>
      </section>

      <section id="faq" className="pt-10 pb-20 sm:pt-16 sm:pb-28">
        <Container>
          <h2
            className="font-heading text-white tracking-[-0.03em] leading-[1.05] text-center"
            style={{ fontSize: "clamp(2rem, 5vw, 3.75rem)" }}
          >
            {appFaq.title}
          </h2>
          <div className="mt-10 mx-auto max-w-[720px] divide-y divide-border border-t border-b border-border">
            {appFaq.items.map((item) => (
              <details key={item.question} className="group py-5">
                <summary className="cursor-pointer list-none text-white font-heading text-lg tracking-[-0.02em] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/25 rounded-sm">
                  {item.question}
                </summary>
                <p className="mt-3 text-muted text-base leading-7 tracking-[-0.01em]">
                  {item.answer}
                </p>
              </details>
            ))}
          </div>
          <div className="mt-10 flex justify-center">
            <Button
              href="/app/credits"
              variant="outline"
              className="border-[#4CAF50] hover:border-[#58CC02] hover:bg-[#243829] focus-visible:ring-offset-[#121C17]"
            >
              Credits
            </Button>
          </div>
        </Container>
      </section>
    </div>
  );
}
