import React from 'react';
import { ServicePackage, VehicleType } from '../types';
import { VehicleToggle } from './VehicleToggle';
import { Check, Sparkles, ArrowRight, Zap } from 'lucide-react';
import { motion } from 'motion/react';

interface ServicePackagesProps {
  packages: ServicePackage[];
  vehicleType: VehicleType;
  onVehicleTypeChange: (type: VehicleType) => void;
  onSelectPackage: (packageId: string) => void;
  selectedPackageId?: string;
}

export const ServicePackages: React.FC<ServicePackagesProps> = ({
  packages,
  vehicleType,
  onVehicleTypeChange,
  onSelectPackage,
  selectedPackageId
}) => {
  return (
    <section id="services" className="py-20 scroll-mt-20 sm:scroll-mt-24 bg-gradient-to-b from-slate-50 via-white to-slate-100/80 text-slate-900 relative overflow-hidden">
      {/* Laser Gradient Accent Line Top & Bottom */}
      <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-blue-500/30 to-transparent" />
      <div className="absolute bottom-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-slate-300 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold uppercase tracking-wider mb-3 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            <span>Precision Service Packages</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-950 tracking-tight">
            Crafted for Every Vehicle's Needs
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 font-normal">
            Choose your package below. Select your vehicle type to see instant, transparent pricing with no hidden fees.
          </p>
        </motion.div>

        {/* Interactive Vehicle Toggle Switch */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <VehicleToggle vehicleType={vehicleType} onChange={onVehicleTypeChange} />
        </motion.div>

        {/* 4 Service Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          {packages.map((pkg, index) => {
            const price = vehicleType === 'sedan' ? pkg.sedanPrice : pkg.suvPrice;
            const isFeatured = pkg.isPopular;
            const isSelected = selectedPackageId === pkg.id;

            return (
              <motion.div
                key={pkg.id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`relative flex flex-col justify-between rounded-3xl p-6 sm:p-7 transition-all duration-300 ${
                  isFeatured
                    ? 'bg-slate-950 text-white shadow-2xl shadow-blue-900/30 ring-2 ring-blue-500 hover:shadow-blue-500/20 hover:scale-[1.02]'
                    : 'bg-slate-50/80 text-slate-900 border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-blue-300 hover:scale-[1.01]'
                }`}
              >
                {/* Popular Badge */}
                {isFeatured && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs font-bold tracking-wider uppercase shadow-md flex items-center gap-1">
                    <Zap className="w-3 h-3 text-amber-300 fill-amber-300" />
                    <span>{pkg.tag}</span>
                  </div>
                )}

                <div>
                  {/* Tag for non-featured */}
                  {!isFeatured && (
                    <span className="inline-block px-3 py-1 rounded-full bg-blue-100/70 text-blue-800 text-xs font-bold mb-3">
                      {pkg.tag}
                    </span>
                  )}

                  {/* Package Title */}
                  <h3 className={`text-xl font-bold tracking-tight mb-2 ${isFeatured ? 'text-white' : 'text-slate-950'}`}>
                    {pkg.name}
                  </h3>

                  <p className={`text-xs font-normal mb-6 leading-relaxed ${isFeatured ? 'text-slate-300' : 'text-slate-600'}`}>
                    {pkg.description}
                  </p>

                  {/* Pricing Display */}
                  <div className={`flex items-baseline gap-1 mb-6 pb-6 border-b ${isFeatured ? 'border-slate-800' : 'border-slate-200'}`}>
                    <span className="text-4xl font-black tracking-tight">${price}</span>
                    <span className={`text-xs font-medium ${isFeatured ? 'text-slate-400' : 'text-slate-500'}`}>
                      / {vehicleType === 'sedan' ? 'Sedan' : 'SUV/Truck'}
                    </span>
                  </div>

                  {/* Features List */}
                  <div className="space-y-2.5 mb-8">
                    <p className={`text-xs font-bold uppercase tracking-wider mb-3 ${isFeatured ? 'text-blue-400' : 'text-slate-500'}`}>
                      What's Included:
                    </p>
                    {pkg.features.map((feature, fIdx) => (
                      <div key={fIdx} className="flex items-start gap-2.5">
                        <div className={`mt-0.5 p-0.5 rounded-full shrink-0 ${isFeatured ? 'bg-blue-500/20 text-blue-400' : 'bg-blue-100 text-blue-600'}`}>
                          <Check className="w-3.5 h-3.5 stroke-[3]" />
                        </div>
                        <span className={`text-xs font-normal leading-snug ${isFeatured ? 'text-slate-200' : 'text-slate-700'}`}>
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Selection Action Button */}
                <button
                  type="button"
                  onClick={() => onSelectPackage(pkg.id)}
                  className={`w-full py-3.5 px-4 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 transition-all duration-200 cursor-pointer ${
                    isFeatured
                      ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-md shadow-blue-600/30 hover:shadow-lg'
                      : isSelected
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'bg-white hover:bg-blue-600 hover:text-white text-slate-800 border border-slate-300 shadow-xs'
                  }`}
                >
                  <span>{isSelected ? 'Selected Package' : 'Select Package'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
