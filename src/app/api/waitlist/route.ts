import { NextRequest, NextResponse } from "next/server";
import { ACCOUNT_STORE_UNAVAILABLE } from "@/lib/api-account-store";
import { WAITLIST_RATE, clientIp, rateLimit } from "@/lib/rate-limit";
import {
  getWaitlistStore,
  parseWaitlistSource,
  type WaitlistSource,
} from "@/lib/waitlist-store";

const BEEHIIV_API_BASE = "https://api.beehiiv.com/v2";
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const INVALID_EMAIL = "A valid email address is required.";
const GENERIC_ERROR = "Something went wrong. Please try again.";
const UNAVAILABLE =
  "The waitlist is temporarily unavailable. Please try again later.";
const RATE_LIMITED = "Too many waitlist attempts. Try again shortly.";

const BEEHIIV_SOURCE: Record<WaitlistSource, string> = {
  home: "waitlist-forrovivo",
  connect: "waitlist-forro-connect",
  dictionary: "waitlist-dictionary",
  api: "waitlist-api",
};

async function subscribeToBeehiiv(
  email: string,
  source: WaitlistSource,
): Promise<void> {
  const apiKey = process.env.BEEHIIV_API_KEY;
  const publicationId = process.env.BEEHIIV_PUBLICATION_ID;
  if (!apiKey || !publicationId) return;

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

  if (response.ok || response.status === 409) return;
  console.error(`Beehiiv API error ${response.status}:`, await response.text());
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
    const source = parseWaitlistSource(payload.source);

    if (!normalized || !EMAIL_PATTERN.test(normalized)) {
      return NextResponse.json({ error: INVALID_EMAIL }, { status: 400 });
    }

    const store = await getWaitlistStore();
    await store.add(normalized, source);

    try {
      await subscribeToBeehiiv(normalized, source);
    } catch (error) {
      console.error("Beehiiv subscription failed:", error);
    }

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error) {
    if ((error as Error).message === ACCOUNT_STORE_UNAVAILABLE) {
      return NextResponse.json({ error: UNAVAILABLE }, { status: 503 });
    }
    console.error("Waitlist route error:", error);
    return NextResponse.json({ error: GENERIC_ERROR }, { status: 500 });
  }
}
