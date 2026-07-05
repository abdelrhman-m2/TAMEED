import { ReactNode } from "react";
import { useI18n } from "@/i18n/I18nProvider";
import { SectionHeader } from "@/components/SectionHeader";

type Props = { eyebrow?: string; title: string; subtitle?: string; children?: ReactNode };

export const PageHero = ({ eyebrow, title, subtitle, children }: Props) => {
  const { t } = useI18n();
  return (
    <section className="relative overflow-hidden bg-hero">
      <div className="absolute inset-0 grid-pattern opacity-40" aria-hidden />
      <div className="container-wide relative py-20 md:py-28">
        <SectionHeader eyebrow={eyebrow ?? t("brand.name")} title={title} subtitle={subtitle} />
        {children && <div className="mt-10">{children}</div>}
      </div>
    </section>
  );
};
