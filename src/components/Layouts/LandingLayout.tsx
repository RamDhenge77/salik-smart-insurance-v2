import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Header from "../Header";
import { TripData } from "../FileUploader";
import { useToast } from "@/hooks/use-toast";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { RiskThresholds } from "../RiskFactorConfig";
import LandingPage from "../dashboard/LandingPage";
import DashboardLayout from "./DashboardLayout";
import { useCarContext } from "@/context/Context";
import { SidebarProvider } from "../ui/sidebar";
import SidebarNav from "../SidebarNav";

const LandingLayout = () => {
  // const [tripData, setTripData] = useState<TripData[]>([]);
  const {
    tripData,
    setTripData,
    handleFileProcessed,
    showContent,
    setShowContent,
  } = useCarContext();
  // const [showContent, setShowContent] = useState(false);
  const [uploadKey, setUploadKey] = useState(Date.now());
  const { toast } = useToast();
  const [chatOpen, setChatOpen] = useState(false);

  useEffect(() => {
    localStorage.removeItem("tripData");
    localStorage.removeItem("driverProfile");
    localStorage.removeItem("riskFactors");
    localStorage.clear();
  }, []);

  // Attempt to restore data from localStorage if available
  useEffect(() => {
    try {
      const savedData = localStorage.getItem("tripData");
      // console.log("Saved data from localStorage:", savedData);

      if (savedData) {
        const parsed = JSON.parse(savedData);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setTripData(parsed);
          setShowContent(true);
          console.log(
            "Restored data from localStorage:",
            parsed.length,
            "trips"
          );
        }
      }
    } catch (error) {
      console.error("Failed to restore trip data from localStorage:", error);
    }
  }, []);

  const navigate = useNavigate();
  useEffect(() => {
    if (showContent) {
      navigate("/dashboard");
    } else {
      navigate("/");
    }
  }, [showContent]);

  return (
    <SidebarProvider>
      <div className="min-h-screen w-full relative">
        <div className="fixed inset-0 z-0">
          {/* Base wood background with realistic car interior texture */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#5a3d25] to-[#2b1d13]">
            {/* Polished wood grain pattern overlay - more realistic car dashboard */}
            <div
              className="absolute inset-0 opacity-40"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='200' height='200' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23d9b384' fill-opacity='0.15' fill-rule='evenodd'/%3E%3C/svg%3E")`,
                backgroundSize: "150px 150px",
              }}
            ></div>

            {/* Enhanced wood grain lines - more prominent and realistic */}
            <div
              className="absolute inset-0 opacity-25"
              style={{
                backgroundImage: `repeating-linear-gradient(80deg, transparent, transparent 15px, rgba(188, 143, 96, 0.15) 15px, rgba(188, 143, 96, 0.15) 17px)`,
              }}
            ></div>

            {/* Second layer of crossed wood grain for more texture */}
            <div
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage: `repeating-linear-gradient(170deg, transparent, transparent 25px, rgba(188, 143, 96, 0.1) 25px, rgba(188, 143, 96, 0.1) 28px)`,
              }}
            ></div>

            {/* High-gloss finish with a realistic car wooden panel shine */}
            <div className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-white/30"></div>

            {/* Enhanced varnish reflection effect - more realistic car dashboard */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/25 via-transparent to-white/15"></div>

            {/* Lacquer finish sheen to mimic luxury car interior wood panels */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>

            {/* Additional glossy highlight spots like on car dashboards */}
            <div className="absolute inset-0">
              <div className="absolute top-[10%] right-[25%] w-[30%] h-[15%] bg-white/10 blur-xl rounded-full"></div>
              <div className="absolute bottom-[20%] left-[15%] w-[25%] h-[10%] bg-white/10 blur-xl rounded-full"></div>
            </div>
          </div>
        </div>

        <div className="flex">
          <SidebarNav />
          <div className="min-h-screen flex flex-col">
            <Header />

            <div
              className={`container relative mx-auto px-4 py-8 ${
                !showContent
                  ? "min-h-[85vh] flex items-center justify-center"
                  : ""
              }`}
            >
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default LandingLayout;
