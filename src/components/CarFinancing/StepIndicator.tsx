import { Check } from "lucide-react";

interface StepIndicatorProps {
  currentStep: number;
  steps: string[];
}

const StepIndicator = ({ currentStep, steps }: StepIndicatorProps) => {
  return (
    <div className="py-8">
      <div className="flex items-center justify-center">
        <div className="flex items-center w-full max-w-3xl">
          {steps.map((step, index) => (
            <div key={index} className="flex-1 relative">
              <div className="flex items-center justify-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center z-50 ${
                    index < currentStep
                      ? "bg-[#95c7dc] text-[#4F5063]"
                      : index === currentStep
                      ? "bg-[#95c7dc] text-[#4F5063]"
                      : "bg-gray-200 text-[#4F5063]"
                  }`}
                >
                  {index < currentStep ? (
                    <Check className="w-5 h-5" />
                  ) : (
                    <span>{index + 1}</span>
                  )}
                </div>
              </div>
              <div className="text-xs mt-2 text-center text-[#4F5063]">
                {step}
              </div>
              {index < steps.length - 1 && (
                <div
                  className={`h-1 w-full absolute top-5 left-1/2 ${
                    index < currentStep ? "bg-[#95c7dc]" : "bg-gray-200"
                  }`}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StepIndicator;
