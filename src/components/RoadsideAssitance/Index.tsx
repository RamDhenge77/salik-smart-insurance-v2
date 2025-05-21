import { Car, MapPin, Phone } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { useCarContext } from "@/context/Context";

const RoadsideAssitance = () => {
  const { roadsideAssistance, setRoadsideAssistance } = useCarContext();
  return (
    <div>
      <div className="relative bg-salik-gray-600 text-white">
        <div className="absolute inset-0 z-0 bg-[#2596be]" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 py-16 md:py-24 lg:py-32">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="max-w-xl">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Premium Roadside Assistance
              </h1>
              <p className="text-xl md:text-2xl mb-8">
                24/7 support when you need it most, wherever you are.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button variant="primary" className="px-8 py-6 text-lg" onClick={() => setRoadsideAssistance(3)}>
                  Request Service
                </Button>
                <Button
                  variant="outline"
                  className="bg-transparent border-white text-white hover:bg-white/10 px-8 py-6 text-lg"
                  onClick={() => setRoadsideAssistance(4)}
                >
                  Contact Us
                </Button>
              </div>
            </div>
            <div className="hidden md:block">
              <img
                src="/lovable-uploads/roadside-ass.png"
                alt="Roadside Assistance Tow Truck"
                className="w-full h-auto rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Services Overview */}
      <div className="py-16 bg-salik-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-salik-gray-700">
            Our Services
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="bg-salik-gray-50 w-16 h-16 rounded-full flex items-center justify-center mb-4 mx-auto">
                <Car className="h-8 w-8 text-salik-gray-600" />
              </div>
              <h3 className="text-xl font-bold text-center mb-2 text-salik-gray-700">
                Emergency Roadside Assistance
              </h3>
              <p className="text-salik-gray-500 text-center">
                Immediate help when you're stranded on the road.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="bg-salik-gray-50 w-16 h-16 rounded-full flex items-center justify-center mb-4 mx-auto">
                <Phone className="h-8 w-8 text-salik-gray-600" />
              </div>
              <h3 className="text-xl font-bold text-center mb-2 text-salik-gray-700">
                Concierge
              </h3>
              <p className="text-salik-gray-500 text-center">
                Premium support services for your every need.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="bg-salik-gray-50 w-16 h-16 rounded-full flex items-center justify-center mb-4 mx-auto">
                <Car className="h-8 w-8 text-salik-gray-600" />
              </div>
              <h3 className="text-xl font-bold text-center mb-2 text-salik-gray-700">
                Rent a Car
              </h3>
              <p className="text-salik-gray-500 text-center">
                Premium vehicle rentals delivered to your location.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="bg-salik-gray-50 w-16 h-16 rounded-full flex items-center justify-center mb-4 mx-auto">
                <MapPin className="h-8 w-8 text-salik-gray-600" />
              </div>
              <h3 className="text-xl font-bold text-center mb-2 text-salik-gray-700">
                Transportation
              </h3>
              <p className="text-salik-gray-500 text-center">
                Private transportation services for all your needs.
              </p>
            </div>
          </div>

          <div className="text-center mt-12">
            {/* <Link to="/roadside-assistance/services"> */}
            <Button
              variant="primary"
              className=""
              onClick={() => {
                setRoadsideAssistance(2);
              }}
            >
              View All Services
            </Button>
            {/* </Link> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoadsideAssitance;
