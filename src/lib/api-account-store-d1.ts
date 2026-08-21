import type { ApiAccount, ApiAccountStore } from "@/lib/api-account-store";
import { ACCOUNT_STORE_UNAVAILABLE } from "@/lib/api-account-store";

type D1QueryResult = {
  results?: unknown[];
  success?: boolean;
  meta?: { changes?: number };
};

type D1ApiResponse = {
  success?: boolean;
  errors?: { message?: string; code?: number }[];
  result?: D1QueryResult[];
};

type D1Auth =
  | { kind: "token"; token: string }
  | { kind: "global"; email: string; key: string };

type D1Config = {
  accountId: string;
  databaseId: string;
  auth: D1Auth;
};

function resolveAuth(): D1Auth | null {
  const token = process.env.CLOUDFLARE_API_TOKEN?.trim() || "";
  const globalKey =
    process.env.CLOUDFLARE_API_KEY?.trim() ||
    process.env.CLOUDFLARE_GLOBAL_API_KEY?.trim() ||
    "";
  const email =
    process.env.CLOUDFLARE_EMAIL?.trim() ||
    process.env.CLOUDFLARE_API_EMAIL?.trim() ||
    "";

  // Global API keys use X-Auth-Email + X-Auth-Key (often prefixed cfk_).
  if (globalKey && email) {
    return { kind: "global", email, key: globalKey };
  }
  if (token.startsWith("cfk_") && email) {
    return { kind: "global", email, key: token };
  }
  if (token) {
    return { kind: "token", token };
  }
  return null;
}

function d1Config(): D1Config | null {
  const accountId = process.env.CLOUDFLARE_ACCOUNT_ID?.trim() || "";
  const databaseId = process.env.CLOUDFLARE_D1_DATABASE_ID?.trim() || "";
  const auth = resolveAuth();
  if (!accountId || !databaseId || !auth) return null;
  return { accountId, databaseId, auth };
}

function authHeaders(auth: D1Auth): Record<string, string> {
  if (auth.kind === "token") {
    return { Authorization: `Bearer ${auth.token}` };
  }
  return {
    "X-Auth-Email": auth.email,
    "X-Auth-Key": auth.key,
  };
}

export function isD1AccountStoreConfigured() {
  return d1Config() !== null;
}

export async function d1Query(
  sql: string,
  params: unknown[] = [],
): Promise<D1QueryResult> {
  const config = d1Config();
  if (!config) {
    throw new Error(ACCOUNT_STORE_UNAVAILABLE);
  }

  const response = await fetch(
    `https://api.cloudflare.com/client/v4/accounts/${config.accountId}/d1/database/${config.databaseId}/query`,
    {
      method: "POST",
      headers: {
        ...authHeaders(config.auth),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ sql, params }),
      cache: "no-store",
    },
  );

  const payload = (await response.json().catch(() => null)) as D1ApiResponse | null;
  if (!response.ok || !payload?.success) {
    const message =
      payload?.errors?.[0]?.message ||
      `D1 query failed (${response.status}).`;
    throw new Error(message);
  }

  return payload.result?.[0] ?? { results: [], success: true };
}

function rowToAccount(row: Record<string, unknown>): ApiAccount | null {
  if (
    typeof row.email !== "string" ||
    typeof row.password_hash !== "string" ||
    typeof row.created_at !== "string"
  ) {
    return null;
  }
  return {
    email: row.email,
    password_hash: row.password_hash,
    created_at: row.created_at,
    registration_code:
      typeof row.registration_code === "string"
        ? row.registration_code
        : undefined,
    key_prefix:
      typeof row.key_prefix === "string" ? row.key_prefix : undefined,
  };
}

export const d1AccountStore: ApiAccountStore = {
  async findByEmail(email) {
    const normalized = email.trim().toLowerCase();
    const result = await d1Query(
      `SELECT email, password_hash, created_at, registration_code, key_prefix
       FROM api_accounts
       WHERE email = ?
       LIMIT 1`,
      [normalized],
    );
    const row = result.results?.[0];
    if (!row || typeof row !== "object") return null;
    return rowToAccount(row as Record<string, unknown>);
  },

  async create(account) {
    try {
      await d1Query(
        `INSERT INTO api_accounts
          (email, password_hash, created_at, registration_code, key_prefix)
         VALUES (?, ?, ?, ?, ?)`,
        [
          account.email,
          account.password_hash,
          account.created_at,
          account.registration_code ?? null,
          account.key_prefix ?? null,
        ],
      );
    } catch (error) {
      const message = (error as Error).message;
      if (/UNIQUE|constraint|already exists/i.test(message)) {
        throw new Error("ACCOUNT_EXISTS");
      }
      throw error;
    }
  },

  async setKeyPrefix(email, keyPrefix) {
    const normalized = email.trim().toLowerCase();
    await d1Query(
      `UPDATE api_accounts
       SET key_prefix = ?
       WHERE email = ?`,
      [keyPrefix, normalized],
    );
  },
};
