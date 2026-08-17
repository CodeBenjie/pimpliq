import React, { useState } from 'react';
import { CASE_STUDIES } from '../data/pimpliqData';
import { ArrowUpRight, TrendingUp, CheckCircle2, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const ShowcaseSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const categories = ['All', 'Branding', 'Recruitment', 'Events', 'Taxation'];

  const filtered = CASE_STUDIES.filter(cs => {
    if (activeCategory === 'All') return true;
    return cs.category === activeCategory;
  });

  return (
    <section id="showcase" className="py-24 bg-[var(--bg-secondary)] border-y border-[var(--border-color)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold bg-[var(--color-teal-bg)] text-[#1A6B74] dark:text-[#2BA0AD] border border-[#1A6B74]/20 mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            SUCCESS STORIES & PROVEN IMPACT
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[var(--text-main)] tracking-tight mb-4">
            Showcase & Case Studies
          </h2>
          <p className="text-base sm:text-lg text-[var(--text-muted)]">
            Explore recent corporate transformations delivered across brand, executive recruitment, events, and tax compliance in Uganda.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all ${
                activeCategory === cat
                  ? 'bg-gradient-to-r from-[#1A6B74] to-[#10474D] text-white shadow-md'
                  : 'bg-[var(--bg-card)] border border-[var(--border-color)] text-[var(--text-muted)] hover:border-[#1A6B74]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <AnimatePresence mode="popLayout">
            {filtered.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="bg-[var(--bg-card)] rounded-3xl p-6 sm:p-8 border border-[var(--border-color)] hover:border-[#D4AF37]/50 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  {/* Top Image Preview if available */}
                  {item.imageUrl && (
                    <div className="relative rounded-2xl overflow-hidden mb-6 h-48 sm:h-56 bg-slate-900 border border-[var(--border-color)]">
                      <img
                        src={item.imageUrl}
                        alt={item.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />
                      <div className="absolute bottom-3 left-4 right-4 text-white text-xs font-semibold">
                        <span className="text-[#E8C860] font-bold">{item.client}</span> • {item.category} Impact
                      </div>
                    </div>
                  )}

                  {/* Top Bar: Category & Impact Pill */}
                  <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-[var(--color-teal-bg)] text-[#1A6B74] dark:text-[#2BA0AD] border border-[#1A6B74]/20">
                      {item.category} Practice
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[var(--color-gold-bg)] text-[#A4811B] dark:text-[#E8C860] border border-[#D4AF37]/30">
                      <TrendingUp className="w-3.5 h-3.5 text-[#D4AF37]" />
                      {item.impact}
                    </span>
                  </div>

                  <h3 className="text-xl font-extrabold text-[var(--text-main)] mb-2 group-hover:text-[#1A6B74] dark:group-hover:text-[#E8C860] transition-colors leading-snug">
                    {item.title}
                  </h3>

                  <div className="text-xs font-bold text-[#1A6B74] dark:text-[#E8C860] mb-4">
                    Enterprise Client: {item.client}
                  </div>

                  <p className="text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed mb-6">
                    {item.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-[var(--border-color)] flex flex-wrap items-center justify-between gap-3">
                  <div className="flex flex-wrap gap-2">
                    {item.tags.map((tag, tIdx) => (
                      <span key={tIdx} className="px-2.5 py-1 rounded-md text-[11px] font-semibold bg-[var(--bg-tertiary)] text-[var(--text-muted)]">
                        #{tag}
                      </span>
                    ))}
                  </div>

                  <div className="inline-flex items-center gap-1 text-xs font-bold text-[#1A6B74] dark:text-[#E8C860] group-hover:translate-x-1 transition-transform">
                    <span>Impact Verified</span>
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

