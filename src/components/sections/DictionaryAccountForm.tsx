"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { TurnstileWidget } from "@/components/sections/TurnstileWidget";
import { useLocale } from "@/components/locale/LocaleProvider";

export function DictionaryAccountForm({
  surface = "connect",
}: {
  surface?: "connect";
}) {
  const { copy } = useLocale();
  const waitlist = copy.waitlist;
  const [email, setEmail] = useState("");
  const [turnstileToken, setTurnstileToken] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle",
  );
  const [message, setMessage] = useState("");

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!email.trim()) return;
    if (!turnstileToken) {
      setStatus("error");
      setMessage(copy.apiAuth.turnstileRequired);
      return;
    }

    setStatus("loading");
    setMessage("");

    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.trim(),
          source: surface,
          turnstileToken,
        }),
      });
      const data: { error?: string } = await response.json().catch(() => ({}));
      if (response.ok) {
        setStatus("success");
        setMessage(waitlist.successConnect);
        setEmail("");
        setTurnstileToken("");
        return;
      }
      setStatus("error");
      setMessage(data.error || waitlist.error);
    } catch {
      setStatus("error");
      setMessage(waitlist.error);
    }
  }

  return (
    <>
      {status === "success" ? (
        <p className="mt-6 text-white/80 text-base tracking-[-0.01em]">
          {message}
        </p>
      ) : (
        <form onSubmit={onSubmit} className="mt-8">
          <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
            <input
              type="email"
              placeholder={waitlist.emailPlaceholder}
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
              {status === "loading" ? waitlist.joining : waitlist.joinCta}
            </Button>
          </div>
          <div className="mt-3">
            <TurnstileWidget onToken={setTurnstileToken} />
          </div>
          {status === "error" ? (
            <p className="mt-3 text-muted text-sm tracking-[-0.01em]">
              {message}
            </p>
          ) : null}
        </form>
      )}
    </>
  );
}
