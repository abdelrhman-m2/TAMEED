import { Router } from "express";
import { supabase } from "../db.js";

const router = Router();

router.get("/", async (_req, res, next) => {
  try {
    const [leadsResult, demosResult, quotesResult] = await Promise.all([
      supabase
        .from("leads")
        .select("*", { count: "exact", head: true }),

      supabase
        .from("demo_requests")
        .select("*", { count: "exact", head: true }),

      supabase
        .from("quote_requests")
        .select("*", { count: "exact", head: true }),
    ]);

    if (leadsResult.error) throw new Error(leadsResult.error.message);
    if (demosResult.error) throw new Error(demosResult.error.message);
    if (quotesResult.error) throw new Error(quotesResult.error.message);

    res.json({
      clients: 100,
      years: 10,
      industries: 5,
      uptime: "99.9%",
      leads: leadsResult.count || 0,
      demos: demosResult.count || 0,
      quotes: quotesResult.count || 0,
    });
  } catch (e) {
    next(e);
  }
});

export default router;
