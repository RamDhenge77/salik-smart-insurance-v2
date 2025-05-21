import React, { useState, useEffect } from "react";
import { TripData } from "../FileUploader";
import DashboardStatCards from "./DashboardStatCards";
import DashboardTabs from "./DashboardTabs";
import LandingPage from "./LandingPage";
import { RiskThresholds } from "../RiskFactorConfig";
import "../../assets/salik-background.css";
import { useToast } from "@/hooks/use-toast";
import { useLocalStorage } from "../hooks/useLocalStorage";

import ChatWithAgent from "../ChatWithAgent";
import { useCarContext } from "@/context/Context";

const Dashboard: React.FC = () => {
  const { tripData, uploadKey } = useCarContext();

  const [riskThresholds] = useLocalStorage<RiskThresholds>("riskThresholds", {
    drivingFrequency: {
      veryHigh: 30,
      high: 20,
      medium: 10,
      low: 5,
      adjustment: {
        veryHigh: 15,
        high: 10,
        medium: 5,
        low: 0,
        veryLow: -5,
      },
    },
    peakHourUsage: {
      high: 60,
      medium: 30,
      adjustment: {
        high: 10,
        medium: 5,
        low: 0,
      },
    },
    nightDriving: {
      high: 40,
      medium: 20,
      adjustment: {
        high: 15,
        medium: 5,
        low: 0,
      },
    },
    speedBehavior: {
      adjustment: 20,
    },
    routeRisk: {
      adjustment: 10,
    },
    weekdayWeekendMix: {
      adjustment: {
        balanced: -5,
        unbalanced: 5,
      },
    },
    distanceTraveled: {
      high: 100,
      medium: 50,
      adjustment: {
        high: 15,
        medium: 5,
        low: 0,
      },
    },
    overallDrivingStyle: {
      adjustment: -10,
    },
  });
  return (
    <>
      <div className="space-y-8 animate-fade-in relative" key={uploadKey}>
        {/* <DashboardStatCards tripData={tripData} /> */}
        <DashboardTabs
          tripData={tripData}
          uploadKey={uploadKey}
          riskThresholds={riskThresholds}
        />
      </div>
      {/* <div className="fixed bottom-6 right-8 z-50">
        <ChatWithAgent tripData={tripData} />
      </div> */}
    </>
  );
};

export default Dashboard;
