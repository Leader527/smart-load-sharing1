export interface TruckInput {
  sourceCity: string;
  destinationCity: string;
  capacity: number;
  truckType: string;
}

export interface LoadSuggestion {
  id: string;
  sourceCity: string;
  destinationCity: string;
  loadType: string;
  distance: number;
  estimatedProfit: number;
  matchScore: number;
  isRecommended: boolean;
  reasons: string[];
  weight: string;
  company: string;
}

export interface OptimizationResult {
  emptyDistanceReduced: number;
  fuelSaved: number;
  truckUtilization: number;
  estimatedProfit: number;
}

export const TRUCK_TYPES = [
  'Flatbed',
  'Refrigerated',
  'Tanker',
  'Dry Van',
  'Car Carrier',
  'Container',
  'Tipper',
  'Trailer',
];

export const CITIES = [
  'Mumbai',
  'Delhi',
  'Bangalore',
  'Hyderabad',
  'Chennai',
  'Kolkata',
  'Pune',
  'Ahmedabad',
  'Jaipur',
  'Lucknow',
  'Nagpur',
  'Indore',
  'Bhopal',
  'Surat',
  'Visakhapatnam',
];

const LOAD_TYPES = [
  'Electronics',
  'Furniture',
  'Textiles',
  'Automotive Parts',
  'Pharmaceuticals',
  'Agricultural Products',
  'Construction Material',
  'FMCG',
  'Steel & Metal',
  'Chemicals',
  'Food & Beverages',
  'Machinery',
];

const COMPANIES = [
  'TransIndia Logistics',
  'QuickHaul Express',
  'BlueVista Transport',
  'CargoKing Solutions',
  'RoadMaster Freight',
  'SwiftLoad Carriers',
  'OmniRoute Logistics',
  'FreightLink India',
];

const REASON_TEMPLATES = [
  'Closest route to your return path',
  'High profit margin for this route',
  'Minimum deviation from return route',
  'Load type compatible with your truck',
  'Capacity matches your available space',
  'High-demand corridor with reliable shippers',
  'Optimal fuel-to-revenue ratio',
];

function seededRandom(seed: number): () => number {
  let s = seed;
  return () => {
    s = (s * 16807 + 0) % 2147483647;
    return s / 2147483647;
  };
}

export function generateLoadSuggestions(input: TruckInput): LoadSuggestion[] {
  const seed = input.sourceCity.length * 100 + input.destinationCity.length * 10 + input.capacity;
  const rand = seededRandom(seed);

  const returnLoads: LoadSuggestion[] = [];
  const numSuggestions = 4 + Math.floor(rand() * 2);

  const usedDestinations = new Set<string>();
  usedDestinations.add(input.destinationCity);

  for (let i = 0; i < numSuggestions; i++) {
    let destCity: string;
    do {
      destCity = CITIES[Math.floor(rand() * CITIES.length)];
    } while (usedDestinations.has(destCity));
    usedDestinations.add(destCity);

    const distance = 80 + Math.floor(rand() * 600);
    const baseProfit = Math.floor(distance * (8 + rand() * 12));
    const matchScore = 55 + Math.floor(rand() * 43);
    const loadType = LOAD_TYPES[Math.floor(rand() * LOAD_TYPES.length)];
    const company = COMPANIES[Math.floor(rand() * COMPANIES.length)];

    const numReasons = 2 + Math.floor(rand() * 2);
    const reasons: string[] = [];
    const usedReasonIndices = new Set<number>();
    for (let r = 0; r < numReasons; r++) {
      let idx: number;
      do {
        idx = Math.floor(rand() * REASON_TEMPLATES.length);
      } while (usedReasonIndices.has(idx));
      usedReasonIndices.add(idx);
      reasons.push(REASON_TEMPLATES[idx]);
    }

    returnLoads.push({
      id: `load-${i + 1}`,
      sourceCity: input.destinationCity,
      destinationCity: destCity,
      loadType,
      distance,
      estimatedProfit: baseProfit,
      matchScore,
      isRecommended: false,
      reasons,
      weight: `${(5 + Math.floor(rand() * 20))} MT`,
      company,
    });
  }

  const bestIdx = returnLoads.reduce(
    (best, curr, idx) => (curr.matchScore > returnLoads[best].matchScore ? idx : best),
    0,
  );
  returnLoads[bestIdx].isRecommended = true;

  returnLoads.sort((a, b) => b.matchScore - a.matchScore);

  return returnLoads;
}

export function calculateOptimization(
  input: TruckInput,
  selectedLoad: LoadSuggestion,
): OptimizationResult {
  const directDistance = 100 + Math.floor(Math.random() * 400);
  const emptyDistanceReduced = 55 + Math.floor(Math.random() * 30);
  const fuelSaved = Math.floor(selectedLoad.distance * 2.5 + emptyDistanceReduced * 15);
  const truckUtilization = Math.min(95, input.capacity + 10 + Math.floor(Math.random() * 15));

  return {
    emptyDistanceReduced,
    fuelSaved,
    truckUtilization,
    estimatedProfit: selectedLoad.estimatedProfit,
  };
}
