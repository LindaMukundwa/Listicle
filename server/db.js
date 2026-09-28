/* ============================================================
   Postgres connection pool that is created once and shares all routes.
   ============================================================ 
   */

import pg from "pg";

const { Pool } = pg;


const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error(
    "DATABASE_URL is not set. Did you create a .env file (locally) " +
    "or link your database in Render (deployed)?"
  );
}

const isLocal =
  connectionString.includes("localhost") ||
  connectionString.includes("127.0.0.1");

const pool = new Pool({
  connectionString,
  // Render's managed Postgres requires SSL from outside.
  ssl: isLocal ? false : { rejectUnauthorized: false },
  // Pool sizing is small and appropriate for a single small app.
  max: 10,
  idleTimeoutMillis: 30_000,
  connectionTimeoutMillis: 5_000,
});

/* ------------------------------------------------------------
   Logging
   ------------------------------------------------------------ */

pool.on("connect", () => {
  // Per-connection chatter during debugging.
  // console.log("[db] client connected");
});

pool.on("error", (err) => {
  // Idle client errors shouldn't crash the process.
  console.error("[db] unexpected idle client error:", err.message);
});

/* ------------------------------------------------------------
   Exports
   ------------------------------------------------------------ */

export async function query(text, params) {
  const start = Date.now();
  try {
    const result = await pool.query(text, params);
    const duration = Date.now() - start;
    // Query timing during development.
    // console.log("[db] query", { text, duration, rows: result.rowCount });
    return result;
  } catch (err) {
    console.error("[db] query failed:", err.message);
    throw err;
  }
}

export default pool;