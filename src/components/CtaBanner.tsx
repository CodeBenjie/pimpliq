import React from 'react';
import { ArrowRight, Sparkles, Calendar } from 'lucide-react';

interface CtaBannerProps {
  onBookConsultation: () => void;
}

export const CtaBanner: React.FC<CtaBannerProps> = ({ onBookConsultation }) => {
  return (
    <section className="py-20 bg-gradient-to-r from-[#0F172A] via-[#10474D] to-[#0F172A] text-white relative overflow-hidden">
      {/* Glow Effects */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-[#1A6B74]/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold bg-[#D4AF37]/20 text-[#E8C860] border border-[#D4AF37]/30 mb-6">
          <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
          <span>ELEVATE YOUR ENTERPRISE</span>
        </div>

        <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-6 leading-tight">
          Ready to Unlock Your Organization's Full Potential?
        </h2>

        <p className="text-base sm:text-xl text-gray-200 mb-8 max-w-2xl mx-auto font-normal leading-relaxed">
          Partner with Pimpliq Consultancy Ltd to build a powerful brand, attract top talent, and secure full statutory compliance.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={onBookConsultation}
            className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full text-base font-bold text-[#0F172A] bg-gradient-to-r from-[#D4AF37] to-[#E8C860] hover:from-[#E8C860] hover:to-[#D4AF37] shadow-xl hover:scale-105 transition-all"
          >
            <Calendar className="w-5 h-5" />
            Book Advisory Consultation
          </button>

          <a
            href="#brand-hub"
            className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full text-base font-bold text-white border-2 border-white/30 hover:bg-white/10 hover:border-white transition-all"
          >
            Explore 8 Brand Modules
            <ArrowRight className="w-5 h-5" />
          </a>
        </div>
      </div>
    </section>
  );
};
