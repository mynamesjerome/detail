import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MapContainer, TileLayer, Circle, CircleMarker, useMap } from 'react-leaflet';
import { 
  Search, 
  CheckCircle2, 
  Compass, 
  Phone, 
  MessageSquare, 
  ArrowRight, 
  Sparkles,
  MapPin
} from 'lucide-react';
import { SERVICE_LOCATIONS } from '../data/serviceArea';

interface ServiceAreaSectionProps {
  onBookClick: () => void;
  onSelectLocation?: (slug: string) => void;
}

// Austin ZIP 78759 Coordinates (Arboretum / Great Hills)
const AUSTIN_78759_COORDS: [number, number] = [30.4014, -97.7524];
// 20 Miles in meters = 20 * 1609.34 = 32186.8 meters
const RADIUS_20_MILES_METERS = 32187;

// Responsive zoom component to fit the entire 20-mile radius on all screen sizes (mobile & desktop)
const ResponsiveMapZoom: React.FC = () => {
  const map = useMap();

  useEffect(() => {
    const updateZoom = () => {
      const isMobile = window.innerWidth < 640;
      const isTablet = window.innerWidth >= 640 && window.innerWidth < 1024;
      // On mobile (narrow screens), zoom 9 fits the full 20-mile circle with padding
      const targetZoom = isMobile ? 9 : isTablet ? 9.5 : 10;
      map.setView(AUSTIN_78759_COORDS, targetZoom);
    };

    updateZoom();
    window.addEventListener('resize', updateZoom);
    return () => window.removeEventListener('resize', updateZoom);
  }, [map]);

  return null;
};

export const ServiceAreaSection: React.FC<ServiceAreaSectionProps> = ({ 
  onBookClick, 
  onSelectLocation 
}) => {
  const [zipInput, setZipInput] = useState<string>('');
  const [searchResult, setSearchResult] = useState<{
    searchedZip: string;
    found: boolean;
    location?: typeof SERVICE_LOCATIONS[string];
  } | null>(null);

  const handleCheckZip = (e?: React.FormEvent, customZip?: string) => {
    if (e) e.preventDefault();
    const cleanZip = (customZip || zipInput).trim().slice(0, 5);

    if (!cleanZip || cleanZip.length < 5) return;

    if (customZip) {
      setZipInput(customZip);
    }

    const loc = SERVICE_LOCATIONS[cleanZip];
    if (loc) {
      setSearchResult({
        searchedZip: cleanZip,
        found: true,
        location: loc
      });
    } else {
      const isNearbyTx = cleanZip.startsWith('786') || cleanZip.startsWith('787') || cleanZip.startsWith('789');
      setSearchResult({
        searchedZip: cleanZip,
        found: false,
        location: isNearbyTx ? {
          zip: cleanZip,
          city: 'Greater Austin & Central Texas',
          area: 'Extended Travel Area',
          approxDistanceMiles: 26,
          inPrimaryRadius: false,
          tier: 'custom_travel'
        } : undefined
      });
    }
  };

  const clearSearch = () => {
    setSearchResult(null);
    setZipInput('');
  };

  return (
    <section id="service-area" className="py-14 sm:py-16 scroll-mt-20 sm:scroll-mt-24 bg-slate-950 text-white relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Clean Section Title & Neighborhood Quick Links */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10 space-y-3">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            Our Service Area
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            Providing 5-star mobile auto detailing delivered right to your driveway across Greater Austin.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-1.5 pt-1">
            {[
              { name: 'Westlake Hills', slug: 'westlake-hills' },
              { name: 'Lakeway', slug: 'lakeway' },
              { name: 'Bee Cave', slug: 'bee-cave' },
              { name: 'Barton Creek', slug: 'barton-creek' },
              { name: 'Tarrytown', slug: 'tarrytown' },
              { name: 'Round Rock', slug: 'round-rock' },
              { name: 'Circle C Ranch', slug: 'circle-c' },
              { name: 'Cedar Park', slug: 'cedar-park' },
            ].map((suburb) => (
              <button
                key={suburb.slug}
                type="button"
                onClick={() => onSelectLocation?.(suburb.slug)}
                className="px-2.5 py-1 rounded-lg bg-slate-900/90 hover:bg-slate-800 border border-slate-800 hover:border-blue-500/50 text-xs font-semibold text-slate-300 hover:text-blue-400 transition-all cursor-pointer shadow-sm flex items-center gap-1"
              >
                <MapPin className="w-3 h-3 text-blue-400 shrink-0" />
                <span>{suburb.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* 2-Column Grid: Map on Left & Perfectly Vertically Centered Checker on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
          
          {/* Left Column: Crisp, Clear & Bright-Schemed Map with 20-Mile Radius */}
          <div className="lg:col-span-7 bg-slate-900/90 border border-slate-800 rounded-3xl p-4 sm:p-5 shadow-2xl">
            
            {/* Header Badge */}
            <div className="flex items-center justify-between gap-2 mb-3">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-blue-500 shadow-sm shadow-blue-500/50" />
                <span className="text-sm font-bold text-white">Austin Metro Map</span>
                <span className="text-xs text-blue-400 font-mono px-2 py-0.5 rounded-md bg-blue-500/10 border border-blue-500/20">
                  20-Mile Radius
                </span>
              </div>
            </div>

            {/* Interactive Leaflet Map Container with clear, high-contrast bright scheme */}
            <div className="relative w-full aspect-[4/3] sm:aspect-[16/11] rounded-2xl overflow-hidden border border-slate-700/80 bg-slate-900 shadow-inner z-0">
              <MapContainer
                center={AUSTIN_78759_COORDS}
                zoom={9}
                minZoom={7}
                maxZoom={15}
                scrollWheelZoom={false}
                className="w-full h-full bright-clean-map"
              >
                <ResponsiveMapZoom />

                {/* CartoDB Positron / Voyager for clear, bright streets, parks and Austin landmarks */}
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>'
                  url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
                />

                {/* 20-Mile True Geographic Radius Circle (Geographically fixed & synchronized with pan/zoom) */}
                <Circle
                  center={AUSTIN_78759_COORDS}
                  radius={RADIUS_20_MILES_METERS}
                  pathOptions={{
                    color: '#2563eb',
                    fillColor: '#3b82f6',
                    fillOpacity: 0.22,
                    weight: 3,
                    dashArray: '6, 6'
                  }}
                />

                {/* Clean Blue Circle Pin at 78759 */}
                <CircleMarker
                  center={AUSTIN_78759_COORDS}
                  radius={8}
                  pathOptions={{
                    color: '#ffffff',
                    fillColor: '#2563eb',
                    fillOpacity: 1,
                    weight: 3
                  }}
                />
              </MapContainer>
            </div>

            {/* Bottom minimal legend */}
            <div className="mt-2.5 flex items-center justify-between text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-600 border border-white" />
                <span>Base Hub (78759)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-4 h-0 border-t-2 border-dashed border-blue-500" />
                <span>20-Mile Coverage Radius</span>
              </div>
            </div>
          </div>

          {/* Right Column: Vertically Centered Checker with confirmation pop-up */}
          <div className="lg:col-span-5 flex flex-col justify-center gap-3">
            
            {/* Input Card */}
            <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-5 sm:p-6 shadow-xl">
              <div className="flex items-center gap-2.5 mb-3.5">
                <div className="w-8 h-8 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
                  <Search className="w-4 h-4" />
                </div>
                <h3 className="text-base font-bold text-white">Check Your Zip Code</h3>
              </div>

              {/* Form Input */}
              <form onSubmit={handleCheckZip}>
                <div className="flex items-stretch gap-2">
                  <div className="relative flex-1">
                    <input
                      type="text"
                      maxLength={5}
                      pattern="[0-9]*"
                      value={zipInput}
                      onChange={(e) => setZipInput(e.target.value.replace(/\D/g, ''))}
                      placeholder="Enter 5-digit ZIP..."
                      className="w-full bg-slate-950 border border-slate-800 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded-2xl px-4 py-3 text-white font-medium placeholder-slate-500 text-sm transition-all focus:outline-none"
                    />
                    {zipInput && (
                      <button
                        type="button"
                        onClick={clearSearch}
                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white cursor-pointer"
                      >
                        Clear
                      </button>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={zipInput.length < 5}
                    className="px-5 py-3 rounded-2xl font-bold text-sm text-white bg-blue-600 hover:bg-blue-500 disabled:bg-slate-800 disabled:text-slate-500 disabled:cursor-not-allowed transition-all shadow-lg shadow-blue-600/30 flex items-center justify-center gap-1.5 cursor-pointer shrink-0"
                  >
                    <span>Check</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </form>
            </div>

            {/* Dynamic Results Display */}
            <AnimatePresence mode="wait">
              {searchResult && (
                <motion.div
                  key={searchResult.searchedZip}
                  initial={{ opacity: 0, y: 8, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8, scale: 0.98 }}
                  transition={{ duration: 0.2 }}
                >
                  {/* Case 1: In 20-Mile Primary Radius */}
                  {searchResult.location?.inPrimaryRadius ? (
                    <div className="bg-gradient-to-br from-emerald-950/80 via-slate-900 to-slate-900 border border-emerald-500/40 rounded-3xl p-5 shadow-xl">
                      <div className="flex items-start gap-3 mb-3">
                        <div className="w-8 h-8 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shrink-0">
                          <CheckCircle2 className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-bold uppercase tracking-wider mb-1">
                            <span>In Service Area</span>
                          </div>
                          <h4 className="text-base font-bold text-white">
                            {searchResult.location.city} ({searchResult.searchedZip})
                          </h4>
                          <p className="text-xs text-slate-300 mt-0.5">
                            Within 20 miles • Zero travel fees
                          </p>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={onBookClick}
                        className="w-full mt-2 py-2.5 px-4 rounded-xl font-bold text-slate-900 bg-gradient-to-r from-emerald-400 to-teal-300 hover:from-emerald-300 hover:to-teal-200 transition-all flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <Sparkles className="w-4 h-4 text-emerald-950" />
                        <span>Book Mobile Detail</span>
                      </button>
                    </div>
                  ) : (
                    /* Case 2: Outside 20 Miles */
                    <div className="bg-gradient-to-br from-blue-950/70 via-slate-900 to-slate-900 border border-blue-500/40 rounded-3xl p-5 shadow-xl">
                      <div className="flex items-start gap-3 mb-2.5">
                        <div className="w-8 h-8 rounded-xl bg-blue-500/20 border border-blue-500/40 flex items-center justify-center text-blue-400 shrink-0">
                          <Compass className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300 text-[10px] font-bold uppercase tracking-wider mb-1">
                            <span>Out-of-Area Appointment</span>
                          </div>
                          <h4 className="text-base font-bold text-white">
                            ZIP {searchResult.searchedZip} (Outside 20 Miles)
                          </h4>
                        </div>
                      </div>

                      <p className="text-xs text-slate-300 leading-relaxed mb-3">
                        You're outside our standard 20-mile routine zone, but Gavin regularly accommodates special out-of-area appointments!
                      </p>

                      <div className="flex gap-2">
                        <a
                          href={`sms:5125896977?&body=${encodeURIComponent(
                            `Hi Gavin! I'm in ZIP ${searchResult.searchedZip}. I saw I'm outside your 20-mile radius, but wanted to ask if you could do a mobile detail booking for my car?`
                          )}`}
                          className="flex-1 py-2 px-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                        >
                          <MessageSquare className="w-3.5 h-3.5" />
                          <span>Text Gavin</span>
                        </a>

                        <a
                          href="tel:5125896977"
                          className="py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs flex items-center justify-center gap-1.5 border border-slate-700 transition-all cursor-pointer"
                        >
                          <Phone className="w-3.5 h-3.5 text-blue-400" />
                          <span>(512) 589-6977</span>
                        </a>
                      </div>

                      <button
                        type="button"
                        onClick={onBookClick}
                        className="w-full mt-2 text-center text-xs font-medium text-blue-400 hover:text-blue-300 underline underline-offset-4 cursor-pointer"
                      >
                        Or continue with quote calculator →
                      </button>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

          </div>
        </div>

      </div>
    </section>
  );
};
