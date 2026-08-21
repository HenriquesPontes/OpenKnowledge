import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { careerRoleById, careersPage } from "@/lib/constants";

type Props = { params: Promise<{ id: string }> };

export function generateStaticParams() {
  return careersPage.roles.map((role) => ({ id: role.id }));
}

export async function generateMetadata({ params }: Props) {
  const { id } = await params;
  const role = careerRoleById(id);
  if (!role) return { title: "Careers" };
  return {
    title: role.title,
    description: role.summary,
    alternates: { canonical: `/careers/${role.id}` },
  };
}

export default async function CareerRolePage({ params }: Props) {
  const { id } = await params;
  const role = careerRoleById(id);
  if (!role) notFound();

  return (
    <section className="pt-28 pb-20 sm:pt-36">
      <Container>
        <a
          href="/careers"
          className="text-muted hover:text-white transition-colors text-sm sm:text-base tracking-[-0.01em]"
        >
          Careers
        </a>
        <h1
          className="mt-4 font-heading text-white tracking-[-0.03em] leading-[1.05]"
          style={{ fontSize: "clamp(2rem, 5vw, 3.75rem)" }}
        >
          {role.title}
        </h1>
        <p className="mt-3 text-muted text-base sm:text-lg tracking-[-0.01em]">
          {role.team}
          <span className="mx-2 text-border" aria-hidden="true">
            ·
          </span>
          {role.location}
        </p>
        <p className="mt-6 max-w-[40rem] text-muted text-lg sm:text-[21px] tracking-[-0.01em] leading-normal">
          {role.summary}
        </p>
        <div className="mt-8">
          <Button href={role.applyHref} className="w-fit">
            {careersPage.applyLabel}
          </Button>
        </div>

        <div className="mt-14 max-w-[42rem] space-y-12">
          <section>
            <h2 className="font-heading text-white tracking-[-0.02em] text-2xl leading-tight">
              About the role
            </h2>
            <div className="mt-4 space-y-4 text-muted text-base leading-7 tracking-[-0.01em]">
              {role.about.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </section>

          <section>
            <h2 className="font-heading text-white tracking-[-0.02em] text-2xl leading-tight">
              What you will do
            </h2>
            <ul className="mt-4 space-y-3 text-muted text-base leading-7 tracking-[-0.01em]">
              {role.responsibilities.map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-muted" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="font-heading text-white tracking-[-0.02em] text-2xl leading-tight">
              What we look for
            </h2>
            <ul className="mt-4 space-y-3 text-muted text-base leading-7 tracking-[-0.01em]">
              {role.requirements.map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-muted" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="border-t border-border pt-10">
            <h2 className="font-heading text-white tracking-[-0.02em] text-2xl leading-tight">
              How to apply
            </h2>
            <p className="mt-4 text-muted text-base leading-7 tracking-[-0.01em]">
              Send a short note about why this role fits your work, with a CV or
              portfolio link. We read every application.
            </p>
            <div className="mt-6">
              <Button href={role.applyHref} className="w-fit">
                {careersPage.applyLabel}
              </Button>
            </div>
          </section>
        </div>
      </Container>
    </section>
  );
}
