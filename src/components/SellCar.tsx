import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// import Navbar from "@/components/Layout/Navbar";
import CarDetailsForm from "@/components/SellCar/CarDetailsForm";
import PhotoUploadForm from "@/components/SellCar/PhotoUploadForm";
import SellingMethodForm from "@/components/SellCar/SellingMethodForm";
import ConfirmationPage from "@/components/SellCar/ConfirmationPage";
import SellCarProgress from "@/components/SellCar/SellCarProgress";

interface CarDetails {
  [key: string]: any;
}

const SellCar = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    carDetails: {} as CarDetails,
    photos: [] as File[],
    sellingMethod: "",
  });

  const handleCarDetailsSubmit = (data: CarDetails) => {
    setFormData({
      ...formData,
      carDetails: data,
    });
    setCurrentStep(2);
  };

  const handlePhotoUploadSubmit = (photos: File[]) => {
    setFormData({
      ...formData,
      photos,
    });
    setCurrentStep(3);
  };

  const handleSellingMethodSubmit = (method: string) => {
    setFormData({
      ...formData,
      sellingMethod: method,
    });
    setCurrentStep(4);
  };

  const handleDone = () => {
    // navigate("/sell");
    setCurrentStep(1);
  };

  const goBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return <CarDetailsForm onNext={handleCarDetailsSubmit} />;
      case 2:
        return (
          <PhotoUploadForm
            onPrevious={goBack}
            onNext={handlePhotoUploadSubmit}
          />
        );
      case 3:
        return (
          <SellingMethodForm
            onPrevious={goBack}
            onNext={handleSellingMethodSubmit}
          />
        );
      case 4:
        return (
          <ConfirmationPage
            carDetails={formData.carDetails}
            sellingMethod={formData.sellingMethod}
            onDone={handleDone}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* <Navbar /> */}
      <main
        className="flex-grow bg-cover bg-center bg-fixed h-screen overflow-auto  
                   [&::-webkit-scrollbar]:w-1
                   [&::-webkit-scrollbar-track]:rounded-full
                 [&::-webkit-scrollbar-track]:bg-gray-100
                   [&::-webkit-scrollbar-thumb]:rounded-full
                 [&::-webkit-scrollbar-thumb]:bg-gray-300
                 dark:[&::-webkit-scrollbar-track]:bg-neutral-700
                 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500"
        style={{
          backgroundImage:
            'url("https://images.unsplash.com/photo-1494976388531-d1058494cdd8?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3")',
          backgroundBlendMode: "overlay",
          backgroundColor: "rgba(255, 255, 255, 0.9)",
        }}
      >
        <div className="container mx-auto px-4 py-6">
          <SellCarProgress currentStep={currentStep} />
        </div>
        <div className="container mx-auto px-4 pb-12">
          <div className="bg-white/95 backdrop-blur-sm rounded-lg shadow-md p-6 md:p-8 border border-gray-100">
            {renderStepContent()}
          </div>
        </div>
      </main>
    </div>
  );
};

export default SellCar;
