import React from 'react';
import { DIRECTORS } from '../data/pimpliqData';
import { Sparkles, CheckCircle2, Quote } from 'lucide-react';
import { motion } from 'motion/react';

export const LeadershipSection: React.FC = () => {
  return (
    <section id="leadership" className="py-20 md:py-24 bg-[var(--bg-secondary)] border-t border-[var(--border-color)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 md:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold bg-[var(--color-gold-bg)] text-[#A4811B] dark:text-[#E8C860] border border-[#D4AF37]/30 mb-3 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
            EXECUTIVE LEADERSHIP
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[var(--text-main)] tracking-tight mb-4">
            Meet the Directors
          </h2>
          <p className="text-base sm:text-lg text-[var(--text-muted)] leading-relaxed">
            The visionary leaders steering Pimpliq Consultancy Ltd to deliver transformative brand management, executive advisory, and corporate growth across East Africa.
          </p>
        </div>

        {/* Directors Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {DIRECTORS.map((director, index) => {
            return (
              <motion.div
                key={director.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="bg-[var(--bg-card)] rounded-3xl overflow-hidden border border-[var(--border-color)] hover:border-[#D4AF37]/50 shadow-xl hover:shadow-2xl transition-all duration-500 flex flex-col sm:flex-row group relative"
              >
                {/* Director Portrait Column */}
                <div className="w-full sm:w-5/12 relative overflow-hidden bg-slate-900 aspect-[4/5] sm:aspect-auto sm:min-h-[460px] shrink-0">
                  <img
                    src={director.imageUrl}
                    alt={`${director.name} - ${director.role}`}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                  />

                  {/* Subtle dark gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent sm:opacity-60 group-hover:opacity-40 transition-opacity duration-500 pointer-events-none" />

                  <div className="absolute bottom-4 left-4 right-4 text-white sm:hidden pointer-events-none">
                    <div className="text-xs font-bold text-[#E8C860] uppercase tracking-wider">{director.role}</div>
                    <h3 className="text-xl font-bold">{director.name}</h3>
                  </div>
                </div>

                {/* Director Details Column */}
                <div className="w-full sm:w-7/12 p-6 sm:p-8 flex flex-col justify-between">
                  <div>
                    <div className="hidden sm:block mb-4">
                      <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-[var(--color-teal-bg)] text-[#1A6B74] dark:text-[#2BA0AD] mb-2 transition-transform duration-300 group-hover:translate-x-1">
                        {director.role}
                      </span>
                      <h3 className="text-2xl font-extrabold text-[var(--text-main)] tracking-tight group-hover:text-[#1A6B74] dark:group-hover:text-[#E8C860] transition-colors duration-300">
                        {director.name}
                      </h3>
                      <p className="text-xs sm:text-sm font-semibold text-[#D4AF37] mt-0.5">
                        {director.title}
                      </p>
                    </div>

                    <p className="text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed mb-6">
                      {director.bio}
                    </p>

                    {/* Expertise Tags */}
                    <div className="mb-6">
                      <div className="text-[11px] font-bold uppercase tracking-wider text-[var(--text-muted)] mb-2.5">
                        Core Strategic Focus
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {director.expertise.map((item, idx) => (
                          <span
                            key={idx}
                            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium bg-[var(--bg-tertiary)] text-[var(--text-main)] border border-[var(--border-color)] group-hover:border-[#D4AF37]/30 transition-colors duration-300"
                          >
                            <CheckCircle2 className="w-3 h-3 text-[#1A6B74] dark:text-[#E8C860]" />
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Director Leadership Quote */}
                  {director.quote && (
                    <div className="p-4 rounded-2xl bg-[var(--bg-primary)] border border-[var(--border-color)] border-l-4 border-l-[#D4AF37] relative group-hover:shadow-md transition-shadow duration-300 mt-2">
                      <Quote className="w-4 h-4 text-[#D4AF37] mb-1.5 opacity-80" />
                      <p className="text-xs italic text-[var(--text-main)] leading-relaxed">
                        "{director.quote}"
                      </p>
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
