"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { cloneSection } from "@/lib/constants";

export function ProductShowcase() {
  const [copied, setCopied] = useState(false);

  async function copyCommand() {
    try {
      await navigator.clipboard.writeText(cloneSection.command);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  return (
    <section id="research-repo" className="pt-8 pb-8 sm:pt-12 sm:pb-12">
      <Container>
        <motion.div
          className="flex flex-col items-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <div className="flex w-full max-w-[720px] items-center gap-2 sm:gap-3 rounded-full border border-[#454545] bg-[#252525] px-3 sm:px-5 h-12">
            <span className="text-muted text-base tracking-[-0.01em] shrink-0">
              $
            </span>
            <code className="min-w-0 flex-1 truncate text-white text-sm sm:text-base tracking-[-0.01em]">
              {cloneSection.command}
            </code>
            <button
              type="button"
              onClick={copyCommand}
              className="shrink-0 text-muted hover:text-white transition-colors text-sm tracking-[-0.01em]"
            >
              {copied ? "Copied" : "Copy"}
            </button>
          </div>
          <Button href={cloneSection.github} className="mt-6">
            {cloneSection.cta}
          </Button>
        </motion.div>
      </Container>
    </section>
  );
}
