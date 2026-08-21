import { Button } from "@/components/ui/Button";
import { appFaq, appVision } from "@/lib/constants";
import { APP_STORE_URL } from "@/lib/catalog";

export const metadata = {
  title: "Forro Vivo App",
  description:
    "Documentation for the Forro Vivo App: download, features, roadmap, and how it relates to Open Knowledge.",
  alternates: { canonical: "/docs/app" },
};

export default function AppDocsPage() {
  return (
    <>
      <h1
        className="font-heading text-white tracking-[-0.03em] leading-[1.05]"
        style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
      >
        Forro Vivo App
      </h1>
      <p className="mt-4 text-muted text-lg sm:text-[21px] tracking-[-0.01em] leading-normal">
        The first learning app for African Creole languages, starting with Forro
        of São Tomé and Príncipe.
      </p>

      <div className="mt-10 rounded-2xl border border-border bg-surface px-6 py-7 sm:px-8 sm:py-8">
        <h2 className="font-heading text-white text-2xl sm:text-3xl tracking-[-0.02em]">
          Get the app
        </h2>
        <p className="mt-3 max-w-[40rem] text-muted text-base leading-7 tracking-[-0.01em]">
          Dictionary, lessons, and exercises on the App Store. This documentation
          covers product scope; Open Knowledge holds the public lexicons and API.
        </p>
        <div className="mt-6 flex flex-col sm:flex-row gap-3">
          <Button href={APP_STORE_URL}>Download on the App Store</Button>
          <Button href="/app" variant="outline">
            Product page
          </Button>
        </div>
      </div>

      <h2 className="mt-12 text-white text-lg sm:text-[21px] tracking-[-0.01em]">
        {appVision.title}
      </h2>
      <p className="mt-4 text-muted text-base leading-7 tracking-[-0.01em]">
        {appVision.about}
      </p>
      <p className="mt-3 text-muted text-base leading-7 tracking-[-0.01em]">
        {appVision.body}
      </p>

      <h2 className="mt-12 text-white text-lg sm:text-[21px] tracking-[-0.01em]">
        Build paths
      </h2>
      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
        <a
          href="/app#roadmap"
          className="rounded-2xl border border-border bg-surface px-6 py-6 transition-colors hover:border-white/25"
        >
          <h3 className="text-white font-heading text-xl tracking-[-0.02em]">
            Roadmap
          </h3>
          <p className="mt-2 text-muted text-base leading-7 tracking-[-0.01em]">
            What ships next for the learning app.
          </p>
          <span className="mt-5 inline-block text-sm text-white/70">
            Open roadmap →
          </span>
        </a>
        <a
          href="/app/credits"
          className="rounded-2xl border border-border bg-surface px-6 py-6 transition-colors hover:border-white/25"
        >
          <h3 className="text-white font-heading text-xl tracking-[-0.02em]">
            Credits
          </h3>
          <p className="mt-2 text-muted text-base leading-7 tracking-[-0.01em]">
            People and sources behind the app experience.
          </p>
          <span className="mt-5 inline-block text-sm text-white/70">
            Open credits →
          </span>
        </a>
      </div>

      <h2 className="mt-12 text-white text-lg sm:text-[21px] tracking-[-0.01em]">
        {appFaq.title}
      </h2>
      <ul className="mt-4 divide-y divide-border border-t border-b border-border">
        {appFaq.items.map((item) => (
          <li key={item.question} className="py-4">
            <p className="text-white text-base tracking-[-0.01em]">
              {item.question}
            </p>
            <p className="mt-1 text-muted text-base leading-7 tracking-[-0.01em]">
              {item.answer}
            </p>
          </li>
        ))}
      </ul>
    </>
  );
}
