import { useI18n } from "@/i18n/I18nProvider";

const clientNames = [
  "Al Noor Markets", "Sapphire Retail", "Cairo Pharma", "Delta Foods",
  "Nile Logistics", "Alpha Build", "Rosa Boutique", "GreenLine Café",
];

export const ClientsMarquee = () => {
  const { t } = useI18n();
  const row = [...clientNames, ...clientNames];
  return (
    <section className="border-y border-border bg-background py-12">
      {t("clients.sub") && (
        <p className="mb-6 text-center text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
          {t("clients.sub")}
        </p>
      )}
      <div className="relative overflow-hidden">
        <div className="flex w-max animate-marquee gap-12 px-6">
          {row.map((n, i) => (
            <span key={i} className="inline-flex items-center font-display text-lg font-bold text-muted-foreground/70 md:text-xl">
              {n}
            </span>
          ))}
        </div>
        <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-background to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-background to-transparent" />
      </div>
    </section>
  );
};
