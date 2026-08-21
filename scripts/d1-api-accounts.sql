CREATE TABLE IF NOT EXISTS api_accounts (
  email TEXT PRIMARY KEY NOT NULL,
  password_hash TEXT NOT NULL,
  created_at TEXT NOT NULL,
  registration_code TEXT,
  key_prefix TEXT
);

CREATE INDEX IF NOT EXISTS idx_api_accounts_created_at
  ON api_accounts (created_at);

CREATE TABLE IF NOT EXISTS waitlist (
  email TEXT NOT NULL,
  source TEXT NOT NULL,
  joined_at TEXT NOT NULL,
  PRIMARY KEY (email, source)
);

CREATE INDEX IF NOT EXISTS idx_waitlist_joined_at
  ON waitlist (joined_at);

CREATE INDEX IF NOT EXISTS idx_waitlist_source
  ON waitlist (source);
