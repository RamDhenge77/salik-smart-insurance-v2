import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { TripData, TripDataAll } from "@/components/FileUploader";
import { toast } from "@/hooks/use-toast";
import axios from "axios";

// Define the shape of the context
interface CarContextType {
  currentStep: number;
  setCurrentStep: (step: number) => void;
  checkoutSteps: number;
  setCheckoutSteps: (steps: number) => void;
  roadsideAssistance: number;
  setRoadsideAssistance: (assistance: any) => void;
  showContent: boolean;
  setShowContent: (show: boolean) => void;
  tripData: TripData[];
  setTripData: (data: TripData[]) => void;
  uploadKey: number;
  setUploadKey: (key: number) => void;
  handleFileProcessed: (data: TripData[]) => void;
  registrationSteps: number;
  setRegistrationSteps: (steps: number) => void;
  carLeasingSteps: number;
  setCarLeasingSteps: (steps: number) => void;
  carLeasingId: string;
  setCarLeasingId: (id: string) => void;
  handleCarLeasingBack: () => void;
  carFinanceSteps: number;
  setCarFinanceSteps: (steps: number) => void;
  handleCarFinancingBack: () => void;
  handleCarFinancingNext: () => void;
  followUp: () => Promise<void>;
  analysis: any;
  setAnalysis: (analysis: any) => void;
  timeDistance: any;
  setTimeDistance: (timeDistance: any) => void;
  highwayUrban: any;
  setHighwayUrban: (highwayUrban: any) => void;
  peakHours: any;
  setPeakHours: (peakHours: any) => void;
  speepDistance: any;
  setSpeedDistance: (speedDistance: any) => void;
  tripDataAll: TripDataAll[];
  setTripDataAll: (data: TripDataAll[]) => void;
  speedData: any;
  setSpeedData: (data: any) => void;
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
}

// Create the context with a default (empty) value
const CarContext = createContext<CarContextType | undefined>(undefined);

// Define the provider's props
interface CarProviderProps {
  children: ReactNode;
}

export const CarContextProvider: React.FC<CarProviderProps> = ({
  children,
}) => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [checkoutSteps, setCheckoutSteps] = useState<number>(1);
  const [roadsideAssistance, setRoadsideAssistance] = useState<any>(1);
  const [showContent, setShowContent] = useState(false);
  const [tripData, setTripData] = useState<TripData[]>([]);
  const [uploadKey, setUploadKey] = useState(Date.now());
  const [registrationSteps, setRegistrationSteps] = useState<number>(1);
  const [carLeasingSteps, setCarLeasingSteps] = useState<number>(1);
  const [carLeasingId, setCarLeasingId] = useState<string>("");
  const [carFinanceSteps, setCarFinanceSteps] = useState<number>(1);
  const [analysis, setAnalysis] = useState<any>(null);
  const [timeDistance, setTimeDistance] = useState<any>(null);
  const [highwayUrban, setHighwayUrban] = useState<any>(null);
  const [peakHours, setPeakHours] = useState<any>(null);
  const [speepDistance, setSpeedDistance] = useState<any>(null);
  const [tripDataAll, setTripDataAll] = useState<TripDataAll[]>([]);
  const [speedData, setSpeedData] = useState<any>(null);
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    if (tripData.length > 0) {
      setAnalysis(JSON.parse(localStorage.getItem("analysis")));
      setTimeDistance(
        JSON.parse(localStorage.getItem("time_and_distance_saved"))
      );
      setHighwayUrban(JSON.parse(localStorage.getItem("highwayurban")));
      setPeakHours(JSON.parse(localStorage.getItem("peak_hours")));
      setSpeedDistance(JSON.parse(localStorage.getItem("speed_and_dstances")));
      setTripDataAll(JSON.parse(localStorage.getItem("tripDataAll")));
      setSpeedData(JSON.parse(localStorage.getItem("speed")));
    }
  }, [tripData]);

  const handleCarLeasingBack = () => {
    setCarLeasingSteps((prev) => prev - 1);
  };

  const handleFileProcessed = (data: TripData[]) => {
    console.log("File processed with data:", data);

    // Ensure we have data
    if (!data || data.length === 0) {
      toast({
        title: "Processing Error",
        description: "No data could be extracted from the uploaded file.",
        variant: "destructive",
      });
      return;
    }

    // setTripData([]);
    setUploadKey(Date.now());

    // Delay to allow UI to refresh
    setTimeout(() => {
      setTripData(data);
      setShowContent(true);

      // Store in localStorage for persistence
      try {
        localStorage.setItem("tripData", JSON.stringify(data));
      } catch (error) {
        console.error("Failed to save trip data to localStorage:", error);
      }

      toast({
        title: "Analysis Complete",
        description: `Analyzed ${data.length} trips from your statement.`,
      });
    }, 300);
  };

  const handleCarFinancingBack = () => {
    setCarFinanceSteps((prev) => prev - 1);
  };

  const handleCarFinancingNext = () => {
    setCarFinanceSteps((prev) => prev + 1);
  };

  const followUp = async () => {
    const apiKey = import.meta.env.VITE_INSURANCE_API_KEY;

    if (!apiKey) {
      console.error("API key is missing.");
      toast({
        title: "API key is missing.",
        variant: "destructive",
      });
      return;
    }

    try {
      const response = await axios.post(
        "https://polished-snipe-rapidly.ngrok-free.app/api/v1/bot/follow-up-call",
        null,
        {
          headers: {
            "x-api-key": apiKey,
          },
        }
      );

      console.log("Response:", response.data);
    } catch (error) {
      if (error.response) {
        console.error("Error:", error.response.status, error.response.data);
      } else {
        console.error("Request error:", error.message);
      }
    }
  };

  return (
    <CarContext.Provider
      value={{
        currentStep,
        setCurrentStep,
        checkoutSteps,
        setCheckoutSteps,
        roadsideAssistance,
        setRoadsideAssistance,
        showContent,
        setShowContent,
        tripData,
        setTripData,
        uploadKey,
        setUploadKey,
        handleFileProcessed,
        registrationSteps,
        setRegistrationSteps,
        carLeasingSteps,
        setCarLeasingSteps,
        carLeasingId,
        setCarLeasingId,
        handleCarLeasingBack,
        carFinanceSteps,
        setCarFinanceSteps,
        handleCarFinancingBack,
        handleCarFinancingNext,
        followUp,
        analysis,
        setAnalysis,
        timeDistance,
        setTimeDistance,
        highwayUrban,
        setHighwayUrban,
        peakHours,
        setPeakHours,
        speepDistance,
        setSpeedDistance,
        tripDataAll,
        setTripDataAll,
        speedData,
        setSpeedData,
        collapsed,
        setCollapsed,
      }}
    >
      {children}
    </CarContext.Provider>
  );
};

// Create a custom hook with error handling
export const useCarContext = (): CarContextType => {
  const context = useContext(CarContext);
  if (!context) {
    throw new Error("useCar must be used within a CarProvider");
  }
  return context;
};
