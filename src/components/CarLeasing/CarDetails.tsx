import React from "react";
import { useParams, Link } from "react-router-dom";
import { carLeasingData } from "@/data/car";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Check } from "lucide-react";
import { useCarContext } from "@/context/Context";

const CarDetails = () => {
  //   const { id } = useParams<{ id: string }>();
  const {
    carLeasingId: id,
    handleCarLeasingBack,
    setCarLeasingSteps,
  } = useCarContext();
  const toast = useToast();
  const car = carLeasingData.find((c) => c.id === id);

  if (!car) {
    return (
      <div className="min-h-screen flex flex-col">
        <main className="flex-grow container mx-auto px-4 py-8">
          <div className="text-center py-16">
            <h1 className="text-3xl font-bold mb-4">Car Not Found</h1>
            <p className="mb-8">We couldn't find the car you're looking for.</p>
            {/* <Link to="/cars"> */}
            <Button
              className="bg-primary hover:bg-primary-dark"
              onClick={() => handleCarLeasingBack()}
            >
              Back
            </Button>
            {/* </Link> */}
          </div>
        </main>
      </div>
    );
  }

  const handleAddToBooking = () => {
    toast.toast({
      title: "Car Selected",
      description: `${car.brand} ${car.model} has been added to your booking.`,
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-4">
            <div
              className="text-primary hover:underline cursor-pointer"
              onClick={() => handleCarLeasingBack()}
            >
              &larr; Back
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="grid md:grid-cols-2 gap-8 p-6">
              <div>
                <div className="bg-gray-100 rounded-lg h-80 mb-4 overflow-hidden">
                  <img
                    src={car.image}
                    alt={`${car.brand} ${car.model}`}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="grid grid-cols-4 gap-2">
                  {[1, 2, 3, 4].map((item) => (
                    <div key={item} className="bg-gray-100 h-20 rounded">
                      <img
                        src={car.image}
                        alt={`${car.brand} ${car.model} view ${item}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h1 className="text-3xl font-bold mb-2">
                  {car.brand} {car.model}
                </h1>
                <p className="text-gray-600 mb-4">
                  {car.year} · {car.engineSize} · {car.transmission}
                </p>

                <div className="flex items-center mb-6">
                  <span className="text-3xl font-bold text-primary">
                    AED {car.monthlyPrice}
                  </span>
                  <span className="text-gray-500 ml-2">/ month</span>
                </div>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Features</h3>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {car.features.map((feature, index) => (
                        <li key={index} className="flex items-center">
                          <Check className="h-5 w-5 text-primary mr-2" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-2">Description</h3>
                    <p className="text-gray-700">
                      Experience the comfort and style of the {car.year}{" "}
                      {car.brand} {car.model}. This {car.type} vehicle offers
                      excellent performance, fuel efficiency, and a comfortable
                      ride, making it perfect for both city driving and longer
                      journeys.
                    </p>
                  </div>

                  <div className="pt-4">
                    {/* <Link to={`/booking?carId=${car.id}`}> */}
                    <Button
                      variant="primary"
                      className="w-full"
                      onClick={() => {
                        setCarLeasingSteps(4);
                      }}
                    >
                      Book This Car
                    </Button>
                    {/* </Link> */}
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t p-6">
              <h3 className="text-lg font-semibold mb-4">
                Leasing Information
              </h3>

              <div className="grid md:grid-cols-3 gap-6">
                <div className="border rounded-lg p-4">
                  <h4 className="font-semibold mb-2">What's Included</h4>
                  <ul className="space-y-2">
                    <li className="flex items-center">
                      <Check className="h-5 w-5 text-green-500 mr-2" />
                      <span>Registration</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="h-5 w-5 text-green-500 mr-2" />
                      <span>24/7 Roadside Assistance</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="h-5 w-5 text-green-500 mr-2" />
                      <span>Replacement Car</span>
                    </li>
                  </ul>
                </div>

                <div className="border rounded-lg p-4">
                  <h4 className="font-semibold mb-2">Lease Terms</h4>
                  <ul className="space-y-2">
                    <li>Minimum lease: 3 months</li>
                    <li>Security deposit: AED {car.monthlyPrice}</li>
                    <li>Driver age: 21+ years</li>
                    <li>Valid UAE driving license</li>
                  </ul>
                </div>

                <div className="border rounded-lg p-4">
                  <h4 className="font-semibold mb-2">Additional Options</h4>
                  <ul className="space-y-2">
                    <li>Insurance: AED 300/month</li>
                    <li>Maintenance: AED 200/month</li>
                    <li>Additional driver: AED 100/month</li>
                    <li>Child seat: AED 50/month</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CarDetails;
