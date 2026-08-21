"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";

type SessionState = {
  authenticated: boolean;
  email?: string;
  key_prefix?: string | null;
};

export function ApiDashboard() {
  const router = useRouter();
  const [session, setSession] = useState<SessionState | null>(null);
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [message, setMessage] = useState("");
  const [issuedKey, setIssuedKey] = useState("");

  useEffect(() => {
    let active = true;
    fetch("/api/auth/session")
      .then((response) => response.json())
      .then((data: SessionState) => {
        if (!active) return;
        if (!data.authenticated) {
          router.replace("/api/login");
          return;
        }
        setSession(data);
      })
      .catch(() => {
        if (!active) return;
        router.replace("/api/login");
      });
    return () => {
      active = false;
    };
  }, [router]);

  async function issueKey() {
    setStatus("loading");
    setMessage("");
    try {
      const response = await fetch("/api/keys", { method: "POST" });
      const data: { key?: string; prefix?: string; error?: string } =
        await response.json().catch(() => ({}));
      if (!response.ok || !data.key) {
        setStatus("error");
        setMessage(data.error || "The API could not issue a key.");
        return;
      }
      setIssuedKey(data.key);
      setSession((current) =>
        current
          ? {
              ...current,
              key_prefix: data.prefix || data.key?.slice(0, 16) || null,
            }
          : current,
      );
      setStatus("idle");
    } catch {
      setStatus("error");
      setMessage("The API could not issue a key.");
    }
  }

  async function signOut() {
    await fetch("/api/auth/session", { method: "DELETE" });
    router.push("/api");
    router.refresh();
  }

  if (!session?.authenticated) {
    return (
      <div className="mt-10 max-w-[640px]">
        <p className="text-muted text-base tracking-[-0.01em]">Opening dashboard…</p>
      </div>
    );
  }

  return (
    <div id="dashboard" className="mt-10 max-w-[720px]">
      <div className="rounded-2xl border border-border bg-surface px-6 py-7 sm:px-8 sm:py-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-muted text-sm tracking-[-0.01em]">Dashboard</p>
            <h2 className="mt-2 font-heading text-white text-2xl sm:text-3xl tracking-[-0.02em]">
              API Platform
            </h2>
            <p className="mt-2 text-muted text-base tracking-[-0.01em]">
              Signed in as {session.email}
            </p>
          </div>
          <Button variant="outline" size="sm" onClick={signOut} className="w-fit">
            Sign out
          </Button>
        </div>

        <div className="mt-8 border-t border-border pt-6">
          <p className="text-white font-heading text-lg tracking-[-0.02em]">
            Your API key
          </p>
          <p className="mt-2 text-muted text-base leading-7 tracking-[-0.01em]">
            Shown once when you create or replace it.
          </p>

          {session.key_prefix && !issuedKey ? (
            <p className="mt-4 text-white text-sm tracking-[-0.01em]">
              Active key prefix:{" "}
              <code className="text-white">{session.key_prefix}…</code>
            </p>
          ) : null}

          {issuedKey ? (
            <div className="mt-5">
              <label className="text-muted text-sm tracking-[-0.01em]">
                Copy this key now
              </label>
              <input
                readOnly
                value={issuedKey}
                className="field mt-2 w-full"
              />
              <p className="mt-3 text-muted text-sm leading-6 tracking-[-0.01em]">
                <a
                  href="/docs/api-reference#authentication"
                  className="text-white hover:text-white/70"
                >
                  How to use this key
                </a>
              </p>
            </div>
          ) : null}

          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <Button
              type="button"
              onClick={issueKey}
              disabled={status === "loading"}
              className="w-full sm:w-auto"
            >
              {status === "loading"
                ? "Issuing…"
                : session.key_prefix || issuedKey
                  ? "Replace API key"
                  : "Get API key"}
            </Button>
            <Button href="#try" variant="outline" className="w-full sm:w-auto">
              Try the API
            </Button>
          </div>

          {status === "error" ? (
            <p className="mt-3 text-muted text-sm tracking-[-0.01em]">{message}</p>
          ) : null}
        </div>
      </div>
    </div>
  );
}
