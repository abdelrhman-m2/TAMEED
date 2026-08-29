import express from "express";
import { z } from "zod";
import { supabase } from "../db.js";
import { sendLeadEmail } from "../lib/mailer.js";

const router = express.Router();

const SYSTEM_PROMPT = `
You are the official TAMEED AI Sales Assistant.

ONLY answer about TAMEED ERP systems and services.

TAMEED provides ERP solutions including:
- Inventory management
- Sales management
- Purchasing management
- Human resources
- Payroll
- Business management

Reply in the same language as the user.

Keep answers concise and professional.

If the user is interested in purchasing, demo, pricing, or contacting sales,
ask for:
- Name
- Phone
- Business type
- Business need
`;

router.post("/", async (req, res) => {
  try {
    const { message, history = [] } = req.body;

    if (!message || typeof message !== "string") {
      return res.status(400).json({
        reply: "من فضلك اكتب سؤالك أولاً.",
      });
    }

    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({
        reply: "GEMINI_API_KEY is not configured on server.",
      });
    }

    const model = process.env.GEMINI_MODEL || "gemini-3.6-flash";

    const contents = [];

    // Previous conversation
    for (const m of history) {
      contents.push({
        role: m.role === "assistant" ? "model" : "user",
        parts: [{ text: m.content }],
      });
    }

    // Current message
    contents.push({
      role: "user",
      parts: [{ text: message }],
    });

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          system_instruction: {
            parts: [
              {
                text: SYSTEM_PROMPT,
              },
            ],
          },

          contents,

          generationConfig: {
            temperature: 0.3,
            maxOutputTokens: 500,
          },
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error("Gemini API Error:", data);

      return res.status(response.status).json({
        reply:
          data?.error?.message ||
          "حدث خطأ أثناء الاتصال بخدمة الذكاء الاصطناعي.",
      });
    }

    const reply =
      data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "تقدر تسألني عن أي نظام من أنظمة TAMEED.";

    res.json({ reply });
  } catch (err) {
    console.error("AI Error:", err);

    res.status(500).json({
      reply: "حدث خطأ في الرد من الذكاء الاصطناعي.",
    });
  }
});


// ============================================================
// CHATBOT LEAD
// ============================================================

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

    const { data: lead, error } = await supabase
      .from("leads")
      .insert({
        name: data.name,
        phone: data.phone,
        business_type: data.business_type,
        message: data.message,
        source: "chatbot",
        notes: data.notes || null,
      })
      .select("id, created_at")
      .single();

    if (error) {
      throw new Error(error.message);
    }

    try {
      await sendLeadEmail({
        subject: "New TAMEED lead (chatbot)",
        html: `
          <h3>New Chatbot Lead</h3>

          <p>
            <strong>Name:</strong>
            ${data.name}
          </p>

          <p>
            <strong>Phone:</strong>
            ${data.phone}
          </p>

          <p>
            <strong>Business:</strong>
            ${data.business_type}
          </p>

          <p>
            <strong>Need:</strong><br/>
            ${data.message}
          </p>

          <p>
            <strong>Notes:</strong><br/>
            ${data.notes || "-"}
          </p>
        `,
      });
    } catch (emailError) {
      console.error("Lead email error:", emailError);
      // Don't fail the lead if email fails
    }

    res.status(201).json({
      ok: true,
      id: lead.id,
      created_at: lead.created_at,
    });
  } catch (e) {
    next(e);
  }
});

export default router;