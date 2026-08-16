import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShieldCheck, AlertCircle, CheckSquare, Square, X, Lock } from 'lucide-react';

interface PolicyCaptchaModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export const PolicyCaptchaModal: React.FC<PolicyCaptchaModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
}) => {
  const [captchaChecked, setCaptchaChecked] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleVerify = () => {
    if (!captchaChecked) return;
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      onConfirm();
      onClose();
    }, 400);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div
        onClick={onClose}
        className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/85 backdrop-blur-md overflow-y-auto"
      >
        <motion.div
          onClick={(e) => e.stopPropagation()}
          initial={{ opacity: 0, scale: 0.9, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 10 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="relative w-full max-w-lg max-h-[88vh] overflow-y-auto bg-slate-900 border border-slate-800 rounded-2xl sm:rounded-3xl shadow-2xl text-white my-auto"
        >
          {/* Top Bar Accent */}
          <div className="h-1.5 bg-gradient-to-r from-blue-500 via-indigo-500 to-blue-400 sticky top-0 z-20" />

          {/* Close Button */}
          <button
            onClick={onClose}
            aria-label="Close verification popup"
            className="absolute top-3 right-3 p-2 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 bg-slate-900/80 transition-colors cursor-pointer z-30 flex items-center gap-1 text-xs font-bold"
          >
            <span className="hidden xs:inline text-[11px] text-slate-400">Close</span>
            <X className="w-5 h-5 text-slate-200" />
          </button>

          <div className="p-4 sm:p-7 pt-5">
            {/* Security Header Badge */}
            <div className="flex items-center gap-2.5 sm:gap-3 mb-4 sm:mb-6 pr-12">
              <div className="p-2.5 sm:p-3 rounded-2xl bg-blue-600/20 text-blue-400 border border-blue-500/30 shrink-0">
                <Lock className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <div>
                <span className="text-[10px] sm:text-xs font-bold text-blue-400 uppercase tracking-widest block">
                  SERVICE & VERIFICATION
                </span>
                <h3 className="text-base sm:text-xl font-extrabold text-white leading-tight">
                  Policy Verification
                </h3>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 mb-4 sm:mb-6 leading-relaxed">
              Please review and verify the following service terms before booking:
            </p>

            {/* Policy Rules Cards */}
            <div className="space-y-2.5 sm:space-y-3.5 mb-4 sm:mb-6">
              {/* $10 Belongings Fee Policy */}
              <div className="p-3 sm:p-4 rounded-2xl bg-amber-950/40 border border-amber-500/30 text-amber-200 flex items-start gap-2.5 sm:gap-3.5">
                <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400 shrink-0 mt-0.5" />
                <div className="text-xs sm:text-sm">
                  <span className="font-bold text-amber-300 block mb-0.5">
                    1. Belongings Clearance Policy ($10 Fee)
                  </span>
                  All personal belongings <strong className="text-white underline">MUST</strong> be cleared from the vehicle prior to arrival. If belongings are not removed, a <strong className="text-amber-300 underline">$10 clearance fee</strong> applies.
                </div>
              </div>

              {/* Condition Policy */}
              <div className="p-3 sm:p-4 rounded-2xl bg-slate-800/80 border border-slate-700 text-slate-300 flex items-start gap-2.5 sm:gap-3.5">
                <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400 shrink-0 mt-0.5" />
                <div className="text-xs sm:text-sm">
                  <span className="font-bold text-white block mb-0.5">
                    2. Inspection & Upcharges
                  </span>
                  Severe mud, excessive staining, or heavy pet hair are subject to additional upcharges following initial physical inspection.
                </div>
              </div>
            </div>

            {/* Captcha Box Widget */}
            <div className="p-3 sm:p-4 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between mb-4 sm:mb-6 hover:border-slate-700 transition-colors">
              <button
                type="button"
                onClick={() => setCaptchaChecked(!captchaChecked)}
                className="flex items-center gap-2.5 sm:gap-3 cursor-pointer text-left select-none group py-1"
              >
                {captchaChecked ? (
                  <CheckSquare className="w-6 h-6 sm:w-7 sm:h-7 text-emerald-400 shrink-0 transition-transform group-hover:scale-110" />
                ) : (
                  <Square className="w-6 h-6 sm:w-7 sm:h-7 text-slate-500 shrink-0 transition-transform group-hover:scale-110" />
                )}
                <span className={`text-xs sm:text-sm font-semibold transition-colors ${captchaChecked ? 'text-white' : 'text-slate-300'}`}>
                  I agree to the <strong className="text-amber-300">$10 belongings fee</strong> & inspection terms.
                </span>
              </button>

              <div className="flex flex-col items-center shrink-0 pl-2 border-l border-slate-800">
                <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500" />
                <span className="text-[8px] sm:text-[9px] text-slate-500 font-mono mt-0.5">VERIFIED</span>
              </div>
            </div>

            {/* Confirmation Button */}
            <button
              type="button"
              disabled={!captchaChecked || isSubmitting}
              onClick={handleVerify}
              className={`w-full py-3.5 sm:py-4 px-5 rounded-2xl font-extrabold text-sm sm:text-base transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer ${
                captchaChecked
                  ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/40 hover:shadow-blue-500/60'
                  : 'bg-slate-800 text-slate-500 cursor-not-allowed opacity-60'
              }`}
            >
              {isSubmitting ? (
                <span>Verifying...</span>
              ) : (
                <>
                  <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span>CONFIRM & VERIFY POLICY</span>
                </>
              )}
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
