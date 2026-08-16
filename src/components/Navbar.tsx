import React, { useState } from 'react';
import { Logo } from './Logo';
import { Phone, Calendar, Menu, X, MapPin, Star } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface NavbarProps {
  onBookClick: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onBookClick }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileBookPopping, setMobileBookPopping] = useState(false);

  const handleMobileBookClick = () => {
    setMobileBookPopping(true);
    setTimeout(() => setMobileBookPopping(false), 350);
    onBookClick();
  };

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = Math.max(0, elementPosition - headerOffset);

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-slate-950 border-b border-slate-800 shadow-xl py-3 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo (Bigger) */}
          <a
            href="#"
            className="group flex items-center gap-2 focus:outline-none rounded-xl p-1"
          >
            <Logo size="lg" variant="light" />
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-7">
            <button
              onClick={() => scrollToSection('services')}
              className="text-sm font-semibold text-slate-200 hover:text-blue-400 transition-colors cursor-pointer"
            >
              Services
            </button>
            <button
              onClick={() => scrollToSection('add-ons')}
              className="text-sm font-semibold text-slate-200 hover:text-blue-400 transition-colors cursor-pointer"
            >
              Add-Ons
            </button>
            <button
              onClick={() => scrollToSection('gallery')}
              className="text-sm font-semibold text-slate-200 hover:text-blue-400 transition-colors cursor-pointer"
            >
              Gallery
            </button>
            <button
              onClick={() => scrollToSection('maintenance')}
              className="text-sm font-semibold text-slate-200 hover:text-blue-400 transition-colors cursor-pointer"
            >
              Maintenance
            </button>
            <button
              onClick={() => scrollToSection('reviews')}
              className="text-sm font-semibold text-slate-200 hover:text-blue-400 transition-colors cursor-pointer"
            >
              Reviews
            </button>
            <button
              onClick={() => scrollToSection('booking')}
              className="text-sm font-semibold text-slate-200 hover:text-blue-400 transition-colors cursor-pointer"
            >
              Contact
            </button>
          </nav>

          {/* Action CTAs */}
          <div className="hidden sm:flex items-center gap-3">
            <a
              href="tel:5125896977"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-slate-200 hover:text-white bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-full transition-all"
            >
              <Phone className="w-3.5 h-3.5 text-blue-400" />
              <span>(512) 589-6977</span>
            </a>

            <button
              onClick={onBookClick}
              className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-extrabold text-white bg-blue-600 hover:bg-blue-500 rounded-full shadow-lg shadow-blue-600/30 hover:shadow-blue-500/50 transition-all uppercase tracking-wider cursor-pointer animate-shimmer relative overflow-hidden"
            >
              <Calendar className="w-4 h-4 relative z-10" />
              <span className="relative z-10">Book Detail</span>
            </button>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex md:hidden items-center gap-2">
            <motion.button
              animate={mobileBookPopping ? { scale: [1, 1.3, 0.95, 1] } : { scale: 1 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              onClick={handleMobileBookClick}
              className="px-3.5 py-1.5 text-xs font-extrabold text-white bg-blue-600 rounded-full shadow-md uppercase tracking-wider animate-shimmer relative overflow-hidden cursor-pointer touch-manipulation transform-gpu"
            >
              <span className="relative z-10">Book</span>
            </motion.button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-300 hover:text-white hover:bg-slate-900 rounded-xl transition-colors cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Animated Dropdown Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden md:hidden bg-slate-950 border-b border-slate-800 shadow-2xl"
          >
            <div className="px-4 pt-3 pb-6 flex flex-col gap-3 py-2">
              <button
                onClick={() => scrollToSection('services')}
                className="flex items-center justify-between py-2.5 text-left text-base font-semibold text-slate-200 border-b border-slate-900 cursor-pointer"
              >
                <span>Services & Packages</span>
                <span className="text-xs text-blue-400 font-medium">From $55</span>
              </button>
              <button
                onClick={() => scrollToSection('add-ons')}
                className="flex items-center justify-between py-2.5 text-left text-base font-semibold text-slate-200 border-b border-slate-900 cursor-pointer"
              >
                <span>Custom Add-Ons</span>
                <span className="text-xs text-slate-400 font-medium">6 Options</span>
              </button>
              <button
                onClick={() => scrollToSection('gallery')}
                className="flex items-center justify-between py-2.5 text-left text-base font-semibold text-slate-200 border-b border-slate-900 cursor-pointer"
              >
                <span>Photo Gallery</span>
                <span className="text-xs text-purple-400 font-medium">Scrapbook</span>
              </button>
              <button
                onClick={() => scrollToSection('maintenance')}
                className="flex items-center justify-between py-2.5 text-left text-base font-semibold text-slate-200 border-b border-slate-900 cursor-pointer"
              >
                <span>Maintenance Program</span>
                <span className="text-xs text-emerald-400 font-medium">Recurring</span>
              </button>
              <button
                onClick={() => scrollToSection('reviews')}
                className="flex items-center justify-between py-2.5 text-left text-base font-semibold text-slate-200 border-b border-slate-900 cursor-pointer"
              >
                <span>Customer Reviews</span>
                <span className="text-xs text-amber-400 font-medium flex items-center gap-1">
                  <Star className="w-3 h-3 fill-amber-400 text-amber-400" /> 5.0
                </span>
              </button>
              <button
                onClick={() => scrollToSection('booking')}
                className="flex items-center justify-between py-2.5 text-left text-base font-semibold text-slate-200 cursor-pointer"
              >
                <span>Contact & Booking</span>
              </button>

              <div className="pt-4 flex flex-col gap-2.5">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onBookClick();
                  }}
                  className="w-full flex items-center justify-center gap-2 py-3.5 text-sm font-extrabold uppercase tracking-wider text-white bg-blue-600 hover:bg-blue-500 rounded-2xl shadow-xl shadow-blue-600/40 animate-shimmer relative overflow-hidden cursor-pointer"
                >
                  <Calendar className="w-4 h-4 relative z-10" />
                  <span className="relative z-10">Book Mobile Detail Now</span>
                </button>
                
                <div className="flex items-center justify-center gap-1.5 text-[11px] sm:text-xs text-slate-400 pt-1 whitespace-nowrap">
                  <MapPin className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                  <span>Serving Greater Austin, TX & Surrounding Areas</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
