-- Run this in Supabase SQL editor for project: ooqgeiedqropzrvfxqjv
-- Creates a simple registrations table for the LAN signups

-- Optional: enable pgcrypto to use gen_random_uuid()
CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE IF NOT EXISTS public.registrations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  discord text,
  tournaments jsonb,
  payment_method text,
  created_at timestamptz DEFAULT now()
);

-- If you want to allow anonymous insert/select from the client using the anon key, you can either disable RLS
-- or create permissive policies for development. For production consider using a server endpoint with service_role key.

-- Example: enable row level security and create very permissive policies (DEVELOPMENT ONLY)
ALTER TABLE public.registrations ENABLE ROW LEVEL SECURITY;

-- Allow inserts by anon (Development only)
CREATE POLICY "anon_insert" ON public.registrations
  FOR INSERT
  USING (auth.role() = 'anon')
  WITH CHECK (true);

-- Allow selects by anyone (if you want frontend to read list/count)
CREATE POLICY "anon_select" ON public.registrations
  FOR SELECT
  USING (true);

-- Note: granting these policies makes the table readable/writable by the anon key. For better security,
-- prefer to keep RLS enabled and use a serverless function with service_role key for writes.
