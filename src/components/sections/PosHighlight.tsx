import { ScanBarcode, Zap, BarChart3, WifiOff, Store, Layers } from "lucide-react";
import { useI18n } from "@/i18n/I18nProvider";

const icons = [Zap, ScanBarcode, BarChart3, WifiOff, Store, Layers];

export const PosHighlight = () => {
  const { t } = useI18n();
  const pos = t("pos") as {
    title: string;
    subtitle: string;
    points: string[];
    receipt: { branch: string; totalLabel: string; items: { n: string; p: string }[]; total: string };
  };
  const points = pos.points ?? [];
  const receipt = pos.receipt;

  return (
    <section className="bg-background py-20 md:py-28">
      <div className="container-wide grid items-center gap-12 lg:grid-cols-2">
        <div>
          <h2 className="text-balance text-3xl font-bold leading-tight text-primary md:text-5xl">
            {pos.title}
          </h2>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-muted-foreground">{pos.subtitle}</p>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2">
            {points.map((p, i) => {
              const Icon = icons[i % icons.length];
              return (
                <li key={p} className="flex items-start gap-3 rounded-xl border border-border bg-card-grad p-4">
                  <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-accent/10 text-accent">
                    <Icon className="h-4 w-4" />
                  </span>
                  <span className="text-sm font-semibold text-primary">{p}</span>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="relative">
          <div className="rounded-3xl border border-border bg-navy p-6 text-primary-foreground shadow-elev-lg">
            <div className="flex items-center justify-between text-xs">
              <span className="rounded-full bg-primary-foreground/10 px-2.5 py-1 font-mono">{receipt.branch}</span>
              <span className="font-mono opacity-70">14:32</span>
            </div>
            <div className="mt-6 space-y-3 text-sm">
              {receipt.items.map((r) => (
                <div key={r.n} className="flex items-center justify-between border-b border-primary-foreground/10 pb-2">
                  <span className="opacity-90">{r.n}</span>
                  <span className="font-mono font-semibold">{r.p}</span>
                </div>
              ))}
            </div>
            <div className="mt-6 flex items-center justify-between border-t border-primary-foreground/15 pt-4">
              <span className="text-xs uppercase tracking-wider opacity-70">{receipt.totalLabel}</span>
              <span className="font-display text-2xl font-bold text-accent">{receipt.total}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
