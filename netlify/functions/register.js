// Netlify Function: register
// Receives POST from frontend and inserts a registration into Supabase using the service_role key.
// Requires environment variable NETLIFY_SUPABASE_SERVICE_ROLE_KEY (set in Netlify site settings).

exports.handler = async function (event, context) {
   try {
      if (event.httpMethod !== "POST") {
         return { statusCode: 405, body: "Method Not Allowed" };
      }

      const SERVICE_ROLE_KEY =
         process.env.NETLIFY_SUPABASE_SERVICE_ROLE_KEY ||
         process.env.SUPABASE_SERVICE_ROLE_KEY;
      const PROJECT_ID =
         process.env.SUPABASE_PROJECT_ID || "ooqgeiedqropzrvfxqjv";
      const SUPABASE_URL =
         process.env.SUPABASE_URL || `https://${PROJECT_ID}.supabase.co`;

      if (!SERVICE_ROLE_KEY) {
         return {
            statusCode: 500,
            body: "Missing Supabase service role key. Set NETLIFY_SUPABASE_SERVICE_ROLE_KEY in Netlify environment variables.",
         };
      }

      const payload = JSON.parse(event.body || "{}");

      // Insert row
      const insertRes = await fetch(`${SUPABASE_URL}/rest/v1/registrations`, {
         method: "POST",
         headers: {
            "Content-Type": "application/json",
            apikey: SERVICE_ROLE_KEY,
            Authorization: `Bearer ${SERVICE_ROLE_KEY}`,
            Prefer: "return=representation",
         },
         body: JSON.stringify(payload),
      });

      if (!insertRes.ok) {
         const txt = await insertRes.text();
         return { statusCode: insertRes.status, body: `Insert failed: ${txt}` };
      }

      // Optionally return updated registrations (or count). We'll return a count to keep payload small.
      const countRes = await fetch(
         `${SUPABASE_URL}/rest/v1/registrations?select=id`,
         {
            method: "GET",
            headers: {
               apikey: SERVICE_ROLE_KEY,
               Authorization: `Bearer ${SERVICE_ROLE_KEY}`,
            },
         }
      );

      if (!countRes.ok) {
         const txt = await countRes.text();
         return {
            statusCode: 200,
            body: JSON.stringify({
               message: "Inserted but failed to fetch count",
               error: txt,
            }),
         };
      }

      const rows = await countRes.json();
      return { statusCode: 200, body: JSON.stringify({ count: rows.length }) };
   } catch (err) {
      console.error("Function error", err);
      return { statusCode: 500, body: String(err) };
   }
};
