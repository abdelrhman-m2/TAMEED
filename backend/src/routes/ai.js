import express from "express";
import { z } from "zod";
import { query } from "../db.js";
import { sendLeadEmail } from "../lib/mailer.js";

const router = express.Router();

const SYSTEM_PROMPT = `
You are the official TAMEED AI Sales Assistant.
ONLY answer about TAMEED ERP systems and services.
Reply in same language as the user.
Keep answers concise (max 3 short sentences).
When the user seems interested, ask for: name, phone, business type, and need.
`;

router.post("/", async (req, res) => {
  try {
    const { message, history } = req.body;
    if (!process.env.GROQ_API_KEY) {
      return res.status(500).json({ reply: "GROQ_API_KEY is not configured on server." });
    }
    const model = process.env.GROQ_MODEL || "llama-3.1-8b-instant";
    const msgs = (history || []).map((m) => ({
      role: m.role === "assistant" ? "assistant" : "user",
      content: m.content,
    }));
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model,
        temperature: 0.3,
        max_tokens: 250,
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          ...msgs,
          { role: "user", content: message },
        ],
      }),
    });
    if (!response.ok) {
      const errText = await response.text();
      throw new Error(`Groq API error: ${response.status} ${errText}`);
    }
    const data = await response.json();
    const reply = data?.choices?.[0]?.message?.content || "تقدر تسألني عن أي نظام من أنظمة TAMEED.";

    res.json({ reply });
  } catch (err) {
    console.error(err);
    res.status(500).json({ reply: "حدث خطأ في الرد من الذكاء الاصطناعي" });
  }
});

const leadSchema = z.object({
  name: z.string().trim().min(2).max(100),
  phone: z.string().trim().min(6).max(20),
  business_type: z.string().trim().min(2).max(80),
  message: z.string().trim().min(5).max(1000),
  notes: z.string().trim().max(4000).optional(),
});

router.post("/lead", async (req, res, next) => {
  try {
    const data = leadSchema.parse(req.body);
    const r = await query(
      `INSERT INTO leads (name, phone, business_type, message, source, notes)
       VALUES ($1,$2,$3,$4,$5,$6)
       RETURNING id, created_at`,
      [data.name, data.phone, data.business_type, data.message, "chatbot", data.notes || null]
    );

    await sendLeadEmail({
      subject: "New TAMEED lead (chatbot)",
      html: `
        <h3>New Chatbot Lead</h3>
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Phone:</strong> ${data.phone}</p>
        <p><strong>Business:</strong> ${data.business_type}</p>
        <p><strong>Need:</strong><br/>${data.message}</p>
        <p><strong>Notes:</strong><br/>${data.notes || "-"}</p>
      `,
    });

    res.status(201).json({ ok: true, id: r.rows[0].id, created_at: r.rows[0].created_at });
  } catch (e) {
    next(e);
  }
});

export default router;