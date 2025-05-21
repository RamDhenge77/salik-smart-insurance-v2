import React, { useState, useEffect } from "react";
import CarTypeSelector from "./CarTypeSelector";
import CarFilters from "./CarFilters";
import CarGrid from "./CarGrid";
import { carLeasingData } from "@/data/car";
import { FilterState } from "@/types/carLeasing";
import { useCarContext } from "@/context/Context";

const Cars = () => {
  const [selectedType, setSelectedType] = useState("all");
  const [filters, setFilters] = useState<FilterState>({
    carType: "all",
    minPrice: 500,
    maxPrice: 5000,
    includeInsurance: false,
    includeMaintenance: false,
    mileageCap: 2500,
  });

  const [filteredCars, setFilteredCars] = useState(carLeasingData);
  const { handleCarLeasingBack } = useCarContext();

  useEffect(() => {
    let result = [...carLeasingData];

    // Filter by car type
    if (filters.carType !== "all") {
      result = result.filter((car) => car.type === filters.carType);
    }

    // Filter by price range
    result = result.filter((car) => {
      let totalPrice = car.monthlyPrice;
      if (filters.includeInsurance) totalPrice += 300; // Example insurance cost
      if (filters.includeMaintenance) totalPrice += 200; // Example maintenance cost

      return totalPrice >= filters.minPrice && totalPrice <= filters.maxPrice;
    });

    setFilteredCars(result);
  }, [filters]);

  const handleTypeSelect = (type: string) => {
    setSelectedType(type);
    setFilters((prev) => ({ ...prev, carType: type }));
  };

  const handleFilterChange = (newFilters: Partial<FilterState>) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  };

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow bg-gray-50">
          <div
            className="text-primary hover:underline cursor-pointer mt-5 mx-4"
            onClick={() => handleCarLeasingBack()}
          >
            &larr; Back
          </div>
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-4">Browse Our Cars</h1>
            <p className="text-gray-600">
              Find the perfect car for your needs with our wide selection of
              vehicles.
            </p>
          </div>

          <CarTypeSelector
            selectedType={selectedType}
            onSelectType={handleTypeSelect}
          />

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-1">
              <CarFilters
                filters={filters}
                onFilterChange={handleFilterChange}
              />
            </div>

            <div className="lg:col-span-3">
              <CarGrid cars={filteredCars} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Cars;
