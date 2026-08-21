"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { GlobeWireframe } from "@/components/sections/GlobeWireframe";
import { TurnstileWidget } from "@/components/sections/TurnstileWidget";
import { useLocale } from "@/components/locale/LocaleProvider";
import { APP_STORE_URL } from "@/lib/catalog";
import { nav } from "@/lib/constants";

type Mode = "login" | "register";

const REMEMBER_EMAIL_KEY = "fv_api_remember_email";

const fieldClass =
  "mt-1.5 h-9 w-full rounded-md border border-[#cfcfcf] bg-white px-3 text-sm tracking-[-0.01em] text-[#141414] outline-none transition-[border-color,box-shadow] placeholder:text-[#9a9a9a] hover:border-[#b0b0b0] focus:border-[#2563eb] focus:shadow-[0_0_0_3px_rgba(37,99,235,0.18)] disabled:opacity-50";

const fieldErrorClass =
  "mt-1.5 h-9 w-full rounded-md border border-[#e11d48] bg-white px-3 text-sm tracking-[-0.01em] text-[#141414] outline-none focus:border-[#e11d48] focus:shadow-[0_0_0_3px_rgba(225,29,72,0.15)] disabled:opacity-50";

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
    <p role="alert" className="mt-1 text-sm tracking-[-0.01em] text-[#b42318]">
      {message}
    </p>
  );
}

export function ApiAuthForm({ mode }: { mode: Mode }) {
  const router = useRouter();
  const { copy } = useLocale();
  const t = copy.apiAuth;
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
        setCodeMessage(data.error || t.invalidValue);
        return;
      }
      setCodeStatus("ok");
      setCodeMessage("");
    } catch {
      setCodeStatus("error");
      setCodeMessage(t.couldNotContinue);
    }
  }

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setMessage("");
    setFieldErrors({});

    const nextErrors: Record<string, string> = {};
    if (!email.trim()) nextErrors.email = t.emailRequired;
    if (!password) nextErrors.password = t.passwordRequired;
    if (mode === "register") {
      if (!passwordConfirm) {
        nextErrors.passwordConfirm = t.repeatPassword;
      } else if (password !== passwordConfirm) {
        nextErrors.passwordConfirm = t.passwordMismatch;
      }
      if (!registrationCode.trim()) {
        nextErrors.registrationCode = t.registrationCodeRequired;
      }
    }
    if (!turnstileToken) {
      nextErrors.turnstile = t.turnstileRequired;
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
              turnstileToken,
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
          setFieldErrors({ [data.field]: data.error || t.invalidValue });
        }
        setMessage(data.error || t.couldNotContinue);
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
        mode === "register" ? t.couldNotCreate : t.couldNotSignIn,
      );
    }
  }

  return (
    <form onSubmit={onSubmit} className="mt-4 w-full" noValidate>
      <label
        htmlFor="api-auth-email"
        className="block text-sm font-semibold tracking-[-0.01em] text-[#141414]"
      >
        {mode === "register" ? t.workEmail : t.email}{" "}
        {mode === "register" ? (
          <span className="text-[#e11d48]" aria-hidden="true">
            *
          </span>
        ) : null}
      </label>
      <input
        id="api-auth-email"
        type="email"
        placeholder={t.placeholderEmail}
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
            className="mt-3 block text-sm font-semibold tracking-[-0.01em] text-[#141414]"
          >
            {t.registrationCode}{" "}
            <span className="text-[#e11d48]" aria-hidden="true">
              *
            </span>
          </label>
          <div className="mt-1.5 flex overflow-hidden rounded-md border border-[#cfcfcf] focus-within:border-[#2563eb] focus-within:shadow-[0_0_0_3px_rgba(37,99,235,0.18)]">
            <input
              id="api-auth-code"
              type="text"
              autoComplete="off"
              placeholder={t.registrationCodeRequired}
              value={registrationCode}
              onChange={(event) => {
                setRegistrationCode(event.target.value);
                setCodeStatus("idle");
                setCodeMessage("");
              }}
              disabled={status === "loading" || codeStatus === "loading"}
              className="h-9 min-w-0 flex-1 border-0 bg-white px-3 text-sm tracking-[-0.01em] text-[#141414] outline-none placeholder:text-[#9a9a9a] disabled:opacity-50"
              aria-invalid={Boolean(fieldErrors.registrationCode)}
            />
            <button
              type="button"
              onClick={applyRegistrationCode}
              disabled={
                status === "loading" ||
                codeStatus === "loading" ||
                !registrationCode.trim()
              }
              className="shrink-0 border-l border-[#cfcfcf] bg-[#f7f7f7] px-3 text-sm font-medium tracking-[-0.01em] text-[#141414] transition-colors hover:bg-[#efefef] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {codeStatus === "loading" ? "…" : t.apply}
            </button>
          </div>
          <FieldError message={fieldErrors.registrationCode} />
          {codeMessage ? (
            <p
              className={`mt-1 text-sm tracking-[-0.01em] ${
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
                className="block text-sm font-semibold tracking-[-0.01em] text-[#141414]"
              >
                {t.password}{" "}
                <span className="text-[#e11d48]" aria-hidden="true">
                  *
                </span>
              </label>
              <input
                id="api-auth-password"
                type="password"
                required
                autoComplete="new-password"
                placeholder={t.placeholderPassword}
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
                className="block text-sm font-semibold tracking-[-0.01em] text-[#141414]"
              >
                {t.repeatPassword}{" "}
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

          <p className="mt-3 text-xs leading-4 tracking-[-0.01em] text-[#8a8a8a]">
            {t.agreeCreate}
          </p>
        </>
      ) : (
        <>
          <label
            htmlFor="api-auth-password"
            className="mt-3 block text-sm font-semibold tracking-[-0.01em] text-[#141414]"
          >
            {t.password}
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

          <div className="mt-3">
            <TurnstileWidget onToken={setTurnstileToken} />
            <FieldError message={fieldErrors.turnstile} />
          </div>

          <label className="mt-3 flex items-start gap-2 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={remember}
              onChange={(event) => setRemember(event.target.checked)}
              className="mt-[2px] h-3.5 w-3.5 shrink-0 rounded-[3px] border border-[#c8c8c8] accent-[#141414]"
            />
            <span className="text-sm leading-4 tracking-[-0.01em] text-[#4a4a4a]">
              {t.staySignedIn}
            </span>
          </label>
        </>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="mt-4 inline-flex h-9 w-full items-center justify-center rounded-md bg-[#2563eb] px-5 text-sm font-medium tracking-[-0.01em] text-white transition-colors hover:bg-[#1d4ed8] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563eb]/35 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {status === "loading"
          ? mode === "register"
            ? t.creating
            : t.signingIn
          : mode === "register"
            ? t.createAccount
            : t.signIn}
      </button>

      {status === "error" && message && !Object.keys(fieldErrors).length ? (
        <p
          role="alert"
          className="mt-2 rounded-md border border-[#f3c1bd] bg-[#fff5f4] px-3 py-1.5 text-sm tracking-[-0.01em] text-[#b42318]"
        >
          {message}
        </p>
      ) : null}
    </form>
  );
}

export function ApiAuthScreen({ mode }: { mode: Mode }) {
  const { copy } = useLocale();
  const t = copy.apiAuth;
  const isLogin = mode === "login";

  return (
    <div className="fixed inset-0 z-40 overflow-hidden grid bg-white text-[#141414] lg:grid-cols-2">
      <section className="relative flex h-full min-h-0 flex-col overflow-hidden px-5 py-4 sm:px-8 lg:px-12 xl:px-16">
        <div className="flex shrink-0 items-center justify-between gap-4">
          <a
            href="/"
            aria-label={t.home}
            className="inline-flex items-center gap-2.5 rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#141414]/20"
          >
            <Image
              src="/images/app/forro-icon.png"
              alt=""
              width={512}
              height={512}
              priority
              quality={100}
              sizes="28px"
              className="h-7 w-7"
            />
          </a>
          <a
            href={isLogin ? "/api/register" : "/api/login"}
            className="inline-flex h-8 items-center rounded-full border border-[#d8d8d8] bg-white px-3.5 text-sm tracking-[-0.01em] text-[#141414] transition-colors hover:border-[#b8b8b8] hover:bg-[#f7f7f7] lg:hidden"
          >
            {isLogin ? t.signUp : t.signIn}
          </a>
        </div>

        <div className="flex min-h-0 flex-1 flex-col justify-center py-2">
          <div className="mx-auto w-full max-w-[28rem]">
            <p className="text-xs font-medium uppercase tracking-[0.08em] text-[#8a8a8a]">
              {t.platformTitle}
            </p>
            <h1 className="mt-1.5 font-heading text-[1.55rem] tracking-[-0.03em] leading-[1.15] text-[#141414] sm:text-[1.85rem]">
              {isLogin ? t.signInTitle : t.createTitle}
            </h1>
            {isLogin ? (
              <p className="mt-1.5 text-sm leading-5 tracking-[-0.01em] text-[#5c5c5c]">
                {t.subtitle}
              </p>
            ) : null}

            <ApiAuthForm mode={mode} />

            <p className="mt-3 text-center text-sm tracking-[-0.01em] text-[#5c5c5c]">
              {isLogin ? (
                <>
                  {t.noAccount}{" "}
                  <a
                    href="/api/register"
                    className="font-medium text-[#2563eb] hover:text-[#1d4ed8]"
                  >
                    {t.signUp}
                  </a>
                </>
              ) : (
                <>
                  {t.haveAccount}{" "}
                  <a
                    href="/api/login"
                    className="font-medium text-[#2563eb] hover:text-[#1d4ed8]"
                  >
                    {t.signIn}
                  </a>
                </>
              )}
              {" · "}
              <a
                href="/docs"
                className="font-medium text-[#2563eb] hover:text-[#1d4ed8]"
              >
                {t.docs}
              </a>
            </p>

            {isLogin ? (
              <p className="mt-3 text-center text-xs leading-4 tracking-[-0.01em] text-[#8a8a8a]">
                {t.agreeLogin}
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
          <p className="text-sm tracking-[-0.01em] text-white/65">
            {t.marketingBody}
          </p>
          <h2
            className="mt-3 max-w-[13ch] font-heading tracking-[-0.03em] leading-[1.08]"
            style={{ fontSize: "clamp(2rem, 3.6vw, 3.1rem)" }}
          >
            {t.marketingTitle}
          </h2>
          <div className="mt-6">
            <Button
              href="/docs"
              variant="outline"
              className="rounded-full border-white/25 bg-transparent text-white hover:border-white/45 hover:bg-white/5"
            >
              {t.documentation}
            </Button>
          </div>
        </div>
      </aside>
    </div>
  );
}
