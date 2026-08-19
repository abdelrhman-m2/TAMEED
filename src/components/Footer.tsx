import { Link } from "react-router-dom";
import { Logo } from "./Logo";
import { useI18n } from "@/i18n/I18nProvider";

export const Footer = () => {
  const { t } = useI18n();
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-border bg-muted/40">
      <div className="container-wide grid gap-10 py-14 md:grid-cols-4">
        <div className="md:col-span-2">
          <Logo />
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">{t("footer.desc")}</p>
        </div>
        <div>
          <h4 className="mb-4 text-sm font-semibold text-primary">{t("footer.product")}</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link to="/systems" className="hover:text-primary">{t("nav.systems")}</Link></li>
            <li><Link to="/industries" className="hover:text-primary">{t("nav.industries")}</Link></li>
            <li><Link to="/simulation" className="hover:text-primary">{t("nav.simulation")}</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="mb-4 text-sm font-semibold text-primary">{t("footer.company")}</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link to="/about" className="hover:text-primary">{t("nav.about")}</Link></li>
            <li><Link to="/clients" className="hover:text-primary">{t("nav.clients")}</Link></li>
            <li><Link to="/contact" className="hover:text-primary">{t("nav.contact")}</Link></li>
            <li><Link to="/privacy" className="hover:text-primary">{t("footer.privacy")}</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border">
        <div className="container-wide flex flex-col items-center justify-between gap-2 py-5 text-xs text-muted-foreground sm:flex-row">
          <span>© {year} TAMEED. {t("footer.rights")}</span>
          <div className="flex items-center gap-4">
            <Link to="/privacy" className="hover:text-primary">{t("footer.privacy")}</Link>
            <span>abdel.22004@gmail.com · +201098747503</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
