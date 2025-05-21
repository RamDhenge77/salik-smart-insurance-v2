import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// import Layout from '@/components/Layout';
import StepIndicator from "./StepIndicator";
import { useFinance } from "@/context/FinanceContext";
import { Button } from "@/components/ui/button";
import { Check, X } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useCarContext } from "@/context/Context";

const EligibilityCheck = () => {
  const navigate = useNavigate();
  const { applicationData } = useFinance();
  const [isEligible, setIsEligible] = useState(false);
  const [maxFinanceAmount, setMaxFinanceAmount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [score, setScore] = useState(0);
  const { handleCarFinancingNext, setCarFinanceSteps } = useCarContext();

  useEffect(() => {
    if (!applicationData.personalInfo) {
    //   navigate("/apply");
        setCarFinanceSteps(2);
      return;
    }

    // Simulate an eligibility check with the data
    const checkEligibility = () => {
      const { income } = applicationData.personalInfo;

      // Simple eligibility calculation
      // In a real app, this would likely be a backend call
      setLoading(true);

      // Simulate API call
      setTimeout(() => {
        // Basic eligibility criteria:
        // - Income above 5,000 AED
        // - Maximum finance amount = income * 36 (or a percentage based on income)
        const eligible = income >= 5000;

        // Calculate credit score (0-100)
        let calculatedScore = 0;

        if (income >= 20000) calculatedScore = 90;
        else if (income >= 15000) calculatedScore = 80;
        else if (income >= 10000) calculatedScore = 70;
        else if (income >= 7500) calculatedScore = 60;
        else if (income >= 5000) calculatedScore = 50;
        else calculatedScore = 30;

        // Calculate maximum finance amount
        // This is typically 36 times monthly income or a percentage
        const maxAmount = Math.min(income * 36, 1000000); // Cap at 1 million AED

        setIsEligible(eligible);
        setMaxFinanceAmount(maxAmount);
        setScore(calculatedScore);
        setLoading(false);
      }, 2000);
    };

    checkEligibility();
  }, [applicationData.personalInfo, navigate]);

  const handleContinue = () => {
    // navigate("/select-car");
    handleCarFinancingNext();
  };

  const handleReapply = () => {
    // navigate("/apply");
    setCarFinanceSteps(2);
  };

  const steps = [
    "Personal Details",
    "Eligibility",
    "Select Car",
    "Plan",
    "Documents",
    "Payment",
  ];

  return (
    // <Layout>
    <div className="bg-finance-sand min-h-screen py-8">
      <div className="container mx-auto px-4">
        <StepIndicator currentStep={1} steps={steps} />

        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold text-finance-purple text-center mb-8">
            Checking Your Eligibility
          </h1>

          {loading ? (
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Processing Your Application</CardTitle>
                <CardDescription>
                  Please wait while we check your eligibility.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Progress value={60} className="w-full h-2 mb-4" />
                <p className="text-center text-gray-500">
                  This will take just a moment...
                </p>
              </CardContent>
            </Card>
          ) : isEligible ? (
            <Card className="shadow-lg border-2 border-green-500">
              <CardHeader className="bg-green-50">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-2xl text-green-700">
                    Congratulations!
                  </CardTitle>
                  <div className="h-10 w-10 bg-green-100 rounded-full flex items-center justify-center">
                    <Check className="h-6 w-6 text-green-600" />
                  </div>
                </div>
                <CardDescription className="text-green-700 text-lg">
                  You're eligible for auto finance!
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="mb-6">
                  <p className="text-lg mb-2">Your Credit Score</p>
                  <div className="w-full bg-gray-200 h-4 rounded-full">
                    <div
                      className={`h-4 rounded-full ${
                        score >= 70
                          ? "bg-green-500"
                          : score >= 50
                          ? "bg-yellow-500"
                          : "bg-red-500"
                      }`}
                      style={{ width: `${score}%` }}
                    />
                  </div>
                  <div className="flex justify-between mt-1 text-sm text-gray-500">
                    <span>Poor</span>
                    <span>Fair</span>
                    <span>Good</span>
                    <span>Excellent</span>
                  </div>
                </div>

                <div className="bg-finance-sand p-6 rounded-lg mb-6">
                  <p className="text-xl mb-2">You're eligible for up to</p>
                  <p className="text-4xl font-bold text-finance-purple">
                    {new Intl.NumberFormat("en-AE", {
                      style: "currency",
                      currency: "AED",
                      maximumFractionDigits: 0,
                    }).format(maxFinanceAmount)}
                  </p>
                  <p className="text-gray-500 mt-2">in auto financing</p>
                </div>

                <p className="text-gray-600 mb-6">
                  You can now proceed to select your dream car and we'll help
                  you finance it.
                </p>

                <Button
                  variant="primary"
                  onClick={handleContinue}
                  className="w-full"
                  size="lg"
                >
                  Continue to Car Selection
                </Button>
              </CardContent>
            </Card>
          ) : (
            <Card className="shadow-lg border-2 border-red-500">
              <CardHeader className="bg-red-50">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-2xl text-red-700">
                    We're Sorry
                  </CardTitle>
                  <div className="h-10 w-10 bg-red-100 rounded-full flex items-center justify-center">
                    <X className="h-6 w-6 text-red-600" />
                  </div>
                </div>
                <CardDescription className="text-red-700 text-lg">
                  You're not eligible for auto finance at this time
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="mb-6">
                  <p className="text-lg mb-2">Your Credit Score</p>
                  <div className="w-full bg-gray-200 h-4 rounded-full">
                    <div
                      className="h-4 rounded-full bg-red-500"
                      style={{ width: `${score}%` }}
                    />
                  </div>
                  <div className="flex justify-between mt-1 text-sm text-gray-500">
                    <span>Poor</span>
                    <span>Fair</span>
                    <span>Good</span>
                    <span>Excellent</span>
                  </div>
                </div>

                <div className="bg-red-50 p-6 rounded-lg mb-6 border border-red-200">
                  <p className="text-xl mb-2 text-red-700">
                    Common reasons for ineligibility:
                  </p>
                  <ul className="list-disc pl-5 text-gray-700">
                    <li>Monthly income below our minimum threshold</li>
                    <li>Recent employment changes</li>
                    <li>Existing financial commitments</li>
                  </ul>
                </div>

                <p className="text-gray-600 mb-6">
                  You can modify your application details and try again, or
                  contact our support team for assistance.
                </p>

                <Button
                  onClick={handleReapply}
                  className="w-full bg-finance-purple hover:bg-finance-purple-light"
                  size="lg"
                >
                  Update Application
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
    // </Layout>
  );
};

export default EligibilityCheck;
