"use client";

import { useEffect, useRef } from "react";
import { useLocale } from "@/components/locale/LocaleProvider";

type TurnstileTheme = "light" | "dark";

type TurnstileApi = {
  render: (
    element: HTMLElement,
    options: {
      sitekey: string;
      theme?: TurnstileTheme | "auto";
      size?: "normal" | "compact" | "flexible";
      language?: string;
      callback?: (token: string) => void;
      "error-callback"?: () => void;
      "expired-callback"?: () => void;
    },
  ) => string;
  remove: (widgetId?: string) => void;
};

declare global {
  interface Window {
    turnstile?: TurnstileApi;
  }
}

const SCRIPT_ID = "cf-turnstile-api";
const TEST_SITE_KEY = "1x00000000000000000000AA";

function loadTurnstileScript() {
  if (typeof window === "undefined") return Promise.resolve();
  if (window.turnstile) return Promise.resolve();
  const existing = document.getElementById(SCRIPT_ID) as HTMLScriptElement | null;
  if (existing) {
    return new Promise<void>((resolve, reject) => {
      if (window.turnstile) {
        resolve();
        return;
      }
      existing.addEventListener("load", () => resolve(), { once: true });
      existing.addEventListener(
        "error",
        () => reject(new Error("Could not load Turnstile.")),
        { once: true },
      );
    });
  }
  return new Promise<void>((resolve, reject) => {
    const script = document.createElement("script");
    script.id = SCRIPT_ID;
    script.src =
      "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Could not load Turnstile."));
    document.head.appendChild(script);
  });
}

export function TurnstileWidget({
  onToken,
  theme = "dark",
  showLabel = false,
}: {
  onToken: (token: string) => void;
  theme?: TurnstileTheme;
  showLabel?: boolean;
}) {
  const { copy, locale } = useLocale();
  const hostRef = useRef<HTMLDivElement>(null);
  const widgetId = useRef<string | null>(null);
  const onTokenRef = useRef(onToken);
  onTokenRef.current = onToken;

  const siteKey =
    process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || TEST_SITE_KEY;

  useEffect(() => {
    let cancelled = false;

    async function mount() {
      try {
        await loadTurnstileScript();
        if (cancelled || !window.turnstile || widgetId.current) return;
        const el = hostRef.current;
        if (!el) return;
        widgetId.current = window.turnstile.render(el, {
          sitekey: siteKey,
          theme,
          size: "flexible",
          language: locale,
          callback: (token) => onTokenRef.current(token),
          "expired-callback": () => onTokenRef.current(""),
          "error-callback": () => onTokenRef.current(""),
        });
      } catch {
        onTokenRef.current("");
      }
    }

    void mount();

    return () => {
      cancelled = true;
      if (widgetId.current && window.turnstile) {
        try {
          window.turnstile.remove(widgetId.current);
        } catch {
          /* ignore */
        }
      }
      widgetId.current = null;
    };
  }, [locale, siteKey, theme]);

  return (
    <div className="mt-3 w-full min-w-0">
      {showLabel ? (
        <p
          className={`mb-1.5 text-sm font-semibold tracking-[-0.01em] ${
            theme === "light" ? "text-[#141414]" : "text-white"
          }`}
        >
          {copy.apiAuth.turnstileLabel}
        </p>
      ) : null}
      <div ref={hostRef} className="min-h-[65px] w-full" />
    </div>
  );
}
