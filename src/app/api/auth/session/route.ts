import { NextRequest, NextResponse } from "next/server";
import { authenticateAccount, findAccount } from "@/lib/api-accounts";
import {
  API_SESSION_SECRET_REQUIRED,
  clearApiSession,
  createApiSession,
  isValidEmail,
  normalizeEmail,
  readApiSession,
  writeApiSession,
} from "@/lib/api-session";
import { AUTH_RATE, clientIp, rateLimit } from "@/lib/rate-limit";
import { verifyTurnstileToken } from "@/lib/turnstile";

const INVALID_EMAIL = "A valid email address is required.";
const INVALID_CREDENTIALS = "Email or password is incorrect.";
const SESSION_SECRET_MISSING =
  "API Platform sessions are not configured on this host.";
const RATE_LIMITED = "Too many sign-in attempts. Try again shortly.";

export async function GET() {
  const session = await readApiSession();
  if (!session) {
    return NextResponse.json({ authenticated: false });
  }
  const account = await findAccount(session.email);
  return NextResponse.json({
    authenticated: true,
    email: session.email,
    key_prefix: session.key_prefix ?? account?.key_prefix ?? null,
    created_at: account?.created_at ?? null,
    signed_in_at: session.created_at,
  });
}

export async function POST(request: NextRequest) {
  try {
    const ip = clientIp(request);
    const limited = rateLimit(`auth:login:${ip}`, AUTH_RATE.limit, AUTH_RATE.windowMs);
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
    if (!body || typeof body !== "object") {
      return NextResponse.json({ error: "Invalid request." }, { status: 400 });
    }
    const payload = body as {
      email?: unknown;
      password?: unknown;
      remember?: unknown;
      turnstileToken?: unknown;
    };
    const email = typeof payload.email === "string" ? payload.email : "";
    const password =
      typeof payload.password === "string" ? payload.password : "";
    const turnstileToken =
      typeof payload.turnstileToken === "string" ? payload.turnstileToken : "";
    const remember =
      payload.remember === undefined ? true : Boolean(payload.remember);

    if (!email.trim()) {
      return NextResponse.json(
        { error: "Email cannot be blank.", field: "email" },
        { status: 400 },
      );
    }
    if (!isValidEmail(email)) {
      return NextResponse.json(
        { error: INVALID_EMAIL, field: "email" },
        { status: 400 },
      );
    }
    if (!password) {
      return NextResponse.json(
        { error: "Password cannot be blank.", field: "password" },
        { status: 400 },
      );
    }

    const challenge = await verifyTurnstileToken(turnstileToken, ip);
    if (!challenge.ok) {
      return NextResponse.json(
        { error: challenge.error, field: "turnstile" },
        { status: 400 },
      );
    }

    const account = await authenticateAccount(normalizeEmail(email), password);
    if (!account) {
      return NextResponse.json(
        { error: INVALID_CREDENTIALS },
        { status: 401 },
      );
    }

    const session = createApiSession(account.email, account.key_prefix);
    await writeApiSession(session, { remember });
    return NextResponse.json({
      authenticated: true,
      email: session.email,
      key_prefix: session.key_prefix ?? null,
    });
  } catch (error) {
    if (
      error instanceof Error &&
      error.message === API_SESSION_SECRET_REQUIRED
    ) {
      return NextResponse.json(
        { error: SESSION_SECRET_MISSING },
        { status: 503 },
      );
    }
    return NextResponse.json(
      { error: "Could not start an API Platform session." },
      { status: 500 },
    );
  }
}

export async function DELETE() {
  await clearApiSession();
  return NextResponse.json({ authenticated: false });
}
