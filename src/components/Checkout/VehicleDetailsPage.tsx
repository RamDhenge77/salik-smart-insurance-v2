
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CheckoutLayout from "../../components/Checkout/CheckoutLayout";
import VehicleDetailsForm from "../../components/Checkout/VehicleDetailsForm";
import { toast } from "../../components/ui/sonner";
import { useCarContext } from "@/context/Context";

const VehicleDetailsPage = () => {
  const [licensePlate, setLicensePlate] = useState("");
  const navigate = useNavigate();
  const { checkoutSteps, setCheckoutSteps, currentStep, setCurrentStep } =
      useCarContext();

  useEffect(() => {
    // Check if cart has items, location, and schedule are selected
    const cartItem = sessionStorage.getItem("cartItem");
    const location = sessionStorage.getItem("checkoutLocation");
    const date = sessionStorage.getItem("checkoutDate");
    const time = sessionStorage.getItem("checkoutTime");
    
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
    //   navigate("/checkout/location");
        setCheckoutSteps(1);
      return;
    }
    
    if (!date || !time) {
      toast.error("No schedule selected", {
        description: "Please select a date and time first",
      });
    //   navigate("/checkout/schedule");
        setCheckoutSteps(2);
      return;
    }
    
    // Load saved license plate if available
    const savedLicensePlate = sessionStorage.getItem("checkoutLicensePlate");
    if (savedLicensePlate) {
      setLicensePlate(savedLicensePlate);
    }
  }, [checkoutSteps, currentStep]);
  
  const handleLicensePlateChange = (value: string) => {
    setLicensePlate(value);
    sessionStorage.setItem("checkoutLicensePlate", value);
  };
  
  const handleNext = () => {
    if (!licensePlate) {
      toast.error("Please enter your vehicle license plate", {
        description: "License plate is required to proceed",
      });
      return false;
    }
    
    return true;
  };

  return (
      <VehicleDetailsForm
        licensePlate={licensePlate}
        onLicensePlateChange={handleLicensePlateChange}
      />
  );
};

export default VehicleDetailsPage;
