const API_URL = (import.meta.env.VITE_API_URL as string | undefined) ?? "http://localhost:4000";

export type ContactPayload = {
  name: string;
  phone: string;
  business_type: string;
  message: string;
};

export type DemoPayload = { name: string; phone: string; company: string };
export type QuotePayload = { name: string; phone: string; users: number; business_type: string; modules: string[]; estimate: number };
export type AiHistoryItem = { role: "assistant" | "user"; content: string };
export type AiLeadPayload = {
  name: string;
  phone: string;
  business_type: string;
  message: string;
  notes?: string;
};

async function post<T>(path: string, body: T) {
  if (!API_URL) {
    // Persist locally so users can see submissions in dev while the backend isn't deployed.
    const key = `taamed.submissions${path}`;
    const prev = JSON.parse(localStorage.getItem(key) || "[]");
    prev.push({ ...body, created_at: new Date().toISOString() });
    localStorage.setItem(key, JSON.stringify(prev));
    return { ok: true, simulated: true };
  }
  const res = await fetch(`${API_URL}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`Request failed: ${res.status}`);
  return res.json();
}

export const api = {
  contact: (p: ContactPayload) => post("/contact", p),
  demo: (p: DemoPayload) => post("/demo", p),
  quote: (p: QuotePayload) => post("/quote", p),
  aiChat: (message: string, history: AiHistoryItem[]) => post("/ai", { message, history }),
  aiLead: (p: AiLeadPayload) => post("/ai/lead", p),
};
