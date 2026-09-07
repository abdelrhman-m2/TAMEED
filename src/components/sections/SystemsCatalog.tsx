import { useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import { useI18n } from "@/i18n/I18nProvider";
import { SectionHeader } from "@/components/SectionHeader";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { CheckCircle2 } from "lucide-react";
import { SYSTEM_SLUGS } from "@/constants/systems";

export const SystemsCatalog = () => {
  const { t } = useI18n();
  const loc = useLocation();
  const [value, setValue] = useState<string>("");
  const data =
    (t("systemsCatalog") as unknown as {
      title: string;
      subtitle: string;
      items: { t: string; d: string; points: string[] }[];
    }) || { title: "", subtitle: "", items: [] };

  const items = useMemo(
    () =>
      data.items.map((it, i) => ({
        ...it,
        slug: SYSTEM_SLUGS[i] ?? `system-${i + 1}`,
      })),
    [data.items]
  );

  useEffect(() => {
    const hash = (loc.hash || "").replace("#", "").trim();
    if (!hash) return;
    const match = items.find((x) => x.slug === hash);
    if (!match) return;
    setValue(match.t);
    const el = document.getElementById(hash);
    el?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [loc.hash, items]);

  return (
    <section id="systems-catalog" className="relative overflow-hidden bg-background py-20 md:py-28">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/5 to-transparent pointer-events-none" />
      <div className="container-wide relative">
        <SectionHeader title={data.title} subtitle={data.subtitle} />
        
        <div className="mx-auto mt-12 max-w-4xl rounded-3xl border border-border/80 bg-card-grad p-3 shadow-2xl backdrop-blur-xl md:p-6">
          <Accordion type="single" collapsible className="w-full space-y-3" value={value} onValueChange={setValue}>
            {items.map((it, idx) => (
              <AccordionItem
                key={it.t}
                value={it.t}
                className="overflow-hidden rounded-2xl border border-border/70 bg-background/80 transition-all hover:border-accent/50 hover:shadow-md"
                id={it.slug}
              >
                <AccordionTrigger className="px-5 py-4 text-left rtl:text-left text-base font-extrabold text-primary hover:no-underline md:px-6 md:text-xl flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3 text-left rtl:text-left">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-blue-600/10 text-blue-600 font-mono text-sm font-bold">
                      0{idx + 1}
                    </span>
                    <span className="text-left rtl:text-left">{it.t}</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-5 pb-6 pt-2 text-left rtl:text-left md:px-6">
                  <div className="rounded-xl bg-muted/40 p-4 border border-border/50 text-left rtl:text-left">
                    <p className="text-sm leading-relaxed text-muted-foreground text-left rtl:text-left md:text-base">
                      {it.d}
                    </p>
                    <ul className="mt-5 grid gap-2 text-left rtl:text-left sm:grid-cols-2">
                      {it.points.map((p) => (
                        <li key={p} className="flex items-start gap-2.5 text-left rtl:text-left text-xs md:text-sm font-medium text-primary">
                          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-blue-600" />
                          <span className="text-left rtl:text-left">{p}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};
