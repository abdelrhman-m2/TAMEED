import { GoogleGenerativeAI } from "@google/generative-ai";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ reply: "Method not allowed" });
  }

  try {
    const { message, history = [] } = req.body || {};

    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({
        reply: "GEMINI_API_KEY is not configured.",
      });
    }

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

    const model = genAI.getGenerativeModel({
      model: process.env.GEMINI_MODEL || "gemini-3.6-flash",
      systemInstruction: `
You are the official TAMEED AI Sales Assistant.
ONLY answer about TAMEED ERP systems and services.
Reply in the same language as the user.
Keep answers concise, maximum 3 short sentences.
When the user seems interested, ask for:
name, phone, business type, and need.
      `,
    });

    const chat = model.startChat({
      history: history.map((m) => ({
        role: m.role === "assistant" ? "model" : "user",
        parts: [{ text: m.content }],
      })),
      generationConfig: {
        temperature: 0.3,
        maxOutputTokens: 250,
      },
    });

    const result = await chat.sendMessage(message);
    const reply = result.response.text();

    return res.status(200).json({ reply });
  } catch (error) {
    console.error("Gemini error:", error);

    return res.status(500).json({
      reply: "حدث خطأ في الاتصال بالذكاء الاصطناعي.",
    });
  }
}
