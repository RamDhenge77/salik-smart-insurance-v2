
import { format } from 'date-fns';

export const formatTimeToHours = (time1: string, time2: string): number => {
  try {
    // Handle cases where time might not be properly formatted
    if (!time1 || !time2 || time1 === '00:00' || time2 === '00:00') {
      console.warn(`Warning: Invalid time values detected - time1: "${time1}", time2: "${time2}"`);
      // Return a reasonable default difference to avoid calculation issues
      return 0.25; // 15 minutes
    }

    // Parse the times
    const [hours1, minutes1] = time1.split(':').map(Number);
    const [hours2, minutes2] = time2.split(':').map(Number);
    
    // Check for NaN values that might cause issues
    if (isNaN(hours1) || isNaN(minutes1) || isNaN(hours2) || isNaN(minutes2)) {
      console.warn(`Warning: Time parsing resulted in NaN - h1:${hours1}, m1:${minutes1}, h2:${hours2}, m2:${minutes2}`);
      return 0.25; // 15 minutes as fallback
    }
    
    // Calculate total minutes for each time
    const totalMinutes1 = hours1 * 60 + minutes1;
    const totalMinutes2 = hours2 * 60 + minutes2;
    
    let diffMinutes = totalMinutes2 - totalMinutes1;
    
    // Handle crossing midnight (when second time is earlier in the day than first time)
    if (diffMinutes < 0) {
      // Add 24 hours worth of minutes
      diffMinutes += 24 * 60;
    }
    
    // Add a small buffer to prevent zero time differences
    if (diffMinutes < 0.6) { // Less than 36 seconds
      diffMinutes = 0.6; // Set to minimum of 0.01 hours (36 seconds)
    }
    
    // Convert minutes back to hours
    return diffMinutes / 60;
  } catch (error) {
    console.error('Error calculating time difference:', error, time1, time2);
    return 0.25; // Return a small default value instead of 0
  }
};

export const formatTripDate = (dateString: string): string => {
  try {
    const parsedDate = new Date(dateString);
    return format(parsedDate, 'dd MMM yy');
  } catch (error) {
    console.error('Error formatting date:', error);
    return dateString; // Fallback to original string if formatting fails
  }
};

export const formatDuration = (hours: number): string => {
  const totalMinutes = Math.round(hours * 60);
  const hrs = Math.floor(totalMinutes / 60);
  const mins = totalMinutes % 60;
  return `${String(hrs).padStart(2, '0')}:${String(mins).padStart(2, '0')}`;
};
