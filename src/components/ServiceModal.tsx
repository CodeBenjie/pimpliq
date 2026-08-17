import React from 'react';
import { X, CheckCircle2, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ServiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  badge: string;
  description: string;
  deliverables: string[];
  onRequestConsultation: (serviceName: string) => void;
}

export const ServiceModal: React.FC<ServiceModalProps> = ({
  isOpen,
  onClose,
  title,
  badge,
  description,
  deliverables,
  onRequestConsultation,
}) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 w-9 h-9 rounded-full bg-[var(--bg-tertiary)] hover:bg-[var(--border-color)] flex items-center justify-center text-[var(--text-muted)] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-[var(--color-gold-bg)] text-[#A4811B] dark:text-[#E8C860] border border-[#D4AF37]/30 mb-4">
            {badge}
          </div>

          <h3 className="text-2xl font-bold text-[var(--text-main)] mb-3">
            {title}
          </h3>

          <p className="text-sm text-[var(--text-muted)] leading-relaxed mb-6">
            {description}
          </p>

          {/* Deliverables */}
          <div className="mb-8">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--text-main)] mb-3">
              Scope & Key Deliverables:
            </h4>
            <div className="space-y-2.5">
              {deliverables.map((item, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[var(--text-main)]">
                  <CheckCircle2 className="w-4 h-4 text-[#1A6B74] dark:text-[#2BA0AD] shrink-0 mt-0.5" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Modal Actions */}
          <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-[var(--border-color)]">
            <button
              onClick={() => {
                onClose();
                onRequestConsultation(title);
              }}
              className="px-6 py-3 rounded-full text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-[#1A6B74] to-[#10474D] hover:from-[#2BA0AD] flex items-center gap-2"
            >
              Request Consultation
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={onClose}
              className="px-6 py-3 rounded-full text-xs sm:text-sm font-bold text-[var(--text-muted)] border border-[var(--border-color)] hover:bg-[var(--bg-tertiary)]"
            >
              Close
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
