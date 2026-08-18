import React, { useState } from 'react';
import { VehicleType, BookingServiceType, BookingFormData } from '../types';
import { SERVICE_PACKAGES, ADD_ON_SERVICES, MAINTENANCE_TIERS } from '../data/content';
import { PolicyCaptchaModal } from './PolicyCaptchaModal';
import {
  Calendar,
  Clock,
  MapPin,
  Car,
  User,
  Phone,
  Mail,
  CheckCircle2,
  Send,
  AlertCircle,
  Sparkles,
  MessageSquare,
  ShieldCheck,
  Lock,
  Crown,
  RefreshCw,
  Layers,
  Loader2
} from 'lucide-react';
import { motion } from 'motion/react';

interface BookingSectionProps {
  vehicleType: VehicleType;
  onVehicleTypeChange: (type: VehicleType) => void;
  serviceType: BookingServiceType;
  onServiceTypeChange: (type: BookingServiceType) => void;
  selectedPackageId: string;
  onPackageChange: (pkgId: string) => void;
  selectedMaintenanceId: string;
  onMaintenanceChange: (tierId: string) => void;
  selectedAddOnIds: string[];
  onToggleAddOn: (addOnId: string) => void;
  policyAgreed: boolean;
  onTogglePolicyAgree: (agreed: boolean) => void;
}

export interface VehicleBookingItem {
  id: string;
  vehicleType: VehicleType;
  makeModel: string;
  packageId: string;
  maintenanceTierId: string;
  maintenanceInitialPackageId: string; // 'deluxe-detail' or 'basic-detail'
  hasHadInitialDetail: boolean; // if returning VIP client or new booking
  addOnIds: string[];
}

export const BookingSection: React.FC<BookingSectionProps> = ({
  vehicleType,
  onVehicleTypeChange,
  serviceType,
  onServiceTypeChange,
  selectedPackageId,
  onPackageChange,
  selectedMaintenanceId,
  onMaintenanceChange,
  selectedAddOnIds,
  onToggleAddOn,
  policyAgreed,
  onTogglePolicyAgree
}) => {
  // Multi-vehicle array state
  const [vehicles, setVehicles] = useState<VehicleBookingItem[]>([
    {
      id: 'v-1',
      vehicleType,
      makeModel: '',
      packageId: selectedPackageId || 'deluxe-detail',
      maintenanceTierId: selectedMaintenanceId || 'biweekly',
      maintenanceInitialPackageId: 'deluxe-detail',
      hasHadInitialDetail: false,
      addOnIds: selectedAddOnIds || []
    }
  ]);

  const [formData, setFormData] = useState<Omit<BookingFormData, 'vehicleType' | 'vehicleMakeModel' | 'selectedPackageId' | 'selectedMaintenanceId' | 'selectedAddOnIds'>>({
    fullName: '',
    phone: '',
    email: '',
    serviceType,
    preferredDate: '',
    preferredTime: 'Morning (8am - 12pm)',
    austinAddress: '',
    notes: '',
    policyAgreed
  });

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [isCaptchaOpen, setIsCaptchaOpen] = useState(false);

  const WEB3FORMS_ACCESS_KEY = '006f9973-ea8a-4c27-8a44-094a2ac474eb';

  // Sync initial single vehicle selection if changed from hero/cards/maintenance
  const selectedAddOnIdsKey = selectedAddOnIds.slice().sort().join(',');
  React.useEffect(() => {
    setVehicles((prev) => {
      if (prev.length === 0) return prev;
      const v0 = prev[0];
      const targetPkg = selectedPackageId || v0.packageId;
      const targetTier = selectedMaintenanceId || v0.maintenanceTierId;
      const currentAddOnsKey = v0.addOnIds.slice().sort().join(',');

      if (
        v0.vehicleType === vehicleType &&
        v0.packageId === targetPkg &&
        v0.maintenanceTierId === targetTier &&
        currentAddOnsKey === selectedAddOnIdsKey
      ) {
        return prev;
      }

      const updated = [...prev];
      updated[0] = {
        ...v0,
        vehicleType,
        packageId: targetPkg,
        maintenanceTierId: targetTier,
        addOnIds: selectedAddOnIds
      };
      return updated;
    });
  }, [vehicleType, selectedPackageId, selectedMaintenanceId, selectedAddOnIdsKey, selectedAddOnIds]);

  // Vehicle management helpers
  const addVehicle = () => {
    setVehicles((prev) => [
      ...prev,
      {
        id: `v-${Date.now()}`,
        vehicleType: 'sedan',
        makeModel: '',
        packageId: 'deluxe-detail',
        maintenanceTierId: 'biweekly',
        maintenanceInitialPackageId: 'deluxe-detail',
        hasHadInitialDetail: false,
        addOnIds: []
      }
    ]);
  };

  const removeVehicle = (id: string) => {
    if (vehicles.length <= 1) return;
    setVehicles((prev) => prev.filter((v) => v.id !== id));
  };

  const updateVehicle = (id: string, updates: Partial<VehicleBookingItem>) => {
    setVehicles((prev) =>
      prev.map((v) => {
        if (v.id === id) {
          return { ...v, ...updates };
        }
        return v;
      })
    );
  };

  const toggleVehicleAddOn = (vehicleId: string, addOnId: string) => {
    setVehicles((prev) =>
      prev.map((v) => {
        if (v.id === vehicleId) {
          const has = v.addOnIds.includes(addOnId);
          const updatedAddOns = has
            ? v.addOnIds.filter((a) => a !== addOnId)
            : [...v.addOnIds, addOnId];
          return { ...v, addOnIds: updatedAddOns };
        }
        return v;
      })
    );
  };

  // Live Price Calculation with Multi-Vehicle Discount
  const isMultiVehicle = vehicles.length > 1;
  const isMaintenanceMode = serviceType === 'maintenance';
  const multiVehicleDiscountRate = isMultiVehicle ? 0.10 : 0; // 10% discount on multi-car packages

  const vehicleBreakdowns = vehicles.map((v) => {
    if (isMaintenanceMode) {
      const tier = MAINTENANCE_TIERS.find((t) => t.id === v.maintenanceTierId) || MAINTENANCE_TIERS[0];
      const initialPkg = SERVICE_PACKAGES.find((p) => p.id === v.maintenanceInitialPackageId) || SERVICE_PACKAGES[3]; // Deluxe Detail
      
      // 1st visit price (initial qualifying deep detail unless user is already a qualifying returning member)
      const baseInitialPrice = v.vehicleType === 'sedan' ? initialPkg.sedanPrice : initialPkg.suvPrice;
      const initialDiscount = Math.round(baseInitialPrice * multiVehicleDiscountRate);
      const finalInitialPrice = baseInitialPrice - initialDiscount;

      // Recurring per-visit maintenance price
      const baseTierPrice = v.vehicleType === 'sedan' ? tier.sedanPrice : tier.suvPrice;
      const tierDiscount = Math.round(baseTierPrice * multiVehicleDiscountRate);
      const finalTierPrice = baseTierPrice - tierDiscount;

      const addOnsTotal = v.addOnIds.reduce((sum, id) => {
        const item = ADD_ON_SERVICES.find((a) => a.id === id);
        return sum + (item ? item.basePrice : 0);
      }, 0);

      // Total billed for 1st visit vs ongoing recurring visits
      const firstVisitTotal = (v.hasHadInitialDetail ? finalTierPrice : finalInitialPrice) + addOnsTotal;
      const recurringVisitTotal = finalTierPrice + addOnsTotal;

      return {
        vehicle: v,
        isMaintenance: true,
        tier,
        initialPkg,
        hasHadInitialDetail: v.hasHadInitialDetail,
        basePrice: v.hasHadInitialDetail ? baseTierPrice : baseInitialPrice,
        discount: v.hasHadInitialDetail ? tierDiscount : initialDiscount,
        finalPrice: v.hasHadInitialDetail ? finalTierPrice : finalInitialPrice,
        recurringTierPrice: finalTierPrice,
        recurringTierBase: baseTierPrice,
        addOnsTotal,
        firstVisitTotal,
        recurringVisitTotal,
        subtotal: firstVisitTotal
      };
    } else {
      const pkg = SERVICE_PACKAGES.find((p) => p.id === v.packageId) || SERVICE_PACKAGES[3];
      const basePkgPrice = v.vehicleType === 'sedan' ? pkg.sedanPrice : pkg.suvPrice;
      const pkgDiscount = Math.round(basePkgPrice * multiVehicleDiscountRate);
      const finalPkgPrice = basePkgPrice - pkgDiscount;

      const addOnsTotal = v.addOnIds.reduce((sum, id) => {
        const item = ADD_ON_SERVICES.find((a) => a.id === id);
        return sum + (item ? item.basePrice : 0);
      }, 0);

      return {
        vehicle: v,
        isMaintenance: false,
        tier: null,
        initialPkg: null,
        hasHadInitialDetail: false,
        basePrice: basePkgPrice,
        discount: pkgDiscount,
        finalPrice: finalPkgPrice,
        recurringTierPrice: 0,
        recurringTierBase: 0,
        addOnsTotal,
        firstVisitTotal: finalPkgPrice + addOnsTotal,
        recurringVisitTotal: finalPkgPrice + addOnsTotal,
        subtotal: finalPkgPrice + addOnsTotal
      };
    }
  });

  const grandTotal = vehicleBreakdowns.reduce((sum, b) => sum + b.firstVisitTotal, 0);
  const recurringGrandTotal = vehicleBreakdowns.reduce((sum, b) => sum + b.recurringVisitTotal, 0);
  const totalDiscount = vehicleBreakdowns.reduce((sum, b) => sum + b.discount, 0);

  const todayStr = new Date().toISOString().split('T')[0];

  const scrollToMissingField = (elementId: string) => {
    setTimeout(() => {
      const el = document.getElementById(elementId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        try {
          el.focus();
        } catch {
          // ignore if non-focusable
        }
      }
    }, 60);
  };

  // SMS & Email format for multi-car & maintenance
  const vehicleSummaryText = vehicleBreakdowns
    .map((b, i) => {
      const addOnNames = b.vehicle.addOnIds
        .map((id) => ADD_ON_SERVICES.find((a) => a.id === id)?.name)
        .filter(Boolean)
        .join(', ');
      
      if (b.isMaintenance) {
        if (b.hasHadInitialDetail) {
          return `Car ${i + 1}: ${b.vehicle.makeModel} (${b.vehicle.vehicleType.toUpperCase()}) - VIP Maintenance (${b.tier?.frequency})${addOnNames ? ` + Add-ons: [${addOnNames}]` : ''} - $${b.firstVisitTotal}/visit (Returning Client)`;
        } else {
          return `Car ${i + 1}: ${b.vehicle.makeModel} (${b.vehicle.vehicleType.toUpperCase()}) - 1st Visit: ${b.initialPkg?.name} ($${b.firstVisitTotal})${addOnNames ? ` + Add-ons: [${addOnNames}]` : ''} -> Ongoing VIP Rate: $${b.recurringVisitTotal}/visit (${b.tier?.frequency})`;
        }
      } else {
        return `Car ${i + 1}: ${b.vehicle.makeModel} (${b.vehicle.vehicleType.toUpperCase()}) - ${b.pkg?.name}${addOnNames ? ` + Add-ons: [${addOnNames}]` : ''} ($${b.subtotal})`;
      }
    })
    .join('\n');

  const planTypeLabel = isMaintenanceMode ? 'VIP Maintenance Membership Booking' : 'Mobile Detail Booking';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!formData.fullName.trim()) {
      setErrorMsg('Please enter your full name.');
      scrollToMissingField('input-fullname');
      return;
    }
    if (!formData.phone.trim()) {
      setErrorMsg('Please enter a contact phone number.');
      scrollToMissingField('input-phone');
      return;
    }
    
    // Check all vehicles have Make/Model
    for (let i = 0; i < vehicles.length; i++) {
      if (!vehicles[i].makeModel.trim()) {
        setErrorMsg(`Please enter Make, Model & Year for Vehicle #${i + 1}.`);
        scrollToMissingField(`input-vehicle-${i}`);
        return;
      }
    }

    if (!formData.austinAddress.trim()) {
      setErrorMsg('Please enter the exact street address for the detail.');
      scrollToMissingField('input-address');
      return;
    }
    if (!formData.policyAgreed) {
      setErrorMsg('Please complete the Captcha Policy Verification ($10 belongings fee & terms).');
      setIsCaptchaOpen(true);
      scrollToMissingField('captcha-verify-btn');
      return;
    }

    setIsSubmitting(true);

    try {
      const payload = {
        access_key: WEB3FORMS_ACCESS_KEY,
        subject: `New Detailing Request from ${formData.fullName} - Gavin's Car Detailing`,
        from_name: "Gavin's Car Detailing Web Booking",
        name: formData.fullName,
        phone: formData.phone,
        email: formData.email.trim() || 'Not Provided',
        service_type: planTypeLabel,
        service_address: formData.austinAddress,
        preferred_schedule: `${formData.preferredDate || 'ASAP / First Available'} (${formData.preferredTime})`,
        vehicles_count: `${vehicles.length} Vehicle${vehicles.length > 1 ? 's' : ''}`,
        vehicles_breakdown: vehicleSummaryText,
        first_visit_total: `$${grandTotal}`,
        recurring_rate: isMaintenanceMode ? `$${recurringGrandTotal}/visit` : 'N/A',
        multi_vehicle_discount: totalDiscount > 0 ? `$${totalDiscount} discount applied` : 'None',
        special_notes: formData.notes.trim() || 'None',
        policy_verified: 'Yes (Confirmed $10 personal belongings policy & service terms)',
        botcheck: false,
        message: [
          `NEW BOOKING REQUEST`,
          `=================================`,
          `Client: ${formData.fullName}`,
          `Phone: ${formData.phone}`,
          `Email: ${formData.email.trim() || 'N/A'}`,
          `Service Address: ${formData.austinAddress}`,
          `Schedule: ${formData.preferredDate || 'ASAP'} (${formData.preferredTime})`,
          `Service Type: ${planTypeLabel}`,
          ``,
          `VEHICLES & SERVICES (${vehicles.length} Vehicle${vehicles.length > 1 ? 's' : ''}):`,
          vehicleSummaryText,
          ``,
          `ESTIMATE SUMMARY:`,
          `• 1st Visit Total: $${grandTotal}`,
          isMaintenanceMode ? `• Recurring VIP Rate: $${recurringGrandTotal}/visit` : '',
          totalDiscount > 0 ? `• Multi-Car Discount Applied: Saved $${totalDiscount}` : '',
          ``,
          `Special Notes: ${formData.notes.trim() || 'None'}`,
          `Policy Status: Captcha Verified ($10 belongings fee & terms accepted)`
        ]
          .filter(Boolean)
          .join('\n')
      };

      // Try local Cloudflare Worker /submit first, fallback to direct Web3Forms
      let response: Response;
      let result: any = null;

      try {
        response = await fetch('/submit', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
          },
          body: JSON.stringify(payload)
        });

        // If /submit returned JSON from worker
        const contentType = response.headers.get('content-type') || '';
        if (contentType.includes('application/json')) {
          result = await response.json().catch(() => null);
        } else {
          // If returned HTML (SPA fallback), do direct Web3Forms
          throw new Error('Not an API response');
        }
      } catch {
        // Fallback to direct Web3Forms API
        response = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
          },
          body: JSON.stringify(payload)
        });
        result = await response.json().catch(() => null);
      }

      if (response.ok && result?.success) {
        setSubmitted(true);
      } else {
        const errorDetail = result?.message || 'Submission was not accepted by the mail server.';
        setErrorMsg(`${errorDetail} You can also book immediately by calling or texting Gavin directly at (512) 589-6977.`);
        scrollToMissingField('booking-form-error');
      }
    } catch (error) {
      console.error('Web3Forms submission error:', error);
      setErrorMsg('Network error while sending request. You can also reach Gavin directly at (512) 589-6977.');
      scrollToMissingField('booking-form-error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const smsBodyText = encodeURIComponent(
    `Hi Gavin! I'd like to book a ${planTypeLabel} (${vehicles.length} vehicle${vehicles.length > 1 ? 's' : ''}):\n\nName: ${formData.fullName}\nPhone: ${formData.phone}\n${vehicleSummaryText}\n\n1st Visit Total: $${grandTotal}${isMaintenanceMode ? `\nOngoing Recurring Rate: $${recurringGrandTotal}/visit` : ''}${totalDiscount > 0 ? ` (Includes $${totalDiscount} Multi-Car Savings)` : ''}\nAddress: ${formData.austinAddress}\nDate/Time: ${formData.preferredDate || 'Asap'} (${formData.preferredTime})`
  );

  const emailSubject = encodeURIComponent(`${planTypeLabel} Request (${vehicles.length} Vehicle${vehicles.length > 1 ? 's' : ''}) - ${formData.fullName}`);
  const emailBodyText = encodeURIComponent(
    `Hi Gavin,\n\nI would like to book a ${planTypeLabel} for ${vehicles.length} vehicle${vehicles.length > 1 ? 's' : ''}:\n\nName: ${formData.fullName}\nPhone: ${formData.phone}\nEmail: ${formData.email || 'N/A'}\n\nVEHICLE & SERVICE DETAILS:\n${vehicleSummaryText}\n\n1ST VISIT TOTAL: $${grandTotal}${isMaintenanceMode ? `\nONGOING RECURRING RATE: $${recurringGrandTotal}/visit` : ''}${totalDiscount > 0 ? ` (Multi-Car Discount Saved: $${totalDiscount})` : ''}\n\nService Address: ${formData.austinAddress}\nDate/Time: ${formData.preferredDate || 'First available'} (${formData.preferredTime})\nNotes: ${formData.notes || 'None'}`
  );

  return (
    <section id="booking" className="py-20 scroll-mt-20 sm:scroll-mt-24 bg-slate-900 text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Captcha Verification Modal */}
        <PolicyCaptchaModal
          isOpen={isCaptchaOpen}
          onClose={() => setIsCaptchaOpen(false)}
          onConfirm={() => {
            onTogglePolicyAgree(true);
            setFormData((prev) => ({ ...prev, policyAgreed: true }));
          }}
        />

        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="text-center max-w-3xl mx-auto mb-14"
        >
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-blue-950 border border-blue-800 text-blue-400 text-xs font-bold uppercase tracking-wider mb-3">
            <Calendar className="w-3.5 h-3.5 text-blue-400" />
            <span>Schedule Mobile Detail</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
            Book Your Detail Session
          </h2>
          <p className="mt-3 text-base sm:text-lg text-slate-300 font-normal">
            Fill out your vehicle details below for an instant quote & direct appointment confirmation across Greater Austin.
          </p>
        </motion.div>

        {/* Main Grid: Booking Form (7 cols) + Quote Summary Card (5 cols) */}
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          
          {/* Booking Form (7 Cols) */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="lg:col-span-7 bg-slate-800/90 border border-slate-700/80 rounded-3xl p-6 sm:p-8 shadow-2xl"
          >
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-8 space-y-6"
              >
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/40">
                  <CheckCircle2 className="w-10 h-10" />
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">
                    Booking Request Sent!
                  </h3>
                  <p className="text-sm text-slate-300 leading-relaxed max-w-md mx-auto">
                    Thank you, <span className="font-bold text-white">{formData.fullName}</span>. Gavin has received your detail request for <span className="font-bold text-white">{vehicles.length} vehicle{vehicles.length > 1 ? 's' : ''}</span>.
                  </p>
                </div>

                {/* Instant Action Row */}
                <div className="p-5 rounded-2xl bg-slate-900 border border-slate-700 text-left space-y-3">
                  <p className="text-xs font-bold text-blue-400 uppercase tracking-wider">
                    Booking Request Summary ({vehicles.length} Vehicle{vehicles.length > 1 ? 's' : ''}):
                  </p>
                  <div className="text-xs text-slate-300 space-y-2">
                    {vehicleBreakdowns.map((b, idx) => (
                      <div key={b.vehicle.id} className="pb-2 border-b border-slate-800 last:border-none last:pb-0">
                        <p className="font-bold text-white">Car #{idx + 1}: {b.vehicle.makeModel}</p>
                        {b.isMaintenance ? (
                          <div className="text-slate-300 space-y-0.5 mt-0.5">
                            <p className="text-amber-300">
                              • 1st Visit: {b.hasHadInitialDetail ? 'VIP Maintenance Rate (Returning Client)' : `${b.initialPkg?.name}`} (${b.firstVisitTotal})
                            </p>
                            <p className="text-slate-400">
                              • Ongoing Rate: VIP {b.tier?.frequency} (${b.recurringVisitTotal}/visit)
                            </p>
                          </div>
                        ) : (
                          <p className="text-slate-400">• Package: {b.pkg?.name} ({b.vehicle.vehicleType.toUpperCase()}) - ${b.finalPrice}</p>
                        )}
                        {b.vehicle.addOnIds.length > 0 && (
                          <p className="text-slate-400">• Add-ons: {b.vehicle.addOnIds.map(id => ADD_ON_SERVICES.find(a => a.id === id)?.name).filter(Boolean).join(', ')}</p>
                        )}
                      </div>
                    ))}
                    <div className="pt-2 border-t border-slate-800 flex justify-between items-center text-sm font-bold">
                      <span className="text-slate-400">Service Address: {formData.austinAddress}</span>
                      <div className="text-right">
                        <span className="text-emerald-400">${grandTotal} 1st visit</span>
                        {isMaintenanceMode && (
                          <span className="text-amber-300 text-xs block font-normal">(${recurringGrandTotal}/visit after)</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-center flex-wrap">
                  <a
                    href={`sms:5125896977?body=${smsBodyText}`}
                    className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm shadow-md transition-all"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Send Text Message</span>
                  </a>

                  <a
                    href={`mailto:gavinscardetailing@gmail.com?subject=${emailSubject}&body=${emailBodyText}`}
                    className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs sm:text-sm shadow-md transition-all"
                  >
                    <Mail className="w-4 h-4" />
                    <span>Send Email Inquiry</span>
                  </a>

                  <a
                    href="tel:5125896977"
                    className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs sm:text-sm shadow-md transition-all"
                  >
                    <Phone className="w-4 h-4" />
                    <span>Call (512) 589-6977</span>
                  </a>
                </div>

                <button
                  onClick={() => setSubmitted(false)}
                  className="text-xs text-slate-400 hover:text-white underline font-medium pt-2"
                >
                  Edit Booking Form
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-6">
                
                {errorMsg && (
                  <div id="booking-form-error" className="p-4 rounded-2xl bg-red-900/40 border border-red-500/60 text-red-200 text-xs font-semibold flex items-center gap-2 animate-shake">
                    <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
                    <span>{errorMsg}</span>
                  </div>
                )}

                {/* Contact Info Group */}
                <div className="space-y-4">
                  <h3 className="text-sm font-bold text-blue-400 uppercase tracking-wider">
                    1. Contact Information
                  </h3>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                        Full Name *
                      </label>
                      <div className="relative">
                        <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <input
                          id="input-fullname"
                          type="text"
                          placeholder="John Doe"
                          value={formData.fullName}
                          onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                          className={`w-full bg-slate-900 border rounded-xl pl-10 pr-4 py-3 text-sm text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 ${
                            errorMsg.includes('full name') ? 'border-red-500 ring-1 ring-red-500' : 'border-slate-700'
                          }`}
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                        Phone Number *
                      </label>
                      <div className="relative">
                        <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <input
                          id="input-phone"
                          type="tel"
                          placeholder="(512) 589-6977"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className={`w-full bg-slate-900 border rounded-xl pl-10 pr-4 py-3 text-sm text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 ${
                            errorMsg.includes('phone') ? 'border-red-500 ring-1 ring-red-500' : 'border-slate-700'
                          }`}
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Email Address (Optional)
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        inputMode="email"
                        placeholder="john@example.com (Optional)"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-10 pr-4 py-3 text-sm text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                </div>

                {/* Service Type Switcher (Standard Package vs VIP Maintenance Plan) */}
                <div className="space-y-3 pt-4 border-t border-slate-700/80">
                  <div className="flex items-center justify-between">
                    <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">
                      Select Booking Type:
                    </label>
                    {isMaintenanceMode && (
                      <span className="text-[11px] font-bold text-amber-400 bg-amber-950/80 border border-amber-500/40 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                        <Crown className="w-3 h-3 text-amber-400" />
                        VIP Maintenance Active
                      </span>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-2 p-1.5 bg-slate-950 rounded-2xl border border-slate-800">
                    <button
                      type="button"
                      onClick={() => onServiceTypeChange('standard')}
                      className={`py-3 px-4 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer ${
                        !isMaintenanceMode
                          ? 'bg-blue-600 text-white shadow-md'
                          : 'text-slate-400 hover:text-white hover:bg-slate-900'
                      }`}
                    >
                      <Sparkles className="w-4 h-4" />
                      <span>Standard Detail</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => onServiceTypeChange('maintenance')}
                      className={`py-3 px-4 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer ${
                        isMaintenanceMode
                          ? 'bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-950 shadow-md font-black'
                          : 'text-slate-400 hover:text-white hover:bg-slate-900'
                      }`}
                    >
                      <Crown className="w-4 h-4" />
                      <span>VIP Maintenance Plan</span>
                    </button>
                  </div>

                  {isMaintenanceMode && (
                    <div className="p-3 rounded-xl bg-amber-950/40 border border-amber-500/40 text-amber-200 text-xs flex items-start gap-2.5">
                      <Crown className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                      <p className="leading-relaxed">
                        <strong className="text-white">VIP Maintenance Program:</strong> Recurring wash intervals to maintain spotless gloss & ceramic protection. Multi-vehicle discounts also apply!
                      </p>
                    </div>
                  )}
                </div>

                {/* Vehicle(s) & Service Location Group */}
                <div className="space-y-6 pt-4 border-t border-slate-700/80">
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <div>
                      <h3 className="text-sm font-bold text-blue-400 uppercase tracking-wider flex items-center gap-2">
                        <Car className="w-4 h-4" />
                        <span>2. Vehicle(s) & {isMaintenanceMode ? 'Maintenance Plan' : 'Package'} Selection</span>
                      </h3>
                      <p className="text-xs text-slate-400 mt-0.5">
                        Add multiple cars for family or fleet details (10% multi-vehicle discount applies!)
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={addVehicle}
                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold text-blue-300 bg-blue-950/80 hover:bg-blue-900 border border-blue-700/80 rounded-xl transition-all shadow-sm cursor-pointer"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                      <span>+ Add Another Vehicle</span>
                    </button>
                  </div>

                  {/* Multi-vehicle discount banner */}
                  {isMultiVehicle && (
                    <div className="p-3.5 rounded-2xl bg-gradient-to-r from-blue-950 via-slate-900 to-indigo-950 border border-blue-500/40 text-blue-200 text-xs flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-amber-400 shrink-0 animate-spin-slow" />
                        <div>
                          <span className="font-extrabold text-white block">Multi-Car Discount Active!</span>
                          <span className="text-slate-300 text-[11px]">
                            10% OFF packages applied to all {vehicles.length} vehicles. Saved ${totalDiscount}!
                          </span>
                        </div>
                      </div>
                      <span className="px-2.5 py-1 bg-amber-400 text-slate-950 font-black text-[10px] rounded-full uppercase tracking-wider shrink-0">
                        10% OFF
                      </span>
                    </div>
                  )}

                  {/* Loop over Vehicles */}
                  <div className="space-y-6">
                    {vehicles.map((item, index) => {
                      const breakdown = vehicleBreakdowns[index] || vehicleBreakdowns[0];

                      return (
                        <div
                          key={item.id}
                          className="p-5 rounded-2xl bg-slate-900/90 border border-slate-700/90 space-y-4 shadow-md relative"
                        >
                          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                            <div className="flex items-center gap-2">
                              <span className="w-6 h-6 rounded-full bg-blue-600 text-white font-extrabold text-xs flex items-center justify-center">
                                {index + 1}
                              </span>
                              <span className="text-sm font-bold text-white">
                                {item.makeModel ? item.makeModel : `Vehicle #${index + 1}`}
                              </span>
                            </div>

                            {vehicles.length > 1 && (
                              <button
                                type="button"
                                onClick={() => removeVehicle(item.id)}
                                className="text-xs text-red-400 hover:text-red-300 font-semibold px-2 py-1 rounded-lg bg-red-950/40 border border-red-900/60 transition-colors cursor-pointer"
                              >
                                Remove
                              </button>
                            )}
                          </div>

                          {/* Type & Make/Model */}
                          <div className="grid sm:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                                Body Type *
                              </label>
                              <select
                                value={item.vehicleType}
                                onChange={(e) => updateVehicle(item.id, { vehicleType: e.target.value as VehicleType })}
                                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500 cursor-pointer"
                              >
                                <option value="sedan">Sedan / Coupe</option>
                                <option value="suv">SUV / Truck / Minivan</option>
                              </select>
                            </div>

                            <div>
                              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                                Make, Model & Year *
                              </label>
                              <div className="relative">
                                <Car className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                                <input
                                  id={`input-vehicle-${index}`}
                                  type="text"
                                  placeholder={index === 0 ? "e.g. 2023 Tesla Model Y" : "e.g. 2021 BMW M3"}
                                  value={item.makeModel}
                                  onChange={(e) => updateVehicle(item.id, { makeModel: e.target.value })}
                                  className={`w-full bg-slate-950 border rounded-xl pl-9 pr-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500 ${
                                    errorMsg.includes(`Vehicle #${index + 1}`) ? 'border-red-500 ring-1 ring-red-500' : 'border-slate-700'
                                  }`}
                                />
                              </div>
                            </div>
                          </div>

                          {/* Package or Maintenance Selection for this specific vehicle */}
                          {isMaintenanceMode ? (
                            <div className="space-y-4">
                              {/* Initial Qualifying Detail Selection */}
                              <div className="p-3.5 rounded-2xl bg-amber-950/30 border border-amber-500/40 space-y-3">
                                <div className="flex items-start justify-between gap-2">
                                  <div>
                                    <label className="block text-xs font-bold text-amber-300 flex items-center gap-1.5">
                                      <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                                      <span>Step 1: First Visit Qualifying Detail *</span>
                                    </label>
                                    <p className="text-[11px] text-slate-300 mt-0.5">
                                      VIP maintenance rates require an initial deep reset (Deluxe or Full Detail) to bring the vehicle to baseline protection.
                                    </p>
                                  </div>
                                </div>

                                <div className="grid sm:grid-cols-2 gap-2">
                                  {[
                                    SERVICE_PACKAGES.find(p => p.id === 'deluxe-detail') || SERVICE_PACKAGES[3],
                                    SERVICE_PACKAGES.find(p => p.id === 'basic-detail') || SERVICE_PACKAGES[0]
                                  ].map((pkg) => {
                                    const isSelected = item.maintenanceInitialPackageId === pkg.id && !item.hasHadInitialDetail;
                                    const rawPrice = item.vehicleType === 'sedan' ? pkg.sedanPrice : pkg.suvPrice;
                                    const discPrice = rawPrice - Math.round(rawPrice * multiVehicleDiscountRate);

                                    return (
                                      <button
                                        key={pkg.id}
                                        type="button"
                                        onClick={() => updateVehicle(item.id, { 
                                          maintenanceInitialPackageId: pkg.id,
                                          hasHadInitialDetail: false 
                                        })}
                                        className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer flex items-center justify-between ${
                                          isSelected
                                            ? 'bg-amber-500/20 border-amber-400 text-white shadow-sm ring-1 ring-amber-400/50'
                                            : 'bg-slate-950/80 border-slate-800 text-slate-400 hover:border-slate-700'
                                        }`}
                                      >
                                        <div>
                                          <div className="flex items-center gap-1">
                                            <p className="text-xs font-bold text-white">{pkg.name}</p>
                                            {pkg.id === 'deluxe-detail' && (
                                              <span className="text-[9px] bg-amber-400 text-slate-950 font-black px-1 rounded">
                                                RECOMMENDED
                                              </span>
                                            )}
                                          </div>
                                          <p className="text-[10px] text-slate-400 line-clamp-1">{pkg.tag}</p>
                                        </div>
                                        <div className="text-right shrink-0 ml-2">
                                          <p className="text-xs font-black text-amber-300">${discPrice}</p>
                                          <p className="text-[9px] text-slate-500">1st visit</p>
                                        </div>
                                      </button>
                                    );
                                  })}
                                </div>

                                {/* Option for returning VIP clients who already had a recent full detail */}
                                <div className="pt-2 border-t border-amber-500/20 flex items-center justify-between">
                                  <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-300">
                                    <input
                                      type="checkbox"
                                      checked={item.hasHadInitialDetail}
                                      onChange={(e) => updateVehicle(item.id, { hasHadInitialDetail: e.target.checked })}
                                      className="rounded border-slate-700 bg-slate-950 text-amber-500 focus:ring-amber-400 cursor-pointer"
                                    />
                                    <span>Already had a Full/Deluxe detail with Gavin in the last 4 weeks?</span>
                                  </label>
                                  {item.hasHadInitialDetail && (
                                    <span className="text-[10px] font-bold text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-500/40 shrink-0">
                                      Maintenance Rate Starts 1st Visit
                                    </span>
                                  )}
                                </div>
                              </div>

                              {/* Recurring Maintenance Frequency Tier */}
                              <div>
                                <label className="block text-xs font-semibold text-amber-300 mb-1.5 flex items-center gap-1.5">
                                  <Crown className="w-3.5 h-3.5 text-amber-400" />
                                  <span>Step 2: Ongoing Maintenance Rate (Visits After Initial Detail) *</span>
                                </label>
                                <div className="grid sm:grid-cols-3 gap-2">
                                  {MAINTENANCE_TIERS.map((tier) => {
                                    const isSelected = tier.id === item.maintenanceTierId;
                                    const rawPrice = item.vehicleType === 'sedan' ? tier.sedanPrice : tier.suvPrice;
                                    const discPrice = rawPrice - Math.round(rawPrice * multiVehicleDiscountRate);

                                    return (
                                      <button
                                        key={tier.id}
                                        type="button"
                                        onClick={() => updateVehicle(item.id, { maintenanceTierId: tier.id })}
                                        className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                                          isSelected
                                            ? 'bg-amber-950/60 border-amber-400 text-white shadow-sm ring-1 ring-amber-400/40'
                                            : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700'
                                        }`}
                                      >
                                        <div>
                                          <div className="flex items-center justify-between mb-1">
                                            <p className="text-xs font-bold text-white flex items-center gap-1">
                                              {tier.frequency}
                                            </p>
                                            {tier.id === 'biweekly' && (
                                              <span className="text-[9px] bg-amber-400 text-slate-950 font-black px-1.5 py-0.5 rounded">
                                                POPULAR
                                              </span>
                                            )}
                                          </div>
                                          <p className="text-[10px] text-slate-400 line-clamp-1">{tier.subtitle}</p>
                                        </div>
                                        <div className="mt-2 pt-2 border-t border-slate-800/80 flex items-baseline justify-between">
                                          <span className="text-[10px] text-slate-400">after 1st visit:</span>
                                          <div className="text-right">
                                            <span className="text-xs font-black text-amber-300">${discPrice}</span>
                                            {isMultiVehicle && (
                                              <span className="text-[9px] text-slate-500 line-through ml-1">${rawPrice}</span>
                                            )}
                                          </div>
                                        </div>
                                      </button>
                                    );
                                  })}
                                </div>
                              </div>
                            </div>
                          ) : (
                            <div>
                              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                                Service Package for Car #{index + 1} *
                              </label>
                              <div className="grid sm:grid-cols-2 gap-2">
                                {SERVICE_PACKAGES.map((pkg) => {
                                  const isSelected = pkg.id === item.packageId;
                                  const rawPrice = item.vehicleType === 'sedan' ? pkg.sedanPrice : pkg.suvPrice;
                                  const discPrice = rawPrice - Math.round(rawPrice * multiVehicleDiscountRate);

                                  return (
                                    <button
                                      key={pkg.id}
                                      type="button"
                                      onClick={() => updateVehicle(item.id, { packageId: pkg.id })}
                                      className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer flex items-center justify-between ${
                                        isSelected
                                          ? 'bg-blue-600/25 border-blue-500 text-white shadow-sm'
                                          : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700'
                                      }`}
                                    >
                                      <div>
                                        <p className="text-xs font-bold text-white">{pkg.name}</p>
                                        <p className="text-[10px] text-slate-400 line-clamp-1">{pkg.tag}</p>
                                      </div>
                                      <div className="text-right shrink-0 ml-2">
                                        <p className="text-xs font-black text-white">${discPrice}</p>
                                        {isMultiVehicle && (
                                          <p className="text-[9px] text-slate-500 line-through">${rawPrice}</p>
                                        )}
                                      </div>
                                    </button>
                                  );
                                })}
                              </div>
                            </div>
                          )}

                          {/* Custom Add-ons for this specific vehicle */}
                          <div>
                            <label className="block text-xs font-semibold text-slate-400 mb-1.5">
                              Add-Ons for Car #{index + 1} (Optional)
                            </label>
                            <div className="flex flex-wrap gap-1.5">
                              {ADD_ON_SERVICES.map((addon) => {
                                const isAdded = item.addOnIds.includes(addon.id);
                                return (
                                  <button
                                    key={addon.id}
                                    type="button"
                                    onClick={() => toggleVehicleAddOn(item.id, addon.id)}
                                    className={`px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer flex items-center gap-1.5 ${
                                      isAdded
                                        ? 'bg-blue-600 text-white font-bold'
                                        : 'bg-slate-950 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
                                    }`}
                                  >
                                    <span>{addon.name}</span>
                                    <span className={isAdded ? 'text-blue-100 font-bold' : 'text-emerald-400'}>
                                      +${addon.basePrice}
                                    </span>
                                  </button>
                                );
                              })}
                            </div>
                          </div>

                          {/* Subtotal line for car */}
                          <div className="pt-2 flex items-center justify-between text-xs text-slate-400 border-t border-slate-800/60">
                            <span>Car #{index + 1} Total {isMaintenanceMode ? '(1st Visit / Recurring)' : ''}:</span>
                            <div className="text-right">
                              <span className="font-bold text-emerald-400">
                                {isMaintenanceMode ? (
                                  <>
                                    <span>${breakdown.firstVisitTotal} 1st visit</span>
                                    <span className="text-slate-400 ml-1.5 text-[11px]">
                                      (${breakdown.recurringVisitTotal}/visit after)
                                    </span>
                                  </>
                                ) : (
                                  <span>${breakdown.subtotal}</span>
                                )}
                              </span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Service Location Input */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Exact Service Street Address & City *
                    </label>
                    <div className="relative">
                      <MapPin className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        id="input-address"
                        type="text"
                        placeholder="e.g. 1234 Main St, Austin, TX 78704 (or driveway location)"
                        value={formData.austinAddress}
                        onChange={(e) => setFormData({ ...formData, austinAddress: e.target.value })}
                        className={`w-full bg-slate-900 border rounded-xl pl-10 pr-4 py-3 text-sm text-white focus:outline-none focus:border-blue-500 ${
                          errorMsg.includes('street address') ? 'border-red-500 ring-1 ring-red-500' : 'border-slate-700'
                        }`}
                      />
                    </div>
                  </div>
                </div>

                {/* Date & Time Group */}
                <div className="space-y-4 pt-4 border-t border-slate-700/80">
                  <h3 className="text-sm font-bold text-blue-400 uppercase tracking-wider">
                    3. Preferred Schedule
                  </h3>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="min-w-0">
                      <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                        Preferred Date
                      </label>
                      <div className="relative w-full min-w-0">
                        <input
                          id="input-date"
                          type="date"
                          min={todayStr}
                          value={formData.preferredDate}
                          onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                          style={{ colorScheme: 'dark' }}
                          className="w-full min-w-0 max-w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-3 text-sm text-white focus:outline-none focus:border-blue-500 [color-scheme:dark] transition-colors"
                        />
                      </div>
                    </div>

                    <div className="min-w-0">
                      <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                        Preferred Arrival Time Slot
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        {[
                          '8:00 AM Morning',
                          '10:30 AM Mid-Morning',
                          '1:00 PM Early Afternoon',
                          '3:30 PM Late Afternoon',
                          'Flexible / First Available'
                        ].map((timeOption, idx) => {
                          const isSelected = formData.preferredTime === timeOption;
                          const isLast = idx === 4;
                          return (
                            <button
                              key={timeOption}
                              type="button"
                              onClick={() => setFormData({ ...formData, preferredTime: timeOption })}
                              className={`px-3 py-2.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer text-left ${
                                isLast ? 'col-span-2' : ''
                              } ${
                                isSelected
                                  ? 'bg-blue-600 text-white border-blue-500 shadow-md'
                                  : 'bg-slate-900 border-slate-700 text-slate-300 hover:border-slate-600'
                              }`}
                            >
                              {timeOption}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Notes & Captcha-style Policy Verification Trigger */}
                <div className="space-y-4 pt-4 border-t border-slate-700/80">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Special Requests / Vehicle Condition Notes
                    </label>
                    <textarea
                      rows={2}
                      placeholder="e.g. Heavy pet hair in back seat, or stain on driver seat"
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  {/* Captcha Verification Trigger Box */}
                  <div
                    id="captcha-verify-btn"
                    onClick={() => setIsCaptchaOpen(true)}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between group ${
                      formData.policyAgreed
                        ? 'bg-emerald-950/40 border-emerald-500/50 text-emerald-200'
                        : errorMsg.includes('Captcha')
                        ? 'bg-red-950/40 border-red-500 ring-1 ring-red-500 text-red-200'
                        : 'bg-slate-950 border-slate-700 text-slate-300 hover:border-blue-500'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      {formData.policyAgreed ? (
                        <ShieldCheck className="w-6 h-6 text-emerald-400 shrink-0" />
                      ) : (
                        <Lock className="w-6 h-6 text-blue-400 shrink-0 group-hover:scale-110 transition-transform" />
                      )}
                      <div>
                        <span className="text-xs sm:text-sm font-bold block">
                          {formData.policyAgreed
                            ? '✓ Service Policy Captcha Verified'
                            : 'Click Here: Verify Service Policy ($10 Belongings Fee)'}
                        </span>
                        <span className="text-[11px] text-slate-400 block">
                          {formData.policyAgreed
                            ? 'You verified the $10 uncleared belongings fee & inspection terms.'
                            : 'Requires quick 2-step Captcha verification popup to confirm terms.'}
                        </span>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsCaptchaOpen(true);
                      }}
                      className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
                        formData.policyAgreed
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                          : 'bg-blue-600 hover:bg-blue-500 text-white'
                      }`}
                    >
                      {formData.policyAgreed ? 'Verified' : 'Verify Policy'}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-4 px-6 rounded-2xl font-bold text-base text-white transition-all flex items-center justify-center gap-2 shadow-xl ${
                    isSubmitting
                      ? 'bg-blue-800 text-blue-200 cursor-not-allowed opacity-90'
                      : 'bg-blue-600 hover:bg-blue-500 shadow-blue-600/30 cursor-pointer active:scale-[0.99]'
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin text-blue-300" />
                      <span>Submitting Booking Request...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Request Booking & Lock Quote</span>
                    </>
                  )}
                </button>

              </form>
            )}
          </motion.div>

          {/* Quote Breakdown Card (5 Cols) */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="lg:col-span-5 bg-gradient-to-br from-slate-950 via-[#0A192F] to-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 text-white shadow-2xl space-y-6 sticky top-28"
          >
            <div className="flex items-center justify-between gap-2 border-b border-slate-800 pb-4">
              <div className="flex items-center gap-2 min-w-0">
                <Sparkles className="w-5 h-5 text-blue-400 shrink-0" />
                <h3 className="text-base sm:text-lg font-bold text-white truncate">Live Quote Estimate</h3>
              </div>
              <span className="text-xs font-bold uppercase tracking-wider text-blue-400 bg-blue-950 px-3 py-1 rounded-full border border-blue-800 whitespace-nowrap shrink-0">
                {vehicles.length} {vehicles.length === 1 ? 'Vehicle' : 'Vehicles'}
              </span>
            </div>

            {/* Breakdown per vehicle */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Vehicle Breakdown:
                </label>
                {isMaintenanceMode && (
                  <span className="text-[10px] font-bold text-amber-400 bg-amber-950 px-2 py-0.5 rounded border border-amber-500/40">
                    VIP Maintenance Plan
                  </span>
                )}
              </div>

              <div className="space-y-3">
                {vehicleBreakdowns.map((b, idx) => (
                  <div key={b.vehicle.id} className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2 text-xs">
                    <div className="flex items-center justify-between font-bold text-white">
                      <span>Car #{idx + 1}: {b.vehicle.makeModel || 'Unspecified'}</span>
                      <span className={b.isMaintenance ? "text-amber-400 font-extrabold" : "text-blue-400 font-extrabold"}>
                        ${b.firstVisitTotal}
                        {b.isMaintenance && <span className="text-[10px] text-slate-400 font-normal ml-1">(1st visit)</span>}
                      </span>
                    </div>

                    <div className="space-y-1.5 text-[11px] text-slate-300 pl-2 border-l border-slate-800">
                      {b.isMaintenance ? (
                        <>
                          <div className="flex justify-between">
                            <span className="text-amber-300 font-medium">
                              • 1st Visit: {b.hasHadInitialDetail ? 'VIP Maintenance Rate (Returning)' : `${b.initialPkg?.name}`}
                            </span>
                            <span className="font-semibold text-slate-200">
                              ${b.finalPrice}
                              {b.discount > 0 && <span className="text-emerald-400 ml-1">(-${b.discount})</span>}
                            </span>
                          </div>

                          <div className="flex justify-between text-slate-400 bg-amber-950/30 px-2 py-1 rounded border border-amber-500/20">
                            <span>• Ongoing Rate ({b.tier?.frequency}):</span>
                            <span className="font-bold text-amber-300">${b.recurringTierPrice}/visit</span>
                          </div>
                        </>
                      ) : (
                        <div className="flex justify-between">
                          <span className="text-slate-400">
                            • Package: {b.pkg?.name} ({b.vehicle.vehicleType.toUpperCase()})
                          </span>
                          <span className="font-semibold text-slate-200">
                            ${b.finalPrice}
                            {b.discount > 0 && <span className="text-emerald-400 ml-1">(-${b.discount})</span>}
                          </span>
                        </div>
                      )}

                      {b.vehicle.addOnIds.map((addOnId) => {
                        const addon = ADD_ON_SERVICES.find((a) => a.id === addOnId);
                        if (!addon) return null;
                        return (
                          <div key={addOnId} className="flex justify-between text-slate-400">
                            <span>+ {addon.name}</span>
                            <span className="text-emerald-400 font-medium">+${addon.basePrice}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Savings Callout if Multi-Vehicle */}
            {totalDiscount > 0 && (
              <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/40 text-emerald-300 text-xs flex items-center justify-between font-semibold">
                <span>Multi-Car Bundle Savings:</span>
                <span className="font-black text-emerald-400">-${totalDiscount}</span>
              </div>
            )}

            {/* Total Calculation Row */}
            <div className="pt-6 border-t border-slate-800 space-y-2">
              <div className="flex items-baseline justify-between">
                <div>
                  <span className="text-xs text-slate-400 font-medium block">
                    {isMaintenanceMode ? 'Total 1st Visit Total' : 'Total Estimated Quote'}
                  </span>
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-black text-white">${grandTotal}</span>
                    {isMaintenanceMode && <span className="text-xs text-slate-400">1st visit</span>}
                  </div>
                </div>
                <span className="text-[10px] text-slate-400 bg-slate-800/80 px-2.5 py-1 rounded-full">
                  No upfront deposit
                </span>
              </div>

              {isMaintenanceMode && (
                <div className="p-3 rounded-2xl bg-amber-950/50 border border-amber-500/40 flex items-center justify-between text-xs">
                  <div>
                    <span className="font-bold text-white block">Ongoing VIP Maintenance Rate</span>
                    <span className="text-slate-400 text-[11px]">Billed per visit after 1st detail</span>
                  </div>
                  <span className="text-lg font-black text-amber-300">${recurringGrandTotal} <span className="text-xs font-semibold text-slate-400">/ visit</span></span>
                </div>
              )}
            </div>

            {/* Call / Text Direct Contact Bar */}
            <div className="pt-4 border-t border-slate-800/80 space-y-2">
              <p className="text-xs text-slate-400 text-center">Prefer to call or text directly?</p>
              <div className="grid grid-cols-2 gap-2">
                <a
                  href="tel:5125896977"
                  className="py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-blue-400" />
                  <span>(512) 589-6977</span>
                </a>

                <a
                  href="sms:5125896977"
                  className="py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Text Gavin</span>
                </a>
              </div>
            </div>

          </motion.div>

        </div>

      </div>
    </section>
  );
};
