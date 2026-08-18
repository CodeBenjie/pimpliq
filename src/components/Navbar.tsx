import React, { useState, useEffect } from 'react';
import { Sun, Moon, Menu, X, ArrowRight, Shield } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { PIMPLIQ_IMAGES } from '../data/pimpliqData';

interface NavbarProps {
  darkMode: boolean;
  setDarkMode: (val: boolean) => void;
  onBookConsultation: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ darkMode, setDarkMode, onBookConsultation }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      const sections = ['home', 'about', 'leadership', 'pillars', 'brand-hub', 'estimator', 'showcase', 'contact'];
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 140 && rect.bottom >= 140) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', href: '#home', id: 'home' },
    { label: 'About Us', href: '#about', id: 'about' },
    { label: 'Leadership', href: '#leadership', id: 'leadership' },
    { label: 'Services', href: '#pillars', id: 'pillars' },
    { label: 'Brand Hub', href: '#brand-hub', id: 'brand-hub' },
    { label: 'Proposal Builder', href: '#estimator', id: 'estimator' },
    { label: 'Showcase', href: '#showcase', id: 'showcase' },
    { label: 'Contact', href: '#contact', id: 'contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? 'glass-panel shadow-md py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo & Slogan */}
        <a href="#home" className="flex items-center gap-3 group">
          <div className="bg-white p-1 rounded-xl shadow-md border border-[#D4AF37]/40 overflow-hidden group-hover:scale-105 transition-transform">
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
              className="h-9 sm:h-10 w-auto object-contain"
            />
          </div>
          <div className="hidden sm:block border-l border-gray-300 dark:border-gray-700 pl-3">
            <div className="font-extrabold text-lg tracking-tight text-[var(--text-main)] flex items-center gap-1.5 leading-none mb-1">
              PIMPLIQ <span className="text-[#1A6B74] font-semibold text-xs">Consultancy Ltd</span>
            </div>
            <div className="text-[10px] font-bold text-[#D4AF37] uppercase tracking-widest leading-none">
              People • Potential • Progress
            </div>
          </div>
        </a>

        {/* Desktop Nav Links */}
        <nav className="hidden lg:flex items-center gap-7">
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={link.href}
              className={`text-sm font-semibold transition-colors relative py-1 ${
                activeSection === link.id
                  ? 'text-[#1A6B74] dark:text-[#E8C860]'
                  : 'text-[var(--text-muted)] hover:text-[#1A6B74] dark:hover:text-[#E8C860]'
              }`}
            >
              {link.label}
              {activeSection === link.id && (
                <motion.div
                  layoutId="activeNavIndicator"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#1A6B74] dark:bg-[#D4AF37] rounded-full"
                />
              )}
            </a>
          ))}
        </nav>

        {/* Right Action Controls */}
        <div className="flex items-center gap-3 sm:gap-4">
          {/* Dark Mode Toggle */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="w-10 h-10 rounded-full bg-[var(--bg-tertiary)] hover:bg-[var(--border-color)] flex items-center justify-center text-[var(--text-main)] transition-all hover:rotate-12"
            aria-label="Toggle Theme"
          >
            {darkMode ? <Sun className="w-5 h-5 text-[#E8C860]" /> : <Moon className="w-5 h-5 text-[#0F172A]" />}
          </button>

          {/* Book Consultation Button */}
          <button
            onClick={onBookConsultation}
            className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold text-white bg-gradient-to-r from-[#1A6B74] to-[#10474D] hover:from-[#2BA0AD] hover:to-[#1A6B74] shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all"
          >
            Book Consultation
            <ArrowRight className="w-4 h-4" />
          </button>

          {/* Mobile Hamburger Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-[var(--text-main)] hover:bg-[var(--bg-tertiary)]"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden glass-panel border-b border-[var(--border-color)] px-4 pt-4 pb-6 mt-3 shadow-xl"
          >
            <div className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <a
                  key={link.id}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`text-base font-semibold px-3 py-2 rounded-lg transition-colors ${
                    activeSection === link.id
                      ? 'bg-[var(--color-teal-bg)] text-[#1A6B74] dark:text-[#E8C860]'
                      : 'text-[var(--text-muted)] hover:bg-[var(--bg-tertiary)]'
                  }`}
                >
                  {link.label}
                </a>
              ))}
              <div className="pt-3 border-t border-[var(--border-color)]">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onBookConsultation();
                  }}
                  className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-full text-sm font-bold text-white bg-gradient-to-r from-[#1A6B74] to-[#10474D]"
                >
                  Book Consultation
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
