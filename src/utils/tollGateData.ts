
interface TollGate {
  name: string;
  location: string;
  speedLimit: number;
  coordinates: [number, number];
}

interface TollGateDistance {
  from: string;
  to: string;
  distanceKm: number;
  speedLimitKmh: number;
}

// Dubai toll gates information with locations and coordinates
export const tollGates: Record<string, TollGate> = {
  "Al Safa South": { 
    name: "Al Safa South", 
    location: "Sheikh Zayed Road", 
    speedLimit: 100,
    coordinates: [25.1854, 55.2444]
  },
  "Al Safa North": { 
    name: "Al Safa North", 
    location: "Sheikh Zayed Road", 
    speedLimit: 100,
    coordinates: [25.1854, 55.2468]
  },
  "Al Safa": { 
    name: "Al Safa", 
    location: "Sheikh Zayed Road", 
    speedLimit: 100,
    coordinates: [25.1854, 55.2444]
  },
  "Al Barsha": { 
    name: "Al Barsha", 
    location: "Sheikh Zayed Road", 
    speedLimit: 100,
    coordinates: [25.1124, 55.1836]
  },
  "Jebel Ali": { 
    name: "Jebel Ali", 
    location: "Sheikh Zayed Road", 
    speedLimit: 100,
    coordinates: [24.9896, 55.0637]
  },
  "Jebel Ali Toll Gate": { 
    name: "Jebel Ali Toll Gate", 
    location: "Sheikh Zayed Road", 
    speedLimit: 100,
    coordinates: [24.9896, 55.0637]
  },
  "Al Garhoud Bridge": { 
    name: "Al Garhoud Bridge", 
    location: "Dubai Creek", 
    speedLimit: 80,
    coordinates: [25.2295, 55.3429]
  },
  "Al Garhoud New Bridge": { 
    name: "Al Garhoud New Bridge", 
    location: "Dubai Creek", 
    speedLimit: 80,
    coordinates: [25.2295, 55.3429]
  },
  "Al Maktoum Bridge": { 
    name: "Al Maktoum Bridge", 
    location: "Dubai Creek", 
    speedLimit: 80,
    coordinates: [25.2294, 55.3251]
  },
  "Business Bay Crossing": { 
    name: "Business Bay Crossing", 
    location: "Business Bay", 
    speedLimit: 100,
    coordinates: [25.2100, 55.3330]
  },
  "Al Mamzar South": { 
    name: "Al Mamzar South", 
    location: "Al Ittihad Road", 
    speedLimit: 80,
    coordinates: [25.2970, 55.3421]
  },
  "Al Mamzar North": { 
    name: "Al Mamzar North", 
    location: "Al Ittihad Road", 
    speedLimit: 80,
    coordinates: [25.3022, 55.3474]
  },
  "Al Mamzar": { 
    name: "Al Mamzar", 
    location: "Al Ittihad Road", 
    speedLimit: 80,
    coordinates: [25.2970, 55.3421]
  },
  "Airport Tunnel": { 
    name: "Airport Tunnel", 
    location: "Airport Road", 
    speedLimit: 80,
    coordinates: [25.2500, 55.3520]
  }
};

// Distances between toll gates in kilometers with speed limits
export const tollGateDistances: TollGateDistance[] = [
  { from: "Al Safa", to: "Al Barsha", distanceKm: 10.39, speedLimitKmh: 100 },
  { from: "Al Barsha", to: "Jebel Ali", distanceKm: 17.96, speedLimitKmh: 100 },
  { from: "Jebel Ali", to: "Al Barsha", distanceKm: 17.96, speedLimitKmh: 100 },
  { from: "Al Barsha", to: "Al Safa", distanceKm: 10.39, speedLimitKmh: 100 },
  { from: "Al Garhoud Bridge", to: "Al Maktoum Bridge", distanceKm: 5.2, speedLimitKmh: 80 },
  { from: "Al Maktoum Bridge", to: "Al Garhoud Bridge", distanceKm: 5.2, speedLimitKmh: 80 },
  { from: "Al Garhoud Bridge", to: "Business Bay Crossing", distanceKm: 7.8, speedLimitKmh: 80 },
  { from: "Business Bay Crossing", to: "Al Garhoud Bridge", distanceKm: 7.8, speedLimitKmh: 80 },
  { from: "Business Bay Crossing", to: "Al Safa", distanceKm: 6.5, speedLimitKmh: 100 },
  { from: "Al Safa", to: "Business Bay Crossing", distanceKm: 6.5, speedLimitKmh: 100 },
  { from: "Al Safa North", to: "Al Safa South", distanceKm: 1.5, speedLimitKmh: 100 },
  { from: "Al Safa South", to: "Al Safa North", distanceKm: 1.5, speedLimitKmh: 100 },
  { from: "Al Barsha", to: "Al Safa North", distanceKm: 10.39, speedLimitKmh: 100 },
  { from: "Al Safa North", to: "Al Barsha", distanceKm: 10.39, speedLimitKmh: 100 },
  { from: "Al Barsha", to: "Jebel Ali Toll Gate", distanceKm: 17.96, speedLimitKmh: 100 },
  { from: "Jebel Ali Toll Gate", to: "Al Barsha", distanceKm: 17.96, speedLimitKmh: 100 },
  { from: "Al Maktoum Bridge", to: "Al Garhoud New Bridge", distanceKm: 5.2, speedLimitKmh: 80 },
  { from: "Al Garhoud New Bridge", to: "Al Maktoum Bridge", distanceKm: 5.2, speedLimitKmh: 80 },
  { from: "Business Bay Crossing", to: "Al Garhoud New Bridge", distanceKm: 7.8, speedLimitKmh: 80 },
  { from: "Al Garhoud New Bridge", to: "Business Bay Crossing", distanceKm: 7.8, speedLimitKmh: 80 },
  { from: "Al Mamzar North", to: "Al Mamzar South", distanceKm: 1.2, speedLimitKmh: 80 },
  { from: "Al Mamzar South", to: "Al Mamzar North", distanceKm: 1.2, speedLimitKmh: 80 }
];

// New function to get the road segment details from the gate pairs
export const getRoadSegmentDetails = (fromGate: string, toGate: string): { 
  roadName: string, 
  speedLimit: number
} => {
  // Match gate pairs to the known routes in the provided table
  if ((fromGate.includes("Al Safa") && toGate.includes("Al Barsha")) || 
      (fromGate.includes("Al Barsha") && toGate.includes("Al Safa"))) {
    return {
      roadName: "Sheikh Zayed Road (E11)",
      speedLimit: 100
    };
  }
  
  if ((fromGate.includes("Jebel Ali") && (toGate.includes("Al Barsha") || toGate.includes("Al Safa"))) || 
      ((toGate.includes("Jebel Ali") && (fromGate.includes("Al Barsha") || fromGate.includes("Al Safa"))))) {
    return {
      roadName: "Sheikh Zayed Road (E11)",
      speedLimit: 100
    };
  }
  
  if ((fromGate.includes("Al Garhoud") && toGate.includes("Airport")) || 
      (toGate.includes("Al Garhoud") && fromGate.includes("Airport"))) {
    return {
      roadName: "D89/D91",
      speedLimit: 80
    };
  }
  
  if ((fromGate.includes("Al Maktoum Bridge") || fromGate.includes("Floating Bridge")) && 
      (toGate.includes("Al Garhoud") || toGate.includes("Business Bay"))) {
    return {
      roadName: "Umm Hurair Road (D79)",
      speedLimit: 80
    };
  }
  
  if ((fromGate.includes("Business Bay") && (toGate.includes("Festival City") || toGate.includes("Deira"))) || 
      ((toGate.includes("Business Bay") && (fromGate.includes("Festival City") || fromGate.includes("Deira"))))) {
    return {
      roadName: "Ras Al Khor Road (E44)",
      speedLimit: 100
    };
  }
  
  if ((fromGate.includes("Al Mamzar") && (toGate.includes("Al Garhoud") || toGate.includes("Airport"))) || 
      ((toGate.includes("Al Mamzar") && (fromGate.includes("Al Garhoud") || fromGate.includes("Airport"))))) {
    return {
      roadName: "Al Ittihad Road (E11)",
      speedLimit: 80
    };
  }
  
  if (fromGate.includes("Al Mamzar") && toGate.includes("Al Mamzar")) {
    return {
      roadName: "Al Ittihad Road (E11)",
      speedLimit: 80
    };
  }
  
  // Default for unknown combinations
  const predefinedDistance = tollGateDistances.find(d => d.from === fromGate && d.to === toGate);
  if (predefinedDistance) {
    return {
      roadName: "Unknown Road",
      speedLimit: predefinedDistance.speedLimitKmh
    };
  }
  
  // Fallback for unknown combinations
  return {
    roadName: "Unknown Road",
    speedLimit: 80  // Default speed limit
  };
};
