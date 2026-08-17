import React, { useState } from 'react';
import { MessageCircle, X, Send, Clock, ShieldCheck, ArrowUpRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { COMPANY_CONTACT } from '../data/pimpliqData';

// Custom SVG WhatsApp icon for authentic branding
const WhatsAppIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    aria-hidden="true"
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.82 11.82 0 00-3.48-8.413Z" />
  </svg>
);

const QUICK_TOPICS = [
  {
    title: 'Brand Management',
    desc: 'Inquire about our 8-Module Brand Framework',
    msg: 'Hello Pimpliq Consultancy, I would like to inquire about your Brand Management advisory and the 8-module practice.'
  },
  {
    title: 'Executive Consultation',
    desc: 'Book a 30-min strategy discovery session',
    msg: 'Hello Pimpliq Consultancy, I would like to schedule an executive consultation meeting.'
  },
  {
    title: 'Tax & Compliance',
    desc: 'URA regulatory compliance & audits',
    msg: 'Hello Pimpliq Consultancy, I am reaching out regarding corporate taxation and regulatory compliance support in Uganda.'
  },
  {
    title: 'Talent Recruitment',
    desc: 'Senior executive and specialized staffing',
    msg: 'Hello Pimpliq Consultancy, I would like to discuss recruitment and talent sourcing for my organization.'
  }
];

export const WhatsAppWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [customNote, setCustomNote] = useState('');

  const buildWhatsAppLink = (messageText: string) => {
    const encoded = encodeURIComponent(messageText.trim());
    return `https://wa.me/${COMPANY_CONTACT.whatsapp}?text=${encoded}`;
  };

  const handleSendCustom = (e: React.FormEvent) => {
    e.preventDefault();
    const text = customNote.trim() || 'Hello Pimpliq Consultancy, I would like to inquire about your services.';
    window.open(buildWhatsAppLink(text), '_blank', 'noopener,noreferrer');
    setIsOpen(false);
    setCustomNote('');
  };

  return (
    <>
      {/* Floating Action Button */}
      <div className="fixed bottom-6 left-6 z-40 flex items-center gap-2">
        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Open WhatsApp live chat"
          className="group relative flex items-center gap-2 px-3.5 sm:px-4 py-2.5 sm:py-3 bg-[#25D366] hover:bg-[#20bd5a] text-white rounded-full shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 border border-white/20"
        >
          {/* Online Pulse Indicator */}
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-white"></span>
          </span>

          <WhatsAppIcon className="w-5 h-5 text-white" />
          
          <span className="text-xs font-bold tracking-wide">WhatsApp</span>
        </button>
      </div>

      {/* Flyout Card */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 20 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="fixed bottom-24 left-4 sm:left-6 z-40 w-[340px] sm:w-[380px] bg-[var(--bg-card)] border border-[var(--border-color)] rounded-3xl shadow-2xl overflow-hidden flex flex-col"
          >
            {/* WhatsApp Header */}
            <div className="bg-gradient-to-r from-[#075E54] to-[#128C7E] text-white p-4.5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-10 h-10 rounded-full bg-white/15 border border-white/25 flex items-center justify-center text-white">
                    <WhatsAppIcon className="w-6 h-6" />
                  </div>
                  <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-[#25D366] border-2 border-[#075E54]"></span>
                </div>
                <div>
                  <h4 className="font-bold text-sm text-white flex items-center gap-1.5">
                    Pimpliq Advisory Line
                    <ShieldCheck className="w-3.5 h-3.5 text-[#25D366]" />
                  </h4>
                  <p className="text-[11px] text-white/85 flex items-center gap-1">
                    <Clock className="w-3 h-3 text-white/70" /> Typically replies within 15 mins
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
                aria-label="Close WhatsApp chat"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Content Body */}
            <div className="p-4 space-y-3 bg-[var(--bg-primary)] max-h-[380px] overflow-y-auto">
              <div className="p-3 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-color)] text-xs text-[var(--text-muted)] leading-relaxed">
                <p className="font-medium text-[var(--text-main)] mb-1">👋 Welcome to Pimpliq Consultancy Ltd</p>
                How can our executive team assist you today? Select a consultation topic below or type your custom message to connect immediately on WhatsApp.
              </div>

              <div className="space-y-2">
                <span className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-wider block px-1">
                  Quick Consultation Starters
                </span>

                {QUICK_TOPICS.map((topic, index) => (
                  <a
                    key={index}
                    href={buildWhatsAppLink(topic.msg)}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setIsOpen(false)}
                    className="group block p-3 rounded-2xl bg-[var(--bg-card)] hover:bg-[#25D366]/10 border border-[var(--border-color)] hover:border-[#25D366]/40 transition-all text-left"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-xs text-[var(--text-main)] group-hover:text-[#25D366] transition-colors">
                        {topic.title}
                      </span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-[var(--text-muted)] group-hover:text-[#25D366] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </div>
                    <p className="text-[11px] text-[var(--text-muted)] mt-0.5 leading-snug">
                      {topic.desc}
                    </p>
                  </a>
                ))}
              </div>

              {/* Direct Custom Note Form */}
              <form onSubmit={handleSendCustom} className="pt-2">
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={customNote}
                    onChange={(e) => setCustomNote(e.target.value)}
                    placeholder="Type custom inquiry..."
                    className="flex-1 px-3.5 py-2.5 rounded-full bg-[var(--bg-card)] border border-[var(--border-color)] text-xs text-[var(--text-main)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[#25D366]"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2.5 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs font-bold flex items-center gap-1.5 shadow-md transition-colors shrink-0"
                  >
                    <span>Send</span>
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </div>
              </form>
            </div>

            {/* Footer Notice */}
            <div className="px-4 py-2.5 bg-[var(--bg-card)] border-t border-[var(--border-color)] flex items-center justify-between text-[10px] text-[var(--text-muted)]">
              <span>Direct WhatsApp: <strong className="text-[var(--text-main)]">+256 702 932 901</strong></span>
              <span className="text-[#25D366] font-semibold">Kampala, UG</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
