import { mkdir, readFile, rename, writeFile } from "fs/promises";
import path from "path";
import { randomBytes, scryptSync, timingSafeEqual } from "crypto";

const ACCOUNTS_DIR = path.join(process.cwd(), "API accounts");
const ACCOUNTS_JSON = path.join(ACCOUNTS_DIR, "accounts.json");

export type ApiAccount = {
  email: string;
  password_hash: string;
  created_at: string;
  registration_code?: string;
  key_prefix?: string;
};

const PASSWORD_MIN = 12;
const PASSWORD_NUMBER = /\d/;
const PASSWORD_SPECIAL = /[^A-Za-z0-9]/;

export function passwordRequirementsMessage() {
  return "Password requirements: 12 characters including a number and a special character.";
}

export function validatePassword(password: string): string | null {
  if (password.length < PASSWORD_MIN) return passwordRequirementsMessage();
  if (!PASSWORD_NUMBER.test(password) || !PASSWORD_SPECIAL.test(password)) {
    return passwordRequirementsMessage();
  }
  return null;
}

export function hashPassword(password: string) {
  const salt = randomBytes(16).toString("hex");
  const hash = scryptSync(password, salt, 64).toString("hex");
  return `scrypt$${salt}$${hash}`;
}

export function verifyPassword(password: string, stored: string) {
  const [scheme, salt, hash] = stored.split("$");
  if (scheme !== "scrypt" || !salt || !hash) return false;
  const next = scryptSync(password, salt, 64);
  const expected = Buffer.from(hash, "hex");
  if (next.length !== expected.length) return false;
  return timingSafeEqual(next, expected);
}

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
    throw new Error("FILESYSTEM_UNAVAILABLE");
  }
  await mkdir(ACCOUNTS_DIR, { recursive: true });
  const tmp = `${ACCOUNTS_JSON}.${randomBytes(6).toString("hex")}.tmp`;
  await writeFile(tmp, `${JSON.stringify(accounts, null, 2)}\n`, "utf8");
  await rename(tmp, ACCOUNTS_JSON);
}

export async function findAccount(email: string) {
  const normalized = email.trim().toLowerCase();
  const accounts = await readAccounts();
  return accounts.find((account) => account.email === normalized) ?? null;
}

export function registrationCodes(): string[] {
  const raw = process.env.API_REGISTRATION_CODES || "";
  return raw
    .split(",")
    .map((code) => code.trim())
    .filter(Boolean);
}

export function validateRegistrationCode(code: string): string | null {
  const trimmed = code.trim();
  if (!trimmed) return null;
  const allowed = registrationCodes();
  if (allowed.length === 0) {
    return "Registration codes are not enabled yet.";
  }
  if (!allowed.includes(trimmed)) {
    return "That registration code is not valid.";
  }
  return null;
}

export async function createAccount(input: {
  email: string;
  password: string;
  registrationCode?: string;
}): Promise<{ account: ApiAccount } | { error: string; status: number }> {
  const email = input.email.trim().toLowerCase();
  const passwordError = validatePassword(input.password);
  if (passwordError) return { error: passwordError, status: 400 };

  const code = input.registrationCode?.trim() || "";
  if (code) {
    const codeError = validateRegistrationCode(code);
    if (codeError) return { error: codeError, status: 400 };
  }

  try {
    const accounts = await readAccounts();
    if (accounts.some((account) => account.email === email)) {
      return { error: "An account with this email already exists.", status: 409 };
    }
    const account: ApiAccount = {
      email,
      password_hash: hashPassword(input.password),
      created_at: new Date().toISOString(),
      registration_code: code || undefined,
    };
    await writeAccounts([...accounts, account]);
    return { account };
  } catch (error) {
    if ((error as Error).message === "FILESYSTEM_UNAVAILABLE") {
      return {
        error:
          "Account storage is not configured for this environment. Use a persistent host to create accounts.",
        status: 503,
      };
    }
    throw error;
  }
}

export async function authenticateAccount(email: string, password: string) {
  const account = await findAccount(email);
  if (!account || !verifyPassword(password, account.password_hash)) {
    return null;
  }
  return account;
}

export async function setAccountKeyPrefix(email: string, keyPrefix: string) {
  const normalized = email.trim().toLowerCase();
  const accounts = await readAccounts();
  const index = accounts.findIndex((account) => account.email === normalized);
  if (index < 0) return;
  accounts[index] = { ...accounts[index], key_prefix: keyPrefix };
  await writeAccounts(accounts);
}
