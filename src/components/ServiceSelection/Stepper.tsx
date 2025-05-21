
import { cn } from "../../lib/utils";
import { CarFront, Settings, MapPin, CheckCircle } from "lucide-react";

interface StepperProps {
  currentStep: number;
}

const Stepper: React.FC<StepperProps> = ({ currentStep }) => {
  const steps = [
    { icon: <CarFront className="w-5 h-5" />, label: "Select Car", step: 1 },
    { icon: <Settings className="w-5 h-5" />, label: "Select Services", step: 2 },
    { icon: <MapPin className="w-5 h-5" />, label: "Select Location", step: 3 },
    { icon: <CheckCircle className="w-5 h-5" />, label: "Checkout", step: 4 },
  ];

  return (
    <div className="w-full py-6 mb-8 border-b">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center relative">
          {steps.map((step, index) => (
            <div key={step.step} className="flex flex-col items-center relative flex-1">
              {/* Connector line */}
              {index < steps.length - 1 && (
                <div 
                  className={cn(
                    "absolute top-5 w-full h-1", 
                    currentStep > step.step ? "bg-[#2596be]" : "bg-gray-200"
                  )}
                  style={{ left: '50%' }}
                ></div>
              )}
              
              {/* Step circle */}
              <div 
                className={cn(
                  "z-10 flex items-center justify-center w-10 h-10 rounded-full border-2 relative",
                  currentStep >= step.step 
                    ? "bg-[#2596be] border-[#2596be] text-white" 
                    : "bg-white border-gray-300 text-gray-400"
                )}
              >
                {step.icon}
              </div>
              
              {/* Step label */}
              <span 
                className={cn(
                  "mt-2 text-sm font-medium",
                  currentStep >= step.step ? "text-[#2596be]" : "text-gray-500"
                )}
              >
                {step.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Stepper;
