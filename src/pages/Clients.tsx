import { SiteLayout } from "@/components/SiteLayout";
import { PageHero } from "@/components/PageHero";
import { Testimonials } from "@/components/sections/Testimonials";
import { Stats } from "@/components/sections/Stats";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { useI18n } from "@/i18n/I18nProvider";

const Clients = () => {
  const { t } = useI18n();
  return (
    <SiteLayout>
      <PageHero eyebrow={t("nav.clients")} title={t("clients.title")} subtitle={t("clients.sub")} />
      <Stats />
      <Testimonials />
      <CtaBanner />
    </SiteLayout>
  );
};

export default Clients;
