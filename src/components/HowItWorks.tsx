import React from 'react';
import { HOW_IT_WORKS_STEPS } from '../data/pimpliqData';
import { motion } from 'motion/react';

export const HowItWorks: React.FC = () => {
  return (
    <section className="py-24 bg-[var(--bg-primary)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold bg-[var(--color-teal-bg)] text-[#1A6B74] dark:text-[#2BA0AD] border border-[#1A6B74]/20 mb-3">
            OUR ENGAGEMENT PROCESS
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[var(--text-main)] tracking-tight mb-4">
            How We Partner With You
          </h2>
          <p className="text-base sm:text-lg text-[var(--text-muted)]">
            A structured, 4-phase methodology designed to eliminate friction and maximize commercial results.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {HOW_IT_WORKS_STEPS.map((step, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="bg-[var(--bg-card)] rounded-2xl p-6 border border-[var(--border-color)] relative hover:border-[#1A6B74] transition-all shadow-sm"
            >
              <div className="text-4xl font-extrabold text-[#1A6B74] dark:text-[#E8C860] font-mono mb-4">
                {step.stepNumber}
              </div>
              <h3 className="text-lg font-bold text-[var(--text-main)] mb-2">
                {step.title}
              </h3>
              <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                {step.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
