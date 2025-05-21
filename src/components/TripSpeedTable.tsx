import React, { useState } from "react";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, X, SortAsc, SortDesc, Filter, Info } from "lucide-react";
import { TripData } from "./FileUploader";
import {
  analyzeTripSpeeds,
  SpeedCalculationResult,
  calculateAverageSpeed,
  calculateAverageSpeed2,
} from "@/utils/speedCalculator";
import { useToast } from "@/hooks/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { formatTripDate } from "@/utils/speedCalculator";
import { formatDuration } from "@/utils/timeUtils";

interface TripSpeedTableProps {
  tripData: TripData[];
}

type SortField =
  | "date"
  | "speed"
  | "distance"
  | "time"
  | "startTime"
  | "endTime";
type SortDirection = "asc" | "desc";
type SpeedFilter = "all" | "within" | "over";

const TripSpeedTable: React.FC<TripSpeedTableProps> = ({ tripData }) => {
  const { toast } = useToast();
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [speedResults, setSpeedResults] = useState<SpeedCalculationResult[]>(
    []
  );
  const [sortField, setSortField] = useState<SortField>("date");
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc");
  const [speedFilter, setSpeedFilter] = useState<SpeedFilter>("all");
  const [isInitialized, setIsInitialized] = useState(false);
  const [speedAnalysisData, setSpeedAnalysisData] = useState([]);

  React.useEffect(() => {
    const analyzeTrips = async () => {
      if (tripData.length === 0) return;

      console.log("Analyzing trips for speed calculation");
      setIsAnalyzing(true);
      setSpeedResults([]); // Clear previous results

      try {
        const results = await analyzeTripSpeeds(tripData);
        setSpeedResults(results);
        setIsInitialized(true);
        console.log(
          "Analysis complete, found",
          results.length,
          "speed results"
        );

        // if (results.length === 0) {
        //   toast({
        //     title: "No speed data found",
        //     description:
        //       "We couldn't calculate speeds from your trips. Try uploading more data.",
        //     variant: "default",
        //   });
        // }
      } catch (error) {
        console.error("Error analyzing trips:", error);
        toast({
          title: "Analysis error",
          description:
            "An error occurred while analyzing trip speeds. Please try again later.",
          variant: "destructive",
        });
      } finally {
        setIsAnalyzing(false);
      }
    };

    if (tripData.length > 0) {
      // Use a timeout to ensure consistent data processing
      const timeoutId = setTimeout(() => {
        analyzeTrips();
      }, 100);
      setSpeedAnalysisData(tripData);
      return () => clearTimeout(timeoutId);
    } else {
      toast({
        title: "No speed data found",
        description:
          "We couldn't calculate speeds from your trips. Try uploading more data.",
        variant: "default",
      });
    }
  }, [tripData, toast]);

  console.log("Speed Analysis Data:", speedAnalysisData);

  const sortedAndFilteredResults = React.useMemo(() => {
    if (!speedResults) return [];

    let filtered = [...speedResults];

    switch (speedFilter) {
      case "within":
        filtered = filtered.filter((result) => result.withinLimit);
        break;
      case "over":
        filtered = filtered.filter((result) => !result.withinLimit);
        break;
      default:
        break;
    }

    return filtered.sort((a, b) => {
      let comparison = 0;

      switch (sortField) {
        case "date":
          comparison = new Date(a.date).getTime() - new Date(b.date).getTime();
          break;
        case "startTime":
          comparison = a.startTime.localeCompare(b.startTime);
          break;
        case "endTime":
          comparison = a.endTime.localeCompare(b.endTime);
          break;
        case "speed":
          comparison = a.speedKmh - b.speedKmh;
          break;
        case "distance":
          comparison = a.distanceKm - b.distanceKm;
          break;
        case "time":
          comparison = a.timeHours - b.timeHours;
          break;
        default:
          comparison = 0;
      }

      return sortDirection === "asc" ? comparison : -comparison;
    });
  }, [speedResults, sortField, sortDirection, speedFilter]);

  const statistics = React.useMemo(() => {
    if (speedAnalysisData.length === 0)
      return { avgSpeed: 0, maxSpeed: 0, violations: 0 };

    const avgSpeed = calculateAverageSpeed2(speedAnalysisData);
    const maxSpeed = Math.max(
      ...speedAnalysisData.map((r) => Number(r.avg_speed) || 0)
    );
    const violations = speedAnalysisData.filter(
      (r) => r.status === "Yes"
    ).length;

    return { avgSpeed, maxSpeed, violations };
  }, [speedAnalysisData]);

  const toggleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("desc");
    }
  };

  return (
    <Card className="bg-white border border-gray-200">
      <CardHeader className="space-y-2 border-b border-gray-200">
        <div className="flex flex-row items-center">
          <CardTitle className="text-[#2596be]">
            Trip Speed Evaluation
          </CardTitle>
        </div>
        <div className="grid grid-cols-3 gap-4 !mt-6">
          <div className="bg-white p-3 rounded-md border border-gray-200 shadow-sm">
            <p className="text-sm text-gray-600 font-medium">Average Speed</p>
            <p className="text-xl font-semibold text-[#2596be]">
              {statistics.avgSpeed.toFixed(1)}{" "}
              <span className="text-gray-600 text-sm">km/h</span>
            </p>
          </div>
          <div className="bg-white p-3 rounded-md border border-gray-200 shadow-sm">
            <p className="text-sm text-gray-600 font-medium">Max Speed</p>
            <p className="text-xl font-semibold text-[#2596be]">
              {statistics.maxSpeed.toFixed(1)}{" "}
              <span className="text-gray-600 text-sm">km/h</span>
            </p>
          </div>
          <div
            className={`p-3 rounded-md border ${
              statistics.violations > 0
                ? "bg-red-50 border-red-200"
                : "bg-green-50 border-green-200"
            }`}
          >
            <p className="text-sm text-gray-600 font-medium">
              Possible Speed Violations
            </p>
            <p
              className={`text-xl font-semibold ${
                statistics.violations > 0 ? "text-red-600" : "text-green-600"
              }`}
            >
              {statistics.violations}
            </p>
          </div>
        </div>

        <div className="flex justify-between items-center mt-4">
          <Select
            value={speedFilter}
            onValueChange={(value: SpeedFilter) => setSpeedFilter(value)}
          >
            <SelectTrigger className="w-[180px] bg-white border-gray-200 text-gray-800">
              <SelectValue placeholder="Filter by speed" />
            </SelectTrigger>
            <SelectContent className="bg-white border-gray-200 text-gray-800">
              <SelectItem value="all">All Trips</SelectItem>
              <SelectItem value="within">Within Limit</SelectItem>
              <SelectItem value="over">Over Speed</SelectItem>
            </SelectContent>
          </Select>

          <div className="flex gap-2 items-center">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="inline-flex items-center gap-1 text-gray-800 text-sm bg-blue-50 px-3 py-1.5 rounded-md border border-blue-200">
                    <Info className="h-4 w-4 text-blue-600" />
                    Dubai Speed Rules
                  </div>
                </TooltipTrigger>
                <TooltipContent
                  side="left"
                  className="max-w-xs bg-white text-gray-800 border-gray-200 p-3 shadow-lg"
                >
                  <p className="text-sm mb-2 font-semibold">
                    Dubai Speed Limit Rules:
                  </p>
                  <ul className="text-xs space-y-1 list-disc pl-4">
                    <li>
                      Speed violations occur when your vehicle exceeds the
                      posted speed limit
                    </li>
                    <li>
                      Dubai roads have clearly marked speed limits (typically
                      80-120 km/h)
                    </li>
                    <li>
                      Violations are detected by both mobile and fixed radar
                      systems
                    </li>
                  </ul>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="flex gap-2 bg-white border-gray-200 text-gray-800 hover:bg-gray-100 hover:text-[#2596be]"
                >
                  <Filter className="h-4 w-4" />
                  Sort By
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-white border-gray-200 text-gray-800">
                <DropdownMenuItem
                  onClick={() => toggleSort("date")}
                  className="hover:bg-gray-100 hover:text-[#2596be]"
                >
                  Date{" "}
                  {sortField === "date" &&
                    (sortDirection === "asc" ? (
                      <SortAsc className="inline h-4 w-4" />
                    ) : (
                      <SortDesc className="inline h-4 w-4" />
                    ))}
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => toggleSort("startTime")}
                  className="hover:bg-gray-100 hover:text-[#2596be]"
                >
                  Start Time{" "}
                  {sortField === "startTime" &&
                    (sortDirection === "asc" ? (
                      <SortAsc className="inline h-4 w-4" />
                    ) : (
                      <SortDesc className="inline h-4 w-4" />
                    ))}
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => toggleSort("endTime")}
                  className="hover:bg-gray-100 hover:text-[#2596be]"
                >
                  End Time{" "}
                  {sortField === "endTime" &&
                    (sortDirection === "asc" ? (
                      <SortAsc className="inline h-4 w-4" />
                    ) : (
                      <SortDesc className="inline h-4 w-4" />
                    ))}
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => toggleSort("speed")}
                  className="hover:bg-gray-100 hover:text-[#2596be]"
                >
                  Speed{" "}
                  {sortField === "speed" &&
                    (sortDirection === "asc" ? (
                      <SortAsc className="inline h-4 w-4" />
                    ) : (
                      <SortDesc className="inline h-4 w-4" />
                    ))}
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => toggleSort("distance")}
                  className="hover:bg-gray-100 hover:text-[#2596be]"
                >
                  Distance{" "}
                  {sortField === "distance" &&
                    (sortDirection === "asc" ? (
                      <SortAsc className="inline h-4 w-4" />
                    ) : (
                      <SortDesc className="inline h-4 w-4" />
                    ))}
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => toggleSort("time")}
                  className="hover:bg-gray-100 hover:text-[#2596be]"
                >
                  Duration{" "}
                  {sortField === "time" &&
                    (sortDirection === "asc" ? (
                      <SortAsc className="inline h-4 w-4" />
                    ) : (
                      <SortDesc className="inline h-4 w-4" />
                    ))}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        {isAnalyzing ? (
          <div className="flex flex-col items-center justify-center py-12">
            <div className="w-10 h-10 border-4 border-t-[#2596be] border-[#2596be]/30 rounded-full animate-spin mb-4"></div>
            <p className="text-gray-700 font-medium">Analyzing your trips...</p>
            <p className="text-gray-500 mt-2">This may take a moment</p>
          </div>
        ) : (
          <div className="rounded border border-gray-200 overflow-hidden shadow-sm">
            <Table>
              <TableHeader className="bg-gray-50">
                <TableRow className="border-gray-200">
                  <TableHead
                    className="text-gray-700 font-semibold cursor-pointer hover:text-[#2596be]"
                    onClick={() => toggleSort("date")}
                  >
                    Date{" "}
                    {sortField === "date" &&
                      (sortDirection === "asc" ? (
                        <SortAsc className="inline h-4 w-4" />
                      ) : (
                        <SortDesc className="inline h-4 w-4" />
                      ))}
                  </TableHead>
                  <TableHead
                    className="text-gray-700 font-semibold cursor-pointer hover:text-[#2596be]"
                    onClick={() => toggleSort("startTime")}
                  >
                    Start Time{" "}
                    {sortField === "startTime" &&
                      (sortDirection === "asc" ? (
                        <SortAsc className="inline h-4 w-4" />
                      ) : (
                        <SortDesc className="inline h-4 w-4" />
                      ))}
                  </TableHead>
                  <TableHead
                    className="text-gray-700 font-semibold cursor-pointer hover:text-[#2596be]"
                    onClick={() => toggleSort("endTime")}
                  >
                    End Time{" "}
                    {sortField === "endTime" &&
                      (sortDirection === "asc" ? (
                        <SortAsc className="inline h-4 w-4" />
                      ) : (
                        <SortDesc className="inline h-4 w-4" />
                      ))}
                  </TableHead>
                  <TableHead className="text-gray-700 font-semibold">
                    Route
                  </TableHead>
                  <TableHead
                    className="text-gray-700 font-semibold text-right cursor-pointer hover:text-[#2596be]"
                    onClick={() => toggleSort("distance")}
                  >
                    Distance (km){" "}
                    {sortField === "distance" &&
                      (sortDirection === "asc" ? (
                        <SortAsc className="inline h-4 w-4" />
                      ) : (
                        <SortDesc className="inline h-4 w-4" />
                      ))}
                  </TableHead>
                  <TableHead
                    className="text-gray-700 font-semibold text-right cursor-pointer hover:text-[#2596be]"
                    onClick={() => toggleSort("time")}
                  >
                    Duration{" "}
                    {sortField === "time" &&
                      (sortDirection === "asc" ? (
                        <SortAsc className="inline h-4 w-4" />
                      ) : (
                        <SortDesc className="inline h-4 w-4" />
                      ))}
                  </TableHead>
                  <TableHead
                    className="text-gray-700 font-semibold text-right cursor-pointer hover:text-[#2596be]"
                    onClick={() => toggleSort("speed")}
                  >
                    Avg Speed{" "}
                    {sortField === "speed" &&
                      (sortDirection === "asc" ? (
                        <SortAsc className="inline h-4 w-4" />
                      ) : (
                        <SortDesc className="inline h-4 w-4" />
                      ))}
                  </TableHead>
                  <TableHead className="text-gray-700 font-semibold text-right">
                    Speed Limit
                  </TableHead>
                  <TableHead className="text-gray-700 font-semibold text-center">
                    Status
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {speedAnalysisData.length > 0 ? (
                  speedAnalysisData.map((result, index) => (
                    <TableRow
                      key={index}
                      className={
                        result.status === "Yes"
                          ? "border-gray-200 bg-red-50"
                          : "border-gray-200 hover:bg-gray-50"
                      }
                    >
                      <TableCell className="text-gray-700 font-medium">
                        {formatTripDate(result.date)}
                      </TableCell>
                      <TableCell className="text-gray-700">
                        {result.start_time}
                      </TableCell>
                      <TableCell className="text-gray-700">
                        {result.end_time}
                      </TableCell>
                      <TableCell className="text-gray-700">
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <span className="underline decoration-dotted underline-offset-2 cursor-help font-medium">
                                {result.route}
                              </span>
                            </TooltipTrigger>
                            <TooltipContent className="bg-white border-gray-200 text-gray-700 p-3 max-w-xs shadow-lg">
                              <p className="font-medium text-xs">
                                {result.roadName || "Unknown Road"}
                              </p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </TableCell>
                      <TableCell className="text-right font-medium text-[#2596be]">
                        {result.distance_.toFixed(2)}{" "}
                        <span className="text-gray-600">km</span>
                      </TableCell>
                      <TableCell className="text-right font-medium text-[#2596be]">
                        {formatDuration(result.duration)}
                      </TableCell>
                      <TableCell
                        className={`text-right font-medium ${
                          !Number(result.avg_speed).toFixed(1)
                            ? "text-red-600"
                            : "text-[#2596be]"
                        }`}
                      >
                        {Number(result.avg_speed).toFixed(1)}{" "}
                        <span className="text-gray-600">km/h</span>
                      </TableCell>
                      <TableCell className="text-right text-gray-700 font-medium">
                        <span>
                          {result.speed_limit}{" "}
                          <span className="text-gray-600">km/h</span>
                        </span>
                      </TableCell>
                      <TableCell className="text-center">
                        {result.status === "No" ? (
                          <div className="flex justify-center items-center">
                            <Check className="text-green-600 h-5 w-5" />{" "}
                            <span className="ml-1 text-green-600 font-medium">
                              OK
                            </span>
                          </div>
                        ) : (
                          <div className="flex justify-center items-center">
                            <X className="text-red-600 h-5 w-5" />{" "}
                            <span className="ml-1 text-red-600 font-medium">
                              Over
                            </span>
                          </div>
                        )}
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={9}
                      className="text-center py-6 text-gray-600 border-gray-200"
                    >
                      {isInitialized
                        ? "No consecutive toll gate trips found to calculate speed."
                        : "Preparing speed analysis..."}
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        )}

        <div className="mt-4 px-4 py-3 bg-blue-50 border border-blue-200 rounded-md text-sm text-blue-700">
          <p className="flex items-center gap-1.5">
            <Info className="h-4 w-4" />
            <span className="font-medium">
              Dubai Speed Enforcement Info:
            </span>{" "}
            Speed violations occur when your vehicle exceeds the posted speed
            limit on Dubai roads (typically 80-120 km/h).
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default TripSpeedTable;
