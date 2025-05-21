
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';
import { useBooking } from '@/context/BookingContext';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '../ui/button';
import { useCarContext } from '@/context/Context';

const RequestInspectionPage = () => {
  const navigate = useNavigate();
  const { setSelectedService } = useBooking();
  const [showConfirmation, setShowConfirmation] = useState(false);
  const {setRegistrationSteps} = useCarContext();

  const handleProceed = () => {
    setSelectedService('RTA Vehicle Inspection');
    setShowConfirmation(true);
  };
  
  const handleSchedulePickup = () => {
    // navigate('/schedule-pickup');
    setRegistrationSteps(2);
  };
  
  const handleDecline = () => {
    setRegistrationSteps(1); // Go back to Service Options Page
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-white p-4">
      <div className="flex-1">
        <div className="text-center mb-6">
          <div className="inline-flex rounded-full bg-green-100 p-3">
            <CheckCircle className="h-8 w-8 text-green-500" />
          </div>
          <h1 className="text-2xl font-bold mt-4">RTA Car Inspection Service</h1>
          <p className="text-gray-500 mt-1">Exclusive for Salik customers</p>
        </div>
        
        <div className="bg-white rounded-lg mb-6">
          <p className="text-gray-700 mb-4">
            As a Salik customer, you are eligible for an exclusive home concierge service for RTA car inspection offered by our partner Zofeur.
          </p>
          <p className="text-gray-700 mb-4">
            For just AED 69, Zofeur will pick up your car, take it for RTA inspection, and, if it fails, drop it at ENOC Auto Pro for repairs and re-test it. Hassle-free service at your doorstep!
          </p>
          <p className="text-gray-700 mb-4">
            The inspection process typically takes 2-3 hours, and you'll receive real-time updates throughout the process.
          </p>
          <p className="font-bold mb-4">
            Would you like to proceed?
          </p>
        </div>
        
        <div className="flex gap-4 mt-8">
          <Button
            variant="secondary" 
            onClick={handleDecline} 
            className="flex-1 h-[3.4rem] font-bold text-[1rem] border-black"
          >
            No, Thanks
          </Button>
          <Button
            variant="primary"
            onClick={handleProceed} 
            className="flex-1 h-[3.4rem] font-bold text-[1rem]"
          >
            Yes, Proceed
          </Button>
        </div>
      </div>

      <Dialog open={showConfirmation} onOpenChange={setShowConfirmation}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center">Thank You!</DialogTitle>
          </DialogHeader>
          <div className="px-2 py-4">
            <p className="text-gray-700 mb-4">
              Thank you for choosing our home concierge service for your RTA car inspection! As a valued Salik customer, we're here to make the process seamless and convenient for you.
            </p>
            <p className="text-gray-700 mb-6">
              Please schedule a pick-up of your vehicle inspection.
            </p>
            <Button
              variant="primary" 
              onClick={handleSchedulePickup}
              className="w-full h-[3rem] py-4 rounded-md font-bold"
            >
              Schedule Pickup
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default RequestInspectionPage;
