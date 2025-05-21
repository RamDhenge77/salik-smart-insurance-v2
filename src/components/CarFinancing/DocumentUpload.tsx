import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import Layout from '@/components/Layout';
import StepIndicator from "./StepIndicator";
import { useFinance } from "@/context/FinanceContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { File, Upload, X, Check, Loader2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useCarContext } from "@/context/Context";

const DocumentUpload = () => {
  const navigate = useNavigate();
  const { applicationData, setDocuments } = useFinance();
  const { toast } = useToast();
  const { handleCarFinancingBack, handleCarFinancingNext, setCarFinanceSteps } = useCarContext();

  const [emiratesID, setEmiratesID] = useState<File | null>(null);
  const [salaryCertificate, setSalaryCertificate] = useState<File | null>(null);
  const [carQuote, setCarQuote] = useState<File | null>(null);

  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState({
    emiratesID: 0,
    salaryCertificate: 0,
    carQuote: 0,
  });

  useEffect(() => {
    if (
      !applicationData.personalInfo ||
      !applicationData.carInfo ||
      !applicationData.financeDetails
    ) {
      // navigate("/apply");
      setCarFinanceSteps(2);
      return;
    }
  }, [applicationData, navigate]);

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "emiratesID" | "salaryCertificate" | "carQuote"
  ) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];

      // In a real app, you might want to check file size, type, etc.
      if (file.size > 5 * 1024 * 1024) {
        toast({
          variant: "destructive",
          title: "File too large",
          description: "Files must be less than 5MB.",
        });
        return;
      }

      switch (type) {
        case "emiratesID":
          setEmiratesID(file);
          break;
        case "salaryCertificate":
          setSalaryCertificate(file);
          break;
        case "carQuote":
          setCarQuote(file);
          break;
      }
    }
  };

  const removeFile = (
    type: "emiratesID" | "salaryCertificate" | "carQuote"
  ) => {
    switch (type) {
      case "emiratesID":
        setEmiratesID(null);
        break;
      case "salaryCertificate":
        setSalaryCertificate(null);
        break;
      case "carQuote":
        setCarQuote(null);
        break;
    }
  };

  const simulateUpload = (
    type: "emiratesID" | "salaryCertificate" | "carQuote"
  ) => {
    return new Promise<void>((resolve) => {
      const interval = setInterval(() => {
        setUploadProgress((prev) => {
          const newProgress = Math.min(prev[type] + 10, 100);
          const updated = { ...prev, [type]: newProgress };

          if (newProgress === 100) {
            clearInterval(interval);
            resolve();
          }

          return updated;
        });
      }, 200);
    });
  };

  const handleSubmit = async () => {
    if (!emiratesID || !salaryCertificate) {
      toast({
        variant: "destructive",
        title: "Required documents missing",
        description: "Emirates ID and Salary Certificate are required.",
      });
      return;
    }

    setUploading(true);

    try {
      // Simulate upload progress for each file
      if (emiratesID) await simulateUpload("emiratesID");
      if (salaryCertificate) await simulateUpload("salaryCertificate");
      if (carQuote) await simulateUpload("carQuote");

      // In a real app, you'd upload files to a server or storage service here

      // Save to context
      setDocuments({
        emiratesID,
        salaryCertificate,
        carQuote,
      });

      toast({
        title: "Documents uploaded successfully",
        description:
          "Your documents have been uploaded. Let's continue to payment.",
      });

      // navigate("/payment");
      handleCarFinancingNext();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Upload failed",
        description:
          "There was an error uploading your documents. Please try again.",
      });
    } finally {
      setUploading(false);
      setUploadProgress({
        emiratesID: 0,
        salaryCertificate: 0,
        carQuote: 0,
      });
    }
  };

  const steps = [
    "Personal Details",
    "Eligibility",
    "Select Car",
    "Plan",
    "Documents",
    "Payment",
  ];

  const FileUploadCard = ({
    label,
    description,
    type,
    required = false,
    file,
    progress,
  }: {
    label: string;
    description: string;
    type: "emiratesID" | "salaryCertificate" | "carQuote";
    required?: boolean;
    file: File | null;
    progress: number;
  }) => {
    const inputId = `file-${type}`;
    const isUploading = uploading && progress > 0 && progress < 100;
    const isUploaded = progress === 100;

    return (
      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-1 flex items-center">
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </h3>
          <p className="text-sm text-gray-500 mb-4">{description}</p>

          {!file ? (
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              <File className="h-8 w-8 mx-auto text-gray-400 mb-2" />
              <label htmlFor={inputId} className="cursor-pointer">
                <p className="text-sm font-medium text-finance-purple mb-1 hover:text-finance-purple-light">
                  Click to upload
                </p>
                <p className="text-xs text-gray-500">
                  PDF, JPG or PNG (max. 5MB)
                </p>
                <input
                  id={inputId}
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  className="hidden"
                  onChange={(e) => handleFileChange(e, type)}
                  disabled={uploading}
                />
              </label>
            </div>
          ) : (
            <div className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center">
                  <File className="h-5 w-5 text-gray-400 mr-2" />
                  <span className="text-sm font-medium truncate max-w-[200px]">
                    {file.name}
                  </span>
                </div>
                {!uploading && (
                  <button
                    onClick={() => removeFile(type)}
                    className="text-gray-400 hover:text-red-500"
                    disabled={uploading}
                  >
                    <X className="h-5 w-5" />
                  </button>
                )}
              </div>

              {isUploading && (
                <div className="w-full bg-gray-200 rounded-full h-2 mb-1">
                  <div
                    className="bg-btn-primary h-2 rounded-full"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              )}

              {isUploaded && (
                <div className="flex items-center text-green-500 text-sm">
                  <Check className="h-4 w-4 mr-1" />
                  <span>Upload complete</span>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    );
  };

  return (
    // <Layout>
    <div className="bg-finance-sand min-h-screen py-8">
      <div className="container mx-auto px-4">
        <StepIndicator currentStep={4} steps={steps} />

        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold text-finance-purple text-center mb-8">
            Upload Required Documents
          </h1>

          <div className="space-y-6 mb-8">
            <FileUploadCard
              label="Emirates ID"
              description="Upload a clear copy of the front and back of your Emirates ID."
              type="emiratesID"
              required
              file={emiratesID}
              progress={uploadProgress.emiratesID}
            />

            <FileUploadCard
              label="Salary Certificate"
              description="Upload your latest salary certificate or pay slip (not older than 3 months)."
              type="salaryCertificate"
              required
              file={salaryCertificate}
              progress={uploadProgress.salaryCertificate}
            />

            <FileUploadCard
              label="Car Quote / Proforma Invoice"
              description="If you already have a car quote from the dealer, please upload it."
              type="carQuote"
              file={carQuote}
              progress={uploadProgress.carQuote}
            />
          </div>

          <div className="flex justify-between gap-4">
            <Button
              variant="secondary"
              className="flex-1"
              onClick={() => handleCarFinancingBack()}
              disabled={uploading}
            >
              Back
            </Button>
            <Button
              variant="primary"
              className="flex-1"
              onClick={handleSubmit}
              disabled={uploading || !emiratesID || !salaryCertificate}
            >
              {uploading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Uploading...
                </>
              ) : (
                <>
                  Upload & Continue
                  <Upload className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
    // </Layout>
  );
};

export default DocumentUpload;
