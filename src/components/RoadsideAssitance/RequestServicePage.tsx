import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
// import Navigation from "@/components/Navigation";
import VehicleCard from "@/components/RoadsideAssitance/VehicleCard";
import ServiceOptionCard from "@/components/RoadsideAssitance/ServiceOptionCard";
import { Car, Truck, Search } from "lucide-react";
import {
  VEHICLE_DATA,
  SERVICES,
  EMERGENCY_SERVICES,
  INCIDENT_TYPES,
  BREAKDOWN_REASONS,
  PARK_LOCATIONS,
} from "@/lib/data";
import { toast as toastMessage } from "sonner";
import { toast } from "@/hooks/use-toast";
import GooglePlacesScript from "@/components/map/GooglePlacesScript";
import LocationSearch from "@/components/map/LocationSearch";
import MapPlaceholder from "@/components/map/MapPlaceholder";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
  DialogTrigger,
} from "../ui/dialog";
import { useCarContext } from "@/context/Context";

interface LocationType {
  name: string;
  address: string;
  coordinates?: [number, number]; // [longitude, latitude]
}

export default function RequestServicePage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [selectedVehicle, setSelectedVehicle] = useState<string | null>(null);
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [selectedEmergencyService, setSelectedEmergencyService] = useState<
    string | null
  >(null);
  const [selectedIncidentType, setSelectedIncidentType] = useState<
    string | null
  >(null);
  const [breakdownReason, setBreakdownReason] = useState<string | null>(null);
  const [hasPoliceReport, setHasPoliceReport] = useState<boolean | null>(null);
  const [parkLocation, setParkLocation] = useState<string | null>(null);

  // Modified for proper location handling
  const [pickupLocation, setPickupLocation] = useState<LocationType | null>(
    null
  );
  const [pickupSearch, setPickupSearch] = useState("");
  const [pickupCoordinates, setPickupCoordinates] = useState<
    { lat: number; lng: number } | undefined
  >(undefined);

  const [dropoffLocation, setDropoffLocation] = useState<LocationType | null>(
    null
  );
  const [dropoffSearch, setDropoffSearch] = useState("");
  const [dropoffCoordinates, setDropoffCoordinates] = useState<
    { lat: number; lng: number } | undefined
  >(undefined);

  const [isGoogleMapsLoaded, setIsGoogleMapsLoaded] = useState(false);

  const [garageDetails, setGarageDetails] = useState({
    name: "",
    contact: "",
  });
  const [remarks, setRemarks] = useState("");
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { setRoadsideAssistance } = useCarContext();

  const goToNextStep = () => {
    setStep(step + 1);
    // window.scrollTo(0, 0);
  };

  const goToPrevStep = () => {
    setStep(step - 1);
    // window.scrollTo(0, 0);
  };

  const handleVehicleSelect = (id: string) => {
    setSelectedVehicle(id);
    goToNextStep();
  };

  const handleServiceSelect = (service: string) => {
    setSelectedService(service);
    goToNextStep();
  };

  const handleEmergencyServiceSelect = (service: string) => {
    setSelectedEmergencyService(service);
    goToNextStep();
  };

  const handleIncidentTypeSelect = (type: string) => {
    setSelectedIncidentType(type);
    goToNextStep();
  };

  const handleBreakdownReasonSelect = (reason: string) => {
    setBreakdownReason(reason);
    goToNextStep();
  };

  const handleParkLocationSelect = (location: string) => {
    setParkLocation(location);
    goToNextStep();
  };

  const handlePickupSearch = (term: string) => {
    setPickupSearch(term);
  };

  const handleDropoffSearch = (term: string) => {
    setDropoffSearch(term);
  };

  const handlePickupSelect = (location: LocationType) => {
    setPickupLocation(location);
    if (location.coordinates) {
      setPickupCoordinates({
        lat: location.coordinates[1],
        lng: location.coordinates[0],
      });
    }
    toast({
      title: "Pickup Location Set",
      description: `Pickup location set to ${location.name}`,
    });
  };

  const handleDropoffSelect = (location: LocationType) => {
    setDropoffLocation(location);
    if (location.coordinates) {
      setDropoffCoordinates({
        lat: location.coordinates[1],
        lng: location.coordinates[0],
      });
    }
    toast({
      title: "Drop-off Location Set",
      description: `Drop-off location set to ${location.name}`,
    });
  };

  const handleGoogleApiLoaded = () => {
    setIsGoogleMapsLoaded(true);
  };

  const handleSubmitRequest = () => {
    if (!pickupLocation) {
      toast({
        title: "Missing Information",
        description: "Please provide a pickup location.",
        variant: "destructive",
      });
      return;
    }

    if (!dropoffLocation) {
      toast({
        title: "Missing Information",
        description: "Please provide a drop-off location.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    // Simulate request submission with timeout
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Service Request Submitted",
        description:
          "Your roadside assistance request has been received. Help is on the way!",
      });

      // Navigate to services page after successful submission
      setTimeout(() => {
        // navigate("/services");
        setRoadsideAssistance(2);
      }, 1500);
    }, 1000);
  };

  const renderStepContent = () => {
    switch (step) {
      case 0: // Select Vehicle
        return (
          <div>
            <h2 className="text-xl font-semibold mb-4 text-salik-gray-800">
              Select a Vehicle
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {VEHICLE_DATA.map((vehicle) => (
                <VehicleCard
                  key={vehicle.id}
                  id={vehicle.id}
                  plateNo={vehicle.plateNo}
                  make={vehicle.make}
                  model={vehicle.model}
                  year={vehicle.year}
                  chassisNo={vehicle.chassisNo}
                  image={vehicle.image}
                  onSelect={handleVehicleSelect}
                />
              ))}
            </div>
          </div>
        );

      case 1: // Select Service
        return (
          <div>
            <h2 className="text-xl font-semibold mb-4 text-salik-gray-800">
              Select a Service
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {SERVICES.map((service) => (
                <ServiceOptionCard
                  key={service}
                  title={service}
                  selected={selectedService === service}
                  onClick={() => handleServiceSelect(service)}
                  icon={
                    service === "Emergency Roadside Assistance" ? (
                      <Car className="h-8 w-8" />
                    ) : (
                      <Truck className="h-8 w-8" />
                    )
                  }
                />
              ))}
            </div>
          </div>
        );

      case 2: // Emergency Service Type
        return (
          <div>
            <h2 className="text-xl font-semibold mb-4 text-salik-gray-800">
              Select Emergency Service Type
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {EMERGENCY_SERVICES.map((service) => (
                <ServiceOptionCard
                  key={service}
                  title={service}
                  selected={selectedEmergencyService === service}
                  onClick={() => handleEmergencyServiceSelect(service)}
                />
              ))}
            </div>
          </div>
        );

      case 3: // Incident Type
        return (
          <div>
            <h2 className="text-xl font-semibold mb-4 text-salik-gray-800">
              What happened to your vehicle?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {INCIDENT_TYPES.map((type) => (
                <ServiceOptionCard
                  key={type}
                  title={type}
                  selected={selectedIncidentType === type}
                  onClick={() => handleIncidentTypeSelect(type)}
                />
              ))}
            </div>
          </div>
        );

      case 4: // Breakdown Reason or Police Report
        if (selectedIncidentType === "Breakdown") {
          return (
            <div>
              <h2 className="text-xl font-semibold mb-4 text-salik-gray-800">
                Select Breakdown Reason
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {BREAKDOWN_REASONS.map((reason) => (
                  <ServiceOptionCard
                    key={reason}
                    title={reason}
                    selected={breakdownReason === reason}
                    onClick={() => handleBreakdownReasonSelect(reason)}
                  />
                ))}
              </div>
            </div>
          );
        } else {
          return (
            <div>
              <h2 className="text-xl font-semibold mb-4 text-salik-gray-800">
                Police Report
              </h2>
              <Card>
                <CardContent className="pt-6">
                  <p className="mb-6 text-sm text-salik-gray-700">
                    Do you have the accident/police report?
                  </p>
                  <div className="flex space-x-4">
                    <Button
                      variant={hasPoliceReport === true ? "default" : "outline"}
                      className={
                        hasPoliceReport === true
                          ? "bg-salik-gray-600 hover:bg-salik-gray-700"
                          : ""
                      }
                      onClick={() => {
                        setHasPoliceReport(true);
                        goToNextStep();
                      }}
                    >
                      Yes
                    </Button>
                    <Button
                      variant={
                        hasPoliceReport === false ? "default" : "outline"
                      }
                      className={
                        hasPoliceReport === false
                          ? "bg-salik-gray-600 hover:bg-salik-gray-700"
                          : ""
                      }
                      onClick={() => {
                        setHasPoliceReport(false);
                        // In a real app, might show different content
                        goToNextStep();
                      }}
                    >
                      No
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          );
        }

      case 5: // Parked Location
        return (
          <div>
            <h2 className="text-xl font-semibold mb-4 text-salik-gray-800">
              Where is your vehicle parked?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {PARK_LOCATIONS.map((location) => (
                <ServiceOptionCard
                  key={location}
                  title={location}
                  selected={parkLocation === location}
                  onClick={() => handleParkLocationSelect(location)}
                />
              ))}
            </div>
          </div>
        );

      case 6: // Disclaimer
        return (
          <div>
            <h2 className="text-xl font-semibold mb-4 text-salik-gray-800">
              Important Information
            </h2>
            <Card className="mb-6">
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <p className="font-medium text-sm text-salik-gray-700">
                    Please read and acknowledge the following:
                  </p>

                  <ul className="list-disc pl-5 space-y-2 text-sm text-salik-gray-700">
                    <li>
                      A valid police report is mandatory to tow an accident
                      vehicle
                    </li>
                    <li>
                      An authorised person should be present to handover the car
                    </li>
                    <li>
                      Any Mechanical issues during towing are not our
                      responsibility
                    </li>
                    <li>Car gear must be in neutral</li>
                    <li>Steering should not be locked</li>
                    <li>Tow hooks should be available</li>
                    {parkLocation === "Basement" && (
                      <li className="font-medium">
                        For basement locations, please ensure sufficient
                        clearance height of at least 2.5 meters
                      </li>
                    )}
                  </ul>

                  <div className="flex items-center mt-6">
                    <Checkbox
                      id="terms"
                      checked={acceptedTerms}
                      onCheckedChange={(checked) => setAcceptedTerms(!!checked)}
                      className={`text-[#6cd0f585] border-[#2595bebb] ${
                        acceptedTerms ? "!bg-btn-primary" : ""
                      }`}
                    />
                    <label
                      htmlFor="terms"
                      className="ml-2 text-sm text-salik-gray-700"
                    >
                      I have read and agree to the terms
                    </label>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Button
              variant="primary"
              onClick={goToNextStep}
              disabled={!acceptedTerms}
              className="w-full"
            >
              Proceed
            </Button>
          </div>
        );

      case 7: // Location and Submission
        return (
          <div>
            <GooglePlacesScript onLoad={handleGoogleApiLoaded} />
            <h2 className="text-xl font-semibold mb-4 text-salik-gray-800">
              Service Location Details
            </h2>

            <Card className="mb-6">
              <CardContent className="pt-6 space-y-6">
                <div>
                  <h3 className="text-base font-medium mb-2 text-salik-gray-700">
                    Pickup Location
                  </h3>
                  <LocationSearch
                    placeholder="Enter pickup location"
                    onSearch={handlePickupSearch}
                    onSelect={handlePickupSelect}
                    value={pickupLocation?.name || ""}
                  />
                  {pickupLocation && (
                    <div className="mt-4">
                      <MapPlaceholder
                        location={pickupLocation.name}
                        coordinates={pickupCoordinates}
                        height="250px"
                      />
                    </div>
                  )}
                </div>

                <div>
                  <h3 className="text-base font-medium mb-2 text-salik-gray-700">
                    Drop-off Location
                  </h3>
                  <LocationSearch
                    placeholder="Enter drop-off location"
                    onSearch={handleDropoffSearch}
                    onSelect={handleDropoffSelect}
                    value={dropoffLocation?.name || ""}
                  />
                  {dropoffLocation && (
                    <div className="mt-4">
                      <MapPlaceholder
                        location={dropoffLocation.name}
                        coordinates={dropoffCoordinates}
                        height="250px"
                      />
                    </div>
                  )}
                </div>

                <div>
                  <h3 className="text-base font-medium mb-2 text-salik-gray-700">
                    Garage Information
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-xs mb-1 text-salik-gray-600">
                        Garage Name
                      </label>
                      <Input
                        value={garageDetails.name}
                        onChange={(e) =>
                          setGarageDetails({
                            ...garageDetails,
                            name: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div>
                      <label className="block text-xs mb-1 text-salik-gray-600">
                        Garage Contact Number
                      </label>
                      <Input
                        value={garageDetails.contact}
                        onChange={(e) =>
                          setGarageDetails({
                            ...garageDetails,
                            contact: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs mb-1 text-salik-gray-600">
                    Additional Remarks
                  </label>
                  <Textarea
                    value={remarks}
                    onChange={(e) => setRemarks(e.target.value)}
                    placeholder="Any additional information..."
                  />
                </div>
              </CardContent>
            </Card>

            <div className="flex flex-wrap gap-4">
              <Button
                onClick={goToPrevStep}
                variant="outline"
                className="flex-1 hover:bg-gray-100"
              >
                Back
              </Button>
              <Button
                onClick={handleSubmitRequest}
                className="flex-1 bg-[#2596be] hover:bg-[#2b7f9e]"
                disabled={isSubmitting || !pickupLocation || !dropoffLocation}
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    Submitting...
                  </>
                ) : (
                  "Submit Request"
                )}
              </Button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const [showApiKeyDialog, setShowApiKeyDialog] = useState(false);
  const [apiKeyEntered, setApiKeyEntered] = useState(false);
  const [apiKey, setApiKey] = useState<string>("");
  const [mapLoaded, setMapLoaded] = useState(false);

  const loadGoogleMapsScript = (key: string) => {
    // Only load if not already loaded
    if (
      !document.querySelector('script[src*="maps.googleapis.com/maps/api"]')
    ) {
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

  useEffect(() => {
    if (step === 7) {
      const savedApiKey = localStorage.getItem("googleMapsApiKey");
      if (savedApiKey) {
        setApiKey(savedApiKey);
        setApiKeyEntered(true);
        loadGoogleMapsScript(savedApiKey);
      } else {
        setShowApiKeyDialog(true);
      }
    }
  }, [step]);

  const saveApiKey = () => {
    if (!apiKey.trim()) {
      toastMessage.error("Please enter a valid API key");
      return;
    }

    localStorage.setItem("googleMapsApiKey", apiKey);
    setApiKeyEntered(true);
    setShowApiKeyDialog(false);
    loadGoogleMapsScript(apiKey);
    toastMessage.success("Google Maps API Key saved");
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* <Navigation /> */}

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
              <Button variant="primary" onClick={saveApiKey} className="">
                Save API Key
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <div className="flex-1 py-8 px-4 max-w-2xl mx-auto w-full">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-salik-gray-800">
            Request Service
          </h1>
          <div className="mt-4 bg-gray-100 h-2 rounded-full">
            <div
              className="h-2 bg-btn-primary rounded-full transition-all duration-500"
              style={{
                width: `${((step + 1) / 8) * 100}%`,
              }}
            ></div>
          </div>
          <div className="mt-2 flex justify-between text-xs text-salik-gray-500">
            <span>Vehicle</span>
            <span>Submit</span>
          </div>
        </div>

        {renderStepContent()}

        {step > 0 && step < 6 && (
          <div className="mt-8">
            <Button
              onClick={goToPrevStep}
              variant="outline"
              className="w-full hover:bg-gray-100"
            >
              Back
            </Button>
          </div>
        )}
      </div>

      {/* <footer className="bg-salik-gray-100 py-4">
        <div className="max-w-7xl mx-auto px-4 text-center text-sm text-salik-gray-600">
          <p>&copy; {new Date().getFullYear()} Salik. All rights reserved.</p>
        </div>
      </footer> */}
    </div>
  );
}
