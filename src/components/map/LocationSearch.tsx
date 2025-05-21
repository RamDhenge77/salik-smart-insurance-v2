import React, { useState, useEffect, useRef } from "react";
import { X, Search } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";

interface LocationSearchProps {
  placeholder: string;
  onSearch: (value: string) => void;
  onSelect: (location: {
    name: string;
    address: string;
    coordinates?: [number, number];
  }) => void;
  value?: string;
}

declare global {
  interface Window {
    google: any;
  }
}

const LocationSearch: React.FC<LocationSearchProps> = ({
  placeholder,
  onSearch,
  onSelect,
  value = "",
}) => {
  const [searchValue, setSearchValue] = useState(value);
  const [isGoogleLoaded, setIsGoogleLoaded] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const autocompleteRef = useRef<any>(null);

  useEffect(() => {
    // Check if Google Maps API is already loaded
    if (window.google && window.google.maps && window.google.maps.places) {
      initAutocomplete();
      setIsGoogleLoaded(true);
    } else {
      // The script will be loaded by GooglePlacesScript component
      const checkGoogleLoaded = setInterval(() => {
        if (window.google && window.google.maps && window.google.maps.places) {
          clearInterval(checkGoogleLoaded);
          initAutocomplete();
          setIsGoogleLoaded(true);
        }
      }, 500);

      return () => clearInterval(checkGoogleLoaded);
    }
  }, []);

  const initAutocomplete = () => {
    if (!inputRef.current) return;

    try {
      autocompleteRef.current = new window.google.maps.places.Autocomplete(
        inputRef.current,
        { types: ["geocode", "establishment"] }
      );

      autocompleteRef.current.addListener("place_changed", handlePlaceSelect);
    } catch (error) {
      console.error("Error initializing autocomplete:", error);
      toast({
        title: "Error",
        description:
          "Could not initialize location search. Please check your API key.",
        variant: "destructive",
      });
    }
  };

  const handlePlaceSelect = () => {
    try {
      const place = autocompleteRef.current.getPlace();

      if (!place.geometry) {
        toast({
          title: "Invalid Location",
          description: "Please select a location from the dropdown list.",
          variant: "destructive",
        });
        return;
      }

      // Convert coordinates to the [number, number] tuple format
      const lat = place.geometry.location.lat();
      const lng = place.geometry.location.lng();

      const location = {
        name: place.name || searchValue,
        address: place.formatted_address || "",
        coordinates: [lng, lat] as [number, number], // Format as [longitude, latitude] tuple
      };

      setSearchValue(place.name || place.formatted_address || searchValue);
      onSelect(location);
    } catch (error) {
      console.error("Error selecting place:", error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchValue(value);
    onSearch(value);
  };

  const handleClear = () => {
    setSearchValue("");
    onSearch("");
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <div className="relative">
      <div className="relative">
        <Search
          size={20}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-salik-gray-400"
        />
        <Input
          ref={inputRef}
          type="text"
          value={searchValue}
          onChange={handleChange}
          placeholder={placeholder}
          className="w-full pl-10 pr-10 bg-gray-100"
          disabled={!isGoogleLoaded}
        />
        {searchValue && (
          <button
            onClick={handleClear}
            type="button"
            className="absolute right-3 top-1/2 transform -translate-y-1/2"
            aria-label="Clear search"
          >
            <X size={18} className="text-salik-gray-500" />
          </button>
        )}
      </div>
    </div>
  );
};

export default LocationSearch;
