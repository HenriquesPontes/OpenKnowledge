const SITEVERIFY = "https://challenges.cloudflare.com/turnstile/v0/siteverify";

/** Cloudflare dummy keys that always pass — local/dev only. */
export const TURNSTILE_TEST_SITE_KEY = "1x00000000000000000000AA";
export const TURNSTILE_TEST_SECRET_KEY = "1x0000000000000000000000000000000AA";

export function turnstileSiteKey() {
  return (
    process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ||
    (process.env.NODE_ENV !== "production" ? TURNSTILE_TEST_SITE_KEY : "")
  );
}

function turnstileSecret() {
  return (
    process.env.TURNSTILE_SECRET_KEY ||
    (process.env.NODE_ENV !== "production" ? TURNSTILE_TEST_SECRET_KEY : "")
  );
}

export async function verifyTurnstileToken(
  token: string,
  remoteIp?: string | null,
): Promise<{ ok: true } | { ok: false; error: string }> {
  const secret = turnstileSecret();
  if (!secret) {
    return {
      ok: false,
      error: "Human verification is not configured.",
    };
  }
  if (!token.trim()) {
    return {
      ok: false,
      error: "Complete the human verification challenge.",
    };
  }

  const body = new URLSearchParams();
  body.set("secret", secret);
  body.set("response", token);
  if (remoteIp) body.set("remoteip", remoteIp);

  try {
    const response = await fetch(SITEVERIFY, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body,
    });
    const data: { success?: boolean; "error-codes"?: string[] } = await response
      .json()
      .catch(() => ({}));
    if (!response.ok || !data.success) {
      return {
        ok: false,
        error: "Human verification failed. Try again.",
      };
    }
    return { ok: true };
  } catch {
    return {
      ok: false,
      error: "Human verification could not be checked. Try again.",
    };
  }
}
