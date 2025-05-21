
import { useState, useEffect } from "react";
import { Input } from "../ui/input";
import { Search, MapPin, AlertCircle } from "lucide-react";
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
  DialogTrigger
} from "../ui/dialog";
import { Button } from "../ui/button";
import { toast } from "../ui/sonner";

interface LocationSelectorProps {
  selectedLocation: string;
  onLocationChange: (location: string) => void;
}

declare global {
  interface Window {
    google: any;
    initMap: () => void;
  }
}

const LocationSelector: React.FC<LocationSelectorProps> = ({
  selectedLocation,
  onLocationChange
}) => {
  const [searchTerm, setSearchTerm] = useState(selectedLocation || "");
  const [mapLoaded, setMapLoaded] = useState(false);
  const [map, setMap] = useState<any>(null);
  const [marker, setMarker] = useState<any>(null);
  const [autocomplete, setAutocomplete] = useState<any>(null);
  const [apiKeyEntered, setApiKeyEntered] = useState(false);
  const [apiKey, setApiKey] = useState<string>("");
  const [showApiKeyDialog, setShowApiKeyDialog] = useState(false);

  // Check if API key exists in localStorage
  useEffect(() => {
    const savedApiKey = localStorage.getItem("googleMapsApiKey");
    if (savedApiKey) {
      setApiKey(savedApiKey);
      setApiKeyEntered(true);
      loadGoogleMapsScript(savedApiKey);
    } else {
      setShowApiKeyDialog(true);
    }
  }, []);

  const loadGoogleMapsScript = (key: string) => {
    // Only load if not already loaded
    if (!document.querySelector('script[src*="maps.googleapis.com/maps/api"]')) {
      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=${key}&libraries=places&callback=initMap`;
      script.async = true;
      script.defer = true;
      
      window.initMap = () => {
        setMapLoaded(true);
      };
      
      document.head.appendChild(script);
    }
  };

  const saveApiKey = () => {
    if (!apiKey.trim()) {
      toast.error("Please enter a valid API key");
      return;
    }
    
    localStorage.setItem("googleMapsApiKey", apiKey);
    setApiKeyEntered(true);
    setShowApiKeyDialog(false);
    loadGoogleMapsScript(apiKey);
    toast.success("Google Maps API Key saved");
  };

  useEffect(() => {
    if (!mapLoaded || !apiKeyEntered) return;

    const mapElement = document.getElementById("map");
    if (!mapElement) return;

    try {
      // Initialize map
      const newMap = new window.google.maps.Map(mapElement, {
        center: { lat: 25.276987, lng: 55.296249 }, // Dubai coordinates as default
        zoom: 12,
      });
      setMap(newMap);

      // Initialize autocomplete
      const input = document.getElementById("locationInput") as HTMLInputElement;
      const newAutocomplete = new window.google.maps.places.Autocomplete(input);
      newAutocomplete.setFields(["geometry", "name", "formatted_address"]);
      setAutocomplete(newAutocomplete);

      // Listen for place selection
      newAutocomplete.addListener("place_changed", () => {
        const place = newAutocomplete.getPlace();
        if (!place.geometry) return;

        // Set the map center to the selected place
        const location = place.geometry.location;
        newMap.setCenter(location);

        // Remove previous marker if exists
        if (marker) marker.setMap(null);

        // Add a new marker
        const newMarker = new window.google.maps.Marker({
          position: location,
          map: newMap,
          title: place.name,
        });
        setMarker(newMarker);

        // Update the selected location
        setSearchTerm(place.formatted_address);
        onLocationChange(place.formatted_address);
      });
    } catch (error) {
      console.error("Error initializing Google Maps:", error);
      toast.error("Failed to load Google Maps. Please check your API key.");
    }
  }, [mapLoaded, apiKeyEntered]);
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onLocationChange(searchTerm);
  };
  
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6">Search Your Location</h2>
      
      {/* API Key Dialog */}
      <Dialog open={showApiKeyDialog} onOpenChange={setShowApiKeyDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Google Maps API Key Required</DialogTitle>
            <DialogDescription>
              Please enter your Google Maps API Key to use the location service. 
              The key will be stored locally in your browser.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <Input
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="Enter your Google Maps API Key"
            />
            <div className="flex justify-end">
              <Button variant="primary" onClick={saveApiKey} className="bg-[#2596be] hover:bg-[#2b7f9e]">Save API Key</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
      
      {!apiKeyEntered && (
        <div className="bg-yellow-50 border border-yellow-200 p-4 mb-6 rounded-md">
          <div className="flex items-center space-x-2">
            <AlertCircle className="text-yellow-500 h-5 w-5" />
            <h4 className="font-medium">Google Maps API Key Required</h4>
          </div>
          <p className="mt-1 text-sm text-gray-600">
            You need to provide a Google Maps API Key to use the location features.
          </p>
          <Button 
            variant="outline" 
            size="sm" 
            className="mt-2"
            onClick={() => setShowApiKeyDialog(true)}
          >
            Enter API Key
          </Button>
        </div>
      )}
      
      {apiKeyEntered && (
        <>
          <form className="mb-6" onSubmit={handleSearch}>
            <div className="relative">
              <Input
                id="locationInput"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Enter location"
                className="pr-10 pl-4 py-6 text-base border-gray-300 h-14"
              />
              <button 
                type="submit" 
                className="absolute right-2 top-1/2 transform -translate-y-1/2"
                aria-label="Search"
              >
                <Search className="h-5 w-5 text-gray-500" />
              </button>
            </div>
          </form>
          
          <div id="map" className=" bg-gray-100 rounded-lg mb-4 overflow-hidden h-[300px] w-full"></div>
        </>
      )}
      
      {selectedLocation && (
        <div className="bg-[#F0F8FA] p-4 rounded-md">
          <div className="flex items-start gap-3">
            <MapPin className="h-5 w-5 text-salik-primary mt-1" />
            <div>
              <h4 className="font-medium">Selected Location</h4>
              <p className="text-gray-700">{selectedLocation}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LocationSelector;
