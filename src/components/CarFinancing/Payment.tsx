import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import Layout from '@/components/Layout';
import StepIndicator from "./StepIndicator";
import { useFinance } from "@/context/FinanceContext";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import {
  Lock,
  CreditCard,
  WalletIcon,
  Check,
  ArrowRight,
  Loader2,
} from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useCarContext } from "@/context/Context";

const Payment = () => {
  const navigate = useNavigate();
  const { applicationData, setPaymentComplete } = useFinance();
  const { toast } = useToast();
  const { handleCarFinancingBack, handleCarFinancingNext, setCarFinanceSteps } =
    useCarContext();

  const [paymentMethod, setPaymentMethod] = useState("card");
  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [processing, setProcessing] = useState(false);

  const processingFee = 1000; // AED 1,000 processing fee

  useEffect(() => {
    if (
      !applicationData.personalInfo ||
      !applicationData.carInfo ||
      !applicationData.financeDetails ||
      !applicationData.documents
    ) {
    //   navigate("/apply");
        setCarFinanceSteps(2);
      return;
    }
  }, [applicationData, navigate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    if (paymentMethod === "card") {
      if (!cardNumber || !cardName || !expiryDate || !cvv) {
        toast({
          variant: "destructive",
          title: "Missing information",
          description: "Please fill in all card details.",
        });
        return;
      }

      // Very basic card number validation
      if (cardNumber.replace(/\s+/g, "").length !== 16) {
        toast({
          variant: "destructive",
          title: "Invalid card number",
          description: "Please enter a valid 16-digit card number.",
        });
        return;
      }
    }

    // Process payment
    setProcessing(true);

    // Simulate payment processing
    setTimeout(() => {
      setProcessing(false);
      setPaymentComplete(true);

      toast({
        title: "Payment successful!",
        description: "Your application has been submitted successfully.",
      });

    //   navigate("/thank-you");
      handleCarFinancingNext();
    }, 2000);
  };

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || "";
    const parts = [];

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    if (parts.length) {
      return parts.join(" ");
    } else {
      return value;
    }
  };

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCardNumber(e.target.value);
    setCardNumber(formatted);
  };

  const formatExpiryDate = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");

    if (v.length >= 3) {
      return `${v.substring(0, 2)}/${v.substring(2, 4)}`;
    }

    return value;
  };

  const handleExpiryDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatExpiryDate(e.target.value);
    setExpiryDate(formatted);
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
        <StepIndicator currentStep={5} steps={steps} />

        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-finance-purple text-center mb-8">
            Complete Payment
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Payment Form */}
            <div className="md:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Payment Details</CardTitle>
                  <CardDescription>
                    Please pay the processing fee to complete your application.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit}>
                    <div className="mb-6">
                      <Label className="text-base">Payment Method</Label>
                      <RadioGroup
                        value={paymentMethod}
                        onValueChange={setPaymentMethod}
                        className="grid grid-cols-3 gap-4 mt-2"
                      >
                        <div>
                          <RadioGroupItem
                            value="card"
                            id="card"
                            className="peer sr-only"
                          />
                          <Label
                            htmlFor="card"
                            className="flex flex-col items-center justify-between rounded-md border-2 border-gray-200 bg-white p-4 hover:bg-gray-50 hover:border-finance-purple peer-data-[state=checked]:border-finance-purple peer-data-[state=checked]:bg-finance-purple/5"
                          >
                            <CreditCard className="mb-2 h-6 w-6" />
                            <span className="text-sm font-medium">
                              Credit Card
                            </span>
                          </Label>
                        </div>
                        <div>
                          <RadioGroupItem
                            value="apple-pay"
                            id="apple-pay"
                            className="peer sr-only"
                            disabled
                          />
                          <Label
                            htmlFor="apple-pay"
                            className="flex flex-col items-center justify-between rounded-md border-2 border-gray-200 bg-white p-4 hover:bg-gray-50 cursor-not-allowed opacity-50"
                          >
                            <WalletIcon className="mb-2 h-6 w-6" />
                            <span className="text-sm font-medium">
                              Apple Pay
                            </span>
                          </Label>
                        </div>
                        <div>
                          <RadioGroupItem
                            value="uae-pay"
                            id="uae-pay"
                            className="peer sr-only"
                            disabled
                          />
                          <Label
                            htmlFor="uae-pay"
                            className="flex flex-col items-center justify-between rounded-md border-2 border-gray-200 bg-white p-4 hover:bg-gray-50 cursor-not-allowed opacity-50"
                          >
                            <CreditCard className="mb-2 h-6 w-6" />
                            <span className="text-sm font-medium">UAE Pay</span>
                          </Label>
                        </div>
                      </RadioGroup>
                    </div>

                    {paymentMethod === "card" && (
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="card-number">Card Number</Label>
                          <Input
                            id="card-number"
                            placeholder="1234 5678 9012 3456"
                            value={cardNumber}
                            onChange={handleCardNumberChange}
                            maxLength={19}
                          />
                        </div>
                        <div>
                          <Label htmlFor="card-name">Name on Card</Label>
                          <Input
                            id="card-name"
                            placeholder="John Doe"
                            value={cardName}
                            onChange={(e) => setCardName(e.target.value)}
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="expiry-date">Expiry Date</Label>
                            <Input
                              id="expiry-date"
                              placeholder="MM/YY"
                              value={expiryDate}
                              onChange={handleExpiryDateChange}
                              maxLength={5}
                            />
                          </div>
                          <div>
                            <Label htmlFor="cvv">CVV</Label>
                            <Input
                              id="cvv"
                              placeholder="123"
                              value={cvv}
                              onChange={(e) =>
                                setCvv(e.target.value.slice(0, 3))
                              }
                              maxLength={3}
                              type="password"
                            />
                          </div>
                        </div>
                      </div>
                    )}
                  </form>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button
                    variant="secondary"
                    onClick={() => handleCarFinancingBack()}
                    disabled={processing}
                  >
                    Back
                  </Button>
                  <Button
                    variant="primary"
                    type="submit"
                    className=""
                    onClick={handleSubmit}
                    disabled={processing}
                  >
                    {processing ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>
                        Pay Now
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>
                </CardFooter>
              </Card>
            </div>

            {/* Order Summary */}
            <div className="md:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Application ID</span>
                      <span className="font-medium">
                        {applicationData.applicationId}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Selected Car</span>
                      <span className="font-medium">
                        {applicationData.carInfo?.brand}{" "}
                        {applicationData.carInfo?.model}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Down Payment</span>
                      <span className="font-medium">
                        AED{" "}
                        {applicationData.financeDetails?.downPayment.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Finance Amount</span>
                      <span className="font-medium">
                        AED{" "}
                        {applicationData.financeDetails?.financeAmount.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Monthly Payment</span>
                      <span className="font-medium">
                        AED{" "}
                        {applicationData.financeDetails?.monthlyEMI.toLocaleString()}
                      </span>
                    </div>
                    <Separator />
                    <div className="flex justify-between">
                      <span className="text-gray-600">Processing Fee</span>
                      <span className="font-medium">
                        AED {processingFee.toLocaleString()}
                      </span>
                    </div>
                    <Separator />
                    <div className="flex justify-between">
                      <span className="text-gray-900 font-bold">
                        Total Due Now
                      </span>
                      <span className="text-finance-purple font-bold">
                        AED {processingFee.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <div className="w-full flex items-center justify-center text-sm text-gray-500">
                    <Lock className="h-4 w-4 mr-1" />
                    <span>Secure Payment</span>
                  </div>
                </CardFooter>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
    // </Layout>
  );
};

export default Payment;
