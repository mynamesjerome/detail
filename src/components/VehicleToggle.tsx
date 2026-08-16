import React from 'react';
import { VehicleType } from '../types';
import { Car, Truck } from 'lucide-react';

interface VehicleToggleProps {
  vehicleType: VehicleType;
  onChange: (type: VehicleType) => void;
}

export const VehicleToggle: React.FC<VehicleToggleProps> = ({ vehicleType, onChange }) => {
  return (
    <div className="flex flex-col items-center justify-center mb-10">
      <div className="inline-flex items-center gap-1.5 p-1.5 bg-slate-200/70 backdrop-blur-md rounded-2xl border border-slate-300/60 shadow-inner">
        <button
          type="button"
          onClick={() => onChange('sedan')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 cursor-pointer ${
            vehicleType === 'sedan'
              ? 'bg-white text-blue-600 shadow-md shadow-slate-200'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Car className="w-4 h-4" />
          <span>Sedan / Coupe</span>
        </button>

        <button
          type="button"
          onClick={() => onChange('suv')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 cursor-pointer ${
            vehicleType === 'suv'
              ? 'bg-white text-blue-600 shadow-md shadow-slate-200'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Truck className="w-4 h-4" />
          <span>SUV / Truck / Van</span>
        </button>
      </div>

      <p className="text-xs text-slate-500 font-medium mt-2">
        Showing pricing for: <span className="font-bold text-slate-800">{vehicleType === 'sedan' ? 'Sedans & Coupes' : 'SUVs, Trucks & Minivans'}</span>
      </p>
    </div>
  );
};
