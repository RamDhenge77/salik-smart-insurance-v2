
import { getDistanceBetweenGates } from './distanceCalculator';
import { formatTimeToHours, formatTripDate } from './timeUtils';
import { isRealisticSpeed } from './speedValidator';
import { TripData } from '@/components/FileUploader';

export interface SpeedCalculationResult {
  date: string;
  startTime: string;
  endTime: string;
  fromGate: string;
  middleGate?: string;
  toGate: string;
  distanceKm: number;
  timeHours: number;
  speedKmh: number;
  speedLimitKmh: number;
  roadName?: string;
  withinLimit: boolean;
  speedStatus: 'Within Limit' | 'Over Speed';
}

export const analyzeTripSpeeds = async (trips: TripData[]): Promise<SpeedCalculationResult[]> => {
  const results: SpeedCalculationResult[] = [];
  console.log("Starting speed analysis...",trips);
  
  if (!trips || trips.length < 2) {
    console.log("Not enough trip data to analyze speeds");
    return results;
  }
  
  console.log(`Starting speed analysis with ${trips.length} trips`);
  
  // Create a deep copy of trips and ensure all properties exist
  const validTrips = trips.filter(trip => 
    trip && trip.trip_date && trip.trip_time && trip.toll_gate
  );
  
  if (validTrips.length < 2) {
    console.log("Not enough valid trip data after filtering invalid entries");
    return results;
  }
  
  // Sort the trips by date and time (consistently)
  const sortedTrips = [...validTrips].sort((a, b) => {
    const dateA = new Date(a.date).getTime();
    const dateB = new Date(b.date).getTime();
    
    if (dateA !== dateB) return dateA - dateB;
    
    // Parse time consistently (handles both HH:MM and HH:MM:SS formats)
    const timePartsA = a.time.split(':').map(Number);
    const timePartsB = b.time.split(':').map(Number);
    
    const hoursA = timePartsA[0] || 0;
    const minutesA = timePartsA[1] || 0;
    const secondsA = timePartsA[2] || 0;
    
    const hoursB = timePartsB[0] || 0;
    const minutesB = timePartsB[1] || 0;
    const secondsB = timePartsB[2] || 0;
    
    // Compare hours first
    if (hoursA !== hoursB) return hoursA - hoursB;
    // If hours are equal, compare minutes
    if (minutesA !== minutesB) return minutesA - minutesB;
    // If minutes are also equal, compare seconds
    return secondsA - secondsB;
  });

  console.log(`Sorted ${sortedTrips.length} trips for analysis`);
  
  // Group trips by date to easily find consecutive trips on the same day
  const tripsByDate: Record<string, TripData[]> = {};
  sortedTrips.forEach(trip => {
    if (!tripsByDate[trip.trip_date]) {
      tripsByDate[trip.trip_date] = [];
    }
    tripsByDate[trip.trip_date].push(trip);
  });

  // Process each date separately
  for (const [date, dateTrips] of Object.entries(tripsByDate)) {
    console.log(`Processing ${dateTrips.length} trips on ${date}`);
    
    // If there's only one trip on this date, we can't calculate speed
    if (dateTrips.length < 2) continue;
    
    // Process consecutive trip pairs on the same date
    for (let i = 0; i < dateTrips.length - 1; i++) {
      const trip1 = dateTrips[i];
      const trip2 = dateTrips[i + 1];

      // Skip if same toll gate
      if (trip1.toll_gate === trip2.toll_gate) {
        continue;
      }

      try {
        console.log(`Calculating distance between ${trip1.toll_gate} and ${trip2.toll_gate}`);
        const distance = await getDistanceBetweenGates(trip1.toll_gate, trip2.toll_gate);
        
        if (distance) {
          console.log(`Distance: ${distance.distanceKm.toFixed(2)} km, Speed limit: ${distance.speedLimitKmh} km/h`);
          const timeHours = formatTimeToHours(trip1.trip_time, trip2.trip_time);
          console.log(`Time difference: ${(timeHours * 60).toFixed(1)} minutes`);
          
          // Skip if time difference is too small (less than 2 minutes) - unrealistic for different gates
          if (timeHours < 0.03) {
            console.log(`Skipping due to unrealistically small time difference: ${(timeHours * 60).toFixed(1)} minutes`);
            continue;
          }
          
          // Skip if time difference is too large (more than 1 hour) - likely not part of the same journey
          if (timeHours > 1) {
            console.log(`Skipping due to large time gap: ${timeHours.toFixed(1)} hours`);
            continue;
          }
          
          // Calculate speed
          const speedKmh = distance.distanceKm / timeHours;
          
          console.log(`Calculated speed: ${speedKmh.toFixed(1)} km/h`);
          
          if (isRealisticSpeed(speedKmh, distance.distanceKm, timeHours)) {
            // Check if within speed limit (with 10% margin for error)
            const withinLimit = speedKmh <= distance.speedLimitKmh * 1.1;
            
            let speedStatus: 'Within Limit' | 'Over Speed' = 'Within Limit';
            if (!withinLimit) {
              speedStatus = 'Over Speed';
            }
            
            results.push({
              date: formatTripDate(trip1.date),
              startTime: trip1.time,
              endTime: trip2.time,
              fromGate: trip1.toll_gate,
              toGate: trip2.toll_gate,
              distanceKm: distance.distanceKm,
              timeHours,
              speedKmh,
              speedLimitKmh: distance.speedLimitKmh,
              roadName: distance.roadName,
              withinLimit,
              speedStatus
            });
            
            console.log(`Added speed result: ${speedKmh.toFixed(1)} km/h (limit: ${distance.speedLimitKmh} km/h) - ${speedStatus}`);
          }
        }
      } catch (error) {
        console.error(`Error processing trips on ${trip1.date}:`, error);
      }
    }

    // Also check for potential non-consecutive trips that might be part of the same journey
    // but only for trips within a reasonable time window (30 minutes)
    for (let i = 0; i < dateTrips.length - 2; i++) {
      for (let j = i + 2; j < dateTrips.length && j <= i + 3; j++) {
        const trip1 = dateTrips[i];
        const trip2 = dateTrips[j];
        
        // Skip if same toll gate
        if (trip1.toll_gate === trip2.toll_gate) {
          continue;
        }

        try {
          // Get the time difference
          const timeHours = formatTimeToHours(trip1.time, trip2.time);
          
          // Only consider trips within 30 minutes of each other
          if (timeHours > 0.5) {
            continue;
          }
          
          // Get the distance between these gates
          const distance = await getDistanceBetweenGates(trip1.toll_gate, trip2.toll_gate);
          
          if (distance) {
            // Calculate speed
            const speedKmh = distance.distanceKm / timeHours;
            
            // Only add if it's a reasonable speed
            if (isRealisticSpeed(speedKmh, distance.distanceKm, timeHours)) {
              const withinLimit = speedKmh <= distance.speedLimitKmh * 1.1;
              
              // Check that we don't already have an entry for this route and time
              const isDuplicate = results.some(r => 
                r.fromGate === trip1.toll_gate && 
                r.toGate === trip2.toll_gate && 
                r.startTime === trip1.time
              );
              
              if (!isDuplicate) {
                results.push({
                  date: formatTripDate(trip1.date),
                  startTime: trip1.time,
                  endTime: trip2.time,
                  fromGate: trip1.toll_gate,
                  toGate: trip2.toll_gate,
                  distanceKm: distance.distanceKm,
                  timeHours,
                  speedKmh,
                  speedLimitKmh: distance.speedLimitKmh,
                  roadName: distance.roadName,
                  withinLimit,
                  speedStatus: withinLimit ? 'Within Limit' : 'Over Speed'
                });
                
                console.log(`Added non-consecutive speed result: ${speedKmh.toFixed(1)} km/h (limit: ${distance.speedLimitKmh} km/h)`);
              }
            }
          }
        } catch (error) {
          // Just continue if there's an error with this pair
        }
      }
    }
  }

  // Sort results by date (newest first) to ensure consistent display
  results.sort((a, b) => {
    const dateA = new Date(a.date).getTime();
    const dateB = new Date(b.date).getTime();
    
    if (dateA !== dateB) return dateB - dateA;
    
    // If same date, sort by start time
    return a.startTime.localeCompare(b.startTime);
  });

  console.log(`Found ${results.length} valid speed calculation results after filtering`);
  return results;
};

// Helper function to calculate average speed for trips (used for analytics)
export const calculateAverageSpeed = (results: SpeedCalculationResult[]): number => {
  if (!results || results.length === 0) return 0;
  return results.reduce((sum, result) => sum + result.speedKmh, 0) / results.length;
};

export const calculateAverageSpeed2 = (results: SpeedCalculationResult[]): number => {
  if (!results || results.length === 0) return 0;

  const total = results.reduce((sum, result) => {
    const speed = Number(result.avg_speed);
    return sum + (isNaN(speed) ? 0 : speed);
  }, 0);

  return total / results.length;
};

export { formatTripDate } from './timeUtils';


export const tripSpeedAnalysis = async (trips: TripData[]): Promise<SpeedCalculationResult[]> => {
  const results: SpeedCalculationResult[] = [];
  console.log("Starting speed analysis...",trips);
  
  if (!trips || trips.length < 2) {
    console.log("Not enough trip data to analyze speeds");
    return results;
  }
  
  console.log(`Starting speed analysis with ${trips.length} trips`);
  
  // Create a deep copy of trips and ensure all properties exist
  const validTrips = trips.filter(trip => 
    trip && trip.start_time && trip.end_time && trip.route
  );
  
  if (validTrips.length < 2) {
    console.log("Not enough valid trip data after filtering invalid entries");
    return results;
  }
  
  // Sort the trips by date and time (consistently)
  const sortedTrips = [...validTrips].sort((a, b) => {
    const dateA = new Date(a.date).getTime();
    const dateB = new Date(b.date).getTime();
    
    if (dateA !== dateB) return dateA - dateB;
    
    // Parse time consistently (handles both HH:MM and HH:MM:SS formats)
    const timePartsA = a.duration.split(':').map(Number);
    const timePartsB = b.duration.split(':').map(Number);
    
    const hoursA = timePartsA[0] || 0;
    const minutesA = timePartsA[1] || 0;
    const secondsA = timePartsA[2] || 0;
    
    const hoursB = timePartsB[0] || 0;
    const minutesB = timePartsB[1] || 0;
    const secondsB = timePartsB[2] || 0;
    
    // Compare hours first
    if (hoursA !== hoursB) return hoursA - hoursB;
    // If hours are equal, compare minutes
    if (minutesA !== minutesB) return minutesA - minutesB;
    // If minutes are also equal, compare seconds
    return secondsA - secondsB;
  });

  console.log(`Sorted ${sortedTrips.length} trips for analysis`);
  
  // Group trips by date to easily find consecutive trips on the same day
  const tripsByDate: Record<string, TripData[]> = {};
  sortedTrips.forEach(trip => {
    if (!tripsByDate[trip.date]) {
      tripsByDate[trip.date] = [];
    }
    tripsByDate[trip.date].push(trip);
  });

  // Process each date separately
  for (const [date, dateTrips] of Object.entries(tripsByDate)) {
    console.log(`Processing ${dateTrips.length} trips on ${date}`);
    
    // If there's only one trip on this date, we can't calculate speed
    if (dateTrips.length < 2) continue;
    
    // Process consecutive trip pairs on the same date
    for (let i = 0; i < dateTrips.length - 1; i++) {
      const trip1 = dateTrips[i];
      const trip2 = dateTrips[i + 1];

      // Skip if same toll gate
      if (trip1.route === trip2.route) {
        continue;
      }

      try {
        console.log(`Calculating distance between ${trip1.route} and ${trip2.route}`);
        const distance = await getDistanceBetweenGates(trip1.distance_, trip2.distance_);
        
        if (distance) {
          console.log(`Distance: ${distance.distanceKm.toFixed(2)} km, Speed limit: ${distance.speedLimitKmh} km/h`);
          const timeHours = formatTimeToHours(trip1.duration, trip2.duration);
          console.log(`Time difference: ${(timeHours * 60).toFixed(1)} minutes`);
          
          // Skip if time difference is too small (less than 2 minutes) - unrealistic for different gates
          if (timeHours < 0.03) {
            console.log(`Skipping due to unrealistically small time difference: ${(timeHours * 60).toFixed(1)} minutes`);
            continue;
          }
          
          // Skip if time difference is too large (more than 1 hour) - likely not part of the same journey
          if (timeHours > 1) {
            console.log(`Skipping due to large time gap: ${timeHours.toFixed(1)} hours`);
            continue;
          }
          
          // Calculate speed
          const speedKmh = distance.distanceKm / timeHours;
          
          console.log(`Calculated speed: ${speedKmh.toFixed(1)} km/h`);
          
          if (isRealisticSpeed(speedKmh, distance.distanceKm, timeHours)) {
            // Check if within speed limit (with 10% margin for error)
            const withinLimit = speedKmh <= distance.speedLimitKmh * 1.1;
            
            let speedStatus: 'Within Limit' | 'Over Speed' = 'Within Limit';
            if (!withinLimit) {
              speedStatus = 'Over Speed';
            }
            
            results.push({
              date: formatTripDate(trip1.date),
              startTime: trip1.duration,
              endTime: trip2.duration,
              fromGate: trip1.route,
              toGate: trip2.route,
              distanceKm: distance.distanceKm,
              timeHours,
              speedKmh,
              speedLimitKmh: distance.speedLimitKmh,
              roadName: distance.roadName,
              withinLimit,
              speedStatus
            });
            
            console.log(`Added speed result: ${speedKmh.toFixed(1)} km/h (limit: ${distance.speedLimitKmh} km/h) - ${speedStatus}`);
          }
        }
      } catch (error) {
        console.error(`Error processing trips on ${trip1.date}:`, error);
      }
    }

    // Also check for potential non-consecutive trips that might be part of the same journey
    // but only for trips within a reasonable time window (30 minutes)
    for (let i = 0; i < dateTrips.length - 2; i++) {
      for (let j = i + 2; j < dateTrips.length && j <= i + 3; j++) {
        const trip1 = dateTrips[i];
        const trip2 = dateTrips[j];
        
        // Skip if same toll gate
        if (trip1.route === trip2.route) {
          continue;
        }

        try {
          // Get the time difference
          const timeHours = formatTimeToHours(trip1.duration, trip2.duration);
          
          // Only consider trips within 30 minutes of each other
          if (timeHours > 0.5) {
            continue;
          }
          
          // Get the distance between these gates
          const distance = await getDistanceBetweenGates(trip1.distance_, trip2.distance_);
          
          if (distance) {
            // Calculate speed
            const speedKmh = distance.distanceKm / timeHours;
            
            // Only add if it's a reasonable speed
            if (isRealisticSpeed(speedKmh, distance.distanceKm, timeHours)) {
              const withinLimit = speedKmh <= distance.speedLimitKmh * 1.1;
              
              // Check that we don't already have an entry for this route and time
              const isDuplicate = results.some(r => 
                r.fromGate === trip1.route && 
                r.toGate === trip2.route && 
                r.startTime === trip1.start_time
              );
              
              if (!isDuplicate) {
                results.push({
                  date: formatTripDate(trip1.date),
                  startTime: trip1.duration,
                  endTime: trip2.duration,
                  fromGate: trip1.route,
                  toGate: trip2.route,
                  distanceKm: distance.distanceKm,
                  timeHours,
                  speedKmh,
                  speedLimitKmh: distance.speedLimitKmh,
                  roadName: distance.roadName,
                  withinLimit,
                  speedStatus: withinLimit ? 'Within Limit' : 'Over Speed'
                });
                
                console.log(`Added non-consecutive speed result: ${speedKmh.toFixed(1)} km/h (limit: ${distance.speedLimitKmh} km/h)`);
              }
            }
          }
        } catch (error) {
          // Just continue if there's an error with this pair
        }
      }
    }
  }

  // Sort results by date (newest first) to ensure consistent display
  results.sort((a, b) => {
    const dateA = new Date(a.date).getTime();
    const dateB = new Date(b.date).getTime();
    
    if (dateA !== dateB) return dateB - dateA;
    
    // If same date, sort by start time
    return a.startTime.localeCompare(b.startTime);
  });

  console.log(`Found ${results.length} valid speed calculation results after filtering`);
  return results;
};