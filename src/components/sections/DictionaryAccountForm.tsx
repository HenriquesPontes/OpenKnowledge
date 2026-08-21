"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";

export function DictionaryAccountForm({
  surface = "connect",
}: {
  surface?: "connect";
}) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle",
  );
  const [message, setMessage] = useState("");

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!email.trim()) return;

    setStatus("loading");
    setMessage("");

    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), source: surface }),
      });
      const data: { error?: string } = await response.json().catch(() => ({}));
      if (response.ok) {
        setStatus("success");
        setMessage("You're on the Forro Connect waitlist. We'll be in touch.");
        setEmail("");
        return;
      }
      setStatus("error");
      setMessage(data.error || "Something went wrong. Please try again.");
    } catch {
      setStatus("error");
      setMessage("Something went wrong. Please try again.");
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
              placeholder="Email"
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
              {status === "loading" ? "Joining…" : "Join waitlist"}
            </Button>
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
