import { mkdir, readFile, rename, writeFile } from "fs/promises";
import path from "path";
import { randomBytes } from "crypto";
import { ACCOUNT_STORE_UNAVAILABLE } from "@/lib/api-account-store";

export const WAITLIST_SOURCES = [
  "home",
  "connect",
  "dictionary",
  "api",
] as const;

export type WaitlistSource = (typeof WAITLIST_SOURCES)[number];

export type WaitlistEntry = {
  email: string;
  joined_at: string;
  source: WaitlistSource;
};

export type WaitlistAddResult = "added" | "exists";

export type WaitlistStore = {
  add(email: string, source: WaitlistSource): Promise<WaitlistAddResult>;
};

const WAITLIST_DIR = path.join(process.cwd(), "Join waitlist");
const WAITLIST_JSON = path.join(WAITLIST_DIR, "waitlist.json");

function isUniqueConstraint(error: unknown) {
  return /UNIQUE|constraint|already exists/i.test((error as Error).message);
}

function isSource(value: unknown): value is WaitlistSource {
  return (
    typeof value === "string" &&
    WAITLIST_SOURCES.includes(value as WaitlistSource)
  );
}

function isEntry(value: unknown): value is WaitlistEntry {
  if (!value || typeof value !== "object") return false;
  const entry = value as Partial<WaitlistEntry>;
  return (
    typeof entry.email === "string" &&
    typeof entry.joined_at === "string" &&
    isSource(entry.source ?? "home")
  );
}

async function readJsonEntries(): Promise<WaitlistEntry[]> {
  try {
    const contents = await readFile(WAITLIST_JSON, "utf8");
    const parsed: unknown = JSON.parse(contents);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(isEntry).map((entry) => ({
      email: entry.email,
      joined_at: entry.joined_at,
      source: entry.source ?? "home",
    }));
  } catch (error) {
    const code = (error as NodeJS.ErrnoException).code;
    if (code === "ENOENT") return [];
    throw error;
  }
}

const jsonWaitlistStore: WaitlistStore = {
  async add(email, source) {
    if (process.env.VERCEL) {
      throw new Error(ACCOUNT_STORE_UNAVAILABLE);
    }
    const entries = await readJsonEntries();
    if (
      entries.some(
        (entry) => entry.email === email && entry.source === source,
      )
    ) {
      return "exists";
    }
    await mkdir(WAITLIST_DIR, { recursive: true });
    const next: WaitlistEntry[] = [
      ...entries,
      { email, source, joined_at: new Date().toISOString() },
    ];
    const tmp = `${WAITLIST_JSON}.${randomBytes(6).toString("hex")}.tmp`;
    await writeFile(tmp, `${JSON.stringify(next, null, 2)}\n`, "utf8");
    await rename(tmp, WAITLIST_JSON);
    return "added";
  },
};

const d1WaitlistStore: WaitlistStore = {
  async add(email, source) {
    const { d1Query } = await import("@/lib/api-account-store-d1");
    const joinedAt = new Date().toISOString();
    try {
      await d1Query(
        `INSERT INTO waitlist (email, source, joined_at)
         VALUES (?, ?, ?)`,
        [email, source, joinedAt],
      );
      return "added";
    } catch (error) {
      if (isUniqueConstraint(error)) return "exists";
      throw error;
    }
  },
};

export function parseWaitlistSource(value: unknown): WaitlistSource {
  return isSource(value) ? value : "home";
}

/**
 * Prefer Cloudflare D1 when configured.
 * JSON is local-only; Vercel without D1 cannot persist waitlist rows.
 */
export async function getWaitlistStore(): Promise<WaitlistStore> {
  const { isD1AccountStoreConfigured } = await import(
    "@/lib/api-account-store-d1"
  );
  if (isD1AccountStoreConfigured()) {
    return d1WaitlistStore;
  }
  if (process.env.VERCEL) {
    throw new Error(ACCOUNT_STORE_UNAVAILABLE);
  }
  return jsonWaitlistStore;
}
