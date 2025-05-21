
import { tollGates, tollGateDistances, getRoadSegmentDetails } from './tollGateData';

interface TollGateDistance {
  from: string;
  to: string;
  distanceKm: number;
  speedLimitKmh: number;
  roadName?: string;
}

// Helper function to calculate distance between two coordinates using Haversine formula
function calculateDistance(coord1: [number, number], coord2: [number, number]): number {
  const toRad = (value: number) => (value * Math.PI) / 180;
  const R = 6371; // Earth's radius in km
  
  const dLat = toRad(coord2[0] - coord1[0]);
  const dLon = toRad(coord2[1] - coord1[1]);
  
  const a = 
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(coord1[0])) * Math.cos(toRad(coord2[0])) * 
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

// Normalize gate names to handle variations in naming
const normalizeGateName = (gateName: string): string => {
  const name = gateName.toLowerCase();
  
  if (name.includes("al safa") || name.includes("safa")) {
    return "Al Safa";
  }
  if (name.includes("al barsha") || name.includes("barsha")) {
    return "Al Barsha";
  }
  if (name.includes("jebel ali") || name.includes("jebel")) {
    return "Jebel Ali";
  }
  if (name.includes("al garhoud") || name.includes("garhoud")) {
    if (name.includes("new")) {
      return "Al Garhoud New Bridge";
    }
    return "Al Garhoud Bridge";
  }
  if (name.includes("al maktoum") || name.includes("maktoum")) {
    return "Al Maktoum Bridge";
  }
  if (name.includes("business bay") || name.includes("business")) {
    return "Business Bay Crossing";
  }
  if (name.includes("al mamzar") || name.includes("mamzar")) {
    if (name.includes("north")) {
      return "Al Mamzar North";
    }
    if (name.includes("south")) {
      return "Al Mamzar South";
    }
    return "Al Mamzar";
  }
  if (name.includes("airport")) {
    return "Airport Tunnel";
  }
  
  return gateName; // Return original if no match
};

// Find a predefined distance between two toll gates
const findPredefinedDistance = (fromGate: string, toGate: string): TollGateDistance | null => {
  // Normalize gate names
  const normalizedFromGate = normalizeGateName(fromGate);
  const normalizedToGate = normalizeGateName(toGate);
  
  // First try exact match
  const exactMatch = tollGateDistances.find(d => 
    d.from === normalizedFromGate && d.to === normalizedToGate
  );
  
  if (exactMatch) {
    return exactMatch;
  }
  
  // Try to find routes with these gates in either direction
  const anyMatch = tollGateDistances.find(d => 
    (d.from === normalizedFromGate && d.to === normalizedToGate) || 
    (d.from === normalizedToGate && d.to === normalizedFromGate)
  );
  
  if (anyMatch) {
    // Return the original or swap from/to if needed
    if (anyMatch.from === normalizedFromGate) {
      return anyMatch;
    } else {
      return {
        from: normalizedToGate,
        to: normalizedFromGate,
        distanceKm: anyMatch.distanceKm,
        speedLimitKmh: anyMatch.speedLimitKmh
      };
    }
  }
  
  return null;
};

// Get the distance between two toll gates using their coordinates
export const getDistanceBetweenGates = async (fromGate: string, toGate: string): Promise<TollGateDistance | null> => {
  // First check if we have a predefined distance
  const predefinedDistance = findPredefinedDistance(fromGate, toGate);
  
  if (predefinedDistance) {
    // Add road segment details
    const roadSegment = getRoadSegmentDetails(fromGate, toGate);
    return {
      ...predefinedDistance,
      roadName: roadSegment.roadName
    };
  }
  
  // Normalize gate names for lookup
  const normalizedFromGate = normalizeGateName(fromGate);
  const normalizedToGate = normalizeGateName(toGate);
  
  // Get coordinates for both gates
  const fromGateData = tollGates[normalizedFromGate] || tollGates[fromGate];
  const toGateData = tollGates[normalizedToGate] || tollGates[toGate];
  
  if (!fromGateData || !toGateData) {
    console.warn(`Could not find coordinates for gates: ${fromGate} or ${toGate}`);
    const roadSegment = getRoadSegmentDetails(fromGate, toGate);
    
    // For unknown gate combinations, make reasonable estimates based on typical Dubai road network
    // Sheikh Zayed Road distance between gates is typically 8-20km
    // Creek crossings are typically 2-8km
    
    let estimatedDistance = 10; // Default conservative estimate
    
    // If one gate is a bridge and one is not, it's likely a creek crossing
    const isBridge1 = fromGate.toLowerCase().includes('bridge');
    const isBridge2 = toGate.toLowerCase().includes('bridge');
    
    if (isBridge1 !== isBridge2) {
      estimatedDistance = 5; // Conservative estimate for creek crossings
    } else if (fromGate.includes('Al Safa') && toGate.includes('Al Barsha') || 
               fromGate.includes('Al Barsha') && toGate.includes('Al Safa')) {
      estimatedDistance = 10.4; // Specific common route
    } else if (fromGate.includes('Jebel Ali') || toGate.includes('Jebel Ali')) {
      estimatedDistance = 18; // Jebel Ali is farther out
    }
    
    return {
      from: fromGate,
      to: toGate,
      distanceKm: estimatedDistance,
      speedLimitKmh: roadSegment.speedLimit,
      roadName: roadSegment.roadName
    };
  }
  
  // Calculate direct distance using coordinates
  const directDistance = calculateDistance(fromGateData.coordinates, toGateData.coordinates);
  
  // Road distances are typically 20-30% longer than direct distances due to road curvature
  const roadDistance = directDistance * 1.25;
  
  // Get road segment details
  const roadSegment = getRoadSegmentDetails(fromGate, toGate);
  
  return {
    from: fromGate,
    to: toGate,
    distanceKm: roadDistance,
    speedLimitKmh: roadSegment.speedLimit,
    roadName: roadSegment.roadName
  };
};
