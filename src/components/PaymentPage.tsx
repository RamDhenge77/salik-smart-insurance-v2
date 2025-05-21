import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import CheckoutLayout from "../../components/Checkout/CheckoutLayout";
import OrderSummary from "../components/Checkout/OrderSummary";
import { toast } from "../components/ui/sonner";
import { useCarContext } from "@/context/Context";

const PaymentPage = () => {
  const [cartItem, setCartItem] = useState<any>(null);
  const [location, setLocation] = useState("");
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [time, setTime] = useState("");
  const [licensePlate, setLicensePlate] = useState("");
  const navigate = useNavigate();
  const { checkoutSteps, setCheckoutSteps, currentStep, setCurrentStep } =
    useCarContext();

  useEffect(() => {
    // Check if all required information is available
    const cartItemStr = sessionStorage.getItem("cartItem");
    const locationStr = sessionStorage.getItem("checkoutLocation");
    const dateStr = sessionStorage.getItem("checkoutDate");
    const timeStr = sessionStorage.getItem("checkoutTime");
    const licensePlateStr = sessionStorage.getItem("checkoutLicensePlate");

    if (!cartItemStr) {
      toast.error("Your cart is empty", {
        description: "Please select a service first",
      });
      // navigate("/services");
      setCheckoutSteps(1);
      setCurrentStep(1);
      return;
    }

    if (!locationStr) {
      toast.error("No location selected", {
        description: "Please select a location first",
      });
      // navigate("/checkout/location");
      setCheckoutSteps(1);
      return;
    }

    if (!dateStr || !timeStr) {
      toast.error("No schedule selected", {
        description: "Please select a date and time first",
      });
      // navigate("/checkout/schedule");
      setCheckoutSteps(2);
      return;
    }

    if (!licensePlateStr) {
      toast.error("No vehicle details provided", {
        description: "Please enter your vehicle license plate first",
      });
      // navigate("/checkout/vehicle-details");
      setCheckoutSteps(3);
      return;
    }

    // Set the state with the saved data
    setCartItem(JSON.parse(cartItemStr));
    setLocation(locationStr);
    setDate(dateStr ? new Date(dateStr) : undefined);
    setTime(timeStr);
    setLicensePlate(licensePlateStr);
  }, [checkoutSteps, currentStep]);

  return (
    <>
      {/* <CheckoutLayout
      step={4}
      prevRoute="/checkout/vehicle-details"
      nextButtonText="Place Order"
    > */}
      {cartItem && (
        <OrderSummary
          cartItem={cartItem}
          location={location}
          date={date}
          time={time}
          licensePlate={licensePlate}
        />
      )}
      {/* </CheckoutLayout> */}
    </>
  );
};

export default PaymentPage;
