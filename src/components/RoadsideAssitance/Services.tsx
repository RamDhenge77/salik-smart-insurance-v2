import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ServiceCard from "@/components/RoadsideAssitance/ServiceCard";
import ServiceOptionCard from "@/components/RoadsideAssitance/ServiceOptionCard";
// import Navigation from "@/components/Navigation";
import { SERVICE_HISTORY } from "@/lib/data";
import { Car, Phone, Truck, MapPin } from "lucide-react";
import { useCarContext } from "@/context/Context";

export default function ServicesPage() {
  const [activeTab, setActiveTab] = useState("active");
  const { roadsideAssistance, setRoadsideAssistance } = useCarContext();

  const activeServices = SERVICE_HISTORY.filter(
    (service) => service.status === "In Progress"
  );
  const completedServices = SERVICE_HISTORY.filter(
    (service) => service.status === "Completed"
  );

  const serviceOptions = [
    {
      title: "Emergency Roadside Assistance",
      icon: <Car className="h-8 w-8" />,
      description: "Immediate help when you're stranded on the road.",
      path: "/request-service"
    },
    {
      title: "Concierge",
      icon: <Phone className="h-8 w-8" />,
      description: "Premium support services for your every need.",
      path: "/request-service"
    },
    {
      title: "Rent a Car",
      icon: <Car className="h-8 w-8" />,
      description: "Premium vehicle rentals delivered to your location.",
      path: "/request-service"
    },
    {
      title: "Transportation",
      icon: <Truck className="h-8 w-8" />,
      description: "Private transportation services for all your needs.",
      path: "/request-service"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      {/* <Navigation /> */}

      <div className="flex-1 py-8 px-4 max-w-7xl mx-auto w-full">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-[#2596be]">My Services</h1>
          {/* <Link to="/request-service"> */}
            <Button variant="default" className="bg-salik-gray-600 hover:bg-salik-gray-700" onClick={() => setRoadsideAssistance(3)}>
              Request New Service
            </Button>
          {/* </Link> */}
        </div>

        {/* Service Options */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {serviceOptions.map((option, index) => (
              <div key={index} onClick={() => setRoadsideAssistance(3)} className="block h-full">
                <ServiceOptionCard
                  title={option.title}
                  icon={option.icon}
                  description={option.description}
                  onClick={() => {}}
                />
              </div>
            ))}
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
          </TabsList>

          <TabsContent value="active">
            <div>
              {activeServices.length > 0 ? (
                activeServices.map((service) => (
                  <ServiceCard
                    key={service.id}
                    id={service.id}
                    vehicleId={service.vehicleId}
                    serviceType={service.serviceType}
                    date={service.date}
                    status={service.status}
                    pickupLocation={service.pickupLocation}
                    dropoffLocation={service.dropoffLocation}
                  />
                ))
              ) : (
                <div className="text-center py-12 bg-[#F0F8FA] rounded-lg">
                  <p className="text-salik-gray-500 mb-4">
                    No active services found.
                  </p>
                    <Button variant="primary" className="" onClick={() => setRoadsideAssistance(3)}>
                      Request New Service
                    </Button>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="history">
            <div>
              {completedServices.length > 0 ? (
                completedServices.map((service) => (
                  <ServiceCard
                    key={service.id}
                    id={service.id}
                    vehicleId={service.vehicleId}
                    serviceType={service.serviceType}
                    date={service.date}
                    status={service.status}
                    pickupLocation={service.pickupLocation}
                    dropoffLocation={service.dropoffLocation}
                  />
                ))
              ) : (
                <div className="text-center py-12 bg-salik-gray-50 rounded-lg">
                  <p className="text-salik-gray-500">
                    No service history found.
                  </p>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* <footer className="bg-salik-gray-50 py-6">
        <div className="max-w-7xl mx-auto px-4 text-center text-salik-gray-600">
          <p>&copy; {new Date().getFullYear()} Salik. All rights reserved.</p>
        </div>
      </footer> */}
    </div>
  );
}