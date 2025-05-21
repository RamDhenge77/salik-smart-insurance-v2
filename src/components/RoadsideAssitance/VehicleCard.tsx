import React from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Car } from "lucide-react";
import { cn } from "@/lib/utils";

export type VehicleProps = {
  id: string;
  plateNo: string;
  make: string;
  model: string;
  year: string;
  chassisNo: string;
  image?: string;
  onSelect?: (id: string) => void;
};

export default function VehicleCard({
  id,
  plateNo,
  make,
  model,
  year,
  chassisNo,
  image,
  onSelect,
}: VehicleProps) {
  return (
    <Card className="overflow-hidden shadow-md border border-gray-200">
      <div className="h-48 bg-gray-100 flex items-center justify-center">
        {image ? (
          <img
            src={image}
            alt={`${make} ${model}`}
            className="h-full w-full object-contain"
          />
        ) : (
          <div className="flex items-center justify-center h-full w-full bg-gray-200">
            <Car className="h-20 w-20 text-gray-700" />
          </div>
        )}
      </div>
      <CardContent className="pt-4">
        <h3 className="text-xl font-bold flex items-center justify-start flex-wrap space-y-1">
          <span className="bg-[#59aac8b1] text-white px-2 py-1 rounded mr-2">
            {plateNo}
          </span>
          <span className="text-gray-600">{make}</span>
          <span className="text-gray-600">{model}</span>
        </h3>
        <div className="mt-2 space-y-1">
          <p className="text-sm text-gray-600">
            <span className="font-medium">Year:</span> {year}
          </p>
          <p className="text-sm text-gray-600">
            <span className="font-medium">Chassis No:</span> {chassisNo}
          </p>
        </div>
      </CardContent>
      {onSelect && (
        <CardFooter>
          <Button
            variant="primary"
            onClick={() => onSelect(id)}
            className={cn("w-full", "")}
          >
            Select Vehicle
          </Button>
        </CardFooter>
      )}
    </Card>
  );
}
