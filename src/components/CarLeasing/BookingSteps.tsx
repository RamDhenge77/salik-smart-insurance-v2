import React from "react";
import { cn } from "@/lib/utils";

type BookingStep = {
  id: string;
  title: string;
  description: string;
}

interface BookingStepsProps {
  steps: BookingStep[];
  currentStepId: string;
}

const BookingSteps = ({ steps, currentStepId }: BookingStepsProps) => {
  const currentIndex = steps.findIndex((step) => step.id === currentStepId);

  return (
    <div className="w-full py-4">
      <div className="flex justify-between items-center">
        {steps.map((step, index) => {
          const isCompleted = index < currentIndex;
          const isCurrent = step.id === currentStepId;

          return (
            <React.Fragment key={step.id}>
              {index > 0 && (
                <div className="flex-1 h-1 mx-2 bg-gray-200">
                  <div
                    className="h-full bg-btn-primary transition-all"
                    style={{ width: isCompleted ? "100%" : "0%" }}
                  ></div>
                </div>
              )}
              <div className="flex flex-col items-center">
                <div
                  className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-colors",
                    isCompleted
                      ? "bg-btn-primary text-white"
                      : isCurrent
                      ? "bg-primary/20 text-primary border-2 border-primary"
                      : "bg-gray-100 text-gray-500"
                  )}
                >
                  {index + 1}
                </div>
                <span
                  className={cn(
                    "mt-2 text-xs font-medium text-center",
                    isCurrent ? "text-primary" : "text-gray-500"
                  )}
                >
                  {step.title}
                </span>
              </div>
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default BookingSteps;
