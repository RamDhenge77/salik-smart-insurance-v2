import React from "react";
import { useCarContext } from "@/context/Context";
import CarLeasingHomePage from "./CarLeasingHomePage";
import Cars from "./Cars";
import CarDetails from "./CarDetails";
import Booking from "./Booking";
import BookingConfirmation from "./BookingConfirmation";

const CarLeasing = () => {
  const { carLeasingSteps } = useCarContext();

  const renderComponents = () => {
    switch (carLeasingSteps) {
      case 1:
        return <CarLeasingHomePage />;
      case 2:
        return <Cars />;
      case 3:
        return <CarDetails />;
      case 4:
        return <Booking />;
        case 5:
        return <BookingConfirmation />; 
      default:
        return <div>Page Not Found</div>; // Add default to avoid returning undefined
    }
  };

  return <div>{renderComponents()}</div>;
};

export default CarLeasing;
