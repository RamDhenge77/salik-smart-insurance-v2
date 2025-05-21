
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';
import { useBooking } from '@/context/BookingContext';
import MapPlaceholder from '@/components/MapPlaceholder';
import LocationSearch from '@/components/LocationSearch';
import GooglePlacesScript from '@/components/GooglePlacesScript';
import { useCarContext } from '@/context/Context';

const LocationPage = () => {
  const navigate = useNavigate();
  const { booking, setPickupLocation } = useBooking();
  const [searchTerm, setSearchTerm] = useState('');
  const [mapLocation, setMapLocation] = useState('Dubai');
  const [coordinates, setCoordinates] = useState<{lat: number, lng: number} | undefined>(undefined);
  const [isGoogleLoaded, setIsGoogleLoaded] = useState(false);
  const {setRegistrationSteps} = useCarContext();
  
  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };
  
  const handleLocationSelect = (location: { 
    name: string; 
    address: string; 
    coordinates?: [number, number]
  }) => {
    // The location object is already formatted correctly with coordinates as [lng, lat]
    setPickupLocation(location);
    setMapLocation(location.name);
    
    // Update coordinates for map display
    if (location.coordinates) {
      setCoordinates({
        lng: location.coordinates[0],
        lat: location.coordinates[1]
      });
    }
    
    // Navigate to destination page after a short delay to show the selected location on the map
    setTimeout(() => {
    //   navigate('/destination');
        setRegistrationSteps(4);
}, 800);
  };
  
  const handleTakeMeHome = () => {
    setPickupLocation({
      name: 'Home',
      address: 'Saved home address',
    });
    setMapLocation('Home');
    // navigate('/destination');
    setRegistrationSteps(4);
};
  
  const handleBack = () => {
    // navigate(-1);
    setRegistrationSteps(2); // Go back to Service Options Page
  };
  
  const handleGoogleApiLoaded = () => {
    setIsGoogleLoaded(true);
  };
  
  return (
    <div className="min-h-screen flex flex-col mt-6">
      <GooglePlacesScript onLoad={handleGoogleApiLoaded} />
      
      {/* Fixed positioning for the navigation button */}
      <div className="absolute top-0 left-0 right-0 z-50 p-4">
        <button
          onClick={handleBack}
          className="bg-white rounded-full p-2 shadow-md"
        >
          <ArrowLeft size={24} className="text-salik-darkGray" />
        </button>
      </div>
      
      {/* Map takes full height */}
      <div className="flex-1 relative">
        <MapPlaceholder location={mapLocation} coordinates={coordinates} height="100vh" />
      </div>
      
      {/* Search panel positioned as an overlay at the bottom */}
      <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl p-4 shadow-lg">
        <h2 className="text-xl font-bold text-salik-darkGray mb-4">Where should we pick up your car?</h2>
        
        <LocationSearch 
          placeholder="Enter your pickup location"
          onSearch={handleSearch}
          onSelect={handleLocationSelect}
        />
        
        <div 
          className="flex items-center mt-4 p-4 cursor-pointer hover:bg-salik-lightGray rounded-md transition-colors"
          onClick={handleTakeMeHome}
        >
          <div className="bg-salik-gray text-white p-2 rounded-full mr-3">
            <Home size={20} />
          </div>
          <span className="font-medium text-salik-darkGray">Use my home address</span>
        </div>
      </div>
    </div>
  );
};

export default LocationPage;
