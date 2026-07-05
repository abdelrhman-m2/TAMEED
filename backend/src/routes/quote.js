import { Router } from "express";
import { z } from "zod";
import { query } from "../db.js";

const router = Router();

const schema = z.object({
  name: z.string().trim().min(2).max(100),
  phone: z.string().trim().min(6).max(20),
  users: z.number().int().min(1).max(10000),
  business_type: z.string().trim().min(2).max(80),
  modules: z.array(z.string()).max(20),
  estimate: z.number().nonnegative(),
});

router.post("/", async (req, res, next) => {
  try {
    const data = schema.parse(req.body);
    const r = await query(
      `INSERT INTO quote_requests (name, phone, users, business_type, modules, estimate)
       VALUES ($1,$2,$3,$4,$5,$6) RETURNING id, created_at`,
      [data.name, data.phone, data.users, data.business_type, data.modules, data.estimate]
    );
    res.status(201).json({ ok: true, id: r.rows[0].id });
  } catch (e) { next(e); }
});

export default router;
