-- ============================================================
-- Foster Paws — schema
-- ============================================================
DROP TABLE IF EXISTS guides CASCADE;

CREATE TABLE guides (
  id                SERIAL PRIMARY KEY,
  slug              TEXT UNIQUE NOT NULL,
  title             TEXT NOT NULL,
  short_description TEXT NOT NULL,
  image             TEXT NOT NULL,
  difficulty        TEXT NOT NULL,
  time_commitment   TEXT NOT NULL,
  checklist         TEXT[] NOT NULL DEFAULT '{}',
  common_mistakes   TEXT[] NOT NULL DEFAULT '{}',
  pro_tip           TEXT NOT NULL,
  created_at        TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Slug is essentially URL key to make lookups fast.
CREATE INDEX IF NOT EXISTS guides_slug_idx ON guides (slug);