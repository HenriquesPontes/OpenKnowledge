import { legalNav, footer } from "@/lib/constants";

export const metadata = {
  title: "Legal",
  description:
    "Legal policies for ForroVivo: company information, terms of service, privacy, and EULA for Open Knowledge, the Forro Vivo App, Forro Connect, and Linguistic Research.",
  alternates: { canonical: "/legal" },
};

export default function LegalPage() {
  const policies = legalNav.filter((item) => item.href !== "/legal");

  return (
    <>
      <h1
        className="font-heading text-white tracking-[-0.03em] leading-[1.05]"
        style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
      >
        Legal
      </h1>
      <p className="mt-4 max-w-[40rem] text-muted text-lg sm:text-[21px] tracking-[-0.01em] leading-normal">
        Policies for Open Knowledge, Linguistic Research, the Forro Vivo App,
        and Forro Connect — operated by {footer.companyName}.
      </p>

      <div className="mt-10 divide-y divide-border border-t border-b border-border">
        {policies.map((item) => (
          <a
            key={item.href}
            href={item.href}
            className="group flex flex-col gap-2 py-6 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/25 rounded-sm"
          >
            <span className="font-heading text-white text-xl sm:text-2xl tracking-[-0.02em] group-hover:underline underline-offset-4">
              {item.label}
            </span>
            <span className="text-muted text-base leading-7 tracking-[-0.01em]">
              {item.description}
            </span>
          </a>
        ))}
      </div>
    </>
  );
}
