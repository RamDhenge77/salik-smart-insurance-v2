import React, { useEffect, useState } from "react";
import { toast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface GooglePlacesScriptProps {
  onLoad?: () => void;
}

const GooglePlacesScript: React.FC<GooglePlacesScriptProps> = ({ onLoad }) => {
  const [apiKey, setApiKey] = useState<string | null>(
    localStorage.getItem("google_maps_api_key") ||
      "AIzaSyA-dummykey-fordemopurposes-only"
  );
  const [showKeyPrompt, setShowKeyPrompt] = useState(!apiKey);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (apiKey) {
      setIsLoading(true);

      // Check if script already exists
      const existingScript = document.getElementById("google-maps-script");
      if (existingScript) {
        // If script already exists and is loaded, just trigger onLoad
        if (window.google && window.google.maps) {
          if (onLoad) onLoad();
          setIsLoading(false);
        }
        return;
      }

      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
      script.async = true;
      script.defer = true;
      script.id = "google-maps-script";

      script.onload = () => {
        setIsLoading(false);
        if (onLoad) onLoad();
      };

      script.onerror = () => {
        setIsLoading(false);
        toast({
          title: "API Key Error",
          description:
            "There was an issue with your Google Maps API key. Please check it and try again.",
          variant: "destructive",
        });
        // For demo purposes, we'll continue with demo mode instead of removing the key
        if (onLoad) onLoad();
      };

      document.head.appendChild(script);

      // Fallback timeout in case the script never loads or errors
      const timeout = setTimeout(() => {
        if (isLoading) {
          setIsLoading(false);
          if (onLoad) onLoad();
        }
      }, 5000);

      return () => clearTimeout(timeout);
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
          <h2 className="text-xl font-bold mb-4 text-salik-gray-700">
            Google Maps API Key Required
          </h2>
          <p className="mb-4 text-salik-gray-600">
            For demo purposes, a placeholder key will be used. You can also
            enter your own Google Maps API key with Places API enabled:
          </p>
          <form onSubmit={handleSubmitApiKey}>
            <Input
              name="apiKey"
              className="w-full mb-4"
              placeholder="Enter your API key"
            />
            <div className="flex space-x-3">
              <Button
                type="submit"
                variant="primary"
                className="flex-1 bg-salik-gray-600 hover:bg-salik-gray-700 text-white"
              >
                Save API Key
              </Button>
              <Button
                type="button"
                variant="outline"
                className="flex-1"
                onClick={() => {
                  setShowKeyPrompt(false);
                  // Use demo key
                  const demoKey = "AIzaSyA-dummykey-fordemopurposes-only";
                  localStorage.setItem("google_maps_api_key", demoKey);
                  setApiKey(demoKey);
                }}
              >
                Use Demo Mode
              </Button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  return isLoading ? (
    <div className="flex justify-center items-center py-4">
      <div className="w-6 h-6 border-2 border-salik-gray-500 border-t-transparent rounded-full animate-spin"></div>
      <span className="ml-2 text-salik-gray-600">Loading maps...</span>
    </div>
  ) : null;
};

export default GooglePlacesScript;
