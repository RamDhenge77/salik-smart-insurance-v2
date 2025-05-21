import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBooking } from '@/context/BookingContext';
import LocationSearch from '@/components/LocationSearch';

const DestinationPage = () => {
  const navigate = useNavigate();
  const { booking, setDestination } = useBooking();
  const [fromValue, setFromValue] = useState(booking.pickupLocation?.name || '');
  const [toValue, setToValue] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  

  const handleFromSearch = (term: string) => {
    setFromValue(term);
  };

  const handleToSearch = (term: string) => {
    setToValue(term);
    setShowSuggestions(term.length > 0);
  };

  const handleDestinationSelect = (location: { name: string; address: string }) => {
    setDestination(location);
    navigate('/service-options');
  };

  const handleAddStop = () => {
    // Future functionality
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">

      <div className="p-4">
        <div className="flex">
          <div className="mr-4 flex flex-col items-center">
            <div className="w-4 h-4 rounded-full border-2 border-black bg-white"></div>
            <div className="w-0.5 h-16 bg-black opacity-20 my-1"></div>
            <div className="w-4 h-4 rounded-full bg-black"></div>
          </div>

          <div className="flex-1 space-y-4">
            <LocationSearch 
              placeholder="Your current location"
              value={fromValue}
              onSearch={handleFromSearch}
              onSelect={() => {}}
            />

            <LocationSearch 
              placeholder="Enter destination"
              value={toValue}
              onSearch={handleToSearch}
              onSelect={handleDestinationSelect}
            />
          </div>

          <div className="ml-2">
            <button 
              onClick={handleAddStop}
              className="bg-gray-100 p-2 rounded-md"
            >
              <span className="text-2xl">+</span>
            </button>
          </div>
        </div>
      </div>

      {showSuggestions && (
        <div className="flex-1 bg-white p-4 border-t border-gray-200">
          <h3 className="font-bold text-lg mb-2">Dubai</h3>
          <div className="space-y-4">
            <div 
              className="p-2 cursor-pointer"
              onClick={() => handleDestinationSelect({
                name: "Emirates Post - Dubai Central Post Office",
                address: "Zaa'beel Street - Dubai - United Arab Emirates"
              })}
            >
              <div className="flex">
                <div className="mr-3 mt-1">
                  <div className="bg-gray-300 p-2 rounded-full">
                    <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 19.9l-4.95-6a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
                <div>
                  <p className="font-medium">Emirates Post - Dubai Central Post Office</p>
                  <div className="flex items-center text-sm text-gray-500">
                    <span className="mr-2">4km</span>
                    <span>•</span>
                    <span className="ml-2">Zaa'beel Street - Dubai - United Arab Emirates</span>
                  </div>
                </div>
              </div>
            </div>

            <div 
              className="p-2 cursor-pointer"
              onClick={() => handleDestinationSelect({
                name: "Karama Medical Fitness Express service Center - KMFC",
                address: "Fajer Building - 19dStreet - opposite Karama Post Office - Dubai"
              })}
            >
              <div className="flex">
                <div className="mr-3 mt-1">
                  <div className="bg-gray-300 p-2 rounded-full">
                    <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 19.9l-4.95-6a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
                <div>
                  <p className="font-medium">Karama Medical Fitness Express service Center - KMFC</p>
                  <div className="flex items-center text-sm text-gray-500">
                    <span className="mr-2">4km</span>
                    <span>•</span>
                    <span className="ml-2">Fajer Building - 19dStreet - opposite Karama Post Office - Dubai</span>
                  </div>
                </div>
              </div>
            </div>

            <div 
              className="p-2 cursor-pointer"
              onClick={() => handleDestinationSelect({
                name: "Malabar Express Restaurant",
                address: "Opposite General Post Office - near Baby Shop - Dubai"
              })}
            >
              <div className="flex">
                <div className="mr-3 mt-1">
                  <div className="bg-gray-300 p-2 rounded-full">
                    <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 19.9l-4.95-6a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
                <div>
                  <p className="font-medium">Malabar Express Restaurant</p>
                  <div className="flex items-center text-sm text-gray-500">
                    <span className="mr-2">4km</span>
                    <span>•</span>
                    <span className="ml-2">Opposite General Post Office - near Baby Shop - Dubai</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DestinationPage;
