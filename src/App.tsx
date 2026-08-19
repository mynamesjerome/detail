import React, { useState, useEffect } from 'react';
import { VehicleType, BookingServiceType } from './types';
import { SERVICE_PACKAGES, ADD_ON_SERVICES } from './data/content';
import { LOCATION_LANDING_PAGES, SERVICE_LANDING_PAGES } from './data/landingPages';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ServicePackages } from './components/ServicePackages';
import { AddOnsGrid } from './components/AddOnsGrid';
import { MaintenanceProgram } from './components/MaintenanceProgram';
import { ReviewsMarquee } from './components/ReviewsMarquee';
import { ServiceAreaSection } from './components/ServiceAreaSection';
import { FAQSection } from './components/FAQSection';
import { BeforeAfterGallery } from './components/BeforeAfterGallery';
import { BookingSection } from './components/BookingSection';
import { Footer } from './components/Footer';
import { LandingPageModal } from './components/LandingPageModal';
import { scrollToSection, getRouteByPath } from './utils/navigation';

export default function App() {
  const [vehicleType, setVehicleType] = useState<VehicleType>('sedan');
  const [serviceType, setServiceType] = useState<BookingServiceType>('standard');
  const [selectedPackageId, setSelectedPackageId] = useState<string>('deluxe-detail');
  const [selectedMaintenanceId, setSelectedMaintenanceId] = useState<string>('biweekly');
  const [selectedAddOnIds, setSelectedAddOnIds] = useState<string[]>([]);
  const [policyAgreed, setPolicyAgreed] = useState<boolean>(false);

  // High-Intent SEO Landing Pages modal state
  const [activeLocationSlug, setActiveLocationSlug] = useState<string | null>(null);
  const [activeServiceSlug, setActiveServiceSlug] = useState<string | null>(null);

  // Check URL pathname for deep-linked location or specialty service
  const parsePath = (path: string) => {
    if (path.startsWith('/locations/')) {
      const slug = path.replace('/locations/', '').replace(/\/$/, '');
      if (LOCATION_LANDING_PAGES[slug]) {
        setActiveLocationSlug(slug);
        setActiveServiceSlug(null);
        document.title = `${LOCATION_LANDING_PAGES[slug].headline} | Gavin's Mobile Car Detailing`;
        return true;
      }
    } else if (path.startsWith('/services/')) {
      const slug = path.replace('/services/', '').replace(/\/$/, '');
      if (SERVICE_LANDING_PAGES[slug]) {
        setActiveServiceSlug(slug);
        setActiveLocationSlug(null);
        document.title = `${SERVICE_LANDING_PAGES[slug].headline} | Gavin's Mobile Car Detailing`;
        return true;
      }
    }
    return false;
  };

  // Handle initial page load deep-linking and browser back/forward navigation
  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname;
      const isLanding = parsePath(path);
      if (!isLanding) {
        setActiveLocationSlug(null);
        setActiveServiceSlug(null);
        document.title = "Gavin's Mobile Car Detailing | Premier Mobile Detailing Austin, TX";
        const route = getRouteByPath(path);
        if (route.id !== 'hero') {
          scrollToSection(route.id, false, 500);
        } else {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }
    };

    window.addEventListener('popstate', handlePopState);

    // Initial load check
    const path = window.location.pathname;
    const isLanding = parsePath(path);
    if (!isLanding) {
      const initialRoute = getRouteByPath(path);
      if (initialRoute.id !== 'hero') {
        const timer = setTimeout(() => {
          scrollToSection(initialRoute.id, false, 800);
        }, 150);
        return () => {
          clearTimeout(timer);
          window.removeEventListener('popstate', handlePopState);
        };
      }
    }

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  const handleOpenLocation = (slug: string) => {
    if (LOCATION_LANDING_PAGES[slug]) {
      setActiveLocationSlug(slug);
      setActiveServiceSlug(null);
      window.history.pushState(null, '', `/locations/${slug}`);
      document.title = `${LOCATION_LANDING_PAGES[slug].headline} | Gavin's Mobile Car Detailing`;
    }
  };

  const handleOpenService = (slug: string) => {
    if (SERVICE_LANDING_PAGES[slug]) {
      setActiveServiceSlug(slug);
      setActiveLocationSlug(null);
      window.history.pushState(null, '', `/services/${slug}`);
      document.title = `${SERVICE_LANDING_PAGES[slug].headline} | Gavin's Mobile Car Detailing`;
    }
  };

  const handleCloseLandingModal = () => {
    setActiveLocationSlug(null);
    setActiveServiceSlug(null);
    window.history.pushState(null, '', '/');
    document.title = "Gavin's Mobile Car Detailing | Premier Mobile Detailing Austin, TX";
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
        <ServiceAreaSection 
          onBookClick={() => scrollToSection('booking')} 
          onSelectLocation={handleOpenLocation}
        />

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

        {/* High-Intent SEO FAQ Accordion Section (bg-slate-950) Below Booking Form */}
        <FAQSection onBookClick={() => scrollToSection('booking')} />

        {/* Smooth Gradient Transition: FAQ Section (bg-slate-950) -> Footer (bg-slate-950) */}
        <div className="h-12 bg-slate-950" />
      </main>

      {/* Footer with SEO Suburb and Specialty Links */}
      <Footer 
        onSelectLocation={handleOpenLocation} 
        onSelectService={handleOpenService} 
      />

      {/* High-Intent SEO Landing Page Modal */}
      <LandingPageModal
        isOpen={!!activeLocationSlug || !!activeServiceSlug}
        locationData={activeLocationSlug ? LOCATION_LANDING_PAGES[activeLocationSlug] || null : null}
        serviceData={activeServiceSlug ? SERVICE_LANDING_PAGES[activeServiceSlug] || null : null}
        onClose={handleCloseLandingModal}
        onBookNow={() => {
          handleCloseLandingModal();
          scrollToSection('booking');
        }}
      />
    </div>
  );
}

