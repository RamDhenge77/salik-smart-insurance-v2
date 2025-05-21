import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TripData } from "./FileUploader";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  PieChart,
  Pie,
  Legend,
  LineChart,
  Line,
  Area,
  AreaChart,
} from "recharts";
import { formatTripDate } from "@/utils/timeUtils";
import EcoInsights from "./EcoInsights";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BarChart as BarChartIcon,
  Calculator,
  CarFront,
  Gauge,
  MessageCircle,
} from "lucide-react";
import TripSpeedTable from "./TripSpeedTable";
import InsuranceAdjustment from "./InsuranceAdjustment";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { RiskThresholds } from "./RiskFactorConfig";
import { useCarContext } from "@/context/Context";

interface DrivingAnalyticsProps {
  tripData: TripData[];
  uploadKey: number;
  riskThresholds?: RiskThresholds;
}

// Helper function to categorize time of day
const getTimeCategory = (time: string): string => {
  const hour = parseInt(time.split(":")[0]);

  if (hour >= 0 && hour < 6) return "Night";
  if (hour >= 6 && hour < 10) return "Morning Peak";
  if (hour >= 10 && hour < 16) return "Midday";
  if (hour >= 16 && hour < 20) return "Evening Peak";
  return "Late Night";
};

// Helper function to check if date is a weekend
const isWeekend = (dateStr: string): boolean => {
  const date = new Date(dateStr);
  const day = date.getDay();
  return day === 0 || day === 6; // 0 is Sunday, 6 is Saturday
};

// Helper function to get week number
const getWeekNumber = (d: Date): number => {
  // Copy date so don't modify original
  d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
  // Set to nearest Thursday: current date + 4 - current day number
  // Make Sunday's day number 7
  d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
  // Get first day of year
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  // Calculate full weeks to nearest Thursday
  const weekNo = Math.ceil(
    ((d.getTime() - yearStart.getTime()) / 86400000 + 1) / 7
  );
  return weekNo;
};

// Helper function to get abbreviated day names
const getAbbreviatedDayName = (dayName: string): string => {
  return dayName.substring(0, 3);
};

const DrivingAnalytics: React.FC<DrivingAnalyticsProps> = ({
  tripData,
  uploadKey,
  riskThresholds: propRiskThresholds,
}) => {
  // Count trips by day of week
  const dayOfWeekData = React.useMemo(() => {
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const counts = Array(7).fill(0);

    tripData.forEach((trip) => {
      const date = new Date(trip.date);
      const dayIndex = date.getDay();
      counts[dayIndex]++;
    });

    return days.map((day, index) => ({
      name: getAbbreviatedDayName(day),
      fullName: day,
      trips: counts[index],
      isWeekend: index === 0 || index === 6, // Sunday and Saturday
    }));
  }, [tripData]);

  // Analyze time of day distribution
  const timeOfDayData = React.useMemo(() => {
    const categories = [
      "Night",
      "Morning Peak",
      "Midday",
      "Evening Peak",
      "Late Night",
    ];
    const counts: Record<string, number> = {};

    categories.forEach((cat) => {
      counts[cat] = 0;
    });

    tripData.forEach((trip) => {
      const category = getTimeCategory(trip.time);
      counts[category]++;
    });

    return categories.map((category) => ({
      name: category,
      trips: counts[category],
    }));
  }, [tripData]);

  // Analyze weekday vs weekend
  const weekdayWeekendData = React.useMemo(() => {
    let weekdayCount = 0;
    let weekendCount = 0;

    tripData.forEach((trip) => {
      if (isWeekend(trip.date)) {
        weekendCount++;
      } else {
        weekdayCount++;
      }
    });

    return [
      {
        name: "Weekday",
        value: weekdayCount,
        percentage: Math.round(
          (weekdayCount / Math.max(1, weekdayCount + weekendCount)) * 100
        ),
      },
      {
        name: "Weekend",
        value: weekendCount,
        percentage: Math.round(
          (weekendCount / Math.max(1, weekdayCount + weekendCount)) * 100
        ),
      },
    ];
  }, [tripData]);

  // Calculate toll gate distribution
  const tollGateData = React.useMemo(() => {
    const gates: Record<string, number> = {};

    tripData.forEach((trip) => {
      gates[trip.tollGate] = (gates[trip.tollGate] || 0) + 1;
    });

    return Object.entries(gates)
      .map(([gate, count]) => ({
        name: gate,
        trips: count,
      }))
      .slice(0, 8); // Limit to top 8 gates for better visibility if there are many
  }, [tripData]);

  // Weekly trips and toll data - last 12 weeks (approximately 1 quarter)
  const weeklyTrendsData = React.useMemo(() => {
    if (tripData.length === 0) return [];

    // Get date range
    const dates = tripData.map((trip) => new Date(trip.date));
    const latestDate = new Date(Math.max(...dates.map((d) => d.getTime())));

    // Create array for last 12 weeks
    const weeksData: { week: string; trips: number; tolls: number }[] = [];

    // Initialize the weeks data
    for (let i = 0; i < 12; i++) {
      const weekDate = new Date(latestDate);
      weekDate.setDate(latestDate.getDate() - i * 7);

      const weekNumber = getWeekNumber(weekDate);

      weeksData.unshift({
        week: `W${weekNumber}`,
        trips: 0,
        tolls: 0,
      });
    }

    // Fill in the data
    tripData.forEach((trip) => {
      const tripDate = new Date(trip.date);
      // Skip if trip date is older than our 12-week window
      if (
        tripDate < new Date(latestDate.getTime() - 12 * 7 * 24 * 60 * 60 * 1000)
      ) {
        return;
      }

      const weekNumber = getWeekNumber(tripDate);
      const weekKey = `W${weekNumber}`;

      const weekData = weeksData.find((w) => w.week === weekKey);
      if (weekData) {
        weekData.trips += 1;
        weekData.tolls += trip.amount;
      }
    });

    return weeksData;
  }, [tripData]);

  // Calculate trip stats
  const tripStats = React.useMemo(() => {
    if (tripData.length === 0) {
      return {
        totalTrips: 0,
        activeDays: 0,
        maxSpeed: 0,
        totalDistance: 0,
      };
    }

    // Get unique active days
    const uniqueDays = new Set(tripData.map((trip) => trip.date));

    // Calculate max speed from trips - using a simple estimation for demo
    const speedEstimates = tripData.map((trip) => {
      const tollGateIndex = (trip.id * 13) % 100;
      const baseSpeed = 60 + (tollGateIndex % 40);
      return baseSpeed;
    });

    return {
      totalTrips: tripData.length,
      activeDays: uniqueDays.size,
      maxSpeed: Math.max(...speedEstimates),
      totalDistance: Math.round(tripData.length * 8.5), // Rough estimate based on trip count
    };
  }, [tripData]);

  // Colors for charts - using improved color palette for better visibility
  const colors = [
    "#2596be",
    "#36a2c9",
    "#47add4",
    "#58b9de",
    "#69c4e9",
    "#7acef3",
    "#8bd9fd",
    "#9ce4ff",
  ];

  // Updated weekday/weekend colors for better visibility
  const getBarColor = (isWeekend: boolean) => {
    return isWeekend ? "#36a2c9" : "#2596be";
  };

  // Custom tooltip with improved readability
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-md shadow-lg">
          <p className="text-gray-800 font-medium text-sm">{`${
            payload[0]?.payload?.fullName || label
          }`}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="text-[#2596be] font-medium">
              {`${entry.name || "Value"}: ${
                typeof entry.value === "number"
                  ? entry.value.toFixed(1)
                  : entry.value
              }`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  // Log data for debugging
  // React.useEffect(() => {
  //   console.log("Trip data for analytics:", tripData.length, "trips");
  // }, [tripData]);

  const defaultRiskThresholds: RiskThresholds = {
    drivingFrequency: {
      veryHigh: 100, // Increased threshold to make Very High less common
      high: 50, // Increased threshold
      medium: 25, // Increased threshold
      low: 10, // Increased threshold
      adjustment: {
        veryHigh: 3.0, // Reduced from 15.0%
        high: 2.0, // Reduced
        medium: 1.0, // Reduced
        low: 0,
        veryLow: -1.5, // Kept the same
      },
    },
    peakHourUsage: {
      high: 70, // Increased threshold
      medium: 40, // Increased threshold
      adjustment: {
        high: 2.0, // Reduced from 5.0%
        medium: 1.0, // Reduced
        low: 0,
      },
    },
    nightDriving: {
      high: 40, // Kept the same
      medium: 20, // Kept the same
      adjustment: {
        high: 1.5, // Reduced
        medium: 0.5, // Kept the same
        low: 0,
      },
    },
    speedBehavior: {
      adjustment: 2.5, // Reduced from 10.0%
    },
    routeRisk: {
      adjustment: 1.0, // Kept the same
    },
    weekdayWeekendMix: {
      adjustment: {
        balanced: -1.5, // Kept the same
        unbalanced: 0.5, // Kept the same
      },
    },
    distanceTraveled: {
      high: 1500, // New threshold based on actual data
      medium: 800, // New threshold based on actual data
      adjustment: {
        high: 2.0, // Reduced from 15.0%
        medium: 1.0, // Reduced
        low: 0,
      },
    },
    overallDrivingStyle: {
      adjustment: -2.0, // Kept the same
    },
  };
  const [localRiskThresholds] = useLocalStorage<RiskThresholds>(
    "riskThresholds",
    defaultRiskThresholds
  );

  const riskThresholds = propRiskThresholds || localRiskThresholds;

  const { tripDataAll, speedData } = useCarContext();

  return (
    <Tabs defaultValue="analytics" key={`tabs-${uploadKey}`}>
      <div className="flex items-center justify-center w-full">
        <TabsList className="mb-6 gap-4">
          <TabsTrigger
            value="analytics"
            className="text-center data-[state=active]:bg-white data-[state=active]:text-gray-700 border-r border-gray-200 hover:bg-gray-100 transition-colors font-medium"
          >
            <BarChartIcon className="h-4 w-4 mr-2" />
            Driving Analytics
          </TabsTrigger>
          <TabsTrigger
            value="speed"
            className="text-center data-[state=active]:bg-white data-[state=active]:text-gray-700 border-r border-gray-200 hover:bg-gray-100 transition-colors font-medium"
          >
            <Gauge className="h-4 w-4 mr-2" />
            Speed Analytics
          </TabsTrigger>
          <TabsTrigger
            value="insurance"
            className="text-center data-[state=active]:bg-white data-[state=active]:text-gray-700 border-r border-gray-200 hover:bg-gray-100 transition-colors font-medium"
          >
            <Calculator className="h-4 w-4 mr-2" />
            Insurance Adjustment
          </TabsTrigger>
        </TabsList>
      </div>
      <div className="space-y-8 animate-fade-in">
        {/* EcoInsights Component at the top */}
        <TabsContent value="analytics">
          <div className="mb-8">
            <Card className="rounded-xl border-none shadow-none transition-all duration-300">
              <CardHeader>
                <CardTitle className="text-[#2596be]">
                  Environmental & Cost Insights
                </CardTitle>
              </CardHeader>
              <CardContent>
                <EcoInsights totalTrips={tripData.length} />
              </CardContent>
            </Card>
          </div>

          {/* Show all charts and statistics */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card
              className="stat-card rounded-3xl shadow-xl transform transition-all cursor-pointer hover:shadow-2xl"
              // style={{
              //   boxShadow:
              //     "inset 0px 2px 3px 2px white, 0px 10px 12px 5px rgba(0, 0, 0, 0.1)",
              // }}
            >
              <CardHeader>
                <CardTitle className="text-[#2596be]">
                  Day of Week Distribution
                </CardTitle>
              </CardHeader>
              <CardContent className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={dayOfWeekData}
                    margin={{ top: 10, right: 30, left: 10, bottom: 25 }}
                  >
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke="rgba(107, 114, 128, 0.2)"
                      vertical={false}
                    />
                    <XAxis
                      dataKey="name"
                      tickLine={false}
                      axisLine={{ stroke: "rgba(107, 114, 128, 0.5)" }}
                      tick={{ fill: "#374151", fontSize: 12, fontWeight: 500 }}
                      height={50}
                      padding={{ left: 10, right: 10 }}
                    />
                    <YAxis
                      allowDecimals={false}
                      tickLine={false}
                      axisLine={{ stroke: "rgba(107, 114, 128, 0.5)" }}
                      tick={{ fill: "#374151", fontSize: 12, fontWeight: 500 }}
                      label={{
                        value: "Trips",
                        angle: -90,
                        position: "insideLeft",
                        fill: "#374151",
                        fontSize: 14,
                        fontWeight: 600,
                      }}
                      width={60}
                    />
                    <Tooltip
                      content={<CustomTooltip />}
                      cursor={{ fill: "rgba(107, 114, 128, 0.1)" }}
                    />
                    <Legend
                      verticalAlign="top"
                      align="right"
                      iconType="circle"
                      wrapperStyle={{ paddingBottom: "10px" }}
                      formatter={(value) => (
                        <span className="text-gray-700 font-medium">
                          {value}
                        </span>
                      )}
                    />
                    <Bar
                      dataKey="trips"
                      name="Number of Trips"
                      radius={[4, 4, 0, 0]}
                      barSize={25}
                    >
                      {dayOfWeekData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={getBarColor(entry.isWeekend)}
                        />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="stat-card rounded-3xl shadow-xl transform transition-all cursor-pointer hover:shadow-2xl">
              <CardHeader>
                <CardTitle className="text-[#2596be]">Weekly Trends</CardTitle>
              </CardHeader>
              <CardContent className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={weeklyTrendsData}
                    margin={{ top: 10, right: 30, left: 10, bottom: 25 }}
                  >
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke="rgba(107, 114, 128, 0.2)"
                      vertical={false}
                    />
                    <XAxis
                      dataKey="week"
                      tickLine={false}
                      axisLine={{ stroke: "rgba(107, 114, 128, 0.5)" }}
                      tick={{ fill: "#374151", fontSize: 12, fontWeight: 500 }}
                      height={50}
                      padding={{ left: 10, right: 10 }}
                    />
                    <YAxis
                      yAxisId="left"
                      allowDecimals={false}
                      tickLine={false}
                      axisLine={{ stroke: "rgba(107, 114, 128, 0.5)" }}
                      tick={{ fill: "#374151", fontSize: 12, fontWeight: 500 }}
                      label={{
                        value: "Trips",
                        angle: -90,
                        position: "insideLeft",
                        fill: "#374151",
                        fontSize: 14,
                        fontWeight: 600,
                      }}
                      width={60}
                    />
                    <YAxis
                      yAxisId="right"
                      orientation="right"
                      allowDecimals={false}
                      tickLine={false}
                      axisLine={{ stroke: "rgba(107, 114, 128, 0.5)" }}
                      tick={{ fill: "#374151", fontSize: 12, fontWeight: 500 }}
                      label={{
                        value: "Toll (AED)",
                        angle: 90,
                        position: "insideRight",
                        fill: "#374151",
                        fontSize: 14,
                        fontWeight: 600,
                      }}
                      width={60}
                    />
                    <Tooltip content={<CustomTooltip />} cursor={false} />
                    <Legend
                      verticalAlign="top"
                      align="right"
                      iconType="circle"
                      wrapperStyle={{ paddingBottom: "10px" }}
                      formatter={(value) => (
                        <span className="text-gray-700 font-medium">
                          {value}
                        </span>
                      )}
                    />
                    <Line
                      yAxisId="left"
                      type="monotone"
                      dataKey="trips"
                      name="Trips"
                      stroke="#2596be"
                      strokeWidth={2}
                      dot={{
                        fill: "#ffffff",
                        stroke: "#2596be",
                        strokeWidth: 2,
                        r: 4,
                      }}
                      activeDot={{
                        r: 6,
                        stroke: "#2596be",
                        strokeWidth: 2,
                        fill: "#ffffff",
                      }}
                    />
                    <Line
                      yAxisId="right"
                      type="monotone"
                      dataKey="tolls"
                      name="Toll Amount (AED)"
                      stroke="#fa8060"
                      strokeWidth={2}
                      dot={{
                        fill: "#ffffff",
                        stroke: "#fa8060",
                        strokeWidth: 2,
                        r: 4,
                      }}
                      activeDot={{
                        r: 6,
                        stroke: "#fa8060",
                        strokeWidth: 2,
                        fill: "#ffffff",
                      }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="stat-card rounded-3xl shadow-xl transform transition-all cursor-pointer hover:shadow-2xl">
              <CardHeader>
                <CardTitle className="text-[#2596be]">
                  Weekday vs Weekend
                </CardTitle>
              </CardHeader>
              <CardContent className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                    <Pie
                      data={weekdayWeekendData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      fill="#8884d8"
                      paddingAngle={5}
                      dataKey="value"
                      label={({ name, percentage }) => `${name} ${percentage}%`}
                      labelLine={false}
                    >
                      {weekdayWeekendData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={index === 0 ? "#2596be" : "#36a2c9"}
                          stroke="transparent"
                        />
                      ))}
                    </Pie>
                    <Tooltip content={<CustomTooltip />} />
                    <Legend
                      verticalAlign="top"
                      align="right"
                      iconType="circle"
                      wrapperStyle={{ paddingBottom: "10px" }}
                      formatter={(value) => (
                        <span className="text-gray-700 font-medium">
                          {value}
                        </span>
                      )}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="stat-card rounded-3xl shadow-xl transform transition-all cursor-pointer hover:shadow-2xl">
              <CardHeader>
                <CardTitle className="text-[#2596be]">
                  Toll Gate Usage
                </CardTitle>
              </CardHeader>
              <CardContent className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={tollGateData}
                    margin={{ top: 10, right: 30, left: 10, bottom: 25 }}
                  >
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke="rgba(107, 114, 128, 0.2)"
                      vertical={false}
                    />
                    <XAxis
                      dataKey="name"
                      tickLine={false}
                      axisLine={{ stroke: "rgba(107, 114, 128, 0.5)" }}
                      tick={{ fill: "#374151", fontSize: 12, fontWeight: 500 }}
                      angle={-45}
                      textAnchor="end"
                      height={60}
                      padding={{ left: 10, right: 10 }}
                    />
                    <YAxis
                      allowDecimals={false}
                      tickLine={false}
                      axisLine={{ stroke: "rgba(107, 114, 128, 0.5)" }}
                      tick={{ fill: "#374151", fontSize: 12, fontWeight: 500 }}
                      label={{
                        value: "Trips",
                        angle: -90,
                        position: "insideLeft",
                        fill: "#374151",
                        fontSize: 14,
                        fontWeight: 600,
                      }}
                      width={60}
                    />
                    <Tooltip
                      content={<CustomTooltip />}
                      cursor={{ fill: "rgba(107, 114, 128, 0.1)" }}
                    />
                    <Legend
                      verticalAlign="top"
                      align="right"
                      iconType="circle"
                      wrapperStyle={{ paddingBottom: "10px" }}
                      formatter={(value) => (
                        <span className="text-gray-700 font-medium">
                          {value}
                        </span>
                      )}
                    />
                    <Bar
                      dataKey="trips"
                      name="Number of Trips"
                      radius={[4, 4, 0, 0]}
                      barSize={25}
                    >
                      {tollGateData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={colors[index % colors.length]}
                        />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="speed">
          <TripSpeedTable tripData={speedData} key={`speed-${uploadKey}`} />
        </TabsContent>

        <TabsContent value="insurance" className="mt-6">
          <InsuranceAdjustment
            tripData={tripData}
            riskThresholds={riskThresholds}
            key={`insurance-${uploadKey}`}
          />
        </TabsContent>
      </div>
    </Tabs>
  );
};

export default DrivingAnalytics;
