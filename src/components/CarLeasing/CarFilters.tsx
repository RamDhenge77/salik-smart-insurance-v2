import React from "react";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { FilterState } from "@/types/carLeasing";
import { Car, Filter, Gauge, Shield, Wrench } from "lucide-react";

interface CarFiltersProps {
  filters: FilterState;
  onFilterChange: (filters: Partial<FilterState>) => void;
}

const CarFilters = ({ filters, onFilterChange }: CarFiltersProps) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-6 flex items-center text-[#4F5063]">
        <Filter className="w-5 h-5 mr-2" />
        Filters
      </h3>

      <div className="space-y-8">
        {/* Car Type Filter */}
        <div className="space-y-2">
          <div className="flex items-center">
            <Car className="w-5 h-5 mr-2" />
            <Label
              htmlFor="car-type"
              className="text-sm font-medium text-[#4F5063]"
            >
              Car Type
            </Label>
          </div>
          <select
            id="car-type"
            className="w-full p-2 border rounded-md text-[#4F5063]"
            value={filters.carType}
            onChange={(e) => onFilterChange({ carType: e.target.value })}
          >
            <option value="all">All Types</option>
            <option value="economy">Economy</option>
            <option value="sedan">Sedan</option>
            <option value="suv">SUV</option>
            <option value="luxury">Luxury</option>
          </select>
        </div>

        {/* Budget Range */}
        <div className="space-y-2">
          <Label
            htmlFor="budget-range"
            className="text-sm font-medium text-[#4F5063]"
          >
            Monthly Budget (AED)
          </Label>
          <div className="pt-4">
            <Slider
              id="budget-range"
              defaultValue={[filters.minPrice, filters.maxPrice]}
              min={500}
              max={5000}
              step={100}
              onValueChange={(values) => {
                onFilterChange({
                  minPrice: values[0],
                  maxPrice: values[1],
                });
              }}
            />
            <div className="flex justify-between mt-2 text-sm text-[#4F5063]">
              <span>AED {filters.minPrice}</span>
              <span>AED {filters.maxPrice}</span>
            </div>
          </div>
        </div>

        {/* Insurance Option */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Shield className="w-5 h-5" />
            <Label
              htmlFor="insurance"
              className="text-sm font-medium text-[#4F5063]"
            >
              Include Insurance
            </Label>
          </div>
          <Switch
            id="insurance"
            checked={filters.includeInsurance}
            onCheckedChange={(checked) =>
              onFilterChange({ includeInsurance: checked })
            }
            className={`${filters.includeInsurance ?'!bg-btn-primary' :''}`}
          />
        </div>

        {/* Maintenance Option */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Wrench className="w-5 h-5" />
            <Label
              htmlFor="maintenance"
              className="text-sm font-medium text-[#4F5063]"
            >
              Include Maintenance
            </Label>
          </div>
          <Switch
            id="maintenance"
            checked={filters.includeMaintenance}
            onCheckedChange={(checked) =>
              onFilterChange({ includeMaintenance: checked })
            }
            className={`${filters.includeMaintenance ?'!bg-btn-primary' :''}`}
          />
        </div>

        {/* Mileage Cap */}
        <div className="space-y-2">
          <div className="flex items-center">
            <Gauge className="w-5 h-5 mr-2" />
            <Label
              htmlFor="mileage-cap"
              className="text-sm font-medium text-[#4F5063]"
            >
              Monthly Mileage Cap
            </Label>
          </div>
          <select
            id="mileage-cap"
            className="w-full p-2 border rounded-md text-[#4F5063]"
            value={filters.mileageCap}
            onChange={(e) =>
              onFilterChange({ mileageCap: parseInt(e.target.value) })
            }
          >
            <option value={1500}>1,500 km</option>
            <option value={2500}>2,500 km</option>
            <option value={3500}>3,500 km</option>
            <option value={5000}>5,000 km (Unlimited)</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default CarFilters;
