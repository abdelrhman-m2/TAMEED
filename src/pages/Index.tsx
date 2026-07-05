import { Hero } from "@/components/sections/Hero";
import { PainPoints } from "@/components/sections/PainPoints";
import { Solutions } from "@/components/sections/Solutions";
import { PosHighlight } from "@/components/sections/PosHighlight";
import { TechStack } from "@/components/sections/TechStack";
import { Stats } from "@/components/sections/Stats";
import { Testimonials } from "@/components/sections/Testimonials";
import { CompetitiveAdvantage } from "@/components/sections/CompetitiveAdvantage";
import { Services } from "@/components/sections/Services";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { SiteLayout } from "@/components/SiteLayout";

const Index = () => (
  <SiteLayout>
    <Hero />
    <PainPoints />
    <Solutions />
    <PosHighlight />
    <TechStack />
    <Stats />
    <Testimonials />
    <CompetitiveAdvantage />
    <Services />
    <CtaBanner />
  </SiteLayout>
);

export default Index;
