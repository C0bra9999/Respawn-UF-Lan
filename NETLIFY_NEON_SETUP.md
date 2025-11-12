# Netlify Neon Database Setup Guide

This guide explains how to complete the database setup for the Respawn UF LAN registration system.

## What's been done

✅ Netlify Database provisioned (flat-dust-...)  
✅ NETLIFY_DATABASE_URL environment variable set on Netlify (all contexts: Production, Previews, Branch deploys)  
✅ @netlify/neon package installed locally  
✅ Netlify function (`register.js`) updated to use Neon via @netlify/neon  
✅ Frontend updated to call the function for counts and inserts  
✅ `.env.local` created for local development  
✅ `.gitignore` updated to exclude `.env.local`

## Next steps (you must complete these)

### 1. Create the registrations table in Neon

The SQL to create the table is in `neon/sql/create_registrations_table.sql`. You can run it in two ways:

**Option A: Using Netlify CLI (recommended)**

```powershell
# Connect to your Neon database and run the SQL file
# First, get your connection string from Netlify dashboard
# Then use psql (if installed) or the Neon web UI

# If you have psql installed:
psql "postgresql://neondb_owner:npg_9Ak3WXHhQVse@ep-holy-band-aebubabf-pooler.c-2.us-east-2.aws.neon.tech/neondb?sslmode=require" -f neon/sql/create_registrations_table.sql
```

**Option B: Using Neon Web UI (easiest)**

1. Go to https://console.neon.tech (or your Neon dashboard)
2. Select your database project
3. Click SQL Editor
4. Paste the contents of `neon/sql/create_registrations_table.sql`
5. Click Run

### 2. Test the function locally

```powershell
# Terminal 1: Start Netlify dev server (functions will auto-reload)
npx netlify-cli dev
# This will start the site at http://localhost:8888

# Terminal 2: Test the function
# GET - fetch count (should start at 0)
$response = Invoke-RestMethod -Uri 'http://localhost:8888/.netlify/functions/register' -Method GET
Write-Host "Current count: $($response.count)"

# POST - submit a test registration
$body = @{
    name = "Test User"
    email = "test@example.com"
    discord = "TestUser#1234"
    tournaments = @("cs2", "dota2")
    payment_method = "swish"
} | ConvertTo-Json

$response = Invoke-RestMethod -Uri 'http://localhost:8888/.netlify/functions/register' -Method POST -Body $body -ContentType 'application/json'
Write-Host "New count: $($response.count)"
```

### 3. Verify the data in Neon

```powershell
# Connect to your database and query the registrations
psql "postgresql://neondb_owner:npg_9Ak3WXHhQVse@ep-holy-band-aebubabf-pooler.c-2.us-east-2.aws.neon.tech/neondb?sslmode=require" -c "SELECT COUNT(*) FROM registrations;"
```

### 4. Deploy to Netlify

When you're ready to go live, push your changes:

```powershell
# Changes are already committed and pushed, but to redeploy:
&"C:\Program Files\Git\cmd\git.exe" push origin master
# Netlify will automatically rebuild and deploy
```

Check the Netlify deploy logs to verify the function is working:

-  Netlify UI → Deployments → Latest → Functions

### 5. Test the deployed function

```powershell
# Replace YOURDOMAIN with your actual Netlify domain (e.g., respawnuflan.netlify.app)
$domain = "respawnuflan.netlify.app"

# Test GET
$response = Invoke-RestMethod -Uri "https://$domain/.netlify/functions/register" -Method GET
Write-Host "Count on production: $($response.count)"

# Test POST (open the site and submit the registration form)
```

## Environment variables

The `NETLIFY_DATABASE_URL` is already set in your Netlify site environment variables across all contexts (production, previews, branch deploys).

For **local development**, the `.env.local` file has been created with the connection string. Netlify CLI (`npx netlify-cli dev`) will automatically load this file.

**Never commit** `.env.local` or any file with secrets. It's in `.gitignore`.

## Troubleshooting

### Function returns 500 error

1. Check Netlify function logs:
   -  Netlify UI → Site → Functions → Recent invocations
2. Verify NETLIFY_DATABASE_URL is set correctly (no typos, URL is current)
3. Verify the registrations table exists in Neon:
   ```sql
   SELECT table_name FROM information_schema.tables WHERE table_schema = 'public';
   ```

### "Connection refused" or timeout

-  Check your Neon database is running (Neon dashboard → Projects)
-  Verify the connection string is correct (including credentials)
-  If using a firewall, ensure outbound traffic to Neon is allowed

### "count is not defined" or SQL syntax errors

-  Ensure the SQL was run correctly and the table exists
-  Check that `COUNT(*)::int AS count` is using the correct syntax for your Postgres version

## Next steps (optional)

-  Add rate-limiting or CAPTCHA to prevent spam registrations
-  Create an admin dashboard to view and manage registrations
-  Add email confirmation for registrations
-  Migrate other Supabase code paths if needed (currently only registrations are using Neon)

## Architecture

```
┌─────────────────────┐
│   Frontend (React)  │
│  HeroSection        │ ← polls GET /.netlify/functions/register every 10s
│  RegistrationForm   │ ← POSTs registration to function
└──────────┬──────────┘
           │
     ┌─────▼─────────────────────────────┐
     │  Netlify Function: register.js     │
     │  Uses @netlify/neon                │
     │  - GET: SELECT COUNT(*)            │
     │  - POST: INSERT registration row   │
     └─────┬─────────────────────────────┘
           │
     ┌─────▼──────────────────┐
     │   Neon Postgres DB    │
     │   registrations table  │
     └───────────────────────┘
```

## Questions?

-  Netlify CLI docs: https://cli.netlify.com
-  Neon docs: https://neon.tech/docs
-  @netlify/neon docs: https://www.npmjs.com/package/@netlify/neon
