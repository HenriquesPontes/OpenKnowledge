import { Container } from "@/components/ui/Container";
import { careersPage } from "@/lib/constants";

export const metadata = {
  title: "Careers",
  description: careersPage.description,
  alternates: { canonical: "/careers" },
};

export default function CareersPage() {
  return (
    <section className="pt-28 pb-20 sm:pt-36">
      <Container>
        <h1
          className="font-heading text-white tracking-[-0.03em] leading-[1.05] text-center"
          style={{ fontSize: "clamp(2rem, 5vw, 3.75rem)" }}
        >
          {careersPage.title}
        </h1>
        <p className="mt-4 mx-auto max-w-[40rem] text-center text-muted text-lg sm:text-[21px] tracking-[-0.01em] leading-normal">
          {careersPage.description}
        </p>

        <ul className="mt-14 sm:mt-16 divide-y divide-border border-t border-b border-border">
          {careersPage.roles.map((role) => (
            <li key={role.id}>
              <a
                href={`/careers/${role.id}`}
                className="group flex flex-col gap-3 py-5 sm:flex-row sm:items-center sm:justify-between sm:gap-8 sm:py-6 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/25 rounded-sm"
              >
                <div className="min-w-0 flex flex-col gap-1 sm:flex-row sm:items-baseline sm:gap-3">
                  <span className="text-white text-base sm:text-lg tracking-[-0.01em]">
                    {role.title}
                  </span>
                  <span className="text-muted text-base tracking-[-0.01em]">
                    {role.team}
                  </span>
                </div>
                <div className="flex shrink-0 items-center justify-between gap-6 sm:justify-end sm:gap-10">
                  <span className="text-muted text-base tracking-[-0.01em]">
                    {role.location}
                  </span>
                  <span className="text-white text-base tracking-[-0.01em] group-hover:text-white/70 transition-colors">
                    {careersPage.viewLabel}
                  </span>
                </div>
              </a>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
