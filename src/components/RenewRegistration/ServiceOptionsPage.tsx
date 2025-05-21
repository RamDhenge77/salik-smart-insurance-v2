import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useBooking } from '@/context/BookingContext';
import MapPlaceholder from '@/components/MapPlaceholder';
import { Heart, ArrowLeft } from 'lucide-react';
import { useCarContext } from '@/context/Context';
import { Button } from '../ui/button';

const ServiceOptionsPage = () => {
  const navigate = useNavigate();
  const { booking, setBookingMode } = useBooking();
  const {setRegistrationSteps} = useCarContext();

  const handleBack = () => {
    // navigate(-1);
    setRegistrationSteps(4); // Go back to Destination Page
  };

  const handleConfirm = () => {
    if (booking.selectedService === 'RTA Vehicle Inspection') {
      // For RTA Vehicle Inspection, we don't need to set a booking mode
      // navigate('/confirm-pickup');
      setRegistrationSteps(6);
    } else {
      // For other services, use the existing booking mode
      setBookingMode('Pay Per Minute');
      // navigate('/confirm-pickup');
      setRegistrationSteps(6);
    }
  };

  // Create a route view for the map that shows both pickup and destination
  const routeView = `${booking.pickupLocation?.name} to ${booking.destination?.name}`;

  return (
    <div className="min-h-screen flex flex-col">
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
        {booking.selectedService === 'RTA Vehicle Inspection' ? (
          <>
            <h2 className="text-xl font-bold mb-4">RTA Vehicle Inspection</h2>
            
            <div className="p-4 mb-4 bg-gray-100 rounded-md">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-bold">RTA Vehicle Inspection Service</h4>
                  <p className="text-xs text-gray-600">Fixed fare includes pickup, inspection, and return</p>
                </div>
                <div className="font-bold">AED 69</div>
              </div>
            </div>

            <Button
              variant="primary"
              onClick={handleConfirm}
              className="w-full mt-6 h-[3.4rem] py-3 rounded-md font-bold"
            >
              Confirm Inspection
            </Button>
          </>
        ) : (
          <>
          <h2 className="text-xl font-bold mb-4">Choose Service Type</h2>

          <div className="p-4 mb-2 rounded-md flex items-center justify-between 
            bg-gray-100 cursor-pointer">
            <div className="flex items-center">
              <div className={`w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center
                border-gray-400`}>
              </div>
              <div>
                <h4 className="font-bold">Pay Per Minute</h4>
                <p className="text-xs text-gray-600">Fare calculated by minutes of your trip</p>
              </div>
            </div>
            <div className="font-bold">
              AED 31 - 37
            </div>
          </div>

          <div className="p-4 mb-2 rounded-md flex items-center justify-between 
            bg-gray-100 cursor-pointer">
            <div className="flex items-center">
              <div className={`w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center
                border-gray-400`}>
              </div>
              <div>
                <h4 className="font-bold">Hourly Booking</h4>
                <p className="text-xs text-gray-600">Additional time will be charged at 1.17 AED per minute</p>
              </div>
            </div>
            <div className="font-bold">
              AED 70
            </div>
          </div>

          <Button
            variant="primary"
            onClick={handleConfirm}
            className="w-full mt-6 h-[3.4rem] py-3 rounded-md font-bold"
          >
            Confirm Pay Per Minute
          </Button>
        </>
        )}
      </div>
    </div>
  );
};

export default ServiceOptionsPage;
