import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// import Layout from '@/components/Layout';
import StepIndicator from "./StepIndicator";
import { useFinance } from "@/context/FinanceContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { CarFront, DollarSign, Receipt } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useCarContext } from "@/context/Context";

const PlanSummary = () => {
  const navigate = useNavigate();
  const { applicationData, setFinanceDetails, calculateEMI } = useFinance();
  const [downPaymentPercent, setDownPaymentPercent] = useState(20);
  const [term, setTerm] = useState(60); // 60 months (5 years)
  const [profitRate, setProfitRate] = useState(5); // 5% profit rate
  const { toast } = useToast();
  const { handleCarFinancingBack, handleCarFinancingNext, setCarFinanceSteps } = useCarContext();

  // Derived values
  const [carPrice, setCarPrice] = useState(0);
  const [downPayment, setDownPayment] = useState(0);
  const [financeAmount, setFinanceAmount] = useState(0);
  const [monthlyEMI, setMonthlyEMI] = useState(0);
  const [totalPayment, setTotalPayment] = useState(0);

  useEffect(() => {
    if (!applicationData.personalInfo || !applicationData.carInfo) {
      // navigate("/apply");
      setCarFinanceSteps(2);
      return;
    }

    setCarPrice(applicationData.carInfo.price);
  }, [applicationData.personalInfo, applicationData.carInfo, navigate]);

  useEffect(() => {
    // Calculate financial details
    const downPaymentAmount = carPrice * (downPaymentPercent / 100);
    const financeAmt = carPrice - downPaymentAmount;
    const emi = calculateEMI(financeAmt, profitRate, term);
    const total = emi * term;

    setDownPayment(downPaymentAmount);
    setFinanceAmount(financeAmt);
    setMonthlyEMI(emi);
    setTotalPayment(total);
  }, [carPrice, downPaymentPercent, term, profitRate, calculateEMI]);

  const handleContinue = () => {
    // Save the finance details to context
    setFinanceDetails({
      downPayment,
      financeAmount,
      term,
      monthlyEMI,
      profitRate,
    });

    toast({
      title: "Finance plan confirmed",
      description:
        "Your finance plan has been saved. Let's continue to the next step.",
    });

    // navigate("/document-upload");
    handleCarFinancingNext();
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-AE", {
      style: "currency",
      currency: "AED",
      maximumFractionDigits: 0,
    }).format(amount);
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
        <StepIndicator currentStep={3} steps={steps} />

        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-finance-purple text-center mb-8">
            Your Finance Plan
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {/* Car Details */}
            <Card className="md:col-span-1">
              <CardContent className="p-6">
                <div className="flex items-center justify-center mb-4">
                  <div className="h-16 w-16 bg-finance-purple-light/20 rounded-full flex items-center justify-center">
                    <CarFront className="h-8 w-8 text-finance-purple" />
                  </div>
                </div>
                <h2 className="text-xl font-semibold text-center mb-4">
                  Selected Car
                </h2>
                <div className="text-center mb-4">
                  <p className="text-2xl font-bold text-finance-purple">
                    {applicationData.carInfo?.brand}{" "}
                    {applicationData.carInfo?.model}
                  </p>
                  <p className="text-gray-500">
                    {applicationData.carInfo?.year}
                  </p>
                </div>
                <p className="text-center text-2xl font-bold">
                  {formatCurrency(carPrice)}
                </p>
              </CardContent>
            </Card>

            {/* Finance Details */}
            <Card className="md:col-span-2">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">Finance Details</h2>

                {/* Down Payment Slider */}
                <div className="mb-6">
                  <div className="flex justify-between mb-2">
                    <label className="text-sm font-medium">
                      Down Payment ({downPaymentPercent}%)
                    </label>
                    <span className="text-sm font-bold">
                      {formatCurrency(downPayment)}
                    </span>
                  </div>
                  <Slider
                    value={[downPaymentPercent]}
                    min={10}
                    max={50}
                    step={5}
                    onValueChange={([value]) => setDownPaymentPercent(value)}
                  />
                  <div className="flex justify-between mt-1">
                    <span className="text-xs text-gray-500">10%</span>
                    <span className="text-xs text-gray-500">50%</span>
                  </div>
                </div>

                {/* Term Slider */}
                <div className="mb-6">
                  <div className="flex justify-between mb-2">
                    <label className="text-sm font-medium">
                      Loan Term ({term} months)
                    </label>
                    <span className="text-sm font-bold">{term / 12} years</span>
                  </div>
                  <Slider
                    value={[term]}
                    min={12}
                    max={84}
                    step={12}
                    onValueChange={([value]) => setTerm(value)}
                  />
                  <div className="flex justify-between mt-1">
                    <span className="text-xs text-gray-500">1 year</span>
                    <span className="text-xs text-gray-500">7 years</span>
                  </div>
                </div>

                {/* Profit Rate Slider */}
                <div className="mb-6">
                  <div className="flex justify-between mb-2">
                    <label className="text-sm font-medium">Profit Rate</label>
                    <span className="text-sm font-bold">{profitRate}%</span>
                  </div>
                  <Slider
                    value={[profitRate]}
                    min={1.89}
                    max={10}
                    step={0.01}
                    onValueChange={([value]) => setProfitRate(value)}
                  />
                  <div className="flex justify-between mt-1">
                    <span className="text-xs text-gray-500">1.89%</span>
                    <span className="text-xs text-gray-500">10%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Summary Box */}
          <Card className="shadow-lg border-2 border-finance-purple mb-8">
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-6 text-center">
                Payment Summary
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Car Price:</span>
                  <span className="font-semibold">
                    {formatCurrency(carPrice)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Down Payment:</span>
                  <span className="font-semibold">
                    {formatCurrency(downPayment)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Finance Amount:</span>
                  <span className="font-semibold">
                    {formatCurrency(financeAmount)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Loan Term:</span>
                  <span className="font-semibold">{term} months</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Profit Rate:</span>
                  <span className="font-semibold">{profitRate}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Interest:</span>
                  <span className="font-semibold">
                    {formatCurrency(totalPayment - financeAmount)}
                  </span>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-gray-600">Monthly Payment</p>
                    <p className="text-3xl font-bold text-finance-purple">
                      {formatCurrency(monthlyEMI)}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-600">Total Payment</p>
                    <p className="text-xl font-semibold">
                      {formatCurrency(totalPayment + downPayment)}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-between gap-4">
            <Button
              variant="secondary"
              className="flex-1"
              onClick={() => handleCarFinancingBack()}
            >
              Back to Car Selection
            </Button>
            <Button
              variant="primary"
              className="flex-1"
              onClick={handleContinue}
            >
              Confirm Plan & Continue
            </Button>
          </div>
        </div>
      </div>
    </div>
    // </Layout>
  );
};

export default PlanSummary;
