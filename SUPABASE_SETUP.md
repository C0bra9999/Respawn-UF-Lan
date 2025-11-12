# Netlify Neon DB setup for Respawn UF LAN

This project now uses a Postgres database provisioned via Netlify (Neon). The frontend communicates with a Netlify Function (`/.netlify/functions/register`) which performs inserts and returns counts. This keeps DB credentials out of the browser.

1. Claim or provision the Netlify DB

-  If you're using the temporary Netlify DB (e.g. `flat-dust-...`), claim it via the Netlify UI so it doesn't expire. See Netlify dashboard → Databases.

2. Create the `registrations` table

-  Open a SQL editor connected to your Netlify Postgres (or run via psql). Run the SQL in `supabase/sql/create_registrations_table.sql` — it's plain Postgres and will work on Neon/Postgres. You can also rename or move the file to `neon/sql/` if you prefer.

3. Environment variables (Netlify)

-  Go to your Netlify site → Site settings → Build & deploy → Environment.
-  Add the following variables (Netlify provides `NETLIFY_DATABASE_URL` automatically if you provision via the Netlify DB UI; otherwise set it yourself):
   -  `NETLIFY_DATABASE_URL` = (your database connection string)
   -  `NETLIFY_DATABASE_URL_UNPOOLED` = (optional unpooled connection string)

4. How it works

-  The frontend calls `/.netlify/functions/register`:
   -  `GET` returns `{ count }` — the number of registrations.
   -  `POST` inserts a registration row into `registrations` and returns the updated `{ count }`.
-  The function uses `@netlify/neon` which automatically reads `NETLIFY_DATABASE_URL`.

5. Local development

-  To run functions locally, install `netlify-cli` and run `netlify dev` (or `ntl dev`). Ensure `NETLIFY_DATABASE_URL` is set in your local environment or `.env` so the functions can connect.

6. Security

-  Keep `NETLIFY_DATABASE_URL` secret. Do not commit it to source control. Netlify manages this as an environment variable for deployed functions.
-  The SQL file included is a simple table creation script and does not include Supabase-specific RLS policies.

7. Verify

-  After deployment, open the site and submit a registration. Check Netlify function logs and the Postgres table to confirm rows are inserted.

If you'd like, I can:

-  Add server-side validation/rate-limiting in the Netlify function.
-  Add a separate function to return a paginated list of registrations for an admin UI.
-  Move the SQL file to a `neon/` folder and update docs accordingly.
