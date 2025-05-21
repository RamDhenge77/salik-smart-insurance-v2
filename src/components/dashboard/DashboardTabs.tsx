import React, { useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BarChart,
  Calculator,
  CalendarCheck2,
  CarFront,
  CarTaxiFront,
  CircleUserRound,
  ClipboardList,
  ClipboardPlus,
  Gauge,
  Handshake,
  MessageCircle,
  Wrench,
} from "lucide-react";
import { TripData } from "../FileUploader";
import DrivingAnalytics from "../DrivingAnalytics";
import TripSpeedTable from "../TripSpeedTable";
import InsuranceAdjustment from "../InsuranceAdjustment";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { RiskThresholds } from "../RiskFactorConfig";
import AskAgent from "../AskAgent";
import BuyCar from "../BuyCar";
import SellCar from "../SellCar";
import Insurance from "../Insurance";
import Maintenance from "../Maintenance";
import HireDriver from "../HireDriver/HireDriver";
import RequestInspectionPage from "../RenewRegistration/RequestInspectionPage";
import RenewRegistration from "../RenewRegistration";
import CarLeasing from "../CarLeasing";
import CarFinancing from "../CarFinancing";

// Adjusted risk thresholds with lower adjustment percentages to stay within +/-8% range
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

interface DashboardTabsProps {
  tripData: TripData[];
  uploadKey: number;
  riskThresholds?: RiskThresholds;
  onRiskThresholdsChange?: (thresholds: RiskThresholds) => void;
}

const DashboardTabs: React.FC<DashboardTabsProps> = ({
  tripData,
  uploadKey,
  riskThresholds: propRiskThresholds,
}) => {
  // Get the risk thresholds from local storage
  const [localRiskThresholds] = useLocalStorage<RiskThresholds>(
    "riskThresholds",
    defaultRiskThresholds
  );

  // Use provided risk thresholds from props if available, otherwise use local storage
  const riskThresholds = propRiskThresholds || localRiskThresholds;

  // Debug the analysis process and risk thresholds
  useEffect(() => {
    // console.log(
    //   `DashboardTabs rendered with ${tripData.length} trips and key ${uploadKey}`
    // );
    // console.log("Current risk thresholds:", riskThresholds);

    // Save tripData to localStorage for persistence
    if (tripData && tripData.length > 0) {
      try {
        localStorage.setItem("tripData", JSON.stringify(tripData));
        // console.log("Saved trip data to localStorage");
      } catch (error) {
        console.error("Error saving trip data to localStorage:", error);
      }
    }
  }, [tripData, uploadKey, riskThresholds]);

  return (
    <Tabs
      defaultValue="analytics"
      key={`tabs-${uploadKey}`}
      className="bg-white text-gray-700 rounded-lg p-5 mt-10 shadow-[inset_-4px_6px_13px_#d1d5db,inset_-4px_-4px_10px_#ffffff]"
      id="dashboard-tabs"
    >
      <TabsList className="grid w-full grid-cols-8 mt-3 mb-8 bg-gray-50 border border-gray-200 rounded-lg overflow-hidden p-1 h-full">
        <TabsTrigger
          value="analytics"
          className="text-center py-2 data-[state=active]:bg-white data-[state=active]:text-gray-700 border-r border-gray-200 hover:bg-gray-100 transition-colors font-medium"
        >
          <BarChart className="h-4 w-4 mr-2" />
          Driving Analytics
        </TabsTrigger>
        <TabsTrigger
          value="insurance"
          className="text-center py-2 data-[state=active]:bg-white data-[state=active]:text-gray-700 border-r border-gray-200 hover:bg-gray-100 transition-colors font-medium"
        >
          <ClipboardPlus className="h-4 w-4 mr-2" />
          Insurance
        </TabsTrigger>
        <TabsTrigger
          value="buycar"
          className="text-center py-2 data-[state=active]:bg-white data-[state=active]:text-gray-700 border-r border-gray-200 hover:bg-gray-100 transition-colors font-medium"
        >
          <CarFront className="h-4 w-4 mr-2" />
          Buy/ Sell Car
        </TabsTrigger>
        <TabsTrigger
          value="renewRegistration"
          className="text-center py-2 data-[state=active]:bg-white data-[state=active]:text-gray-700 border-r border-gray-200 hover:bg-gray-100 transition-colors font-medium"
        >
          <CalendarCheck2 className="h-4 w-4 mr-2" />
          Renew Registration
        </TabsTrigger>
        <TabsTrigger
          value="maintenance"
          className="text-center py-2 data-[state=active]:bg-white data-[state=active]:text-gray-700 border-r border-gray-200 hover:bg-gray-100 transition-colors font-medium"
        >
          <CarFront className="h-4 w-4 mr-2" />
          Maintenance
        </TabsTrigger>

        <TabsTrigger
          value="hireDriver"
          className="text-center py-2 data-[state=active]:bg-white data-[state=active]:text-gray-700 border-r border-gray-200 hover:bg-gray-100 transition-colors font-medium"
        >
          <CircleUserRound className="h-4 w-4 mr-2" />
          Hire a Driver
        </TabsTrigger>

        <TabsTrigger
          value="carLeasing"
          className="text-center py-3 data-[state=active]:bg-white data-[state=active]:text-gray-700 hover:bg-gray-100 transition-colors font-medium"
        >
          <CarTaxiFront className="h-4 w-4 mr-2" />
          Car Leasing
        </TabsTrigger>
       
        <TabsTrigger
          value="carFinancing"
          className="text-center py-3 data-[state=active]:bg-white data-[state=active]:text-gray-700 hover:bg-gray-100 transition-colors font-medium"
        >
          <Handshake className="h-4 w-4 mr-2" />
          Car Financing
        </TabsTrigger>
      </TabsList>

      <TabsContent value="analytics" className="mt-6">
        <DrivingAnalytics
          tripData={tripData}
          key={`analytics-${uploadKey}`}
          uploadKey={uploadKey}
          riskThresholds={riskThresholds}
        />
      </TabsContent>

      <TabsContent value="buycar" className="mt-6">
        <BuyCar key={`buycar-${uploadKey}`} uploadKey={uploadKey} />
      </TabsContent>

      <TabsContent value="renewRegistration" className="mt-6">
        <RenewRegistration key={`renewRegistration-${uploadKey}`} />
      </TabsContent>

      <TabsContent value="askAgent" className="mt-6">
        <AskAgent tripData={tripData} key={`askagent-${uploadKey}`} />
      </TabsContent>

      <TabsContent value="insurance" className="mt-6">
        <Insurance />
      </TabsContent>

      <TabsContent value="maintenance" className="mt-6">
        <Maintenance />
      </TabsContent>

      <TabsContent value="hireDriver" className="mt-6">
        <HireDriver />
      </TabsContent>
     
      <TabsContent value="carLeasing" className="mt-6">
        <CarLeasing />
      </TabsContent>
      
      <TabsContent value="carFinancing" className="mt-6">
        <CarFinancing />
      </TabsContent>
    </Tabs>
  );
};

export default DashboardTabs;
