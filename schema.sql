-- playthetech — run once against your Azure Postgres database.
--
-- NOTE ON THE TABLE NAME
-- Postgres folds unquoted identifiers to lowercase, so playtheTechCompariosinPosts
-- becomes playthetechcompariosinposts unless it is created quoted. Created quoted
-- below to preserve the exact casing — which means EVERY query must also quote it:
--     SELECT * FROM "playtheTechCompariosinPosts";
-- If you would rather avoid that forever, drop the quotes here and use the
-- lowercase name everywhere. Either is fine; just pick one now.

CREATE TABLE IF NOT EXISTS "playtheTechCompariosinPosts" (
  id           SERIAL PRIMARY KEY,
  slug         TEXT NOT NULL UNIQUE,        -- the URL: /compare/<slug>
  title        TEXT NOT NULL,
  type         TEXT NOT NULL DEFAULT 'comparison',  -- comparison | roundup

  website_1    TEXT,                        -- e.g. notion.so
  website_2    TEXT,
  tool_1       TEXT NOT NULL,               -- e.g. Notion AI
  tool_2       TEXT NOT NULL,
  link_1       TEXT,                        -- vendor page — the source for tool 1
  link_2       TEXT,

  summary      TEXT,                        -- 40–60 words, sits under the H1
  content      TEXT,                        -- article body, Markdown

  author       TEXT,                        -- named author ≈ 2x more AI citations
  published    BOOLEAN NOT NULL DEFAULT FALSE,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at   TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS ptt_posts_published_idx
  ON "playtheTechCompariosinPosts" (published, updated_at DESC);


-- Public "request a comparison" submissions.
CREATE TABLE IF NOT EXISTS "playtheTechComparisonRequests" (
  id           SERIAL PRIMARY KEY,
  tool_1       TEXT NOT NULL,
  tool_2       TEXT NOT NULL,
  industry     TEXT,
  note         TEXT,
  email        TEXT,
  status       TEXT NOT NULL DEFAULT 'new', -- new | planned | done | rejected
  created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS ptt_requests_status_idx
  ON "playtheTechComparisonRequests" (status, created_at DESC);


-- Keep updated_at honest. This is what the "Last updated" line on the page reads,
-- and AI engines weight recency heavily — so it must reflect real edits.
CREATE OR REPLACE FUNCTION ptt_touch() RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS ptt_posts_touch ON "playtheTechCompariosinPosts";
CREATE TRIGGER ptt_posts_touch
  BEFORE UPDATE ON "playtheTechCompariosinPosts"
  FOR EACH ROW EXECUTE FUNCTION ptt_touch();


-- Per-post engagement: view count and anonymous up/down votes.
--
-- Deliberately NOT a review system. These numbers are never emitted as
-- Review or AggregateRating schema — GUARDRAILS R6.3 forbids marking up
-- reader signal as a rating, and that rule still stands.
--
-- Keyed by post id with ON DELETE CASCADE so removing a post takes its
-- counters with it.
CREATE TABLE IF NOT EXISTS "playtheTechPostStats" (
  post_id    INTEGER PRIMARY KEY
             REFERENCES "playtheTechCompariosinPosts"(id) ON DELETE CASCADE,
  views      BIGINT  NOT NULL DEFAULT 0,
  upvotes    INTEGER NOT NULL DEFAULT 0,
  downvotes  INTEGER NOT NULL DEFAULT 0,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS ptt_stats_views_idx
  ON "playtheTechPostStats" (views DESC);


-- Admin credentials, when changed from the ones in the environment.
--
-- BUILD-SPEC §3 puts the single admin login in env vars. That works but means
-- a password change is a redeploy. This one-row table lets the password be
-- changed from the admin UI instead.
--
-- The environment credentials keep working as a recovery path. That is
-- deliberate: with no email delivery there is no password-reset flow, so
-- losing the stored password would otherwise lock the only account out
-- permanently. Whoever can read .env can already read the database URL.
CREATE TABLE IF NOT EXISTS "playtheTechSettings" (
  id            INTEGER PRIMARY KEY DEFAULT 1 CHECK (id = 1),
  admin_email   TEXT,
  password_hash TEXT,          -- pbkdf2-sha256, 210k iterations, salt embedded
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);


-- Daily view breakdown, so traffic can be read over time rather than as one
-- ever-growing number.
--
-- "uniques" counts one per browser per post per day. There is no account and
-- no cookie for this: the browser keeps a marker in localStorage and tells the
-- server whether this is its first view of that post today. That is honest
-- about what it can measure — clearing storage or switching browser reads as a
-- new visitor — and it avoids storing any per-person identifier server side.
CREATE TABLE IF NOT EXISTS "playtheTechPostViews" (
  post_id  INTEGER NOT NULL
           REFERENCES "playtheTechCompariosinPosts"(id) ON DELETE CASCADE,
  day      DATE    NOT NULL,
  hour     SMALLINT NOT NULL DEFAULT 0 CHECK (hour BETWEEN 0 AND 23),
  views    INTEGER NOT NULL DEFAULT 0,
  uniques  INTEGER NOT NULL DEFAULT 0,
  PRIMARY KEY (post_id, day, hour)
);

CREATE INDEX IF NOT EXISTS ptt_views_day_idx
  ON "playtheTechPostViews" (day DESC);
