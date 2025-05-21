
import React from 'react';
import CarCard from './CarCard';
import { carLeasingData } from "@/data/car";

interface CarGridProps {
  cars: carLeasingData[];
}

const CarGrid = ({ cars }: CarGridProps) => {
  if (cars.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-xl font-medium text-[#4F5063]">No cars match your filters.</h3>
        <p className="text-[#4F5063]/80 mt-2">Try adjusting your filter options.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {cars.map((car) => (
        <CarCard key={car.id} car={car} />
      ))}
    </div>
  );
};

export default CarGrid;
