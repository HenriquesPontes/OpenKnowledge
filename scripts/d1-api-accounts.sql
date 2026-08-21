CREATE TABLE IF NOT EXISTS api_accounts (
  email TEXT PRIMARY KEY NOT NULL,
  password_hash TEXT NOT NULL,
  created_at TEXT NOT NULL,
  registration_code TEXT,
  key_prefix TEXT
);

CREATE INDEX IF NOT EXISTS idx_api_accounts_created_at
  ON api_accounts (created_at);
