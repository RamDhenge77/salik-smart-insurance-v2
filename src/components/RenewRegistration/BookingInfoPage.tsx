
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBooking, PaymentMethod } from '@/context/BookingContext';
import MapPlaceholder from '@/components/MapPlaceholder';
import BookingInfo from '@/components/BookingInfo';
import { ArrowLeft, Heart } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import { useCarContext } from '@/context/Context';

const BookingInfoPage = () => {
  const navigate = useNavigate();
  const { booking, calculateFare, setPaymentMethod } = useBooking();
  const [paymentMethod, setPaymentMethodState] = useState<PaymentMethod>('Cash');
  const { setRegistrationSteps } = useCarContext(); // Assuming you have a context for registration steps

  const handleBack = () => {
    // navigate(-1);
    setRegistrationSteps(6); // Go back to Service Options Page
  };

  const getServiceDescription = (): string => {
    if (booking.selectedService === 'Personal Chauffeur') {
      return booking.bookingMode === 'Hourly Booking' 
        ? 'Personal Chauffeur (Hourly)' 
        : 'Personal Chauffeur (Per Minute)';
    } else if (booking.selectedService === 'RTA Vehicle Inspection') {
      return 'RTA Vehicle Inspection Service';
    }
    return `${booking.selectedService} Fixed fare anywhere in Dubai`;
  };

  const handleChooseCar = () => {
    toast({
      title: "Car Selection",
      description: "Car selection will be available soon",
    });
  };

  const handlePaymentMethodSelect = (method: PaymentMethod) => {
    setPaymentMethodState(method);
    setPaymentMethod(method);
  };

  const handlePromoCodeAdd = () => {
    toast({
      title: "Promo Code",
      description: "Promo code feature will be available soon",
    });
  };

  const handleNotesAdd = () => {
    toast({
      title: "Add Notes",
      description: "Notes feature will be available soon",
    });
  };

  const handleBookNow = () => {
    toast({
      title: "Booking Confirmed!",
      description: "Your driver is on the way",
    });
    setRegistrationSteps(1); // Go to Confirm Pickup Page
  };

  const handleSchedule = () => {
    toast({
      title: "Schedule",
      description: "Schedule feature will be available soon",
    });
  };

  // Create a route view for the map
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
      
      <div className="h-1/2">
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
      </div>

      <BookingInfo 
        serviceDescription={getServiceDescription()}
        fare={calculateFare()}
        onChooseCar={handleChooseCar}
        onPaymentMethodSelect={handlePaymentMethodSelect}
        onPromoCodeAdd={handlePromoCodeAdd}
        onNotesAdd={handleNotesAdd}
        onBookNow={handleBookNow}
        onSchedule={handleSchedule}
        paymentMethod={paymentMethod}
      />
    </div>
  );
};

export default BookingInfoPage;
