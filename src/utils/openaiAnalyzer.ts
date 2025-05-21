
// This file is no longer needed as we're using pre-defined distances
export interface TollGateAnalysis {
  distance: number;
  estimatedTime: number;
  speedLimit: number;
  recommendations: string[];
}

export const analyzeGateDistance = async (
  fromGate: string,
  toGate: string,
  apiKey: string
): Promise<TollGateAnalysis> => {
  // Return conservative estimates since this function is deprecated
  return {
    distance: 5,
    estimatedTime: 15,
    speedLimit: 80,
    recommendations: ["Using pre-defined distances instead of AI analysis."]
  };
};
