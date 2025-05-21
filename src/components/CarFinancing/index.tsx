import { useCarContext } from "@/context/Context";
import React from "react";
import CarFinancingHomePage from "./CarFinancingHomePage";
import ApplicationForm from "./ApplicationForm";
import EligibilityCheck from "./EligibilityCheck";
import CarSelection from "./CarSelection";
import PlanSummary from "./PlanSummary";
import DocumentUpload from "./DocumentUpload";
import Payment from "./Payment";
import ThankYou from "./ThankYou";

const CarFinancing = () => {
  const { carFinanceSteps, setCarFinanceSteps } = useCarContext();

  const renderComponents = () => {
    switch (carFinanceSteps) {
      case 1:
        return <CarFinancingHomePage />;
      case 2:
        return <ApplicationForm />;
      case 3:
        return <EligibilityCheck />;
      case 4:
        return <CarSelection />;
      case 5:
        return <PlanSummary />;
      case 6:
        return <DocumentUpload />;
      case 7:
        return <Payment />;
      case 8:
        return <ThankYou />;

      default:
        return <CarFinancingHomePage />;
    }
  };

  return <div>{renderComponents()}</div>;
};

export default CarFinancing;
