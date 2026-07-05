import { useI18n } from "@/i18n/I18nProvider";
import { SectionHeader } from "@/components/SectionHeader";

export const Services = () => {
  const { t } = useI18n();
  const columns =
    (t("services.columns") as unknown as { t: string; items: string[] }[]) || [];

  return (
    <section className="bg-background py-20 md:py-28">
      <div className="container-wide">
        <SectionHeader title={t("services.title")} subtitle={t("services.subtitle")} />
        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {columns.map((c) => (
            <div key={c.t} className="rounded-2xl border border-border bg-card-grad p-6 transition-base hover:-translate-y-1 hover:border-accent/40 hover:shadow-elev-md">
              <h3 className="text-base font-bold text-primary">{c.t}</h3>
              <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                {c.items.map((it) => (
                  <li key={it} className="flex gap-2">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden />
                    <span>{it}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

