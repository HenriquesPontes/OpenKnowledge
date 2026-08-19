'use client';

import { useState } from "react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { principle } from "@/lib/constants";
import { GITHUB_URL } from "@/lib/catalog";

function EvidencePipelineGraphic() {
  const nodes = [
    "Research",
    "Source",
    "Extraction",
    "Verification",
    "Structured data",
    "Review",
    "Publication",
    "API",
  ];
  const descriptions = [
    "Find documented starting points for language knowledge.",
    "Collect references, recordings, and publications with provenance.",
    "Extract consistent fields from sources without inventing content.",
    "Check each field against evidence and record uncertainty.",
    "Turn verified content into structured, reusable formats.",
    "Editorial and community review for clarity and consistency.",
    "Publish with traceability and audit-friendly structure.",
    "Expose data through a machine-readable public interface.",
  ];

  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="mt-8 overflow-hidden rounded-2xl border border-border bg-surface px-5 py-6 sm:px-8 sm:py-8">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-white/90 font-heading tracking-[-0.02em] text-lg sm:text-[21px]">
            Evidence-first workflow
          </p>
          <p className="mt-1 text-muted text-sm sm:text-base leading-6">
            Hover or tap a step to see what “evidence-first” means at each
            stage.
          </p>
        </div>

        <div className="rounded-xl border border-border bg-[#141414]/40 px-4 py-3 sm:px-5">
          <p className="text-white font-heading tracking-[-0.01em] text-base sm:text-lg">
            {nodes[activeIndex]}
          </p>
          <p className="mt-1 text-muted text-sm sm:text-base leading-6">
            {descriptions[activeIndex]}
          </p>
        </div>
      </div>

      <div className="mt-6 overflow-x-auto">
        <svg
          width="100%"
          height="190"
          viewBox="0 0 1120 190"
          role="img"
          aria-label="Evidence-first pipeline diagram"
          className="block min-w-[860px]"
        >
          {nodes.map((label, i) => {
            const x = 60 + i * 125;
            const y = 92;
            const isLast = i === nodes.length - 1;
            const isActive = i === activeIndex;

            return (
              <g key={label}>
                <circle
                  cx={x}
                  cy={y}
                  r={28}
                  fill={isActive ? "#ffffff" : "#1a1a1a"}
                  stroke={isActive ? "#ffffff" : "#2a2a2a"}
                  strokeWidth={isActive ? 3 : 2}
                  style={{ cursor: "pointer" }}
                  onMouseEnter={() => setActiveIndex(i)}
                  onClick={() => setActiveIndex(i)}
                />
                <text
                  x={x}
                  y={y + 5}
                  textAnchor="middle"
                  fontSize="14"
                  fill={isActive ? "#141414" : "#ffffff"}
                  style={{ letterSpacing: "-0.01em" }}
                >
                  {label}
                </text>
                {!isLast ? (
                  <path
                    d={`M ${x + 28} ${y} L ${x + 72} ${y}`}
                    stroke={isActive ? "#ffffff" : "#2a2a2a"}
                    strokeWidth={isActive ? 3.5 : 3}
                    strokeLinecap="round"
                    style={{ opacity: isActive ? 1 : 0.9 }}
                  />
                ) : null}
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
}

export default function AboutPage() {
  return (
    <section className="pt-28 pb-20 sm:pt-36">
      <Container>
        <p className="text-muted text-sm sm:text-base tracking-[-0.01em]">
          About
        </p>

        <h1
          className="mt-4 font-heading text-white tracking-[-0.03em] leading-[1.05]"
          style={{ fontSize: "clamp(2rem, 5vw, 3.75rem)" }}
        >
          ForroVivo
        </h1>

        <p className="mt-4 max-w-[720px] text-muted text-lg sm:text-[21px] tracking-[-0.01em] leading-normal">
          ForroVivo is an open linguistic knowledge initiative dedicated to
          documenting, preserving, and structuring African Creole languages.
          Where AI supports learning, the underlying language knowledge remains
          source-traceable and evidence-first.
        </p>

        <p className="mt-6 max-w-[720px] text-muted text-base leading-7 tracking-[-0.01em]">
          Our broader vision is to use AI and technology to preserve African
          Creole languages—making them accessible to new generations while
          protecting the cultures and identities connected to them.
        </p>

        <p className="mt-6 max-w-[760px] text-muted text-base leading-7 tracking-[-0.01em]">
          {principle}
        </p>

        <div className="mt-10 flex flex-col sm:flex-row gap-3">
          <Button href="/knowledge">Open knowledge</Button>
          <Button href="/languages" variant="outline">
            Browse languages
          </Button>
          <Button href={GITHUB_URL} variant="ghost">
            Contribute on GitHub
          </Button>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <div className="group rounded-2xl border border-border bg-surface p-6 transition-colors hover:border-[#454545]">
            <div className="flex items-center gap-3">
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
                <path d="M6 4h10v14H6z" stroke="#ffffff" strokeWidth="1.4" opacity="0.9" />
                <path d="M8.2 8h5.6" stroke="#ffffff" strokeWidth="1.4" strokeLinecap="round" opacity="0.9" />
              </svg>
              <p className="text-white/90 font-heading text-lg tracking-[-0.02em]">
                Open linguistic knowledge
              </p>
            </div>
            <p className="mt-3 text-muted text-base leading-7 tracking-[-0.01em]">
              Structured content with provenance and language context.
            </p>
          </div>

          <div className="group rounded-2xl border border-border bg-surface p-6 transition-colors hover:border-[#454545]">
            <div className="flex items-center gap-3">
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
                <path d="M11 3l7 4v8l-7 4-7-4V7l7-4z" stroke="#ffffff" strokeWidth="1.4" opacity="0.9" />
                <path d="M11 7v10" stroke="#ffffff" strokeWidth="1.4" strokeLinecap="round" opacity="0.9" />
              </svg>
              <p className="text-white/90 font-heading text-lg tracking-[-0.02em]">
                Cultural responsibility
              </p>
            </div>
            <p className="mt-3 text-muted text-base leading-7 tracking-[-0.01em]">
              Community knowledge published with rights and attribution.
            </p>
          </div>

          <div className="group rounded-2xl border border-border bg-surface p-6 transition-colors hover:border-[#454545]">
            <div className="flex items-center gap-3">
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
                <path d="M11 2l8 4v6c0 5-3.6 8-8 8S3 17 3 12V6l8-4z" stroke="#ffffff" strokeWidth="1.4" opacity="0.9" />
                <path d="M7.4 11l2.1 2.1 5.1-5.1" stroke="#ffffff" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" opacity="0.9" />
              </svg>
              <p className="text-white/90 font-heading text-lg tracking-[-0.02em]">
                Evidence before output
              </p>
            </div>
            <p className="mt-3 text-muted text-base leading-7 tracking-[-0.01em]">
              Verification keeps claims traceable and auditable.
            </p>
          </div>

          <div className="group rounded-2xl border border-border bg-surface p-6 transition-colors hover:border-[#454545]">
            <div className="flex items-center gap-3">
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
                <path d="M6 6h10v10H6z" stroke="#ffffff" strokeWidth="1.4" opacity="0.9" />
                <path d="M9 9h4v4H9z" stroke="#ffffff" strokeWidth="1.4" opacity="0.9" />
              </svg>
              <p className="text-white/90 font-heading text-lg tracking-[-0.02em]">
                Public API & tooling
              </p>
            </div>
            <p className="mt-3 text-muted text-base leading-7 tracking-[-0.01em]">
              Machine-readable access for research, education, and language
              technology.
            </p>
          </div>
        </div>

        <EvidencePipelineGraphic />

        <div className="mt-16 lg:mt-20">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <div className="rounded-2xl border border-border bg-surface px-6 py-7">
              <p className="text-white/90 font-heading text-lg tracking-[-0.02em]">
                Language independence
              </p>
              <p className="mt-3 text-muted text-base leading-7 tracking-[-0.01em]">
                Datasets stay isolated by language so similar-looking forms do
                not silently become cross-language merges.
              </p>
              <p className="mt-4 text-muted text-base leading-7 tracking-[-0.01em]">
                Relationships can be documented when supported by evidence—without
                erasing linguistic identity.
              </p>
            </div>

            <div className="rounded-2xl border border-border bg-surface px-6 py-7">
              <p className="text-white/90 font-heading text-lg tracking-[-0.02em]">
                Open where appropriate
              </p>
              <p className="mt-3 text-muted text-base leading-7 tracking-[-0.01em]">
                Not every cultural detail is suitable for unrestricted reuse.
                We publish responsibly according to rights, attribution, and community
                expectations.
              </p>
              <p className="mt-4 text-muted text-base leading-7 tracking-[-0.01em]">
                Open data doesn’t mean open access to everything—some knowledge
                requires care.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-16 sm:mt-20">
          <p className="text-muted text-sm sm:text-base tracking-[-0.01em]">
            Founders
          </p>
          <h2
            className="mt-4 font-heading text-white tracking-[-0.03em] leading-[1.05]"
            style={{ fontSize: "clamp(2rem, 5vw, 3.25rem)" }}
          >
            Leadership & stewardship
          </h2>

          <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-10">
            <div className="rounded-2xl border border-border bg-surface px-6 py-7">
              <h3 className="font-heading text-white tracking-[-0.02em] text-[28px] leading-tight">
                Henriques Pontes
              </h3>
              <p className="mt-2 text-muted text-sm sm:text-base tracking-[-0.01em]">
                Founder & Project Lead · Product & Technology
              </p>
              <p className="mt-4 text-muted text-base leading-7 tracking-[-0.01em]">
                Henriques leads the development of the ForroVivo African Creole
                Knowledge Project—focused on evidence-first research, structured
                datasets, and public access.
              </p>
            </div>

            <div className="rounded-2xl border border-border bg-surface px-6 py-7">
              <h3 className="font-heading text-white tracking-[-0.02em] text-[28px] leading-tight">
                Luís Lima
              </h3>
              <p className="mt-2 text-muted text-sm sm:text-base tracking-[-0.01em]">
                Co-Founder & Research Collaborator
              </p>
              <p className="mt-4 text-muted text-base leading-7 tracking-[-0.01em]">
                Luís provides early collaboration and ongoing testing and feedback,
                keeping the project grounded in user needs and iteration.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-16 sm:mt-20 rounded-2xl border border-border bg-surface px-6 py-7">
          <p className="text-white/90 font-heading text-lg tracking-[-0.02em]">
            Join the project
          </p>
          <p className="mt-3 text-muted text-base leading-7 tracking-[-0.01em]">
            Help document, verify, and contextualize linguistic knowledge, or build
            tools that make the public API and structured data more usable.
          </p>
          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <Button href="/docs/methodology">Read methodology</Button>
            <Button href="/docs/quickstart" variant="outline">
              API quickstart
            </Button>
            <Button href={GITHUB_URL} variant="ghost">
              View repository
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}

