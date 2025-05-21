import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Check, Car, CarFront } from "lucide-react";

interface ConfirmationPageProps {
  carDetails: any;
  sellingMethod: string;
  onDone: () => void;
}

const ConfirmationPage = ({
  carDetails,
  sellingMethod,
  onDone,
}: ConfirmationPageProps) => {
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    setIsAnimating(true);
  }, []);

  const getSellingMethodText = () => {
    switch (sellingMethod) {
      case "direct":
        return "Direct to Buyer";
      case "broker":
        return "Sell with a Broker";
      case "auction":
        return "Salik Auctions";
      default:
        return "Unknown";
    }
  };

  return (
    <div className="py-8 text-center">
      <div
        className={`mb-8 transition-all duration-500 ${
          isAnimating ? "animate-celebration" : "opacity-0 scale-90"
        }`}
      >
        <div className="w-24 h-24 rounded-full bg-salik-light flex items-center justify-center mx-auto mb-4">
          <Check className="h-12 w-12 text-[#2596be]" />
        </div>
        <h2 className="text-3xl font-bold text-[#2596be] mb-2">
          Congratulations!
        </h2>
        <p className="text-xl text-gray-600">
          Your car has been listed successfully!
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-6 items-stretch">
        <div
          className={`flex-1 bg-white rounded-lg shadow-md p-6 mb-4 md:mb-0 transition-all duration-500 delay-200 ${
            isAnimating ? "animate-fade-in" : "opacity-0"
          }`}
        >
          <h3 className="font-semibold text-lg mb-4 text-left flex items-center">
            <CarFront className="h-5 w-5 text-[#2596be] mr-2" />
            <span>Listing Summary</span>
          </h3>

          <div className="space-y-3 text-left bg-salik-light/20 p-4 rounded-lg">
            <div className="flex justify-between">
              <span className="text-gray-600">Car:</span>
              <span className="font-medium">
                {carDetails.year} {carDetails.make} {carDetails.model}
              </span>
            </div>
            {carDetails.trim && (
              <div className="flex justify-between">
                <span className="text-gray-600">Trim:</span>
                <span>{carDetails.trim}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span className="text-gray-600">Kilometers:</span>
              <span>{carDetails.kilometers} km</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Price:</span>
              <span className="font-medium flex items-center gap-1">
                <img src="/lovable-uploads/dirham.svg" className="h-5 w-5 opacity-70" alt="" />
                 {carDetails.price}
                 </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Selling Method:</span>
              <span>{getSellingMethodText()}</span>
            </div>
          </div>
        </div>

        <div
          className={`flex-1 bg-white rounded-lg shadow-md p-6 transition-all duration-500 delay-400 ${
            isAnimating ? "animate-fade-in" : "opacity-0"
          }`}
        >
          <h3 className="font-semibold text-lg mb-3 text-left flex items-center">
            <Car className="h-5 w-5 text-[#2596be] mr-2" />
            <span>What's Next?</span>
          </h3>
          <div className="text-left space-y-4 mb-6">
            <div className="bg-salik-light/20 p-3 rounded-md">
              <p className="text-gray-700 flex">
                <span className="font-medium text-[#2596be] mr-2">1.</span>
                Our team will review your listing within 24 hours
              </p>
            </div>
            <div className="bg-salik-light/20 p-3 rounded-md">
              <p className="text-gray-700 flex">
                <span className="font-medium text-[#2596be] mr-2">2.</span>
                You'll receive an email confirmation when your listing is live
              </p>
            </div>
            <div className="bg-salik-light/20 p-3 rounded-md">
              <p className="text-gray-700 flex">
                <span className="font-medium text-[#2596be] mr-2">3.</span>
                Potential buyers will contact you through our secure messaging
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-center gap-4 mt-auto">
            <Button
              variant="primary"
              onClick={onDone}
              className=""
            >
              View My Listings
            </Button>
            <Button variant="outline" onClick={onDone} className="hover:bg-gray-100">
              Sell Another Car
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationPage;
