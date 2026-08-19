export interface LocationLandingData {
  slug: string;
  name: string;
  subTitle: string;
  headline: string;
  zipCodes: string[];
  keyLandmarks: string[];
  description: string;
  localHighlights: {
    title: string;
    description: string;
  }[];
}

export interface ServiceLandingData {
  slug: string;
  name: string;
  badge: string;
  headline: string;
  priceStarting: number;
  duration: string;
  description: string;
  benefits: string[];
  processSteps: {
    step: string;
    title: string;
    description: string;
  }[];
}

export const LOCATION_LANDING_PAGES: Record<string, LocationLandingData> = {
  'westlake-hills': {
    slug: 'westlake-hills',
    name: 'Westlake Hills',
    subTitle: 'Premier Mobile Auto Detailing in Westlake Hills, TX',
    headline: 'Showroom Precision Mobile Detailing Delivered to Your Westlake Driveway',
    zipCodes: ['78746'],
    keyLandmarks: ['Westlake High School area', 'Rollingwood', 'Wild Basin', 'Eanes', 'Westlake Country Club'],
    description:
      "Gavin's Car Detailing provides luxury mobile auto detailing throughout Westlake Hills and the 78746 corridor. Whether caring for high-end luxury European SUVs, sports cars, or family road-trip vehicles, we deliver high-pressure pH-neutral foam washing, interior steam sanitization, and multi-month ceramic protection right to your home.",
    localHighlights: [
      {
        title: 'HOA & Driveway Friendly',
        description: 'Quiet, clean, zero-mess commercial equipment and eco-safe pH-neutral rinses safe for all Westlake luxury driveways.',
      },
      {
        title: 'Hard Water & Texas Sun Defense',
        description: 'Advanced SiO2 ceramic sealant protection against Austin mineral deposits, harsh UV rays, and tree sap.',
      },
      {
        title: 'Complete Mobile Convenience',
        description: 'We connect directly to your home spigot and outlet—no waiting in crowded waiting rooms or leaving your vehicle behind.',
      },
    ],
  },
  'steiner-ranch': {
    slug: 'steiner-ranch',
    name: 'Steiner Ranch',
    subTitle: 'Mobile Auto Detailing in Steiner Ranch, TX',
    headline: 'Premier Mobile Car Detailing & Ceramic Care in Steiner Ranch & UT Golf Club',
    zipCodes: ['78732'],
    keyLandmarks: ['UT Golf Club', 'Steiner Ranch Lake Club', 'John Simpson Park', 'Bella Mar', 'River Bend', 'Lake Austin'],
    description:
      "Gavin's Car Detailing delivers showroom-quality mobile auto detailing straight to your driveway in Steiner Ranch. We specialize in removing hill country dust, lakefront humidity residue, and road grime while applying multi-month ceramic paint protection and 220°F interior steam sanitization.",
    localHighlights: [
      {
        title: 'Hill Country Sun & UV Defense',
        description: 'High-grade ceramic sealants shield clear coats against relentless Hill Country UV rays and intense summer heat.',
      },
      {
        title: 'Lake & Golf Dust Removal',
        description: 'Chemical iron fallout and pH-neutral snow foam wash eliminate stubborn trail dirt and golf course grime without swirling paint.',
      },
      {
        title: 'Doorstep Convenience',
        description: 'We bring professional mobile detailing equipment right to your Steiner Ranch home, leaving your vehicles pristine.',
      },
    ],
  },
  'lakeway': {
    slug: 'lakeway',
    name: 'Lakeway & Lake Travis',
    subTitle: 'Mobile Auto Detailing in Lakeway, TX & Lake Travis',
    headline: 'Lakeway Mobile Car Wash, Steam Sanitation & Ceramic Coatings',
    zipCodes: ['78734', '78738'],
    keyLandmarks: ['Lake Travis', 'Lakeway Marina', 'The Hills', 'Flintrock Falls', 'Rough Hollow'],
    description:
      "Living near Lake Travis means vehicles frequently face lake road dust, boat ramp humidity, and harsh Central Texas sunlight. Gavin brings full-service mobile auto detailing directly to your garage or driveway in Lakeway, Flintrock, and The Hills.",
    localHighlights: [
      {
        title: 'Lake Grime & Bug Removal',
        description: 'Heavy chemical iron decontamination and bug removal to eliminate baked-on highway and lakefront insects safely.',
      },
      {
        title: 'UV Clear Coat Shielding',
        description: 'High-grade ceramic sealants formulated to withstand high-altitude hill country UV exposure and heat.',
      },
      {
        title: 'Interior Sand & Dirt Extraction',
        description: 'Deep carpet shampooing and heated steam extraction to remove lake sand, pet hair, and stubborn spill residue.',
      },
    ],
  },
  'bee-cave': {
    slug: 'bee-cave',
    name: 'Bee Cave & Spanish Oaks',
    subTitle: 'Mobile Auto Detailing in Bee Cave & Spanish Oaks, TX',
    headline: 'Precision Mobile Auto Care in Bee Cave, Spanish Oaks & Galleria',
    zipCodes: ['78738'],
    keyLandmarks: ['Hill Country Galleria', 'Spanish Oaks', 'Falconhead', 'Sweetwater', 'Homestead'],
    description:
      "Enjoy professional auto detailing without leaving your neighborhood. Gavin's Car Detailing travels directly to your residence in Bee Cave, Spanish Oaks, and Falconhead with premium steam cleaning and hand foam washing.",
    localHighlights: [
      {
        title: 'Exotic & Luxury Vehicle Care',
        description: 'Scratch-free two-bucket wash methods, ultra-plush microfiber towels, and delicate leather pH-balanced conditioners.',
      },
      {
        title: 'Hydrophobic Ceramic Shield',
        description: 'Keeps your vehicle repelling rainwater, dust, and road grime effortlessly between routine maintenance washes.',
      },
      {
        title: 'Flexible Home Scheduling',
        description: 'Available throughout the week with dedicated morning and evening mobile arrival slots tailored to your schedule.',
      },
    ],
  },
  'barton-creek': {
    slug: 'barton-creek',
    name: 'Barton Creek',
    subTitle: 'Luxury Mobile Detailing in Barton Creek & Lost Creek, TX',
    headline: 'White-Glove Mobile Detailing in Barton Creek & Southwest Austin',
    zipCodes: ['78735'],
    keyLandmarks: ['Omni Barton Creek Resort', 'Barton Creek Greenbelt', 'Calera', 'Lost Creek', 'The Foothills'],
    description:
      "From high-performance sports cars to spacious luxury family haulers, Gavin's Car Detailing delivers unmatched mobile precision to Barton Creek homes. We restore interior leather, steam-sanitize AC vents, and seal your paint with hydrophobic gloss.",
    localHighlights: [
      {
        title: 'Leather Restoration & UV Defense',
        description: 'Deep cleaning and conditioning to prevent cracked leather seats in the extreme Texas summer heat.',
      },
      {
        title: 'Mirror-Finish Hand Waxing',
        description: 'Multi-stage paint cleansing and ceramic sealant application for deep color depth and reflection.',
      },
      {
        title: 'Meticulous Wheel & Brake Care',
        description: 'Non-acidic wheel cleaner dissolves stubborn European brake dust from brake calipers and wheel barrels.',
      },
    ],
  },
  'davenport-ranch': {
    slug: 'davenport-ranch',
    name: 'Davenport Ranch & Rob Roy',
    subTitle: 'Mobile Detailing in Davenport Ranch & Loop 360 Corridor',
    headline: 'Luxury Mobile Auto Detailing in Davenport Ranch, Rob Roy & Seven Oaks',
    zipCodes: ['78746', '78730'],
    keyLandmarks: ['Austin Country Club', 'Pennybacker 360 Bridge', 'Rob Roy', 'Seven Oaks', 'St. Stephen’s', 'River Place'],
    description:
      "Delivering white-glove mobile automotive detailing to executive residences across Davenport Ranch, Rob Roy, and Seven Oaks along the Loop 360 corridor. We specialize in luxury European marques, sports cars, and premium daily drivers.",
    localHighlights: [
      {
        title: 'Boutique Exotic & Luxury Care',
        description: 'Gentle hand detailing for Porsche, Mercedes-Benz, BMW, Audi, Land Rover, and Tesla vehicles.',
      },
      {
        title: 'Paint Gloss & Hydrophobic Seal',
        description: 'SiO2 ceramic infusion creating slick, wet-look gloss while shielding paint against tree sap and hard water.',
      },
      {
        title: 'Convenient Home Driveway Service',
        description: 'Direct mobile detailing at your residence with minimal noise, clean setups, and zero travel surcharges.',
      },
    ],
  },
  'tarrytown': {
    slug: 'tarrytown',
    name: 'Tarrytown & Pemberton',
    subTitle: 'Mobile Detailing in Tarrytown & Central Austin, TX',
    headline: 'Boutique Mobile Auto Detailing in Tarrytown & Pemberton Heights',
    zipCodes: ['78703'],
    keyLandmarks: ['Tarrytown Park', 'Lake Austin Blvd', 'Deep Eddy', 'Enfield', 'West Austin Park', 'Pemberton Heights'],
    description:
      "Tarrytown residents trust Gavin's Car Detailing for meticulous, quiet, and discreet on-site automotive care. We deliver full steam interior restoration and brilliant gloss right in your driveway.",
    localHighlights: [
      {
        title: 'Compact Driveway Optimized',
        description: 'Low-profile mobile setup perfectly suited for historic and central Austin neighborhood driveways.',
      },
      {
        title: 'Streak-Free Glass & Trim Care',
        description: 'Surgical streak-free window cleaning and deep plastic trim conditioning to reverse gray sun oxidation.',
      },
      {
        title: 'Bi-Weekly Maintenance Option',
        description: 'Keep your car clean year-round with our discounted recurring maintenance detail subscription.',
      },
    ],
  },
  'avery-ranch': {
    slug: 'avery-ranch',
    name: 'Avery Ranch & Great Hills',
    subTitle: 'Mobile Detailing in Avery Ranch & NW Austin',
    headline: 'Premier Mobile Detailing in Avery Ranch, Great Hills & Arboretum',
    zipCodes: ['78717', '78759', '78729'],
    keyLandmarks: ['Avery Ranch Golf Club', 'The Arboretum', 'Great Hills Park', 'Lakeline', 'Domain area'],
    description:
      "Professional doorstep auto detailing for Avery Ranch and North Austin homeowners. Full interior shampooing, steam sterilization, and deep-gloss ceramic washes without the hassle of drop-offs.",
    localHighlights: [
      {
        title: 'Base Hub Advantage',
        description: 'Direct proximity to our 78759 operational hub means fast scheduling and flexible arrival windows.',
      },
      {
        title: 'Family & Commuter Resets',
        description: 'Deep carpet wet extraction, kid mess cleanup, and full cabin steam sterilization.',
      },
      {
        title: 'High-Gloss Hand Foam Washes',
        description: 'Scratch-free hand wash, wheel de-greasing, tire shine, and ceramic spray finish.',
      },
    ],
  },
  'round-rock': {
    slug: 'round-rock',
    name: 'Round Rock',
    subTitle: 'Mobile Auto Detailing in Round Rock, TX',
    headline: 'Top-Rated Mobile Car Detailing & Interior Steam Cleaning in Round Rock',
    zipCodes: ['78664', '78665', '78681'],
    keyLandmarks: ['Dell Diamond', 'Old Settlers Park', 'Teravista', 'Forest Creek', 'Downtown Round Rock', 'Mayfield Ranch'],
    description:
      "Serving families, daily commuters, and car enthusiasts across Round Rock. We come right to your driveway with our full mobile setup to wash, vacuum, shampoo, and ceramic-seal your vehicle.",
    localHighlights: [
      {
        title: 'Family & Pet-Friendly Stain Removal',
        description: 'High-temperature steam extraction breaks down juice spills, food stains, and deep pet odor without harsh smells.',
      },
      {
        title: 'Commuter Road Grime Cleanup',
        description: 'Safely removes I-35 asphalt tar, industrial fallout, and road film from your clear coat and wheels.',
      },
      {
        title: 'Affordable Pricing & Packages',
        description: 'Clear, transparent pricing from $60 exterior washes to complete $170 deluxe interior/exterior packages.',
      },
    ],
  },
  'circle-c': {
    slug: 'circle-c',
    name: 'Circle C Ranch',
    subTitle: 'Mobile Auto Detailing in Circle C Ranch & South Austin',
    headline: 'Circle C Mobile Car Wash, Steam Sanitation & Ceramic Detail',
    zipCodes: ['78739', '78749'],
    keyLandmarks: ['Circle C Ranch Metro Park', 'Slaughter Creek', 'Grey Rock Golf Club', 'Escarpment Village', 'Belterra'],
    description:
      "Reliable, high-quality mobile car detailing in South Austin and Circle C Ranch. We handle everything on-site while you relax at home or work from your home office.",
    localHighlights: [
      {
        title: 'Full Family Interior Reset',
        description: 'Complete cabin blow-out, seat shampoo, leather wipe-down, and heavy dirt extraction from floorboards.',
      },
      {
        title: 'Zero-Scratch Microfiber Washing',
        description: 'Snow foam pre-soak and ultra-soft microfiber mitt wash to protect dark and delicate modern clear coats.',
      },
      {
        title: 'Convenient Online Booking',
        description: 'Instant price calculator with real-time slot selection and no surprise upcharges.',
      },
    ],
  },
  'cedar-park': {
    slug: 'cedar-park',
    name: 'Cedar Park',
    subTitle: 'Mobile Car Detailing in Cedar Park, TX',
    headline: 'Mobile Auto Detailing & Ceramic Waxing in Cedar Park, TX',
    zipCodes: ['78613'],
    keyLandmarks: ['HEB Center', 'Brushy Creek', 'Twin Creeks', 'Ranch at Cypress Creek', 'Bell District'],
    description:
      "Gavin's Car Detailing brings five-star auto detailing straight to Cedar Park driveways. We provide deep interior cleaning, steam sanitization, and high-gloss exterior foam washing.",
    localHighlights: [
      {
        title: 'Doorstep Convenience',
        description: 'No dropping off your car or arranging rides. We handle the entire service in your driveway.',
      },
      {
        title: 'Deep Carpet & Seat Extraction',
        description: 'Commercial wet extraction to pull deep ground-in dirt, soda stains, and coffee spills from upholstery.',
      },
      {
        title: 'UV Resistant Interior Treatment',
        description: 'Matte-finish dashboard and door panel protectants that block Texas sun degradation.',
      },
    ],
  },
};

export const SERVICE_LANDING_PAGES: Record<string, ServiceLandingData> = {
  'ceramic-coating-austin': {
    slug: 'ceramic-coating-austin',
    name: 'Ceramic Coating Austin TX',
    badge: 'Ultimate Paint Protection',
    headline: 'Multi-Month Hydrophobic Ceramic Spray Coating in Austin, TX',
    priceStarting: 170,
    duration: '2.5 – 3.5 Hours',
    description:
      "Austin's scorching sun, mineral-heavy rain, and tree sap can rapidly degrade your clear coat. Our ceramic spray coating creates a durable SiO2 hydrophobic barrier that repels water, prevents oxidation, and provides an intense deep gloss mirror finish.",
    benefits: [
      'High-grade SiO2 ceramic barrier repelling water, dirt, and road oils',
      'Prevents sun-induced clear coat fading and UV oxidation',
      'Reduces water spotting from hard Central Texas municipal water',
      'Makes routine car washes faster and significantly easier to dry',
      'Delivers an intense, slick, deep-wet mirror reflection on all paint colors',
    ],
    processSteps: [
      {
        step: '01',
        title: 'Foam Pre-Wash & Iron Decontamination',
        description: 'pH-neutral snow foam wash followed by chemical iron fallout removal to dissolve embedded brake dust and road contaminants.',
      },
      {
        step: '02',
        title: 'Surface Clay Bar Preparation',
        description: 'Gentle clay treatment to pull microscopic sap, tar, and overspray from the clear coat for ultra-smooth glass-like paint.',
      },
      {
        step: '03',
        title: 'Ceramic Coating Infusion',
        description: 'Hand application and buffing of premium SiO2 ceramic sealant creating a long-lasting hydrophobic protective shell.',
      },
    ],
  },
  'paint-correction-austin': {
    slug: 'paint-correction-austin',
    name: 'Paint Enhancement & Scratch Removal',
    badge: 'Showroom Gloss Restoration',
    headline: 'Machine Paint Polishing & Swirl Mark Removal in Austin, TX',
    priceStarting: 170,
    duration: '3.0 – 4.0 Hours',
    description:
      "Automated drive-through car washes and improper wiping leave unsightly spiderweb swirl marks and light scratches in modern clear coats. Our paint enhancement process safely polishes out clear coat defects to restore true color depth and brilliant clarity.",
    benefits: [
      'Removes micro-swirls, spiderwebbing, and light clear-coat scratches',
      'Restores true color richness, especially on black, metallic, and dark paints',
      'Levels the clear coat for maximum optical clarity and reflection',
      'Prepares paint for maximum ceramic bond and multi-month durability',
    ],
    processSteps: [
      {
        step: '01',
        title: 'Precision Surface Decontamination',
        description: 'Complete hand wash and chemical strip to ensure paint is 100% free of dirt, waxes, and silicones.',
      },
      {
        step: '02',
        title: 'Single-Stage Machine Polishing',
        description: 'Dual-action orbital machine polishing using fine micro-abrasive diminishing compounds to jewel the clear coat.',
      },
      {
        step: '03',
        title: 'Sealant Lock & Cure',
        description: 'Final application of ceramic sealant to lock in the perfected finish and shield against new contaminants.',
      },
    ],
  },
  'interior-steam-detailing': {
    slug: 'interior-steam-detailing',
    name: 'Interior Steam Detailing & Sanitization',
    badge: 'Deep Cabin Restoration',
    headline: '220°F High-Temperature Interior Steam Cleaning in Austin, TX',
    priceStarting: 90,
    duration: '1.5 – 2.5 Hours',
    description:
      "Restore your vehicle's cabin to like-new cleanliness. Our commercial 220°F steam cleaning sanitizes AC vents, lifts stubborn floor mat stains, deep-cleans leather pores, and eliminates odor-causing bacteria without harsh chemical smells.",
    benefits: [
      '220°F pressurized steam eliminates 99.9% of bacteria and allergens',
      'Safely cleans and sterilizes HVAC air conditioning ductwork and vents',
      'Lifts embedded body oils, makeup, and sunscreen from leather and door cards',
      'Deep hot-water extraction removes coffee, soda, and mud stains from carpets',
      'Leaves a clean, non-greasy OEM matte finish with UV sun inhibitors',
    ],
    processSteps: [
      {
        step: '01',
        title: 'High-Power Vacuum & Crevice Air Blowout',
        description: 'Compressed air and heavy-duty extraction to pull dust, sand, and pet hair from under seats and seams.',
      },
      {
        step: '02',
        title: 'Targeted Steam Sanitation',
        description: 'Precision steam cleaning across steering wheel, center console buttons, cup holders, and AC vents.',
      },
      {
        step: '03',
        title: 'Leather Conditioning & Carpet Shampoo',
        description: 'pH-balanced leather conditioner nourishing upholstery plus wet extraction shampoo for floor mats.',
      },
    ],
  },
};
