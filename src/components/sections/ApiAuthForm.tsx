"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { GlobeWireframe } from "@/components/sections/GlobeWireframe";
import { TurnstileWidget } from "@/components/sections/TurnstileWidget";
import { APP_STORE_URL } from "@/lib/catalog";
import { nav } from "@/lib/constants";

type Mode = "login" | "register";

const REMEMBER_EMAIL_KEY = "fv_api_remember_email";

const fieldClass =
  "mt-1.5 h-9 w-full rounded-md border border-[#cfcfcf] bg-white px-3 text-[14px] tracking-[-0.01em] text-[#141414] outline-none transition-[border-color,box-shadow] placeholder:text-[#9a9a9a] hover:border-[#b0b0b0] focus:border-[#2563eb] focus:shadow-[0_0_0_3px_rgba(37,99,235,0.18)] disabled:opacity-50";

const fieldErrorClass =
  "mt-1.5 h-9 w-full rounded-md border border-[#e11d48] bg-white px-3 text-[14px] tracking-[-0.01em] text-[#141414] outline-none focus:border-[#e11d48] focus:shadow-[0_0_0_3px_rgba(225,29,72,0.15)] disabled:opacity-50";

function ExternalArrow() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      aria-hidden="true"
      className="ml-1.5"
    >
      <path
        d="M3.5 8.5L8.5 3.5M8.5 3.5H4.5M8.5 3.5V7.5"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <p role="alert" className="mt-1 text-[12px] tracking-[-0.01em] text-[#b42318]">
      {message}
    </p>
  );
}

export function ApiAuthForm({ mode }: { mode: Mode }) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [registrationCode, setRegistrationCode] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [turnstileToken, setTurnstileToken] = useState("");
  const [remember, setRemember] = useState(true);
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [codeStatus, setCodeStatus] = useState<
    "idle" | "loading" | "ok" | "error"
  >("idle");
  const [codeMessage, setCodeMessage] = useState("");
  const [message, setMessage] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(REMEMBER_EMAIL_KEY);
      if (saved) {
        setEmail(saved);
        setRemember(true);
      }
    } catch {
      /* ignore */
    }
  }, []);

  async function applyRegistrationCode() {
    setCodeStatus("loading");
    setCodeMessage("");
    try {
      const response = await fetch("/api/auth/register", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ registrationCode }),
      });
      const data: { error?: string } = await response.json().catch(() => ({}));
      if (!response.ok) {
        setCodeStatus("error");
        setCodeMessage(data.error || "That registration code is not valid.");
        return;
      }
      setCodeStatus("ok");
      setCodeMessage("Registration code applied.");
    } catch {
      setCodeStatus("error");
      setCodeMessage("Could not check that registration code.");
    }
  }

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setMessage("");
    setFieldErrors({});

    const nextErrors: Record<string, string> = {};
    if (!email.trim()) nextErrors.email = "Email cannot be blank.";
    if (!password) nextErrors.password = "Password cannot be blank.";
    if (mode === "register") {
      if (!passwordConfirm) {
        nextErrors.passwordConfirm = "Repeat your password.";
      } else if (password !== passwordConfirm) {
        nextErrors.passwordConfirm = "Passwords do not match.";
      }
      if (!turnstileToken) {
        nextErrors.turnstile = "Complete the human verification challenge.";
      }
    }
    if (Object.keys(nextErrors).length > 0) {
      setFieldErrors(nextErrors);
      setStatus("error");
      return;
    }

    try {
      const endpoint =
        mode === "register" ? "/api/auth/register" : "/api/auth/session";
      const body =
        mode === "register"
          ? {
              email: email.trim(),
              password,
              passwordConfirm,
              registrationCode: registrationCode.trim(),
              turnstileToken,
              remember,
            }
          : {
              email: email.trim(),
              password,
              remember,
            };

      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data: { error?: string; field?: string } = await response
        .json()
        .catch(() => ({}));
      if (!response.ok) {
        setStatus("error");
        if (data.field) {
          setFieldErrors({ [data.field]: data.error || "Invalid value." });
        }
        setMessage(data.error || "Could not continue.");
        return;
      }
      try {
        if (remember) {
          window.localStorage.setItem(
            REMEMBER_EMAIL_KEY,
            email.trim().toLowerCase(),
          );
        } else {
          window.localStorage.removeItem(REMEMBER_EMAIL_KEY);
        }
      } catch {
        /* ignore */
      }
      router.push("/api#dashboard");
      router.refresh();
    } catch {
      setStatus("error");
      setMessage(
        mode === "register"
          ? "Could not create an account."
          : "Could not sign in.",
      );
    }
  }

  return (
    <form onSubmit={onSubmit} className="mt-4 w-full" noValidate>
      <label
        htmlFor="api-auth-email"
        className="block text-[12px] font-semibold tracking-[-0.01em] text-[#141414]"
      >
        {mode === "register" ? "Work email" : "Email"}{" "}
        {mode === "register" ? (
          <span className="text-[#e11d48]" aria-hidden="true">
            *
          </span>
        ) : null}
      </label>
      <input
        id="api-auth-email"
        type="email"
        placeholder="name@company.com"
        required
        autoFocus
        autoComplete="email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        disabled={status === "loading"}
        aria-invalid={Boolean(fieldErrors.email)}
        className={fieldErrors.email ? fieldErrorClass : fieldClass}
      />
      <FieldError message={fieldErrors.email} />

      {mode === "register" ? (
        <>
          <label
            htmlFor="api-auth-code"
            className="mt-3 block text-[12px] font-semibold tracking-[-0.01em] text-[#141414]"
          >
            Registration code
          </label>
          <div className="mt-1.5 flex overflow-hidden rounded-md border border-[#cfcfcf] focus-within:border-[#2563eb] focus-within:shadow-[0_0_0_3px_rgba(37,99,235,0.18)]">
            <input
              id="api-auth-code"
              type="text"
              autoComplete="off"
              placeholder="Optional"
              value={registrationCode}
              onChange={(event) => {
                setRegistrationCode(event.target.value);
                setCodeStatus("idle");
                setCodeMessage("");
              }}
              disabled={status === "loading" || codeStatus === "loading"}
              className="h-9 min-w-0 flex-1 border-0 bg-white px-3 text-[14px] tracking-[-0.01em] text-[#141414] outline-none placeholder:text-[#9a9a9a] disabled:opacity-50"
            />
            <button
              type="button"
              onClick={applyRegistrationCode}
              disabled={
                status === "loading" ||
                codeStatus === "loading" ||
                !registrationCode.trim()
              }
              className="shrink-0 border-l border-[#cfcfcf] bg-[#f7f7f7] px-3 text-[12px] font-medium tracking-[-0.01em] text-[#141414] transition-colors hover:bg-[#efefef] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {codeStatus === "loading" ? "…" : "Apply"}
            </button>
          </div>
          {codeMessage ? (
            <p
              className={`mt-1 text-[12px] tracking-[-0.01em] ${
                codeStatus === "ok" ? "text-[#177245]" : "text-[#b42318]"
              }`}
            >
              {codeMessage}
            </p>
          ) : null}

          <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div>
              <label
                htmlFor="api-auth-password"
                className="block text-[12px] font-semibold tracking-[-0.01em] text-[#141414]"
              >
                Password{" "}
                <span className="text-[#e11d48]" aria-hidden="true">
                  *
                </span>
              </label>
              <input
                id="api-auth-password"
                type="password"
                required
                autoComplete="new-password"
                placeholder="12+ · number · symbol"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                disabled={status === "loading"}
                aria-invalid={Boolean(fieldErrors.password)}
                className={fieldErrors.password ? fieldErrorClass : fieldClass}
              />
              <FieldError message={fieldErrors.password} />
            </div>
            <div>
              <label
                htmlFor="api-auth-password-confirm"
                className="block text-[12px] font-semibold tracking-[-0.01em] text-[#141414]"
              >
                Repeat password{" "}
                <span className="text-[#e11d48]" aria-hidden="true">
                  *
                </span>
              </label>
              <input
                id="api-auth-password-confirm"
                type="password"
                required
                autoComplete="new-password"
                value={passwordConfirm}
                onChange={(event) => setPasswordConfirm(event.target.value)}
                disabled={status === "loading"}
                aria-invalid={Boolean(fieldErrors.passwordConfirm)}
                className={
                  fieldErrors.passwordConfirm ? fieldErrorClass : fieldClass
                }
              />
              <FieldError message={fieldErrors.passwordConfirm} />
            </div>
          </div>

          <TurnstileWidget onToken={setTurnstileToken} />
          <FieldError message={fieldErrors.turnstile} />

          <p className="mt-3 text-[11px] leading-4 tracking-[-0.01em] text-[#8a8a8a]">
            By creating an account you agree to the{" "}
            <a href="/legal" className="underline underline-offset-2">
              terms
            </a>
            ,{" "}
            <a href="/legal#privacy" className="underline underline-offset-2">
              privacy policy
            </a>
            , and{" "}
            <a href="/legal#eula" className="underline underline-offset-2">
              EULA
            </a>
            .
          </p>
        </>
      ) : (
        <>
          <label
            htmlFor="api-auth-password"
            className="mt-3 block text-[12px] font-semibold tracking-[-0.01em] text-[#141414]"
          >
            Password
          </label>
          <input
            id="api-auth-password"
            type="password"
            required
            autoComplete="current-password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            disabled={status === "loading"}
            aria-invalid={Boolean(fieldErrors.password)}
            className={fieldErrors.password ? fieldErrorClass : fieldClass}
          />
          <FieldError message={fieldErrors.password} />

          <label className="mt-3 flex items-start gap-2 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={remember}
              onChange={(event) => setRemember(event.target.checked)}
              className="mt-[2px] h-3.5 w-3.5 shrink-0 rounded-[3px] border border-[#c8c8c8] accent-[#141414]"
            />
            <span className="text-[12px] leading-4 tracking-[-0.01em] text-[#4a4a4a]">
              Save email and stay signed in on this device
            </span>
          </label>
        </>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="mt-4 inline-flex h-9 w-full items-center justify-center rounded-md bg-[#2563eb] px-5 text-[14px] font-medium tracking-[-0.01em] text-white transition-colors hover:bg-[#1d4ed8] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563eb]/35 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {status === "loading"
          ? mode === "register"
            ? "Creating account…"
            : "Signing in…"
          : mode === "register"
            ? "Create account"
            : "Sign in"}
      </button>

      {status === "error" && message && !Object.keys(fieldErrors).length ? (
        <p
          role="alert"
          className="mt-2 rounded-md border border-[#f3c1bd] bg-[#fff5f4] px-3 py-1.5 text-[12px] tracking-[-0.01em] text-[#b42318]"
        >
          {message}
        </p>
      ) : null}
    </form>
  );
}

export function ApiAuthScreen({ mode }: { mode: Mode }) {
  const isLogin = mode === "login";

  return (
    <div className="fixed inset-0 z-40 overflow-hidden grid bg-white text-[#141414] lg:grid-cols-2">
      <section className="relative flex h-full min-h-0 flex-col overflow-hidden px-5 py-4 sm:px-8 lg:px-12 xl:px-16">
        <div className="flex shrink-0 items-center justify-between gap-4">
          <a
            href="/"
            aria-label="Open Knowledge home"
            className="inline-flex items-center gap-2.5 rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#141414]/20"
          >
            <Image
              src="/images/logo-icon.png"
              alt=""
              width={512}
              height={512}
              priority
              quality={100}
              sizes="28px"
              className="h-7 w-7 invert"
            />
          </a>
          <a
            href={isLogin ? "/api/register" : "/api/login"}
            className="inline-flex h-8 items-center rounded-full border border-[#d8d8d8] bg-white px-3.5 text-[13px] tracking-[-0.01em] text-[#141414] transition-colors hover:border-[#b8b8b8] hover:bg-[#f7f7f7] lg:hidden"
          >
            {isLogin ? "Sign up" : "Sign in"}
          </a>
        </div>

        <div className="flex min-h-0 flex-1 flex-col justify-center py-2">
          <div className="mx-auto w-full max-w-[28rem]">
            <p className="text-[11px] font-medium uppercase tracking-[0.08em] text-[#8a8a8a]">
              API Platform
            </p>
            <h1 className="mt-1.5 font-heading text-[1.55rem] tracking-[-0.03em] leading-[1.15] text-[#141414] sm:text-[1.85rem]">
              {isLogin ? "Sign in to API Platform" : "Create your API account"}
            </h1>
            {isLogin ? (
              <p className="mt-1.5 text-[13px] leading-5 tracking-[-0.01em] text-[#5c5c5c]">
                Use your email and password to open the dashboard.
              </p>
            ) : null}

            <ApiAuthForm mode={mode} />

            <p className="mt-3 text-center text-[13px] tracking-[-0.01em] text-[#5c5c5c]">
              {isLogin ? (
                <>
                  Don&apos;t have an account?{" "}
                  <a
                    href="/api/register"
                    className="font-medium text-[#2563eb] hover:text-[#1d4ed8]"
                  >
                    Sign up
                  </a>
                </>
              ) : (
                <>
                  Already have an account?{" "}
                  <a
                    href="/api/login"
                    className="font-medium text-[#2563eb] hover:text-[#1d4ed8]"
                  >
                    Sign in
                  </a>
                </>
              )}
              {" · "}
              <a
                href="/docs"
                className="font-medium text-[#2563eb] hover:text-[#1d4ed8]"
              >
                Docs
              </a>
            </p>

            {isLogin ? (
              <p className="mt-3 text-center text-[11px] leading-4 tracking-[-0.01em] text-[#8a8a8a]">
                By continuing, you agree to the{" "}
                <a href="/legal" className="underline underline-offset-2">
                  terms
                </a>
                ,{" "}
                <a
                  href="/legal#privacy"
                  className="underline underline-offset-2"
                >
                  privacy policy
                </a>
                , and{" "}
                <a href="/legal#eula" className="underline underline-offset-2">
                  EULA
                </a>
                .
              </p>
            ) : null}
          </div>
        </div>
      </section>

      <aside className="relative hidden h-full overflow-hidden bg-[#141414] text-white lg:flex lg:flex-col">
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-55">
          <div className="aspect-square w-[118%] max-w-none translate-x-[12%] translate-y-[4%]">
            <GlobeWireframe />
          </div>
        </div>
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#141414] via-[#141414]/55 to-transparent" />

        <div className="relative z-10 flex items-center justify-end gap-3 px-8 py-5 xl:px-10">
          <Button
            href={APP_STORE_URL}
            size="sm"
            className="rounded-full bg-white text-[#141414] hover:bg-white/90 focus-visible:ring-offset-[#141414] gap-1.5"
          >
            {nav.cta}
            <ExternalArrow />
          </Button>
        </div>

        <div className="relative z-10 flex flex-1 flex-col justify-center px-10 pb-12 xl:px-14">
          <p className="text-[13px] tracking-[-0.01em] text-white/65">
            ForroVivo Linguistic Research API
          </p>
          <h2
            className="mt-3 max-w-[13ch] font-heading tracking-[-0.03em] leading-[1.08]"
            style={{ fontSize: "clamp(2rem, 3.6vw, 3.1rem)" }}
          >
            Where attested Forro data becomes callable.
          </h2>
          <div className="mt-6">
            <Button
              href="/docs"
              variant="outline"
              className="rounded-full border-white/25 bg-transparent text-white hover:border-white/45 hover:bg-white/5"
            >
              Documentation
            </Button>
          </div>
        </div>
      </aside>
    </div>
  );
}
