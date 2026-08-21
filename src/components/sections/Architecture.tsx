"use client";

import { motion } from "motion/react";
import { Container } from "@/components/ui/Container";
import { useLocale } from "@/components/locale/LocaleProvider";

function Node({
  label,
  href,
  date,
  description,
  featured = false,
}: {
  label: string;
  href?: string;
  date?: string;
  description?: string;
  featured?: boolean;
}) {
  const className = `block rounded-xl border px-4 py-3 sm:px-5 text-center transition-[border-color,background-color] duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/25 ${
    featured
      ? "border-white/20 bg-surface-alt hover:border-white/35"
      : "border-border bg-surface hover:border-white/12 hover:bg-surface-alt"
  }`;
  const body = (
    <>
      <span className="block text-white text-sm sm:text-base tracking-[-0.01em]">
        {label}
      </span>
      {date ? (
        <span className="mt-1 block text-muted text-xs tracking-[0.04em] uppercase">
          {date}
        </span>
      ) : null}
      {description ? (
        <span className="mt-1.5 block text-muted text-xs sm:text-sm leading-5 tracking-[-0.01em]">
          {description}
        </span>
      ) : null}
    </>
  );

  if (!href) {
    return <div className={className}>{body}</div>;
  }

  const external = href.startsWith("http");
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className={className}
    >
      {body}
    </a>
  );
}

function Stem() {
  return <div className="mx-auto h-8 w-px bg-border" aria-hidden="true" />;
}

type PipelineStep = {
  label: string;
  href?: string;
  date?: string;
  description?: string;
};

export function Architecture({
  title,
  description,
  steps,
  id = "how-it-works",
}: {
  title?: string;
  description?: string;
  steps?: readonly PipelineStep[];
  id?: string;
}) {
  const { copy } = useLocale();
  const resolvedTitle = title ?? copy.architecture.title;
  const resolvedDescription = description ?? copy.architecture.description;
  const resolvedSteps = steps ?? copy.architecture.steps;

  return (
    <section id={id} className="pt-10 pb-14 sm:pt-20 sm:pb-28 [content-visibility:auto] [contain-intrinsic-size:auto_40rem]">
      <Container>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2
            className="font-heading text-white tracking-[-0.03em] leading-[1.05] mb-4 text-center"
            style={{ fontSize: "clamp(2rem, 5vw, 3.75rem)" }}
          >
            {resolvedTitle}
          </h2>
          <p className="max-w-[640px] mx-auto text-center text-muted text-sm sm:text-base leading-6 sm:leading-[22px] tracking-[-0.01em] mb-8 sm:mb-14 px-1">
            {resolvedDescription}
          </p>

          <MethodologyPipeline steps={resolvedSteps} />
        </motion.div>
      </Container>
    </section>
  );
}

export function MethodologyPipeline({
  steps,
}: {
  steps?: readonly PipelineStep[];
}) {
  const { copy } = useLocale();
  const resolvedSteps = steps ?? copy.architecture.steps;

  return (
    <div className="flex flex-col items-center">
      {resolvedSteps.map((step, index) => (
        <div key={step.label} className="flex flex-col items-center w-full">
          {index > 0 ? <Stem /> : null}
          <div className="w-full max-w-[320px]">
            <Node
              label={step.label}
              href={step.href}
              date={"date" in step ? step.date : undefined}
              description={"description" in step ? step.description : undefined}
              featured={index === 0 || index === resolvedSteps.length - 1}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

export function ProductTree() {
  const { copy } = useLocale();
  const tree = copy.architecture.tree;

  return (
    <div className="flex flex-col items-center">
      <div className="w-full max-w-[220px]">
        <Node label={tree.root.label} href={tree.root.href} featured />
      </div>

      <Stem />

      <div className="relative w-full max-w-3xl">
        <div className="absolute top-0 left-[16.6%] right-[16.6%] h-px bg-border hidden sm:block" />
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-3 sm:gap-6">
          {tree.products.map((product) => (
            <div key={product.label} className="flex flex-col items-center">
              <div className="hidden sm:block h-8 w-px bg-border" />
              <div className="w-full">
                <Node label={product.label} href={product.href} />
              </div>
              <ul className="mt-4 w-full space-y-1.5 text-center">
                {product.items.map((item) => (
                  <li key={item.label}>
                    {item.href ? (
                      <a
                        href={item.href}
                        className="text-muted hover:text-white transition-colors text-sm tracking-[-0.01em]"
                      >
                        {item.label}
                      </a>
                    ) : (
                      <span className="text-muted text-sm tracking-[-0.01em]">
                        {item.label}
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="relative w-full max-w-3xl hidden sm:block">
        <div className="absolute top-0 left-[16.6%] right-[16.6%] h-px bg-border" />
      </div>

      <div className="flex flex-col items-center w-full max-w-[280px]">
        <div className="hidden sm:block mx-auto h-8 w-px bg-border" />
        <Node label={tree.outcomes[0].label} featured />
        <p className="my-3 text-muted text-sm tracking-[-0.01em]" aria-hidden="true">
          +
        </p>
        <Node label={tree.outcomes[1].label} featured />
      </div>
    </div>
  );
}
