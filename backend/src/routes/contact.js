import { Router } from "express";
import { z } from "zod";
import { supabase } from "../db.js";
import { sendLeadEmail } from "../lib/mailer.js";

const router = Router();

// validation
const schema = z.object({
  name: z.string().trim().min(2).max(100),
  phone: z.string().trim().min(6).max(20),
  business_type: z.string().trim().min(2).max(80),
  message: z.string().trim().min(5).max(1000),
});

router.post("/", async (req, res, next) => {
  try {
    const data = schema.parse(req.body);

    // 1. save to database
    const { data: row, error } = await supabase
      .from("leads")
      .insert({
        name: data.name,
        phone: data.phone,
        business_type: data.business_type,
        message: data.message,
        source: "contact_form",
      })
      .select("id, created_at")
      .single();

    if (error) throw new Error(error.message);

    await sendLeadEmail({
      subject: "New TAMEED lead (contact form)",
      html: `
        <h3>New Lead</h3>
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Phone:</strong> ${data.phone}</p>
        <p><strong>Business:</strong> ${data.business_type}</p>
        <p><strong>Message:</strong><br/>${data.message}</p>
      `,
    });

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