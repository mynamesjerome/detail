import React from 'react';
import { Shield, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';

interface PolicySectionProps {
  agreed: boolean;
  onToggleAgree: (agreed: boolean) => void;
}

export const PolicySection: React.FC<PolicySectionProps> = ({ agreed, onToggleAgree }) => {
  return (
    <section id="policy" className="py-20 bg-slate-50 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Onboarding-style Card Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200/90 shadow-xl relative overflow-hidden"
        >
          {/* Top Decorative Header Accent */}
          <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-500" />

          <div className="flex flex-col items-center text-center max-w-2xl mx-auto mb-8">
            <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mb-4 border border-blue-100 shadow-xs">
              <Shield className="w-7 h-7" />
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950 tracking-tight">
              Policy Agreement
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-600 font-normal">
              Please review our service policies before booking your mobile detail.
            </p>
          </div>

          {/* Rules Cards */}
          <div className="space-y-4 mb-8">
            {/* Rule 1 */}
            <div className="p-5 rounded-2xl bg-slate-50/90 border border-slate-200/80 flex items-start gap-4">
              <div className="w-7 h-7 rounded-full bg-blue-100 text-blue-700 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                1
              </div>
              <div className="text-left">
                <h3 className="text-sm font-bold text-slate-900 mb-1">
                  Personal Belongings Clearance
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                  All personal belongings <span className="font-bold text-slate-900">MUST</span> be removed from the car prior to detail or they will be cleared and set aside during the process.
                </p>
              </div>
            </div>

            {/* Rule 2 */}
            <div className="p-5 rounded-2xl bg-amber-50/80 border border-amber-200/80 flex items-start gap-4">
              <div className="w-7 h-7 rounded-full bg-amber-100 text-amber-800 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                <AlertTriangle className="w-4 h-4 text-amber-700" />
              </div>
              <div className="text-left">
                <h3 className="text-sm font-bold text-amber-950 mb-1">
                  Special Circumstances & Upcharges
                </h3>
                <p className="text-xs sm:text-sm text-amber-900 leading-relaxed font-normal">
                  Under <span className="font-bold">SPECIAL</span> circumstances (excessive mud, heavy interior staining, or severe pet hair), additional upcharges may apply upon initial vehicle inspection.
                </p>
              </div>
            </div>
          </div>

          {/* Interactive Confirmation Button / Checkbox */}
          <div className="pt-4 border-t border-slate-200/80 flex flex-col items-center">
            <button
              type="button"
              onClick={() => onToggleAgree(!agreed)}
              className={`w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl font-bold text-sm transition-all duration-300 cursor-pointer shadow-md ${
                agreed
                  ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-600/20'
                  : 'bg-blue-600 hover:bg-blue-700 text-white shadow-blue-600/20'
              }`}
            >
              <CheckCircle2 className={`w-5 h-5 ${agreed ? 'text-white' : 'text-blue-200'}`} />
              <span>
                {agreed ? '✓ Terms Agreed & Confirmed' : 'I Understand & Agree to Terms'}
              </span>
            </button>
            <p className="text-xs text-slate-500 font-medium mt-2">
              {agreed ? 'You can proceed directly to book your detail.' : 'Click above to accept policies before submitting booking.'}
            </p>
          </div>

        </motion.div>

      </div>
    </section>
  );
};
