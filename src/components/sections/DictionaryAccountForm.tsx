"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";

type Mode = "login" | "register";
type Surface = "dictionary" | "api";

const SUCCESS: Record<Surface, Record<Mode, string>> = {
  dictionary: {
    login: "You're on the dictionary list. We'll be in touch.",
    register: "Your dictionary account request is in. We'll be in touch.",
  },
  api: {
    login: "You're on the API Platform list. We'll be in touch.",
    register: "Your API Platform account request is in. We'll be in touch.",
  },
};

export function DictionaryAccountForm({
  mode,
  surface = "dictionary",
}: {
  mode: Mode;
  surface?: Surface;
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
        body: JSON.stringify({ email: email.trim() }),
      });
      const data = await response.json();
      if (response.ok) {
        setStatus("success");
        setMessage(SUCCESS[surface][mode]);
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
            <Button type="submit" disabled={status === "loading"} className="w-full sm:w-auto">
              {status === "loading"
                ? "Sending…"
                : mode === "register"
                  ? "Create an account"
                  : "Log in"}
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
