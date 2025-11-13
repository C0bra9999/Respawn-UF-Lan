// Netlify Function: register (Neon DB)
// - POST: insert a registration into the Postgres database
// - GET: return the current registrations count
// Uses @netlify/neon, läser NETLIFY_DATABASE_URL automatiskt

const { neon } = require("@netlify/neon");

exports.handler = async function (event, context) {
   try {
      const sql = neon();

      // ---- GET: return count of registrations ----
      if (event.httpMethod === "GET") {
         const rows =
            await sql`SELECT COUNT(*)::int AS count FROM registrations`;
         const count =
            rows && rows[0] && typeof rows[0].count === "number"
               ? rows[0].count
               : 0;

         return {
            statusCode: 200,
            body: JSON.stringify({ count }),
         };
      }

      // ---- Only allow POST for new registrations ----
      if (event.httpMethod !== "POST") {
         return {
            statusCode: 405,
            body: "Method Not Allowed",
         };
      }

      // ---- Parse POST payload ----
      const payload = JSON.parse(event.body || "{}");
      const name = payload.name || null;
      const email = payload.email || null;
      const discord = payload.discord || null;
      const tournaments = payload.tournaments
         ? JSON.stringify(payload.tournaments)
         : null;
      const payment_method = payload.payment_method || null;

      // ---- Validate required fields ----
      if (!name || !email) {
         return {
            statusCode: 400,
            body: JSON.stringify({ error: "Name and email are required." }),
         };
      }

      // ---- Insert new registration ----
      await sql`
      INSERT INTO registrations (name, email, discord, tournaments, payment_method, created_at)
      VALUES (${name}, ${email}, ${discord}, ${tournaments}::jsonb, ${payment_method}, now())
    `;

      // ---- Return updated count ----
      const rows = await sql`SELECT COUNT(*)::int AS count FROM registrations`;
      const count =
         rows && rows[0] && typeof rows[0].count === "number"
            ? rows[0].count
            : 0;

      return {
         statusCode: 200,
         body: JSON.stringify({ count }),
      };
   } catch (err) {
      console.error("register function error", err);
      return {
         statusCode: 500,
         body: JSON.stringify({ error: String(err) }),
      };
   }
};
