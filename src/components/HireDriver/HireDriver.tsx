
import React from 'react';
import { useNavigate } from 'react-router-dom';
import ServiceCard from '../ServiceCard';
import { useBooking, ServiceType } from '../../context/BookingContext';
import { User, Wrench, ClipboardList } from 'lucide-react';
import LocationPage from './LocationPage';
import { Button } from '../ui/button';

const HireDriver = () => {
  const navigate = useNavigate();
  const { setSelectedService } = useBooking();
  const [showLocationPage, setShowLocationPage] = React.useState(false);

  const handleServiceSelect = (service: ServiceType) => {
    setSelectedService(service);
    setShowLocationPage(true);
    sessionStorage.setItem('selectedService', service);
  };

  return (
    <div className="flex flex-col bg-[#2595be12] pb-16">

      {!showLocationPage ? (
         <div className="flex-1 p-4">
         <h2 className="text-2xl font-bold mb-4">Choose a Service</h2>
 
         <ServiceCard
           title="Personal Chauffeur"
           description="Pay-Per-Minute | Hourly Booking"
           icon={<User size={42} className="text-black" />}
           onClick={() => handleServiceSelect('Personal Chauffeur')}
         />
 
         <ServiceCard
           title="Garage Pick up / Drop"
           description="Fixed fare of AED 59"
           icon={<Wrench size={42} className="text-black" />}
           onClick={() => handleServiceSelect('Garage Pick up / Drop')}
         />
 
         {/* <ServiceCard
           title="RTA Vehicle Inspection"
           description="Fixed fare of AED 69"
           icon={<ClipboardList size={42} className="text-black" />}
           onClick={() => handleServiceSelect('RTA Vehicle Inspection')}
         /> */}
 
         <div className="mt-8">
           <h3 className="text-xl font-bold mb-4">Did you know you can use DriveAround for?</h3>
 
           <div className="bg-gray-800 rounded-xl overflow-hidden shadow-lg">
             <div className="relative h-48">
               <img
                 src="/lovable-uploads/road.png"
                 alt="Traveling to next city"
                 className="w-full h-full object-cover object-bottom"
               />
               <div className="absolute inset-0 bg-black bg-opacity-30 flex items-end p-6">
                 <h3 className="text-white text-2xl font-bold">
                   Travelling to<br />the next city!
                 </h3>
               </div>
             </div>
           </div>
         </div>
         <div className='mt-6 ml-3'>
           <Button variant='primary' className="fixed bottom-16 left-4 z-10 px-7 !py-5 rounded-full font-bold ml-6">
             Book Now
           </Button>
         </div>
       </div>
      ): (
        <div className='px-4'>
          <LocationPage />
        </div>
      )}

    </div>
  );
};

export default HireDriver;