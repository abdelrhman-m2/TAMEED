import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { SiteLayout } from "@/components/SiteLayout";
import { PageHero } from "@/components/PageHero";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { useI18n } from "@/i18n/I18nProvider";
import { Check } from "lucide-react";

const MODULES = [
  { id: "accounting", basePerUser: 0 },
  { id: "inventory", basePerUser: 0 },
  { id: "hr", basePerUser: 0 },
  { id: "pos", basePerUser: 0 },
  { id: "assets", basePerUser: 0 },
  { id: "sales", basePerUser: 0 },
];

const BUSINESSES = ["supermarket", "restaurant", "pharmacy", "retail", "services", "contracting"];

const Pricing = () => {
  const { t, lang } = useI18n();
  const [users, setUsers] = useState(10);
  const [biz, setBiz] = useState(BUSINESSES[0]);
  const [selected, setSelected] = useState<string[]>(["accounting", "inventory", "pos"]);

  const labels: Record<string, { ar: string; en: string }> = {
    accounting: { ar: "محاسبة", en: "Accounting" },
    inventory: { ar: "مخزون", en: "Inventory" },
    hr: { ar: "موارد بشرية", en: "HR" },
    pos: { ar: "نقاط بيع", en: "POS" },
    assets: { ar: "أصول", en: "Assets" },
    sales: { ar: "مبيعات ومشتريات", en: "Sales & Purchasing" },
    supermarket: { ar: "سوبرماركت", en: "Supermarket" },
    restaurant: { ar: "مطاعم", en: "Restaurants" },
    pharmacy: { ar: "صيدليات", en: "Pharmacies" },
    retail: { ar: "تجزئة", en: "Retail" },
    services: { ar: "خدمات", en: "Services" },
    contracting: { ar: "مقاولات", en: "Contracting" },
  };
  const L = (k: string) => labels[k]?.[lang] ?? k;

  const estimate = useMemo(() => {
    const perUser = selected.reduce((s, id) => s + (MODULES.find((m) => m.id === id)?.basePerUser ?? 0), 0);
    const base = 0;
    return Math.round(base + perUser * Math.max(1, users));
  }, [users, selected]);

  const toggle = (id: string) =>
    setSelected((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));

  return (
    <SiteLayout>
      <PageHero eyebrow={t("nav.pricing")} title={t("pricing.title")} subtitle={t("pricing.sub")} />
      <section className="bg-background pb-24">
        <div className="container-tight">
          <div className="grid gap-10 rounded-3xl border border-border bg-card-grad p-7 shadow-elev-sm md:p-10 lg:grid-cols-[1.4fr,1fr]">
            <div className="space-y-8">
              <div>
                <div className="flex items-baseline justify-between">
                  <Label>{t("pricing.users")}</Label>
                  <span className="font-display text-2xl font-bold text-primary">{users}</span>
                </div>
                <Slider min={1} max={200} step={1} value={[users]} onValueChange={(v) => setUsers(v[0])} className="mt-4" />
              </div>

              <div>
                <Label>{t("pricing.business")}</Label>
                <div className="mt-3 flex flex-wrap gap-2">
                  {BUSINESSES.map((b) => (
                    <Chip key={b} active={biz === b} onClick={() => setBiz(b)}>{L(b)}</Chip>
                  ))}
                </div>
              </div>

              <div>
                <Label>{t("pricing.modules")}</Label>
                <div className="mt-3 grid gap-2 sm:grid-cols-2">
                  {MODULES.map((m) => {
                    const active = selected.includes(m.id);
                    return (
                      <button
                        key={m.id}
                        type="button"
                        onClick={() => toggle(m.id)}
                        className={`flex items-center justify-between rounded-xl border px-4 py-3 text-start text-sm transition-base ${
                          active ? "border-accent bg-highlight text-primary" : "border-border bg-background text-muted-foreground hover:border-accent/40"
                        }`}
                      >
                        <span className="font-semibold">{L(m.id)}</span>
                        {active && <Check className="h-4 w-4 text-accent" />}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            <aside className="flex flex-col justify-between rounded-2xl bg-navy p-7 text-primary-foreground">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider opacity-80">{t("pricing.est")}</p>
                <p className="mt-3 font-display text-5xl font-extrabold text-accent">{estimate}</p>
                <p className="mt-1 text-sm opacity-80">/ {lang === "ar" ? "شهرياً" : "month"}</p>
                <p className="mt-6 text-xs leading-relaxed opacity-75">{t("pricing.note")}</p>
              </div>
              <Button asChild variant="hero" size="lg" className="mt-8">
                <Link to="/contact?type=quote">{t("pricing.request")}</Link>
              </Button>
            </aside>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
};

const Label = ({ children }: { children: React.ReactNode }) => (
  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{children}</p>
);

const Chip = ({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) => (
  <button
    type="button"
    onClick={onClick}
    className={`rounded-full border px-4 py-1.5 text-xs font-semibold transition-base ${
      active ? "border-accent bg-accent text-accent-foreground" : "border-border bg-background text-muted-foreground hover:border-accent/40"
    }`}
  >
    {children}
  </button>
);

export default Pricing;
