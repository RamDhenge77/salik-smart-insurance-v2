import DrivingAnalytics from "@/components/DrivingAnalytics";
import { useCarContext } from "@/context/Context";
import { useLocalStorage } from "../components/hooks/useLocalStorage";
import { RiskThresholds } from "../components/RiskFactorConfig";
import React from "react";

const DrivingAnalyticsPage = () => {
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
      <DrivingAnalytics
        tripData={tripData}
        key={`analytics-${uploadKey}`}
        uploadKey={uploadKey}
        riskThresholds={riskThresholds}
      />
    </>
  );
};

export default DrivingAnalyticsPage;
