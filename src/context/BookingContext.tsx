import React, { createContext, useContext, useState, ReactNode } from 'react';

export type ServiceType = 'Personal Chauffeur' | 'Garage Pick up / Drop' | 'RTA Vehicle Inspection';
export type PaymentMethod = 'Cash' | 'Google Pay' | 'Credit Card';
export type BookingMode = 'Pay Per Minute' | 'Hourly Booking';

interface Location {
  name: string;
  address: string;
  coordinates?: [number, number]; // [longitude, latitude]
}

interface BookingState {
  selectedService?: ServiceType;
  pickupLocation?: Location;
  destination?: Location;
  bookingMode?: BookingMode;
  duration?: number;
  fare?: number;
  paymentMethod?: PaymentMethod;
  promoCode?: string;
  notes?: string;
  carType?: string;
}

interface BookingContextType {
  booking: BookingState;
  setSelectedService: (service: ServiceType) => void;
  setPickupLocation: (location: Location) => void;
  setDestination: (location: Location) => void;
  setBookingMode: (mode: BookingMode) => void;
  setPaymentMethod: (method: PaymentMethod) => void;
  setPromoCode: (code: string) => void;
  setNotes: (notes: string) => void;
  setCarType: (carType: string) => void;
  resetBooking: () => void;
  calculateFare: () => number;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export const BookingProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [booking, setBooking] = useState<BookingState>({});

  const setSelectedService = (service: ServiceType) => {
    setBooking((prev) => ({ ...prev, selectedService: service }));
  };

  const setPickupLocation = (location: Location) => {
    setBooking((prev) => ({ ...prev, pickupLocation: location }));
  };

  const setDestination = (location: Location) => {
    setBooking((prev) => ({ ...prev, destination: location }));
  };

  const setBookingMode = (mode: BookingMode) => {
    const fare = mode === 'Hourly Booking' ? 70 : 31;
    setBooking((prev) => ({ ...prev, bookingMode: mode, fare }));
  };

  const setPaymentMethod = (method: PaymentMethod) => {
    setBooking((prev) => ({ ...prev, paymentMethod: method }));
  };

  const setPromoCode = (code: string) => {
    setBooking((prev) => ({ ...prev, promoCode: code }));
  };

  const setNotes = (notes: string) => {
    setBooking((prev) => ({ ...prev, notes: notes }));
  };

  const setCarType = (carType: string) => {
    setBooking((prev) => ({ ...prev, carType: carType }));
  };

  const resetBooking = () => {
    setBooking({});
  };

  const calculateFare = (): number => {
    if (!booking.selectedService) return 0;

    if (booking.selectedService === 'Personal Chauffeur') {
      return booking.bookingMode === 'Hourly Booking' ? 70 : 31;
    } else if (booking.selectedService === 'Garage Pick up / Drop') {
      return 59;
    } else if (booking.selectedService === 'RTA Vehicle Inspection') {
      return 69;
    }

    return 0;
  };

  return (
    <BookingContext.Provider
      value={{
        booking,
        setSelectedService,
        setPickupLocation,
        setDestination,
        setBookingMode,
        setPaymentMethod,
        setPromoCode,
        setNotes,
        setCarType,
        resetBooking,
        calculateFare,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};

export const useBooking = (): BookingContextType => {
  const context = useContext(BookingContext);
  if (context === undefined) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
};
