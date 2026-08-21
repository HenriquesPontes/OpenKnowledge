export type ApiAccount = {
  email: string;
  password_hash: string;
  created_at: string;
  registration_code?: string;
  key_prefix?: string;
};

export type ApiAccountStore = {
  findByEmail(email: string): Promise<ApiAccount | null>;
  create(account: ApiAccount): Promise<void>;
  setKeyPrefix(email: string, keyPrefix: string): Promise<void>;
};

export const ACCOUNT_STORE_UNAVAILABLE = "ACCOUNT_STORE_UNAVAILABLE";

/**
 * Resolves the account store for this host.
 * Prefer Cloudflare D1 when configured (Phase 8 Step 2).
 * Otherwise JSON on local hosts; unavailable on Vercel without D1.
 */
export async function getAccountStore(): Promise<ApiAccountStore> {
  const { isD1AccountStoreConfigured } = await import(
    "@/lib/api-account-store-d1"
  );
  if (isD1AccountStoreConfigured()) {
    const { d1AccountStore } = await import("@/lib/api-account-store-d1");
    return d1AccountStore;
  }

  if (process.env.VERCEL) {
    const { unavailableAccountStore } = await import(
      "@/lib/api-account-store-unavailable"
    );
    return unavailableAccountStore;
  }

  const { jsonAccountStore } = await import("@/lib/api-account-store-json");
  return jsonAccountStore;
}
