import React from 'react';
import { Sparkles, ArrowRight, Calculator, Award, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';
import { PIMPLIQ_IMAGES } from '../data/pimpliqData';

export const HeroSection: React.FC = () => {
  return (
    <section id="home" className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-[var(--bg-primary)]">
      {/* Subtle Ambient Background Gradients */}
      <div className="absolute top-0 right-0 w-1/2 h-full opacity-10 dark:opacity-20 pointer-events-none bg-gradient-to-l from-[#1A6B74] to-transparent blur-3xl" />
      <div className="absolute top-1/3 left-0 w-1/3 h-1/2 opacity-10 dark:opacity-15 pointer-events-none bg-gradient-to-r from-[#D4AF37] to-transparent blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Text Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7"
          >
            {/* Slogan Pill */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs sm:text-sm font-bold bg-[var(--color-gold-bg)] text-[#A4811B] dark:text-[#E8C860] border border-[#D4AF37]/30 mb-6 shadow-sm">
              <Sparkles className="w-4 h-4 text-[#D4AF37]" />
              <span>PEOPLE • POTENTIAL • PROGRESS</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[var(--text-main)] leading-[1.15] mb-6">
              Empowering Businesses.{' '}
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#1A6B74] via-[#10474D] to-[#D4AF37]">
                Unlocking Full Potential.
              </span>
            </h1>

            {/* Supporting Description */}
            <p className="text-lg sm:text-xl text-[var(--text-muted)] leading-relaxed mb-8 max-w-2xl font-normal">
              Pimpliq Consultancy Ltd is a forward-thinking professional services firm dedicated to helping businesses grow, innovate, and succeed. We specialize in strategic brand management, executive recruitment, event activation, taxation, and business advisory.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 mb-12">
              <a
                href="#brand-hub"
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full text-base font-bold text-white bg-gradient-to-r from-[#1A6B74] to-[#10474D] hover:from-[#2BA0AD] hover:to-[#1A6B74] shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all"
              >
                Explore Brand Management
                <ArrowRight className="w-5 h-5" />
              </a>

              <a
                href="#estimator"
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full text-base font-bold text-[#0F172A] bg-gradient-to-r from-[#D4AF37] to-[#E8C860] hover:from-[#E8C860] hover:to-[#D4AF37] shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all"
              >
                <Calculator className="w-5 h-5" />
                Build Proposal (UGX)
              </a>
            </div>

            {/* Trust Highlights */}
            <div className="flex flex-wrap items-center gap-6 text-xs sm:text-sm font-semibold text-[var(--text-muted)]">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#1A6B74]" />
                <span>8 Brand Practice Modules</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#1A6B74]" />
                <span>100% Tax & Compliance Rate</span>
              </div>
            </div>
          </motion.div>

          {/* Right Visual Executive Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-5 relative"
          >
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-[#D4AF37]/30 bg-gradient-to-br from-[#0F172A] via-[#162A35] to-[#10474D] text-white p-6 sm:p-8 group">
              {/* Subtle ambient lighting */}
              <div className="absolute top-0 right-0 w-48 h-48 bg-[#D4AF37]/15 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#1A6B74]/30 rounded-full blur-3xl pointer-events-none" />

              <div className="relative z-10 space-y-5">
                {/* Official Crest Header */}
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <div className="flex items-center gap-3">
                    <div className="bg-white p-1.5 rounded-xl shadow-md border border-[#D4AF37]/40">
                      <img
                        src={PIMPLIQ_IMAGES.officialLogo}
                        alt="Pimpliq Official Emblem"
                        className="h-10 w-auto object-contain"
                      />
                    </div>
                    <div>
                      <div className="font-extrabold text-sm tracking-wide text-white">PIMPLIQ CONSULTANCY LTD</div>
                      <div className="text-[10px] font-bold text-[#E8C860] uppercase tracking-widest">Kampala • East Africa</div>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-[#D4AF37]/20 text-[#E8C860] border border-[#D4AF37]/30">
                    CERTIFIED
                  </span>
                </div>

                {/* Hero Showcase Photo Card */}
                <div className="relative rounded-2xl overflow-hidden border border-white/15 h-44 sm:h-52 shadow-inner group">
                  <img
                    src={PIMPLIQ_IMAGES.heroOffice}
                    alt="Pimpliq Corporate Executive Hub"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                  <div className="absolute bottom-3 left-4 right-4">
                    <div className="text-xs font-bold text-[#E8C860]">Strategic Corporate Hub • Kampala</div>
                    <div className="text-[11px] text-gray-200">Delivering 360° Brand Strategy & Executive Advisory</div>
                  </div>
                </div>

                {/* Slogan Banner */}
                <div className="bg-black/30 rounded-xl p-3.5 border border-white/10 flex items-center justify-between">
                  <div>
                    <div className="text-[11px] text-gray-300 font-semibold">Corporate Mission</div>
                    <div className="text-sm font-extrabold text-white">"People • Potential • Progress"</div>
                  </div>
                  <span className="text-xs font-bold text-[#E8C860] bg-[#D4AF37]/10 px-2.5 py-1 rounded-lg border border-[#D4AF37]/30">
                    8+ Modules
                  </span>
                </div>

                {/* 5 Core Pillars Preview Grid */}
                <div>
                  <div className="text-[11px] font-bold text-gray-300 uppercase tracking-wider mb-2.5">
                    Core Corporate Capabilities
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {[
                      '1. Brand Management (8 Modules)',
                      '2. Recruitment & Talent Sourcing',
                      '3. Event Management & Production',
                      '4. Taxation & URA Compliance',
                      '5. Strategic Business Consultancy',
                    ].map((item, idx) => (
                      <div
                        key={idx}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-2 border ${
                          idx === 0
                            ? 'bg-[#1A6B74]/40 border-[#1A6B74] text-white sm:col-span-2'
                            : 'bg-white/5 border-white/10 text-gray-200'
                        }`}
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#E8C860] shrink-0" />
                        <span className="truncate">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Footer Assurance */}
                <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs text-gray-300">
                  <span className="flex items-center gap-1.5 font-medium">
                    <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />
                    Full Statutory Compliance
                  </span>
                  <a
                    href="#pillars"
                    className="font-bold text-[#E8C860] hover:underline inline-flex items-center gap-1"
                  >
                    View Practice Pillars →
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Live Key Metrics Bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 p-6 sm:p-8 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-color)] shadow-xl"
        >
          <div className="text-center border-r border-[var(--border-color)] last:border-r-0">
            <div className="text-3xl sm:text-4xl font-extrabold text-[#1A6B74] dark:text-[#E8C860] mb-1">8+</div>
            <div className="text-xs sm:text-sm font-semibold text-[var(--text-muted)] uppercase tracking-wider">Brand Modules</div>
          </div>
          <div className="text-center border-r border-[var(--border-color)] last:border-r-0">
            <div className="text-3xl sm:text-4xl font-extrabold text-[#1A6B74] dark:text-[#E8C860] mb-1">99%</div>
            <div className="text-xs sm:text-sm font-semibold text-[var(--text-muted)] uppercase tracking-wider">Client Satisfaction</div>
          </div>
          <div className="text-center border-r border-[var(--border-color)] last:border-r-0">
            <div className="text-3xl sm:text-4xl font-extrabold text-[#1A6B74] dark:text-[#E8C860] mb-1">100%</div>
            <div className="text-xs sm:text-sm font-semibold text-[var(--text-muted)] uppercase tracking-wider">Compliance Rate</div>
          </div>
          <div className="text-center">
            <div className="text-3xl sm:text-4xl font-extrabold text-[#1A6B74] dark:text-[#E8C860] mb-1">15+</div>
            <div className="text-xs sm:text-sm font-semibold text-[var(--text-muted)] uppercase tracking-wider">Years Experience</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
