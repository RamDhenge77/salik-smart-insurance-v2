import { useState } from "react";
import { carBrands } from "../../data/services";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from "../ui/command";

interface CarBrandSelectorProps {
  selectedBrand: string | null;
  onSelectBrand: (brandId: string) => void;
}

const CarBrandSelector: React.FC<CarBrandSelectorProps> = ({
  selectedBrand,
  onSelectBrand,
}) => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredBrands = searchQuery
    ? carBrands.filter((brand) =>
        brand.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : carBrands;

  // Get the selected brand object for display in the trigger
  const selectedBrandObj = carBrands.find(
    (brand) => brand.id === selectedBrand
  );

  return (
    <div className="w-full max-w-md mx-auto">
      <h3 className="text-lg font-medium mb-3">Select Your Car Brand</h3>

      <div className="relative">
        <Select value={selectedBrand || ""} onValueChange={onSelectBrand}>
          <SelectTrigger className="w-full bg-white border-gray-300 focus:ring-[#6cd0f585] h-12">
            {selectedBrandObj ? (
              <div className="flex items-center gap-2 truncate">
                <div className="w-7 flex-shrink-0">
                  <img
                    src={
                      selectedBrandObj.logo ||
                      `/cars/${selectedBrandObj.id}.png`
                    }
                    alt={selectedBrandObj.name}
                    className="max-w-full max-h-full object-contain"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = `https://via.placeholder.com/28?text=${selectedBrandObj.name.charAt(
                        0
                      )}`;
                    }}
                  />
                </div>
                <span className="truncate">{selectedBrandObj.name}</span>
              </div>
            ) : (
              <SelectValue placeholder="Select brand" />
            )}
          </SelectTrigger>

          <SelectContent className="max-h-[400px] w-full">
            <div className="p-2 sticky top-0 bg-white border-b z-10">
              <input
                type="text"
                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#6cd0f585] text-sm"
                placeholder="Search brands..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="grid grid-cols-2 gap-1 p-2">
              {filteredBrands.map((brand) => (
                <SelectItem
                  key={brand.id}
                  value={brand.id}
                  className="flex items-center gap-2 p-2 pl-7 cursor-pointer data-[state=checked]:bg-[#6cd0f585] data-[state=unchecked]:hover:bg-[#6cd0f585] rounded m-1"
                >
                  <div className="flex items-center gap-2 w-full">
                    <div className="w-8 flex-shrink-0">
                      <img
                        src={`/cars/${brand.id}.png`}
                        alt={brand.name}
                        className="max-w-full max-h-full object-contain"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = `https://via.placeholder.com/32?text=${brand.name.charAt(
                            0
                          )}`;
                        }}
                      />
                    </div>
                    <span className="truncate text-sm">{brand.name}</span>
                  </div>
                </SelectItem>
              ))}
            </div>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default CarBrandSelector;
