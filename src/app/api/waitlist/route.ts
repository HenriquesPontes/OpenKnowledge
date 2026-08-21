import { mkdir, readFile, rename, writeFile } from "fs/promises";
import path from "path";
import { randomBytes } from "crypto";
import { NextRequest, NextResponse } from "next/server";
import { WAITLIST_RATE, clientIp, rateLimit } from "@/lib/rate-limit";
import { verifyTurnstileToken } from "@/lib/turnstile";

const BEEHIIV_API_BASE = "https://api.beehiiv.com/v2";
const WAITLIST_DIR = path.join(process.cwd(), "Join waitlist");
const WAITLIST_JSON = path.join(WAITLIST_DIR, "waitlist.json");
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const INVALID_EMAIL = "A valid email address is required.";
const GENERIC_ERROR = "Something went wrong. Please try again.";
const UNAVAILABLE =
  "The waitlist is temporarily unavailable. Please try again later.";
const RATE_LIMITED = "Too many waitlist attempts. Try again shortly.";

type WaitlistSource = "home" | "connect" | "dictionary" | "api";

type WaitlistEntry = {
  email: string;
  joined_at: string;
  source?: WaitlistSource;
};

const WAITLIST_SOURCES: readonly WaitlistSource[] = [
  "home",
  "connect",
  "dictionary",
  "api",
];

const BEEHIIV_SOURCE: Record<WaitlistSource, string> = {
  home: "waitlist-forrovivo",
  connect: "waitlist-forro-connect",
  dictionary: "waitlist-dictionary",
  api: "waitlist-api",
};

type StoreResult = "added" | "exists";

function isEntry(value: unknown): value is WaitlistEntry {
  if (!value || typeof value !== "object") return false;
  const entry = value as Partial<WaitlistEntry>;
  return (
    typeof entry.email === "string" &&
    typeof entry.joined_at === "string" &&
    (entry.source === undefined ||
      WAITLIST_SOURCES.includes(entry.source as WaitlistSource))
  );
}

async function readEntries(): Promise<WaitlistEntry[]> {
  try {
    const contents = await readFile(WAITLIST_JSON, "utf8");
    const parsed: unknown = JSON.parse(contents);
    return Array.isArray(parsed) ? parsed.filter(isEntry) : [];
  } catch (error) {
    const code = (error as NodeJS.ErrnoException).code;
    if (code === "ENOENT") return [];
    throw error;
  }
}

async function saveEmail(
  email: string,
  source: WaitlistSource,
): Promise<StoreResult> {
  await mkdir(WAITLIST_DIR, { recursive: true });
  const entries = await readEntries();
  if (
    entries.some(
      (entry) =>
        entry.email === email && (entry.source ?? "home") === source,
    )
  ) {
    return "exists";
  }

  const next: WaitlistEntry[] = [
    ...entries,
    { email, joined_at: new Date().toISOString(), source },
  ];
  const tmp = `${WAITLIST_JSON}.${randomBytes(6).toString("hex")}.tmp`;
  await writeFile(tmp, `${JSON.stringify(next, null, 2)}\n`, "utf8");
  await rename(tmp, WAITLIST_JSON);
  return "added";
}

async function subscribeToBeehiiv(
  email: string,
  source: WaitlistSource,
): Promise<boolean> {
  const apiKey = process.env.BEEHIIV_API_KEY;
  const publicationId = process.env.BEEHIIV_PUBLICATION_ID;
  if (!apiKey || !publicationId) {
    if (process.env.VERCEL) {
      console.error(
        "Waitlist on Vercel requires BEEHIIV_API_KEY and BEEHIIV_PUBLICATION_ID.",
      );
    }
    return false;
  }

  const response = await fetch(
    `${BEEHIIV_API_BASE}/publications/${publicationId}/subscriptions`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        email,
        utm_source: BEEHIIV_SOURCE[source],
      }),
    },
  );

  if (response.ok || response.status === 409) return true;

  console.error(`Beehiiv API error ${response.status}:`, await response.text());
  return false;
}

export async function POST(request: NextRequest) {
  try {
    const ip = clientIp(request);
    const limited = rateLimit(
      `waitlist:${ip}`,
      WAITLIST_RATE.limit,
      WAITLIST_RATE.windowMs,
    );
    if (!limited.ok) {
      return NextResponse.json(
        { error: RATE_LIMITED },
        {
          status: 429,
          headers: { "Retry-After": String(limited.retryAfterSec) },
        },
      );
    }

    const body: unknown = await request.json();
    const payload =
      body && typeof body === "object" ? (body as Record<string, unknown>) : {};
    const email = payload.email;
    const normalized =
      typeof email === "string" ? email.trim().toLowerCase() : "";
    const turnstileToken =
      typeof payload.turnstileToken === "string" ? payload.turnstileToken : "";
    const source: WaitlistSource = WAITLIST_SOURCES.includes(
      payload.source as WaitlistSource,
    )
      ? (payload.source as WaitlistSource)
      : "home";

    if (!normalized || !EMAIL_PATTERN.test(normalized)) {
      return NextResponse.json({ error: INVALID_EMAIL }, { status: 400 });
    }

    const challenge = await verifyTurnstileToken(turnstileToken, ip);
    if (!challenge.ok) {
      return NextResponse.json({ error: challenge.error }, { status: 400 });
    }

    let stored = false;
    const hosted = Boolean(process.env.VERCEL);

    if (!hosted) {
      try {
        await saveEmail(normalized, source);
        stored = true;
      } catch (error) {
        console.error("Waitlist file persist failed:", error);
      }
    }

    let published = false;
    try {
      published = await subscribeToBeehiiv(normalized, source);
    } catch (error) {
      console.error("Beehiiv subscription failed:", error);
    }

    if (stored || published) {
      return NextResponse.json({ success: true }, { status: 201 });
    }

    return NextResponse.json({ error: UNAVAILABLE }, { status: 503 });
  } catch (err) {
    console.error("Waitlist route error:", err);
    return NextResponse.json({ error: GENERIC_ERROR }, { status: 500 });
  }
}
