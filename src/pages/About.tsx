import { SiteLayout } from "@/components/SiteLayout";
import { PageHero } from "@/components/PageHero";
import { Stats } from "@/components/sections/Stats";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { useI18n } from "@/i18n/I18nProvider";
import { Eye, Target, Heart } from "lucide-react";

const About = () => {
  const { t } = useI18n();
  const cards = [
    { icon: Eye, ...(t("about.vision") as unknown as { t: string; d: string }) },
    { icon: Target, ...(t("about.mission") as unknown as { t: string; d: string }) },
    { icon: Heart, ...(t("about.values") as unknown as { t: string; d: string }) },
  ];
  return (
    <SiteLayout>
      <PageHero eyebrow={t("nav.about")} title={t("about.title")} subtitle={t("about.intro")} />
      <section className="bg-background py-20">
        <div className="container-wide grid gap-6 md:grid-cols-3">
          {cards.map((c) => {
            const Icon = c.icon;
            return (
              <div key={c.t} className="rounded-2xl border border-border bg-card-grad p-7 transition-base hover:border-accent/30 hover:shadow-elev-md">
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-highlight text-accent">
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className="mt-5 text-xl font-bold text-primary">{c.t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{c.d}</p>
              </div>
            );
          })}
        </div>
      </section>
      <Stats />
      <CtaBanner />
    </SiteLayout>
  );
};

export default About;
