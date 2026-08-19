import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  MapPin, 
  Sparkles, 
  Phone, 
  MessageSquare, 
  Calendar, 
  CheckCircle2, 
  ArrowRight,
  ShieldCheck,
  Clock,
  Car
} from 'lucide-react';
import { LocationLandingData, ServiceLandingData } from '../data/landingPages';

interface LandingPageModalProps {
  locationData: LocationLandingData | null;
  serviceData: ServiceLandingData | null;
  isOpen: boolean;
  onClose: () => void;
  onBookNow: () => void;
}

export const LandingPageModal: React.FC<LandingPageModalProps> = ({
  locationData,
  serviceData,
  isOpen,
  onClose,
  onBookNow,
}) => {
  if (!isOpen || (!locationData && !serviceData)) return null;

  const isLocation = !!locationData;
  const title = isLocation ? locationData?.name : serviceData?.name;
  const subTitle = isLocation ? locationData?.subTitle : serviceData?.badge;
  const headline = isLocation ? locationData?.headline : serviceData?.headline;
  const description = isLocation ? locationData?.description : serviceData?.description;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 md:p-6">
        
        {/* Modal Backdrop / Dismiss */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0"
        />

        {/* Modal Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 20 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="relative w-full max-w-3xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden z-10 text-white my-8 max-h-[90vh] flex flex-col"
        >
          {/* Top Bar with Dismiss */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/60 sticky top-0 z-20 backdrop-blur-md">
            <div className="flex items-center gap-2">
              {isLocation ? (
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-bold uppercase tracking-wider">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{locationData?.name} Service Area</span>
                </div>
              ) : (
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-400 text-xs font-bold uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{serviceData?.badge}</span>
                </div>
              )}
            </div>

            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white transition-all cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Scrollable Content */}
          <div className="overflow-y-auto p-6 sm:p-8 space-y-8">
            
            {/* Hero Header */}
            <div className="space-y-3">
              <span className="text-xs sm:text-sm font-semibold text-blue-400">
                {subTitle}
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-tight">
                {headline}
              </h2>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
                {description}
              </p>
            </div>

            {/* Quick Action CTAs */}
            <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-blue-950/60 via-slate-900 to-indigo-950/60 border border-blue-800/50 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-center sm:text-left">
                <div className="text-xs text-blue-400 font-bold uppercase tracking-wider">
                  Mobile Driveway Service
                </div>
                <div className="text-sm sm:text-base font-extrabold text-white mt-0.5">
                  Direct to your home or office
                </div>
              </div>

              <div className="flex items-center gap-2.5 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onBookNow();
                  }}
                  className="flex-1 sm:flex-initial px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-extrabold text-xs uppercase tracking-wider transition-all shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Book Online</span>
                </button>
                <a
                  href="tel:5125896977"
                  className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 hover:text-white text-xs font-bold transition-all flex items-center gap-1.5"
                >
                  <Phone className="w-3.5 h-3.5 text-blue-400" />
                  <span>Call Gavin</span>
                </a>
              </div>
            </div>

            {/* Location Specific Content */}
            {isLocation && locationData && (
              <>
                {/* Local Highlights 3-col */}
                <div className="space-y-3">
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-blue-400" />
                    <span>Why {locationData.name} Residents Choose Gavin's Detailing</span>
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {locationData.localHighlights.map((hl, idx) => (
                      <div
                        key={idx}
                        className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800/80 space-y-1.5"
                      >
                        <div className="text-xs font-bold text-blue-400">{hl.title}</div>
                        <p className="text-xs text-slate-300 leading-relaxed font-normal">
                          {hl.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Key Subdivisions & Zip Codes */}
                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                  <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    Target Coverage & Neighborhoods
                  </div>
                  <div className="flex flex-wrap gap-2 pt-1">
                    {locationData.zipCodes.map((zip) => (
                      <span
                        key={zip}
                        className="px-2.5 py-1 rounded-lg bg-blue-950/80 border border-blue-800/60 text-blue-300 text-xs font-mono font-bold"
                      >
                        ZIP {zip}
                      </span>
                    ))}
                    {locationData.keyLandmarks.map((landmark) => (
                      <span
                        key={landmark}
                        className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 text-xs font-medium"
                      >
                        {landmark}
                      </span>
                    ))}
                  </div>
                </div>
              </>
            )}

            {/* Service Specific Content */}
            {!isLocation && serviceData && (
              <>
                {/* Benefits List */}
                <div className="space-y-3">
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-purple-400" />
                    <span>Key Features & Protection Benefits</span>
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {serviceData.benefits.map((b, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-950/80 border border-slate-800/80 text-xs text-slate-200"
                      >
                        <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                        <span>{b}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 3 Step Process */}
                <div className="space-y-3">
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <Clock className="w-4 h-4 text-blue-400" />
                    <span>Professional Execution Process</span>
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {serviceData.processSteps.map((step) => (
                      <div
                        key={step.step}
                        className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1.5"
                      >
                        <div className="w-6 h-6 rounded-md bg-blue-600/20 border border-blue-500/30 text-blue-400 font-bold text-xs flex items-center justify-center">
                          {step.step}
                        </div>
                        <div className="text-xs font-bold text-white pt-1">{step.title}</div>
                        <p className="text-xs text-slate-400 leading-relaxed font-normal">
                          {step.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}

            {/* Bottom Actions */}
            <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
              <button
                type="button"
                onClick={onClose}
                className="w-full sm:w-auto px-4 py-2 text-xs font-bold text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                ← Back to full website
              </button>

              <button
                type="button"
                onClick={() => {
                  onClose();
                  onBookNow();
                }}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-extrabold text-xs uppercase tracking-wider transition-all shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Calculate Price & Book Appointment</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
