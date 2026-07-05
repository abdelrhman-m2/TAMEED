import { useEffect, useState } from "react";
import { useI18n } from "@/i18n/I18nProvider";

const AnimatedCounter = ({ value }: { value: string }) => {
  const numericMatch = value.match(/(\d+(\.\d+)?)/);
  const target = numericMatch ? parseFloat(numericMatch[0]) : 0;
  const suffix = value.replace(/[\d\.\+]/g, "");
  const prefix = value.startsWith("+") ? "+" : "";

  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 1000; // 1 second
    const steps = 40;
    const stepTime = duration / steps;
    const increment = target / steps;

    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [target]);

  const formattedCount = Number.isInteger(target) ? Math.floor(count) : count.toFixed(1);

  return (
    <span>
      {prefix}
      {formattedCount}
      {suffix}
    </span>
  );
};

export const Stats = () => {
  const { t } = useI18n();
  const items = (t("stats.items") as unknown as { v: string; l: string }[]) || [];
  return (
    <section className="bg-background py-20">
      <div className="container-wide grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((s) => (
          <div key={s.l} className="rounded-2xl border border-border bg-card-grad p-7 text-center transition-base hover:border-accent/40 hover:shadow-elev-md hover:-translate-y-1">
            <p className="font-display text-4xl font-extrabold text-accent md:text-5xl">
              <AnimatedCounter value={s.v} />
            </p>
            <p className="mt-2 text-sm font-medium text-muted-foreground">{s.l}</p>
          </div>
        ))}
      </div>
    </section>
  );
};
