import { Quote } from "lucide-react";
import { useI18n } from "@/i18n/I18nProvider";
import { SectionHeader } from "@/components/SectionHeader";

export const Testimonials = () => {
  const { t } = useI18n();
  const items = (t("testimonials.items") as unknown as { q: string; a: string; r: string }[]) || [];
  return (
    <section className="bg-muted/40 py-20 md:py-28">
      <div className="container-wide">
        <SectionHeader title={t("testimonials.title")} />
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {items.map((it) => (
            <figure key={it.a} className="rounded-2xl border border-border bg-background p-7 shadow-elev-sm">
              <Quote className="h-7 w-7 text-accent" />
              <blockquote className="mt-4 text-base leading-relaxed text-primary">{it.q}</blockquote>
              <figcaption className="mt-6 border-t border-border pt-4">
                <p className="text-sm font-semibold text-primary">{it.a}</p>
                <p className="text-xs text-muted-foreground">{it.r}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
};
