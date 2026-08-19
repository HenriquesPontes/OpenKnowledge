"use client";

import { motion } from "motion/react";
import { Container } from "@/components/ui/Container";
import { architecture } from "@/lib/constants";

function Node({
  label,
  href,
  featured = false,
}: {
  label: string;
  href: string;
  featured?: boolean;
}) {
  const external = href.startsWith("http");
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className={`block rounded-xl border px-5 py-3 text-center transition-colors ${
        featured
          ? "border-white/25 bg-surface-alt hover:border-white/40"
          : "border-border bg-surface hover:border-[#454545] hover:bg-surface-alt"
      }`}
    >
      <span className="text-white text-sm sm:text-base tracking-[-0.01em]">
        {label}
      </span>
    </a>
  );
}

function Stem() {
  return <div className="mx-auto h-8 w-px bg-border" aria-hidden="true" />;
}

export function Architecture() {
  return (
    <section id="how-it-works" className="pt-12 pb-16 sm:pt-20 sm:pb-28">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <h2
            className="font-heading text-white tracking-[-0.03em] leading-[1.05] mb-4 text-center"
            style={{ fontSize: "clamp(2rem, 5vw, 3.75rem)" }}
          >
            {architecture.title}
          </h2>
          <p className="max-w-[640px] mx-auto text-center text-muted text-base leading-[22px] tracking-[-0.01em] mb-10 sm:mb-14">
            Evidence before generation. Missing data is preferable to incorrect
            data.
          </p>

          <div className="flex flex-col items-center">
            {architecture.steps.map((step, index) => (
              <div key={step.label} className="flex flex-col items-center w-full">
                {index > 0 ? <Stem /> : null}
                <div className="w-full max-w-[240px]">
                  <Node
                    label={step.label}
                    href={step.href}
                    featured={index === 0 || index === architecture.steps.length - 1}
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </Container>
    </section>
  );
}

export function ProductTree() {
  const tree = architecture.tree;

  return (
    <div className="flex flex-col items-center">
      <div className="w-full max-w-[220px]">
        <Node label={tree.root.label} href={tree.root.href} featured />
      </div>

      <Stem />

      <div className="relative w-full max-w-3xl">
        <div className="absolute top-0 left-[16.6%] right-[16.6%] h-px bg-border hidden sm:block" />
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-3 sm:gap-6">
          {tree.products.map((product) => (
            <div key={product.label} className="flex flex-col items-center">
              <div className="hidden sm:block h-8 w-px bg-border" />
              <div className="w-full">
                <Node label={product.label} href={product.href} />
              </div>
              {"feedsData" in product && product.feedsData ? (
                <div className="hidden sm:block h-8 w-px bg-border" />
              ) : (
                <div className="hidden sm:block h-8" />
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="relative w-full max-w-3xl -mt-8 hidden sm:block">
        <div className="absolute top-0 left-1/2 right-[16.6%] h-px bg-border" />
      </div>

      <div className="w-full max-w-[240px]">
        <div className="hidden sm:block mx-auto h-8 w-px bg-border" />
        <Node label={tree.data.label} href={tree.data.href} featured />
      </div>

      <Stem />

      <div className="relative w-full max-w-4xl">
        <div className="absolute top-0 left-[12.5%] right-[12.5%] h-px bg-border hidden sm:block" />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 sm:gap-6">
          {tree.countries.map((country) => (
            <div key={country.label} className="flex flex-col items-center">
              <div className="hidden sm:block h-8 w-px bg-border" />
              <div className="w-full">
                <Node label={country.label} href={country.href} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
