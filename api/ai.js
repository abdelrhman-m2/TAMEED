import { GoogleGenerativeAI } from "@google/generative-ai";

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

      systemInstruction: `
أنت المساعد الذكي الرسمي لشركة TAMEED.

TAMEED شركة متخصصة في أنظمة ERP للشركات والمؤسسات.

يمكنك مساعدة العملاء في:
- إدارة المخازن والمستودعات
- المبيعات
- المشتريات
- الموارد البشرية
- الرواتب
- إدارة العملاء
- التقارير
- أنظمة ERP بشكل عام

القواعد:
- أجب باللغة العربية إذا تحدث العميل بالعربية.
- أجب باللغة الإنجليزية إذا تحدث العميل بالإنجليزية.
- كن احترافيًا وواضحًا.
- اجعل الرد مختصرًا ومفيدًا.
- لا تخترع أسعارًا أو مميزات غير معروفة.
- إذا سأل العميل عن شيء خارج خدمات TAMEED، أخبره بأدب أنك متخصص في خدمات TAMEED.
- إذا أبدى العميل اهتمامًا بالتواصل مع الشركة، اطلب منه الاسم ورقم الجوال ونوع النشاط والاحتياج.
      `,
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

    // منع وجود رسالتين متتاليتين بنفس الـ role
    const validHistory = [];

    for (const item of cleanHistory) {
      const last = validHistory[validHistory.length - 1];

      if (!last || last.role !== item.role) {
        validHistory.push(item);
      }
    }

    const chat = model.startChat({
      history: validHistory,
      generationConfig: {
        temperature: 0.3,
        maxOutputTokens: 300,
      },
    });

    const result = await chat.sendMessage(message);

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
