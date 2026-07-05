import { AlertTriangle, PackageX, Clock4, FileQuestion } from "lucide-react";
import { useI18n } from "@/i18n/I18nProvider";
import { SectionHeader } from "@/components/SectionHeader";

const icons = [AlertTriangle, PackageX, Clock4, FileQuestion];

export const PainPoints = () => {
  const { t } = useI18n();
  const items = (t("pains.items") as unknown as { t: string; d: string }[]) || [];
  return (
    <section className="bg-background py-20 md:py-28">
      <div className="container-wide">
        <SectionHeader title={t("pains.title")} subtitle={t("pains.subtitle")} />
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((it, i) => {
            const Icon = icons[i % icons.length];
            return (
              <div
                key={it.t}
                className="group rounded-2xl border border-border bg-card-grad p-6 transition-base hover:-translate-y-1 hover:border-accent/30 hover:shadow-elev-md"
              >
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-destructive/10 text-destructive">
                  <Icon className="h-5 w-5 transition-all duration-300 group-hover:scale-110 group-hover:rotate-6" />
                </span>
                <h3 className="mt-4 text-base font-semibold text-primary">{it.t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{it.d}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
