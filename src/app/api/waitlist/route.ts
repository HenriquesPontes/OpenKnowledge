import { NextRequest, NextResponse } from "next/server";

const BEEHIIV_API_BASE = "https://api.beehiiv.com/v2";
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const INVALID_EMAIL = "A valid email address is required.";
const GENERIC_ERROR = "Something went wrong. Please try again.";

type SubscribeResult = { ok: true } | { ok: false; status: number; error: string };

async function subscribeToBeehiiv(email: string): Promise<SubscribeResult> {
  const apiKey = process.env.BEEHIIV_API_KEY;
  const publicationId = process.env.BEEHIIV_PUBLICATION_ID;

  if (!apiKey || !publicationId) {
    console.error(
      "Waitlist is unconfigured: BEEHIIV_API_KEY and BEEHIIV_PUBLICATION_ID are required.",
    );
    return {
      ok: false,
      status: 503,
      error: "The waitlist is temporarily unavailable. Please try again later.",
    };
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

  // Beehiiv answers 409 for an address that is already subscribed, which is a
  // success as far as the visitor is concerned.
  if (response.ok || response.status === 409) {
    return { ok: true };
  }

  console.error(`Beehiiv API error ${response.status}:`, await response.text());

  if (response.status === 400 || response.status === 422) {
    return { ok: false, status: 400, error: INVALID_EMAIL };
  }

  return { ok: false, status: 502, error: GENERIC_ERROR };
}

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();
    const normalized =
      typeof email === "string" ? email.trim().toLowerCase() : "";

    if (!normalized || !EMAIL_PATTERN.test(normalized)) {
      return NextResponse.json({ error: INVALID_EMAIL }, { status: 400 });
    }

    const result = await subscribeToBeehiiv(normalized);
    if (!result.ok) {
      return NextResponse.json(
        { error: result.error },
        { status: result.status },
      );
    }

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (err) {
    console.error("Waitlist route error:", err);
    return NextResponse.json({ error: GENERIC_ERROR }, { status: 500 });
  }
}
