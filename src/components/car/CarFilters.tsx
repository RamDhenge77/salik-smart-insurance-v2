
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider2";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { filterOptions } from "@/data/car";
import { Card, CardContent } from "@/components/ui/card";
import { FilterOptions } from "@/types/car";
import { X } from "lucide-react";

interface CarFiltersProps {
  onFilterChange: (filters: Partial<FilterOptions>) => void;
  onClearFilters: () => void;
  initialFilters?: Partial<FilterOptions>;
  activeFilters?: Partial<FilterOptions>;
}

const CarFilters: React.FC<CarFiltersProps> = ({ 
  onFilterChange, 
  onClearFilters,
  initialFilters,
  activeFilters = {}
}) => {
  const [selectedMake, setSelectedMake] = useState<string>("");
  const [selectedModel, setSelectedModel] = useState<string>("");
  const [selectedTrim, setSelectedTrim] = useState<string>("");
  const [priceRange, setPriceRange] = useState<number[]>([0, 500000]);
  const [kmRange, setKmRange] = useState<number[]>([0, 150000]);
  const [searchKeyword, setSearchKeyword] = useState<string>("");
  const [accordionValue, setAccordionValue] = useState<string>(""); 
  
  // Apply initial filters when component mounts or when activeFilters change
  useEffect(() => {
    if (activeFilters) {
      // Set the make if provided
      if (activeFilters.make && activeFilters.make.length > 0) {
        setSelectedMake(activeFilters.make[0]);
      } else {
        setSelectedMake("");
      }
      
      // Set the model if provided
      if (activeFilters.model && activeFilters.model.length > 0) {
        setSelectedModel(activeFilters.model[0]);
        // Auto-expand the advanced filters
        setAccordionValue("advanced-filters");
      } else {
        setSelectedModel("");
      }
      
      // Set the trim if provided
      if (activeFilters.trim && activeFilters.trim.length > 0) {
        setSelectedTrim(activeFilters.trim[0]);
      } else {
        setSelectedTrim("");
      }
      
      // Set price range if provided
      if (activeFilters.minPrice !== undefined && activeFilters.maxPrice !== undefined) {
        setPriceRange([activeFilters.minPrice, activeFilters.maxPrice]);
      } else {
        setPriceRange([0, 500000]);
      }
      
      // Set km range if provided
      if (activeFilters.minKilometers !== undefined && activeFilters.maxKilometers !== undefined) {
        setKmRange([activeFilters.minKilometers, activeFilters.maxKilometers]);
      } else {
        setKmRange([0, 150000]);
      }
      
      // Set search keyword
      if (activeFilters.make && activeFilters.model) {
        setSearchKeyword(`${activeFilters.make[0]} ${activeFilters.model[0]}`);
      } else if (activeFilters.make && activeFilters.make.length > 0) {
        setSearchKeyword(activeFilters.make[0]);
      } else {
        setSearchKeyword("");
      }
    }
  }, [activeFilters]);

  // Initial setup 
  useEffect(() => {
    if (initialFilters) {
      if (initialFilters.make && initialFilters.make.length > 0 && 
          initialFilters.model && initialFilters.model.length > 0) {
        setAccordionValue("advanced-filters");
      }
    }
  }, [initialFilters]);

  // Models for the selected make
  const availableModels = selectedMake
    ? filterOptions.models[selectedMake as keyof typeof filterOptions.models] || []
    : [];

  // Trims for the selected model
  const availableTrims = selectedModel
    ? filterOptions.trims[selectedModel as keyof typeof filterOptions.trims] || []
    : [];

  // Apply filters when filter values change
  const applyFilters = () => {
    const filters: Partial<FilterOptions> = {
      make: selectedMake ? [selectedMake] : [],
      model: selectedModel ? [selectedModel] : [],
      trim: selectedTrim ? [selectedTrim] : [],
      minPrice: priceRange[0],
      maxPrice: priceRange[1],
      minKilometers: kmRange[0],
      maxKilometers: kmRange[1],
      sellerType: activeFilters.sellerType || [],
    };

    onFilterChange(filters);
  };

  // Handle make change
  const handleMakeChange = (value: string) => {
    
    setSelectedMake(value);
    // setSelectedModel("");
    // setSelectedTrim("");
    
    // setTimeout(() => {
      //   applyFilters();
      // }, 0);
    };

  // Handle model change
  const handleModelChange = (value: string) => {
    setSelectedModel(value);
    // setSelectedTrim("");
    
    // setTimeout(() => {
    //   applyFilters();
    // }, 0);
  };

  // Handle trim change
  const handleTrimChange = (value: string) => {
    setSelectedTrim(value);
    
    setTimeout(() => {
      applyFilters();
    }, 0);
  };

  // Handle price range change
  const handlePriceRangeChange = (values: number[]) => {
    setPriceRange(values);
    
    // Debounce to avoid too many updates while dragging
    const timeoutId = setTimeout(() => {
      applyFilters();
    }, 100);
    
    return () => clearTimeout(timeoutId);
  };

  // Handle kilometers range change
  const handleKmRangeChange = (values: number[]) => {
    setKmRange(values);
    
    // Debounce to avoid too many updates while dragging
    const timeoutId = setTimeout(() => {
      applyFilters();
    }, 100);
    
    return () => clearTimeout(timeoutId);
  };

  // Handle search keyword change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const keyword = e.target.value;
    setSearchKeyword(keyword);
    
    // TODO: implement keyword search functionality
  };

  // Clear all filters
  const handleClearFilters = () => {
    setSelectedMake("");
    setSelectedModel("");
    setSelectedTrim("");
    setPriceRange([0, 500000]);
    setKmRange([0, 150000]);
    setSearchKeyword("");
    onClearFilters();
  };

  // Format price for display
  const formatPrice = (price: number) => {
    return `AED ${price.toLocaleString()}`;
  };

  // Format kilometers for display
  const formatKilometers = (km: number) => {
    return `${km.toLocaleString()} KM`;
  };

  return (
    <Card className="mb-6 border !border-[#6cd0f585]">
      <CardContent className="pt-6">
        <div className="flex flex-col space-y-6 md:space-y-0 md:flex-row md:space-x-4 mb-4">
          <div className="relative flex-grow">
            <Input
              placeholder="Search cars by keyword..."
              value={searchKeyword}
              onChange={handleSearchChange}
              className="pr-8 border !border-[#6cd0f585]"
            />
            {searchKeyword && (
              <button
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                onClick={() => {
                  setSearchKeyword("");
                  setTimeout(applyFilters, 0);
                }}
                type="button"
                aria-label="Clear search"
              >
                <X size={16} />
              </button>
            )}
          </div>
          <div className="grid grid-cols-3 gap-2 md:flex md:space-x-2">
            <Select value={selectedMake} onValueChange={handleMakeChange}>
              <SelectTrigger className="w-full md:w-[180px] border !border-[#6cd0f585]">
                <SelectValue placeholder="Make" />
              </SelectTrigger>
              <SelectContent>
                {filterOptions.makes.map((make) => (
                  <SelectItem key={make} value={make}>
                    {make}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select
              value={selectedModel}
              onValueChange={handleModelChange}
              disabled={!selectedMake}
            >
              <SelectTrigger className="w-full md:w-[180px] border !border-[#6cd0f585]">
                <SelectValue placeholder="Model" />
              </SelectTrigger>
              <SelectContent>
                {availableModels.map((model) => (
                  <SelectItem key={model} value={model}>
                    {model}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select
              value={selectedTrim}
              onValueChange={handleTrimChange}
              disabled={!selectedModel}
            >
              <SelectTrigger className="w-full md:w-[180px] border !border-[#6cd0f585]">
                <SelectValue placeholder="Trim" />
              </SelectTrigger>
              <SelectContent>
                {availableTrims.map((trim) => (
                  <SelectItem key={trim} value={trim}>
                    {trim}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <Accordion 
          type="single" 
          collapsible 
          className="w-full border-b !border-[#6cd0f585]"
          value={accordionValue}
          onValueChange={setAccordionValue}
        >
          <AccordionItem value="advanced-filters">
            <AccordionTrigger>Advanced Filters</AccordionTrigger>
            <AccordionContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                {/* Price Range */}
                <div className="space-y-4">
                  <Label>Price Range (AED)</Label>
                  <div className="px-2">
                    <Slider
                      value={[priceRange[0], priceRange[1]]}
                      min={0}
                      max={500000}
                      step={5000}
                      onValueChange={handlePriceRangeChange}
                      className="my-6"
                    />
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>{formatPrice(priceRange[0])}</span>
                    <span>{formatPrice(priceRange[1])}</span>
                  </div>
                </div>

                {/* Kilometers Range */}
                <div className="space-y-4">
                  <Label>Kilometers Driven</Label>
                  <div className="px-2">
                    <Slider
                      value={[kmRange[0], kmRange[1]]}
                      min={0}
                      max={150000}
                      step={1000}
                      onValueChange={handleKmRangeChange}
                      className="my-6"
                    />
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>{formatKilometers(kmRange[0])}</span>
                    <span>{formatKilometers(kmRange[1])}</span>
                  </div>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <div className="flex justify-end mt-4">
          <Button variant="outline" onClick={handleClearFilters} className="border !border-[#6cd0f585] hover:bg-[#6cd0f585]">
            Clear Filters
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default CarFilters;
