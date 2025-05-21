import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useBooking } from '@/context/BookingContext';
import MapPlaceholder from '@/components/MapPlaceholder';
import { MapPin, ArrowLeft } from 'lucide-react';

const ConfirmPickupPage = () => {
  const navigate = useNavigate();
  const { booking } = useBooking();

  const handleBack = () => {
    navigate(-1);
  };

  const handleConfirm = () => {
    navigate('/booking-info');
  };

  // Extract coordinates if available
  const coordinates = booking.pickupLocation?.coordinates ? {
    lat: booking.pickupLocation.coordinates[1],
    lng: booking.pickupLocation.coordinates[0]
  } : undefined;

  return (
    <div className="min-h-screen flex flex-col">
      <div className="absolute top-0 left-0 right-0 z-10 p-4">
        <button
          onClick={handleBack}
          className="bg-white rounded-full p-2 shadow-md"
        >
          <ArrowLeft size={24} className="text-salik-darkGray" />
        </button>
      </div>

      <div className="flex-1 relative">
        <MapPlaceholder 
          height="100vh"
          location={booking.pickupLocation?.name || 'Dubai'} 
          coordinates={coordinates}
        />
        
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="flex flex-col items-center">
            <div className="bg-salik-darkGray text-white px-3 py-1 rounded-md mb-2 font-bold">
              Pickup
            </div>
            <div className="w-4 h-4 bg-salik-gray rounded-full transform animate-pulse relative">
              <div className="absolute inset-0 bg-salik-gray rounded-full opacity-50 scale-150 animate-ping"></div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 bg-white p-4 rounded-t-3xl shadow-lg">
        <h2 className="text-xl font-bold mb-4 text-salik-darkGray">Confirm Pickup Location</h2>
        
        <div className="bg-salik-lightGray p-4 rounded-md flex items-center mb-4">
          <MapPin size={24} className="mr-3 text-salik-gray" />
          <p className="text-salik-darkGray truncate">{booking.pickupLocation?.name}</p>
        </div>

        <button
          onClick={handleConfirm}
          className="w-full bg-salik-gray text-white py-4 rounded-md font-bold hover:bg-opacity-90 transition-colors"
        >
          Confirm PickUp
        </button>
      </div>
    </div>
  );
};

export default ConfirmPickupPage;
