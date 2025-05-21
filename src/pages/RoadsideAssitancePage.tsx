import { Car, MapPin, Phone } from "lucide-react";
import React from "react";
import { Button } from "../components/ui/button";
import { Link } from "react-router-dom";
import { useCarContext } from "@/context/Context";
import Index from "@/components/RoadsideAssitance/Index";
import ServicesPage from "@/components/RoadsideAssitance/Services";
import RequestServicePage from "@/components/RoadsideAssitance/RequestServicePage";
import ContactPage from "@/components/RoadsideAssitance/ContactPage";
import Navigation from "@/components/RoadsideAssitance/Navigation";
import VehiclePage from "@/components/RoadsideAssitance/VehiclePage";

const RoadsideAssitancePage = () => {
  const { roadsideAssistance } = useCarContext();

  const renderStepComponent = () => {
    switch (roadsideAssistance) {
      case 1:
        return <Index />;
      case 2:
        return <ServicesPage />;
      case 3:
        return <RequestServicePage />;
      case 4:
        return <ContactPage />;
      case 5:
        return <VehiclePage />;

      default:
        return <div>Page not found</div>;
    }
  };

  return (
    <div>
      <Navigation />
      {renderStepComponent()}
    </div>
  );
};

export default RoadsideAssitancePage;
