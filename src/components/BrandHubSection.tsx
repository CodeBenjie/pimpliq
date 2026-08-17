import React, { useState } from 'react';
import { BRAND_MODULES } from '../data/pimpliqData';
import { BrandModule } from '../types';
import { Compass, Palette, Rocket, Globe, Megaphone, Activity, RefreshCw, UserCheck, ArrowRight, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface BrandHubSectionProps {
  onSelectModule: (module: BrandModule) => void;
}

const moduleIconMap: Record<string, React.FC<{ className?: string }>> = {
  Compass,
  Palette,
  Rocket,
  Globe,
  Megaphone,
  Activity,
  RefreshCw,
  UserCheck
};

export const BrandHubSection: React.FC<BrandHubSectionProps> = ({ onSelectModule }) => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'identity' | 'digital' | 'performance'>('all');

  const filteredModules = BRAND_MODULES.filter(mod => {
    if (activeFilter === 'all') return true;
    return mod.category === activeFilter;
  });

  return (
    <section id="brand-hub" className="py-24 bg-[var(--bg-primary)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold bg-[var(--color-gold-bg)] text-[#A4811B] dark:text-[#E8C860] border border-[#D4AF37]/30 mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
            SPECIALIZED PRACTICE PROFILE
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[var(--text-main)] tracking-tight mb-4">
            The 8 Brand Management Pillars
          </h2>
          <p className="text-base sm:text-lg text-[var(--text-muted)]">
            A research-backed framework ensuring every visual mark, narrative, and digital touchpoint aligns with your strategic goals.
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-12">
          {[
            { id: 'all', label: 'All 8 Modules' },
            { id: 'identity', label: 'Strategy & Identity' },
            { id: 'digital', label: 'Digital & Marketing' },
            { id: 'performance', label: 'Monitoring & Refresh' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveFilter(tab.id as any)}
              className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all ${
                activeFilter === tab.id
                  ? 'bg-gradient-to-r from-[#1A6B74] to-[#10474D] text-white shadow-md'
                  : 'bg-[var(--bg-card)] border border-[var(--border-color)] text-[var(--text-muted)] hover:border-[#1A6B74]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Modules Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredModules.map((mod) => {
              const IconComp = moduleIconMap[mod.iconName] || Compass;
              return (
                <motion.div
                  key={mod.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="bg-[var(--bg-card)] rounded-2xl p-6 border border-[var(--border-color)] hover:border-[#1A6B74] shadow-sm hover:shadow-lg transition-all flex flex-col justify-between group"
                >
                  <div>
                    {/* Top Row: Number & Icon */}
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-3xl font-extrabold text-[#1A6B74]/30 dark:text-[#E8C860]/40 font-mono">
                        {mod.moduleNumber}
                      </span>
                      <div className="w-10 h-10 rounded-xl bg-[var(--color-teal-bg)] text-[#1A6B74] dark:text-[#E8C860] flex items-center justify-center group-hover:bg-[#1A6B74] group-hover:text-white transition-colors">
                        <IconComp className="w-5 h-5" />
                      </div>
                    </div>

                    <h3 className="text-lg font-bold text-[var(--text-main)] mb-2 group-hover:text-[#1A6B74] dark:group-hover:text-[#E8C860] transition-colors">
                      {mod.title}
                    </h3>

                    <p className="text-xs text-[var(--text-muted)] mb-4 leading-relaxed">
                      {mod.shortDesc}
                    </p>

                    {/* Bullet Items */}
                    <ul className="space-y-1.5 mb-6">
                      {mod.bullets.map((b, bIdx) => (
                        <li key={bIdx} className="text-[11px] text-[var(--text-muted)] flex items-start gap-1.5">
                          <span className="text-[#D4AF37] font-bold">•</span>
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <button
                    onClick={() => onSelectModule(mod)}
                    className="w-full py-2.5 px-4 rounded-xl text-xs font-bold border border-[var(--border-color)] text-[var(--text-main)] hover:border-[#1A6B74] hover:bg-[var(--color-teal-bg)] hover:text-[#1A6B74] transition-all flex items-center justify-center gap-1.5"
                  >
                    <span>Explore Deliverables</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
