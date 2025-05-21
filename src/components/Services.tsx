import { useState, useEffect } from "react";
import { carBrands, getModelsByBrand } from "../data/services";
import ServiceCategoryList from "../components/ServiceSelection/ServiceCategoryList";
import CarBrandSelector from "../components/ServiceSelection/CarBrandSelector";
import CarModelSelector from "../components/ServiceSelection/CarModelSelector";
import ServicesList from "../components/ServiceSelection/ServicesList";
import SelectedCarDisplay from "../components/ServiceSelection/SelectedCarDisplay";
import Stepper from "../components/ServiceSelection/Stepper";
import { Button } from "../components/ui/button";
import { toast } from "../components/ui/sonner";
import { useCarContext } from "@/context/Context";
import LocationPage from "../pages/LocationPage";

const Services = () => {
  // State for tracking the flow
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  const [selectedModel, setSelectedModel] = useState<string | null>(null);
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const [carSelected, setCarSelected] = useState(false);
  const { currentStep, setCurrentStep } = useCarContext();

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId);
    // If we already have a car selected, we don't need to reset those values
    if (!carSelected) {
      setSelectedBrand(null);
      setSelectedModel(null);
      setSelectedYear(null);
    }
    setCurrentStep(2);
  };

  const handleBrandSelect = (brandId: string) => {
    setSelectedBrand(brandId);
    setSelectedModel(null);
    setSelectedYear(null);
  };

  const handleModelSelect = (modelId: string) => {
    setSelectedModel(modelId);
    setSelectedYear(null);
  };

  const handleYearSelect = (year: number) => {
    setSelectedYear(year);
  };

  const handleConfirmCar = () => {
    if (selectedBrand && selectedModel && selectedYear) {
      setCarSelected(true);
      setCurrentStep(2);
      toast.success("Car selected successfully", {
        description: "You can now browse services for your vehicle.",
      });
    } else {
      toast.error("Please complete your selection", {
        description: "Brand, model and year are required.",
      });
    }
  };

  const handleChangeCar = () => {
    setCarSelected(false);
    setCurrentStep(1);
  };

  // Get selected brand and model names for display
  const selectedBrandName = selectedBrand
    ? carBrands.find((brand) => brand.id === selectedBrand)?.name || ""
    : "";

  const selectedModelName =
    selectedModel && selectedBrand
      ? getModelsByBrand(selectedBrand).find(
          (model) => model.id === selectedModel
        )?.name || ""
      : "";

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold mb-2">
        {currentStep === 1 || currentStep === 2 ? "Our Services" : "Checkout"}
      </h1>
      <p className="text-gray-600 mb-4">
        {currentStep === 1 || currentStep === 2
          ? "Discover our premium car care services"
          : "Complete your service booking"}
      </p>

      <Stepper currentStep={currentStep} />

      {currentStep === 1 || currentStep === 2 ? (
        <>
          <ServiceCategoryList
            selectedCategory={selectedCategory}
            onSelectCategory={handleCategorySelect}
          />

          {!carSelected && (
            <div className="bg-white p-6 rounded-lg border shadow-sm max-w-lg mx-auto my-8 animate-fade-in">
              <h2 className="text-xl font-semibold mb-6 text-center">
                Select Your Car
              </h2>

              <CarBrandSelector
                selectedBrand={selectedBrand}
                onSelectBrand={handleBrandSelect}
              />

              {selectedBrand && (
                <CarModelSelector
                  brandId={selectedBrand}
                  selectedModel={selectedModel}
                  selectedYear={selectedYear}
                  onSelectModel={handleModelSelect}
                  onSelectYear={handleYearSelect}
                />
              )}

              {selectedBrand && selectedModel && selectedYear && (
                <div className="mt-8 text-center">
                  <Button
                    variant="primary"
                    className="px-8 py-5 text-sm"
                    onClick={handleConfirmCar}
                  >
                    Confirm Selection
                  </Button>
                </div>
              )}
            </div>
          )}

          {carSelected && selectedCategory && (
            <div className="animate-fade-in">
              <SelectedCarDisplay
                brandName={selectedBrandName}
                modelName={selectedModelName}
                modelYear={selectedYear!}
                onChangeCar={handleChangeCar}
              />

              <ServicesList
                categoryId={selectedCategory}
                brandName={selectedBrandName}
                modelName={selectedModelName}
                modelYear={selectedYear!}
              />
            </div>
          )}
        </>
      ) : (
        <LocationPage />
      )}
    </div>
  );
};

export default Services;
