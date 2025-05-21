import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import VehicleCard from "@/components/RoadsideAssitance/VehicleCard";
import { VEHICLE_DATA } from "@/lib/data";
import { useCarContext } from "@/context/Context";

export default function VehiclePage() {
    const {setRoadsideAssistance} = useCarContext();
  return (
    <div className="min-h-screen flex flex-col">

      <div className="flex-1 py-8 px-4 max-w-7xl mx-auto w-full">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-[#2596be]">My Vehicles</h1>
          <Button variant="primary" className="">
            Add Vehicle
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {VEHICLE_DATA.map((vehicle) => (
            <VehicleCard
              key={vehicle.id}
              id={vehicle.id}
              plateNo={vehicle.plateNo}
              make={vehicle.make}
              model={vehicle.model}
              year={vehicle.year}
              chassisNo={vehicle.chassisNo}
              image={vehicle.image}
            />
          ))}
        </div>

        <div className="mt-12 bg-salik-gray-50 rounded-lg p-6">
          <h2 className="text-xl font-bold mb-4">Need Assistance?</h2>
          <p className="text-salik-gray-600 mb-4">
            Request roadside assistance or other services for your vehicle.
          </p>
            <Button variant="primary" className="" onClick={() => {setRoadsideAssistance(3)}}>
              Request Service
            </Button>
        </div>
      </div>

      <footer className="bg-salik-gray-50 py-6">
        <div className="max-w-7xl mx-auto px-4 text-center text-salik-gray-600">
          <p>&copy; {new Date().getFullYear()} Salik. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}