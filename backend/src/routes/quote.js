import { Router } from "express";
import { z } from "zod";
import { supabase } from "../db.js";

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

    const { data: row, error } = await supabase
      .from("quote_requests")
      .insert({
        name: data.name,
        phone: data.phone,
        users: data.users,
        business_type: data.business_type,
        modules: data.modules,
        estimate: data.estimate,
      })
      .select("id, created_at")
      .single();

    if (error) {
      throw new Error(error.message);
    }

    res.status(201).json({
      ok: true,
      id: row.id,
      created_at: row.created_at,
    });
  } catch (e) {
    next(e);
  }
});

export default router;
