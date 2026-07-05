import { useMemo, useState } from "react";
import { SiteLayout } from "@/components/SiteLayout";
import { PageHero } from "@/components/PageHero";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useI18n } from "@/i18n/I18nProvider";
import { toast } from "sonner";
import {
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid, BarChart, Bar, Legend,
} from "recharts";
import { Plus, Minus, Receipt, Trash2, TrendingUp, Package, Wallet, Award } from "lucide-react";

type Product = { id: string; name: { ar: string; en: string }; price: number; stock: number; cost: number };

const PRODUCTS: Product[] = [
  { id: "p1", name: { ar: "باراسيتامول", en: "Paracetamol" }, price: 15.5, cost: 8.0, stock: 120 },
  { id: "p2", name: { ar: "أرز 5 كجم", en: "Rice 5kg" }, price: 45.0, cost: 32.0, stock: 80 },
  { id: "p3", name: { ar: "خاتم ذهب", en: "Gold Ring" }, price: 1250.0, cost: 950.0, stock: 60 },
  { id: "p4", name: { ar: "جوال", en: "Mobile Phone" }, price: 3200.0, cost: 2600.0, stock: 35 },
  { id: "p5", name: { ar: "تيشيرت", en: "T-Shirt" }, price: 85.0, cost: 45.0, stock: 240 },
  { id: "p6", name: { ar: "أسمنت 50 كجم", en: "Cement 50kg" }, price: 18.0, cost: 12.0, stock: 22 },
];

type CartItem = { id: string; qty: number };

const Simulation = () => {
  const { t, lang } = useI18n();
  const [stock, setStock] = useState<Record<string, number>>(
    Object.fromEntries(PRODUCTS.map((p) => [p.id, p.stock]))
  );
  const [cart, setCart] = useState<CartItem[]>([]);
  const [todaySales, setTodaySales] = useState(0);
  const [todayOrders, setTodayOrders] = useState(0);
  const [history, setHistory] = useState(seedHistory());

  const N = (p: Product) => p.name[lang];

  const total = useMemo(
    () => cart.reduce((s, i) => s + (PRODUCTS.find((p) => p.id === i.id)?.price ?? 0) * i.qty, 0),
    [cart]
  );

  const add = (id: string) => {
    setCart((prev) => {
      const found = prev.find((i) => i.id === id);
      if (found) return prev.map((i) => (i.id === id ? { ...i, qty: i.qty + 1 } : i));
      return [...prev, { id, qty: 1 }];
    });
  };
  const dec = (id: string) =>
    setCart((prev) => prev.flatMap((i) => (i.id === id ? (i.qty > 1 ? [{ ...i, qty: i.qty - 1 }] : []) : [i])));
  const remove = (id: string) => setCart((prev) => prev.filter((i) => i.id !== id));

  const issueInvoice = () => {
    if (!cart.length) return;
    setStock((s) => {
      const next = { ...s };
      for (const i of cart) next[i.id] = Math.max(0, (next[i.id] ?? 0) - i.qty);
      return next;
    });
    setTodaySales((v) => v + total);
    setTodayOrders((v) => v + 1);
    setHistory((h) => {
      const last = [...h];
      const profit = cart.reduce((s, i) => {
        const p = PRODUCTS.find((x) => x.id === i.id)!;
        return s + (p.price - p.cost) * i.qty;
      }, 0);
      last[last.length - 1] = {
        ...last[last.length - 1],
        sales: last[last.length - 1].sales + total,
        profit: last[last.length - 1].profit + profit,
      };
      return last;
    });
    toast.success(lang === "ar" ? "تم إصدار الفاتورة بنجاح" : "Invoice issued successfully");
    setCart([]);
  };

  const adjustStock = (id: string, delta: number) =>
    setStock((s) => ({ ...s, [id]: Math.max(0, (s[id] ?? 0) + delta) }));

  const topProduct = useMemo(() => {
    const tally: Record<string, number> = {};
    for (const i of cart) tally[i.id] = (tally[i.id] ?? 0) + i.qty;
    const id = Object.entries(tally).sort((a, b) => b[1] - a[1])[0]?.[0] ?? PRODUCTS[0].id;
    return PRODUCTS.find((p) => p.id === id)!;
  }, [cart]);

  const totalStock = Object.values(stock).reduce((a, b) => a + b, 0);
  const totalRevenue = useMemo(() => history.reduce((sum, h) => sum + h.sales, 0), [history]);

  return (
    <SiteLayout>
      <PageHero eyebrow={t("nav.simulation")} title={t("sim.title")} subtitle={t("sim.sub")} />

        <div className="container-wide grid gap-4 sm:grid-cols-1 md:grid-cols-3">
          <Kpi icon={Receipt} label={t("sim.kpi.sales")} value={`${todayOrders}`} accent />
          <Kpi icon={Package} label={t("sim.kpi.stock")} value={`${totalStock} ${lang === "ar" ? "وحدة" : "units"}`} />
          <Kpi icon={Award} label={t("sim.kpi.top")} value={N(topProduct)} />
        </div>

      {/* POS + Cart */}
      <section className="bg-muted/40 py-12">
        <div className="container-wide grid gap-6 lg:grid-cols-[1.4fr,1fr]">
          <Card title={t("sim.pos.title")}>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {PRODUCTS.map((p) => (
                <button
                  key={p.id}
                  onClick={() => add(p.id)}
                  className="group rounded-xl border border-border bg-background p-4 text-start transition-base hover:-translate-y-0.5 hover:border-accent hover:shadow-elev-md"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-semibold text-primary">{N(p)}</p>
                      <p className="mt-1 text-xs text-muted-foreground">
                        {lang === "ar" ? "مخزون" : "Stock"}: {stock[p.id]}
                      </p>
                    </div>
                  </div>
                  <div className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-accent opacity-0 transition-base group-hover:opacity-100">
                    <Plus className="h-3 w-3" /> {t("sim.pos.add")}
                  </div>
                </button>
              ))}
            </div>
          </Card>

          <Card title={<span className="inline-flex items-center gap-2"><Receipt className="h-4 w-4 text-accent" /> {lang === "ar" ? "الفاتورة" : "Cart"}</span>}>
            <div className="min-h-[260px] space-y-2">
              {cart.length === 0 && (
                <p className="rounded-lg border border-dashed border-border p-6 text-center text-sm text-muted-foreground">
                  {lang === "ar" ? "اختر منتجات لإضافتها" : "Add products to your cart"}
                </p>
              )}
              {cart.map((i) => {
                const p = PRODUCTS.find((x) => x.id === i.id)!;
                return (
                  <div key={i.id} className="flex items-center justify-between rounded-lg border border-border bg-background px-3 py-2 text-sm">
                    <span className="font-semibold text-primary">{N(p)}</span>
                    <div className="flex items-center gap-2">
                      <button onClick={() => dec(i.id)} className="inline-flex h-7 w-7 items-center justify-center rounded-md border border-border text-primary hover:bg-muted"><Minus className="h-3 w-3" /></button>
                      <span className="w-6 text-center font-mono">{i.qty}</span>
                      <button onClick={() => add(i.id)} className="inline-flex h-7 w-7 items-center justify-center rounded-md border border-border text-primary hover:bg-muted"><Plus className="h-3 w-3" /></button>
                      <button onClick={() => remove(i.id)} className="text-destructive hover:opacity-70 ml-2 rtl:mr-2"><Trash2 className="h-3.5 w-3.5" /></button>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="mt-5 flex items-center justify-between border-t border-border pt-4">
              <span className="text-xs uppercase tracking-wider text-muted-foreground">{lang === "ar" ? "إجمالي المواد" : "Total Items"}</span>
              <span className="font-display text-2xl font-bold text-accent">
                {cart.reduce((sum, item) => sum + item.qty, 0)} {lang === "ar" ? "قطع" : "pcs"}
              </span>
            </div>
            <div className="mt-4 flex gap-2">
              <Button variant="hero" className="flex-1" onClick={issueInvoice} disabled={!cart.length}>
                {t("sim.pos.invoice")}
              </Button>
              <Button variant="outline" onClick={() => setCart([])} disabled={!cart.length}>
                {t("sim.pos.clear")}
              </Button>
            </div>
          </Card>
        </div>
      </section>

      {/* Inventory */}
      <section className="bg-background py-12 pb-24">
        <div className="container-wide max-w-4xl">
          <Card title={t("sim.inv.title")}>
            <div className="space-y-2">
              {PRODUCTS.map((p) => {
                const s = stock[p.id];
                const pct = Math.min(100, (s / 250) * 100);
                const low = s < 30;
                return (
                  <div key={p.id} className="rounded-xl border border-border bg-background p-4">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-primary">{N(p)}</span>
                      <div className="flex items-center gap-2">
                        <button onClick={() => adjustStock(p.id, -5)} className="inline-flex h-7 w-7 items-center justify-center rounded-md border border-border hover:bg-muted"><Minus className="h-3 w-3" /></button>
                        <Input value={s} readOnly className="h-8 w-16 text-center font-mono" />
                        <button onClick={() => adjustStock(p.id, +5)} className="inline-flex h-7 w-7 items-center justify-center rounded-md border border-border hover:bg-muted"><Plus className="h-3 w-3" /></button>
                      </div>
                    </div>
                    <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-muted">
                      <div
                        className={`h-full transition-all ${low ? "bg-destructive" : "bg-accent-grad"}`}
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>
        </div>
      </section>
    </SiteLayout>
  );
};

const Card = ({ title, children }: { title: React.ReactNode; children: React.ReactNode }) => (
  <div className="rounded-2xl border border-border bg-card-grad p-6 shadow-elev-sm">
    <h3 className="mb-5 text-sm font-bold uppercase tracking-wider text-primary">{title}</h3>
    {children}
  </div>
);

const Kpi = ({ icon: Icon, label, value, accent }: { icon: React.ElementType; label: string; value: string; accent?: boolean }) => (
  <div className={`flex items-center gap-4 rounded-2xl border border-border p-5 transition-base hover:shadow-elev-md ${accent ? "bg-navy text-primary-foreground" : "bg-card-grad"}`}>
    <span className={`inline-flex h-11 w-11 items-center justify-center rounded-xl ${accent ? "bg-primary-foreground/10 text-accent" : "bg-highlight text-accent"}`}>
      <Icon className="h-5 w-5" />
    </span>
    <div className="min-w-0">
      <p className={`text-[11px] font-semibold uppercase tracking-wider ${accent ? "opacity-80" : "text-muted-foreground"}`}>{label}</p>
      <p className={`truncate font-display text-xl font-bold ${accent ? "text-primary-foreground" : "text-primary"}`}>{value}</p>
    </div>
  </div>
);

function seedHistory() {
  const days = ["Sat", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri"];
  const salesData = [12500, 14200, 11800, 15600, 16800, 14900, 0];
  const profitData = [3100, 3600, 2900, 3900, 4200, 3800, 0];
  return days.map((d, i) => ({
    d,
    sales: salesData[i],
    profit: profitData[i],
  }));
}

export default Simulation;
