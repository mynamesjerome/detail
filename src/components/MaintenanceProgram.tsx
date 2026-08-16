import React from 'react';
import { VehicleType } from '../types';
import { MAINTENANCE_TIERS, MAINTENANCE_FEATURES, MAINTENANCE_TERMS } from '../data/content';
import { RefreshCw, CheckCircle2, AlertCircle, ShieldCheck, CalendarCheck, Crown, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';

interface MaintenanceProgramProps {
  vehicleType: VehicleType;
  onSelectMaintenance: (tierId: string) => void;
}

export const MaintenanceProgram: React.FC<MaintenanceProgramProps> = ({
  vehicleType,
  onSelectMaintenance
}) => {
  return (
    <section id="maintenance" className="py-24 sm:py-28 scroll-mt-20 sm:scroll-mt-24 bg-slate-950 text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Golden VIP Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="text-center max-w-3xl mx-auto mb-14"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-amber-950/90 via-yellow-950/80 to-amber-950/90 border border-amber-500/50 text-amber-300 text-xs font-bold uppercase tracking-wider mb-4 shadow-lg shadow-amber-900/20">
            <Crown className="w-4 h-4 text-amber-400 fill-amber-400/30" />
            <span>Exclusive VIP Membership</span>
            <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
          </div>
          
          <div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight animate-gold-shimmer">
              Maintenance Detail Program
            </h2>
          </div>

          <p className="mt-4 text-base sm:text-lg text-slate-300 font-normal leading-relaxed">
            Keep your vehicle in permanent showroom condition. Dedicated recurring VIP maintenance available to clients following an initial Full or Deluxe detail.
          </p>
        </motion.div>

        {/* Frequency Tier Cards */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 mb-14 items-stretch">
          {MAINTENANCE_TIERS.map((tier, idx) => {
            const price = vehicleType === 'sedan' ? tier.sedanPrice : tier.suvPrice;
            const isBestValue = tier.id === 'biweekly';

            return (
              <motion.div
                key={tier.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.5, delay: idx * 0.12 }}
                className={`rounded-3xl p-7 sm:p-8 flex flex-col justify-between transition-all duration-300 group relative ${
                  isBestValue
                    ? 'bg-gradient-to-b from-amber-950/60 via-slate-900 to-slate-900 border-2 border-amber-400 shadow-2xl shadow-amber-500/20 lg:-translate-y-2'
                    : 'bg-slate-900/90 border border-amber-500/20 hover:border-amber-500/60 hover:bg-slate-900 shadow-xl'
                }`}
              >
                {/* Best Value Ribbon */}
                {isBestValue && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500 text-slate-950 px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest shadow-md flex items-center gap-1 shrink-0 z-20">
                    <Sparkles className="w-3 h-3 fill-slate-950" />
                    <span>MOST POPULAR • BEST VALUE</span>
                  </div>
                )}

                {/* Corner accent glow */}
                <div className="absolute top-0 right-0 w-28 h-28 bg-amber-500/5 rounded-bl-full pointer-events-none group-hover:bg-amber-500/10 transition-colors" />

                <div>
                  <div className="flex items-center justify-between mb-4 pt-1">
                    <span className={`text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full border flex items-center gap-1.5 ${
                      isBestValue
                        ? 'text-amber-300 bg-amber-950/90 border-amber-400/80'
                        : 'text-amber-300 bg-amber-950/80 border-amber-500/40'
                    }`}>
                      <RefreshCw className="w-3 h-3 text-amber-400 animate-spin-slow" />
                      {tier.frequency}
                    </span>
                    <CalendarCheck className="w-5 h-5 text-amber-400/80 group-hover:text-amber-400 transition-colors" />
                  </div>

                  <p className="text-xs text-slate-300 mb-6 font-medium leading-relaxed">
                    {tier.subtitle}
                  </p>

                  <div className="flex items-baseline gap-1.5 mb-2">
                    <span className="text-4xl sm:text-5xl font-black text-amber-300">${price}</span>
                    <span className="text-xs text-slate-400 font-medium">
                      / visit ({vehicleType === 'sedan' ? 'Sedan' : 'SUV/Truck'})
                    </span>
                  </div>

                  {isBestValue && (
                    <div className="mb-6">
                      <span className="inline-block text-[11px] font-semibold text-emerald-400 bg-emerald-950/80 border border-emerald-500/40 px-2.5 py-0.5 rounded-md">
                        ✨ Lowest price per wash & maximum protection retention
                      </span>
                    </div>
                  )}

                  {!isBestValue && <div className="mb-6 h-5" />}
                </div>

                <button
                  type="button"
                  onClick={() => onSelectMaintenance(tier.id)}
                  className={`w-full py-4 px-4 rounded-2xl font-black text-xs uppercase tracking-wider transition-all cursor-pointer shadow-md active:scale-[0.98] ${
                    isBestValue
                      ? 'text-slate-950 bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-400 hover:from-amber-200 hover:to-yellow-300 shadow-amber-500/30'
                      : 'text-slate-950 bg-amber-400/90 hover:bg-amber-300'
                  }`}
                >
                  Join {tier.frequency} Plan
                </button>
              </motion.div>
            );
          })}
        </div>

        {/* Included Features Grid & Terms Box */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.05 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid lg:grid-cols-12 gap-8 items-start"
        >
          
          {/* Included Features (7 cols) */}
          <div className="lg:col-span-7 bg-slate-900/90 rounded-3xl p-7 sm:p-8 border border-slate-800 shadow-xl">
            <h3 className="text-lg font-bold text-white mb-5 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-amber-400 shrink-0" />
              <span>Features Included in Every Maintenance Visit:</span>
            </h3>

            <div className="grid sm:grid-cols-2 gap-3.5">
              {MAINTENANCE_FEATURES.map((feat, fIdx) => (
                <div key={fIdx} className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span className="text-xs text-slate-200 font-medium leading-normal">{feat}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Program Terms Box (5 cols) */}
          <div className="lg:col-span-5 bg-amber-950/30 rounded-3xl p-7 sm:p-8 border border-amber-500/40 backdrop-blur-sm shadow-xl">
            <h3 className="text-base font-bold text-amber-300 mb-4 flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-amber-400 shrink-0" />
              <span>Program Terms & Prerequisites</span>
            </h3>

            <ul className="space-y-3.5 text-xs text-slate-300 leading-relaxed font-normal">
              {MAINTENANCE_TERMS.map((term, tIdx) => (
                <li key={tIdx} className="flex items-start gap-2.5">
                  <span className="font-bold text-amber-400 shrink-0">{tIdx + 1}.</span>
                  <span className="font-medium text-slate-200">{term}</span>
                </li>
              ))}
            </ul>
          </div>

        </motion.div>

      </div>
    </section>
  );
};
