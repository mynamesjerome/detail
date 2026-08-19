import React from 'react';
import { Logo } from './Logo';
import { MapPin, Phone, MessageSquare, ArrowUp, ShieldCheck } from 'lucide-react';
import { scrollToSection } from '../utils/navigation';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    scrollToSection('/');
  };

  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-900 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-12 border-b border-slate-900">
          
          {/* Col 1: Brand (5 cols) */}
          <div className="md:col-span-5 space-y-4">
            <Logo variant="light" size="lg" />
            <p className="text-xs text-slate-400 leading-relaxed font-normal max-w-sm pt-2">
              Austin’s premier mobile auto detailing service. Delivering precision exterior hand washing, interior steam restoration, and ceramic protection directly to your home or office.
            </p>
            <div className="flex items-center gap-2 text-xs font-semibold text-blue-400 pt-2">
              <MapPin className="w-4 h-4 text-blue-500" />
              <span>Serving Greater Austin & Surrounding Areas</span>
            </div>
          </div>

          {/* Col 2: Navigation Links (3 cols) */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Quick Navigation
            </h4>
            <ul className="space-y-2 text-xs font-medium">
              <li>
                <button
                  type="button"
                  onClick={() => scrollToSection('/services')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Detailing Packages
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => scrollToSection('/addons')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Custom Add-On Treatments
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => scrollToSection('/maintenance')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Maintenance Program
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => scrollToSection('/reviews')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Google Client Reviews
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => scrollToSection('/service-area')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Service Area (30-Mile Radius)
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => scrollToSection('/faq')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Frequently Asked Questions (FAQ)
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => scrollToSection('/book')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Book Mobile Detail
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Direct Contact (4 cols) */}
          <div className="md:col-span-4 space-y-4">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Mobile Detailing Contact
            </h4>
            <div className="space-y-2.5 text-xs text-slate-300">
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-blue-400 shrink-0" />
                <a href="tel:5125896977" className="hover:text-blue-400 transition-colors font-bold text-sm">
                  (512) 589-6977
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <MessageSquare className="w-4 h-4 text-emerald-400 shrink-0" />
                <a href="sms:5125896977" className="hover:text-emerald-400 transition-colors">
                  SMS Text Scheduling Available
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <ShieldCheck className="w-4 h-4 text-blue-400 shrink-0" />
                <a href="mailto:gavinscardetailing@gmail.com" className="hover:text-blue-400 transition-colors">
                  gavinscardetailing@gmail.com
                </a>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="button"
                onClick={() => scrollToSection('/book')}
                className="inline-block py-2.5 px-4 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold transition-all shadow-md cursor-pointer"
              >
                Book Mobile Service
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 font-normal">
          <p>© {new Date().getFullYear()} Gavin's Car Detailing. All rights reserved. Austin, Texas.</p>

          {/* Back to Top Button */}
          <button
            onClick={scrollToTop}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white transition-all cursor-pointer border border-slate-800"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5 text-blue-400" />
          </button>
        </div>

      </div>
    </footer>
  );
};
