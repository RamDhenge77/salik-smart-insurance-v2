
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBooking, PaymentMethod } from '@/context/BookingContext';
import MapPlaceholder from '@/components/MapPlaceholder';
import BookingInfo from '@/components/BookingInfo';
import { ArrowLeft, Heart } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

const BookingInfoPage = () => {
  const navigate = useNavigate();
  const { booking, calculateFare, setPaymentMethod } = useBooking();
  const [paymentMethod, setPaymentMethodState] = useState<PaymentMethod>('Cash');

  const handleBack = () => {
    navigate(-1);
  };

  const getServiceDescription = (): string => {
    if (booking.selectedService === 'Personal Chauffeur') {
      return booking.bookingMode === 'Hourly Booking' 
        ? 'Personal Chauffeur (Hourly)' 
        : 'Personal Chauffeur (Per Minute)';
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
    navigate('/');
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
    <>
    <div className="min-h-screen flex flex-col relative">
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
        
        <div className="absolute bottom-[42rem] left-0 right-0">
          <div className="bg-blue-500 text-white py-2 px-4 flex items-center justify-center">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
            <span>Your trip is insured by DriveAround | *T&Cs Apply</span>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-2">
              <circle cx="12" cy="12" r="1" />
              <circle cx="12" cy="5" r="1" />
              <circle cx="12" cy="19" r="1" />
            </svg>
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
    </>
  );
};

export default BookingInfoPage;
