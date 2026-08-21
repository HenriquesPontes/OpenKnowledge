import { mkdir, readFile, rename, writeFile } from "fs/promises";
import path from "path";
import { randomBytes } from "crypto";
import type { ApiAccount, ApiAccountStore } from "@/lib/api-account-store";
import { ACCOUNT_STORE_UNAVAILABLE } from "@/lib/api-account-store";

const ACCOUNTS_DIR = path.join(process.cwd(), "API accounts");
const ACCOUNTS_JSON = path.join(ACCOUNTS_DIR, "accounts.json");

function isAccount(value: unknown): value is ApiAccount {
  if (!value || typeof value !== "object") return false;
  const account = value as Partial<ApiAccount>;
  return (
    typeof account.email === "string" &&
    typeof account.password_hash === "string" &&
    typeof account.created_at === "string"
  );
}

async function readAccounts(): Promise<ApiAccount[]> {
  try {
    const contents = await readFile(ACCOUNTS_JSON, "utf8");
    const parsed: unknown = JSON.parse(contents);
    return Array.isArray(parsed) ? parsed.filter(isAccount) : [];
  } catch (error) {
    const code = (error as NodeJS.ErrnoException).code;
    if (code === "ENOENT") return [];
    throw error;
  }
}

async function writeAccounts(accounts: ApiAccount[]) {
  if (process.env.VERCEL) {
    throw new Error(ACCOUNT_STORE_UNAVAILABLE);
  }
  await mkdir(ACCOUNTS_DIR, { recursive: true });
  const tmp = `${ACCOUNTS_JSON}.${randomBytes(6).toString("hex")}.tmp`;
  await writeFile(tmp, `${JSON.stringify(accounts, null, 2)}\n`, "utf8");
  await rename(tmp, ACCOUNTS_JSON);
}

export const jsonAccountStore: ApiAccountStore = {
  async findByEmail(email) {
    const normalized = email.trim().toLowerCase();
    const accounts = await readAccounts();
    return accounts.find((account) => account.email === normalized) ?? null;
  },

  async create(account) {
    const accounts = await readAccounts();
    if (accounts.some((row) => row.email === account.email)) {
      const error = new Error("ACCOUNT_EXISTS");
      throw error;
    }
    await writeAccounts([...accounts, account]);
  },

  async setKeyPrefix(email, keyPrefix) {
    const normalized = email.trim().toLowerCase();
    const accounts = await readAccounts();
    const index = accounts.findIndex((account) => account.email === normalized);
    if (index < 0) return;
    accounts[index] = { ...accounts[index], key_prefix: keyPrefix };
    await writeAccounts(accounts);
  },
};
