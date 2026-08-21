import { randomBytes, scryptSync, timingSafeEqual } from "crypto";
import {
  ACCOUNT_STORE_UNAVAILABLE,
  getAccountStore,
  type ApiAccount,
} from "@/lib/api-account-store";

export type { ApiAccount };

const PASSWORD_MIN = 12;
const PASSWORD_MAX = 128;
const PASSWORD_NUMBER = /\d/;
const PASSWORD_SPECIAL = /[^A-Za-z0-9]/;

const STORE_UNAVAILABLE_MESSAGE =
  "Account storage is not configured for this environment. Use a persistent host to create accounts.";

export function passwordRequirementsMessage() {
  return "Password requirements: 12–128 characters including a number and a special character.";
}

export function validatePassword(password: string): string | null {
  if (password.length < PASSWORD_MIN || password.length > PASSWORD_MAX) {
    return passwordRequirementsMessage();
  }
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

export function registrationCodes(): string[] {
  const raw = process.env.API_REGISTRATION_CODES || "";
  return raw
    .split(",")
    .map((code) => code.trim())
    .filter(Boolean);
}

export function validateRegistrationCode(code: string): string | null {
  const trimmed = code.trim();
  if (!trimmed) {
    return "A registration code is required.";
  }
  const allowed = registrationCodes();
  if (allowed.length === 0) {
    return "Registration is closed. Contact support for an invite code.";
  }
  if (!allowed.includes(trimmed)) {
    return "That registration code is not valid.";
  }
  return null;
}

export async function findAccount(email: string) {
  const store = await getAccountStore();
  return store.findByEmail(email);
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
  const codeError = validateRegistrationCode(code);
  if (codeError) {
    const status = registrationCodes().length === 0 ? 503 : 400;
    return { error: codeError, status };
  }

  const account: ApiAccount = {
    email,
    password_hash: hashPassword(input.password),
    created_at: new Date().toISOString(),
    registration_code: code,
  };

  try {
    const store = await getAccountStore();
    const existing = await store.findByEmail(email);
    if (existing) {
      return { error: "An account with this email already exists.", status: 409 };
    }
    await store.create(account);
    return { account };
  } catch (error) {
    const message = (error as Error).message;
    if (message === ACCOUNT_STORE_UNAVAILABLE) {
      return { error: STORE_UNAVAILABLE_MESSAGE, status: 503 };
    }
    if (message === "ACCOUNT_EXISTS") {
      return { error: "An account with this email already exists.", status: 409 };
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
  try {
    const store = await getAccountStore();
    await store.setKeyPrefix(email, keyPrefix);
  } catch (error) {
    if ((error as Error).message === ACCOUNT_STORE_UNAVAILABLE) {
      return;
    }
    throw error;
  }
}
