"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { TurnstileWidget } from "@/components/sections/TurnstileWidget";
import { useLocale } from "@/components/locale/LocaleProvider";

type Status = "idle" | "loading" | "success" | "error";

export function Hero() {
  const { copy } = useLocale();
  const hero = copy.hero;
  const [email, setEmail] = useState("");
  const [turnstileToken, setTurnstileToken] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  async function handleWaitlist(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!email.trim()) return;
    if (!turnstileToken) {
      setStatus("error");
      setMessage(copy.apiAuth.turnstileRequired);
      return;
    }

    setStatus("loading");
    setMessage("");

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.trim(),
          source: "home",
          turnstileToken,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setStatus("success");
        setMessage(hero.success);
        setEmail("");
        setTurnstileToken("");
      } else {
        setStatus("error");
        setMessage(data.error || hero.error);
      }
    } catch {
      setStatus("error");
      setMessage(hero.error);
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
                  onChange={(event) => setEmail(event.target.value)}
                  disabled={status === "loading"}
                  className="field w-full sm:w-[280px]"
                />
                <Button
                  type="submit"
                  disabled={status === "loading"}
                  className="w-fit"
                >
                  {status === "loading" ? hero.joining : hero.waitlistCta}
                </Button>
              </div>
              <TurnstileWidget onToken={setTurnstileToken} />
              {status === "error" ? (
                <p className="mt-3 text-muted text-sm tracking-[-0.01em]">
                  {message}
                </p>
              ) : null}
            </form>
          )}
        </motion.div>
      </Container>
    </section>
  );
}
