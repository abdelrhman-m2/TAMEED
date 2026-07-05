import { useI18n } from "@/i18n/I18nProvider";
import { SectionHeader } from "@/components/SectionHeader";
import { Shield, MapPin, Headphones } from "lucide-react";

const icons = [Shield, MapPin, Headphones];

export const CompetitiveAdvantage = () => {
  const { t } = useI18n();
  const items = (t("competitive.items") as unknown as { t: string; d: string }[]) || [];

  return (
    <section className="bg-muted/40 py-20 md:py-28">
      <div className="container-wide">
        <SectionHeader title={t("competitive.title")} subtitle={t("competitive.subtitle")} />
        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {items.map((it, i) => {
            const Icon = icons[i % icons.length];
            return (
              <article
                key={it.t}
                className="group relative overflow-hidden rounded-2xl border border-border bg-background p-7 transition-base hover:-translate-y-1 hover:shadow-elev-lg"
              >
                <div
                  className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-accent/10 blur-2xl transition-base group-hover:bg-accent/20 rtl:-left-10 rtl:right-auto"
                  aria-hidden
                />
                <span className="relative inline-flex h-12 w-12 items-center justify-center rounded-xl bg-highlight text-accent">
                  <Icon className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
                </span>
                <h3 className="relative mt-5 text-lg font-bold text-primary">{it.t}</h3>
                <p className="relative mt-2 text-sm leading-relaxed text-muted-foreground">{it.d}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

