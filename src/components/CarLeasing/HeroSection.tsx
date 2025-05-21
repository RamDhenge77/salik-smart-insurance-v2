import { useCarContext } from "@/context/Context";
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";

const HeroSection = () => {
   const { setCarLeasingSteps } = useCarContext();
  return (
    <div className="relative bg-black text-white">
      <div className="absolute inset-0 bg-[url('/lovable-uploads/premium-cars.webp')] bg-cover bg-center opacity-50"></div>
      <div className="container mx-auto px-4 py-24 relative z-10">
        <div className="max-w-3xl px-5">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Premium Car Leasing in <span className="text-gold">Dubai</span>
          </h1>
          <p className="text-lg md:text-xl mb-8">
            Choose from our wide range of luxury, economy, and family cars with
            flexible leasing terms. Experience hassle-free driving with included
            maintenance and insurance options.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              onClick={() => {
                setCarLeasingSteps(2);
                window.scrollTo({ top: 400, behavior: "smooth" });
              }}
              variant="primary"
              className="h-[3.4rem] font-bold py-3 px-8 rounded-md transition-colors text-center"
            >
              Browse Cars
            </Button>
            <Button
              className="h-[3.4rem] bg-transparent border-2 border-white hover:border-gold hover:text-gold text-white font-bold py-3 px-8 rounded-md transition-colors text-center"
            >
              Contact Us
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
