import React, { useState } from 'react';
import { VehicleType, BookingServiceType } from './types';
import { SERVICE_PACKAGES, ADD_ON_SERVICES } from './data/content';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ServicePackages } from './components/ServicePackages';
import { AddOnsGrid } from './components/AddOnsGrid';
import { MaintenanceProgram } from './components/MaintenanceProgram';
import { ReviewsMarquee } from './components/ReviewsMarquee';
import { ServiceAreaSection } from './components/ServiceAreaSection';
import { BeforeAfterGallery } from './components/BeforeAfterGallery';
import { BookingSection } from './components/BookingSection';
import { Footer } from './components/Footer';
import { animateScrollTo } from './utils/scroll';

export default function App() {
  const [vehicleType, setVehicleType] = useState<VehicleType>('sedan');
  const [serviceType, setServiceType] = useState<BookingServiceType>('standard');
  const [selectedPackageId, setSelectedPackageId] = useState<string>('deluxe-detail');
  const [selectedMaintenanceId, setSelectedMaintenanceId] = useState<string>('biweekly');
  const [selectedAddOnIds, setSelectedAddOnIds] = useState<string[]>([]);
  const [policyAgreed, setPolicyAgreed] = useState<boolean>(false);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const headerOffset = 75;
      const elementPosition = el.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = Math.max(0, elementPosition - headerOffset);

      animateScrollTo(offsetPosition, 850);
    }
  };

  const handleSelectPackage = (packageId: string) => {
    setServiceType('standard');
    setSelectedPackageId(packageId);
    scrollToSection('booking');
  };

  const handleToggleAddOn = (addOnId: string) => {
    setSelectedAddOnIds((prev) =>
      prev.includes(addOnId) ? prev.filter((id) => id !== addOnId) : [...prev, addOnId]
    );
  };

  const handleSelectMaintenance = (tierId: string) => {
    setServiceType('maintenance');
    setSelectedMaintenanceId(tierId);
    scrollToSection('booking');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans antialiased selection:bg-blue-600 selection:text-white">
      {/* Sticky Navigation Header */}
      <Navbar onBookClick={() => scrollToSection('booking')} />

      {/* Main Page Layout with Smooth Shifting Gradient Section Transitions */}
      <main>
        {/* Dark GTA Vibe Hero Section */}
        <Hero
          onExploreClick={() => scrollToSection('services')}
          onBookClick={() => scrollToSection('booking')}
        />

        {/* Smooth Gradient Transition: Dark Hero -> White Service Packages */}
        <div className="h-24 bg-gradient-to-b from-slate-950 via-slate-800/80 via-slate-200/90 to-white" />

        {/* 4 Interactive Service Packages with Sedan vs SUV Toggle (White Background) */}
        <ServicePackages
          packages={SERVICE_PACKAGES}
          vehicleType={vehicleType}
          onVehicleTypeChange={setVehicleType}
          onSelectPackage={handleSelectPackage}
          selectedPackageId={selectedPackageId}
        />

        {/* Smooth Gradient Transition: White Service Packages -> Dark Add-Ons */}
        <div className="h-24 bg-gradient-to-b from-white via-slate-200/90 via-slate-800/80 to-slate-950" />

        {/* Interactive Add-On Services Grid with Interactive Before/After Sliders */}
        <AddOnsGrid
          addOns={ADD_ON_SERVICES}
          selectedAddOnIds={selectedAddOnIds}
          onToggleAddOn={handleToggleAddOn}
        />

        {/* Interactive Before & After Gavin's Detail Difference Showcase */}
        <BeforeAfterGallery />

        {/* Maintenance Detail Program Membership (bg-slate-950) */}
        <MaintenanceProgram
          vehicleType={vehicleType}
          onSelectMaintenance={handleSelectMaintenance}
        />

        {/* Infinite Scroll Reviews Marquee (bg-slate-950) */}
        <ReviewsMarquee />

        {/* Smooth Gradient Transition: Reviews Marquee (bg-slate-950) -> Service Area Section (bg-slate-950) */}
        <div className="h-12 bg-gradient-to-b from-slate-950 to-slate-950" />

        {/* 30-Mile Mobile Service Area & Zip Code Radius Checker (bg-slate-950) */}
        <ServiceAreaSection onBookClick={() => scrollToSection('booking')} />

        {/* Smooth Gradient Transition: Service Area (bg-slate-950) -> Booking Section (bg-slate-900) */}
        <div className="h-16 bg-gradient-to-b from-slate-950 to-slate-900" />

        {/* Booking & Instant Quote Calculator Section (bg-slate-900) */}
        <BookingSection
          vehicleType={vehicleType}
          onVehicleTypeChange={setVehicleType}
          serviceType={serviceType}
          onServiceTypeChange={setServiceType}
          selectedPackageId={selectedPackageId}
          onPackageChange={setSelectedPackageId}
          selectedMaintenanceId={selectedMaintenanceId}
          onMaintenanceChange={setSelectedMaintenanceId}
          selectedAddOnIds={selectedAddOnIds}
          onToggleAddOn={handleToggleAddOn}
          policyAgreed={policyAgreed}
          onTogglePolicyAgree={setPolicyAgreed}
        />

        {/* Smooth Gradient Transition: Booking Section (bg-slate-900) -> Footer (bg-slate-950) */}
        <div className="h-20 bg-gradient-to-b from-slate-900 to-slate-950" />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

