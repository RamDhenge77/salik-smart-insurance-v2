import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
// import Layout from "@/components/Layout";
import { useFinance } from "@/context/FinanceContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Check, Download, Home } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { useCarContext } from "@/context/Context";

const ThankYou = () => {
  const navigate = useNavigate();
  const { applicationData, resetApplication } = useFinance();
  const { handleCarFinancingBack, handleCarFinancingNext, setCarFinanceSteps } =
    useCarContext();
  useEffect(() => {
    if (!applicationData.paymentComplete) {
      navigate("/apply");
      return;
    }
  }, [applicationData, navigate]);

  const handleDownloadPDF = () => {
    // In a real app, this would generate and download a PDF of the application
    alert("PDF download functionality would be implemented here.");
  };

  const handleStartNew = () => {
    resetApplication();
    // navigate("/");
    setCarFinanceSteps(1);
  };

  // Format the date nicely
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("en-AE", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(date);
  };

  return (
    // <Layout>
      <div className="bg-finance-sand min-h-screen py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="bg-white rounded-lg shadow-lg p-8 text-center mb-8">
              <div className="h-20 w-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Check className="h-10 w-10 text-green-600" />
              </div>

              <h1 className="text-3xl font-bold text-finance-purple mb-4">
                Thank You for Your Application!
              </h1>

              <p className="text-xl text-gray-600 mb-8">
                Your car financing application has been received successfully.
              </p>

              <Card className="mb-8">
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 text-center md:text-left">
                    <div>
                      <p className="text-sm text-gray-500">
                        Application Reference
                      </p>
                      <p className="font-semibold">
                        {applicationData.applicationId}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Application Date</p>
                      <p className="font-semibold">
                        {applicationData.applicationDate
                          ? formatDate(applicationData.applicationDate)
                          : ""}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Applicant Name</p>
                      <p className="font-semibold">
                        {applicationData.personalInfo?.firstName}{" "}
                        {applicationData.personalInfo?.lastName}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Email</p>
                      <p className="font-semibold">
                        {applicationData.personalInfo?.email}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Selected Car</p>
                      <p className="font-semibold">
                        {applicationData.carInfo?.brand}{" "}
                        {applicationData.carInfo?.model} (
                        {applicationData.carInfo?.year})
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Car Price</p>
                      <p className="font-semibold">
                        AED {applicationData.carInfo?.price.toLocaleString()}
                      </p>
                    </div>
                  </div>

                  <Separator className="my-6" />

                  <div className="text-center">
                    <p className="text-sm text-gray-500 mb-2">
                      Application Status
                    </p>
                    <div className="inline-flex items-center bg-amber-100 text-amber-800 px-4 py-1 rounded-full">
                      <span className="h-2 w-2 bg-amber-500 rounded-full mr-2"></span>
                      <span className="font-medium">Under Review</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="bg-gray-50 rounded-lg p-6 mb-8">
                <h3 className="text-lg font-semibold mb-4">
                  What Happens Next?
                </h3>
                <ol className="text-left space-y-4">
                  <li className="flex">
                    <span className="h-6 w-6 rounded-full bg-finance-purple text-white flex items-center justify-center mr-2 flex-shrink-0">
                      1
                    </span>
                    <p>
                      Our finance team will review your application within 24
                      hours.
                    </p>
                  </li>
                  <li className="flex">
                    <span className="h-6 w-6 rounded-full bg-finance-purple text-white flex items-center justify-center mr-2 flex-shrink-0">
                      2
                    </span>
                    <p>
                      You will receive an email with the outcome of your
                      application.
                    </p>
                  </li>
                  <li className="flex">
                    <span className="h-6 w-6 rounded-full bg-finance-purple text-white flex items-center justify-center mr-2 flex-shrink-0">
                      3
                    </span>
                    <p>
                      If approved, a finance representative will contact you to
                      complete the process.
                    </p>
                  </li>
                </ol>
              </div>

              <div className="flex flex-col md:flex-row gap-4 justify-center">
                <Button
                  variant="secondary"
                  onClick={handleDownloadPDF}
                  className="flex items-center"
                >
                  <Download className="mr-2 h-4 w-4" />
                  Download Application PDF
                </Button>
                <Button
                  variant="primary"
                  onClick={handleStartNew}
                  className=""
                >
                  <Home className="mr-2 h-4 w-4" />
                  Return to Homepage
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    // </Layout>
  );
};

export default ThankYou;
