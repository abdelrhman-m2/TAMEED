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
    <section className="bg-background py-20 md:py-28">
      <div className="container-wide">
        <SectionHeader title={data.title} subtitle={data.subtitle} />
        <div className="mx-auto mt-12 max-w-4xl rounded-2xl border border-border bg-card-grad p-2 md:p-4">
          <Accordion type="single" collapsible className="w-full" value={value} onValueChange={setValue}>
            {items.map((it) => (
              <AccordionItem key={it.t} value={it.t} className="border-border" id={it.slug}>
                <AccordionTrigger className="px-4 text-start text-base font-bold text-primary hover:no-underline md:px-5 md:text-lg">
                  {it.t}
                </AccordionTrigger>
                <AccordionContent className="px-4 pb-5 md:px-5">
                  <p className="text-sm leading-relaxed text-muted-foreground md:text-base">{it.d}</p>
                  <ul className="mt-4 space-y-2 text-sm text-muted-foreground md:text-base">
                    {it.points.map((p) => (
                      <li key={p} className="flex gap-2">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden />
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

