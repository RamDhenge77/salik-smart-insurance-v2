import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { MapPin } from "lucide-react";
import LocationSearch from "../map/LocationSearch";
import MapPlaceholder from "../map/MapPlaceholder";
import GooglePlacesScript from "../map/GooglePlacesScript";

type LocationMapProps = {
  onLocationSelected: (location: string) => void;
};

const LocationMap: React.FC<LocationMapProps> = ({ onLocationSelected }) => {
  const [location, setLocation] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [selectedLocation, setSelectedLocation] = useState<{
    name: string;
    address: string;
    coordinates?: [number, number];
  } | null>(null);
  const [isGoogleMapsLoaded, setIsGoogleMapsLoaded] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);

  useEffect(() => {
    if (selectedLocation) {
      setLocation(selectedLocation.address || selectedLocation.name);
    }
  }, [selectedLocation]);

  const handleSearch = (value: string) => {
    setSearchValue(value);
    // Reset confirmed state when search changes
    setIsConfirmed(false);
  };

  const handleLocationSelect = (location: {
    name: string;
    address: string;
    coordinates?: [number, number];
  }) => {
    setSelectedLocation(location);
    // Reset confirmed state when location changes
    setIsConfirmed(false);
  };

  const handleConfirmLocation = () => {
    if (location) {
      onLocationSelected(location);
      setIsConfirmed(true);
    }
  };

  return (
    <div className="space-y-4">
      {/* Load Google Maps API */}
      <GooglePlacesScript onLoad={() => setIsGoogleMapsLoaded(true)} />

      <div className="space-y-2">
        <LocationSearch
          placeholder="Search for a location"
          onSearch={handleSearch}
          onSelect={handleLocationSelect}
          value={searchValue}
        />
      </div>

      <div className="relative w-full h-64 bg-gray-100 rounded-md overflow-hidden">
        {selectedLocation?.coordinates ? (
          <MapPlaceholder
            coordinates={{
              lat: selectedLocation.coordinates[1],
              lng: selectedLocation.coordinates[0],
            }}
            height="100%"
          />
        ) : location ? (
          <MapPlaceholder location={location} height="100%" />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-200">
            <MapPin className="h-8 w-8 text-salik-gray-500 mb-2" />
            <p className="text-sm text-salik-gray-600">
              Search and select a location
            </p>
          </div>
        )}
      </div>

      <div className="text-center">
        <Button
          className="bg-salik-gray-600 hover:bg-salik-gray-700"
          disabled={!location || isConfirmed}
          onClick={handleConfirmLocation}
        >
          {isConfirmed ? (
            <>
              <MapPin className="mr-2 h-4 w-4" />
              Location Confirmed
            </>
          ) : (
            "Confirm Location"
          )}
        </Button>
      </div>
    </div>
  );
};

export default LocationMap;
