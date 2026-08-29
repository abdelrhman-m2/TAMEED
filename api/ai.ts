export default async function handler(req: any, res: any) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    let body = req.body;
    if (typeof body === "string") {
      try {
        body = JSON.parse(body);
      } catch (e) {
        // use raw body if parse fails
      }
    }

    const { message, history = [] } = body || {};

    if (!message || typeof message !== "string") {
      return res.status(400).json({ reply: "من فضلك اكتب سؤالك أولاً." });
    }

    const rawKey = process.env.GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY || "";
    const apiKey = rawKey.replace(/['"]/g, "").trim();

    if (!apiKey) {
      return res.status(500).json({
        reply: "GEMINI_API_KEY is missing on Vercel environment variables.",
      });
    }

    const model = (process.env.GEMINI_MODEL || "gemini-3.6-flash").replace(/['"]/g, "").trim();

    const contents = [];
    for (const m of history) {
      contents.push({
        role: m.role === "assistant" ? "model" : "user",
        parts: [{ text: m.content }],
      });
    }

    contents.push({
      role: "user",
      parts: [{ text: message }],
    });

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          system_instruction: {
            parts: [
              {
                text: `You are the official TAMEED AI Sales Assistant. ONLY answer about TAMEED ERP systems and services (Inventory, Sales, Purchasing, HR, Payroll, Business management). Reply in the same language as the user. Keep answers concise and professional.`,
              },
            ],
          },
          contents,
          generationConfig: {
            temperature: 0.3,
            maxOutputTokens: 350,
          },
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error("Vercel AI Gemini Error:", data);
      return res.status(response.status).json({
        reply: data?.error?.message || "حدث خطأ أثناء الاتصال بخدمة الذكاء الاصطناعي.",
      });
    }

    const reply =
      data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "تقدر تسألني عن أي نظام من أنظمة TAMEED.";

    return res.status(200).json({ reply });
  } catch (err: any) {
    console.error("Vercel AI Function Exception:", err);
    return res.status(500).json({
      reply: err?.message || "حدث خطأ في الرد من الذكاء الاصطناعي.",
    });
  }
}
