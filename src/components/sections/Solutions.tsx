import { Calculator, Boxes, Users, ScanBarcode, Building2, ShoppingCart } from "lucide-react";
import { useI18n } from "@/i18n/I18nProvider";
import { SectionHeader } from "@/components/SectionHeader";

const icons = [Calculator, Boxes, Users, ScanBarcode, Building2, ShoppingCart];

export const Solutions = () => {
  const { t } = useI18n();
  const items = (t("solutions.items") as unknown as { t: string; d: string }[]) || [];
  return (
    <section id="solutions" className="relative overflow-hidden bg-muted/40 py-20 md:py-28">
      <div className="container-wide relative">
        <SectionHeader title={t("solutions.title")} subtitle={t("solutions.subtitle")} />
        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {items.map((it, i) => {
            const Icon = icons[i % icons.length];
            return (
              <article
                key={it.t}
                className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-border/80 bg-background p-7 text-left rtl:text-left transition-all duration-300 hover:-translate-y-1.5 hover:border-blue-600/50 hover:shadow-2xl"
              >
                <div className="absolute -right-12 -top-12 h-36 w-36 rounded-full bg-blue-600/10 blur-2xl transition-all group-hover:bg-blue-600/20" aria-hidden />
                
                <div className="text-left rtl:text-left">
                  <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 text-white shadow-lg transition-transform duration-300 group-hover:scale-110">
                    <Icon className="h-6 w-6" />
                  </span>
                  <h3 className="mt-6 text-xl font-extrabold text-primary text-left rtl:text-left">{it.t}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground text-left rtl:text-left">{it.d}</p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};
