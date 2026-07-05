import { Router } from "express";
import { z } from "zod";
import { query } from "../db.js";

const router = Router();

const schema = z.object({
  name: z.string().trim().min(2).max(100),
  phone: z.string().trim().min(6).max(20),
  company: z.string().trim().min(2).max(120),
});

router.post("/", async (req, res, next) => {
  try {
    const data = schema.parse(req.body);
    const r = await query(
      `INSERT INTO demo_requests (name, phone, company)
       VALUES ($1,$2,$3) RETURNING id, created_at`,
      [data.name, data.phone, data.company]
    );
    res.status(201).json({ ok: true, id: r.rows[0].id });
  } catch (e) { next(e); }
});

export default router;
