/* ============================================================
   API routes for guide data.
   ============================================================ */

import { Router } from "express";
import { query } from "../db.js";

const router = Router();

/* ------------------------------------------------------------
   GET /api/guides
   Returns all guides, ordered so the grid is stable.
   ------------------------------------------------------------ */

router.get("/", async (req, res, next) => {
  try {
    const result = await query(
      `SELECT id, slug, title, short_description, image,
              difficulty, time_commitment, checklist,
              common_mistakes, pro_tip, created_at
       FROM guides
       ORDER BY id ASC`
    );
    res.json(result.rows);
  } catch (err) {
    next(err);
  }
});

/* ------------------------------------------------------------
   GET /api/guides/:slug
   Returns a single guide by its slug, or 404 if not found.
   ------------------------------------------------------------ */

router.get("/:slug", async (req, res, next) => {
  try {
    const { slug } = req.params;
    const result = await query(
      `SELECT id, slug, title, short_description, image,
              difficulty, time_commitment, checklist,
              common_mistakes, pro_tip, created_at
       FROM guides
       WHERE slug = $1`,
      [slug]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Guide not found" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    next(err);
  }
});

export default router;