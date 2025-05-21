import React, { useEffect, useState } from "react";
import { toast } from "@/hooks/use-toast";
import { Button } from "./ui/button";

interface GooglePlacesScriptProps {
  onLoad?: () => void;
}

const GooglePlacesScript: React.FC<GooglePlacesScriptProps> = ({ onLoad }) => {
  const [apiKey, setApiKey] = useState<string | null>(
    localStorage.getItem("google_maps_api_key")
  );
  const [showKeyPrompt, setShowKeyPrompt] = useState(!apiKey);

  useEffect(() => {
    if (apiKey) {
      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
      script.async = true;
      script.defer = true;
      script.id = "google-maps-script";

      script.onload = () => {
        if (onLoad) onLoad();
      };

      script.onerror = () => {
        toast({
          title: "API Key Error",
          description:
            "There was an issue with your Google Maps API key. Please check it and try again.",
          variant: "destructive",
        });
        localStorage.removeItem("google_maps_api_key");
        setApiKey(null);
        setShowKeyPrompt(true);
      };

      // Check if script already exists
      if (!document.getElementById("google-maps-script")) {
        document.head.appendChild(script);
      }
    }
  }, [apiKey, onLoad]);

  const handleSubmitApiKey = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const key = formData.get("apiKey") as string;

    if (key) {
      localStorage.setItem("google_maps_api_key", key);
      setApiKey(key);
      setShowKeyPrompt(false);
      toast({
        title: "API Key Saved",
        description: "Your Google Maps API key has been saved.",
      });
    }
  };

  if (showKeyPrompt) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg p-6 max-w-md w-full">
          <h2 className="text-xl font-bold mb-4">
            Google Maps API Key Required
          </h2>
          <p className="mb-4">
            Please enter your Google Maps API key with Places API enabled:
          </p>
          <form onSubmit={handleSubmitApiKey}>
            <input
              name="apiKey"
              className="w-full p-2 border border-gray-300 rounded mb-4"
              placeholder="Enter your API key"
              required
            />
            <Button
              variant="primary"
              type="submit"
              className="w-full py-2 rounded font-medium"
            >
              Save API Key
            </Button>
          </form>
        </div>
      </div>
    );
  }

  return null;
};

export default GooglePlacesScript;
