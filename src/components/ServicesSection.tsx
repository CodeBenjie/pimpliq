import React from 'react';
import { CORE_PILLARS } from '../data/pimpliqData';
import { ServicePillar } from '../types';
import { Megaphone, UserCheck, Calendar, FileCheck2, TrendingUp, CheckCircle2, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

interface ServicesSectionProps {
  onSelectService: (service: ServicePillar) => void;
}

const iconMap: Record<string, React.FC<{ className?: string }>> = {
  Bullhorn: Megaphone,
  UserCheck: UserCheck,
  CalendarHeart: Calendar,
  FileCheck2: FileCheck2,
  TrendingUp: TrendingUp,
};

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onSelectService }) => {
  return (
    <section id="pillars" className="py-24 bg-[var(--bg-secondary)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold bg-[var(--color-teal-bg)] text-[#1A6B74] dark:text-[#2BA0AD] border border-[#1A6B74]/20 mb-3">
            CORE PROFESSIONAL OFFERINGS
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[var(--text-main)] tracking-tight mb-4">
            Our 5 Pillars of Enterprise Service
          </h2>
          <p className="text-base sm:text-lg text-[var(--text-muted)]">
            Comprehensive solutions designed to strengthen operations, elevate brand equity, and ensure statutory compliance.
          </p>
        </div>

        {/* Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
          {CORE_PILLARS.map((pillar, idx) => {
            const IconComp = iconMap[pillar.iconName] || Megaphone;
            return (
              <motion.div
                key={pillar.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className={`rounded-3xl p-8 flex flex-col justify-between transition-all duration-300 relative ${
                  pillar.isFeatured
                    ? 'bg-gradient-to-b from-[var(--bg-card)] to-[var(--color-gold-bg)] border-2 border-[#D4AF37] shadow-xl md:col-span-2 lg:col-span-1'
                    : 'bg-[var(--bg-card)] border border-[var(--border-color)] shadow-md hover:shadow-xl hover:border-[#1A6B74]'
                }`}
              >
                <div>
                  {/* Header & Icon */}
                  <div className="flex items-center justify-between mb-6">
                    <div
                      className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl shadow-sm ${
                        pillar.isFeatured
                          ? 'bg-gradient-to-tr from-[#D4AF37] to-[#A4811B] text-[#0F172A]'
                          : 'bg-[var(--color-teal-bg)] text-[#1A6B74] dark:text-[#E8C860]'
                      }`}
                    >
                      <IconComp className="w-7 h-7" />
                    </div>

                    {pillar.isFeatured && (
                      <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#D4AF37] text-[#0F172A] shadow-sm">
                        Featured Practice
                      </span>
                    )}
                  </div>

                  {/* Title & Subtitle */}
                  <h3 className="text-xl sm:text-2xl font-bold text-[var(--text-main)] mb-2">
                    {pillar.title}
                  </h3>
                  <p className="text-xs font-bold text-[#1A6B74] dark:text-[#E8C860] uppercase tracking-wider mb-4">
                    {pillar.subtitle}
                  </p>

                  <p className="text-sm text-[var(--text-muted)] leading-relaxed mb-6">
                    {pillar.description}
                  </p>

                  {/* Feature Checkmarks */}
                  <div className="space-y-2.5 mb-8">
                    {pillar.features.map((feat, fIdx) => (
                      <div key={fIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[var(--text-main)]">
                        <CheckCircle2 className="w-4 h-4 text-[#1A6B74] dark:text-[#2BA0AD] shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* View Details CTA */}
                <button
                  onClick={() => onSelectService(pillar)}
                  className={`w-full py-3 px-5 rounded-full font-bold text-sm flex items-center justify-center gap-2 transition-all ${
                    pillar.isFeatured
                      ? 'bg-gradient-to-r from-[#D4AF37] to-[#A4811B] text-[#0F172A] hover:brightness-105 shadow-md'
                      : 'border-2 border-[var(--border-color)] text-[var(--text-main)] hover:border-[#1A6B74] hover:text-[#1A6B74]'
                  }`}
                >
                  View Full Capabilities
                  <ArrowRight className="w-4 h-4" />
                </button>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
