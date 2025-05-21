
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBooking, BookingMode } from '@/context/BookingContext';
import MapPlaceholder from '@/components/MapPlaceholder';
import ServiceOptionCard from '@/components/ServiceOptionCard';
import { Heart, ArrowLeft } from 'lucide-react';
import ConfirmPickupPage from './ConfirmPickupPage';

const ServiceOptionsPage = () => {
  const navigate = useNavigate();
  const { booking, setBookingMode } = useBooking();
  const [selectedMode, setSelectedMode] = useState<BookingMode>('Pay Per Minute');
  const [confirmPickup, setConfirmPickup] = useState(false);

  const handleBack = () => {
    navigate(-1);
  };

  const handleServiceModeSelect = (mode: BookingMode) => {
    setSelectedMode(mode);
  };

  const handleConfirm = () => {
    setBookingMode(selectedMode);
    setConfirmPickup(true);

    // navigate('/confirm-pickup');
  };

  // Create a route view for the map that shows both pickup and destination
  const routeView = `${booking.pickupLocation?.name} to ${booking.destination?.name}`;

  return (

    <div className="min-h-screen flex flex-col">

      {confirmPickup ? (
        <>
          <div className="absolute top-0 left-0 right-0 z-10">
            <div className="p-4">
              <button
                onClick={handleBack}
                className="bg-white rounded-full p-2 shadow-md"
              >
                <ArrowLeft size={24} />
              </button>
            </div>
          </div>

          <div className="h-1/2 relative">
            <MapPlaceholder className="h-full" location={routeView} />

            <div className="absolute top-16 left-0 right-0 px-4">
              <div className="bg-white rounded-md shadow-md p-3">
                <div className="flex mb-2">
                  <div className="w-3 h-3 rounded-full bg-black mt-1 mr-2"></div>
                  <div className="flex-1">
                    <p className="font-medium text-sm">{booking.pickupLocation?.name}</p>
                    <Heart size={16} className="absolute right-3 top-3" />
                  </div>
                </div>
                <div className="flex">
                  <div className="w-3 h-3 rounded-full bg-black mt-1 mr-2"></div>
                  <div className="flex-1">
                    <p className="font-medium text-sm">{booking.destination?.name}</p>
                    <Heart size={16} className="absolute right-3 bottom-3" />
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute bottom-8 left-4 right-0">
              <div className="bg-black text-white rounded-md py-2 px-4 inline-flex items-center shadow-lg">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
                <span>Pickup in 5-10 Mins</span>
              </div>
            </div>
          </div>

          <div className="flex-1 bg-white p-4">
            <h2 className="text-xl font-bold mb-4">Choose Service Type</h2>

            <ServiceOptionCard
              mode="Pay Per Minute"
              description="Fare calculated by minutes of your trip"
              price="31 - 37"
              selected={selectedMode === 'Pay Per Minute'}
              onClick={() => handleServiceModeSelect('Pay Per Minute')}
            />

            <ServiceOptionCard
              mode="Hourly Booking"
              description="Additional time will be charged at 1.17 AED per minute"
              price={70}
              selected={selectedMode === 'Hourly Booking'}
              onClick={() => handleServiceModeSelect('Hourly Booking')}
            />

            <button
              onClick={handleConfirm}
              className="w-full mt-6 bg-black text-white py-3 rounded-md font-bold"
            >
              Confirm {selectedMode}
            </button>
          </div>
        </>
      ) : (
        <ConfirmPickupPage />
      )}

    </div>
  );
};

export default ServiceOptionsPage;
