import React from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

type ServiceCardProps = {
  id: string;
  vehicleId: string;
  serviceType: string;
  date: string;
  status: string;
  pickupLocation: string;
  dropoffLocation?: string;
};

export default function ServiceCard({
  id,
  vehicleId,
  serviceType,
  date,
  status,
  pickupLocation,
  dropoffLocation,
}: ServiceCardProps) {
  // Format date to be more readable
  const formattedDate = new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <Card className="mb-4">
      <CardContent className="pt-6">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-bold">{serviceType}</h3>
            <p className="text-sm text-gray-600">{formattedDate}</p>
          </div>
          <Badge
            className={status === "Completed" ? "bg-green-500" : "bg-blue-500"}
          >
            {status}
          </Badge>
        </div>

        <div className="mt-4 space-y-2">
          <div>
            <span className="text-xs font-medium text-gray-500">PICKUP</span>
            <p className="text-sm">{pickupLocation}</p>
          </div>

          {dropoffLocation && (
            <div>
              <span className="text-xs font-medium text-gray-500">DROP OFF</span>
              <p className="text-sm">{dropoffLocation}</p>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="border-t pt-4 flex justify-end">
        <Button variant="outline" size="sm">
          View Details
        </Button>
      </CardFooter>
    </Card>
  );
}