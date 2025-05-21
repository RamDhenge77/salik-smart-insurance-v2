import { useCarContext } from "@/context/Context";
import { Header } from "@radix-ui/react-accordion";
import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import DashboardStatCards from "../dashboard/DashboardStatCards";
import ChatWithAgent from "../ChatWithAgent";

const DashboardLayout = () => {
  const { uploadKey, tripData, setTripData } = useCarContext();
  // console.log('DashboardLayout tripData:', tripData);

  useEffect(() => {
    try {
      const savedData = localStorage.getItem("tripData");
      // console.log("Saved data from localStorage:", savedData);

      if (savedData) {
        const parsed = JSON.parse(savedData);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setTripData(parsed);
          // setShowContent(true);
          // console.log(
          //   "Restored data from localStorage:",
          //   parsed.length,
          //   "trips"
          // );
        }
      }
    } catch (error) {
      console.error("Failed to restore trip data from localStorage:", error);
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col relative">
      <div className="fixed bottom-6 right-8 z-50">
        <ChatWithAgent tripData={tripData} />
      </div>
      <main className="flex-1">
        <div className="space-y-8 animate-fade-in relative" key={uploadKey}>
          {tripData.length > 0 && <DashboardStatCards tripData={tripData} />}
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
