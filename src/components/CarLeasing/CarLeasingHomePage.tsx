import React from "react";
import HeroSection from "./HeroSection";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Car, Shield, Wrench, Gauge, Calendar } from "lucide-react";
import { useCarContext } from "@/context/Context";

const CarLeasingHomePage = () => {
  const features = [
    {
      icon: <Car className="h-10 w-10 text-primary" />,
      title: "Wide Selection",
      description:
        "Choose from a variety of cars, from economy to luxury, to fit your needs and budget.",
    },
    {
      icon: <Shield className="h-10 w-10 text-primary" />,
      title: "Comprehensive Insurance",
      description:
        "Optional full coverage insurance for peace of mind throughout your lease period.",
    },
    {
      icon: <Wrench className="h-10 w-10 text-primary" />,
      title: "Maintenance Included",
      description:
        "Optional maintenance package covering regular servicing and repairs.",
    },
    {
      icon: <Gauge className="h-10 w-10 text-primary" />,
      title: "Flexible Mileage",
      description:
        "Select a monthly mileage cap that matches your driving habits.",
    },
    {
      icon: <Calendar className="h-10 w-10 text-primary" />,
      title: "Flexible Lease Terms",
      description:
        "Choose from various lease terms, from 3 months to 24 months.",
    },
  ];

  const { setCarLeasingSteps, setCarLeasingId } = useCarContext();

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow">
        <HeroSection />

        {/* Features Section */}
        <section className="py-16 bg-bgLight">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">
              Why Choose <span className="text-btn-primary">Dubai</span>Wheels?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
                >
                  <div className="mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-semibold mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-4">
              How It Works
            </h2>
            <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">
              Leasing a car with DubaiWheels is simple and straightforward.
              Follow these easy steps to get on the road quickly.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-bgLight rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-xl font-bold text-primary">1</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Choose Your Car</h3>
                <p className="text-gray-600">
                  Browse our fleet and select the perfect car that matches your
                  requirements and budget.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-bgLight rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-xl font-bold text-primary">2</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Submit Documents</h3>
                <p className="text-gray-600">
                  Upload your Emirates ID, driving license, and proof of salary
                  for verification.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-bgLight rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-xl font-bold text-primary">3</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Drive Away</h3>
                <p className="text-gray-600">
                  Once approved, pick up your car and enjoy the freedom of the
                  road.
                </p>
              </div>
            </div>

            <div className="text-center mt-12">
              {/* <Link to="/cars"> */}
              <Button
                variant="primary"
                className="px-8 py-6 text-lg"
                onClick={() => {
                  setCarLeasingSteps(2);
                  window.scrollTo({ top: 400, behavior: "smooth" });
                }}
              >
                Start Browsing Cars
              </Button>
              {/* </Link> */}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-[#2596be] py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to Drive in Dubai?
            </h2>
            <p className="text-white/80 mb-8 max-w-2xl mx-auto">
              Experience the freedom of driving in Dubai without the commitment
              of buying. Our flexible lease terms start from just 3 months.
            </p>
            {/* <Link to="/booking"> */}
            <Button
              variant="primary"
              className="px-8 py-6 text-lg"
              onClick={() => {
                setCarLeasingSteps(4);
                setCarLeasingId("");
              }}
            >
              Book Your Car Now
            </Button>
            {/* </Link> */}
          </div>
        </section>
      </main>
    </div>
  );
};

export default CarLeasingHomePage;
