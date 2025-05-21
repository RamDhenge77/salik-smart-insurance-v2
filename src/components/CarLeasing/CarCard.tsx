import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { carLeasingData } from "@/data/car";
import { Badge } from "@/components/ui/badge";
import { useCarContext } from "@/context/Context";
import { set } from "date-fns";

interface CarCardProps {
  car: carLeasingData;
}

const CarCard = ({ car }: CarCardProps) => {
  const { setCarLeasingId, setCarLeasingSteps } = useCarContext();
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative h-48 bg-gray-200">
        <img
          src={car.image}
          alt={`${car.brand} ${car.model}`}
          className="w-full h-full object-cover"
        />
        <Badge className="absolute top-2 right-2 bg-btn-primary text-btn-textPrimary">
          {car.type.charAt(0).toUpperCase() + car.type.slice(1)}
        </Badge>
      </div>
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-bold text-lg">
            {car.brand} {car.model}
          </h3>
          <span className="text-sm text-gray-500">{car.year}</span>
        </div>
        <div className="flex items-center mb-4">
          <div className="bg-bgLight rounded px-2 py-1 text-sm mr-2">
            {car.engineSize}
          </div>
          <div className="bg-bgLight rounded px-2 py-1 text-sm mr-2">
            {car.transmission}
          </div>
          <div className="bg-bgLight rounded px-2 py-1 text-sm">
            {car.seats} seats
          </div>
        </div>
        <div className="text-xl font-bold text-primary mb-4">
          AED {car.monthlyPrice}{" "}
          <span className="text-sm text-gray-500 font-normal">/ month</span>
        </div>
        {/* <Link to={`/car-details/${car.id}`}> */}
        <Button
          variant="primary"
          className="w-full"
          onClick={() => {
            setCarLeasingId(car.id);
            setCarLeasingSteps(3);
          }}
        >
          View Details
        </Button>
        {/* </Link> */}
      </div>
    </div>
  );
};

export default CarCard;
