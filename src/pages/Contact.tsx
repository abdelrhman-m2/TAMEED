import { useState } from "react";
import { z } from "zod";
import { useSearchParams } from "react-router-dom";
import { SiteLayout } from "@/components/SiteLayout";
import { PageHero } from "@/components/PageHero";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useI18n } from "@/i18n/I18nProvider";
import { toast } from "sonner";
import { Mail, Phone, MapPin } from "lucide-react";

// ── Backend API URL ────────────────────────────────────────────────
const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:4000";
// ──────────────────────────────────────────────────────────────────

const schema = z.object({
  name:          z.string().trim().min(2).max(100),
  phone:         z.string().trim().min(6).max(20),
  business_type: z.string().trim().min(2).max(80),
  message:       z.string().trim().min(5).max(1000),
});

const Contact = () => {
  const { t } = useI18n();
  const [params] = useSearchParams();
  const intent = params.get("type");
  const [form, setForm] = useState({ name: "", phone: "", business_type: "", message: "" });
  const [submitting, setSubmitting] = useState(false);

  const update =
    (k: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = schema.safeParse(form);
    if (!parsed.success) {
      toast.error(parsed.error.issues[0].message);
      return;
    }
    if (submitting) return;
    setSubmitting(true);

    try {
      const res = await fetch(`${API_URL}/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err?.error ?? `Server error ${res.status}`);
      }

      toast.success(t("contact.success"));
      setForm({ name: "", phone: "", business_type: "", message: "" });
    } catch (err) {
      console.error("Contact submit error:", err);
      toast.error(t("contact.error"));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <SiteLayout>
      <PageHero
        eyebrow={intent === "demo" ? t("nav.demo") : intent === "quote" ? t("nav.quote") : t("nav.contact")}
        title={t("contact.title")}
        subtitle={t("contact.sub")}
      />
      <section className="bg-background py-16 md:py-20">
        <div className="container-wide grid gap-10 lg:grid-cols-[1fr,1.4fr]">
          <aside className="space-y-4">
            <InfoCard icon={Mail} title="Email" value="mekkawy@tameed.com" />
            <InfoCard icon={Phone} title="Phone / WhatsApp" value="+966 50 736 3550" />
            <InfoCard icon={MapPin} title="HQ" value="Cairo, Egypt" />
          </aside>

          <form onSubmit={submit} className="rounded-3xl border border-border bg-card-grad p-7 shadow-elev-sm md:p-10">
            <p className="mb-6 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              {t("contact.sub")}
            </p>
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label={t("contact.name")} id="name">
                <Input id="name" value={form.name} onChange={update("name")} required maxLength={100} placeholder={t("contact.name")} />
              </Field>
              <Field label={t("contact.phone")} id="phone">
                <Input id="phone" type="tel" value={form.phone} onChange={update("phone")} required maxLength={20} placeholder={t("contact.phone")} />
              </Field>
              <Field label={t("contact.business")} id="business" className="sm:col-span-2">
                <Input id="business" value={form.business_type} onChange={update("business_type")} required maxLength={80} placeholder={t("contact.business")} />
              </Field>
              <Field label={t("contact.message")} id="message" className="sm:col-span-2">
                <Textarea id="message" rows={5} value={form.message} onChange={update("message")} required maxLength={1000} placeholder={t("contact.message")} />
              </Field>
            </div>
            <Button type="submit" variant="hero" size="lg" className="mt-7 w-full sm:w-auto">
              {submitting ? `${t("contact.submit")}...` : `${t("contact.submit")} →`}
            </Button>
          </form>
        </div>
      </section>
    </SiteLayout>
  );
};

const Field = ({
  label,
  id,
  children,
  className = "",
}: {
  label: string;
  id: string;
  children: React.ReactNode;
  className?: string;
}) => (
  <div className={className}>
    <Label htmlFor={id} className="mb-2 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
      {label}
    </Label>
    {children}
  </div>
);

const InfoCard = ({
  icon: Icon,
  title,
  value,
}: {
  icon: React.ElementType;
  title: string;
  value: string;
}) => (
  <div className="flex items-start gap-4 rounded-2xl border border-border bg-background p-5">
    <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-highlight text-accent">
      <Icon className="h-5 w-5" />
    </span>
    <div>
      <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{title}</p>
      <p className="mt-1 text-sm font-semibold text-primary">{value}</p>
    </div>
  </div>
);

export default Contact;