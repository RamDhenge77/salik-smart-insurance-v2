import React from 'react';
import { BookingMode } from '@/context/BookingContext';

interface ServiceOptionCardProps {
  mode: BookingMode;
  description: string;
  price: number | string;
  selected: boolean;
  onClick: () => void;
}

const ServiceOptionCard: React.FC<ServiceOptionCardProps> = ({
  mode,
  description,
  price,
  selected,
  onClick,
}) => {
  return (
    <div 
      className={`p-4 mb-2 rounded-md flex items-center justify-between 
        ${selected ? 'bg-gray-200' : 'bg-gray-100'} cursor-pointer`}
      onClick={onClick}
    >
      <div className="flex items-center">
        <div className={`w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center
          ${selected ? 'border-black' : 'border-gray-400'}`}>
          {selected && <div className="w-3 h-3 bg-black rounded-full"></div>}
        </div>
        <div>
          <h4 className="font-bold">{mode}</h4>
          <p className="text-xs text-gray-600">{description}</p>
        </div>
      </div>
      <div className="font-bold">
        AED {price}
      </div>
    </div>
  );
};

export default ServiceOptionCard;
