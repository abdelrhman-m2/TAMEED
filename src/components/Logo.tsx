import logo from "@/assets/logo.png";
import { useI18n } from "@/i18n/I18nProvider";

export const Logo = ({ className = "" }: { className?: string }) => {
  const { t } = useI18n();
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <img src={logo} alt="TAMEED" width={42} height={42} className="h-10 w-10 object-contain" />
      <span className="font-display text-lg font-bold tracking-tight text-primary">
        {t("brand.name")}
      </span>
    </div>
  );
};
