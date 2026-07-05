import { Router } from "express";
import { query } from "../db.js";

const router = Router();

router.get("/", async (_req, res, next) => {
  try {
    const [{ rows: leads }, { rows: demos }, { rows: quotes }] = await Promise.all([
      query("SELECT COUNT(*)::int AS c FROM leads"),
      query("SELECT COUNT(*)::int AS c FROM demo_requests"),
      query("SELECT COUNT(*)::int AS c FROM quote_requests"),
    ]);
    res.json({
      clients: 100,
      years: 10,
      industries: 5,
      uptime: "99.9%",
      leads: leads[0].c,
      demos: demos[0].c,
      quotes: quotes[0].c,
    });
  } catch (e) { next(e); }
});

export default router;
