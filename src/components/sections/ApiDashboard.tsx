"use client";

import { useEffect, useState, type ReactNode } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { useLocale } from "@/components/locale/LocaleProvider";
import { API_ORIGIN } from "@/lib/catalog";
import type { SiteCopy } from "@/lib/i18n-copy";

export type DashboardDataset = {
  dataset: string;
  label: string;
};

export type DashboardSession = {
  authenticated: boolean;
  email?: string;
  key_prefix?: string | null;
  created_at?: string | null;
  signed_in_at?: string | null;
};

type Pane = "overview" | "keys" | "playground";
type ApiStatus = "checking" | "live" | "unreachable";
type Copy = SiteCopy["apiDashboard"];

function paneFromHash(hash: string): Pane {
  if (hash === "#try" || hash === "#playground") return "playground";
  if (hash === "#keys") return "keys";
  return "overview";
}

function hashForPane(pane: Pane) {
  if (pane === "keys") return "#keys";
  if (pane === "playground") return "#try";
  return "#dashboard";
}

function formatDate(value: string | null | undefined, locale: string) {
  if (!value) return null;
  const parsed = Date.parse(value);
  if (!Number.isFinite(parsed)) return null;
  return new Date(parsed).toLocaleDateString(locale, {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function StatusDot({ live }: { live: boolean }) {
  return (
    <span
      className={`inline-block h-2 w-2 rounded-full ${
        live ? "bg-[#5ee07a]" : "bg-muted"
      }`}
      aria-hidden="true"
    />
  );
}

function NavIcon({ d }: { d: string }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
      className="shrink-0"
    >
      <path
        d={d}
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const NAV_ICONS = {
  overview: "M2.5 8.5V13.5H6.5V8.5H2.5ZM9.5 2.5V13.5H13.5V2.5H9.5ZM2.5 2.5V6.5H6.5V2.5H2.5Z",
  keys: "M9.5 8.5L13.5 4.5M13.5 4.5L11.5 2.5M13.5 4.5L15.5 6.5M7.5 10.5C7.5 12.157 6.157 13.5 4.5 13.5C2.843 13.5 1.5 12.157 1.5 10.5C1.5 8.843 2.843 7.5 4.5 7.5C6.157 7.5 7.5 8.843 7.5 10.5Z",
  playground:
    "M3 3.5H13C13.276 3.5 13.5 3.724 13.5 4V12C13.5 12.276 13.276 12.5 13 12.5H3C2.724 12.5 2.5 12.276 2.5 12V4C2.5 3.724 2.724 3.5 3 3.5ZM5 6.5L7.5 8.5L5 10.5M8.5 10.5H11",
  docs: "M4.5 2.5H9.5L12.5 5.5V13.5H4.5V2.5ZM9.5 2.5V5.5H12.5",
} as const;

export function ApiDashboard({
  initialSession,
  datasets,
  playground,
}: {
  initialSession?: DashboardSession | null;
  datasets: DashboardDataset[];
  playground: ReactNode;
}) {
  const router = useRouter();
  const { locale, copy } = useLocale();
  const t = copy.apiDashboard;
  const dateLocale = locale === "pt" ? "pt-PT" : "en-GB";
  const [session, setSession] = useState<DashboardSession | null>(
    initialSession?.authenticated ? initialSession : null,
  );
  const [pane, setPane] = useState<Pane>("overview");
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [message, setMessage] = useState("");
  const [issuedKey, setIssuedKey] = useState("");
  const [copied, setCopied] = useState(false);
  const [apiStatus, setApiStatus] = useState<ApiStatus>("checking");

  useEffect(() => {
    const sync = () => setPane(paneFromHash(window.location.hash));
    sync();
    window.addEventListener("hashchange", sync);
    return () => window.removeEventListener("hashchange", sync);
  }, []);

  useEffect(() => {
    let active = true;
    fetch("/api/auth/session")
      .then((response) => response.json())
      .then((data: DashboardSession) => {
        if (!active) return;
        if (!data.authenticated) {
          router.replace("/api/login");
          return;
        }
        setSession(data);
      })
      .catch(() => {
        if (!active) return;
        if (!initialSession?.authenticated) {
          router.replace("/api/login");
        }
      });
    return () => {
      active = false;
    };
  }, [router, initialSession?.authenticated]);

  useEffect(() => {
    let active = true;
    fetch("/api/v1", { cache: "no-store" })
      .then((response) => {
        if (!active) return;
        setApiStatus(response.ok ? "live" : "unreachable");
      })
      .catch(() => {
        if (!active) return;
        setApiStatus("unreachable");
      });
    return () => {
      active = false;
    };
  }, []);

  function go(next: Pane) {
    const hash = hashForPane(next);
    window.history.replaceState(null, "", hash);
    setPane(next);
  }

  async function issueKey() {
    setStatus("loading");
    setMessage("");
    setCopied(false);
    try {
      const response = await fetch("/api/keys", { method: "POST" });
      const data: { key?: string; prefix?: string; error?: string } =
        await response.json().catch(() => ({}));
      if (!response.ok || !data.key) {
        setStatus("error");
        setMessage(data.error || t.issueFailed);
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
      go("keys");
    } catch {
      setStatus("error");
      setMessage(t.issueFailed);
    }
  }

  async function signOut() {
    await fetch("/api/auth/session", { method: "DELETE" });
    router.push("/api");
    router.refresh();
  }

  async function copyIssuedKey() {
    if (!issuedKey) return;
    try {
      await navigator.clipboard.writeText(issuedKey);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  }

  if (!session?.authenticated) {
    return (
      <div className="flex min-h-dvh items-center justify-center px-4">
        <p className="text-muted text-base tracking-[-0.01em]">{t.opening}</p>
      </div>
    );
  }

  const keyPrefix = session.key_prefix || null;
  const created = formatDate(session.created_at, dateLocale);
  const apiLabel =
    apiStatus === "live"
      ? t.live
      : apiStatus === "unreachable"
        ? t.unreachable
        : t.checkingApi;

  const navItems: Array<{ id: Pane; label: string; icon: keyof typeof NAV_ICONS }> =
    [
      { id: "overview", label: t.navOverview, icon: "overview" },
      { id: "keys", label: t.navKeys, icon: "keys" },
      { id: "playground", label: t.navPlayground, icon: "playground" },
    ];

  return (
    <div
      data-api-dashboard
      className="fixed inset-0 z-50 flex flex-col bg-background text-foreground"
    >
      <header className="flex h-14 shrink-0 items-center justify-between gap-3 border-b border-border px-4 sm:px-5">
        <div className="flex min-w-0 items-center gap-3">
          <a
            href="/"
            className="flex shrink-0 items-center rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/25"
            aria-label={copy.layout.homeAria}
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
          <div className="min-w-0">
            <p className="truncate text-sm text-white tracking-[-0.01em]">
              {t.platform}
            </p>
          </div>
          <span className="hidden rounded-full border border-border px-2 py-0.5 text-xs text-muted tracking-[-0.01em] sm:inline">
            {t.accessLabel}
          </span>
        </div>
        <div className="flex min-w-0 items-center gap-3">
          <p className="hidden truncate text-sm text-muted tracking-[-0.01em] md:block">
            {session.email}
          </p>
          <Button variant="outline" size="sm" onClick={signOut} className="shrink-0">
            {t.signOut}
          </Button>
        </div>
      </header>

      <div className="flex min-h-0 flex-1">
        <aside className="hidden w-[220px] shrink-0 flex-col border-r border-border lg:flex">
          <div className="flex-1 overflow-y-auto px-3 py-4">
            <a
              href="/"
              className="mb-4 inline-flex text-sm text-muted tracking-[-0.01em] transition-colors hover:text-white"
            >
              {t.backToSite}
            </a>
            <DashboardNav
              items={navItems}
              pane={pane}
              onSelect={go}
              t={t}
            />
          </div>
        </aside>

        <div className="flex min-w-0 flex-1 flex-col">
          <div className="border-b border-border px-4 py-2 lg:hidden">
            <DashboardNav
              items={navItems}
              pane={pane}
              onSelect={go}
              t={t}
              compact
            />
          </div>

          <div className="grid min-h-0 flex-1 lg:grid-cols-[minmax(0,1fr)_280px]">
            <section className="min-h-0 overflow-y-auto px-4 py-6 sm:px-6 lg:px-8">
              {pane === "overview" ? (
                <OverviewPane
                  t={t}
                  email={session.email ?? ""}
                  created={created}
                  keyPrefix={keyPrefix}
                  lexiconCount={datasets.length}
                  apiStatus={apiStatus}
                  apiLabel={apiLabel}
                  datasets={datasets}
                  onIssue={issueKey}
                  issuing={status === "loading"}
                  hasKey={Boolean(keyPrefix || issuedKey)}
                  onPlayground={() => go("playground")}
                  onKeys={() => go("keys")}
                />
              ) : null}

              {pane === "keys" ? (
                <KeysPane
                  t={t}
                  keyPrefix={keyPrefix}
                  issuedKey={issuedKey}
                  copied={copied}
                  status={status}
                  message={message}
                  onIssue={issueKey}
                  onCopy={copyIssuedKey}
                  onPlayground={() => go("playground")}
                />
              ) : null}

              {pane === "playground" ? (
                <div>
                  <p className="text-sm text-muted tracking-[-0.01em]">
                    {t.navPlayground}
                  </p>
                  <h1 className="mt-1 font-heading text-2xl text-white tracking-[-0.02em] sm:text-3xl">
                    {t.tryApi}
                  </h1>
                  <p className="mt-3 max-w-[40rem] text-base leading-7 text-muted tracking-[-0.01em]">
                    {t.playgroundBody}
                  </p>
                  <div className="mt-8">{playground}</div>
                </div>
              ) : null}
            </section>

            <aside className="hidden overflow-y-auto border-l border-border px-5 py-6 lg:block">
              <SideRail t={t} apiStatus={apiStatus} apiLabel={apiLabel} />
            </aside>
          </div>
        </div>
      </div>
    </div>
  );
}

function DashboardNav({
  items,
  pane,
  onSelect,
  t,
  compact = false,
}: {
  items: Array<{ id: Pane; label: string; icon: keyof typeof NAV_ICONS }>;
  pane: Pane;
  onSelect: (pane: Pane) => void;
  t: Copy;
  compact?: boolean;
}) {
  return (
    <nav aria-label={t.dashboard}>
      <ul
        className={
          compact
            ? "flex gap-1 overflow-x-auto"
            : "space-y-0.5"
        }
      >
        {items.map((item) => {
          const active = pane === item.id;
          return (
            <li key={item.id}>
              <button
                type="button"
                onClick={() => onSelect(item.id)}
                className={`flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-left text-sm tracking-[-0.01em] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/25 ${
                  compact ? "whitespace-nowrap" : ""
                } ${
                  active
                    ? "bg-surface-alt text-white"
                    : "text-muted hover:bg-surface hover:text-white"
                }`}
              >
                <NavIcon d={NAV_ICONS[item.icon]} />
                {item.label}
              </button>
            </li>
          );
        })}
        <li>
          <a
            href="/docs/api-reference"
            className={`flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm text-muted tracking-[-0.01em] transition-colors hover:bg-surface hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/25 ${
              compact ? "whitespace-nowrap" : ""
            }`}
          >
            <NavIcon d={NAV_ICONS.docs} />
            {t.navReference}
          </a>
        </li>
      </ul>
    </nav>
  );
}

function OverviewPane({
  t,
  email,
  created,
  keyPrefix,
  lexiconCount,
  apiStatus,
  apiLabel,
  datasets,
  onIssue,
  issuing,
  hasKey,
  onPlayground,
  onKeys,
}: {
  t: Copy;
  email: string;
  created: string | null;
  keyPrefix: string | null;
  lexiconCount: number;
  apiStatus: ApiStatus;
  apiLabel: string;
  datasets: DashboardDataset[];
  onIssue: () => void;
  issuing: boolean;
  hasKey: boolean;
  onPlayground: () => void;
  onKeys: () => void;
}) {
  return (
    <div>
      <p className="text-sm text-muted tracking-[-0.01em]">{t.navOverview}</p>
      <h1 className="mt-1 font-heading text-2xl text-white tracking-[-0.02em] sm:text-3xl">
        {t.platform}
      </h1>
      <p className="mt-3 max-w-[40rem] text-base leading-7 text-muted tracking-[-0.01em]">
        {t.monitorBody}
      </p>
      <div className="mt-5">
        <Button href="/docs/api-reference" variant="outline" size="sm">
          {t.reviewDocs}
        </Button>
      </div>

      <div className="mt-8 grid gap-3 sm:grid-cols-3">
        <StatCard label={t.account} value={email} hint={created ? `${t.memberSince} ${created}` : undefined} />
        <StatCard
          label={t.apiKey}
          value={keyPrefix ? `${keyPrefix}…` : t.noKeyYet}
          hint={keyPrefix ? t.keyActive : t.shownOnce}
          onClick={onKeys}
        />
        <StatCard
          label={t.lexicons}
          value={String(lexiconCount)}
          hint={t.isolatedHeading}
        />
      </div>

      <div className="mt-8 rounded-2xl border border-border bg-surface">
        <div className="flex flex-col gap-4 border-b border-border px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-heading text-lg text-white tracking-[-0.02em]">
              {t.quickStart}
            </p>
            <p className="mt-1 text-sm leading-6 text-muted tracking-[-0.01em]">
              {t.quickStartBody}
            </p>
          </div>
          <div className="flex flex-col gap-2 sm:flex-row">
            <Button
              type="button"
              size="sm"
              onClick={onIssue}
              disabled={issuing}
            >
              {issuing ? t.issuing : hasKey ? t.replaceKey : t.getKey}
            </Button>
            <Button type="button" variant="outline" size="sm" onClick={onPlayground}>
              {t.openPlayground}
            </Button>
          </div>
        </div>
        <div className="px-5 py-4">
          <p className="text-sm leading-6 text-muted tracking-[-0.01em]">
            {t.authBody}{" "}
            <a
              href="/docs/api-reference#authentication"
              className="text-white hover:text-white/70"
            >
              {t.howToUse}
            </a>
          </p>
        </div>
      </div>

      <div className="mt-8 rounded-2xl border border-border bg-surface">
        <div className="border-b border-border px-5 py-4">
          <p className="font-heading text-lg text-white tracking-[-0.02em]">
            {t.isolatedHeading}
          </p>
          <p className="mt-1 text-sm leading-6 text-muted tracking-[-0.01em]">
            {t.isolatedBody}
          </p>
        </div>
        <ul className="max-h-[22rem] divide-y divide-border overflow-y-auto">
          {datasets.map((item) => (
            <li
              key={item.dataset}
              className="flex flex-col gap-1 px-5 py-3 sm:flex-row sm:items-center sm:justify-between"
            >
              <p className="text-sm text-white tracking-[-0.01em]">{item.label}</p>
              <code className="text-sm text-muted tracking-[-0.01em]">
                /v1/{item.dataset}
              </code>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-8 lg:hidden">
        <SideRail t={t} apiStatus={apiStatus} apiLabel={apiLabel} />
      </div>
    </div>
  );
}

function KeysPane({
  t,
  keyPrefix,
  issuedKey,
  copied,
  status,
  message,
  onIssue,
  onCopy,
  onPlayground,
}: {
  t: Copy;
  keyPrefix: string | null;
  issuedKey: string;
  copied: boolean;
  status: "idle" | "loading" | "error";
  message: string;
  onIssue: () => void;
  onCopy: () => void;
  onPlayground: () => void;
}) {
  return (
    <div>
      <p className="text-sm text-muted tracking-[-0.01em]">{t.navKeys}</p>
      <h1 className="mt-1 font-heading text-2xl text-white tracking-[-0.02em] sm:text-3xl">
        {t.yourKey}
      </h1>
      <p className="mt-3 max-w-[40rem] text-base leading-7 text-muted tracking-[-0.01em]">
        {t.shownOnce}
      </p>

      {issuedKey ? (
        <div className="mt-8 rounded-2xl border border-border bg-surface px-5 py-5">
          <label className="text-sm text-muted tracking-[-0.01em]">
            {t.copyKey}
          </label>
          <input readOnly value={issuedKey} className="field mt-2 w-full" />
          <div className="mt-4 flex flex-col gap-2 sm:flex-row">
            <Button type="button" size="sm" onClick={onCopy}>
              {copied ? t.copied : t.copy}
            </Button>
            <Button href="/docs/api-reference#authentication" variant="outline" size="sm">
              {t.howToUse}
            </Button>
          </div>
        </div>
      ) : null}

      <div className="mt-8 overflow-hidden rounded-2xl border border-border bg-surface">
        {keyPrefix || issuedKey ? (
          <div className="divide-y divide-border">
            <div className="hidden grid-cols-[1fr_1.4fr_auto] gap-4 px-5 py-3 text-xs uppercase tracking-[0.08em] text-muted sm:grid">
              <span>{t.defaultKey}</span>
              <span>{t.prefixLabel}</span>
              <span>{t.apiKey}</span>
            </div>
            <div className="grid gap-3 px-5 py-4 sm:grid-cols-[1fr_1.4fr_auto] sm:items-center">
              <p className="text-sm text-white tracking-[-0.01em]">{t.defaultKey}</p>
              <code className="text-sm text-muted tracking-[-0.01em]">
                {keyPrefix ? `${keyPrefix}…` : "fv_live_…"}
              </code>
              <p className="text-sm text-white tracking-[-0.01em]">{t.keyActive}</p>
            </div>
          </div>
        ) : (
          <div className="px-5 py-8">
            <p className="font-heading text-lg text-white tracking-[-0.02em]">
              {t.noKeysTitle}
            </p>
            <p className="mt-2 max-w-[28rem] text-sm leading-6 text-muted tracking-[-0.01em]">
              {t.noKeysBody}
            </p>
          </div>
        )}
      </div>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <Button
          type="button"
          onClick={onIssue}
          disabled={status === "loading"}
          className="w-full sm:w-auto"
        >
          {status === "loading"
            ? t.issuing
            : keyPrefix || issuedKey
              ? t.replaceKey
              : t.getKey}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={onPlayground}
          className="w-full sm:w-auto"
        >
          {t.tryApi}
        </Button>
      </div>

      {status === "error" ? (
        <p className="mt-3 text-sm text-muted tracking-[-0.01em]">{message}</p>
      ) : null}
    </div>
  );
}

function SideRail({
  t,
  apiStatus,
  apiLabel,
}: {
  t: Copy;
  apiStatus: ApiStatus;
  apiLabel: string;
}) {
  const host = API_ORIGIN.replace(/^https:\/\//, "");

  return (
    <div className="space-y-4">
      <div className="rounded-2xl border border-border bg-surface px-4 py-4">
        <p className="text-xs uppercase tracking-[0.08em] text-muted">
          {t.origin}
        </p>
        <p className="mt-2 text-sm text-white tracking-[-0.01em]">
          {t.originTitle}
        </p>
        <p className="mt-1 text-sm text-muted tracking-[-0.01em]">{host}</p>
        <p className="mt-3 flex items-center gap-2 text-sm tracking-[-0.01em]">
          <StatusDot live={apiStatus === "live"} />
          <span className={apiStatus === "live" ? "text-white" : "text-muted"}>
            {apiLabel}
          </span>
        </p>
      </div>

      <div className="rounded-2xl border border-border bg-surface px-4 py-4">
        <p className="text-xs uppercase tracking-[0.08em] text-muted">
          {t.publicGetTitle}
        </p>
        <p className="mt-2 text-sm leading-6 text-muted tracking-[-0.01em]">
          {t.publicGetBody}
        </p>
      </div>

      <div className="rounded-2xl border border-border bg-surface px-4 py-4">
        <p className="text-xs uppercase tracking-[0.08em] text-muted">
          {t.docsCard}
        </p>
        <p className="mt-2 text-sm leading-6 text-muted tracking-[-0.01em]">
          {t.docsCardBody}
        </p>
        <div className="mt-4 flex flex-col gap-2">
          <Button href="/docs/quickstart" variant="outline" size="sm">
            {t.navQuickstart}
          </Button>
          <Button href="/docs/api-reference" variant="outline" size="sm">
            {t.navReference}
          </Button>
          <a
            href="mailto:support@forrovivo.com"
            className="text-sm text-muted tracking-[-0.01em] hover:text-white"
          >
            {t.support}
          </a>
        </div>
      </div>
    </div>
  );
}

function StatCard({
  label,
  value,
  hint,
  onClick,
}: {
  label: string;
  value: string;
  hint?: string;
  onClick?: () => void;
}) {
  const classes =
    "rounded-2xl border border-border bg-surface px-4 py-4 text-left";
  const body = (
    <>
      <p className="text-xs uppercase tracking-[0.08em] text-muted">{label}</p>
      <p className="mt-2 truncate text-sm text-white tracking-[-0.01em]">{value}</p>
      {hint ? (
        <p className="mt-1 text-sm text-muted tracking-[-0.01em]">{hint}</p>
      ) : null}
    </>
  );

  if (onClick) {
    return (
      <button
        type="button"
        onClick={onClick}
        className={`${classes} cursor-pointer transition-colors hover:border-[#3f3f3f] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/25`}
      >
        {body}
      </button>
    );
  }

  return <div className={classes}>{body}</div>;
}
