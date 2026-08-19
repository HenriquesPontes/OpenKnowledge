import { mkdir, readFile, rename, writeFile } from "fs/promises";
import path from "path";
import { randomBytes } from "crypto";
import { NextRequest, NextResponse } from "next/server";

const BEEHIIV_API_BASE = "https://api.beehiiv.com/v2";
const WAITLIST_DIR = path.join(process.cwd(), "Join waitlist");
const WAITLIST_JSON = path.join(WAITLIST_DIR, "waitlist.json");
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const INVALID_EMAIL = "A valid email address is required.";
const GENERIC_ERROR = "Something went wrong. Please try again.";
const UNAVAILABLE =
  "The waitlist is temporarily unavailable. Please try again later.";

type WaitlistEntry = {
  email: string;
  joined_at: string;
};

type StoreResult = "added" | "exists";

function isEntry(value: unknown): value is WaitlistEntry {
  if (!value || typeof value !== "object") return false;
  const entry = value as Partial<WaitlistEntry>;
  return typeof entry.email === "string" && typeof entry.joined_at === "string";
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

async function saveEmail(email: string): Promise<StoreResult> {
  await mkdir(WAITLIST_DIR, { recursive: true });
  const entries = await readEntries();
  if (entries.some((entry) => entry.email === email)) {
    return "exists";
  }

  const next: WaitlistEntry[] = [
    ...entries,
    { email, joined_at: new Date().toISOString() },
  ];
  const tmp = `${WAITLIST_JSON}.${randomBytes(6).toString("hex")}.tmp`;
  await writeFile(tmp, `${JSON.stringify(next, null, 2)}\n`, "utf8");
  await rename(tmp, WAITLIST_JSON);
  return "added";
}

async function subscribeToBeehiiv(email: string): Promise<boolean> {
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
        utm_source: "waitlist-forrovivo",
      }),
    },
  );

  if (response.ok || response.status === 409) return true;

  console.error(`Beehiiv API error ${response.status}:`, await response.text());
  return false;
}

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();
    const normalized =
      typeof email === "string" ? email.trim().toLowerCase() : "";

    if (!normalized || !EMAIL_PATTERN.test(normalized)) {
      return NextResponse.json({ error: INVALID_EMAIL }, { status: 400 });
    }

    let stored = false;
    const hosted = Boolean(process.env.VERCEL);

    if (!hosted) {
      try {
        await saveEmail(normalized);
        stored = true;
      } catch (error) {
        console.error("Waitlist file persist failed:", error);
      }
    }

    let published = false;
    try {
      published = await subscribeToBeehiiv(normalized);
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
