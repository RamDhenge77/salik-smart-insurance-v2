import { ReactNode } from "react";
import Stepper from "../ServiceSelection/Stepper";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import { useCarContext } from "@/context/Context";

interface CheckoutLayoutProps {
  children: ReactNode;
  step: number;
  prevRoute?: string;
  nextRoute?: string;
  nextButtonText?: string;
  onNext?: () => boolean;
}

const CheckoutLayout: React.FC<CheckoutLayoutProps> = ({
  children,
  step,
  prevRoute,
  nextRoute,
  nextButtonText = "Next",
  onNext,
}) => {
  const navigate = useNavigate();

  const { checkoutSteps, setCheckoutSteps, currentStep, setCurrentStep } =
    useCarContext();

  const handleNext = () => {
    setCheckoutSteps(checkoutSteps + 1);
  };

  const handlePrevious = () => {
    if (checkoutSteps > 1) {
      setCheckoutSteps(checkoutSteps - 1);
    }
    if (checkoutSteps === 1 && currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div>
      {/* <Stepper currentStep={step} /> */}

      <div className="bg-white p-6 rounded-lg border shadow-sm my-8 animate-fade-in">
        {children}
      </div>

      <div className="flex justify-between mt-8">
        {prevRoute ? (
          <Button
            variant="outline"
            onClick={handlePrevious}
            className="px-8 hover:bg-gray-100"
          >
            Previous
          </Button>
        ) : (
          <div></div>
        )}

        {checkoutSteps !==4 && (
          <Button variant="primary" className="px-8" onClick={handleNext}>
            {nextButtonText}
          </Button>
        )}
      </div>
    </div>
  );
};

export default CheckoutLayout;
