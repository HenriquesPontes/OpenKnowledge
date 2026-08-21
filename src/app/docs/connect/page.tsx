import { Button } from "@/components/ui/Button";
import { connectArchitecture, connectIncome } from "@/lib/constants";

export const metadata = {
  title: "Forro Connect",
  description:
    "Documentation for Forro Connect: live lessons with Forro speakers, waitlist, and community income.",
  alternates: { canonical: "/docs/connect" },
};

export default function ConnectDocsPage() {
  return (
    <>
      <h1
        className="font-heading text-white tracking-[-0.03em] leading-[1.05]"
        style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
      >
        Forro Connect
      </h1>
      <p className="mt-4 text-muted text-lg sm:text-[21px] tracking-[-0.01em] leading-normal">
        {connectArchitecture.description}
      </p>

      <div className="mt-10 rounded-2xl border border-border bg-surface px-6 py-7 sm:px-8 sm:py-8">
        <h2 className="font-heading text-white text-2xl sm:text-3xl tracking-[-0.02em]">
          Join the waitlist
        </h2>
        <p className="mt-3 max-w-[40rem] text-muted text-base leading-7 tracking-[-0.01em]">
          Connect learners with real Forro speakers and cultural knowledge
          holders. Product details and signup live on the Forro Connect page.
        </p>
        <div className="mt-6 flex flex-col sm:flex-row gap-3">
          <Button href="/connect#waitlist">Join waitlist</Button>
          <Button href="/connect" variant="outline">
            Product page
          </Button>
        </div>
      </div>

      <h2 className="mt-12 text-white text-lg sm:text-[21px] tracking-[-0.01em]">
        {connectArchitecture.title}
      </h2>
      <ul className="mt-4 divide-y divide-border border-t border-b border-border max-w-[40rem]">
        {connectArchitecture.steps.map((step) => (
          <li key={step.label} className="py-3 text-muted text-base tracking-[-0.01em]">
            {step.label}
          </li>
        ))}
      </ul>

      <h2 className="mt-12 text-white text-lg sm:text-[21px] tracking-[-0.01em]">
        Explore
      </h2>
      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
        <a
          href="/connect#how-it-works"
          className="rounded-2xl border border-border bg-surface px-6 py-6 transition-colors hover:border-white/25"
        >
          <h3 className="text-white font-heading text-xl tracking-[-0.02em]">
            How it works
          </h3>
          <p className="mt-2 text-muted text-base leading-7 tracking-[-0.01em]">
            The learner-to-speaker path on the product page.
          </p>
          <span className="mt-5 inline-block text-sm text-white/70">
            Open how it works →
          </span>
        </a>
        <a
          href={connectIncome.href}
          className="rounded-2xl border border-border bg-surface px-6 py-6 transition-colors hover:border-white/25"
        >
          <h3 className="text-white font-heading text-xl tracking-[-0.02em]">
            {connectIncome.title}
          </h3>
          <p className="mt-2 text-muted text-base leading-7 tracking-[-0.01em]">
            How a paid live lesson pays the speaker and funds the project.
          </p>
          <span className="mt-5 inline-block text-sm text-white/70">
            Open breakdown →
          </span>
        </a>
      </div>
    </>
  );
}
