"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { useLocale } from "@/components/locale/LocaleProvider";
import { API_ORIGIN } from "@/lib/catalog";
import type { SiteCopy } from "@/lib/i18n-copy";

export type DashboardDataset = {
  dataset: string;
  label: string;
  name: string;
  family: string;
  familyLabel: string;
  entries: number;
  iso?: string;
  index: boolean;
};

export type DashboardSession = {
  authenticated: boolean;
  email?: string;
  key_prefix?: string | null;
  created_at?: string | null;
  signed_in_at?: string | null;
};

type Pane = "overview" | "keys" | "playground" | "lexicons" | "settings";
type ApiStatus = "checking" | "live" | "unreachable";
type Copy = SiteCopy["apiDashboard"];
type SortKey = "name" | "family" | "entries";

type FamilyStat = {
  id: string;
  label: string;
  lexicons: number;
  entries: number;
  color: string;
};

const FAMILY_COLORS = [
  "#7aa2ff",
  "#5ee07a",
  "#f5c542",
  "#e88b6a",
  "#c084fc",
  "#67e8f9",
];

const NAV_ICONS = {
  overview:
    "M2.5 8.5V13.5H6.5V8.5H2.5ZM9.5 2.5V13.5H13.5V2.5H9.5ZM2.5 2.5V6.5H6.5V2.5H2.5Z",
  keys: "M9.5 8.5L13.5 4.5M13.5 4.5L11.5 2.5M13.5 4.5L15.5 6.5M7.5 10.5C7.5 12.157 6.157 13.5 4.5 13.5C2.843 13.5 1.5 12.157 1.5 10.5C1.5 8.843 2.843 7.5 4.5 7.5C6.157 7.5 7.5 8.843 7.5 10.5Z",
  playground:
    "M3 3.5H13C13.276 3.5 13.5 3.724 13.5 4V12C13.5 12.276 13.276 12.5 13 12.5H3C2.724 12.5 2.5 12.276 2.5 12V4C2.5 3.724 2.724 3.5 3 3.5ZM5 6.5L7.5 8.5L5 10.5M8.5 10.5H11",
  lexicons:
    "M3 2.5H13V13.5H3V2.5ZM5 5H11M5 7.5H11M5 10H8.5",
  settings:
    "M8 10.5C9.381 10.5 10.5 9.381 10.5 8C10.5 6.619 9.381 5.5 8 5.5C6.619 5.5 5.5 6.619 5.5 8C5.5 9.381 6.619 10.5 8 10.5ZM2.5 8.5L3.7 8.9L4.1 10.2L3.2 11.3L4.7 12.8L5.8 11.9L7.1 12.3L7.5 13.5H8.5L8.9 12.3L10.2 11.9L11.3 12.8L12.8 11.3L11.9 10.2L12.3 8.9L13.5 8.5V7.5L12.3 7.1L11.9 5.8L12.8 4.7L11.3 3.2L10.2 4.1L8.9 3.7L8.5 2.5H7.5L7.1 3.7L5.8 4.1L4.7 3.2L3.2 4.7L4.1 5.8L3.7 7.1L2.5 7.5V8.5Z",
  docs: "M4.5 2.5H9.5L12.5 5.5V13.5H4.5V2.5ZM9.5 2.5V5.5H12.5",
} as const;

function paneFromHash(hash: string): Pane {
  if (hash === "#try" || hash === "#playground") return "playground";
  if (hash === "#keys") return "keys";
  if (hash === "#lexicons") return "lexicons";
  if (hash === "#settings") return "settings";
  return "overview";
}

function hashForPane(pane: Pane) {
  if (pane === "keys") return "#keys";
  if (pane === "playground") return "#try";
  if (pane === "lexicons") return "#lexicons";
  if (pane === "settings") return "#settings";
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

function formatTime(value: Date, locale: string) {
  return value.toLocaleTimeString(locale, {
    hour: "2-digit",
    minute: "2-digit",
  });
}

function formatCount(value: number, locale: string) {
  return value.toLocaleString(locale);
}

async function copyText(value: string) {
  await navigator.clipboard.writeText(value);
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
  const searchRef = useRef<HTMLInputElement>(null);
  const [session, setSession] = useState<DashboardSession | null>(
    initialSession?.authenticated ? initialSession : null,
  );
  const [pane, setPane] = useState<Pane>("overview");
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [message, setMessage] = useState("");
  const [issuedKey, setIssuedKey] = useState("");
  const [copied, setCopied] = useState<string | null>(null);
  const [apiStatus, setApiStatus] = useState<ApiStatus>("checking");
  const [identity, setIdentity] = useState("");
  const [checkedAt, setCheckedAt] = useState<Date | null>(null);
  const [query, setQuery] = useState("");
  const [familyFilter, setFamilyFilter] = useState("all");
  const [sortKey, setSortKey] = useState<SortKey>("entries");
  const [sortDir, setSortDir] = useState<"desc" | "asc">("desc");

  const families = useMemo<FamilyStat[]>(() => {
    const map = new Map<string, FamilyStat>();
    for (const item of datasets) {
      if (item.index) continue;
      const current = map.get(item.family);
      if (current) {
        current.lexicons += 1;
        current.entries += item.entries;
      } else {
        map.set(item.family, {
          id: item.family,
          label: item.familyLabel,
          lexicons: 1,
          entries: item.entries,
          color: FAMILY_COLORS[map.size % FAMILY_COLORS.length],
        });
      }
    }
    return [...map.values()].sort((a, b) => b.entries - a.entries);
  }, [datasets]);

  const isolated = useMemo(
    () => datasets.filter((item) => !item.index),
    [datasets],
  );
  const totalEntries = useMemo(
    () => isolated.reduce((sum, item) => sum + item.entries, 0),
    [isolated],
  );
  const topLexicons = useMemo(
    () => [...isolated].sort((a, b) => b.entries - a.entries).slice(0, 8),
    [isolated],
  );

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    const rows = datasets.filter((item) => {
      if (familyFilter !== "all" && item.family !== familyFilter) return false;
      if (!needle) return true;
      return (
        item.name.toLowerCase().includes(needle) ||
        item.dataset.toLowerCase().includes(needle) ||
        item.familyLabel.toLowerCase().includes(needle) ||
        (item.iso && item.iso.toLowerCase().includes(needle))
      );
    });
    const direction = sortDir === "asc" ? 1 : -1;
    return [...rows].sort((a, b) => {
      if (sortKey === "entries") return (a.entries - b.entries) * direction;
      if (sortKey === "family") {
        return a.familyLabel.localeCompare(b.familyLabel, dateLocale) * direction;
      }
      return a.name.localeCompare(b.name, dateLocale) * direction;
    });
  }, [datasets, familyFilter, query, sortDir, sortKey, dateLocale]);

  useEffect(() => {
    const sync = () => setPane(paneFromHash(window.location.hash));
    sync();
    window.addEventListener("hashchange", sync);
    return () => window.removeEventListener("hashchange", sync);
  }, []);

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        searchRef.current?.focus();
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
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

  const refreshStatus = useCallback(async () => {
    setApiStatus("checking");
    try {
      const response = await fetch("/api/v1", { cache: "no-store" });
      setApiStatus(response.ok ? "live" : "unreachable");
      setCheckedAt(new Date());
      const payload: unknown = await response.json().catch(() => null);
      if (payload && typeof payload === "object") {
        const record = payload as { name?: unknown; service?: unknown; title?: unknown };
        const name =
          (typeof record.name === "string" && record.name) ||
          (typeof record.service === "string" && record.service) ||
          (typeof record.title === "string" && record.title) ||
          "";
        setIdentity(name);
      }
    } catch {
      setApiStatus("unreachable");
      setCheckedAt(new Date());
    }
  }, []);

  useEffect(() => {
    void refreshStatus();
  }, [refreshStatus]);

  function go(next: Pane) {
    window.history.replaceState(null, "", hashForPane(next));
    setPane(next);
  }

  async function markCopied(id: string, value: string) {
    try {
      await copyText(value);
      setCopied(id);
      window.setTimeout(() => setCopied((current) => (current === id ? null : current)), 1600);
    } catch {
      setCopied(null);
    }
  }

  async function issueKey() {
    setStatus("loading");
    setMessage("");
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

  if (!session?.authenticated) {
    return (
      <div className="flex min-h-dvh items-center justify-center px-4">
        <p className="text-muted text-base tracking-[-0.01em]">{t.opening}</p>
      </div>
    );
  }

  const keyPrefix = session.key_prefix || null;
  const created = formatDate(session.created_at, dateLocale);
  const signedIn = formatDate(session.signed_in_at, dateLocale);
  const apiLabel =
    apiStatus === "live"
      ? t.live
      : apiStatus === "unreachable"
        ? t.unreachable
        : t.checkingApi;
  const host = API_ORIGIN.replace(/^https:\/\//, "");

  const navGroups: Array<{
    heading: string;
    items: Array<{ id: Pane; label: string; icon: keyof typeof NAV_ICONS }>;
  }> = [
    {
      heading: t.workspace,
      items: [
        { id: "overview", label: t.navOverview, icon: "overview" },
        { id: "keys", label: t.navKeys, icon: "keys" },
        { id: "playground", label: t.navPlayground, icon: "playground" },
      ],
    },
    {
      heading: t.catalog,
      items: [{ id: "lexicons", label: t.navLexicons, icon: "lexicons" }],
    },
    {
      heading: t.access,
      items: [{ id: "settings", label: t.navSettings, icon: "settings" }],
    },
  ];

  return (
    <div
      data-api-dashboard
      className="fixed inset-0 z-50 flex flex-col bg-background text-foreground"
    >
      <header className="flex h-12 shrink-0 items-center justify-between gap-3 border-b border-border px-3 sm:px-4">
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
              className="h-6 w-6"
            />
          </a>
          <p className="truncate text-sm text-muted tracking-[-0.01em]">
            {t.platform}
            <span className="text-white"> / {host}</span>
          </p>
          <span className="hidden items-center gap-1.5 rounded-full border border-border px-2 py-0.5 text-xs text-muted tracking-[-0.01em] sm:inline-flex">
            <StatusDot live={apiStatus === "live"} />
            {apiLabel}
          </span>
        </div>
        <div className="flex min-w-0 items-center gap-2">
          <a
            href="mailto:support@forrovivo.com"
            className="hidden text-sm text-muted tracking-[-0.01em] hover:text-white sm:inline"
          >
            {t.support}
          </a>
          <p className="hidden truncate text-sm text-muted tracking-[-0.01em] md:block">
            {session.email}
          </p>
          <Button variant="outline" size="sm" onClick={signOut} className="h-8 shrink-0">
            {t.signOut}
          </Button>
        </div>
      </header>

      <div className="flex min-h-0 flex-1">
        <aside className="hidden w-[240px] shrink-0 flex-col border-r border-border lg:flex">
          <div className="border-b border-border p-3">
            <label className="sr-only" htmlFor="dashboard-search">
              {t.searchAria}
            </label>
            <input
              id="dashboard-search"
              ref={searchRef}
              value={query}
              onChange={(event) => {
                setQuery(event.target.value);
                if (event.target.value) go("lexicons");
              }}
              placeholder={t.searchPlaceholder}
              className="h-9 w-full rounded-lg border border-border bg-surface px-3 text-sm text-white tracking-[-0.01em] outline-none placeholder:text-muted focus:border-[#8a8a8a]"
            />
            <p className="mt-1.5 text-xs text-muted tracking-[-0.01em]">⌘K</p>
          </div>
          <div className="flex-1 overflow-y-auto px-2 py-3">
            <a
              href="/"
              className="mb-3 inline-flex px-2 text-sm text-muted tracking-[-0.01em] hover:text-white"
            >
              {t.backToSite}
            </a>
            {navGroups.map((group) => (
              <div key={group.heading} className="mb-4">
                <p className="px-2 pb-1 text-[11px] uppercase tracking-[0.08em] text-muted">
                  {group.heading}
                </p>
                <DashboardNav
                  items={group.items}
                  pane={pane}
                  onSelect={go}
                />
              </div>
            ))}
            <a
              href="/docs/api-reference"
              className="flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm text-muted tracking-[-0.01em] hover:bg-surface hover:text-white"
            >
              <NavIcon d={NAV_ICONS.docs} />
              {t.navReference}
            </a>
          </div>
        </aside>

        <div className="flex min-w-0 flex-1 flex-col">
          <div className="flex flex-col gap-3 border-b border-border px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="min-w-0">
              <p className="text-xs text-muted tracking-[-0.01em]">
                {t.platform} → {host}
              </p>
              <div className="mt-2 flex gap-1 overflow-x-auto">
                {(
                  [
                    ["overview", t.navOverview],
                    ["keys", t.navKeys],
                    ["playground", t.navPlayground],
                    ["lexicons", t.navLexicons],
                    ["settings", t.navSettings],
                  ] as const
                ).map(([id, label]) => (
                  <button
                    key={id}
                    type="button"
                    onClick={() => go(id)}
                    className={`shrink-0 border-b-2 px-3 py-1.5 text-sm tracking-[-0.01em] ${
                      pane === id
                        ? "border-white text-white"
                        : "border-transparent text-muted hover:text-white"
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <code className="max-w-[16rem] truncate rounded-lg border border-border bg-surface px-2.5 py-1.5 text-xs text-muted">
                {API_ORIGIN}
              </code>
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="h-8"
                onClick={() => markCopied("origin", API_ORIGIN)}
              >
                {copied === "origin" ? t.copied : t.copyOrigin}
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="h-8"
                onClick={() => void refreshStatus()}
              >
                {t.refresh}
              </Button>
              <Button
                type="button"
                size="sm"
                className="h-8"
                onClick={() => go("playground")}
              >
                {t.exploreData}
              </Button>
            </div>
          </div>

          <section className="min-h-0 flex-1 overflow-y-auto px-4 py-5 sm:px-6">
            {pane === "overview" ? (
              <OverviewPane
                t={t}
                locale={dateLocale}
                email={session.email ?? ""}
                created={created}
                keyPrefix={keyPrefix}
                apiLabel={apiLabel}
                apiStatus={apiStatus}
                identity={identity}
                checkedAt={checkedAt}
                isolatedCount={isolated.length}
                totalEntries={totalEntries}
                families={families}
                topLexicons={topLexicons}
                issuing={status === "loading"}
                hasKey={Boolean(keyPrefix || issuedKey)}
                onIssue={issueKey}
                onPlayground={() => go("playground")}
                onKeys={() => go("keys")}
                onLexicons={() => go("lexicons")}
              />
            ) : null}

            {pane === "keys" ? (
              <KeysPane
                t={t}
                keyPrefix={keyPrefix}
                issuedKey={issuedKey}
                copied={copied === "key"}
                status={status}
                message={message}
                onIssue={issueKey}
                onCopy={() => issuedKey && markCopied("key", issuedKey)}
                onPlayground={() => go("playground")}
              />
            ) : null}

            {pane === "playground" ? (
              <div>
                <h1 className="font-heading text-2xl text-white tracking-[-0.02em]">
                  {t.tryApi}
                </h1>
                <p className="mt-2 max-w-[44rem] text-sm leading-6 text-muted tracking-[-0.01em]">
                  {t.playgroundBody}
                </p>
                <div className="mt-6">{playground}</div>
              </div>
            ) : null}

            {pane === "lexicons" ? (
              <LexiconsPane
                t={t}
                locale={dateLocale}
                rows={filtered}
                families={families}
                familyFilter={familyFilter}
                query={query}
                onQuery={(value) => setQuery(value)}
                onFamily={setFamilyFilter}
                sortKey={sortKey}
                sortDir={sortDir}
                onSort={(key) => {
                  if (sortKey === key) {
                    setSortDir((current) => (current === "asc" ? "desc" : "asc"));
                    return;
                  }
                  setSortKey(key);
                  setSortDir(key === "entries" ? "desc" : "asc");
                }}
                copied={copied}
                onCopy={(id, value) => markCopied(id, value)}
                onTry={() => go("playground")}
              />
            ) : null}

            {pane === "settings" ? (
              <SettingsPane
                t={t}
                email={session.email ?? ""}
                created={created}
                signedIn={signedIn}
                keyPrefix={keyPrefix}
                host={host}
                identity={identity}
                apiLabel={apiLabel}
                onSignOut={signOut}
              />
            ) : null}
          </section>
        </div>
      </div>
    </div>
  );
}

function DashboardNav({
  items,
  pane,
  onSelect,
}: {
  items: Array<{ id: Pane; label: string; icon: keyof typeof NAV_ICONS }>;
  pane: Pane;
  onSelect: (pane: Pane) => void;
}) {
  return (
    <ul className="space-y-0.5">
      {items.map((item) => {
        const active = pane === item.id;
        return (
          <li key={item.id}>
            <button
              type="button"
              onClick={() => onSelect(item.id)}
              className={`flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-left text-sm tracking-[-0.01em] ${
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
    </ul>
  );
}

function OverviewPane({
  t,
  locale,
  email,
  created,
  keyPrefix,
  apiLabel,
  apiStatus,
  identity,
  checkedAt,
  isolatedCount,
  totalEntries,
  families,
  topLexicons,
  issuing,
  hasKey,
  onIssue,
  onPlayground,
  onKeys,
  onLexicons,
}: {
  t: Copy;
  locale: string;
  email: string;
  created: string | null;
  keyPrefix: string | null;
  apiLabel: string;
  apiStatus: ApiStatus;
  identity: string;
  checkedAt: Date | null;
  isolatedCount: number;
  totalEntries: number;
  families: FamilyStat[];
  topLexicons: DashboardDataset[];
  issuing: boolean;
  hasKey: boolean;
  onIssue: () => void;
  onPlayground: () => void;
  onKeys: () => void;
  onLexicons: () => void;
}) {
  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="font-heading text-2xl text-white tracking-[-0.02em] sm:text-3xl">
            {t.platform}
          </h1>
          <p className="mt-2 max-w-[40rem] text-sm leading-6 text-muted tracking-[-0.01em]">
            {t.monitorBody}
          </p>
        </div>
        <p className="text-xs text-muted tracking-[-0.01em]">
          {checkedAt ? `${t.lastChecked} ${formatTime(checkedAt, locale)}` : t.checkingApi}
          {identity ? ` · ${identity}` : ""}
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
        <MetricCard
          label={t.lexicons}
          value={formatCount(isolatedCount, locale)}
          hint={t.variety}
          spark={families.map((item) => item.lexicons)}
          onClick={onLexicons}
        />
        <MetricCard
          label={t.attestedEntries}
          value={formatCount(totalEntries, locale)}
          hint={t.published}
          spark={families.map((item) => item.entries)}
        />
        <MetricCard
          label={t.families}
          value={formatCount(families.length, locale)}
          hint={families.map((item) => item.label).join(" · ")}
        />
        <MetricCard
          label={t.origin}
          value={apiLabel}
          hint={apiStatus === "live" ? t.live : t.unreachable}
          live={apiStatus === "live"}
        />
        <MetricCard
          label={t.apiKey}
          value={keyPrefix ? t.keyActive : t.noKeyYet}
          hint={email}
          onClick={onKeys}
        />
      </div>

      <div className="rounded-xl border border-border bg-surface px-4 py-4 sm:px-5">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-heading text-lg text-white tracking-[-0.02em]">
              {t.quickStart}
            </p>
            <p className="mt-1 text-sm leading-6 text-muted tracking-[-0.01em]">
              {t.quickStartBody}
            </p>
          </div>
          <div className="flex flex-col gap-2 sm:flex-row">
            <Button type="button" size="sm" onClick={onIssue} disabled={issuing}>
              {issuing ? t.issuing : hasKey ? t.replaceKey : t.getKey}
            </Button>
            <Button type="button" variant="outline" size="sm" onClick={onPlayground}>
              {t.openPlayground}
            </Button>
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-border bg-surface p-4 sm:p-5">
        <ChartHeader title={t.entriesByFamily} hint={t.distributionHint} />
        <BarChart
          series={families.map((item) => ({
            label: item.label,
            value: item.entries,
            color: item.color,
          }))}
          locale={locale}
        />
      </div>

      <div className="grid gap-4 xl:grid-cols-2">
        <div className="rounded-xl border border-border bg-surface p-4 sm:p-5">
          <ChartHeader title={t.lexiconsByFamily} />
          <BarChart
            series={families.map((item) => ({
              label: item.label,
              value: item.lexicons,
              color: item.color,
            }))}
            locale={locale}
          />
        </div>
        <div className="rounded-xl border border-border bg-surface p-4 sm:p-5">
          <ChartHeader title={t.topLexicons} />
          <ul className="mt-3 space-y-2">
            {topLexicons.map((item) => {
              const max = topLexicons[0]?.entries || 1;
              const width = Math.max(4, Math.round((item.entries / max) * 100));
              return (
                <li key={item.dataset}>
                  <div className="flex items-center justify-between gap-3 text-sm">
                    <p className="truncate text-white tracking-[-0.01em]">{item.name}</p>
                    <span className="shrink-0 text-muted">
                      {item.entries > 0
                        ? formatCount(item.entries, locale)
                        : t.noEntryCount}
                    </span>
                  </div>
                  <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-[#2a2a2a]">
                    <div
                      className="h-full rounded-full bg-[#7aa2ff]"
                      style={{ width: `${width}%` }}
                    />
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      <p className="text-xs text-muted tracking-[-0.01em]">
        {created ? `${t.memberSince} ${created}` : t.account}
      </p>
    </div>
  );
}

function LexiconsPane({
  t,
  locale,
  rows,
  families,
  familyFilter,
  query,
  onQuery,
  onFamily,
  sortKey,
  sortDir,
  onSort,
  copied,
  onCopy,
  onTry,
}: {
  t: Copy;
  locale: string;
  rows: DashboardDataset[];
  families: FamilyStat[];
  familyFilter: string;
  query: string;
  onQuery: (value: string) => void;
  onFamily: (value: string) => void;
  sortKey: SortKey;
  sortDir: "asc" | "desc";
  onSort: (key: SortKey) => void;
  copied: string | null;
  onCopy: (id: string, value: string) => void;
  onTry: () => void;
}) {
  return (
    <div>
      <h1 className="font-heading text-2xl text-white tracking-[-0.02em]">
        {t.isolatedHeading}
      </h1>
      <p className="mt-2 max-w-[44rem] text-sm leading-6 text-muted tracking-[-0.01em]">
        {t.isolatedBody}
      </p>

      <div className="mt-5 flex flex-col gap-3 sm:flex-row">
        <input
          value={query}
          onChange={(event) => onQuery(event.target.value)}
          placeholder={t.searchPlaceholder}
          aria-label={t.searchAria}
          className="field w-full sm:max-w-[280px]"
        />
        <select
          value={familyFilter}
          onChange={(event) => onFamily(event.target.value)}
          aria-label={t.family}
          className="field w-full sm:max-w-[240px]"
        >
          <option value="all">{t.allFamilies}</option>
          {families.map((item) => (
            <option key={item.id} value={item.id}>
              {item.label}
            </option>
          ))}
        </select>
      </div>

      <div className="mt-5 overflow-hidden rounded-xl border border-border bg-surface">
        <div className="hidden grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)_minmax(0,1.4fr)_7rem_7rem] gap-3 border-b border-border px-4 py-2.5 text-xs uppercase tracking-[0.08em] text-muted md:grid">
          <SortButton label={t.variety} active={sortKey === "name"} dir={sortDir} onClick={() => onSort("name")} />
          <SortButton label={t.family} active={sortKey === "family"} dir={sortDir} onClick={() => onSort("family")} />
          <span>{t.path}</span>
          <SortButton label={t.entries} active={sortKey === "entries"} dir={sortDir} onClick={() => onSort("entries")} />
          <span />
        </div>
        {rows.length === 0 ? (
          <p className="px-4 py-8 text-sm text-muted tracking-[-0.01em]">{t.noResults}</p>
        ) : (
          <ul className="divide-y divide-border">
            {rows.map((item) => (
              <li
                key={item.dataset}
                className="grid gap-2 px-4 py-3 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)_minmax(0,1.4fr)_7rem_7rem] md:items-center"
              >
                <div>
                  <p className="truncate text-sm text-white tracking-[-0.01em]">
                    {item.name}
                  </p>
                  <p className="text-xs text-muted tracking-[-0.01em]">
                    {item.index ? t.indexDataset : t.variety}
                    {item.iso ? ` · ${item.iso}` : ""}
                  </p>
                </div>
                <p className="text-sm text-muted tracking-[-0.01em]">{item.familyLabel}</p>
                <code className="truncate text-sm text-muted tracking-[-0.01em]">
                  /v1/{item.dataset}
                </code>
                <p className="text-sm text-white tracking-[-0.01em]">
                  {item.entries > 0
                    ? formatCount(item.entries, locale)
                    : t.noEntryCount}
                </p>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => onCopy(item.dataset, `${API_ORIGIN}/v1/${item.dataset}`)}
                    className="text-sm text-muted hover:text-white"
                  >
                    {copied === item.dataset ? t.copied : t.copy}
                  </button>
                  <button
                    type="button"
                    onClick={onTry}
                    className="text-sm text-muted hover:text-white"
                  >
                    {t.tryThis}
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
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
      <h1 className="font-heading text-2xl text-white tracking-[-0.02em]">
        {t.yourKey}
      </h1>
      <p className="mt-2 max-w-[44rem] text-sm leading-6 text-muted tracking-[-0.01em]">
        {t.shownOnce}
      </p>

      {issuedKey ? (
        <div className="mt-6 rounded-xl border border-border bg-surface px-4 py-4">
          <label className="text-sm text-muted tracking-[-0.01em]">{t.copyKey}</label>
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

      <div className="mt-6 overflow-hidden rounded-xl border border-border bg-surface">
        {keyPrefix || issuedKey ? (
          <div className="grid gap-3 px-4 py-4 sm:grid-cols-[1fr_1.4fr_auto] sm:items-center">
            <p className="text-sm text-white tracking-[-0.01em]">{t.defaultKey}</p>
            <code className="text-sm text-muted tracking-[-0.01em]">
              {keyPrefix ? `${keyPrefix}…` : "fv_live_…"}
            </code>
            <p className="text-sm text-white tracking-[-0.01em]">{t.keyActive}</p>
          </div>
        ) : (
          <div className="px-4 py-8">
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
        <Button type="button" onClick={onIssue} disabled={status === "loading"}>
          {status === "loading"
            ? t.issuing
            : keyPrefix || issuedKey
              ? t.replaceKey
              : t.getKey}
        </Button>
        <Button type="button" variant="outline" onClick={onPlayground}>
          {t.tryApi}
        </Button>
      </div>
      {status === "error" ? (
        <p className="mt-3 text-sm text-muted tracking-[-0.01em]">{message}</p>
      ) : null}
    </div>
  );
}

function SettingsPane({
  t,
  email,
  created,
  signedIn,
  keyPrefix,
  host,
  identity,
  apiLabel,
  onSignOut,
}: {
  t: Copy;
  email: string;
  created: string | null;
  signedIn: string | null;
  keyPrefix: string | null;
  host: string;
  identity: string;
  apiLabel: string;
  onSignOut: () => void;
}) {
  const rows = [
    [t.account, email],
    [t.memberSince, created ?? "—"],
    [t.sessionStarted, signedIn ?? "—"],
    [t.apiKey, keyPrefix ? `${keyPrefix}…` : t.noKeyYet],
    [t.origin, host],
    [t.identity, identity || apiLabel],
  ] as const;

  return (
    <div>
      <h1 className="font-heading text-2xl text-white tracking-[-0.02em]">
        {t.navSettings}
      </h1>
      <div className="mt-6 overflow-hidden rounded-xl border border-border bg-surface">
        <ul className="divide-y divide-border">
          {rows.map(([label, value]) => (
            <li
              key={label}
              className="flex flex-col gap-1 px-4 py-3 sm:flex-row sm:items-center sm:justify-between"
            >
              <p className="text-sm text-muted tracking-[-0.01em]">{label}</p>
              <p className="text-sm text-white tracking-[-0.01em]">{value}</p>
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-6 flex flex-col gap-2 sm:flex-row">
        <Button href="/docs/api-reference" variant="outline" size="sm">
          {t.navReference}
        </Button>
        <Button href={`${API_ORIGIN}/v1/openapi.yaml`} variant="outline" size="sm">
          {t.openapi}
        </Button>
        <Button type="button" variant="outline" size="sm" onClick={onSignOut}>
          {t.signOut}
        </Button>
      </div>
    </div>
  );
}

function MetricCard({
  label,
  value,
  hint,
  spark,
  live,
  onClick,
}: {
  label: string;
  value: string;
  hint?: string;
  spark?: number[];
  live?: boolean;
  onClick?: () => void;
}) {
  const body = (
    <>
      <p className="text-[11px] uppercase tracking-[0.08em] text-muted">{label}</p>
      <p className="mt-2 flex items-center gap-2 text-xl text-white tracking-[-0.02em]">
        {live !== undefined ? <StatusDot live={Boolean(live)} /> : null}
        <span className="truncate">{value}</span>
      </p>
      {hint ? (
        <p className="mt-1 truncate text-xs text-muted tracking-[-0.01em]">{hint}</p>
      ) : null}
      {spark && spark.some((item) => item > 0) ? (
        <SparkBars values={spark} />
      ) : null}
    </>
  );
  const classes =
    "rounded-xl border border-border bg-surface px-4 py-3.5 text-left";
  if (onClick) {
    return (
      <button
        type="button"
        onClick={onClick}
        className={`${classes} cursor-pointer hover:border-[#3f3f3f]`}
      >
        {body}
      </button>
    );
  }
  return <div className={classes}>{body}</div>;
}

function SparkBars({ values }: { values: number[] }) {
  const max = Math.max(...values, 1);
  return (
    <div className="mt-3 flex h-8 items-end gap-0.5" aria-hidden="true">
      {values.map((value, index) => (
        <span
          key={`${value}-${index}`}
          className="flex-1 rounded-sm bg-[#7aa2ff]/80"
          style={{ height: `${Math.max(12, (value / max) * 100)}%` }}
        />
      ))}
    </div>
  );
}

function ChartHeader({ title, hint }: { title: string; hint?: string }) {
  return (
    <div>
      <p className="text-sm text-white tracking-[-0.01em]">{title}</p>
      {hint ? (
        <p className="mt-1 text-xs leading-5 text-muted tracking-[-0.01em]">{hint}</p>
      ) : null}
    </div>
  );
}

function BarChart({
  series,
  locale,
}: {
  series: Array<{ label: string; value: number; color: string }>;
  locale: string;
}) {
  const max = Math.max(...series.map((item) => item.value), 1);
  return (
    <ul className="mt-4 space-y-3">
      {series.map((item) => (
        <li key={item.label}>
          <div className="mb-1 flex items-center justify-between gap-3 text-sm">
            <span className="truncate text-muted tracking-[-0.01em]">{item.label}</span>
            <span className="shrink-0 text-white tracking-[-0.01em]">
              {formatCount(item.value, locale)}
            </span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-[#2a2a2a]">
            <div
              className="h-full rounded-full"
              style={{
                width: `${Math.max(4, (item.value / max) * 100)}%`,
                backgroundColor: item.color,
              }}
            />
          </div>
        </li>
      ))}
    </ul>
  );
}

function SortButton({
  label,
  active,
  dir,
  onClick,
}: {
  label: string;
  active: boolean;
  dir: "asc" | "desc";
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`text-left ${active ? "text-white" : "text-muted hover:text-white"}`}
    >
      {label}
      {active ? (dir === "asc" ? " ↑" : " ↓") : ""}
    </button>
  );
}
