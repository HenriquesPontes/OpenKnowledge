import type { ApiAccountStore } from "@/lib/api-account-store";
import { ACCOUNT_STORE_UNAVAILABLE } from "@/lib/api-account-store";

/** Used on Vercel until Cloudflare D1 env vars are set (Phase 8 Step 3). */
export const unavailableAccountStore: ApiAccountStore = {
  async findByEmail() {
    return null;
  },
  async create() {
    throw new Error(ACCOUNT_STORE_UNAVAILABLE);
  },
  async setKeyPrefix() {
    throw new Error(ACCOUNT_STORE_UNAVAILABLE);
  },
};
