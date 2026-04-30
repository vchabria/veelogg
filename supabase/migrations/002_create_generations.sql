-- 002_create_generations.sql
-- Creates the tool_name enum, generations table, index, and RLS policies.

-- Custom enum for tool names
CREATE TYPE tool_name AS ENUM (
  'hook-generator',
  'script-writer',
  'repurpose',
  'brand-pitch',
  'brand-intel'
);

-- Generations table
CREATE TABLE generations (
  id          uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id     uuid        NOT NULL REFERENCES profiles ON DELETE CASCADE,
  tool        tool_name   NOT NULL,
  input       jsonb       NOT NULL DEFAULT '{}',
  output      jsonb       NOT NULL DEFAULT '{}',
  model       text        NOT NULL,
  tokens_used integer     NOT NULL DEFAULT 0,
  created_at  timestamptz DEFAULT now()
);

-- Composite index for fast rate-limiting lookups
CREATE INDEX idx_generations_user_created
  ON generations (user_id, created_at);

-- Enable Row Level Security
ALTER TABLE generations ENABLE ROW LEVEL SECURITY;

-- Policy: users can read their own generation rows
CREATE POLICY "Users can select own generations"
  ON generations
  FOR SELECT
  USING (auth.uid() = user_id);

-- Policy: users can insert rows for themselves
CREATE POLICY "Users can insert own generations"
  ON generations
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Policy: service role has full access
CREATE POLICY "Service role full access"
  ON generations
  USING (auth.role() = 'service_role')
  WITH CHECK (auth.role() = 'service_role');
