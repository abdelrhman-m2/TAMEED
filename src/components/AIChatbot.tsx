import { useState, useRef, useEffect } from "react";
import { Bot, X, Send, Loader2 } from "lucide-react";
import { api, AiHistoryItem } from "../lib/api";
import { supabase } from "../lib/supabase";

const SYSTEM_PROMPT = `
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
`;
// ─── Gemini API Call ──────────────────────────────────────────────────────────

async function callAI(
  userMessage: string,
  history: { role: string; content: string }[]
): Promise<string> {
  const formattedHistory: AiHistoryItem[] = history
    .filter((h) => h.role === "user" || h.role === "assistant")
    .map((h) => ({
      role: h.role as "user" | "assistant",
      content: h.content,
    }));

  const data = await api.aiChat(userMessage, formattedHistory);

  if (data?.reply) {
    return data.reply;
  }

  throw new Error("No reply received from AI backend");
}

// ─── Lead Email / Supabase Integration ──────────────────────────────────────────

async function submitLead(payload: {
  name: string;
  phone: string;
  business_type: string;
  message: string;
  notes: string;
}) {
  // 1. Try inserting into Supabase 'clients' table
  const { error: clientsError } = await supabase
    .from("clients")
    .insert({
      name: payload.name,
      phone: payload.phone,
      business_type: payload.business_type,
      message: payload.message
        ? `${payload.message}\n\n[Chatbot Notes]: ${payload.notes}`
        : payload.notes,
    });

  if (!clientsError) {
    return;
  }

  // 2. If 'clients' table fails, try 'leads' table
  const { error: leadsError } = await supabase
    .from("leads")
    .insert({
      name: payload.name,
      phone: payload.phone,
      business_type: payload.business_type,
      message: payload.message,
      notes: payload.notes,
    });

  if (!leadsError) {
    return;
  }

  // 3. Optional fallback to backend API if available
  try {
    await api.aiLead(payload);
  } catch {
    throw clientsError || leadsError;
  }
}

// ─── Types ────────────────────────────────────────────────────────────────────

type Message = {
  role: "user" | "assistant";
  content: string;
};

type LeadField = "name" | "phone" | "business_type" | "message";

// ─── Component ────────────────────────────────────────────────────────────────

export const AIChatbot = () => {
  const [open, setOpen] = useState(false);

  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "مرحباً! أنا مساعد TAMEED. أقدر أساعدك في الأنظمة أو أخذ بياناتك ليتواصل معك فريق المبيعات.",
    },
  ]);

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const [capturingLead, setCapturingLead] = useState(false);

  const [leadStep, setLeadStep] = useState<LeadField>("name");

  const [leadData, setLeadData] = useState({
    name: "",
    phone: "",
    business_type: "",
    message: "",
  });

  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, loading]);

  const addMessage = (
    role: Message["role"],
    content: string
  ) => {
    setMessages((prev) => [
      ...prev,
      {
        role,
        content,
      },
    ]);
  };

  // ── Lead Capture Flow ──

  const startLeadCapture = () => {
    setCapturingLead(true);

    setLeadStep("name");

    setLeadData({
      name: "",
      phone: "",
      business_type: "",
      message: "",
    });

    addMessage(
      "assistant",
      "ممتاز. اكتب اسمك الكامل من فضلك."
    );
  };

  const captureLeadFlow = async (text: string) => {
    if (leadStep === "name") {
      setLeadData((d) => ({
        ...d,
        name: text,
      }));

      setLeadStep("phone");

      addMessage(
        "assistant",
        "اكتب رقم الجوال."
      );

      return;
    }

    if (leadStep === "phone") {
      setLeadData((d) => ({
        ...d,
        phone: text,
      }));

      setLeadStep("business_type");

      addMessage(
        "assistant",
        "ما نوع نشاطك؟"
      );

      return;
    }

    if (leadStep === "business_type") {
      setLeadData((d) => ({
        ...d,
        business_type: text,
      }));

      setLeadStep("message");

      addMessage(
        "assistant",
        "اكتب احتياجك أو رسالتك باختصار."
      );

      return;
    }

    // Final step → submit lead

    const payload = {
      ...leadData,
      message: text,
      notes: messages
        .map(
          (m) => `${m.role}: ${m.content}`
        )
        .join("\n")
        .slice(-3500),
    };

    try {
      await submitLead(payload);

      addMessage(
        "assistant",
        "تم إرسال طلبك بنجاح وسيتواصل معك أحد مستشارينا خلال ساعات."
      );
    } catch {
      addMessage(
        "assistant",
        "تعذر حفظ البيانات الآن. حاول مرة أخرى أو استخدم صفحة التواصل."
      );
    } finally {
      setCapturingLead(false);

      setLeadStep("name");

      setLeadData({
        name: "",
        phone: "",
        business_type: "",
        message: "",
      });
    }
  };

  // ── Main Send ──

  const send = async () => {
    const text = input.trim();

    if (!text || loading) {
      return;
    }

    setLoading(true);

    setInput("");

    addMessage("user", text);

    // Lead capture mode → no AI call

    if (capturingLead) {
      await captureLeadFlow(text);

      setLoading(false);

      return;
    }

    // Normal AI chat via backend

    try {
      const history = messages.map((m) => ({
        role: m.role,
        content: m.content,
      }));

      const reply = await callAI(
        text,
        history
      );

      addMessage(
        "assistant",
        reply ||
          "تقدر تسألني عن أي نظام من أنظمة TAMEED."
      );
    } catch (err) {
      console.error("AI backend error:", err);

      addMessage(
        "assistant",
        "تعذر الاتصال بخدمة الذكاء الاصطناعي الآن. حاول مرة أخرى بعد قليل."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {open && (
        <div
          className="fixed bottom-24 z-50 flex w-[88vw] sm:w-[400px] flex-col overflow-hidden rounded-2xl border bg-white shadow-2xl ltr:left-6 rtl:right-6"
          style={{
            height: "500px",
          }}
        >
          {/* Header */}

          <div className="flex items-center justify-between bg-blue-600 px-4 py-4 text-white">
            <div className="flex items-center gap-3">
              <Bot className="h-6 w-6" />

              <p className="text-sm font-bold">
                مساعد TAMEED الذكي
              </p>
            </div>

            <X
              className="h-5 w-5 cursor-pointer"
              onClick={() => setOpen(false)}
            />
          </div>

          {/* Messages */}

          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
            {!capturingLead && (
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() =>
                    setInput(
                      "ايه أفضل نظام لإدارة المخازن؟"
                    )
                  }
                  className="rounded-full border bg-white px-3 py-1 text-xs text-gray-700"
                >
                  سؤال عن المخازن
                </button>

                <button
                  onClick={() =>
                    setInput(
                      "محتاج نظام شؤون الموظفين والرواتب"
                    )
                  }
                  className="rounded-full border bg-white px-3 py-1 text-xs text-gray-700"
                >
                  سؤال عن الموارد البشرية
                </button>

                <button
                  onClick={startLeadCapture}
                  className="rounded-full border bg-blue-600 px-3 py-1 text-xs text-white"
                >
                  اترك بياناتي
                </button>
              </div>
            )}

            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${
                  msg.role === "user"
                    ? "justify-end"
                    : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-2 text-sm ${
                    msg.role === "user"
                      ? "bg-blue-600 text-white"
                      : "bg-white border text-gray-800"
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}

            {loading && (
              <Loader2 className="h-5 w-5 animate-spin text-blue-600 m-auto" />
            )}

            <div ref={bottomRef} />
          </div>

          {/* Input */}

          <div className="p-3 bg-white border-t flex gap-2">
            <input
              value={input}
              onChange={(e) =>
                setInput(e.target.value)
              }
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  send();
                }
              }}
              placeholder="اسألني عن TAMEED..."
              className="flex-1 bg-gray-100 rounded-xl px-3 py-2 text-sm outline-none"
            />

            <button
              onClick={send}
              className="text-blue-600"
              disabled={loading}
            >
              <Send className="h-5 w-5 rtl:rotate-180" />
            </button>
          </div>
        </div>
      )}

      {/* FAB */}

      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 z-50 h-14 w-14 rounded-full bg-blue-600 text-white shadow-lg flex items-center justify-center ltr:left-6 rtl:right-6"
      >
        <Bot className="h-8 w-8" />
      </button>
    </>
  );
};
