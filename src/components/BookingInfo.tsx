import React from 'react';
import { ChevronRight } from 'lucide-react';
import { useBooking, PaymentMethod } from '@/context/BookingContext';
import { Button } from './ui/button';

interface BookingInfoProps {
  serviceDescription: string;
  fare: number;
  currency?: string;
  onChooseCar: () => void;
  onPaymentMethodSelect: (method: PaymentMethod) => void;
  onPromoCodeAdd: () => void;
  onNotesAdd: () => void;
  onBookNow: () => void;
  onSchedule: () => void;
  paymentMethod?: PaymentMethod;
}

const BookingInfo: React.FC<BookingInfoProps> = ({
  serviceDescription,
  fare,
  currency = 'AED',
  onChooseCar,
  onPaymentMethodSelect,
  onPromoCodeAdd,
  onNotesAdd,
  onBookNow,
  onSchedule,
  paymentMethod = 'Cash',
}) => {
  return (
    <div className="p-4 bg-white rounded-t-3xl">
      <div className="mb-6">
        <div className="flex items-start justify-between mb-1">
          <h3 className="text-lg font-bold">Booking Information</h3>
          <div className="text-right">
            <span className="block font-bold text-lg">{currency} {fare}</span>
          </div>
        </div>
        <p className="text-sm text-gray-500">{serviceDescription}</p>
      </div>

      <div className="space-y-4">
        <div 
          className="flex items-center justify-between p-3 border-b border-gray-100 cursor-pointer"
          onClick={onChooseCar}
        >
          <div className="flex items-center">
            <span className="text-xl mr-2">🚕</span>
            <span>Choose Car</span>
          </div>
          <ChevronRight size={20} className="text-gray-400" />
        </div>

        <div 
          className="flex items-center justify-between p-3 border-b border-gray-100 cursor-pointer"
          onClick={() => onPaymentMethodSelect(paymentMethod === 'Cash' ? 'Google Pay' : 'Cash')}
        >
          <div className="flex items-center">
            {paymentMethod === 'Cash' ? (
              <span className="text-xl mr-2">💵</span>
            ) : (
              <span className="text-xl mr-2">G Pay</span>
            )}
            <span>{paymentMethod}</span>
          </div>
          <ChevronRight size={20} className="text-gray-400" />
        </div>

        <div 
          className="flex items-center justify-between p-3 border-b border-gray-100 cursor-pointer"
          onClick={onPromoCodeAdd}
        >
          <div className="flex items-center">
            <span className="text-gray-500">Promo Code</span>
          </div>
          <div className="flex items-center">
            <span className="text-gray-400 mr-2">Optional</span>
            <ChevronRight size={20} className="text-gray-400" />
          </div>
        </div>

        <div 
          className="flex items-center justify-between p-3 border-b border-gray-100 cursor-pointer"
          onClick={onNotesAdd}
        >
          <div className="flex items-center">
            <span className="text-gray-500">Add Notes</span>
          </div>
          <div className="flex items-center">
            <span className="text-gray-400 mr-2">Optional</span>
            <ChevronRight size={20} className="text-gray-400" />
          </div>
        </div>
      </div>

      <div className="flex gap-4 mt-6">
        <Button
          variant="primary" 
          onClick={onBookNow}
          className="flex-1 h-[3.4rem] py-4 rounded-md font-bold"
        >
          Book Now
        </Button>
        <Button
          variant="secondary" 
          onClick={onSchedule}
          className="flex-1 border-black h-[3.4rem] py-4 rounded-md font-bold"
        >
          Schedule
        </Button>
      </div>
    </div>
  );
};

export default BookingInfo;
