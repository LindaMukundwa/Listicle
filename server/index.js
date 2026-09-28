/* ============================================================
   Express app that loads env, serves static client, mounts API,
   provides error handling and SPA fallback.
   ============================================================ */

import "dotenv/config";
import express from "express";
import path from "node:path";
import { fileURLToPath } from "node:url";

import guidesRouter from "./routes/guides.js";

/* ------------------------------------------------------------
   Path setup
   ------------------------------------------------------------ */

const __filename = fileURLToPath(import.meta.url);
const __dirname  = path.dirname(__filename);

// client/ lives two levels up from server/index.js
const CLIENT_DIR = path.resolve(__dirname, "..", "client");

const app = express();
const PORT = process.env.PORT || 3000;

/* ------------------------------------------------------------
   1. Body parser
   ------------------------------------------------------------ */

app.use(express.json({ limit: "100kb" }));

/* ------------------------------------------------------------
   2. Request logging (development only)
   ------------------------------------------------------------ */

if (process.env.NODE_ENV !== "production") {
  app.use((req, res, next) => {
    const start = Date.now();
    res.on("finish", () => {
      const ms = Date.now() - start;
      console.log(`${req.method} ${req.originalUrl} → ${res.statusCode} (${ms}ms)`);
    });
    next();
  });
}

/* ------------------------------------------------------------
   3. Static files
   ------------------------------------------------------------
   Serves index.html, css/, js/ from the client folder.
   ------------------------------------------------------------ */

app.use(express.static(CLIENT_DIR));

/* ------------------------------------------------------------
   4. API routes
   ------------------------------------------------------------
   Mounted at /api/guides. All routes live in the router.
   ------------------------------------------------------------ */

app.use("/api/guides", guidesRouter);

/* ------------------------------------------------------------
   5. SPA fallback
   ------------------------------------------------------------
   Any GET request that isn't /api/* and didn't match a static
   file gets index.html.
   ------------------------------------------------------------ */

app.get(/^(?!\/api).*/, (req, res) => {
  res.sendFile(path.join(CLIENT_DIR, "index.html"));
});

/* ------------------------------------------------------------
   6. Error handler
   ------------------------------------------------------------ */

app.use((err, req, res, next) => {
  console.error("[error]", err.stack || err.message);
  res.status(err.status || 500).json({
    error: process.env.NODE_ENV === "production"
      ? "Internal server error"
      : err.message
  });
});

/* ------------------------------------------------------------
   7. Boot
   ------------------------------------------------------------ */

app.listen(PORT, () => {
  console.log(`🐾 Foster Paws is running on http://localhost:${PORT}`);
});