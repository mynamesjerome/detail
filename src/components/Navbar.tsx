import React, { useState, useEffect } from 'react';
import { Logo } from './Logo';
import { Phone, Calendar, Menu, X, MapPin, Star } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { scrollToSection, getRouteByPath } from '../utils/navigation';

interface NavbarProps {
  onBookClick: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onBookClick }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileBookPopping, setMobileBookPopping] = useState(false);
  const [currentPath, setCurrentPath] = useState(
    typeof window !== 'undefined' ? window.location.pathname : '/'
  );

  useEffect(() => {
    const updatePathFromLocation = () => {
      setCurrentPath(window.location.pathname);
    };

    const handleCustomRoute = (e: Event) => {
      const customEvent = e as CustomEvent<{ path: string; id: string }>;
      if (customEvent.detail && customEvent.detail.path) {
        setCurrentPath(customEvent.detail.path);
      }
    };

    window.addEventListener('popstate', updatePathFromLocation);
    window.addEventListener('app-route-change', handleCustomRoute);

    // Active scroll spy to update highlighted tab and URL as user scrolls
    const sections = [
      { id: 'hero', path: '/' },
      { id: 'services', path: '/services' },
      { id: 'add-ons', path: '/addons' },
      { id: 'gallery', path: '/gallery' },
      { id: 'maintenance', path: '/maintenance' },
      { id: 'reviews', path: '/reviews' },
      { id: 'service-area', path: '/service-area' },
      { id: 'booking', path: '/book' },
      { id: 'faq', path: '/faq' },
    ];

    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollY = window.pageYOffset || document.documentElement.scrollTop;

          // If near the top, highlight home / hero
          if (scrollY < 220) {
            setCurrentPath('/');
            if (window.location.pathname !== '/') {
              window.history.replaceState({ section: 'hero' }, '', '/');
            }
            ticking = false;
            return;
          }

          const headerOffset = 180;
          let activeSection = sections[0];

          for (const sec of sections) {
            if (sec.id === 'hero') continue;
            const el = document.getElementById(sec.id);
            if (el) {
              const top = el.getBoundingClientRect().top;
              if (top <= headerOffset) {
                activeSection = sec;
              }
            }
          }

          if (activeSection && activeSection.path) {
            setCurrentPath(activeSection.path);
            if (window.location.pathname !== activeSection.path) {
              window.history.replaceState({ section: activeSection.id }, '', activeSection.path);
            }
          }

          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Run once on initial mount
    handleScroll();

    return () => {
      window.removeEventListener('popstate', updatePathFromLocation);
      window.removeEventListener('app-route-change', handleCustomRoute);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleMobileBookClick = () => {
    setMobileBookPopping(true);
    setCurrentPath('/book');
    setTimeout(() => setMobileBookPopping(false), 350);
    scrollToSection('/book');
  };

  const handleNavClick = (pathOrId: string) => {
    setMobileMenuOpen(false);
    const route = getRouteByPath(pathOrId.startsWith('/') ? pathOrId : `/${pathOrId}`);
    setCurrentPath(route.path);
    scrollToSection(pathOrId);
  };

  const handleLogoClick = () => {
    setMobileMenuOpen(false);
    setCurrentPath('/');
    scrollToSection('/');
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-slate-950 border-b border-slate-800 shadow-xl py-3 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo with Smooth Scroll to Top & URL reset to / */}
          <button
            type="button"
            onClick={handleLogoClick}
            className="group flex items-center gap-2 focus:outline-none rounded-xl p-1 cursor-pointer transition-transform hover:scale-[1.02] active:scale-[0.98] text-left"
            aria-label="Scroll back to top"
          >
            <Logo size="lg" variant="light" />
          </button>

          {/* Desktop Navigation with URL deep-links */}
          <nav className="hidden md:flex items-center gap-7">
            <button
              type="button"
              onClick={() => handleNavClick('/services')}
              className={`text-sm font-semibold transition-colors cursor-pointer ${
                currentPath === '/services' ? 'text-blue-400' : 'text-slate-200 hover:text-blue-400'
              }`}
            >
              Services
            </button>
            <button
              type="button"
              onClick={() => handleNavClick('/addons')}
              className={`text-sm font-semibold transition-colors cursor-pointer ${
                currentPath === '/addons' || currentPath === '/add-ons' ? 'text-blue-400' : 'text-slate-200 hover:text-blue-400'
              }`}
            >
              Add-Ons
            </button>
            <button
              type="button"
              onClick={() => handleNavClick('/gallery')}
              className={`text-sm font-semibold transition-colors cursor-pointer ${
                currentPath === '/gallery' ? 'text-blue-400' : 'text-slate-200 hover:text-blue-400'
              }`}
            >
              Gallery
            </button>
            <button
              type="button"
              onClick={() => handleNavClick('/maintenance')}
              className={`text-sm font-semibold transition-colors cursor-pointer ${
                currentPath === '/maintenance' ? 'text-blue-400' : 'text-slate-200 hover:text-blue-400'
              }`}
            >
              Maintenance
            </button>
            <button
              type="button"
              onClick={() => handleNavClick('/reviews')}
              className={`text-sm font-semibold transition-colors cursor-pointer ${
                currentPath === '/reviews' ? 'text-blue-400' : 'text-slate-200 hover:text-blue-400'
              }`}
            >
              Reviews
            </button>
            <button
              type="button"
              onClick={() => handleNavClick('/service-area')}
              className={`text-sm font-semibold transition-colors cursor-pointer ${
                currentPath === '/service-area' || currentPath === '/servicearea' ? 'text-blue-400' : 'text-slate-200 hover:text-blue-400'
              }`}
            >
              Service Area
            </button>
            <button
              type="button"
              onClick={() => handleNavClick('/faq')}
              className={`text-sm font-semibold transition-colors cursor-pointer ${
                currentPath === '/faq' ? 'text-blue-400' : 'text-slate-200 hover:text-blue-400'
              }`}
            >
              FAQ
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
              type="button"
              onClick={() => handleNavClick('/book')}
              className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-extrabold text-white bg-blue-600 hover:bg-blue-500 rounded-full shadow-lg shadow-blue-600/30 hover:shadow-blue-500/50 transition-all uppercase tracking-wider cursor-pointer animate-shimmer relative overflow-hidden"
            >
              <Calendar className="w-4 h-4 relative z-10" />
              <span className="relative z-10">Book Detail</span>
            </button>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex md:hidden items-center gap-2">
            <motion.button
              type="button"
              animate={mobileBookPopping ? { scale: [1, 1.3, 0.95, 1] } : { scale: 1 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              onClick={handleMobileBookClick}
              className="px-3.5 py-1.5 text-xs font-extrabold text-white bg-blue-600 rounded-full shadow-md uppercase tracking-wider animate-shimmer relative overflow-hidden cursor-pointer touch-manipulation transform-gpu"
            >
              <span className="relative z-10">Book</span>
            </motion.button>
            <button
              type="button"
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
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="overflow-hidden md:hidden bg-slate-950 border-b border-slate-800 shadow-2xl"
          >
            <div className="px-4 pt-3 pb-6 flex flex-col gap-1 py-2">
              <button
                type="button"
                onClick={() => handleNavClick('/services')}
                className={`w-full flex items-center justify-between py-3 px-3 text-left text-base font-semibold rounded-xl border-b border-slate-900/80 active:bg-slate-800 transition-colors cursor-pointer touch-manipulation ${
                  currentPath === '/services' ? 'text-blue-400 bg-slate-900' : 'text-slate-200 hover:text-white hover:bg-slate-900'
                }`}
              >
                <span>Services & Packages</span>
                <span className="text-xs text-blue-400 font-medium">From $60</span>
              </button>
              <button
                type="button"
                onClick={() => handleNavClick('/addons')}
                className={`w-full flex items-center justify-between py-3 px-3 text-left text-base font-semibold rounded-xl border-b border-slate-900/80 active:bg-slate-800 transition-colors cursor-pointer touch-manipulation ${
                  currentPath === '/addons' || currentPath === '/add-ons' ? 'text-blue-400 bg-slate-900' : 'text-slate-200 hover:text-white hover:bg-slate-900'
                }`}
              >
                <span>Custom Add-Ons</span>
                <span className="text-xs text-slate-400 font-medium">6 Options</span>
              </button>
              <button
                type="button"
                onClick={() => handleNavClick('/gallery')}
                className={`w-full flex items-center justify-between py-3 px-3 text-left text-base font-semibold rounded-xl border-b border-slate-900/80 active:bg-slate-800 transition-colors cursor-pointer touch-manipulation ${
                  currentPath === '/gallery' ? 'text-blue-400 bg-slate-900' : 'text-slate-200 hover:text-white hover:bg-slate-900'
                }`}
              >
                <span>Photo Gallery</span>
                <span className="text-xs text-purple-400 font-medium">Showcase</span>
              </button>
              <button
                type="button"
                onClick={() => handleNavClick('/maintenance')}
                className={`w-full flex items-center justify-between py-3 px-3 text-left text-base font-semibold rounded-xl border-b border-slate-900/80 active:bg-slate-800 transition-colors cursor-pointer touch-manipulation ${
                  currentPath === '/maintenance' ? 'text-blue-400 bg-slate-900' : 'text-slate-200 hover:text-white hover:bg-slate-900'
                }`}
              >
                <span>Maintenance Program</span>
                <span className="text-xs text-emerald-400 font-medium">Recurring</span>
              </button>
              <button
                type="button"
                onClick={() => handleNavClick('/reviews')}
                className={`w-full flex items-center justify-between py-3 px-3 text-left text-base font-semibold rounded-xl border-b border-slate-900/80 active:bg-slate-800 transition-colors cursor-pointer touch-manipulation ${
                  currentPath === '/reviews' ? 'text-blue-400 bg-slate-900' : 'text-slate-200 hover:text-white hover:bg-slate-900'
                }`}
              >
                <span>Customer Reviews</span>
                <span className="text-xs text-amber-400 font-medium flex items-center gap-1">
                  <Star className="w-3 h-3 fill-amber-400 text-amber-400" /> 5.0
                </span>
              </button>
              <button
                type="button"
                onClick={() => handleNavClick('/service-area')}
                className={`w-full flex items-center justify-between py-3 px-3 text-left text-base font-semibold rounded-xl border-b border-slate-900/80 active:bg-slate-800 transition-colors cursor-pointer touch-manipulation ${
                  currentPath === '/service-area' || currentPath === '/servicearea' ? 'text-blue-400 bg-slate-900' : 'text-slate-200 hover:text-white hover:bg-slate-900'
                }`}
              >
                <span>Service Area & Coverage</span>
                <span className="text-xs text-blue-400 font-medium">30-Mile Radius</span>
              </button>
              <button
                type="button"
                onClick={() => handleNavClick('/faq')}
                className={`w-full flex items-center justify-between py-3 px-3 text-left text-base font-semibold rounded-xl active:bg-slate-800 transition-colors cursor-pointer touch-manipulation ${
                  currentPath === '/faq' ? 'text-blue-400 bg-slate-900' : 'text-slate-200 hover:text-white hover:bg-slate-900'
                }`}
              >
                <span>Frequently Asked Questions</span>
                <span className="text-xs text-cyan-400 font-medium">Q&A</span>
              </button>

              <div className="pt-4 flex flex-col gap-2.5">
                <button
                  type="button"
                  onClick={() => handleNavClick('/book')}
                  className="w-full flex items-center justify-center gap-2 py-3.5 text-sm font-extrabold uppercase tracking-wider text-white bg-blue-600 hover:bg-blue-500 rounded-2xl shadow-xl shadow-blue-600/40 animate-shimmer relative overflow-hidden cursor-pointer touch-manipulation"
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
