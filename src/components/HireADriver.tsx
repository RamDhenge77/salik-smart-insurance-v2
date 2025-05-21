import React from "react";
import ServiceCard from './ServiceCard';
import { useBooking, ServiceType } from "../context/BookingContext";
import { User, Wrench, ClipboardList } from 'lucide-react';

const HireADriver = () => {
  const { setSelectedService } = useBooking();

  const handleServiceSelect = (service: ServiceType) => {
    setSelectedService(service);
  };

  return (
    <div className="">
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
      <ServiceCard 
        title="RTA Vehicle Inspection"
        description="Fixed fare of AED 69"
        icon={<ClipboardList size={42} className="text-black" />}
        onClick={() => handleServiceSelect('RTA Vehicle Inspection')}
      />
      <div className="mt-8">
        <h3 className="text-xl font-bold mb-4">Did you know you can use DriveAround for?</h3>
        <div className="bg-gray-800 rounded-xl overflow-hidden shadow-lg">
          <div className="relative h-48">
            <img 
              src="/lovable-uploads/a3430b6f-d689-485a-8343-ba3a22f9271d.png" 
              alt="Traveling to next city" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-30 flex items-end p-6">
              <h3 className="text-white text-2xl font-bold">
                Travelling to<br />the next city!
              </h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HireADriver;
