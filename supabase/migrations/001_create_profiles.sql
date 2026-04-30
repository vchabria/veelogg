-- 001_create_profiles.sql
-- Creates the profiles table, auto-creation trigger, RLS policies, and updated_at trigger.

-- Profiles table
CREATE TABLE profiles (
  id              uuid        PRIMARY KEY REFERENCES auth.users ON DELETE CASCADE,
  email           text        NOT NULL,
  plan            text        NOT NULL DEFAULT 'free' CHECK (plan IN ('free', 'pro')),
  stripe_customer_id text,
  created_at      timestamptz DEFAULT now(),
  updated_at      timestamptz DEFAULT now()
);

-- Trigger function: auto-create a profile row when a new auth.users row is inserted
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, email)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data ->> 'email', NEW.email)
  );
  RETURN NEW;
END;
$$;

-- Trigger on auth.users
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- Trigger function: keep updated_at current on any UPDATE
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS trigger
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

-- Apply updated_at trigger to profiles
CREATE TRIGGER profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.set_updated_at();

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Policy: users can read their own profile
CREATE POLICY "Users can select own profile"
  ON profiles
  FOR SELECT
  USING (auth.uid() = id);

-- Policy: service role has full access
CREATE POLICY "Service role full access"
  ON profiles
  USING (auth.role() = 'service_role')
  WITH CHECK (auth.role() = 'service_role');
