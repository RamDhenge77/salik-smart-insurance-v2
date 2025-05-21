
import React from "react";
import { Settings } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import RiskFactorConfig, { RiskThresholds } from "./RiskFactorConfig";
import { useLocalStorage } from "./hooks/useLocalStorage";

// Adjusted risk thresholds with lower adjustment percentages to stay within +/-8% range
const defaultRiskThresholds: RiskThresholds = {
  drivingFrequency: {
    veryHigh: 100,  // Increased threshold to make Very High less common
    high: 50,       // Increased threshold 
    medium: 25,     // Increased threshold
    low: 10,        // Increased threshold
    adjustment: {
      veryHigh: 3.0,  // Reduced from 15.0%
      high: 2.0,      // Reduced
      medium: 1.0,    // Reduced
      low: 0,
      veryLow: -1.5,  // Kept the same
    },
  },
  peakHourUsage: {
    high: 70,        // Increased threshold
    medium: 40,      // Increased threshold
    adjustment: {
      high: 2.0,     // Reduced from 5.0%
      medium: 1.0,   // Reduced
      low: 0,
    }
  },
  nightDriving: {
    high: 40,        // Kept the same
    medium: 20,      // Kept the same
    adjustment: {
      high: 1.5,     // Reduced
      medium: 0.5,   // Kept the same
      low: 0,
    }
  },
  speedBehavior: {
    adjustment: 2.5,  // Reduced from 10.0%
  },
  routeRisk: {
    adjustment: 1.0,  // Kept the same
  },
  weekdayWeekendMix: {
    adjustment: {
      balanced: -1.5,  // Kept the same
      unbalanced: 0.5, // Kept the same
    }
  },
  distanceTraveled: {
    high: 1500,       // New threshold based on actual data
    medium: 800,      // New threshold based on actual data
    adjustment: {
      high: 2.0,      // Reduced from 15.0%
      medium: 1.0,    // Reduced
      low: 0,
    }
  },
  overallDrivingStyle: {
    adjustment: -2.0, // Kept the same
  },
};

const SettingsDialog: React.FC = () => {
  const [riskThresholds, setRiskThresholds] = useLocalStorage<RiskThresholds>(
    "riskThresholds",
    defaultRiskThresholds
  );

  const handleRiskThresholdsChange = (newThresholds: RiskThresholds) => {
    setRiskThresholds(newThresholds);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-full hover:bg-[#2595be7e] hover:text-white">
          <Settings className="h-5 w-5" />
          <span className="sr-only">Settings</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Risk Configuration Settings</DialogTitle>
        </DialogHeader>
        <RiskFactorConfig
          thresholds={riskThresholds}
          onChange={handleRiskThresholdsChange}
        />
      </DialogContent>
    </Dialog>
  );
};

export default SettingsDialog;
