import React from 'react';
import { Building2, Shield, Users, Trophy } from 'lucide-react';

export const TrustStats: React.FC = () => {
  const logos = [
    'Apex Industrial',
    'FinTech Horizons',
    'Sovereign Global',
    'OmniLogistics',
    'Vanguard Group',
    'Prime Capital'
  ];

  return (
    <section className="py-12 bg-[var(--bg-secondary)] border-y border-[var(--border-color)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-6">
          <p className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-widest">
            Trusted by Industry Leaders, Corporations & High-Growth Ventures
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 items-center opacity-80 dark:opacity-70">
          {logos.map((logo, idx) => (
            <div
              key={idx}
              className="py-3 px-4 rounded-xl bg-[var(--bg-card)] border border-[var(--border-color)] text-center text-sm font-extrabold text-[var(--text-main)] shadow-sm hover:border-[#1A6B74] transition-colors"
            >
              {logo}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
