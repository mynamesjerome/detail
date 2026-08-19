import { ServicePackage, AddOnService, MaintenanceTier, Review } from '../types';

export const SERVICE_PACKAGES: ServicePackage[] = [
  {
    id: 'basic-interior',
    name: 'Basic Interior Detail',
    tag: 'Interior',
    sedanPrice: 90,
    suvPrice: 110,
    description: 'Thorough interior reset for your car.',
    features: [
      'Full cabin, trunk & under-seat vacuuming',
      'Dashboard, console & door panel wipe down',
      'Floor mat shampoo & dirt extraction',
      'Streak-free interior mirrors and glass',
      'Door jamb degreasing and deep clean'
    ]
  },
  {
    id: 'basic-exterior',
    name: 'Basic Exterior Detail',
    tag: 'Exterior',
    sedanPrice: 60,
    suvPrice: 75,
    description: 'Complete hand wash and exterior decontamination.',
    features: [
      'High-pressure pre-rinse to loosen road grime',
      'pH-neutral snow foam & full hand wash',
      'Deep tire cleaning & premium satin tire shine',
      'Front bumper & mirror bug removal',
      'Wheel barrels, faces & inner wheel wells cleaned',
      'Streak-free interior and exterior window cleaning'
    ]
  },
  {
    id: 'basic-interior-exterior',
    name: 'Basic Interior & Exterior Detail',
    tag: 'Full Detail',
    sedanPrice: 130,
    suvPrice: 150,
    description: 'Complete interior and exterior clean in one package.',
    features: [
      'High-pressure pre-rinse & pH-neutral full hand wash',
      'Tire shine application & front-end bug removal',
      'Wheel wells, rims & door jambs deep-cleaned',
      'Full cabin, seat & trunk vacuuming',
      'Complete dash, console & door panel wipe down',
      'Floor mat wash & interior/exterior glass cleaning'
    ]
  },
  {
    id: 'deluxe-detail',
    name: 'Deluxe Detail Package',
    tag: 'Most Popular',
    isPopular: true,
    sedanPrice: 170,
    suvPrice: 190,
    description: 'Our complete detail with deep conditioning and long-lasting ceramic protection.',
    features: [
      'Everything included in Basic Interior & Exterior Detail',
      'Interior leather conditioning & plastic UV protectant',
      '6-month hydrophobic ceramic spray sealant',
      'Exterior plastic trim restoration & protective dressing'
    ]
  }
];

export const ADD_ON_SERVICES: AddOnService[] = [
  {
    id: 'headlight-restoration',
    name: 'Headlight Restoration',
    priceText: '$50 / pair',
    basePrice: 50,
    iconName: 'Sparkles',
    description: 'Multi-stage wet sanding, compounding, polishing & UV ceramic sealant coating to permanently eliminate yellow haze and cloudy oxidation for maximum nighttime road visibility.',
    beforeImage: '/mustang foam before.JPG',
    afterImage: '/mercedes after.JPG',
    images: [
      '/mustang foam before.JPG',
      '/mercedes after.JPG'
    ]
  },
  {
    id: 'scratch-removal',
    name: 'Scratch Removal / Paint Correction',
    priceText: 'Starting at $50',
    basePrice: 50,
    iconName: 'ShieldAlert',
    description: 'Spot machine buffing, compounding & light paint enhancement to eliminate swirl marks and clear coat scratches.',
    beforeImage: '/mustang foam before.JPG',
    afterImage: '/mercedes after.JPG',
    images: [
      '/mercedes after.JPG',
      '/mustang foam before.JPG'
    ]
  },
  {
    id: 'stain-removal',
    name: 'Interior Stain Removal',
    priceText: 'Starting at $20',
    basePrice: 20,
    iconName: 'Droplets',
    description: 'High-temperature steam treatment, intensive agitation scrubbing, and commercial hot water extraction to lift stubborn spills and stains.',
    beforeImage: '/mustang foam before.JPG',
    afterImage: '/aston 2.JPG',
    images: [
      '/aston 2.JPG',
      '/mustang foam before.JPG'
    ]
  },
  {
    id: 'pet-hair-removal',
    name: 'Pet Hair Removal',
    priceText: '$30 – $60',
    basePrice: 30,
    iconName: 'Dog',
    description: 'Specialized rubber detailing blades, precision fur-removal brushes, and high-velocity compressed air blowout to lift stubborn embedded pet hair from carpets and upholstery.',
    beforeImage: '/aston 3.JPG',
    afterImage: '/audi.JPG',
    images: [
      '/audi.JPG',
      '/aston 3.JPG'
    ]
  },
  {
    id: 'engine-bay-detail',
    name: 'Engine Bay Detail',
    priceText: 'Starting at $30',
    basePrice: 30,
    iconName: 'Flame',
    description: 'Full engine bay degreaser rinse, forced air blowout drying, and protective dressing for a clean, factory-fresh satin finish.',
    beforeImage: '/mustang foam before.JPG',
    afterImage: '/aston 1.JPG',
    images: [
      '/aston 1.JPG',
      '/mustang foam before.JPG'
    ]
  },
  {
    id: 'clay-bar-iron',
    name: 'Clay Bar & Iron Decontamination',
    priceText: 'Starting at $50',
    basePrice: 50,
    iconName: 'Disc',
    description: 'Chemical iron fallout purge + clay bar treatment to safely lift embedded brake dust, industrial fallout, and road tar for glass-smooth paint prep.',
    beforeImage: '/mustang foam before.JPG',
    afterImage: '/mercedes after.JPG',
    images: [
      '/mercedes after.JPG',
      '/mustang foam before.JPG'
    ]
  }
];

export const MAINTENANCE_TIERS: MaintenanceTier[] = [
  {
    id: 'biweekly',
    frequency: 'Every 2 Weeks',
    subtitle: 'Maximum gloss & protection retention',
    sedanPrice: 60,
    suvPrice: 75
  },
  {
    id: 'monthly',
    frequency: 'Every 4 Weeks',
    subtitle: 'Ideal balance for daily Austin drivers',
    sedanPrice: 80,
    suvPrice: 100
  },
  {
    id: 'quarterly',
    frequency: 'Quarterly',
    subtitle: 'Seasonal deep check & touch-up',
    sedanPrice: 100,
    suvPrice: 125
  }
];

export const MAINTENANCE_FEATURES: string[] = [
  'Scheduled recurring mobile service directly to your location',
  'Exclusive discounted maintenance pricing lock-in',
  'Continuous ceramic protection re-application & gloss maintenance',
  'Priority VIP booking slots with zero travel surcharges within 20 miles'
];

export const MAINTENANCE_TERMS: string[] = [
  'Must complete an initial Deluxe Detail or Basic Detail to qualify your vehicle',
  'Pause or cancel anytime with 48 hours notice before your next scheduled slot',
  'Multi-car garage discounts stack seamlessly with maintenance tiers'
];

export const REVIEWS: Review[] = [
  {
    id: 'carlos-de-la-garza',
    author: 'Carlos De La Garza',
    rating: 5,
    timeAgo: 'Verified Customer',
    text: "I called Gavin late one afternoon and he was able to detail my car the very next morning at 9am. He communicated his ETA and made payment super easy. He did a fantastic job on my Toyota 4Runner which hadn't been washed in a very long time! Highly recommend!"
  },
  {
    id: 'cameron-moore',
    author: 'Cameron Moore',
    rating: 5,
    timeAgo: 'Verified Customer',
    text: "Took my car to Gavin after it got covered in tree sap and hadn't been washed in months. He did an awesome job and it was super convenient that he came to my place. Car looks brand new!"
  },
  {
    id: 'kevon-albert',
    author: 'Kevon Albert',
    rating: 5,
    timeAgo: 'Verified Customer',
    text: 'Gavin is great at what he does! He arrived early and left my car looking pristine. Best detailing company in Austin. High-level service and very professional.'
  },
  {
    id: 'elizabeth-campbell',
    author: 'Elizabeth Campbell',
    rating: 5,
    timeAgo: 'Verified Customer',
    text: "Gavin did a great job detailing my car! He paid attention to detail and didn't leave a single surface untouched. He was kind, respectful, on time, and gave an accurate estimate of when the job would be complete. Very impressive work!"
  },
  {
    id: 'kristin-reagan',
    author: 'Kristin Reagan',
    rating: 5,
    timeAgo: 'Verified Customer',
    text: 'Gavin is the best! Very professional and did an amazing job on my car. I will definitely be using his services again!'
  },
  {
    id: 'rebecca-foster',
    author: 'Rebecca Foster',
    rating: 5,
    timeAgo: 'Verified Customer',
    text: 'Gavin has continually provided me first-class service for every cleaning. He simplified the process and is always prompt and professional. Would recommend to any and all.'
  }
];

export const GOOGLE_REVIEWS = REVIEWS;
