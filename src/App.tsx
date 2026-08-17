import React, { useState, useEffect } from 'react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { TrustStats } from './components/TrustStats';
import { AboutSection } from './components/AboutSection';
import { LeadershipSection } from './components/LeadershipSection';
import { ServicesSection } from './components/ServicesSection';
import { BrandHubSection } from './components/BrandHubSection';
import { ProposalEstimator } from './components/ProposalEstimator';
import { HowItWorks } from './components/HowItWorks';
import { ShowcaseSection } from './components/ShowcaseSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { CtaBanner } from './components/CtaBanner';
import { ContactSection } from './components/ContactSection';
import { ServiceModal } from './components/ServiceModal';
import { AiAdvisorWidget } from './components/AiAdvisorWidget';
import { Footer } from './components/Footer';
import { InteractiveBackground } from './components/InteractiveBackground';
import { CheckCircle2, Sparkles } from 'lucide-react';
import { ServicePillar, BrandModule } from './types';

export default function App() {
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem('pimpliq_dark');
    if (saved !== null) return saved === 'true';
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  const [activeModalData, setActiveModalData] = useState<{
    isOpen: boolean;
    title: string;
    badge: string;
    description: string;
    deliverables: string[];
  }>({
    isOpen: false,
    title: '',
    badge: '',
    description: '',
    deliverables: []
  });

  const [contactPrefillMessage, setContactPrefillMessage] = useState<string>('');
  const [toastText, setToastText] = useState<string | null>(null);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('pimpliq_dark', darkMode.toString());
  }, [darkMode]);

  const showToast = (msg: string) => {
    setToastText(msg);
    setTimeout(() => setToastText(null), 4500);
  };

  const handleSelectPillar = (pillar: ServicePillar) => {
    setActiveModalData({
      isOpen: true,
      title: pillar.title,
      badge: pillar.category,
      description: pillar.description,
      deliverables: pillar.deliverables
    });
  };

  const handleSelectModule = (mod: BrandModule) => {
    setActiveModalData({
      isOpen: true,
      title: `${mod.moduleNumber}. ${mod.title}`,
      badge: mod.categoryLabel,
      description: mod.shortDesc,
      deliverables: mod.bullets
    });
  };

  const handleTransferProposal = (summaryText: string) => {
    setContactPrefillMessage(summaryText);
    showToast('Proposal scope transferred to consultation form!');
    const contactEl = document.getElementById('contact');
    if (contactEl) {
      contactEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToContact = () => {
    const contactEl = document.getElementById('contact');
    if (contactEl) {
      contactEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen bg-[var(--bg-primary)] text-[var(--text-main)] transition-colors duration-300">
      {/* Fancy Interactive Ambient Canvas Background */}
      <InteractiveBackground darkMode={darkMode} />

      {/* Navigation */}
      <Navbar
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        onBookConsultation={scrollToContact}
      />

      {/* Main Content Flow */}
      <main>
        <HeroSection />
        <TrustStats />
        <AboutSection />
        <LeadershipSection />
        <ServicesSection onSelectService={handleSelectPillar} />
        <BrandHubSection onSelectModule={handleSelectModule} />
        <ProposalEstimator onTransferProposal={handleTransferProposal} />
        <HowItWorks />
        <ShowcaseSection />
        <TestimonialsSection />
        <CtaBanner onBookConsultation={scrollToContact} />
        <ContactSection
          initialMessage={contactPrefillMessage}
          onSuccessToast={showToast}
        />
      </main>

      {/* Footer */}
      <Footer />

      {/* Interactive Detail Modal */}
      <ServiceModal
        isOpen={activeModalData.isOpen}
        onClose={() => setActiveModalData(prev => ({ ...prev, isOpen: false }))}
        title={activeModalData.title}
        badge={activeModalData.badge}
        description={activeModalData.description}
        deliverables={activeModalData.deliverables}
        onRequestConsultation={() => scrollToContact()}
      />

      {/* AI Studio Advisor Floating Widget */}
      <AiAdvisorWidget />

      {/* Floating Toast Notification */}
      {toastText && (
        <div className="fixed bottom-6 left-6 z-50 bg-[#0F172A] text-white px-5 py-3.5 rounded-2xl shadow-2xl border-l-4 border-[#D4AF37] flex items-center gap-3 text-xs sm:text-sm animate-bounce">
          <CheckCircle2 className="w-5 h-5 text-[#D4AF37]" />
          <span>{toastText}</span>
        </div>
      )}

      {/* Vercel Speed Insights */}
      <SpeedInsights />
    </div>
  );
}
