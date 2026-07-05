import { Check } from "lucide-react";
import { useI18n } from "@/i18n/I18nProvider";

export const TechStack = () => {
  const { t } = useI18n();
  const items = (t("tech.items") as unknown as string[]) || [];
  return (
    <section className="border-y border-border bg-navy py-16 text-primary-foreground md:py-20">
      <div className="container-wide grid items-center gap-10 md:grid-cols-[1fr,1.2fr]">
        <h2 className="text-balance text-3xl font-bold leading-tight md:text-4xl">{t("tech.title")}</h2>
        <ul className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {items.map((tech) => (
            <li key={tech} className="flex items-center gap-2 rounded-xl border border-primary-foreground/10 bg-primary-foreground/5 px-4 py-3 backdrop-blur">
              <Check className="h-4 w-4 text-accent" />
              <span className="font-display text-sm font-semibold">{tech}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};
