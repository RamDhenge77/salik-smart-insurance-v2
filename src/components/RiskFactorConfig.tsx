
import React from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export interface RiskThresholds {
  drivingFrequency: {
    veryHigh: number;
    high: number;
    medium: number;
    low: number;
    adjustment: {
      veryHigh: number;
      high: number;
      medium: number;
      low: number;
      veryLow: number;
    };
  };
  peakHourUsage: {
    high: number;
    medium: number;
    adjustment: {
      high: number;
      medium: number;
      low: number;
    };
  };
  nightDriving: {
    high: number;
    medium: number;
    adjustment: {
      high: number;
      medium: number;
      low: number;
    };
  };
  speedBehavior: {
    adjustment: number;
  };
  routeRisk: {
    adjustment: number;
  };
  weekdayWeekendMix: {
    adjustment: {
      balanced: number;
      unbalanced: number;
    };
  };
  distanceTraveled: {
    high: number;
    medium: number;
    adjustment: {
      high: number;
      medium: number;
      low: number;
    };
  };
  overallDrivingStyle: {
    adjustment: number;
  };
}

interface RiskFactorConfigProps {
  thresholds: RiskThresholds;
  onChange: (newThresholds: RiskThresholds) => void;
}

const RiskFactorConfig: React.FC<RiskFactorConfigProps> = ({ thresholds, onChange }) => {
  const handleInputChange = (path: string[], value: number) => {
    const newThresholds = { ...thresholds };
    let current: any = newThresholds;
    for (let i = 0; i < path.length - 1; i++) {
      current = current[path[i]];
    }
    current[path[path.length - 1]] = value;
    onChange(newThresholds);
  };

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Risk Factor Thresholds</h3>
        <div className="space-y-8">
          {/* Driving Frequency */}
          <div>
            <h4 className="font-medium mb-3">Driving Frequency</h4>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Risk Level</TableHead>
                  <TableHead>Trip Threshold</TableHead>
                  <TableHead>Adjustment (%)</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>Very High</TableCell>
                  <TableCell>
                    <Input
                      type="number"
                      value={thresholds.drivingFrequency.veryHigh}
                      onChange={(e) => handleInputChange(['drivingFrequency', 'veryHigh'], Number(e.target.value))}
                      className="w-24"
                    />
                  </TableCell>
                  <TableCell>
                    <Input
                      type="number"
                      value={thresholds.drivingFrequency.adjustment.veryHigh}
                      onChange={(e) => handleInputChange(['drivingFrequency', 'adjustment', 'veryHigh'], Number(e.target.value))}
                      className="w-24"
                    />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>High</TableCell>
                  <TableCell>
                    <Input
                      type="number"
                      value={thresholds.drivingFrequency.high}
                      onChange={(e) => handleInputChange(['drivingFrequency', 'high'], Number(e.target.value))}
                      className="w-24"
                    />
                  </TableCell>
                  <TableCell>
                    <Input
                      type="number"
                      value={thresholds.drivingFrequency.adjustment.high}
                      onChange={(e) => handleInputChange(['drivingFrequency', 'adjustment', 'high'], Number(e.target.value))}
                      className="w-24"
                    />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Medium</TableCell>
                  <TableCell>
                    <Input
                      type="number"
                      value={thresholds.drivingFrequency.medium}
                      onChange={(e) => handleInputChange(['drivingFrequency', 'medium'], Number(e.target.value))}
                      className="w-24"
                    />
                  </TableCell>
                  <TableCell>
                    <Input
                      type="number"
                      value={thresholds.drivingFrequency.adjustment.medium}
                      onChange={(e) => handleInputChange(['drivingFrequency', 'adjustment', 'medium'], Number(e.target.value))}
                      className="w-24"
                    />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Low</TableCell>
                  <TableCell>
                    <Input
                      type="number"
                      value={thresholds.drivingFrequency.low}
                      onChange={(e) => handleInputChange(['drivingFrequency', 'low'], Number(e.target.value))}
                      className="w-24"
                    />
                  </TableCell>
                  <TableCell>
                    <Input
                      type="number"
                      value={thresholds.drivingFrequency.adjustment.low}
                      onChange={(e) => handleInputChange(['drivingFrequency', 'adjustment', 'low'], Number(e.target.value))}
                      className="w-24"
                    />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Very Low</TableCell>
                  <TableCell>-</TableCell>
                  <TableCell>
                    <Input
                      type="number"
                      value={thresholds.drivingFrequency.adjustment.veryLow}
                      onChange={(e) => handleInputChange(['drivingFrequency', 'adjustment', 'veryLow'], Number(e.target.value))}
                      className="w-24"
                    />
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>

          {/* Peak Hour Usage */}
          <div>
            <h4 className="font-medium mb-3">Peak Hour Usage</h4>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Risk Level</TableHead>
                  <TableHead>Percentage Threshold</TableHead>
                  <TableHead>Adjustment (%)</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>High</TableCell>
                  <TableCell>
                    <Input
                      type="number"
                      value={thresholds.peakHourUsage.high}
                      onChange={(e) => handleInputChange(['peakHourUsage', 'high'], Number(e.target.value))}
                      className="w-24"
                    />
                  </TableCell>
                  <TableCell>
                    <Input
                      type="number"
                      value={thresholds.peakHourUsage.adjustment.high}
                      onChange={(e) => handleInputChange(['peakHourUsage', 'adjustment', 'high'], Number(e.target.value))}
                      className="w-24"
                    />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Medium</TableCell>
                  <TableCell>
                    <Input
                      type="number"
                      value={thresholds.peakHourUsage.medium}
                      onChange={(e) => handleInputChange(['peakHourUsage', 'medium'], Number(e.target.value))}
                      className="w-24"
                    />
                  </TableCell>
                  <TableCell>
                    <Input
                      type="number"
                      value={thresholds.peakHourUsage.adjustment.medium}
                      onChange={(e) => handleInputChange(['peakHourUsage', 'adjustment', 'medium'], Number(e.target.value))}
                      className="w-24"
                    />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Low</TableCell>
                  <TableCell>-</TableCell>
                  <TableCell>
                    <Input
                      type="number"
                      value={thresholds.peakHourUsage.adjustment.low}
                      onChange={(e) => handleInputChange(['peakHourUsage', 'adjustment', 'low'], Number(e.target.value))}
                      className="w-24"
                    />
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>

          {/* Night Driving */}
          <div>
            <h4 className="font-medium mb-3">Night Driving</h4>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Risk Level</TableHead>
                  <TableHead>Percentage Threshold</TableHead>
                  <TableHead>Adjustment (%)</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>High</TableCell>
                  <TableCell>
                    <Input
                      type="number"
                      value={thresholds.nightDriving.high}
                      onChange={(e) => handleInputChange(['nightDriving', 'high'], Number(e.target.value))}
                      className="w-24"
                    />
                  </TableCell>
                  <TableCell>
                    <Input
                      type="number"
                      value={thresholds.nightDriving.adjustment.high}
                      onChange={(e) => handleInputChange(['nightDriving', 'adjustment', 'high'], Number(e.target.value))}
                      className="w-24"
                    />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Medium</TableCell>
                  <TableCell>
                    <Input
                      type="number"
                      value={thresholds.nightDriving.medium}
                      onChange={(e) => handleInputChange(['nightDriving', 'medium'], Number(e.target.value))}
                      className="w-24"
                    />
                  </TableCell>
                  <TableCell>
                    <Input
                      type="number"
                      value={thresholds.nightDriving.adjustment.medium}
                      onChange={(e) => handleInputChange(['nightDriving', 'adjustment', 'medium'], Number(e.target.value))}
                      className="w-24"
                    />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Low</TableCell>
                  <TableCell>-</TableCell>
                  <TableCell>
                    <Input
                      type="number"
                      value={thresholds.nightDriving.adjustment.low}
                      onChange={(e) => handleInputChange(['nightDriving', 'adjustment', 'low'], Number(e.target.value))}
                      className="w-24"
                    />
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>

          {/* Speed Behavior */}
          <div>
            <h4 className="font-medium mb-3">Speed Behavior</h4>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Parameter</TableHead>
                  <TableHead>Adjustment (%)</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>Speed Limit Compliance</TableCell>
                  <TableCell>
                    <Input
                      type="number"
                      value={thresholds.speedBehavior.adjustment}
                      onChange={(e) => handleInputChange(['speedBehavior', 'adjustment'], Number(e.target.value))}
                      className="w-24"
                    />
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>

          {/* Route Risk */}
          <div>
            <h4 className="font-medium mb-3">Route Risk</h4>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Parameter</TableHead>
                  <TableHead>Adjustment (%)</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>Mixed Route Usage</TableCell>
                  <TableCell>
                    <Input
                      type="number"
                      value={thresholds.routeRisk.adjustment}
                      onChange={(e) => handleInputChange(['routeRisk', 'adjustment'], Number(e.target.value))}
                      className="w-24"
                    />
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>

          {/* Weekday/Weekend Mix */}
          <div>
            <h4 className="font-medium mb-3">Weekday/Weekend Mix</h4>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Usage Pattern</TableHead>
                  <TableHead>Adjustment (%)</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>Balanced Usage</TableCell>
                  <TableCell>
                    <Input
                      type="number"
                      value={thresholds.weekdayWeekendMix.adjustment.balanced}
                      onChange={(e) => handleInputChange(['weekdayWeekendMix', 'adjustment', 'balanced'], Number(e.target.value))}
                      className="w-24"
                    />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Unbalanced Usage</TableCell>
                  <TableCell>
                    <Input
                      type="number"
                      value={thresholds.weekdayWeekendMix.adjustment.unbalanced}
                      onChange={(e) => handleInputChange(['weekdayWeekendMix', 'adjustment', 'unbalanced'], Number(e.target.value))}
                      className="w-24"
                    />
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>

          {/* Distance Traveled */}
          <div>
            <h4 className="font-medium mb-3">Distance Traveled</h4>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Risk Level</TableHead>
                  <TableHead>Trip Threshold</TableHead>
                  <TableHead>Adjustment (%)</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>High</TableCell>
                  <TableCell>
                    <Input
                      type="number"
                      value={thresholds.distanceTraveled.high}
                      onChange={(e) => handleInputChange(['distanceTraveled', 'high'], Number(e.target.value))}
                      className="w-24"
                    />
                  </TableCell>
                  <TableCell>
                    <Input
                      type="number"
                      value={thresholds.distanceTraveled.adjustment.high}
                      onChange={(e) => handleInputChange(['distanceTraveled', 'adjustment', 'high'], Number(e.target.value))}
                      className="w-24"
                    />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Medium</TableCell>
                  <TableCell>
                    <Input
                      type="number"
                      value={thresholds.distanceTraveled.medium}
                      onChange={(e) => handleInputChange(['distanceTraveled', 'medium'], Number(e.target.value))}
                      className="w-24"
                    />
                  </TableCell>
                  <TableCell>
                    <Input
                      type="number"
                      value={thresholds.distanceTraveled.adjustment.medium}
                      onChange={(e) => handleInputChange(['distanceTraveled', 'adjustment', 'medium'], Number(e.target.value))}
                      className="w-24"
                    />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Low</TableCell>
                  <TableCell>-</TableCell>
                  <TableCell>
                    <Input
                      type="number"
                      value={thresholds.distanceTraveled.adjustment.low}
                      onChange={(e) => handleInputChange(['distanceTraveled', 'adjustment', 'low'], Number(e.target.value))}
                      className="w-24"
                    />
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>

          {/* Overall Driving Style */}
          <div>
            <h4 className="font-medium mb-3">Overall Driving Style</h4>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Parameter</TableHead>
                  <TableHead>Adjustment (%)</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>Consistent Pattern</TableCell>
                  <TableCell>
                    <Input
                      type="number"
                      value={thresholds.overallDrivingStyle.adjustment}
                      onChange={(e) => handleInputChange(['overallDrivingStyle', 'adjustment'], Number(e.target.value))}
                      className="w-24"
                    />
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default RiskFactorConfig;
