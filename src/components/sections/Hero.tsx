import { Link } from "react-router-dom";
import { ArrowRight, ArrowLeft, ShieldCheck, Database, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/i18n/I18nProvider";
import heroImg from "@/assets/hero-visual.jpg";
import zatcaLogo from "@/assets/zatca-logo.png";

const icons = [Database, Zap, ShieldCheck];

export const Hero = () => {
  const { t, dir, lang } = useI18n();
  const Arrow = dir === "rtl" ? ArrowLeft : ArrowRight;
  const trust = (t("hero.trust") as unknown as string[]) || [];
  const kpi = t("heroKpi") as { revenue: string; revenueValue: string; orders: string; ordersValue: string; trend: string };

  return (
    <section className="relative overflow-hidden bg-hero">
      <div className="absolute inset-0 grid-pattern opacity-60" aria-hidden />
      <div className="container-wide relative grid items-center gap-12 py-20 md:py-28 lg:grid-cols-2 lg:py-36">
        <div className="fade-up">
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-background/80 px-3 py-1 text-xs font-semibold text-muted-foreground backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-success" />
            {t("hero.eyebrow")}
          </span>
          <h1 className="mt-5 text-balance text-4xl font-extrabold leading-[1.1] text-primary md:text-6xl lg:text-7xl">
            {t("hero.title")}
          </h1>
          <p className="mt-5 max-w-xl text-balance text-base leading-relaxed text-muted-foreground md:text-lg">
            {t("hero.subtitle")}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button asChild variant="hero" size="lg">
              <Link to="/contact?type=demo">{t("hero.cta1")} <Arrow className="h-4 w-4" /></Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/systems">{t("nav.systems")}</Link>
            </Button>
          </div>

          <ul className="mt-10 flex flex-wrap gap-x-8 gap-y-3">
            {trust.map((p, i) => {
              const Icon = icons[i % icons.length];
              return (
                <li key={p} className="inline-flex items-center gap-2 text-sm font-medium text-primary">
                  <span className="inline-flex h-7 w-7 items-center justify-center rounded-md bg-highlight text-accent">
                    <Icon className="h-3.5 w-3.5" />
                  </span>
                  {p}
                </li>
              );
            })}
          </ul>
        </div>

        <div className="fade-up relative" style={{ animationDelay: "120ms" }}>
          <div className="absolute -inset-6 -z-10 rounded-[2rem] bg-accent-grad opacity-20 blur-3xl" />
          <div className="overflow-hidden rounded-3xl border border-border bg-card shadow-elev-lg">
            <img
              src={heroImg}
              alt="TAMEED ERP dashboard preview"
              width={1280}
              height={960}
              className="h-auto w-full"
            />
          </div>
          <FloatingKPI className="absolute -top-4 ltr:-right-4 rtl:-left-4" label={kpi.revenue} value={kpi.revenueValue} trend={kpi.trend} />
          <FloatingKPI className="absolute -bottom-4 ltr:-left-4 rtl:-right-4" label={kpi.orders} value={kpi.ordersValue} trend={kpi.trend} />
          
          {/* ZATCA Logo under hero image on bottom right */}
          <div className="mt-4 flex items-center justify-end">
            <div className="flex items-center gap-3.5 rounded-2xl border border-border/80 bg-background/95 px-5 py-3 shadow-elev-md backdrop-blur-md transition-base hover:border-accent">
              <span className="text-xs md:text-sm font-bold text-muted-foreground">
                {lang === "ar" ? "معتمد ومربوط مع" : "Certified & Integrated with"}
              </span>
              <img
                src={zatcaLogo}
                alt="هيئة الزكاة والضريبة والجمارك - ZATCA"
                className="h-14 md:h-16 lg:h-20 w-auto object-contain transition-transform duration-300 hover:scale-105"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const FloatingKPI = ({ label, value, trend, className }: { label: string; value: string; trend: string; className?: string }) => (
  <div className={`hidden rounded-2xl border border-border bg-background/95 p-4 shadow-elev-lg backdrop-blur md:block ${className || ""}`}>
    <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">{label}</p>
    <p className="mt-1 font-display text-xl font-bold text-primary">{value}</p>
    <p className="text-xs font-semibold text-success">{trend}</p>
  </div>
);
