import { Router } from "express";
import { z } from "zod";
import { supabase } from "../db.js";

const router = Router();

const schema = z.object({
  name: z.string().trim().min(2).max(100),
  phone: z.string().trim().min(6).max(20),
  company: z.string().trim().min(2).max(120),
});

router.post("/", async (req, res, next) => {
  try {
    const data = schema.parse(req.body);

    const { data: result, error } = await supabase
      .from("demo_requests")
      .insert({
        name: data.name,
        phone: data.phone,
        company: data.company,
      })
      .select("id, created_at")
      .single();

    if (error) {
      throw new Error(error.message);
    }

    res.status(201).json({
      ok: true,
      id: result.id,
      created_at: result.created_at,
    });
  } catch (e) {
    next(e);
  }
});

export default router;