import { NextRequest, NextResponse } from "next/server";
import { setAccountKeyPrefix } from "@/lib/api-accounts";
import { fetchResearchApi } from "@/lib/catalog";
import {
  createApiSession,
  readApiSession,
  writeApiSession,
} from "@/lib/api-session";

const GENERIC_ERROR = "The API could not issue a key. Please try again.";
const UNAUTHORIZED = "Log in to the API Platform to get a key.";

export async function POST() {
  try {
    const session = await readApiSession();
    if (!session) {
      return NextResponse.json({ error: UNAUTHORIZED }, { status: 401 });
    }

    const response = await fetchResearchApi("/v1/keys", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: session.email }),
      cache: "no-store",
    });
    const payload: unknown = await response.json().catch(() => null);
    if (!response.ok) {
      const record =
        payload && typeof payload === "object"
          ? (payload as { message?: string; error?: string })
          : {};
      return NextResponse.json(
        { error: record.message || record.error || GENERIC_ERROR },
        { status: response.status },
      );
    }

    const issued =
      payload && typeof payload === "object"
        ? (payload as { key?: string; prefix?: string })
        : {};
    if (!issued.key) {
      return NextResponse.json({ error: GENERIC_ERROR }, { status: 502 });
    }

    const prefix = issued.prefix || issued.key.slice(0, 16);
    await writeApiSession(createApiSession(session.email, prefix));
    try {
      await setAccountKeyPrefix(session.email, prefix);
    } catch {
      /* session still holds the prefix for this browser */
    }

    return NextResponse.json(
      {
        status: "ok",
        key: issued.key,
        email: session.email,
        prefix,
        shown_once: true,
        usage: "Authorization: Bearer <key>",
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("API key issue failed:", error);
    return NextResponse.json({ error: GENERIC_ERROR }, { status: 502 });
  }
}
