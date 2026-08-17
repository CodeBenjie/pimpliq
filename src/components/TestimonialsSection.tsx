import React from 'react';
import { TESTIMONIALS } from '../data/pimpliqData';
import { Star, Quote } from 'lucide-react';
import { motion } from 'motion/react';

export const TestimonialsSection: React.FC = () => {
  return (
    <section className="py-24 bg-[var(--bg-primary)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold bg-[var(--color-gold-bg)] text-[#A4811B] dark:text-[#E8C860] border border-[#D4AF37]/30 mb-3">
            CLIENT ENDORSEMENTS
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[var(--text-main)] tracking-tight mb-4">
            What Corporate Leaders Say
          </h2>
          <p className="text-base sm:text-lg text-[var(--text-muted)]">
            Hear directly from CEOs, Managing Directors, and Heads of Marketing who have partnered with Pimpliq.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="bg-[var(--bg-card)] rounded-3xl p-8 border border-[var(--border-color)] shadow-md hover:shadow-xl transition-all flex flex-col justify-between relative"
            >
              <div>
                <div className="flex items-center gap-1 text-[#D4AF37] mb-6">
                  {[...Array(item.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>

                <Quote className="w-8 h-8 text-[#1A6B74]/20 mb-4" />

                <p className="text-sm text-[var(--text-main)] italic leading-relaxed mb-6">
                  "{item.quote}"
                </p>
              </div>

              <div className="flex items-center gap-4 pt-4 border-t border-[var(--border-color)]">
                {item.avatarUrl ? (
                  <img
                    src={item.avatarUrl}
                    alt={item.name}
                    referrerPolicy="no-referrer"
                    className="w-12 h-12 rounded-full object-cover border-2 border-[#D4AF37] shadow-md shrink-0"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-[#1A6B74] to-[#D4AF37] text-white flex items-center justify-center font-extrabold text-sm shadow-md shrink-0">
                    {item.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                  </div>
                )}
                <div>
                  <h4 className="font-bold text-sm text-[var(--text-main)]">{item.name}</h4>
                  <div className="text-xs text-[var(--text-muted)]">{item.role}, {item.company}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
