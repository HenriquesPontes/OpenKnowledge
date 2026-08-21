import { createHmac, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";

export const API_SESSION_COOKIE = "fv_api_session";
export const API_SESSION_SECRET_REQUIRED = "API_SESSION_SECRET_REQUIRED";
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const SESSION_DAYS = 30;

export type ApiSession = {
  email: string;
  created_at: string;
  key_prefix?: string;
};

function isProductionRuntime() {
  return process.env.NODE_ENV === "production" || Boolean(process.env.VERCEL);
}

/**
 * Production/Vercel must set API_SESSION_SECRET. Local-only fallback is for
 * development machines without env; Beehiiv keys are never reused for sessions.
 */
function sessionSecret(): string | null {
  const configured = process.env.API_SESSION_SECRET?.trim();
  if (configured) return configured;
  if (isProductionRuntime()) return null;
  return "forrovivo-local-api-session";
}

export function isApiSessionSecretConfigured() {
  return sessionSecret() !== null;
}

function requireSessionSecret(): string {
  const secret = sessionSecret();
  if (!secret) {
    throw new Error(API_SESSION_SECRET_REQUIRED);
  }
  return secret;
}

function sign(payload: string) {
  return createHmac("sha256", requireSessionSecret())
    .update(payload)
    .digest("base64url");
}

function encodeSession(session: ApiSession) {
  const payload = Buffer.from(JSON.stringify(session), "utf8").toString(
    "base64url",
  );
  return `${payload}.${sign(payload)}`;
}

function decodeSession(token: string): ApiSession | null {
  const [payload, signature] = token.split(".");
  if (!payload || !signature) return null;
  const expected = sign(payload);
  const left = Buffer.from(signature);
  const right = Buffer.from(expected);
  if (left.length !== right.length || !timingSafeEqual(left, right)) return null;
  try {
    const session = JSON.parse(
      Buffer.from(payload, "base64url").toString("utf8"),
    ) as Partial<ApiSession>;
    if (
      typeof session.email !== "string" ||
      !EMAIL_PATTERN.test(session.email) ||
      typeof session.created_at !== "string"
    ) {
      return null;
    }
    const created = Date.parse(session.created_at);
    if (!Number.isFinite(created)) return null;
    const ageMs = Date.now() - created;
    if (ageMs < 0 || ageMs > SESSION_DAYS * 24 * 60 * 60 * 1000) return null;
    return {
      email: session.email,
      created_at: session.created_at,
      key_prefix:
        typeof session.key_prefix === "string" ? session.key_prefix : undefined,
    };
  } catch {
    return null;
  }
}

export function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}

export function isValidEmail(email: string) {
  return EMAIL_PATTERN.test(normalizeEmail(email));
}

export function createApiSession(
  email: string,
  keyPrefix?: string,
): ApiSession {
  return {
    email: normalizeEmail(email),
    created_at: new Date().toISOString(),
    key_prefix: keyPrefix,
  };
}

export function sessionCookieOptions(
  maxAgeSeconds = SESSION_DAYS * 24 * 60 * 60,
) {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/",
    maxAge: maxAgeSeconds,
  };
}

export function serializeApiSession(session: ApiSession) {
  return encodeSession(session);
}

export function parseApiSession(token: string | undefined) {
  if (!token) return null;
  if (!sessionSecret()) return null;
  try {
    return decodeSession(token);
  } catch {
    return null;
  }
}

export async function readApiSession() {
  const jar = await cookies();
  return parseApiSession(jar.get(API_SESSION_COOKIE)?.value);
}

export async function writeApiSession(
  session: ApiSession,
  options?: { remember?: boolean },
) {
  requireSessionSecret();
  const jar = await cookies();
  const maxAge = options?.remember === false ? 60 * 60 * 12 : undefined;
  jar.set(
    API_SESSION_COOKIE,
    serializeApiSession(session),
    sessionCookieOptions(maxAge),
  );
}

export async function clearApiSession() {
  const jar = await cookies();
  jar.set(API_SESSION_COOKIE, "", sessionCookieOptions(0));
}
