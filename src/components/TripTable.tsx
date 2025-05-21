
import React, { useState } from "react";
import { TripData } from "./FileUploader";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Search, Clock, AlertTriangle, Gauge } from "lucide-react";
import { cn } from "@/lib/utils";
import { tollGates } from "@/utils/tollGateData";

interface TripTableProps {
  tripData: TripData[];
}

const TripTable: React.FC<TripTableProps> = ({ tripData }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const filteredData = React.useMemo(() => {
    console.log("Filtering trip data with search term:", searchTerm);
    console.log("Total trip data available:", tripData.length);
    
    if (!searchTerm) return tripData;
    
    return tripData.filter(trip => 
      trip.tollGate.toLowerCase().includes(searchTerm.toLowerCase()) ||
      trip.date.includes(searchTerm) ||
      trip.time.includes(searchTerm) ||
      trip.direction.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [tripData, searchTerm]);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const currentData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const isDuringPeakHours = (time: string) => {
    const hour = parseInt(time.split(':')[0]);
    return (hour >= 6 && hour < 10) || (hour >= 16 && hour < 20);
  };

  const isDuringNightHours = (time: string) => {
    const hour = parseInt(time.split(':')[0]);
    return hour >= 22 || hour < 5;
  };

  const getTripInsights = (trip: TripData) => {
    const tollGateInfo = tollGates[trip.tollGate];
    const speedLimit = tollGateInfo?.speedLimit || 100;
    
    const lowerBound = Math.max(speedLimit - 20, 50);
    const upperBound = Math.min(speedLimit + 15, 130);
    
    const randomFactor = ((trip.id * 13) % 100) / 100;
    const speedRange = upperBound - lowerBound;
    const mockSpeed = Math.floor(lowerBound + (speedRange * randomFactor));
    
    const isOverspeeding = mockSpeed > speedLimit;
    
    return {
      averageSpeed: mockSpeed,
      isOverspeeding,
      isPeakHour: isDuringPeakHours(trip.time),
      isNightDriving: isDuringNightHours(trip.time),
    };
  };

  return (
    <Card className="bg-white border-gray-200">
      <CardHeader className="border-b border-gray-200">
        <CardTitle className="text-gray-800">Trip History</CardTitle>
        <CardDescription className="text-gray-500">
          {tripData.length} total trips recorded in your statement
        </CardDescription>
        <div className="flex gap-2 mt-4">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search trips..."
              className="pl-8 bg-gray-50 border-gray-200 text-gray-700 placeholder:text-gray-400"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="bg-gray-50">
                <TableRow className="border-gray-200">
                  <TableHead className="text-gray-600">Date</TableHead>
                  <TableHead className="text-gray-600">Time</TableHead>
                  <TableHead className="text-gray-600">Toll Gate</TableHead>
                  <TableHead className="text-gray-600">Direction</TableHead>
                  <TableHead className="text-gray-600">Trip Insights</TableHead>
                  <TableHead className="text-right text-gray-600">Amount (AED)</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentData.map((trip) => {
                  const insights = getTripInsights(trip);
                  return (
                    <TableRow key={trip.id} className="border-gray-200 hover:bg-gray-50">
                      <TableCell className="text-gray-700">{trip.date}</TableCell>
                      <TableCell className="text-gray-700">{trip.time}</TableCell>
                      <TableCell className="text-gray-700">{trip.tollGate}</TableCell>
                      <TableCell className="text-gray-700">{trip.direction}</TableCell>
                      <TableCell>
                        <div className="flex gap-3 items-center">
                          <div className="flex items-center gap-1">
                            <Gauge className="h-4 w-4 text-gray-500" />
                            <span className={cn(
                              "text-sm",
                              insights.isOverspeeding ? "text-red-500" : "text-gray-700"
                            )}>
                              {insights.averageSpeed} km/h
                            </span>
                          </div>
                          
                          {insights.isPeakHour && (
                            <div className="flex items-center gap-1 text-amber-600">
                              <Clock className="h-4 w-4" />
                              <span className="text-sm">Peak</span>
                            </div>
                          )}
                          
                          {insights.isNightDriving && (
                            <div className="flex items-center gap-1 text-blue-600">
                              <Clock className="h-4 w-4" />
                              <span className="text-sm">Night</span>
                            </div>
                          )}
                          
                          {insights.isOverspeeding && (
                            <div className="flex items-center gap-1 text-red-500">
                              <AlertTriangle className="h-4 w-4" />
                              <span className="text-sm">Speed</span>
                            </div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="text-right font-medium text-gray-700">{trip.amount.toFixed(2)}</TableCell>
                    </TableRow>
                  );
                })}
                {currentData.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={6} className="py-8 text-center text-gray-500">
                      No trips found matching your search.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>
        
        {totalPages > 1 && (
          <div className="flex justify-between items-center mt-4">
            <div className="text-sm text-gray-500">
              Showing {(currentPage - 1) * itemsPerPage + 1}-
              {Math.min(currentPage * itemsPerPage, filteredData.length)} of {filteredData.length} trips
            </div>
            <div className="flex space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(currentPage - 1)}
                disabled={currentPage === 1}
                className="border-gray-200 bg-white text-gray-700 hover:bg-gray-50"
              >
                Previous
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="border-gray-200 bg-white text-gray-700 hover:bg-gray-50"
              >
                Next
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default TripTable;
