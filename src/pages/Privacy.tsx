import { SiteLayout } from "@/components/SiteLayout";
import { PageHero } from "@/components/PageHero";
import { useI18n } from "@/i18n/I18nProvider";
import { Shield, Eye, Lock, Server, UserCheck, Mail } from "lucide-react";

const iconMap = [Shield, Eye, Lock, Server, UserCheck, Mail];

const Privacy = () => {
  const { t } = useI18n();
  const sections = t("privacy.sections") as unknown as { t: string; d: string }[];

  return (
    <SiteLayout>
      <PageHero title={t("privacy.title")} subtitle={t("privacy.subtitle")} />

      <section className="py-16 md:py-24">
        <div className="container-wide">
          {/* Intro */}
          <p className="mx-auto mb-16 max-w-3xl text-center text-base leading-relaxed text-muted-foreground">
            {t("privacy.intro")}
          </p>

          {/* Cards grid */}
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {sections.map((sec, i) => {
              const Icon = iconMap[i % iconMap.length];
              return (
                <article
                  key={i}
                  className="group relative overflow-hidden rounded-2xl border border-border bg-card p-8 transition-all duration-300 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5"
                >
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="mb-3 text-lg font-semibold">{sec.t}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">{sec.d}</p>
                </article>
              );
            })}
          </div>

          {/* Contact notice */}
          <div className="mt-16 rounded-2xl border border-border bg-muted/40 p-8 text-center">
            <p className="text-sm text-muted-foreground">{t("privacy.contact")}</p>
            <a
              href="mailto:abdel.22004@gmail.com"
              className="mt-2 inline-block font-medium text-primary hover:underline"
            >
              abdel.22004@gmail.com
            </a>
          </div>

          {/* Last updated */}
          <p className="mt-8 text-center text-xs text-muted-foreground">
            {t("privacy.updated")}
          </p>
        </div>
      </section>
    </SiteLayout>
  );
};

export default Privacy;
