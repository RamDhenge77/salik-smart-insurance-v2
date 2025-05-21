import React from "react";
import { cn } from "@/lib/utils";

interface CarTypeSelectorProps {
  selectedType: string;
  onSelectType: (type: string) => void;
}

const CarTypeSelector = ({
  selectedType,
  onSelectType,
}: CarTypeSelectorProps) => {
  const carTypes = [
    { id: "all", name: "All Cars" },
    { id: "economy", name: "Economy" },
    { id: "sedan", name: "Sedan" },
    { id: "suv", name: "SUV" },
    { id: "luxury", name: "Luxury" },
  ];

  return (
    <div className="flex flex-wrap gap-4 mb-6">
      {carTypes.map((type) => (
        <button
          key={type.id}
          onClick={() => onSelectType(type.id)}
          className={cn(
            "px-6 py-3 rounded-md transition-all",
            selectedType === type.id
              ? "bg-btn-primary shadow-md"
              : "bg-gray-100 hover:bg-bgLight text-gray-800"
          )}
        >
          {type.name}
        </button>
      ))}
    </div>
  );
};

export default CarTypeSelector;
