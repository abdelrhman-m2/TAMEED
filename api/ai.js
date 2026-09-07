import { GoogleGenerativeAI } from "@google/generative-ai";
import { SYSTEM_PROMPT } from "../src/constants/knowledgeBase.js";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      reply: "Method not allowed",
    });
  }

  try {
    const { message, history = [] } = req.body || {};

    if (!message || typeof message !== "string") {
      return res.status(400).json({
        reply: "Please provide a message.",
      });
    }

    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({
        reply: "GEMINI_API_KEY is not configured.",
      });
    }

    const genAI = new GoogleGenerativeAI(
      process.env.GEMINI_API_KEY
    );

    const model = genAI.getGenerativeModel({
      model: process.env.GEMINI_MODEL || "gemini-3.6-flash",

      systemInstruction: SYSTEM_PROMPT,
    });

    // تجهيز الـ history
    let cleanHistory = Array.isArray(history)
      ? history
          .filter(
            (m) =>
              (m.role === "user" || m.role === "assistant") &&
              typeof m.content === "string" &&
              m.content.trim()
          )
          .map((m) => ({
            role: m.role === "assistant" ? "model" : "user",
            parts: [{ text: m.content }],
          }))
      : [];

    // Gemini لازم يبدأ بـ user
    while (cleanHistory.length > 0 && cleanHistory[0].role !== "user") {
      cleanHistory.shift();
    }

    const contents = [];
    for (const item of cleanHistory) {
      const last = contents[contents.length - 1];
      if (!last || last.role !== item.role) {
        contents.push(item);
      }
    }

    if (contents.length > 0 && contents[contents.length - 1].role === "user") {
      contents.pop();
    }

    contents.push({
      role: "user",
      parts: [{ text: message }],
    });

    const result = await model.generateContent({
      contents,
      generationConfig: {
        temperature: 0.3,
        maxOutputTokens: 500,
      },
    });

    const reply =
      result?.response?.text?.() ||
      "تقدر تسألني عن أي نظام من أنظمة TAMEED.";

    return res.status(200).json({
      reply,
    });
  } catch (error) {
    console.error("Gemini error:", error);

    return res.status(500).json({
      reply: "حدث خطأ في الاتصال بالذكاء الاصطناعي.",
    });
  }
}
