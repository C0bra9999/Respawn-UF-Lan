-- Respawn UF LAN - Registrations Table (Netlify Neon)
-- Run this in your Neon SQL editor or via psql

-- Enable pgcrypto extension for UUID generation
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- Create registrations table
CREATE TABLE IF NOT EXISTS public.registrations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  discord text,
  tournaments jsonb,
  payment_method text,
  created_at timestamptz DEFAULT now()
);

-- Create indexes for common queries
CREATE INDEX IF NOT EXISTS idx_registrations_created_at ON public.registrations(created_at);
CREATE INDEX IF NOT EXISTS idx_registrations_email ON public.registrations(email);

-- Optional: Add a simple count view for quick stats
CREATE OR REPLACE VIEW registration_stats AS
SELECT 
  COUNT(*) as total_count,
  COUNT(*) FILTER (WHERE created_at >= NOW() - INTERVAL '1 day') as registrations_today;

GRANT SELECT ON public.registrations TO public;
GRANT SELECT ON registration_stats TO public;

-- Notes:
-- - The Netlify function (register.js) uses NETLIFY_DATABASE_URL to connect
-- - Inserts and reads are performed server-side, so no RLS policies needed
-- - Connection is pooled and secured via Neon
