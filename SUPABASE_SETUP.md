# Supabase setup for Respawn UF LAN

This file explains the minimal steps to make the project work with your Supabase project `ooqgeiedqropzrvfxqjv` and Netlify.

1. Create the `registrations` table

-  Open Supabase dashboard → SQL Editor.
-  Run `supabase/sql/create_registrations_table.sql` (file in repo) or paste its contents.

2. Environment variables (Netlify)

-  Go to your Netlify site → Site settings → Build & deploy → Environment.
-  Add the following variables:
   -  `VITE_SUPABASE_URL` = `https://ooqgeiedqropzrvfxqjv.supabase.co`
   -  `VITE_SUPABASE_ANON_KEY` = (your project's anon/public key)
   -  `NETLIFY_SUPABASE_SERVICE_ROLE_KEY` = (your project's service_role key) <-- keep secret

3. Why the function exists

-  The frontend now calls `/.netlify/functions/register` to create new registrations.
-  The function runs on Netlify and uses the SERVICE_ROLE key (server-side) to insert into Supabase.
-  This prevents exposing the service_role key in the browser.

4. Local development

-  You can set the `VITE_SUPABASE_ANON_KEY` locally in `.env` (Vite reads `.env` variables starting with `VITE_`).
-  To run Netlify functions locally, use `netlify-cli` or `ntl dev` and set the env vars locally.

5. Policies & security

-  The SQL file includes permissive RLS policies for development. For production, prefer:
   -  Keep RLS enabled but _only_ allow select for anon if necessary.
   -  Use the Netlify function for inserts (as implemented here).

6. Verify

-  After deployment, open the site and submit registration. Check Netlify function logs and Supabase table to confirm rows are inserted.

If you want, I can also:

-  Add server-side validation in the Netlify function.
-  Return the full list of registrations from the function (beware of large payloads).
-  Add an admin page to list and manage registrations.
