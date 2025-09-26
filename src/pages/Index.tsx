import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { HeroSection } from "@/components/sections/hero-section";
import { FeaturesSection } from "@/components/sections/features-section";
import { SecuritySection } from "@/components/sections/security-section";
import { HowItWorksSection } from "@/components/sections/how-it-works-section";
import { UpgradeSection } from "@/components/sections/upgrade-section";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <FeaturesSection />
        <SecuritySection />
        <HowItWorksSection />
        <UpgradeSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
