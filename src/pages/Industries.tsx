import { SiteLayout } from "@/components/SiteLayout";
import { PageHero } from "@/components/PageHero";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { useI18n } from "@/i18n/I18nProvider";
import { Store, UtensilsCrossed, Pill, ShoppingBag, HardHat, Briefcase } from "lucide-react";

const icons = [Store, UtensilsCrossed, Pill, ShoppingBag, HardHat, Briefcase];

const Industries = () => {
  const { t } = useI18n();
  const items = (t("industries.items") as unknown as { t: string; d: string }[]) || [];
  return (
    <SiteLayout>
      <PageHero eyebrow={t("nav.industries")} title={t("industries.title")} />
      <section className="bg-background py-20">
        <div className="container-wide grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {items.map((it, i) => {
            const Icon = icons[i % icons.length];
            return (
              <div key={it.t} className="group rounded-2xl border border-border bg-card-grad p-7 transition-base hover:-translate-y-1 hover:shadow-elev-lg">
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-navy text-primary-foreground">
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className="mt-5 text-lg font-bold text-primary">{it.t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{it.d}</p>
              </div>
            );
          })}
        </div>
      </section>
      <CtaBanner />
    </SiteLayout>
  );
};

export default Industries;
