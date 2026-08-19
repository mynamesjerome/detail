import React from 'react';
import { Logo } from './Logo';
import { MapPin, Phone, MessageSquare, ArrowUp, ShieldCheck, Sparkles } from 'lucide-react';
import { scrollToSection } from '../utils/navigation';

interface FooterProps {
  onSelectLocation?: (slug: string) => void;
  onSelectService?: (slug: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectLocation, onSelectService }) => {
  const scrollToTop = () => {
    scrollToSection('/');
  };

  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-900 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-10 pb-12 border-b border-slate-900">
          
          {/* Col 1: Brand (4 cols) */}
          <div className="md:col-span-4 space-y-4">
            <Logo variant="light" size="lg" />
            <p className="text-xs text-slate-400 leading-relaxed font-normal max-w-sm pt-2">
              Austin’s premier mobile auto detailing service. Delivering precision exterior hand washing, interior steam restoration, and ceramic protection directly to your home or office.
            </p>
            <div className="flex items-center gap-2 text-xs font-semibold text-blue-400 pt-1">
              <MapPin className="w-4 h-4 text-blue-500 shrink-0" />
              <span>Serving Greater Austin & 30-Mile Metro Radius</span>
            </div>
            <div className="pt-2 space-y-1.5 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                <a href="tel:5125896977" className="hover:text-blue-400 transition-colors font-bold text-white">
                  (512) 589-6977
                </a>
              </div>
              <div className="flex items-center gap-2">
                <MessageSquare className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <a href="sms:5125896977" className="hover:text-emerald-400 transition-colors text-slate-300">
                  SMS Text Scheduling
                </a>
              </div>
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
                  Service Area & Radius
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => scrollToSection('/faq')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Frequently Asked Questions
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Popular Service Areas (3 cols) */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
              <span>Local Service Areas</span>
            </h4>
            <ul className="space-y-2 text-xs font-medium">
              {[
                { name: 'Westlake Hills Detailing', slug: 'westlake-hills' },
                { name: 'Steiner Ranch Mobile Wash', slug: 'steiner-ranch' },
                { name: 'Lakeway & Lake Travis', slug: 'lakeway' },
                { name: 'Bee Cave & Spanish Oaks', slug: 'bee-cave' },
                { name: 'Barton Creek Auto Care', slug: 'barton-creek' },
                { name: 'Davenport Ranch & 360', slug: 'davenport-ranch' },
                { name: 'Tarrytown & Pemberton', slug: 'tarrytown' },
                { name: 'Avery Ranch & Great Hills', slug: 'avery-ranch' },
                { name: 'Circle C Ranch Detailing', slug: 'circle-c' },
                { name: 'Round Rock Detailing', slug: 'round-rock' },
                { name: 'Cedar Park Mobile Care', slug: 'cedar-park' },
              ].map((loc) => (
                <li key={loc.slug}>
                  <button
                    type="button"
                    onClick={() => onSelectLocation?.(loc.slug)}
                    className="hover:text-blue-400 transition-colors cursor-pointer text-left text-slate-400"
                  >
                    {loc.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Specialized Treatments (2 cols) */}
          <div className="md:col-span-2 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Specialty Care
            </h4>
            <ul className="space-y-2 text-xs font-medium">
              {[
                { name: 'Ceramic Coatings', slug: 'ceramic-coating-austin' },
                { name: 'Paint Enhancement', slug: 'paint-correction-austin' },
                { name: 'Steam Sanitization', slug: 'interior-steam-detailing' },
              ].map((srv) => (
                <li key={srv.slug}>
                  <button
                    type="button"
                    onClick={() => onSelectService?.(srv.slug)}
                    className="hover:text-purple-400 transition-colors cursor-pointer text-left text-slate-400"
                  >
                    {srv.name}
                  </button>
                </li>
              ))}
            </ul>

            <div className="pt-3">
              <button
                type="button"
                onClick={() => scrollToSection('/book')}
                className="w-full py-2.5 px-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold transition-all shadow-md cursor-pointer text-center"
              >
                Book Online
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
