import React, { useState } from 'react';
import { ShieldCheck, Lock, FileText, X, Phone, Mail, MapPin, MessageSquare, ExternalLink, Instagram, Facebook } from 'lucide-react';
import { PIMPLIQ_IMAGES, COMPANY_CONTACT } from '../data/pimpliqData';

export const Footer: React.FC = () => {
  const [activeLegalModal, setActiveLegalModal] = useState<'privacy' | 'terms' | null>(null);

  return (
    <footer className="bg-[#0F172A] text-white pt-16 pb-8 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/10">
          {/* Brand Info (2 cols) */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-white p-1.5 rounded-xl border border-[#D4AF37]/50 shadow-md">
                <img
                  src={PIMPLIQ_IMAGES.officialLogo}
                  alt="Pimpliq Consultancy Ltd Logo"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    const target = e.currentTarget;
                    if (target.src !== '/pimpliq_logo.jpg' && !target.src.endsWith('/pimpliq_logo.jpg')) {
                      target.src = '/pimpliq_logo.jpg';
                    }
                  }}
                  className="h-10 sm:h-11 w-auto object-contain"
                />
              </div>
              <div>
                <div className="font-extrabold text-lg text-white tracking-tight">
                  PIMPLIQ <span className="text-[#1A6B74] font-semibold text-sm">Consultancy Ltd</span>
                </div>
                <div className="text-[10px] font-bold text-[#D4AF37] tracking-widest uppercase">
                  PEOPLE • POTENTIAL • PROGRESS
                </div>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-gray-400 leading-relaxed max-w-sm mb-5">
              Pimpliq Consultancy Ltd is a forward-thinking professional services firm delivering brand management, executive recruitment, event activation, tax advisory, and strategic business consultancy.
            </p>

            <div className="space-y-2 text-xs text-gray-300">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#E8C860] shrink-0" />
                <span>{COMPANY_CONTACT.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#E8C860] shrink-0" />
                <a href={`mailto:${COMPANY_CONTACT.email}`} className="hover:text-[#E8C860] transition-colors">
                  {COMPANY_CONTACT.email}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#E8C860] shrink-0" />
                <a href={`tel:${COMPANY_CONTACT.phone}`} className="hover:text-[#E8C860] font-semibold transition-colors">
                  {COMPANY_CONTACT.phoneDisplay}
                </a>
                <span className="text-gray-500">•</span>
                <a
                  href={COMPANY_CONTACT.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#25D366] hover:underline inline-flex items-center gap-1 font-semibold"
                >
                  <MessageSquare className="w-3 h-3" />
                  WhatsApp
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-sm text-[#D4AF37] mb-4 uppercase tracking-wider">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-gray-300">
              <li><a href="#home" className="hover:text-[#D4AF37] transition-colors">Home</a></li>
              <li><a href="#about" className="hover:text-[#D4AF37] transition-colors">About Us</a></li>
              <li><a href="#leadership" className="hover:text-[#D4AF37] transition-colors">Meet the Directors</a></li>
              <li><a href="#pillars" className="hover:text-[#D4AF37] transition-colors">Core Services</a></li>
              <li><a href="#brand-hub" className="hover:text-[#D4AF37] transition-colors">Brand Management</a></li>
              <li><a href="#estimator" className="hover:text-[#D4AF37] transition-colors">Proposal Builder</a></li>
              <li><a href="#contact" className="hover:text-[#D4AF37] transition-colors">Contact Us</a></li>
            </ul>
          </div>

          {/* Brand Practice Modules */}
          <div>
            <h4 className="font-bold text-sm text-[#D4AF37] mb-4 uppercase tracking-wider">
              Brand Practice
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-gray-300">
              <li><a href="#brand-hub" className="hover:text-[#D4AF37] transition-colors">Brand Strategy</a></li>
              <li><a href="#brand-hub" className="hover:text-[#D4AF37] transition-colors">Identity Design</a></li>
              <li><a href="#brand-hub" className="hover:text-[#D4AF37] transition-colors">Launch Campaigns</a></li>
              <li><a href="#brand-hub" className="hover:text-[#D4AF37] transition-colors">Digital Branding & PR</a></li>
              <li><a href="#brand-hub" className="hover:text-[#D4AF37] transition-colors">Performance Audits</a></li>
              <li><a href="#brand-hub" className="hover:text-[#D4AF37] transition-colors">Executive Branding</a></li>
            </ul>
          </div>

          {/* Social Channels & Slogan Box */}
          <div>
            <h4 className="font-bold text-sm text-[#D4AF37] mb-4 uppercase tracking-wider">
              Connect With Us
            </h4>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <a
                  href={COMPANY_CONTACT.tiktokUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="TikTok: Pimpliq Consultancy Ltd"
                  title="TikTok: Pimpliq Consultancy Ltd"
                  className="w-10 h-10 rounded-xl bg-white/5 hover:bg-white/15 text-white hover:text-[#E8C860] border border-white/10 hover:border-[#D4AF37] flex items-center justify-center transition-all hover:scale-110 shadow-sm"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-5 h-5"
                    aria-hidden="true"
                  >
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.298 0 .59.044.87.13V9.4a6.33 6.33 0 0 0-.87-.06A6.34 6.34 0 0 0 3 15.68a6.34 6.34 0 0 0 10.82 4.49 6.3 6.3 0 0 0 1.88-4.49V8.58a8.3 8.3 0 0 0 4.89 1.58v-3.47a4.9 4.9 0 0 1-1-.001Z" />
                  </svg>
                </a>

                <a
                  href={COMPANY_CONTACT.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram: Pimpliq Consultancy Ltd"
                  title="Instagram: @pimpliqconsultancyltd"
                  className="w-10 h-10 rounded-xl bg-white/5 hover:bg-gradient-to-tr hover:from-[#F58529] hover:via-[#DD2A7B] hover:to-[#8134AF] text-white hover:text-white border border-white/10 hover:border-transparent flex items-center justify-center transition-all hover:scale-110 shadow-sm"
                >
                  <Instagram className="w-5 h-5" />
                </a>

                <a
                  href={COMPANY_CONTACT.facebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook: Pimpliq Consultancy Ltd"
                  title="Facebook: Pimpliq Consultancy Ltd"
                  className="w-10 h-10 rounded-xl bg-white/5 hover:bg-[#1877F2] text-white hover:text-white border border-white/10 hover:border-transparent flex items-center justify-center transition-all hover:scale-110 shadow-sm"
                >
                  <Facebook className="w-5 h-5" />
                </a>
              </div>

              <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 text-center">
                <div className="text-sm font-extrabold text-[#E8C860] font-serif">
                  "People, Potential, Progress"
                </div>
                <p className="text-[10px] text-gray-400 mt-1">
                  {COMPANY_CONTACT.socialNote}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-400">
          <div>
            © 2026 Pimpliq Consultancy Ltd. All rights reserved.
          </div>

          <div className="flex items-center gap-6">
            <button
              onClick={() => setActiveLegalModal('privacy')}
              className="hover:text-[#D4AF37] transition-colors"
            >
              Privacy Policy
            </button>

            <button
              onClick={() => setActiveLegalModal('terms')}
              className="hover:text-[#D4AF37] transition-colors"
            >
              Terms of Service
            </button>
          </div>
        </div>
      </div>

      {/* Legal Modal */}
      {activeLegalModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#151D30] border border-gray-700 rounded-3xl p-6 sm:p-8 max-w-lg w-full text-white relative shadow-2xl">
            <button
              onClick={() => setActiveLegalModal(null)}
              className="absolute top-5 right-5 text-gray-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-bold text-[#E8C860] mb-4 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-[#D4AF37]" />
              {activeLegalModal === 'privacy' ? 'Privacy Policy' : 'Terms of Service'}
            </h3>

            <p className="text-xs text-gray-300 leading-relaxed mb-6">
              {activeLegalModal === 'privacy'
                ? 'Pimpliq Consultancy Ltd is committed to maintaining the confidentiality, integrity, and security of all client data. All strategic assets, tax files, and personal brand documents are protected under strict non-disclosure agreements and enterprise governance frameworks.'
                : 'All advisory engagements, brand strategies, and statutory compliance filings delivered by Pimpliq Consultancy Ltd are governed by our standard professional engagement agreement and statutory regulations.'}
            </p>

            <button
              onClick={() => setActiveLegalModal(null)}
              className="w-full py-2.5 rounded-full text-xs font-bold text-[#0F172A] bg-[#D4AF37] hover:bg-[#E8C860]"
            >
              Acknowledge
            </button>
          </div>
        </div>
      )}
    </footer>
  );
};
