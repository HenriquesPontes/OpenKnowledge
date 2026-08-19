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
        body: JSON.stringify({ email: email.trim() }),
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
            style={{ fontSize: "clamp(2.25rem, 6vw, 4.5rem)" }}
          >
            {hero.headline}
          </h1>
          <p className="mt-2 text-muted text-lg sm:text-[21px] tracking-[-0.01em] leading-normal">
            {hero.subheadline}
          </p>

          {status === "success" ? (
            <p className="mt-6 text-green-400 text-base tracking-[-0.01em]">
              {message}
            </p>
          ) : (
            <form onSubmit={handleWaitlist} className="mt-6">
              <div className="flex flex-col sm:flex-row gap-4 sm:items-center">
                <input
                  type="email"
                  placeholder={hero.waitlistPlaceholder}
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={status === "loading"}
                  className="h-10 w-full sm:w-[285px] rounded-full border border-[#454545] bg-[#252525] px-4 text-base text-white placeholder-[#6e6e6e] tracking-[-0.01em] outline-none focus:border-[#666] disabled:opacity-50"
                />
                <Button type="submit" disabled={status === "loading"} className="w-full sm:w-auto">
                  {status === "loading" ? "Joining..." : hero.waitlistCta}
                </Button>
              </div>
              {status === "error" && (
                <p className="mt-3 text-red-400 text-sm tracking-[-0.01em]">
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
