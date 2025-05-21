
import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useBooking } from '@/context/BookingContext';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

interface AppHeaderProps {
  title?: string;
  showBack?: boolean;
}

const AppHeader: React.FC<AppHeaderProps> = ({
  title,
  showBack = false,
}) => {
  const navigate = useNavigate();
  const { booking } = useBooking();

  return (
    <div className="flex items-center justify-between p-4 bg-white">
      <div className="flex items-center">
        {showBack && (
          <button
            onClick={() => navigate(-1)}
            className="bg-white rounded-full p-2 mr-3 shadow-md"
          >
            <ArrowLeft size={24} />
          </button>
        )}
        {title && <h1 className="text-xl font-bold">{title}</h1>}
        {!title && !showBack && (
          <div className="flex items-center">
            <Avatar className="w-12 h-12 mr-3">
              <AvatarFallback className="bg-gray-300">A</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-bold">Hi! Arvind</p>
            </div>
          </div>
        )}
      </div>
      <div>
        {!title && (
          <div className="flex items-center">
            <div className="font-bold text-xl">
              DRIVE<span className="text-driveAround-blue">AROUND</span>
            </div>
          </div>
        )}
        {title === 'Personal Chauffeur' && (
          <div className="bg-black text-white px-4 py-2 rounded-full">
            One Way
          </div>
        )}
      </div>
    </div>
  );
};

export default AppHeader;
