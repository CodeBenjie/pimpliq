import React from 'react';
import { Users2, Target, BarChart3, ShieldAlert, CheckCircle2, Sparkles, Building2, Globe2, Award } from 'lucide-react';
import { motion } from 'motion/react';

export const AboutSection: React.FC = () => {
  const values = [
    {
      icon: Users2,
      title: 'People First',
      description: 'Unlocking potential through human talent and client-centric relationship management.'
    },
    {
      icon: Target,
      title: 'Strategic Focus',
      description: 'Research-driven approaches tailored to your specific competitive market landscape.'
    },
    {
      icon: BarChart3,
      title: 'Measurable Impact',
      description: 'Practical solutions ensuring every client achieves sustainable revenue growth and brand equity.'
    },
    {
      icon: ShieldAlert,
      title: 'Excellence & Trust',
      description: 'Uncompromising commitment to professionalism, regulatory compliance, and timely delivery.'
    }
  ];

  return (
    <section id="about" className="py-24 bg-[var(--bg-primary)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Institutional Credibility Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5"
          >
            <div className="relative rounded-3xl p-8 sm:p-10 bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#10474D] text-white shadow-2xl border border-[#D4AF37]/30 overflow-hidden">
              {/* Background ambient accent */}
              <div className="absolute top-0 right-0 w-48 h-48 bg-[#D4AF37]/10 rounded-full blur-2xl pointer-events-none" />

              <div className="relative z-10">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-white/10 text-[#E8C860] border border-white/15 mb-6">
                  <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
                  INSTITUTIONAL DNA
                </div>

                <h3 className="text-2xl sm:text-3xl font-extrabold mb-4 leading-tight">
                  Pimpliq Consultancy Ltd
                </h3>

                <p className="text-sm text-gray-300 leading-relaxed mb-8">
                  A premier Ugandan strategic management and corporate advisory firm headquartered in Kampala, engineered to transform ambitious businesses into resilient market leaders.
                </p>

                {/* Key Institutional Commitments */}
                <div className="space-y-4 mb-8">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#1A6B74]/50 border border-[#1A6B74] flex items-center justify-center shrink-0 mt-0.5">
                      <Building2 className="w-4 h-4 text-[#E8C860]" />
                    </div>
                    <div>
                      <div className="font-bold text-sm text-white">Full-Spectrum Corporate Practice</div>
                      <div className="text-xs text-gray-400">Integrated brand management, talent sourcing, events, & taxation.</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#1A6B74]/50 border border-[#1A6B74] flex items-center justify-center shrink-0 mt-0.5">
                      <Globe2 className="w-4 h-4 text-[#E8C860]" />
                    </div>
                    <div>
                      <div className="font-bold text-sm text-white">Regional East African Reach</div>
                      <div className="text-xs text-gray-400">Deep localized market insights coupled with global standards.</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#1A6B74]/50 border border-[#1A6B74] flex items-center justify-center shrink-0 mt-0.5">
                      <Award className="w-4 h-4 text-[#E8C860]" />
                    </div>
                    <div>
                      <div className="font-bold text-sm text-white">100% Client Retention Focus</div>
                      <div className="text-xs text-gray-400">Hands-on partner oversight on every corporate engagement.</div>
                    </div>
                  </div>
                </div>

                {/* Leadership Directive Quote */}
                <div className="p-4 rounded-2xl bg-black/40 border-l-4 border-[#D4AF37] backdrop-blur-sm">
                  <p className="text-xs italic text-gray-200 leading-relaxed">
                    "People, Potential, Progress — we build powerful corporate experiences that connect, influence, and drive long-term business success."
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Text & Core Values */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold bg-[var(--color-teal-bg)] text-[#1A6B74] dark:text-[#2BA0AD] border border-[#1A6B74]/20 mb-4">
              ABOUT PIMPLIQ CONSULTANCY LTD
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-[var(--text-main)] tracking-tight mb-6 leading-tight">
              Combining Creativity, Strategy & Industry Expertise
            </h2>

            <p className="text-base sm:text-lg text-[var(--text-muted)] leading-relaxed mb-8">
              With a multidisciplinary team of senior partners and specialists, we offer tailored solutions that meet the evolving needs of modern corporate organizations. Whether you are building your brand, sourcing executive talent, managing a landmark event, or navigating complex tax compliance, we are your trusted partner.
            </p>

            {/* Core Values Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {values.map((val, idx) => {
                const IconComponent = val.icon;
                return (
                  <div
                    key={idx}
                    className="p-5 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-color)] hover:border-[#1A6B74] transition-all shadow-sm hover:shadow-md"
                  >
                    <div className="w-10 h-10 rounded-xl bg-[var(--color-teal-bg)] text-[#1A6B74] dark:text-[#E8C860] flex items-center justify-center mb-3">
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <h4 className="font-bold text-base text-[var(--text-main)] mb-1">{val.title}</h4>
                    <p className="text-xs text-[var(--text-muted)] leading-relaxed">{val.description}</p>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

