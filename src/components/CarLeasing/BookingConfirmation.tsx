import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Check, Calendar } from "lucide-react";
import { useCarContext } from "@/context/Context";

const BookingConfirmation = () => {
    const { setCarLeasingSteps} = useCarContext();
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow bg-gray-50">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-8">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
                <Check className="h-8 w-8 text-green-600" />
              </div>
            </div>

            <h1 className="text-3xl font-bold text-center mb-2">
              Booking Confirmed!
            </h1>
            <p className="text-center text-gray-600 mb-8">
              Your car lease request has been successfully processed.
            </p>

            <div className="border rounded-md p-6 mb-8">
              <h2 className="text-lg font-semibold mb-4">Booking Details</h2>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-2">
                  <span className="text-gray-600">Booking Reference:</span>
                  <span className="font-medium">
                    DW-{Math.floor(100000 + Math.random() * 900000)}
                  </span>

                  <span className="text-gray-600">Car:</span>
                  <span className="font-medium">Renault Symbol</span>

                  <span className="text-gray-600">Lease Term:</span>
                  <span className="font-medium">6 months</span>

                  <span className="text-gray-600">Monthly Payment:</span>
                  <span className="font-medium">AED 1,600</span>

                  <span className="text-gray-600">Pickup Date:</span>
                  <span className="font-medium">
                    {new Date(
                      Date.now() + 2 * 24 * 60 * 60 * 1000
                    ).toLocaleDateString("en-US", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </span>

                  <span className="text-gray-600">Pickup Location:</span>
                  <span className="font-medium">Dubai Marina Branch</span>
                </div>
              </div>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4 mb-8">
              <h3 className="flex items-center font-medium text-yellow-800 mb-2">
                <Calendar className="h-5 w-5 mr-2" />
                Next Steps
              </h3>
              <p className="text-sm text-yellow-700">
                Please arrive at the pickup location with your original Emirates
                ID, driving license, and a copy of your booking confirmation.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row justify-center space-y-3 sm:space-y-0 sm:space-x-4 mb-4">
              <Button variant="primary" className="">
                Download Confirmation
              </Button>
              {/* <Link to="/"> */}
                <Button variant="secondary" onClick={()=>setCarLeasingSteps(1)}>Return to Home</Button>
              {/* </Link> */}
            </div>

            <p className="text-center text-sm text-gray-500">
              Questions about your booking? Contact us at
              support@dubaiwheels.com
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default BookingConfirmation;
