import { useState } from "react";
import ParticleBackground from "@/components/ParticleBackground";
import { Navbar, HeroSection } from "@/components/HeroSection";
import StatsSection from "@/components/StatsSection";
import FeaturesShowcase from "@/components/FeaturesShowcase";
import UploadSection from "@/components/UploadSection";
import type { UploadResult } from "@/components/UploadSection";
import ResultSection from "@/components/ResultSection";
import HowItWorks from "@/components/HowItWorks";
import TestimonialsSection from "@/components/TestimonialsSection";
import HistoryPanel from "@/components/HistoryPanel";
import FAQSection from "@/components/FAQSection";
import { PrivacySection, Footer } from "@/components/PrivacyFooter";

const Index = () => {
  const [latestResult, setLatestResult] = useState<UploadResult | null>(null);
  const [history, setHistory] = useState<UploadResult[]>([]);

  const handleResult = (result: UploadResult) => {
    setLatestResult(result);
    setHistory((prev) => [result, ...prev]);
  };

  return (
    <div className="min-h-screen bg-background text-foreground relative">
      <ParticleBackground />
      <Navbar />
      <main className="relative z-10">
        <HeroSection />
        <StatsSection />
        <FeaturesShowcase />
        <UploadSection onResult={handleResult} />
        <ResultSection result={latestResult} />
        <HowItWorks />
        <TestimonialsSection />
        <HistoryPanel history={history} onClear={() => setHistory([])} />
        <FAQSection />
        <PrivacySection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
