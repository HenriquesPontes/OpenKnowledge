"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { hero } from "@/lib/constants";

type Status = "idle" | "loading" | "success" | "error";

export function Hero() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  async function handleWaitlist(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!email.trim()) return;

    setStatus("loading");
    setMessage("");

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), source: "home" }),
      });

      const data = await res.json();

      if (res.ok) {
        setStatus("success");
        setMessage("You're on the list. We'll be in touch.");
        setEmail("");
      } else {
        setStatus("error");
        setMessage(data.error || "Something went wrong. Please try again.");
      }
    } catch {
      setStatus("error");
      setMessage("Something went wrong. Please try again.");
    }
  }

  return (
    <section
      id="waitlist"
      className="pt-24 pb-8 sm:pt-36 sm:pb-12 lg:pt-44 lg:pb-12"
    >
      <Container>
        <motion.div
          className="max-w-[593px]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <h1
            className="font-heading text-white tracking-[-0.03em] leading-[1.05]"
            style={{ fontSize: "clamp(1.85rem, 8vw, 4.5rem)" }}
          >
            {hero.headline}
          </h1>
          <p className="mt-4 text-muted text-base sm:text-lg lg:text-[21px] tracking-[-0.01em] leading-relaxed">
            {hero.subheadline}
          </p>

          {status === "success" ? (
            <p className="mt-6 text-white/80 text-base tracking-[-0.01em]">
              {message}
            </p>
          ) : (
            <form onSubmit={handleWaitlist} className="mt-8">
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-3 sm:items-center">
                <input
                  type="email"
                  placeholder={hero.waitlistPlaceholder}
                  required
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={status === "loading"}
                  className="field w-full sm:w-[280px]"
                />
                <Button type="submit" disabled={status === "loading"} className="w-fit">
                  {status === "loading" ? "Joining…" : hero.waitlistCta}
                </Button>
              </div>
              {status === "error" && (
                <p className="mt-3 text-muted text-sm tracking-[-0.01em]">
                  {message}
                </p>
              )}
            </form>
          )}
        </motion.div>
      </Container>
    </section>
  );
}
