import { NextRequest, NextResponse } from "next/server";
import {
  createAccount,
  validateRegistrationCode,
} from "@/lib/api-accounts";
import {
  createApiSession,
  isValidEmail,
  normalizeEmail,
  writeApiSession,
} from "@/lib/api-session";
import { verifyTurnstileToken } from "@/lib/turnstile";

const INVALID_EMAIL = "A valid email address is required.";

export async function POST(request: NextRequest) {
  try {
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
        { error: created.error },
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
  } catch {
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
      return NextResponse.json({ error }, { status: 400 });
    }
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { error: "Could not check that registration code." },
      { status: 500 },
    );
  }
}
