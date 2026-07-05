import { Link } from "react-router-dom";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/i18n/I18nProvider";

export const CtaBanner = () => {
  const { t, dir } = useI18n();
  const Arrow = dir === "rtl" ? ArrowLeft : ArrowRight;
  return (
    <section className="bg-background py-20 md:py-28">
      <div className="container-wide">
        <div className="relative overflow-hidden rounded-3xl bg-navy p-10 text-primary-foreground md:p-16">
          <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-accent/30 blur-3xl rtl:-left-20 rtl:right-auto" aria-hidden />
          <div className="relative grid items-center gap-8 md:grid-cols-[1.4fr,1fr]">
            <div>
              <h2 className="text-balance text-3xl font-bold leading-tight md:text-5xl">{t("cta.title")}</h2>
              <p className="mt-4 max-w-xl text-base text-primary-foreground/80">{t("cta.sub")}</p>
            </div>
            <div className="flex flex-wrap gap-3 md:justify-end">
              <Button asChild variant="outline" size="lg" className="border-primary-foreground/20 bg-primary-foreground/5 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground">
                <Link to="/contact?type=quote">{t("nav.quote")} <Arrow className="h-4 w-4" /></Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
