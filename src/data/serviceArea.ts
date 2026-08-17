export interface ServiceLocation {
  zip: string;
  city: string;
  area: string;
  approxDistanceMiles: number;
  inPrimaryRadius: boolean;
  tier: 'core' | 'extended' | 'custom_travel';
}

export const SERVICE_LOCATIONS: Record<string, ServiceLocation> = {
  // Downtown & Central Austin (0-10 miles)
  '78701': { zip: '78701', city: 'Downtown Austin', area: 'Central Metro', approxDistanceMiles: 8, inPrimaryRadius: true, tier: 'core' },
  '78702': { zip: '78702', city: 'East Austin', area: 'Central Metro', approxDistanceMiles: 9, inPrimaryRadius: true, tier: 'core' },
  '78703': { zip: '78703', city: 'Tarrytown / Clarksville', area: 'Central Metro', approxDistanceMiles: 7, inPrimaryRadius: true, tier: 'core' },
  '78704': { zip: '78704', city: 'South Congress / Zilker', area: 'Central Metro', approxDistanceMiles: 11, inPrimaryRadius: true, tier: 'core' },
  '78705': { zip: '78705', city: 'UT Campus / Central Austin', area: 'Central Metro', approxDistanceMiles: 7, inPrimaryRadius: true, tier: 'core' },
  '78712': { zip: '78712', city: 'Central Austin', area: 'Central Metro', approxDistanceMiles: 7, inPrimaryRadius: true, tier: 'core' },
  '78722': { zip: '78722', city: 'Cherrywood / Mueller', area: 'Central Metro', approxDistanceMiles: 8, inPrimaryRadius: true, tier: 'core' },
  '78723': { zip: '78723', city: 'Windsor Park / Mueller', area: 'Central Metro', approxDistanceMiles: 7, inPrimaryRadius: true, tier: 'core' },
  '78751': { zip: '78751', city: 'Hyde Park / North Loop', area: 'Central Metro', approxDistanceMiles: 6, inPrimaryRadius: true, tier: 'core' },
  '78752': { zip: '78752', city: 'Highland / Crestview', area: 'Central Metro', approxDistanceMiles: 5, inPrimaryRadius: true, tier: 'core' },
  '78756': { zip: '78756', city: 'Rosedale / Central', area: 'Central Metro', approxDistanceMiles: 5, inPrimaryRadius: true, tier: 'core' },
  '78757': { zip: '78757', city: 'Brentwood / Crestview', area: 'Central Metro', approxDistanceMiles: 4, inPrimaryRadius: true, tier: 'core' },

  // West Lake Hills & Lake Austin (3-15 miles)
  '78746': { zip: '78746', city: 'West Lake Hills / Rollingwood', area: 'West Metro', approxDistanceMiles: 9, inPrimaryRadius: true, tier: 'core' },
  '78731': { zip: '78731', city: 'Northwest Hills / Balcones', area: 'West Metro', approxDistanceMiles: 3, inPrimaryRadius: true, tier: 'core' },
  '78733': { zip: '78733', city: 'Barton Creek West / Cuernavaca', area: 'West Metro', approxDistanceMiles: 11, inPrimaryRadius: true, tier: 'core' },
  '78735': { zip: '78735', city: 'Barton Creek / Southwest Austin', area: 'West Metro', approxDistanceMiles: 13, inPrimaryRadius: true, tier: 'core' },
  '78730': { zip: '78730', city: 'River Place / City Park', area: 'West Metro', approxDistanceMiles: 6, inPrimaryRadius: true, tier: 'core' },

  // North & Northwest Austin (0-15 miles)
  '78759': { zip: '78759', city: 'Arboretum / Great Hills', area: 'North Metro', approxDistanceMiles: 0, inPrimaryRadius: true, tier: 'core' },
  '78727': { zip: '78727', city: 'Scofield Farms / North Austin', area: 'North Metro', approxDistanceMiles: 4, inPrimaryRadius: true, tier: 'core' },
  '78728': { zip: '78728', city: 'Wells Branch / North Austin', area: 'North Metro', approxDistanceMiles: 6, inPrimaryRadius: true, tier: 'core' },
  '78729': { zip: '78729', city: 'Jollyville / Northwest Austin', area: 'North Metro', approxDistanceMiles: 3, inPrimaryRadius: true, tier: 'core' },
  '78750': { zip: '78750', city: 'Anderson Mill / Northwest Austin', area: 'North Metro', approxDistanceMiles: 4, inPrimaryRadius: true, tier: 'core' },
  '78758': { zip: '78758', city: 'The Domain / North Austin', area: 'North Metro', approxDistanceMiles: 3, inPrimaryRadius: true, tier: 'core' },
  '78717': { zip: '78717', city: 'Avery Ranch / North Austin', area: 'North Metro', approxDistanceMiles: 7, inPrimaryRadius: true, tier: 'core' },
  '78726': { zip: '78726', city: 'Four Points / Northwest Austin', area: 'North Metro', approxDistanceMiles: 6, inPrimaryRadius: true, tier: 'core' },

  // South & Southwest Austin (10-20 miles)
  '78745': { zip: '78745', city: 'South Austin / Westgate', area: 'South Metro', approxDistanceMiles: 14, inPrimaryRadius: true, tier: 'core' },
  '78748': { zip: '78748', city: 'South Austin / Menchaca', area: 'South Metro', approxDistanceMiles: 17, inPrimaryRadius: true, tier: 'core' },
  '78749': { zip: '78749', city: 'Southwest Austin / Slaughter', area: 'South Metro', approxDistanceMiles: 16, inPrimaryRadius: true, tier: 'core' },
  '78736': { zip: '78736', city: 'Oak Hill / SW Austin', area: 'South Metro', approxDistanceMiles: 15, inPrimaryRadius: true, tier: 'core' },
  '78739': { zip: '78739', city: 'Circle C Ranch / SW Austin', area: 'South Metro', approxDistanceMiles: 19, inPrimaryRadius: true, tier: 'core' },
  '78741': { zip: '78741', city: 'Riverside / Southeast Austin', area: 'South Metro', approxDistanceMiles: 12, inPrimaryRadius: true, tier: 'core' },
  '78744': { zip: '78744', city: 'Southeast Austin / Onion Creek', area: 'South Metro', approxDistanceMiles: 16, inPrimaryRadius: true, tier: 'core' },
  '78747': { zip: '78747', city: 'Onion Creek / South Austin', area: 'South Metro', approxDistanceMiles: 20, inPrimaryRadius: true, tier: 'core' },

  // East Austin & Tech Corridor (5-18 miles)
  '78721': { zip: '78721', city: 'East Austin', area: 'East Metro', approxDistanceMiles: 10, inPrimaryRadius: true, tier: 'core' },
  '78724': { zip: '78724', city: 'Colony Park / East Austin', area: 'East Metro', approxDistanceMiles: 11, inPrimaryRadius: true, tier: 'core' },
  '78725': { zip: '78725', city: 'Hornsby Bend / East Austin', area: 'East Metro', approxDistanceMiles: 15, inPrimaryRadius: true, tier: 'core' },
  '78754': { zip: '78754', city: 'Harris Branch / Northeast Austin', area: 'East Metro', approxDistanceMiles: 9, inPrimaryRadius: true, tier: 'core' },
  '78719': { zip: '78719', city: 'Del Valle / ABIA Airport', area: 'East Metro', approxDistanceMiles: 16, inPrimaryRadius: true, tier: 'core' },
  '78742': { zip: '78742', city: 'Montopolis / East Austin', area: 'East Metro', approxDistanceMiles: 13, inPrimaryRadius: true, tier: 'core' },

  // Round Rock & Pflugerville (6-16 miles)
  '78664': { zip: '78664', city: 'Round Rock (East)', area: 'North Suburbs', approxDistanceMiles: 10, inPrimaryRadius: true, tier: 'core' },
  '78665': { zip: '78665', city: 'Round Rock (North)', area: 'North Suburbs', approxDistanceMiles: 14, inPrimaryRadius: true, tier: 'core' },
  '78680': { zip: '78680', city: 'Round Rock', area: 'North Suburbs', approxDistanceMiles: 11, inPrimaryRadius: true, tier: 'core' },
  '78681': { zip: '78681', city: 'Round Rock (West / Brushy Creek)', area: 'North Suburbs', approxDistanceMiles: 8, inPrimaryRadius: true, tier: 'core' },
  '78682': { zip: '78682', city: 'Round Rock', area: 'North Suburbs', approxDistanceMiles: 10, inPrimaryRadius: true, tier: 'core' },
  '78683': { zip: '78683', city: 'Round Rock', area: 'North Suburbs', approxDistanceMiles: 10, inPrimaryRadius: true, tier: 'core' },
  '78660': { zip: '78660', city: 'Pflugerville', area: 'North Suburbs', approxDistanceMiles: 8, inPrimaryRadius: true, tier: 'core' },
  '78691': { zip: '78691', city: 'Pflugerville', area: 'North Suburbs', approxDistanceMiles: 8, inPrimaryRadius: true, tier: 'core' },

  // Cedar Park, Leander & Lake Travis (5-18 miles)
  '78613': { zip: '78613', city: 'Cedar Park', area: 'Northwest Suburbs', approxDistanceMiles: 8, inPrimaryRadius: true, tier: 'core' },
  '78630': { zip: '78630', city: 'Cedar Park', area: 'Northwest Suburbs', approxDistanceMiles: 9, inPrimaryRadius: true, tier: 'core' },
  '78641': { zip: '78641', city: 'Leander', area: 'Northwest Suburbs', approxDistanceMiles: 15, inPrimaryRadius: true, tier: 'core' },
  '78646': { zip: '78646', city: 'Leander', area: 'Northwest Suburbs', approxDistanceMiles: 16, inPrimaryRadius: true, tier: 'core' },
  '78732': { zip: '78732', city: 'Steiner Ranch / Lake Travis', area: 'West Suburbs', approxDistanceMiles: 9, inPrimaryRadius: true, tier: 'core' },
  '78734': { zip: '78734', city: 'Lakeway / Hudson Bend', area: 'West Suburbs', approxDistanceMiles: 14, inPrimaryRadius: true, tier: 'core' },
  '78738': { zip: '78738', city: 'Bee Cave / The Hills', area: 'West Suburbs', approxDistanceMiles: 15, inPrimaryRadius: true, tier: 'core' },
  '78669': { zip: '78669', city: 'Spicewood / Lake Travis', area: 'West Suburbs', approxDistanceMiles: 23, inPrimaryRadius: false, tier: 'custom_travel' },

  // Georgetown, Hutto, Manor & East (12-25 miles)
  '78626': { zip: '78626', city: 'Georgetown (East)', area: 'North Suburbs', approxDistanceMiles: 19, inPrimaryRadius: true, tier: 'core' },
  '78627': { zip: '78627', city: 'Georgetown', area: 'North Suburbs', approxDistanceMiles: 18, inPrimaryRadius: true, tier: 'core' },
  '78628': { zip: '78628', city: 'Georgetown (West)', area: 'North Suburbs', approxDistanceMiles: 17, inPrimaryRadius: true, tier: 'core' },
  '78633': { zip: '78633', city: 'Georgetown (Sun City)', area: 'North Suburbs', approxDistanceMiles: 21, inPrimaryRadius: false, tier: 'custom_travel' },
  '78634': { zip: '78634', city: 'Hutto', area: 'Northeast Suburbs', approxDistanceMiles: 16, inPrimaryRadius: true, tier: 'core' },
  '78653': { zip: '78653', city: 'Manor', area: 'East Suburbs', approxDistanceMiles: 14, inPrimaryRadius: true, tier: 'core' },
  '78617': { zip: '78617', city: 'Del Valle / Circuit of the Americas', area: 'Southeast Suburbs', approxDistanceMiles: 18, inPrimaryRadius: true, tier: 'core' },

  // Buda, Kyle, Dripping Springs & South/Southwest
  '78610': { zip: '78610', city: 'Buda', area: 'South Suburbs', approxDistanceMiles: 22, inPrimaryRadius: false, tier: 'custom_travel' },
  '78640': { zip: '78640', city: 'Kyle', area: 'South Suburbs', approxDistanceMiles: 27, inPrimaryRadius: false, tier: 'custom_travel' },
  '78620': { zip: '78620', city: 'Dripping Springs', area: 'Southwest Suburbs', approxDistanceMiles: 24, inPrimaryRadius: false, tier: 'custom_travel' },
  '78737': { zip: '78737', city: 'Belterra / Dripping Springs East', area: 'Southwest Suburbs', approxDistanceMiles: 19, inPrimaryRadius: true, tier: 'core' },
  '78619': { zip: '78619', city: 'Driftwood', area: 'Southwest Suburbs', approxDistanceMiles: 26, inPrimaryRadius: false, tier: 'custom_travel' },
  '78645': { zip: '78645', city: 'Lago Vista / Jonestown', area: 'Northwest Suburbs', approxDistanceMiles: 21, inPrimaryRadius: false, tier: 'custom_travel' },

  // Extended Areas
  '78642': { zip: '78642', city: 'Liberty Hill', area: 'Extended Central TX', approxDistanceMiles: 22, inPrimaryRadius: false, tier: 'custom_travel' },
  '78621': { zip: '78621', city: 'Elgin', area: 'Extended Central TX', approxDistanceMiles: 25, inPrimaryRadius: false, tier: 'custom_travel' },
  '78676': { zip: '78676', city: 'Wimberley', area: 'Extended Central TX', approxDistanceMiles: 34, inPrimaryRadius: false, tier: 'custom_travel' },
};

export const SERVICE_RADIUS_MILES = 20;

export const FEATURED_SERVICE_CITIES = [
  { name: 'Austin', zip: '78759' },
  { name: 'West Lake Hills', zip: '78746' },
  { name: 'Round Rock', zip: '78681' },
  { name: 'Cedar Park', zip: '78613' },
  { name: 'Lakeway', zip: '78734' },
  { name: 'Pflugerville', zip: '78660' },
];
