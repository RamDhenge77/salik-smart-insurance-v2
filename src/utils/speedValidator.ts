
// Realistic speed thresholds for Dubai roads (km/h)
const MIN_REALISTIC_SPEED = 20; // Minimum realistic city driving speed
const MAX_REALISTIC_SPEED = 150; // Maximum realistic highway speed (reduced from 160)

// Minimum realistic time between toll gates (in hours)
// ~2 minutes for short distances
const MIN_REALISTIC_TIME = 0.03;

/**
 * Check if the calculated speed is realistic based on Dubai road conditions
 * @param speed Speed in km/h
 * @param distance Distance in km
 * @param timeHours Time in hours
 * @returns Boolean indicating if the speed is realistic
 */
export function isRealisticSpeed(speed: number, distance: number, timeHours: number): boolean {
  // For extremely short distances, we use a lower minimum speed
  // to account for potential time recording issues or slow traffic
  const minRealisticSpeed = distance < 2 ? 15 : MIN_REALISTIC_SPEED;
  
  if (speed < minRealisticSpeed) {
    // console.log(`Filtering out unrealistically low speed: ${speed.toFixed(1)} km/h`);
    return false;
  }
  
  if (speed > MAX_REALISTIC_SPEED) {
    // console.log(`Filtering out unrealistically high speed: ${speed.toFixed(1)} km/h`);
    return false;
  }
  
  // Special case for very short distances
  // Allow higher speeds for very short distances if the time is also very short
  if (distance < 2 && speed > 120 && timeHours < 0.1) {
    // console.log(`Allowing high speed ${speed.toFixed(1)} km/h for short distance ${distance.toFixed(1)}km due to short time`);
    return true;
  }
  
  // For highways (longer distances), enforce higher minimum speeds
  if (distance > 10 && speed < 40) {
    // console.log(`Filtering out unrealistically low highway speed: ${speed.toFixed(1)} km/h over ${distance.toFixed(1)}km`);
    return false;
  }
  
  // For very short time differences, be skeptical about longer distances
  if (timeHours < MIN_REALISTIC_TIME && distance > 3) {
    // console.log(`Filtering out unrealistic travel time: ${(timeHours * 60).toFixed(1)} minutes for ${distance.toFixed(1)}km`);
    return false;
  }
  
  // For long distances, calculate if the average speed is reasonable
  if (distance > 15) {
    // Max 120 km/h (reduced from 140 to be more conservative)
    const expectedMinTime = distance / 120; 
    // Min 40 km/h
    const expectedMaxTime = distance / 40;  
    
    if (timeHours < expectedMinTime * 0.9) { // 10% buffer for faster speeds
      // console.log(`Filtering out unrealistically fast time: ${(timeHours * 60).toFixed(1)} minutes for ${distance.toFixed(1)}km`);
      return false;
    }
    
    if (timeHours > expectedMaxTime * 1.4) { // 40% buffer for slower speeds (traffic)
      // console.log(`Filtering out unrealistically slow time: ${(timeHours * 60).toFixed(1)} minutes for ${distance.toFixed(1)}km`);
      return false;
    }
  }
  
  return true;
}
