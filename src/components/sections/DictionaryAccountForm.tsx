"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";

type Mode = "login" | "register";

export function DictionaryAccountForm({ mode }: { mode: Mode }) {
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
        setMessage(
          mode === "register"
            ? "Your dictionary account request is in. We'll be in touch."
            : "You're on the dictionary list. We'll be in touch.",
        );
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
        <p className="mt-6 text-green-400 text-base tracking-[-0.01em]">
          {message}
        </p>
      ) : (
        <form onSubmit={onSubmit} className="mt-6">
          <div className="flex flex-col sm:flex-row gap-4 sm:items-center">
            <input
              type="email"
              placeholder="Enter email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              disabled={status === "loading"}
              className="h-10 w-full sm:w-[285px] rounded-full border border-[#454545] bg-[#252525] px-4 text-base text-white placeholder-[#6e6e6e] tracking-[-0.01em] outline-none focus:border-[#666] disabled:opacity-50"
            />
            <Button type="submit" disabled={status === "loading"}>
              {status === "loading"
                ? "Sending…"
                : mode === "register"
                  ? "Create an account — It's free"
                  : "Log in"}
            </Button>
          </div>
          {status === "error" ? (
            <p className="mt-3 text-red-400 text-sm tracking-[-0.01em]">
              {message}
            </p>
          ) : null}
        </form>
      )}
    </>
  );
}
