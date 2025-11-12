// Netlify Function: register (Neon DB)
// - POST: insert a registration into the Postgres database referenced by NETLIFY_DATABASE_URL
// - GET: return the current registrations count
// Uses the lightweight @netlify/neon helper which reads NETLIFY_DATABASE_URL automatically.

const { neon } = require("@netlify/neon");

exports.handler = async function (event, context) {
   try {
      const sql = neon();

      if (event.httpMethod === "GET") {
         // Return a small payload with the current count
         const rows =
            await sql`SELECT COUNT(*)::int AS count FROM registrations`;
         const count =
            rows && rows[0] && typeof rows[0].count === "number"
               ? rows[0].count
               : 0;
         return { statusCode: 200, body: JSON.stringify({ count }) };
      }

      if (event.httpMethod !== "POST") {
         return { statusCode: 405, body: "Method Not Allowed" };
      }

      const payload = JSON.parse(event.body || "{}");

      // Basic sanitization / fallback
      const name = payload.name || null;
      const email = payload.email || null;
      const discord = payload.discord || null;
      const tournaments = payload.tournaments
         ? JSON.stringify(payload.tournaments)
         : null;
      const payment_method = payload.payment_method || null;

      // Insert into registrations table (assumes table exists)
      await sql`
        INSERT INTO registrations (name, email, discord, tournaments, payment_method, created_at)
        VALUES (${name}, ${email}, ${discord}, ${tournaments}::jsonb, ${payment_method}, now())
      `;

      // Return updated count
      const rows = await sql`SELECT COUNT(*)::int AS count FROM registrations`;
      const count =
         rows && rows[0] && typeof rows[0].count === "number"
            ? rows[0].count
            : 0;

      return { statusCode: 200, body: JSON.stringify({ count }) };
   } catch (err) {
      console.error("register function error", err);
      return { statusCode: 500, body: String(err) };
   }
};
