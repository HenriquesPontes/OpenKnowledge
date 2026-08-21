import { NextRequest, NextResponse } from "next/server";
import {
  createAccount,
  validateRegistrationCode,
} from "@/lib/api-accounts";
import {
  API_SESSION_SECRET_REQUIRED,
  createApiSession,
  isValidEmail,
  normalizeEmail,
  writeApiSession,
} from "@/lib/api-session";
import { verifyTurnstileToken } from "@/lib/turnstile";
import { AUTH_RATE, clientIp, rateLimit } from "@/lib/rate-limit";

const INVALID_EMAIL = "A valid email address is required.";
const SESSION_SECRET_MISSING =
  "API Platform sessions are not configured on this host.";
const RATE_LIMITED = "Too many registration attempts. Try again shortly.";

function sessionConfigError(error: unknown) {
  return (
    error instanceof Error && error.message === API_SESSION_SECRET_REQUIRED
  );
}

export async function POST(request: NextRequest) {
  try {
    const ip = clientIp(request);
    const limited = rateLimit(
      `auth:register:${ip}`,
      AUTH_RATE.limit,
      AUTH_RATE.windowMs,
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
    if (!body || typeof body !== "object") {
      return NextResponse.json({ error: "Invalid request." }, { status: 400 });
    }
    const payload = body as {
      email?: unknown;
      password?: unknown;
      passwordConfirm?: unknown;
      registrationCode?: unknown;
      turnstileToken?: unknown;
      remember?: unknown;
    };

    const email = typeof payload.email === "string" ? payload.email : "";
    const password =
      typeof payload.password === "string" ? payload.password : "";
    const passwordConfirm =
      typeof payload.passwordConfirm === "string"
        ? payload.passwordConfirm
        : "";
    const registrationCode =
      typeof payload.registrationCode === "string"
        ? payload.registrationCode
        : "";
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
    if (password !== passwordConfirm) {
      return NextResponse.json(
        { error: "Passwords do not match.", field: "passwordConfirm" },
        { status: 400 },
      );
    }
    if (!registrationCode.trim()) {
      return NextResponse.json(
        {
          error: "A registration code is required.",
          field: "registrationCode",
        },
        { status: 400 },
      );
    }
    const codeError = validateRegistrationCode(registrationCode);
    if (codeError) {
      return NextResponse.json(
        { error: codeError, field: "registrationCode" },
        { status: codeError.includes("closed") ? 503 : 400 },
      );
    }

    const challenge = await verifyTurnstileToken(
      turnstileToken,
      request.headers.get("cf-connecting-ip") ||
        request.headers.get("x-forwarded-for")?.split(",")[0]?.trim(),
    );
    if (!challenge.ok) {
      return NextResponse.json(
        { error: challenge.error, field: "turnstile" },
        { status: 400 },
      );
    }

    const created = await createAccount({
      email: normalizeEmail(email),
      password,
      registrationCode,
    });
    if ("error" in created) {
      return NextResponse.json(
        {
          error: created.error,
          field:
            created.error.toLowerCase().includes("registration code") ||
            created.error.toLowerCase().includes("invite")
              ? "registrationCode"
              : undefined,
        },
        { status: created.status },
      );
    }

    const session = createApiSession(created.account.email);
    await writeApiSession(session, { remember });
    return NextResponse.json({
      authenticated: true,
      email: session.email,
      key_prefix: null,
    });
  } catch (error) {
    if (sessionConfigError(error)) {
      return NextResponse.json(
        { error: SESSION_SECRET_MISSING },
        { status: 503 },
      );
    }
    return NextResponse.json(
      { error: "Could not create an API Platform account." },
      { status: 500 },
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body: unknown = await request.json();
    const code =
      body && typeof body === "object" && "registrationCode" in body
        ? (body as { registrationCode?: unknown }).registrationCode
        : undefined;
    if (typeof code !== "string" || !code.trim()) {
      return NextResponse.json(
        { error: "Enter a registration code to apply." },
        { status: 400 },
      );
    }
    const error = validateRegistrationCode(code);
    if (error) {
      return NextResponse.json(
        { error },
        { status: error.includes("closed") ? 503 : 400 },
      );
    }
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { error: "Could not check that registration code." },
      { status: 500 },
    );
  }
}
