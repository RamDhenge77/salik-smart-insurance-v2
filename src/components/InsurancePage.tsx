import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Check, Plus, Edit } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useCarContext } from "@/context/Context";

const InsurancePage: React.FC = () => {
  const [vehicleValue, setVehicleValue] = useState<string>("100000");
  const { followUp } = useCarContext();
  const [selectedPlans, setSelectedPlans] = useState<{
    comprehensive: boolean;
    thirdParty: boolean;
    driverAccident: boolean;
    passengerAccident: boolean;
  }>({
    comprehensive: true,
    thirdParty: false,
    driverAccident: false,
    passengerAccident: false,
  });

  const handlePlanSelection = (plan: keyof typeof selectedPlans) => {
    setSelectedPlans((prev) => ({
      ...prev,
      [plan]: !prev[plan],
    }));
  };

  const handleContinue = () => {
    followUp();
  };

  return (
    <div className="min-h-screen bg-[#2595be12]">
      {/* Header with LIVA logo */}
      <header className="bg-[#F0F8FA] py-6">
        <div className="container mx-auto px-4">
          <img
            src="/lovable-uploads/liva-logo.png"
            alt="LIVA Logo"
            className="h-12"
          />
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        <div className="max-w-2xl mx-auto">
          {/* Vehicle Details Card */}
          <Card className="bg-white rounded-2xl p-6 mb-4 shadow-sm">
            <div className="flex justify-between items-center">
              <div>
                <div className="text-gray-600 text-sm">Vehicle Model</div>
                <div className="text-2xl font-bold">Lexus GX 460 2015</div>
              </div>
              <div className="h-12 w-12 rounded-full bg-white flex items-center justify-center">
                {/* Logo placeholder - you can add a car logo here */}
              </div>
            </div>
          </Card>

          {/* Vehicle Value Card */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <Card className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="flex justify-between items-center">
                <div>
                  <div className="text-gray-600 text-sm">Vehicle Value</div>
                  <div className="text-2xl font-bold">{vehicleValue} AED</div>
                </div>
                <div className="h-12 w-12 rounded-full bg-btn-primary text-white flex items-center justify-center">
                  <Edit size={20} />
                </div>
              </div>
            </Card>

            <Card className="bg-white rounded-2xl p-6 shadow-sm">
              <div>
                <div className="text-gray-600 text-sm">Policy Start Date</div>
                <div className="text-2xl font-bold">05/05/2025</div>
              </div>
            </Card>
          </div>

          {/* Plan Selection */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-center mb-4">
              Choose Your Plan
            </h2>

            <Card
              className={`bg-white rounded-2xl p-6 mb-4 shadow-sm cursor-pointer hover:shadow-md transition-shadow ${
                selectedPlans.comprehensive ? "border-2 border-[#2596be]" : ""
              }`}
              onClick={() => handlePlanSelection("comprehensive")}
            >
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <div className="h-8 w-8 rounded-full bg-btn-primary text-white flex items-center justify-center mr-4">
                    <Plus size={20} />
                  </div>
                  <span className="text-xl text-gray-700">Comprehensive</span>
                </div>
                <div className="flex items-center">
                  <span className="text-xl font-bold mr-4">1,200 AED</span>
                  <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
                    {selectedPlans.comprehensive && (
                      <Check size={20} className="text-[#2596be]" />
                    )}
                  </div>
                </div>
              </div>
            </Card>

            <Card
              className={`bg-white rounded-2xl p-6 shadow-sm cursor-pointer hover:shadow-md transition-shadow ${
                selectedPlans.thirdParty ? "border-2 border-[#2596be]" : ""
              }`}
              onClick={() => handlePlanSelection("thirdParty")}
            >
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <div className="h-8 w-8 rounded-full bg-btn-primary text-white flex items-center justify-center mr-4">
                    <Plus size={20} />
                  </div>
                  <span className="text-xl text-gray-700">
                    Third Party Liability
                  </span>
                </div>
                <div className="flex items-center">
                  <span className="text-xl font-bold mr-4">1,000 AED</span>
                  <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
                    {selectedPlans.thirdParty && (
                      <Check size={20} className="text-[#2596be]" />
                    )}
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Upgrades */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-center mb-4">
              Upgrade Your Plan
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <Card
                className={`bg-white rounded-2xl p-6 shadow-sm cursor-pointer hover:shadow-md transition-shadow ${
                  selectedPlans.driverAccident
                    ? "border-2 border-[#2596be]"
                    : ""
                }`}
                onClick={() => handlePlanSelection("driverAccident")}
              >
                <div className="text-center">
                  <div className="text-gray-600 text-sm">
                    Personal Accident Benefit - Driver
                  </div>
                  <div className="text-xl font-bold my-2">60 AED</div>
                  <div className="flex justify-center mt-2">
                    <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
                      {selectedPlans.driverAccident && (
                        <Check size={20} className="text-[#2596be]" />
                      )}
                    </div>
                  </div>
                </div>
              </Card>

              <Card
                className={`bg-white rounded-2xl p-6 shadow-sm cursor-pointer hover:shadow-md transition-shadow ${
                  selectedPlans.passengerAccident
                    ? "border-2 border-[#2596be]"
                    : ""
                }`}
                onClick={() => handlePlanSelection("passengerAccident")}
              >
                <div className="text-center">
                  <div className="text-gray-600 text-sm">
                    Personal Accident Passengers
                  </div>
                  <div className="text-xl font-bold my-2">60 AED</div>
                  <div className="flex justify-center mt-2">
                    <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
                      {selectedPlans.passengerAccident && (
                        <Check size={20} className="text-[#2596be]" />
                      )}
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card className="bg-white rounded-2xl p-6 shadow-sm cursor-pointer hover:shadow-md transition-shadow">
                <div className="text-center">
                  <div className="text-gray-600 text-sm">
                    No Claims Discount
                  </div>
                  <div className="flex justify-center mt-4">
                    <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
                      {/* Empty circle */}
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="bg-white rounded-2xl p-6 shadow-sm cursor-pointer hover:shadow-md transition-shadow">
                <div className="text-center">
                  <div className="text-gray-600 text-sm">24 Hours Accident</div>
                  <div className="flex justify-center mt-4">
                    <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
                      {/* Empty circle */}
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>

          {/* Continue Button */}
          <div className="flex justify-center mt-8">
            <Button
              className="px-8 py-2 rounded-full text-lg"
              variant="primary"
              onClick={() => handleContinue()}
            >
              Proceed to Checkout
            </Button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-[#F0F8FA] py-6 mt-12">
        <div className="container mx-auto px-4 text-center text-gray-600 text-sm">
          <p>© 2025 LIVA Insurance. All rights reserved.</p>
          <p className="mt-2">A partnership with Salik Company PJSC</p>
        </div>
      </footer>
    </div>
  );
};

export default InsurancePage;
