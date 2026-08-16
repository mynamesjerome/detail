import React from 'react';
import { AddOnService } from '../types';
import { Sparkles, ShieldAlert, Droplets, Dog, Flame, Disc, Plus, Check } from 'lucide-react';
import { motion } from 'motion/react';

interface AddOnsGridProps {
  addOns: AddOnService[];
  selectedAddOnIds: string[];
  onToggleAddOn: (id: string) => void;
}

const ICON_MAP: Record<string, React.ReactNode> = {
  Sparkles: <Sparkles className="w-5 h-5 text-amber-400" />,
  ShieldAlert: <ShieldAlert className="w-5 h-5 text-blue-400" />,
  Droplets: <Droplets className="w-5 h-5 text-cyan-400" />,
  Dog: <Dog className="w-5 h-5 text-amber-400" />,
  Flame: <Flame className="w-5 h-5 text-orange-400" />,
  Disc: <Disc className="w-5 h-5 text-indigo-400" />
};

export const AddOnsGrid: React.FC<AddOnsGridProps> = ({
  addOns,
  selectedAddOnIds,
  onToggleAddOn
}) => {
  return (
    <section id="add-ons" className="py-20 scroll-mt-20 sm:scroll-mt-24 bg-slate-950 text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="text-center max-w-3xl mx-auto mb-14"
        >
          <span className="text-xs font-extrabold uppercase tracking-widest text-blue-400 bg-blue-950/80 px-4 py-1.5 rounded-full border border-blue-800/80">
            Custom Enhancements
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mt-3">
            Add-On Services
          </h2>
          <p className="mt-3 text-base sm:text-lg text-slate-400 font-normal">
            Select specialized enhancements and targeted treatments to include in your customized detail package.
          </p>
        </motion.div>

        {/* Grid of Add-On Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {addOns.map((addon, index) => {
            const isSelected = selectedAddOnIds.includes(addon.id);

            return (
              <motion.div
                key={addon.id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                className={`group relative rounded-3xl border transition-all duration-300 p-6 sm:p-7 flex flex-col justify-between ${
                  isSelected
                    ? 'bg-gradient-to-b from-blue-950/70 via-slate-900 to-slate-900 border-blue-500 shadow-xl shadow-blue-950/40 ring-2 ring-blue-500/30'
                    : 'bg-slate-900/90 border-slate-800 hover:border-slate-700 shadow-lg hover:shadow-xl hover:bg-slate-900'
                }`}
              >
                <div>
                  {/* Top Row: Icon + Price Badge */}
                  <div className="flex items-center justify-between gap-3 mb-5">
                    <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800 shadow-inner">
                      {ICON_MAP[addon.iconName] || <Sparkles className="w-5 h-5 text-blue-400" />}
                    </div>

                    <span className="text-xs sm:text-sm font-black text-blue-300 bg-blue-950/90 border border-blue-800/90 px-3.5 py-1.5 rounded-full shrink-0 shadow-sm">
                      {addon.priceText}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors mb-3">
                    {addon.name}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-slate-300 font-normal leading-relaxed mb-6">
                    {addon.description}
                  </p>
                </div>

                {/* Bottom Selection Button */}
                <button
                  type="button"
                  onClick={() => onToggleAddOn(addon.id)}
                  className={`w-full py-3.5 px-4 rounded-2xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/30'
                      : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 hover:text-white'
                  }`}
                >
                  {isSelected ? (
                    <>
                      <Check className="w-4 h-4 stroke-[3] text-white" />
                      <span>Included in Quote</span>
                    </>
                  ) : (
                    <>
                      <Plus className="w-4 h-4" />
                      <span>Add to Detail Quote</span>
                    </>
                  )}
                </button>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
