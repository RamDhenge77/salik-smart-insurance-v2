import React, { useEffect } from "react";
import FileUploader, { TripData } from "../FileUploader";
import { FileText, BarChart3, Calculator } from "lucide-react";
import { Card } from "../ui/card";
import { useCarContext } from "@/context/Context";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const { handleFileProcessed: onFileProcessed, showContent } = useCarContext();
  const navigate = useNavigate();
  useEffect(() => {
    if (showContent) {
      navigate("/dashboard");
    }
  }, [showContent]);

  const FullscreenVideo = () => {
    return (
      <div className="w-full h-full aspect-video">
        <iframe
          className="w-full h-full"
          src="https://www.youtube.com/embed/iFIp2ltjAW4?autoplay=1&controls=0&loop=1&playlist=iFIp2ltjAW4&modestbranding=1&rel=0"
          title="YouTube video player"
          frameBorder="0"
          allow="autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
    );
  };

  return (
    <div className="w-full flex flex-col">
      {/* Centered Title Section */}
      <div className="text-center pt-0 pb-8">
        <p className="text-gray-600 max-w-3xl mx-auto">
          AI powered super app for super savings
        </p>
      </div>

      {/* Main content with full-width image and upload panel */}
      <div className="relative flex w-full h-[calc(100vh-13rem)]">
        {/* Full-width background image of toll gate */}
        {/* <img
          src="/lovable-uploads/71b0a736-fc23-4a17-8575-c55ec8908dfa.png"
          alt="Dubai highway with Salik toll gate"
          className="w-full h-full object-cover"
        /> */}

        <div className="w-full h-full">
          <FullscreenVideo />
        </div>

        {/* <video
          autoPlay
          muted
          loop
          playsInline
          controls={false}
          className="h-[32rem] w-[80%] object-cover"
        >
          <source
            src="https://public-content-dp.s3.us-east-2.amazonaws.com/Salik+Promo+3+Aura+Technologies+Ltd's+Video+-+May+1%2C+2025-VEED.mp4"
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video> */}

        {/* Upload panel with Salik theme - adjusted positioning and background opacity */}
        <div
          className="top-0 right-0 bottom-0 w-full p-8 flex flex-col"
          style={{
            backgroundColor: "rgba(40, 45, 55, 0.95)",
            // transform: "translateX(-60px)",
          }}
        >
          <h3 className="text-xl font-medium mb-4 text-white">
            Upload Your Salik Report
          </h3>
          <p className="text-sm text-gray-300 mb-6">
            We'll analyze your driving behavior and recommend optimal insurance
            adjustments.
          </p>

          <div className="flex-grow flex flex-col justify-center">
            <FileUploader onFileProcessed={onFileProcessed} />
          </div>
        </div>
      </div>

      {/* Three Info Components Section */}
      <div className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Upload Component */}
            <InfoCard
              icon={<FileText size={32} className="text-[#2596be]" />}
              title="Upload Salik Report"
              description="Your Salik toll statement with trip details"
              bgColor="bg-[#e8f7fb]"
            />

            {/* Analysis Component */}
            <InfoCard
              icon={<BarChart3 size={32} className="text-[#2596be]" />}
              title="Analyze Driving Behavior"
              description="AI-powered analysis of your driving patterns"
              bgColor="bg-[#e8f7fb]"
            />

            {/* Premium Component */}
            <InfoCard
              icon={<Calculator size={32} className="text-[#2596be]" />}
              title="Access a wide range for services"
              description="Personalized insurance adjustment based on your driving"
              bgColor="bg-[#e8f7fb]"
            />
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="py-6 text-center text-gray-500 text-sm bg-white border-t border-gray-200">
        © 2025 Salik Smart Insurance. All rights reserved.
      </footer>
    </div>
  );
};

// New InfoCard component to display each of the three info blocks
const InfoCard: React.FC<{
  icon: React.ReactNode;
  title: string;
  description: string;
  bgColor: string;
}> = ({ icon, title, description, bgColor }) => {
  return (
    <Card className="p-6 flex flex-col items-center text-center hover:shadow-lg transition-shadow duration-300 bg-white border border-gray-100">
      <div
        className={`w-16 h-16 rounded-full ${bgColor} flex items-center justify-center mb-6`}
      >
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-3 text-gray-700">{title}</h3>
      <p className="text-gray-500">{description}</p>
    </Card>
  );
};

export default LandingPage;
