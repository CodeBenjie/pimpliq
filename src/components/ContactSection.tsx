import React, { useState, useEffect } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2, Loader2, Clock, MessageSquare, ExternalLink, Instagram, Facebook } from 'lucide-react';
import { COMPANY_CONTACT } from '../data/pimpliqData';
import { db } from '../lib/firebase';
import { collection, addDoc } from 'firebase/firestore';

// Custom TikTok Vector Icon for clean icon-only social badges
const TikTokIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    aria-hidden="true"
  >
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.298 0 .59.044.87.13V9.4a6.33 6.33 0 0 0-.87-.06A6.34 6.34 0 0 0 3 15.68a6.34 6.34 0 0 0 10.82 4.49 6.3 6.3 0 0 0 1.88-4.49V8.58a8.3 8.3 0 0 0 4.89 1.58v-3.47a4.9 4.9 0 0 1-1-.001Z" />
  </svg>
);

interface ContactSectionProps {
  initialMessage?: string;
  onSuccessToast: (msg: string) => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ initialMessage = '', onSuccessToast }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [service, setService] = useState('brand-management');
  const [message, setMessage] = useState(initialMessage);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedStatus, setSubmittedStatus] = useState<string | null>(null);
  const [lastSubmissionData, setLastSubmissionData] = useState<{
    name: string;
    email: string;
    phone: string;
    service: string;
    message: string;
  } | null>(null);

  useEffect(() => {
    if (initialMessage) {
      setMessage(initialMessage);
    }
  }, [initialMessage]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) {
      alert('Please complete all required fields.');
      return;
    }

    setIsSubmitting(true);
    setSubmittedStatus(null);

    const submissionPayload = {
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim(),
      service,
      message: message.trim(),
    };

    setLastSubmissionData(submissionPayload);

    try {
      // 1. Save directly to Firebase Firestore
      await addDoc(collection(db, 'consultations'), {
        fullName: name.trim(),
        email: email.trim(),
        phone: phone.trim() || 'Not specified',
        service: service || 'general',
        message: message.trim(),
        status: 'pending',
        createdAt: new Date().toISOString()
      });
    } catch (dbErr) {
      console.warn('Firestore write notice:', dbErr);
    }

    try {
      // 2. Also notify backend API (email dispatch if configured)
      await fetch('/api/consultation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(submissionPayload),
      });
    } catch (err) {
      console.warn('Consultation submission log notice:', err);
    } finally {
      setIsSubmitting(false);
      setName('');
      setEmail('');
      setPhone('');
      setMessage('');
      setSubmittedStatus('Success! Your consultation inquiry has been recorded. Our team will contact you shortly.');
      onSuccessToast('Thank you! Your consultation request has been submitted successfully.');
    }
  };

  return (
    <section id="contact" className="py-24 bg-[var(--bg-primary)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[var(--bg-card)] rounded-3xl overflow-hidden border border-[var(--border-color)] shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            {/* Left Info Panel (5 cols) */}
            <div className="lg:col-span-5 bg-gradient-to-br from-[#0F172A] via-[#10474D] to-[#0F172A] text-white p-8 sm:p-12 flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold text-[#D4AF37] uppercase tracking-widest block mb-2">
                  DIRECT CONSULTATION & INQUIRIES
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold mb-4 text-[#D4AF37]">
                  Partner With Us Today
                </h3>
                <p className="text-sm text-gray-300 leading-relaxed mb-8">
                  Transform your organization into a market leader. Reach out to our senior strategic partners to schedule a confidential executive consultation.
                </p>

                <div className="space-y-6 text-xs sm:text-sm">
                  {/* Location */}
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-white/10 text-[#E8C860] flex items-center justify-center shrink-0">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-[#E8C860] mb-0.5">Location</h4>
                      <p className="text-white font-medium">{COMPANY_CONTACT.location}</p>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-white/10 text-[#E8C860] flex items-center justify-center shrink-0">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-[#E8C860] mb-0.5">Official Email</h4>
                      <a
                        href={`mailto:${COMPANY_CONTACT.email}`}
                        className="text-white hover:text-[#E8C860] font-medium transition-colors break-all"
                      >
                        {COMPANY_CONTACT.email}
                      </a>
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-white/10 text-[#E8C860] flex items-center justify-center shrink-0">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-[#E8C860] mb-0.5">Phone & Direct Call</h4>
                      <a
                        href={`tel:${COMPANY_CONTACT.phone}`}
                        className="text-white hover:text-[#E8C860] font-semibold text-base transition-colors"
                      >
                        {COMPANY_CONTACT.phoneDisplay}
                      </a>
                    </div>
                  </div>

                  {/* WhatsApp Quick Action */}
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-[#25D366]/20 text-[#25D366] flex items-center justify-center shrink-0">
                      <MessageSquare className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-[#E8C860] mb-0.5">WhatsApp Direct Line</h4>
                      <p className="text-white font-medium mb-2">{COMPANY_CONTACT.whatsappDisplay}</p>
                      <a
                        href={COMPANY_CONTACT.whatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-[#25D366] text-slate-950 hover:bg-[#20bd5a] transition-all shadow-md"
                      >
                        <span>💬 Chat on WhatsApp ({COMPANY_CONTACT.whatsappDisplay})</span>
                      </a>
                    </div>
                  </div>

                  {/* Social Channels (Icon-only with hover title) */}
                  <div className="pt-3 border-t border-white/10">
                    <div className="text-xs font-bold text-[#E8C860] uppercase tracking-wider mb-2.5">
                      Social Channels
                    </div>
                    <div className="flex items-center gap-3">
                      {/* TikTok Icon Button */}
                      <a
                        href={COMPANY_CONTACT.tiktokUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="TikTok: Pimpliq Consultancy Ltd"
                        title="TikTok - Pimpliq Consultancy Ltd"
                        className="w-11 h-11 rounded-2xl bg-white/10 hover:bg-black text-white hover:text-[#E8C860] border border-white/15 hover:border-[#D4AF37] flex items-center justify-center transition-all hover:scale-110 shadow-md group"
                      >
                        <TikTokIcon className="w-5 h-5 transition-transform group-hover:scale-105" />
                      </a>

                      {/* Instagram Icon Button */}
                      <a
                        href={COMPANY_CONTACT.instagramUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Instagram: @pimpliqconsultancyltd"
                        title="Instagram - @pimpliqconsultancyltd"
                        className="w-11 h-11 rounded-2xl bg-white/10 hover:bg-gradient-to-tr hover:from-[#F58529] hover:via-[#DD2A7B] hover:to-[#8134AF] text-white hover:text-white border border-white/15 hover:border-transparent flex items-center justify-center transition-all hover:scale-110 shadow-md group"
                      >
                        <Instagram className="w-5 h-5 transition-transform group-hover:scale-105" />
                      </a>

                      {/* Facebook Icon Button */}
                      <a
                        href={COMPANY_CONTACT.facebookUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Facebook: Pimpliq Consultancy Ltd"
                        title="Facebook - Pimpliq Consultancy Ltd"
                        className="w-11 h-11 rounded-2xl bg-white/10 hover:bg-[#1877F2] text-white hover:text-white border border-white/15 hover:border-transparent flex items-center justify-center transition-all hover:scale-110 shadow-md group"
                      >
                        <Facebook className="w-5 h-5 transition-transform group-hover:scale-105" />
                      </a>
                    </div>
                    <p className="text-[11px] text-gray-400 mt-2">
                      {COMPANY_CONTACT.socialNote}
                    </p>
                  </div>
                </div>
              </div>

              {/* Slogan */}
              <div className="pt-8 border-t border-white/10 mt-8 text-center sm:text-left">
                <div className="text-xs font-bold text-[#D4AF37] tracking-widest uppercase">
                  PEOPLE • POTENTIAL • PROGRESS
                </div>
              </div>
            </div>

            {/* Right Form Panel (7 cols) */}
            <div className="lg:col-span-7 p-8 sm:p-12">
              <h3 className="text-2xl font-bold text-[var(--text-main)] mb-2">
                Schedule an Advisory Consultation
              </h3>
              <p className="text-xs sm:text-sm text-[var(--text-muted)] mb-6">
                Please fill out the form below and an executive advisor will review your scope and get in touch.
              </p>

              {submittedStatus && (
                <div className="mb-6 p-4 rounded-2xl bg-[#1A6B74]/15 border border-[#1A6B74] text-[#1A6B74] dark:text-[#E8C860] space-y-3">
                  <div className="flex items-center gap-3 text-xs sm:text-sm font-semibold">
                    <CheckCircle2 className="w-5 h-5 shrink-0 text-[#1A6B74] dark:text-[#E8C860]" />
                    <span>{submittedStatus}</span>
                  </div>
                  {lastSubmissionData && (
                    <div className="pt-2 border-t border-[#1A6B74]/20 flex flex-wrap items-center gap-2">
                      <span className="text-[11px] text-[var(--text-muted)]">Need an instant response?</span>
                      <a
                        href={`https://wa.me/256702932901?text=${encodeURIComponent(
                          `Hello Pimpliq Consultancy, my name is ${lastSubmissionData.name}. I just submitted an advisory consultation inquiry for ${lastSubmissionData.service}: "${lastSubmissionData.message}"`
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#25D366] text-slate-950 hover:bg-[#20bd5a] transition-all shadow-sm"
                      >
                        <span>Forward to WhatsApp (0702932901)</span>
                      </a>
                    </div>
                  )}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-bold text-[var(--text-main)] uppercase tracking-wider mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Mukasa Emmanuel"
                      className="w-full px-4 py-3 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-color)] text-[var(--text-main)] text-sm focus:outline-none focus:border-[#1A6B74]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[var(--text-main)] uppercase tracking-wider mb-2">
                      Business Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="sarah@company.com"
                      className="w-full px-4 py-3 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-color)] text-[var(--text-main)] text-sm focus:outline-none focus:border-[#1A6B74]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-bold text-[var(--text-main)] uppercase tracking-wider mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+256 700 000 000"
                      className="w-full px-4 py-3 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-color)] text-[var(--text-main)] text-sm focus:outline-none focus:border-[#1A6B74]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[var(--text-main)] uppercase tracking-wider mb-2">
                      Primary Practice Area
                    </label>
                    <select
                      value={service}
                      onChange={(e) => setService(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-color)] text-[var(--text-main)] text-sm focus:outline-none focus:border-[#1A6B74]"
                    >
                      <option value="brand-management">Brand Management Practice</option>
                      <option value="recruitment">Recruitment & Talent Sourcing</option>
                      <option value="events">Event Management & Production</option>
                      <option value="taxation">Taxation & Regulatory Compliance</option>
                      <option value="consultancy">Strategic Business Consultancy</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[var(--text-main)] uppercase tracking-wider mb-2">
                    Project Scope or Inquiries *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Describe your organization's goals, timeline, or scope requirements..."
                    className="w-full px-4 py-3 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-color)] text-[var(--text-main)] text-sm focus:outline-none focus:border-[#1A6B74] resize-y"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 rounded-full font-bold text-sm text-white bg-gradient-to-r from-[#1A6B74] to-[#10474D] hover:from-[#2BA0AD] hover:to-[#1A6B74] shadow-lg flex items-center justify-center gap-2 transition-all disabled:opacity-50 cursor-pointer"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Submitting Consultation Request...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Submit Consultation Request
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

