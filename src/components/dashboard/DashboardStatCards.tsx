import React, { useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Car, Calendar, BarChart, Clock, CalendarDays } from "lucide-react";
import { TripData } from "../FileUploader";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { format } from "date-fns";
import { useCarContext } from "@/context/Context";

interface DashboardStatCardsProps {
  tripData: TripData[];
}

const DashboardStatCards: React.FC<DashboardStatCardsProps> = (
  {
    // tripData,
  }
) => {
  const { tripData, tripDataAll } = useCarContext();
  console.log("tripData", tripData);

  const totalTrips = tripData.length;
  const uniqueDays = new Set(tripData.map((trip) => trip.date)).size;
  const averageTripsPerDay =
    totalTrips > 0 ? (totalTrips / uniqueDays).toFixed(1) : 0;
  const tripsInPeakHours = tripData.filter((trip) => {
    const hour = parseInt(trip.time.split(":")[0]);
    return (hour >= 6 && hour < 10) || (hour >= 16 && hour < 20);
  }).length;
  const peakHoursPercentage =
    totalTrips > 0 ? ((tripsInPeakHours / totalTrips) * 100).toFixed(0) : 0;
  const [totalKilometers, setTotalKilometers] = React.useState("");
  const [valuation, setValuation] = React.useState("");
  const totalSalikCost = tripDataAll.reduce((acc, trip) => {
    const salikCost = Number.isFinite(trip.amount) ? Number(trip.amount) : 0;
    return acc + salikCost;
  }, 0);
  const dates = tripData.map((trip) => new Date(trip.date).getTime());
  const minDate = new Date(Math.min(...dates));
  const maxDate = new Date(Math.max(...dates));
  // console.log("Min Date:", minDate.toLocaleDateString());
  // console.log("Max Date:", maxDate.toLocaleDateString());
  // console.log("tripData:", tripData[0]);

  // tripData.forEach((trip, index) => {
  //   console.log(index, trip.amount, Number(trip.amount));
  // });
  // console.log("Total Salik Cost:", totalSalikCost);

  function getCarValuation(km) {
    const ranges = [
      {
        min: 100000,
        max: 120000,
        value: "85,000–90,000 AED ",
        notes: "Excellent condition, full service history",
      },
      {
        min: 120001,
        max: 150000,
        value: "80,000–85,000 AED ",
        notes: "Well-maintained, minor wear",
      },
      {
        min: 150001,
        max: 180000,
        value: "75,000–80,000 AED ",
        notes: "Average condition, regular maintenance",
      },
      {
        min: 180001,
        max: 210000,
        value: "70,000–75,000 AED ",
        notes: "Higher wear, possible minor repairs",
      },
      {
        min: 210001,
        max: 240000,
        value: "65,000–70,000 AED",
        notes: "Noticeable wear, potential major service",
      },
      {
        min: 240001,
        max: 270000,
        value: "60,000–65,000 AED",
        notes: "Significant wear, major service likely",
      },
      {
        min: 270001,
        max: Infinity,
        value: "55,000–60,000 AED ",
        notes: "Very high mileage, condition varies",
      },
    ];

    const result = ranges.find((r) => km >= r.min && km <= r.max);

    return result
      ? `${result.value}`
      : "Below 100,000 km – valuation not available.";
  }

  useEffect(() => {
    if (totalKilometers === "") {
      setValuation("");
      return;
    }

    // Parse the input and remove any non-numeric characters
    const km = parseInt(totalKilometers.replace(/[^0-9]/g, ""), 10);

    // Check if the parsed value is a valid number
    if (isNaN(km)) {
      setValuation("Invalid input");
      return;
    }

    // Get the car valuation based on the mileage
    const carValuation = getCarValuation(km);

    setValuation(carValuation);
  }, [totalKilometers]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card
          className="border-none transition-all duration-300 rounded-[1rem]"
          style={{
            boxShadow:
              "inset 0px 2px 3px 2px white, 0px 17px 14px 0px rgba(0, 0, 0, 0.1)",
          }}
        >
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="mr-4 p-2 bg-blue-100 rounded-full">
                <Car className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-800 mb-1">
                  {totalTrips}
                </div>
                <p className="text-sm text-gray-600 font-medium">Total Trips</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <HoverCard openDelay={0}>
          <HoverCardTrigger>
            <Card
              className="border-none transition-all duration-300  rounded-[1rem] h-full"
              style={{
                boxShadow:
                  "inset 0px 2px 3px 2px white, 0px 17px 14px 0px rgba(0, 0, 0, 0.1)",
              }}
            >
              <CardContent className="p-6">
                <div className="flex items-center">
                  <div className="mr-4 p-2 bg-amber-100 rounded-full">
                    <Calendar className="h-5 w-5 text-amber-600" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-800 mb-1">
                      {uniqueDays}
                    </div>
                    <p className="text-sm text-gray-600 font-medium">
                      Active Days
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </HoverCardTrigger>
          <HoverCardContent className="w-80 p-4 border border-gray-100 bg-white rounded-md shadow-lg">
            <div className="flex items-center gap-5">
              <div className="bg-[#F0F8FA] p-3 rounded-full">
                <CalendarDays className="h-5 w-5" />
              </div>
              <div className="text-sm text-gray-600 mt-1 font-medium w-full flex flex-col gap-4 bg-[#ffff] p-3 rounded-md">
                <span>From Date: {format(minDate, "dd MMM, yyyy")}</span>
                <span>To Date: {format(maxDate, "dd MMM, yyyy")}</span>
              </div>
            </div>
          </HoverCardContent>
        </HoverCard>

        <Card
          className="border-none transition-all duration-300  rounded-[1rem]"
          style={{
            boxShadow:
              "inset 0px 2px 3px 2px white, 0px 17px 14px 0px rgba(0, 0, 0, 0.1)",
          }}
        >
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="mr-4 p-2 bg-green-100 rounded-full">
                <BarChart className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-800 mb-1">
                  {averageTripsPerDay}
                </div>
                <p className="text-sm text-gray-600 font-medium">
                  Avg. Trips Per Day
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card
          className="border-none transition-all duration-300  rounded-[1rem]"
          style={{
            boxShadow:
              "inset 0px 2px 3px 2px white, 0px 17px 14px 0px rgba(0, 0, 0, 0.1)",
          }}
        >
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="mr-4 p-2 bg-teal-100 rounded-full">
                <img
                  src="/lovable-uploads/dirham.svg"
                  className="h-5 w-5"
                  alt=""
                />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-800 mb-1">
                  {totalSalikCost}
                </div>
                <p className="text-sm text-gray-600 font-medium">
                  Total Salik Cost
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="flex items-center justify-end">
        <div
          className="w-[592px] h-[324px] overflow-hidden relative border-none transition-all duration-300  rounded-[1rem]"
          style={{
            boxShadow:
              "inset 0px 2px 3px 2px white, 0px 17px 14px 0px rgba(0, 0, 0, 0.2)",
          }}
        >
          <img
            src="/lovable-uploads/lexus-2.webp"
            alt=""
            className="h-full w-full object-contain p-3"
          />
          <div className="absolute top-6 left-5">
            <img src="/lovable-uploads/lexus-logo.svg" alt="" />
            <p className="text-[13px] font-medium font-nobile text-black mt-2 leading-5">
              Lexus GX 460, 2015
            </p>
            <p className="text-[12px] font-normal font-inter text-black leading-5">
              Plate No. B60828
            </p>
          </div>
          <div className="absolute bottom-3 left-5 flex items-center justify-between gap-7 w-[94%]">
            <div className="flex items-center gap-3">
              <Label className="text-[12px] font-normal font-inter text-black leading-5 w-[8.5rem]">
                Current Mileage(KM):
              </Label>
              <Input
                value={totalKilometers}
                onChange={(e) => setTotalKilometers(e.target.value)}
                className="text-[12px] w-[60%] px-1 leading-0 !py-0 bg-transparent border-0 border-b border-black text-black rounded-none shadow-none !focus:outline-none !focus:ring-0 !focus-visible:ring-0 focus-visible:ring-offset-0 !ring-0 !outline-none placeholder:italic"
                placeholder="Enter Your Mileage"
              />
            </div>
            <div className="flex items-center gap-3">
              <Label className="text-[12px] font-normal font-inter text-black leading-5 w-[5rem]">
                Est. Valuation:
              </Label>
              <Input
                value={valuation}
                className="text-[12px] w-[60%] px-1 py-1 bg-transparent border-0 border-b border-black text-black rounded-none shadow-none !focus:outline-none !focus:ring-0 !focus-visible:ring-0 focus-visible:ring-offset-0 !ring-0 !outline-none"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardStatCards;
