import { appendFile, mkdir, readFile, writeFile } from "fs/promises";
import path from "path";
import { NextRequest, NextResponse } from "next/server";

const WAITLIST_DIR = path.join(process.cwd(), "Join waitlist");
const WAITLIST_CSV = path.join(WAITLIST_DIR, "waitlist.csv");
const CSV_HEADER = "email,joined_at";
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function csvField(value: string): string {
  if (/[",\n\r]/.test(value)) {
    return `"${value.replace(/"/g, '""')}"`;
  }
  return value;
}

function parseEmails(contents: string): Set<string> {
  const emails = new Set<string>();
  const lines = contents.split(/\r?\n/);

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.toLowerCase().startsWith("email,")) continue;

    const match = trimmed.match(/^"?([^",]+)"?/);
    if (match?.[1]) {
      emails.add(match[1].trim().toLowerCase());
    }
  }

  return emails;
}

async function saveEmailToCsv(email: string): Promise<"added" | "exists"> {
  await mkdir(WAITLIST_DIR, { recursive: true });

  let contents = "";
  try {
    contents = await readFile(WAITLIST_CSV, "utf8");
  } catch (error) {
    const code = (error as NodeJS.ErrnoException).code;
    if (code !== "ENOENT") throw error;
  }

  if (!contents.trim()) {
    await writeFile(WAITLIST_CSV, `${CSV_HEADER}\n`, "utf8");
    contents = `${CSV_HEADER}\n`;
  }

  if (parseEmails(contents).has(email)) {
    return "exists";
  }

  const joinedAt = new Date().toISOString();
  await appendFile(
    WAITLIST_CSV,
    `${csvField(email)},${csvField(joinedAt)}\n`,
    "utf8",
  );
  return "added";
}

async function subscribeBeehiiv(email: string): Promise<void> {
  const apiKey = process.env.BEEHIIV_API_KEY;
  const publicationId = process.env.BEEHIIV_PUBLICATION_ID;
  if (!apiKey || !publicationId) return;

  const res = await fetch(
    `https://api.beehiiv.com/v2/publications/${publicationId}/subscriptions`,
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

  if (!res.ok && res.status !== 409) {
    const errorBody = await res.text();
    console.error(`Beehiiv API error ${res.status}:`, errorBody);
  }
}

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();
    const normalized =
      typeof email === "string" ? email.trim().toLowerCase() : "";

    if (!normalized || !EMAIL_PATTERN.test(normalized)) {
      return NextResponse.json(
        { error: "A valid email address is required." },
        { status: 400 },
      );
    }

    await saveEmailToCsv(normalized);

    try {
      await subscribeBeehiiv(normalized);
    } catch (error) {
      console.error("Beehiiv subscription failed after CSV save:", error);
    }

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (err) {
    console.error("Waitlist route error:", err);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 },
    );
  }
}
