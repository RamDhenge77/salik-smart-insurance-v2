import React from "react";
import { Button } from "./ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BadgeCheck, ClipboardPlus, Truck } from "lucide-react";
import InsurancePage from "./InsurancePage";
import RoadsideAssitancePage from "../pages/RoadsideAssitancePage";
import GetWarrantyPage from "@/pages/GetWarrantyPage";

const Insurance = () => {
  const [insuraanceVisible, setInsuranceVisible] = React.useState(false);
  return (
    <Tabs defaultValue="insurance">
      <div className="flex items-center justify-center">
        <TabsList className="mb-6 gap-4">
          <TabsTrigger
            value="insurance"
            className="text-center data-[state=active]:bg-white data-[state=active]:text-gray-700 border-r border-gray-200 hover:bg-gray-100 transition-colors font-medium"
          >
            <ClipboardPlus className="h-4 w-4 mr-2" />
            Insurance
          </TabsTrigger>
          <TabsTrigger
            value="get-warranty"
            className="text-center data-[state=active]:bg-white data-[state=active]:text-gray-700 border-r border-gray-200 hover:bg-gray-100 transition-colors font-medium"
          >
            <BadgeCheck className="h-4 w-4 mr-2" />
            Get Warranty
          </TabsTrigger>
          <TabsTrigger
            value="roadside"
            className="text-center data-[state=active]:bg-white data-[state=active]:text-gray-700 border-r border-gray-200 hover:bg-gray-100 transition-colors font-medium"
          >
            <ClipboardPlus className="h-4 w-4 mr-2" />
            Roadside Assistance
          </TabsTrigger>
        </TabsList>
      </div>
      <TabsContent value="insurance">
        {!insuraanceVisible ? (
          <div className="min-h-screen bg-[#2595be12] flex flex-col items-center justify-center p-4">
            <div className="max-w-2xl w-full bg-white rounded-xl shadow-md p-6 md:p-8 space-y-6">
              <div className="flex justify-center mb-4">
                <img
                  src="/lovable-uploads/liva-logo.png"
                  alt="LIVA Logo"
                  className="h-12"
                />
              </div>

              <h1 className="text-2xl md:text-3xl font-bold text-center text-gray-800">
                Insurance Consent
              </h1>

              <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
                <h2 className="text-xl font-bold mb-4">Terms and Conditions</h2>
                <div className="text-sm text-gray-700 space-y-4">
                  <p>
                    By providing your acceptance you accept Salik's Terms &
                    Conditions to share your personal information, as well as
                    your vehicle and other profile details to our partners, and
                    you will be re-directed to the insurance portal of [LIVA].
                    The insurance policy referred to on Liva's portal is
                    underwritten by [LIVA] and the insurance coverage that the
                    policy provides shall be at all times subject to the terms
                    and conditions of the policy contract issued by [LIVA].
                    [LIVA] Terms and Conditions apply.
                  </p>
                  <p>
                    All product features, benefits and returns (if applicable)
                    are offered by [LIVA] and not by Salik Company PJSC. Salik
                    Company PJSC shall not be responsible for [LIVA's] actions
                    or decisions nor shall Salik Company PJSC be liable for
                    payment of claims or services under the policy contract
                    issued by [LIVA].
                  </p>
                </div>
              </div>

              <Button
                variant="primary"
                onClick={() => setInsuranceVisible(true)}
                className="w-full font-semibold py-6 rounded-md"
              >
                I Accept & Continue
              </Button>
            </div>
          </div>
        ) : (
          <InsurancePage />
        )}
      </TabsContent>
      <TabsContent value="get-warranty">
        <GetWarrantyPage />
      </TabsContent>
      <TabsContent value="roadside">
        <RoadsideAssitancePage />
      </TabsContent>
    </Tabs>
  );
};

export default Insurance;
