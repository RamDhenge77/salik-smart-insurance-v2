import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import CheckoutLayout from "../../components/Checkout/CheckoutLayout";
// import LocationSelector from "../../components/Checkout/LocationSelector";
import { toast } from "../components/ui/sonner";
import CheckoutLayout from "../components/Checkout/CheckoutLayout";
import LocationSelector from "../components/Checkout/LocationSelector";
import { useCarContext } from "@/context/Context";
import ScheduleSelector from "../components/Checkout/ScheduleSelector";
import VehicleDetailsPage from "../components/Checkout/VehicleDetailsPage";
import PaymentPage from "../components/PaymentPage";
import OrderSummary from "../components/Checkout/OrderSummary";

const LocationPage = () => {
  const [location, setLocation] = useState("");
  const navigate = useNavigate();
  const { checkoutSteps, setCheckoutSteps, currentStep, setCurrentStep } =
    useCarContext();  
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedTime, setSelectedTime] = useState("");

  useEffect(() => {
    // Check if cart has items
    const cartItem = sessionStorage.getItem("cartItem");
    if (!cartItem) {
      toast.error("Your cart is empty", {
        description: "Please select a service first",
      });
      //   navigate("/services");
      setCheckoutSteps(1);
      setCurrentStep(1);
      return;
    }

    // Load saved location if available
    const savedLocation = sessionStorage.getItem("checkoutLocation");
    if (savedLocation) {
      setLocation(savedLocation);
    }
  }, [checkoutSteps]);

  const handleLocationChange = (newLocation: string) => {
    setLocation(newLocation);
    sessionStorage.setItem("checkoutLocation", newLocation);
  };

  const handleNext = () => {
    if (!location) {
      toast.error("Please select a location", {
        description: "Location is required to proceed",
      });
      return false;
    }
    return true;
  };

  useEffect(() => {
    // Check if cart has items and location is selected
    const cartItem = sessionStorage.getItem("cartItem");
    const location = sessionStorage.getItem("checkoutLocation");

    if (!cartItem) {
      toast.error("Your cart is empty", {
        description: "Please select a service first",
      });
      //   navigate("/services");
      setCheckoutSteps(1);
      setCurrentStep(1);
      return;
    }

    if (!location) {
      toast.error("No location selected", {
        description: "Please select a location first",
      });
      setCheckoutSteps(1);
      return;
    }

    // Load saved schedule if available
    const savedDate = sessionStorage.getItem("checkoutDate");
    const savedTime = sessionStorage.getItem("checkoutTime");

    if (savedDate) {
      setSelectedDate(new Date(savedDate));
    }

    if (savedTime) {
      setSelectedTime(savedTime);
    }
  }, [checkoutSteps, currentStep]);

  const handleDateChange = (date: Date | undefined) => {
    setSelectedDate(date);
    if (date) {
      sessionStorage.setItem("checkoutDate", date.toISOString());
    } else {
      sessionStorage.removeItem("checkoutDate");
    }
  };

  const handleTimeChange = (time: string) => {
    setSelectedTime(time);
    sessionStorage.setItem("checkoutTime", time);
  };

  const renderStepComponent = () => {
    switch (checkoutSteps) {
      case 1:
        return (
          <LocationSelector
            selectedLocation={location}
            onLocationChange={handleLocationChange}
          />
        );
      case 2:
        return (
          <ScheduleSelector
            selectedDate={selectedDate}
            selectedTime={selectedTime}
            onDateChange={handleDateChange}
            onTimeChange={handleTimeChange}
          />
        );
        case 3:
          return <VehicleDetailsPage />;
        case 4:
          return <PaymentPage />;
        
      default:
        return <div>Step not found</div>;
    }
  };

  return (
    <CheckoutLayout
      step={1}
      prevRoute="/services"
      nextRoute="/checkout/schedule"
      onNext={handleNext}
    >
      {renderStepComponent()}
    </CheckoutLayout>
  );
};

export default LocationPage;
