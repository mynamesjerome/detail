import { ServicePackage, AddOnService, MaintenanceTier, Review } from '../types';

export const SERVICE_PACKAGES: ServicePackage[] = [
  {
    id: 'basic-detail',
    name: 'Basic Interior & Exterior Detail',
    tag: 'Routine Care',
    sedanPrice: 130,
    suvPrice: 150,
    description: 'A complete top-to-bottom reset for regularly driven vehicles.',
    features: [
      'Full exterior hand wash',
      'Bug removal',
      'Wheel, wheel well & tire deep cleaning',
      'Tire shine application',
      'Door jamb wipe down',
      'Thorough interior vacuum',
      'Thorough interior detailing (all surfaces, cup holders, seats & floor mats)',
      'Interior & exterior streak-free window cleaning'
    ]
  },
  {
    id: 'interior-detail',
    name: 'Interior Detail',
    tag: 'Interior Restore',
    sedanPrice: 80,
    suvPrice: 100,
    description: 'Targeted deep clean restoring your cabin to immaculate freshness.',
    features: [
      'Door jamb wipe down',
      'Thorough interior vacuum (cabin & trunk)',
      'Thorough interior detailing of all surfaces, cup holders, seats & floor mats',
      'Interior & exterior window cleaning'
    ]
  },
  {
    id: 'exterior-detail',
    name: 'Exterior Detail',
    tag: 'Quick Refresh',
    sedanPrice: 55,
    suvPrice: 70,
    description: 'Precision hand wash restoring paint clarity, wheels & glass.',
    features: [
      'Full exterior hand wash',
      'Wheel, wheel well & tire cleaning',
      'Tire shine application',
      'Bug & road grime removal',
      'Interior & exterior window cleaning'
    ]
  },
  {
    id: 'deluxe-detail',
    name: 'Deluxe Detail Package',
    tag: 'Most Popular',
    isPopular: true,
    sedanPrice: 170,
    suvPrice: 190,
    description: 'Our flagship suite with interior conditioning and 6-month ceramic protection.',
    features: [
      'Everything in Basic Interior & Exterior Detail',
      'Interior plastic & leather deep conditioning',
      '6-Month exterior ceramic spray sealant',
      'Exterior plastic trim restoration & dressing'
    ]
  }
];

export const ADD_ON_SERVICES: AddOnService[] = [
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
    suvPrice: 120
  }
];

export const MAINTENANCE_FEATURES = [
  'Full exterior hand wash',
  'Wheel & tire cleaning',
  'Tire shine application',
  'Exterior windows',
  'Interior vacuum',
  'Interior surface wipe down',
  'Door jamb cleaning',
  'Interior windows',
  'Quick touch-up',
  'Ceramic spray booster'
];

export const MAINTENANCE_TERMS = [
  'Vehicle must receive a Full Detail or Deluxe Detail prior to program entry.',
  'Excessively dirty vehicles may require a full detail reset.',
  'Missed appointments beyond the scheduled interval may require a full detail reset.'
];

export const REVIEWS: Review[] = [
  {
    id: 'kyle-greer',
    author: 'Kyle Greer',
    role: 'Local Guide',
    rating: 5,
    timeAgo: 'Recent',
    text: 'This young guy—only 18 years old—came out and detailed 3 of our work trucks today, and I’ve gotta say, I was seriously impressed... No cutting corners, no dragging his feet—just busted his butt the entire time. The trucks looked awesome when he finished. Super professional, great communication...'
  },
  {
    id: 'amy-closson',
    author: 'Amy Closson',
    role: 'Cupprimo Cupcakery',
    rating: 5,
    timeAgo: 'Verified Customer',
    text: 'We have had our cars detailed dozens of times over the years. Gavin by far is the best car detailing I’ve ever had. He always goes the extra mile and being a mobile car detailing company he is able to accommodate whatever time slot that you would like.'
  },
  {
    id: 'brad-closson',
    author: 'Brad Closson',
    rating: 5,
    timeAgo: '2+ Year Client',
    text: 'We’ve been using Gavin for all of our cars for over two years. His work is exceptional and his attention to detail is second to none. Highly recommend!!'
  },
  {
    id: 'bailey',
    author: 'Bailey',
    rating: 5,
    timeAgo: 'Verified Customer',
    text: 'Gavin gave me a more than fair pricing, he was efficient but didn’t cut corners when detailing the ins and outs of my car, 10/10 he gets five big booms.'
  },
  {
    id: 'brandon-brown',
    author: 'Brandon Brown',
    rating: 5,
    timeAgo: 'Regular Client',
    text: 'Gavin has continually provided me first-class service for every cleaning. He simplified the process and is always prompt and professional. Would recommend to any and all.'
  },
  {
    id: 'mas-nosretep',
    author: 'Mas Nosretep',
    rating: 5,
    timeAgo: 'Verified Customer',
    text: 'Gavin is a pretty cool dude. He bought wood from us. He was really inspiring and does a great job detailing cars.'
  },
  {
    id: 'julia-kevon',
    author: 'Julia Kevon',
    rating: 5,
    timeAgo: 'Minivan Owner',
    text: 'They did a great job with our very messy minivan. Fair price and quick to respond and schedule. Will keep booking with them!'
  },
  {
    id: 'ben-schuler',
    author: 'Ben Schuler',
    rating: 5,
    timeAgo: 'Verified Customer',
    text: 'Gave me a reasonable price for the job he was doing, cleaned out my entire car which was very dirty and did a great job.'
  },
  {
    id: 'baloo-dada',
    author: 'Baloo Dada',
    rating: 5,
    timeAgo: '1 Year Client',
    text: 'One of the most hardworking people I know. Would highly recommend him for car detailing. We have been coming to him for the past year.'
  }
];
