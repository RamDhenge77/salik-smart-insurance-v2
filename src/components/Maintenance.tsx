import React from "react";
import { Button } from "./ui/button";
import { ArrowRight, Car } from "lucide-react";
import Services from "./Services";

const Maintenance = () => {
  const [renderServices, setRenderServices] = React.useState(false);
  return (
    <div>
      {!renderServices ? (
        <>
          <section className="bg-[#F0F8FA] text-gray-800 py-24 px-4">
            <div className="container mx-auto px-4">
              <div className="flex flex-col lg:flex-row items-center justify-between">
                <div className="mb-10 lg:mb-0 lg:w-1/2">
                  <h1 className="text-4xl md:text-5xl font-bold mb-6">
                    Your Car Deserves Premium Care
                  </h1>
                  <p className="text-lg mb-8 text-gray-700">
                    Experience hassle-free car services with our premium
                    offerings. From routine maintenance to specialized care,
                    we've got you covered.
                  </p>
                  <Button
                    variant="primary"
                    className="px-8 py-6 text-lg rounded-md"
                    onClick={() => setRenderServices(true)}
                  >
                    Explore Our Services <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </div>
                <div className="lg:w-1/2 flex justify-center">
                  <div className="relative w-full max-w-md">
                    <img
                      src="/lovable-uploads/services.png"
                      alt="Car Service Preview"
                      className="rounded-lg shadow-xl"
                    />
                    <div className="absolute -bottom-6 -right-6 bg-white text-gray-700 rounded-lg p-4 shadow-lg">
                      <span className="font-bold">Premium Service</span>
                      <div className="text-sm text-gray-500">
                        Quality Guaranteed
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="bg-salik-dark text-white py-16">
            <div className="container mx-auto px-4">
              <div className="flex flex-col md:flex-row items-center justify-between">
                <div className="mb-6 md:mb-0">
                  <h2 className="text-2xl font-bold mb-2">
                    Ready to experience premium car care?
                  </h2>
                  <p className="text-gray-300">
                    Book your service today and enjoy the difference
                  </p>
                </div>
                <Button
                variant="primary"
                  className="px-8 py-6"
                  onClick={() => setRenderServices(true)}
                >
                  Book Now <Car className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </section>
        </>
      ) : (
        <Services />
      )}
    </div>
  );
};

export default Maintenance;
