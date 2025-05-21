import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { TripData } from "./FileUploader";
import TripDetailsDialog from "./TripDetailsDialog";
import { useToast } from "@/hooks/use-toast";
import { RiskThresholds } from "./RiskFactorConfig";
import {
  analyzeTripSpeeds,
  SpeedCalculationResult,
} from "@/utils/speedCalculator";
import { useCarContext } from "@/context/Context";

interface InsuranceAdjustmentProps {
  tripData: TripData[];
  riskThresholds?: RiskThresholds;
}

interface RiskFactor {
  parameter: string;
  observation: string;
  risk: "Very Low" | "Low" | "Medium" | "High" | "Very High";
  adjustment: number;
  drillDownData?: {
    title: string;
    trips?: TripData[];
    breakdowns?: { label: string; value: string | number }[];
  };
}

const InsuranceAdjustment: React.FC<InsuranceAdjustmentProps> = ({
  tripData,
  riskThresholds,
}) => {
  const [selectedTrips, setSelectedTrips] = useState<TripData[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogTitle, setDialogTitle] = useState("");
  const [showBreakdown, setShowBreakdown] = useState<
    { label: string; value: string | number }[]
  >([]);
  const [speedResults, setSpeedResults] = useState<SpeedCalculationResult[]>(
    []
  );
  const { toast } = useToast();
  const { analysis, tripDataAll } = useCarContext();

  // Calculate speed results when trip data changes
  useEffect(() => {
    const getSpeedResults = async () => {
      // console.log("Calculating speed results for insurance adjustment from", tripData.length, "trips");
      if (tripDataAll.length === 0) return;

      try {
        const results = await analyzeTripSpeeds(tripDataAll);
        setSpeedResults(results);
        // console.log("Speed results set for insurance adjustment:", results.length);
      } catch (error) {
        console.error("Error analyzing trip speeds:", error);
      }
    };

    getSpeedResults();
  }, [tripDataAll]);

  // Use risk thresholds from props, ensuring they're deeply cloned to avoid reference issues
  const currentThresholds = React.useMemo(() => {
    // Deep clone the provided thresholds to avoid reference modification issues
    return riskThresholds ? JSON.parse(JSON.stringify(riskThresholds)) : null;
  }, [riskThresholds]);

  // Debug the risk thresholds
  // useEffect(() => {
  //   if (currentThresholds) {
  //     console.log("Using risk thresholds from settings:", currentThresholds);
  //   } else {
  //     console.log("No risk thresholds provided, will use defaults");
  //   }
  // }, [currentThresholds]);

  // Calculate risk factors based on trip data and thresholds
  const riskFactors = React.useMemo((): RiskFactor[] => {
    if (tripDataAll.length === 0) {
      return [];
    }

    // Use provided risk thresholds or fallback to defaults with reduced values to ensure scores stay within +/- 10%
    const thresholds = currentThresholds || {
      drivingFrequency: {
        veryHigh: 100,
        high: 50,
        medium: 25,
        low: 10,
        adjustment: {
          veryHigh: 3.0,
          high: 2.0,
          medium: 1.0,
          low: 0,
          veryLow: -1.5,
        },
      },
      peakHourUsage: {
        high: 70,
        medium: 40,
        adjustment: {
          high: 2.0,
          medium: 1.0,
          low: 0,
        },
      },
      nightDriving: {
        high: 40,
        medium: 20,
        adjustment: {
          high: 1.5,
          medium: 0.5,
          low: 0,
        },
      },
      speedBehavior: {
        adjustment: 2.5,
      },
      routeRisk: {
        adjustment: 1.0,
      },
      weekdayWeekendMix: {
        adjustment: {
          balanced: -1.5,
          unbalanced: 0.5,
        },
      },
      distanceTraveled: {
        high: 1500,
        medium: 800,
        adjustment: {
          high: 2.0,
          medium: 1.0,
          low: 0,
        },
      },
      overallDrivingStyle: {
        adjustment: -2.0,
      },
    };

    // Calculate unique days from trip data
    const uniqueDays = new Set(tripDataAll.map((trip) => trip.trip_date)).size;

    // Identify peak hour trips (6-10 AM and 4-8 PM)
    // const peakHours = analysis?.filter(trip => {
    //   const hour = parseInt(trip.TripTime.split(':')[0]);
    //   return (hour >= 6 && hour < 10) || (hour >= 16 && hour < 20);
    // });
    const peakHours = tripDataAll?.filter((trip) => {
      const rawTime = trip.trip_time;
      let hour = -1;

      if (typeof rawTime === "number") {
        // Excel stores time as a fraction of a day (e.g., 0.5 = 12:00 PM)
        const totalSeconds = Math.round(rawTime * 24 * 60 * 60);
        hour = Math.floor(totalSeconds / 3600);
      } else if (typeof rawTime === "string") {
        // Handle AM/PM format like "09:51:34 PM"
        const isPM = rawTime.toUpperCase().includes("PM");
        const timeWithoutPeriod = rawTime.replace(/(AM|PM)/i, "").trim();
        const parts = timeWithoutPeriod.split(":");

        hour = parseInt(parts[0], 10);
        if (isPM && hour !== 12) hour += 12;
        if (!isPM && hour === 12) hour = 0;
      }

      return (hour >= 6 && hour < 10) || (hour >= 16 && hour < 20);
    });

    // Identify night trips (midnight to 6 AM and 8 PM to midnight)
    // const nightTrips = tripData.filter((trip) => {
    //   const hour = parseInt(trip.time.split(":")[0]);
    //   return (hour >= 0 && hour < 6) || (hour >= 20 && hour < 24);
    // });
    const nightTrips = tripDataAll?.filter((trip) => {
      const rawTime = trip.trip_time;
      let hour = -1;

      if (typeof rawTime === "number") {
        // Excel stores time as a fraction of a day (0.0 to 1.0)
        const totalSeconds = Math.round(rawTime * 24 * 60 * 60);
        hour = Math.floor(totalSeconds / 3600);
      } else if (typeof rawTime === "string") {
        // Handle string time like "11:45:00 PM"
        const isPM = rawTime.toUpperCase().includes("PM");
        const timeWithoutPeriod = rawTime.replace(/(AM|PM)/i, "").trim();
        const parts = timeWithoutPeriod.split(":");

        hour = parseInt(parts[0], 10);
        if (isPM && hour !== 12) hour += 12;
        if (!isPM && hour === 12) hour = 0;
      }

      return (hour >= 0 && hour < 6) || (hour >= 23 && hour < 24); // 11 PM–6 AM
    });

    // console.log("Night trips:", nightTrips);

    // Identify weekend trips
    const weekendTrips = tripDataAll.filter((trip) => {
      const date = new Date(trip.trip_date);
      const day = date.getDay();
      return day === 0 || day === 6; // Sunday (0) or Saturday (6)
    });
    // const weekendTrips = analysis.filter((trip) => {
    //   return trip["weekend/weekday"]?.toLowerCase() === "weekend";
    // });

    // Identify weekday trips
    const weekdayTrips = tripDataAll.filter((trip) => {
      const date = new Date(trip.trip_date);
      const day = date.getDay();
      return day !== 0 && day !== 6; // Not Sunday or Saturday
    });
    // const weekdayTrips = analysis.filter((trip) => {
    //   return trip["weekend/weekday"]?.toLowerCase() === "weekday";
    // });

    // Identify urban and highway trips based on toll gates
    const urbanTrips = tripDataAll.filter(
      (trip) =>
        trip.toll_gate.includes("Business Bay") ||
        trip.toll_gate.includes("Al Garhoud") ||
        trip.toll_gate.includes("Al Maktoum") ||
        trip.toll_gate.includes("Airport Tunnel")
    );

    const highwayTrips = tripDataAll.filter(
      (trip) =>
        trip.toll_gate.includes("Al Barsha") ||
        trip.toll_gate.includes("Al Safa North") ||
        trip.toll_gate.includes("Jebel Ali") ||
        trip.toll_gate.includes("Al Mamzar South") ||
        trip.toll_gate.includes("Al Mamzar North") ||
        trip.toll_gate.includes("Al Safa South")
    );

    // Check if weekend/weekday usage is balanced (around 30% weekends)
    const isBalanced =
      Math.abs(weekendTrips.length / tripDataAll.length - 0.3) < 0.1;

    // Analyze speed data
    const speedViolations = speedResults.filter(
      (result) => !result.withinLimit
    );

    // Calculate average and max speed
    const avgSpeed =
      speedResults.length > 0
        ? speedResults.reduce((sum, r) => sum + r.speedKmh, 0) /
          speedResults.length
        : 0;

    const maxSpeed =
      speedResults.length > 0
        ? Math.max(...speedResults.map((r) => r.speedKmh))
        : 0;

    // Log calculation details for debugging
    // console.log(`Insurance risk calculation - Trips: ${tripData.length}, Unique days: ${uniqueDays}`);
    // console.log(`Peak hours: ${peakHours.length}, Night: ${nightTrips.length}, Weekends: ${weekendTrips.length}`);
    // console.log(`Speed violations: ${speedViolations.length}, Average speed: ${avgSpeed.toFixed(1)}, Max speed: ${maxSpeed.toFixed(1)}`);

    // Determine speed risk based on actual speed violations data
    let speedRisk: "Very Low" | "Low" | "Medium" | "High" | "Very High";
    let speedAdjustment: number;
    let speedObservation: string;

    if (speedResults.length === 0) {
      speedRisk = "Low";
      speedAdjustment = 0;
      speedObservation = "Not enough data for speed analysis";
    } else if (speedViolations.length === 0) {
      speedRisk = "Very Low";
      speedAdjustment = -thresholds.speedBehavior.adjustment / 2; // Reward for no violations
      speedObservation = "All trips within speed limits";
    } else if (speedViolations.length === 1) {
      speedRisk = "Low";
      speedAdjustment = 0;
      speedObservation = "Generally within limits with 1 exception";
    } else if (speedViolations.length < 3) {
      speedRisk = "Medium";
      speedAdjustment = thresholds.speedBehavior.adjustment / 4;
      speedObservation = `${speedViolations.length} speed violations detected`;
    } else if (speedViolations.length < 5) {
      speedRisk = "High";
      speedAdjustment = thresholds.speedBehavior.adjustment / 2;
      speedObservation = `${speedViolations.length} speed violations detected`;
    } else {
      speedRisk = "Very High";
      speedAdjustment = thresholds.speedBehavior.adjustment;
      speedObservation = `Frequent speeding (${speedViolations.length} violations)`;
    }

    // Calculate estimated distance based on number of trips
    // Using a more conservative estimation of 3-5 km per trip on average
    const estimatedMinDistance = (tripDataAll.length * 3).toFixed(0);
    const estimatedMaxDistance = (tripDataAll.length * 5).toFixed(0);
    const distanceObservation = `Estimated ${estimatedMinDistance}-${estimatedMaxDistance} km`;

    // Calculate urban vs highway percentage
    const urbanPercentage = Math.round(
      (urbanTrips.length / tripDataAll.length) * 100
    );
    const highwayPercentage = Math.round(
      (highwayTrips.length / tripDataAll.length) * 100
    );

    // Create risk factors array with all calculated values
    return [
      {
        parameter: "Driving Frequency",
        observation: `${tripDataAll.length} trips across ${uniqueDays} days`,
        risk:
          tripDataAll.length > thresholds.drivingFrequency.veryHigh
            ? "Very High"
            : tripDataAll.length > thresholds.drivingFrequency.high
            ? "High"
            : tripDataAll.length > thresholds.drivingFrequency.medium
            ? "Medium"
            : tripDataAll.length > thresholds.drivingFrequency.low
            ? "Low"
            : "Very Low",
        adjustment:
          tripDataAll.length > thresholds.drivingFrequency.veryHigh
            ? thresholds.drivingFrequency.adjustment.veryHigh
            : tripDataAll.length > thresholds.drivingFrequency.high
            ? thresholds.drivingFrequency.adjustment.high
            : tripDataAll.length > thresholds.drivingFrequency.medium
            ? thresholds.drivingFrequency.adjustment.medium
            : tripDataAll.length > thresholds.drivingFrequency.low
            ? thresholds.drivingFrequency.adjustment.low
            : thresholds.drivingFrequency.adjustment.veryLow,
        drillDownData: {
          title: "All Trips",
          trips: tripDataAll,
        },
      },
      {
        parameter: "Peak Hour Usage",
        observation: `${peakHours.length} trips in peak hours (${Math.round(
          (peakHours.length / tripDataAll.length) * 100
        )}%)`,
        risk:
          peakHours.length / tripDataAll.length >
          thresholds.peakHourUsage.high / 100
            ? "High"
            : peakHours.length / tripDataAll.length >
              thresholds.peakHourUsage.medium / 100
            ? "Medium"
            : "Low",
        adjustment:
          peakHours.length / tripDataAll.length >
          thresholds.peakHourUsage.high / 100
            ? thresholds.peakHourUsage.adjustment.high
            : peakHours.length / tripDataAll.length >
              thresholds.peakHourUsage.medium / 100
            ? thresholds.peakHourUsage.adjustment.medium
            : thresholds.peakHourUsage.adjustment.low,
        drillDownData: {
          title: "Peak Hour Trips",
          trips: peakHours,
        },
      },
      {
        parameter: "Night Driving",
        observation: `${nightTrips.length} trips at night (${Math.round(
          (nightTrips.length / tripDataAll.length) * 100
        )}%)`,
        risk:
          nightTrips.length / tripDataAll.length >
          thresholds.nightDriving.high / 100
            ? "High"
            : nightTrips.length / tripDataAll.length >
              thresholds.nightDriving.medium / 100
            ? "Medium"
            : "Low",
        adjustment:
          nightTrips.length / tripDataAll.length >
          thresholds.nightDriving.high / 100
            ? thresholds.nightDriving.adjustment.high
            : nightTrips.length / tripDataAll.length >
              thresholds.nightDriving.medium / 100
            ? thresholds.nightDriving.adjustment.medium
            : thresholds.nightDriving.adjustment.low,
        drillDownData: {
          title: "Night Trips",
          trips: nightTrips,
        },
      },
      {
        parameter: "Speed Behavior",
        observation: speedObservation,
        risk: speedRisk,
        adjustment: speedAdjustment,
        drillDownData: {
          title: "Speed Analysis",
          breakdowns: [
            { label: "Average Speed", value: `${avgSpeed.toFixed(1)} km/h` },
            { label: "Max Speed", value: `${maxSpeed.toFixed(1)} km/h` },
            { label: "Speed Limit Violations", value: speedViolations.length },
          ],
        },
      },
      {
        parameter: "Route Risk",
        observation: `${urbanPercentage}% urban, ${highwayPercentage}% highway routes`,
        risk:
          urbanTrips.length > highwayTrips.length * 2
            ? "High"
            : urbanTrips.length > highwayTrips.length
            ? "Medium"
            : "Low",
        adjustment:
          urbanTrips.length > highwayTrips.length * 2
            ? thresholds.routeRisk.adjustment
            : urbanTrips.length > highwayTrips.length
            ? thresholds.routeRisk.adjustment / 2
            : 0,
        drillDownData: {
          title: "Route Distribution",
          breakdowns: [
            {
              label: "Urban Routes",
              value: `${urbanTrips.length} trips (${urbanPercentage}%)`,
            },
            {
              label: "Highway Routes",
              value: `${highwayTrips.length} trips (${highwayPercentage}%)`,
            },
          ],
        },
      },
      {
        parameter: "Weekday/Weekend Mix",
        observation: isBalanced
          ? "Balanced usage pattern"
          : weekendTrips.length > weekdayTrips.length
          ? "Predominantly weekend driver"
          : "Predominantly weekday driver",
        risk: isBalanced ? "Low" : "Medium",
        adjustment: isBalanced
          ? thresholds.weekdayWeekendMix.adjustment.balanced
          : thresholds.weekdayWeekendMix.adjustment.unbalanced,
        drillDownData: {
          title: "Day Distribution",
          breakdowns: [
            {
              label: "Weekday Trips",
              value: `${weekdayTrips.length} (${Math.round(
                (weekdayTrips.length / tripDataAll.length) * 100
              )}%)`,
            },
            {
              label: "Weekend Trips",
              value: `${weekendTrips.length} (${Math.round(
                (weekendTrips.length / tripDataAll.length) * 100
              )}%)`,
            },
          ],
        },
      },
      {
        parameter: "Distance Traveled",
        observation: distanceObservation,
        risk:
          parseInt(estimatedMaxDistance) > thresholds.distanceTraveled.high
            ? "High"
            : parseInt(estimatedMaxDistance) >
              thresholds.distanceTraveled.medium
            ? "Medium"
            : "Low",
        adjustment:
          parseInt(estimatedMaxDistance) > thresholds.distanceTraveled.high
            ? thresholds.distanceTraveled.adjustment.high
            : parseInt(estimatedMaxDistance) >
              thresholds.distanceTraveled.medium
            ? thresholds.distanceTraveled.adjustment.medium
            : thresholds.distanceTraveled.adjustment.low,
        drillDownData: {
          title: "Distance Analysis",
          breakdowns: [
            { label: "Total Trips", value: tripDataAll.length },
            {
              label: "Estimated Min Distance",
              value: `${estimatedMinDistance} km`,
            },
            {
              label: "Estimated Max Distance",
              value: `${estimatedMaxDistance} km`,
            },
          ],
        },
      },
      {
        parameter: "Overall Driving Style",
        observation:
          speedViolations.length > 0
            ? "Some risky driving patterns detected"
            : "Predictable, consistent patterns",
        risk:
          speedViolations.length > 3
            ? "High"
            : speedViolations.length > 0
            ? "Medium"
            : "Low",
        adjustment:
          speedViolations.length > 3
            ? 0
            : speedViolations.length > 0
            ? thresholds.overallDrivingStyle.adjustment / 2
            : thresholds.overallDrivingStyle.adjustment,
        drillDownData: {
          title: "Driving Pattern Analysis",
          breakdowns: [
            {
              label: "Pattern Consistency",
              value:
                speedViolations.length > 3
                  ? "Low"
                  : speedViolations.length > 0
                  ? "Medium"
                  : "High",
            },
            {
              label: "Risk Profile",
              value:
                speedViolations.length > 3
                  ? "High Risk"
                  : speedViolations.length > 0
                  ? "Medium Risk"
                  : "Low Risk",
            },
            {
              label: "Behavior Score",
              value:
                speedViolations.length > 3
                  ? "6.0/10"
                  : speedViolations.length > 0
                  ? "7.5/10"
                  : "9.0/10",
            },
          ],
        },
      },
    ];
  }, [tripDataAll, currentThresholds, speedResults]);

  // Calculate total adjustment based on risk factors
  const totalAdjustment = React.useMemo(() => {
    if (riskFactors.length === 0) return 0;

    // Sum all adjustments and cap the total to ensure it stays within +/- 8% range
    const rawSum = riskFactors.reduce(
      (sum, factor) => sum + factor.adjustment,
      0
    );
    // Cap to +/- 8% range
    return Math.max(-8, Math.min(8, Math.round(rawSum * 10) / 10));
  }, [riskFactors]);

  // Determine driver profile based on trip patterns
  const driverProfile = React.useMemo(() => {
    if (tripDataAll.length === 0) return "No Data Available";

    const nightTrips = tripDataAll?.filter((trip) => {
      const rawTime = trip.trip_time;
      let hour = -1;

      if (typeof rawTime === "number") {
        // Excel stores time as a fraction of a day (0.0 to 1.0)
        const totalSeconds = Math.round(rawTime * 24 * 60 * 60);
        hour = Math.floor(totalSeconds / 3600);
      } else if (typeof rawTime === "string") {
        // Handle string time like "11:45:00 PM"
        const isPM = rawTime.toUpperCase().includes("PM");
        const timeWithoutPeriod = rawTime.replace(/(AM|PM)/i, "").trim();
        const parts = timeWithoutPeriod.split(":");

        hour = parseInt(parts[0], 10);
        if (isPM && hour !== 12) hour += 12;
        if (!isPM && hour === 12) hour = 0;
      }

      return (hour >= 0 && hour < 6) || (hour >= 23 && hour < 24); // 11 PM–6 AM
    });

    const peakHours = tripDataAll?.filter((trip) => {
      const rawTime = trip.trip_time;
      let hour = -1;

      if (typeof rawTime === "number") {
        // Excel stores time as a fraction of a day (e.g., 0.5 = 12:00 PM)
        const totalSeconds = Math.round(rawTime * 24 * 60 * 60);
        hour = Math.floor(totalSeconds / 3600);
      } else if (typeof rawTime === "string") {
        // Handle AM/PM format like "09:51:34 PM"
        const isPM = rawTime.toUpperCase().includes("PM");
        const timeWithoutPeriod = rawTime.replace(/(AM|PM)/i, "").trim();
        const parts = timeWithoutPeriod.split(":");

        hour = parseInt(parts[0], 10);
        if (isPM && hour !== 12) hour += 12;
        if (!isPM && hour === 12) hour = 0;
      }

      return (hour >= 6 && hour < 10) || (hour >= 16 && hour < 20);
    });

    const urbanTrips = tripDataAll.filter(
      (trip) =>
        trip.toll_gate.includes("Business Bay") ||
        trip.toll_gate.includes("Al Garhoud") ||
        trip.toll_gate.includes("Al Maktoum") ||
        trip.toll_gate.includes("Airport Tunnel")
    );

    const highwayTrips = tripDataAll.filter(
      (trip) =>
        trip.toll_gate.includes("Al Barsha") ||
        trip.toll_gate.includes("Al Safa North") ||
        trip.toll_gate.includes("Jebel Ali") ||
        trip.toll_gate.includes("Al Mamzar South") ||
        trip.toll_gate.includes("Al Mamzar North") ||
        trip.toll_gate.includes("Al Safa South")
    );

    const weekendTrips = tripDataAll.filter((trip) => {
      const date = new Date(trip.trip_date);
      const day = date.getDay();
      return day === 0 || day === 6; // Sunday (0) or Saturday (6)
    });
    // const weekendTrips = analysis.filter((trip) => {
    //   return trip["weekend/weekday"]?.toLowerCase() === "weekend";
    // });

    const uniqueDays = new Set(tripDataAll.map((trip) => trip.trip_date)).size;
    const tripsPerDay = tripDataAll.length / (uniqueDays || 1);

    let profile = "";

    if (urbanTrips.length > highwayTrips.length * 1.5) {
      profile += "Urban ";
    } else if (highwayTrips.length > urbanTrips.length * 1.5) {
      profile += "Highway ";
    } else {
      profile += "Mixed-Route ";
    }

    if (nightTrips.length > tripDataAll.length * 0.3) {
      profile += "Night ";
    } else if (peakHours.length > tripDataAll.length * 0.5) {
      profile += "Rush-Hour ";
    } else if (weekendTrips.length > tripDataAll.length * 0.5) {
      profile += "Weekend ";
    }

    if (tripsPerDay > 2.5) {
      profile += "Frequent ";
    } else if (tripsPerDay < 1) {
      profile += "Occasional ";
    }

    if (totalAdjustment < -5) {
      profile += "Safe ";
    } else if (totalAdjustment > 5) {
      profile += "Moderate-Risk ";
    } else if (totalAdjustment > 0) {
      profile += "Average ";
    } else {
      profile += "Cautious ";
    }

    profile += "Driver";

    return profile.trim();
  }, [tripDataAll, totalAdjustment]);

  // Color functions for risk and adjustment display
  const getRiskColor = (risk: string): string => {
    switch (risk) {
      case "Very Low":
        return "text-green-600";
      case "Low":
        return "text-green-500";
      case "Medium":
        return "text-yellow-500";
      case "High":
        return "text-orange-500";
      case "Very High":
        return "text-red-500";
      default:
        return "text-gray-500";
    }
  };

  const getAdjustmentColor = (value: number): string => {
    if (value < -1) return "text-green-600";
    if (value < 0) return "text-green-500";
    if (value === 0) return "text-gray-500";
    if (value > 1) return "text-red-600";
    return "text-orange-500";
  };

  const handleRiskFactorClick = (factor: RiskFactor) => {
    if (factor.drillDownData) {
      setDialogTitle(factor.drillDownData.title);
      setDialogOpen(true);

      if (factor.drillDownData.trips) {
        setSelectedTrips(factor.drillDownData.trips);
        setShowBreakdown([]);
      } else if (factor.drillDownData.breakdowns) {
        setShowBreakdown(factor.drillDownData.breakdowns);
        setSelectedTrips([]);
      } else {
        setSelectedTrips([]);
        setShowBreakdown([]);
        toast({
          title: "No data available",
          description:
            "There is no detailed information to display for this category.",
          variant: "destructive",
        });
      }
    }
  };

  if (tripDataAll.length === 0) {
    return (
      <div className="text-center py-20">
        <h3 className="text-xl font-semibold text-gray-700">
          No Trip Data Available
        </h3>
        <p className="text-gray-500 mt-2">
          Please upload Salik toll data to see your insurance adjustment
          analysis.
        </p>
      </div>
    );
  }

  // Render the component with risk factors and total adjustment
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="col-span-1 md:col-span-2">
          <CardHeader>
            <CardTitle>Risk Score</CardTitle>
            <CardDescription>
              Based on your Salik toll data analysis
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between items-center mb-1">
                <span>Higher Premium</span>
                <span>Lower Premium</span>
              </div>
              <div className="relative h-4">
                <div className="absolute inset-0 bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 rounded-full" />
                <div
                  className="absolute w-6 h-6 bg-white rounded-full shadow-md border-2 border-salik-primary transform -translate-y-1/4"
                  style={{
                    left: `${Math.max(
                      0,
                      Math.min(100, 50 - totalAdjustment * (100 / 16))
                    )}%`,
                    transition: "left 1s ease-out",
                  }}
                />
              </div>
              <div className="flex justify-between text-sm mt-1">
                <span>+8%</span>
                <span>0%</span>
                <span>-8%</span>
              </div>
            </div>

            <div className="mt-8 flex flex-col md:flex-row items-center justify-center gap-8">
              <div className="text-center">
                <h3 className="text-gray-500 text-sm font-medium">
                  Your Premium Adjustment
                </h3>
                <div
                  className={`text-5xl font-bold mt-2 ${
                    totalAdjustment <= 0 ? "text-green-600" : "text-red-500"
                  }`}
                >
                  {totalAdjustment <= 0 ? "" : "+"}
                  {totalAdjustment.toFixed(1)}%
                </div>
              </div>

              <div className="text-center">
                <h3 className="text-gray-500 text-sm font-medium">
                  Driver Profile
                </h3>
                <div className="text-2xl font-semibold mt-2 text-salik-primary">
                  {driverProfile}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Estimated Loading/Discounting</CardTitle>
            <CardDescription>Based on average UAE premium</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-6">
              <div className="text-gray-500 text-sm mb-2">Annual Savings</div>
              <div className="text-4xl font-bold text-salik-primary mb-4">
                {totalAdjustment <= 0
                  ? `AED ${Math.abs((totalAdjustment / 100) * 2500).toFixed(0)}`
                  : "No Savings"}
              </div>
              <div className="text-xs text-gray-400">
                Based on average annual premium of AED 2,500
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Driving Risk Assessment</CardTitle>
          <CardDescription>
            Detailed breakdown of factors affecting your premium
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 font-medium">Parameter</th>
                  <th className="text-left py-3 font-medium">Observation</th>
                  <th className="text-left py-3 font-medium">Risk Level</th>
                  <th className="text-right py-3 font-medium">Adjustment</th>
                </tr>
              </thead>
              <tbody>
                {riskFactors.map((factor, index) => (
                  <tr
                    key={index}
                    className={`border-b hover:bg-gray-50 ${
                      factor.drillDownData ? "cursor-pointer" : ""
                    }`}
                    onClick={() =>
                      factor.drillDownData && handleRiskFactorClick(factor)
                    }
                  >
                    <td className="py-3 font-medium">{factor.parameter}</td>
                    <td
                      className={`py-3 ${
                        factor.drillDownData
                          ? "text-[#1EAEDB] hover:text-[#0FA0CE]"
                          : "text-gray-600"
                      }`}
                    >
                      {factor.observation}
                    </td>
                    <td className={`py-3 ${getRiskColor(factor.risk)}`}>
                      {factor.risk}
                    </td>
                    <td
                      className={`py-3 text-right font-medium ${getAdjustmentColor(
                        factor.adjustment
                      )}`}
                    >
                      {factor.adjustment > 0 ? "+" : ""}
                      {factor.adjustment.toFixed(1)}%
                    </td>
                  </tr>
                ))}
                <tr className="bg-gray-50 font-semibold">
                  <td colSpan={3} className="py-3 text-right">
                    Final Adjustment:
                  </td>
                  <td
                    className={`py-3 text-right ${getAdjustmentColor(
                      totalAdjustment
                    )}`}
                  >
                    {totalAdjustment > 0 ? "+" : ""}
                    {totalAdjustment.toFixed(1)}%
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <TripDetailsDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        trips={selectedTrips}
        title={dialogTitle}
        breakdowns={showBreakdown}
      />
    </div>
  );
};

export default InsuranceAdjustment;
