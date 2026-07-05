import { SiteLayout } from "@/components/SiteLayout";
import { PageHero } from "@/components/PageHero";
import { Solutions } from "@/components/sections/Solutions";
import { SystemsCatalog } from "@/components/sections/SystemsCatalog";
import { TechStack } from "@/components/sections/TechStack";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { useI18n } from "@/i18n/I18nProvider";

const Systems = () => {
  const { t } = useI18n();
  return (
    <SiteLayout>
      <PageHero eyebrow={t("nav.systems")} title={t("systems.title")} subtitle={t("systems.sub")} />
      <Solutions />
      <SystemsCatalog />
      <TechStack />
      <CtaBanner />
    </SiteLayout>
  );
};

export default Systems;
