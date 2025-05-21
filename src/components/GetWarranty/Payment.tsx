import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "sonner";

interface Props {
  setGetWarranty: React.Dispatch<React.SetStateAction<number>>;
}

const Payment = ({ setGetWarranty } : Props) => {
  const [paymentMethod, setPaymentMethod] = useState<string>("card");
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [cardDetails, setCardDetails] = useState({
    cardNumber: "",
    cardName: "",
    expiry: "",
    cvv: ""
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    // Format card number with spaces
    if (name === 'cardNumber') {
      const formatted = value.replace(/\s/g, '').replace(/(\d{4})/g, '$1 ').trim().slice(0, 19);
      setCardDetails({ ...cardDetails, [name]: formatted });
      return;
    }
    
    // Format expiry date
    if (name === 'expiry') {
      const formatted = value.replace(/\s/g, '').replace(/(\d{2})(\d+)/, '$1/$2').slice(0, 5);
      setCardDetails({ ...cardDetails, [name]: formatted });
      return;
    }
    
    // Other fields
    setCardDetails({ ...cardDetails, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Simulate payment processing
    toast.info("Processing payment...");
    
    setTimeout(() => {
      setIsProcessing(false);
      toast.success("Payment successful!", {
        description: "Your warranty has been purchased successfully."
      });
      
      // Navigate to confirmation page
      setTimeout(() => {
        setGetWarranty(7);
      }, 1000);
    }, 2000);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-grow py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <h1 className="text-3xl md:text-4xl font-bold text-autopro-black mb-4">Payment</h1>
              <p className="text-gray-600">
                Complete your extended warranty purchase with our secure payment process.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Payment Form Section */}
              <div className="md:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Payment Method</CardTitle>
                    <CardDescription>Choose your preferred payment method</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit}>
                      <div className="space-y-6">
                        <RadioGroup 
                          value={paymentMethod} 
                          onValueChange={setPaymentMethod}
                          className="space-y-3"
                        >
                          <div className="flex items-center space-x-2 border rounded-md p-3 cursor-pointer hover:bg-gray-50">
                            <RadioGroupItem value="card" id="card" />
                            <Label htmlFor="card" className="flex-1 cursor-pointer">
                              <div className="flex justify-between items-center">
                                <span>Credit/Debit Card</span>
                                <div className="flex space-x-2">
                                  <div className="w-10 h-6 bg-gray-100 rounded flex items-center justify-center text-xs font-medium">Visa</div>
                                  <div className="w-10 h-6 bg-gray-100 rounded flex items-center justify-center text-xs font-medium">MC</div>
                                </div>
                              </div>
                            </Label>
                          </div>
                          
                          <div className="flex items-center space-x-2 border rounded-md p-3 cursor-pointer hover:bg-gray-50">
                            <RadioGroupItem value="applepay" id="applepay" />
                            <Label htmlFor="applepay" className="flex-1 cursor-pointer">Apple Pay</Label>
                          </div>
                          
                          <div className="flex items-center space-x-2 border rounded-md p-3 cursor-pointer hover:bg-gray-50">
                            <RadioGroupItem value="bank" id="bank" />
                            <Label htmlFor="bank" className="flex-1 cursor-pointer">Bank Transfer</Label>
                          </div>
                        </RadioGroup>
                        
                        {paymentMethod === "card" && (
                          <div className="space-y-4 mt-6">
                            <div>
                              <Label htmlFor="cardNumber">Card Number</Label>
                              <Input
                                id="cardNumber"
                                name="cardNumber"
                                placeholder="1234 5678 9012 3456"
                                value={cardDetails.cardNumber}
                                onChange={handleInputChange}
                                maxLength={19}
                              />
                            </div>
                            
                            <div>
                              <Label htmlFor="cardName">Cardholder Name</Label>
                              <Input
                                id="cardName"
                                name="cardName"
                                placeholder="John Smith"
                                value={cardDetails.cardName}
                                onChange={handleInputChange}
                              />
                            </div>
                            
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <Label htmlFor="expiry">Expiry Date</Label>
                                <Input
                                  id="expiry"
                                  name="expiry"
                                  placeholder="MM/YY"
                                  value={cardDetails.expiry}
                                  onChange={handleInputChange}
                                  maxLength={5}
                                />
                              </div>
                              
                              <div>
                                <Label htmlFor="cvv">CVV</Label>
                                <Input
                                  id="cvv"
                                  name="cvv"
                                  type="password"
                                  placeholder="123"
                                  value={cardDetails.cvv}
                                  onChange={handleInputChange}
                                  maxLength={4}
                                />
                              </div>
                            </div>
                          </div>
                        )}
                        
                        {paymentMethod === "applepay" && (
                          <div className="border rounded-md p-6 mt-6 text-center">
                            <div className="w-16 h-16 mx-auto mb-4 bg-black rounded-full flex items-center justify-center">
                              <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M17.5 12.3c-.1-1 .4-1.8 1-2.4.6-.6 1.6-1.1 2.4-1-1.2-1.7-3-1.9-3.7-1.9-1.6 0-3 1-3.7 1-.7 0-2-.9-3.1-.9-2.2 0-4.4 1.7-4.4 5 0 2 .7 4.1 1.5 5.5.8 1.2 1.6 2.4 2.8 2.4 1 0 1.5-.7 2.8-.7 1.3 0 1.8.7 2.8.7 1.2 0 2.1-1.3 2.8-2.5.5-.8.9-1.7 1.1-2.7-1.3-.5-2.3-1.9-2.3-3.5zm-2.2-6.5c.8-1.1.7-2.1.7-2.5-1 .1-2 .7-2.6 1.5-.5.6-.9 1.5-.9 2.5 1 0 1.9-.5 2.8-1.5z"/>
                              </svg>
                            </div>
                            <p className="text-gray-600 mb-4">
                              Click the Apple Pay button to complete your payment using your Apple device.
                            </p>
                            <Button disabled={isProcessing} className="bg-black hover:bg-gray-800 text-white w-full">
                              Pay with Apple Pay
                            </Button>
                          </div>
                        )}
                        
                        {paymentMethod === "bank" && (
                          <div className="border rounded-md p-6 mt-6">
                            <h3 className="font-semibold mb-3">Bank Transfer Details</h3>
                            <div className="space-y-2 text-gray-600">
                              <p>Please transfer the total amount to the following account:</p>
                              <div className="p-3 bg-gray-50 rounded">
                                <p><span className="font-medium">Bank:</span> Emirates NBD</p>
                                <p><span className="font-medium">Account Name:</span> ENOC Autopro LLC</p>
                                <p><span className="font-medium">Account Number:</span> 1234567890</p>
                                <p><span className="font-medium">IBAN:</span> AE123456789012345678</p>
                                <p><span className="font-medium">Reference:</span> WTY-{Math.floor(10000 + Math.random() * 90000)}</p>
                              </div>
                              <p className="text-sm mt-3">
                                Note: Your warranty will be activated once the payment is confirmed.
                                This typically takes 1-2 business days.
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                      
                      <div className="mt-8">
                        <Button 
                          type="submit"
                          variant="primary"
                          className="w-full"
                          disabled={isProcessing}
                        >
                          {isProcessing ? "Processing..." : "Complete Payment"}
                        </Button>
                      </div>
                    </form>
                  </CardContent>
                </Card>
                
                <div className="mt-6 bg-gray-100 p-4 rounded-md">
                  <div className="flex items-center">
                    <svg className="w-6 h-6 text-green-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                    </svg>
                    <span className="font-medium">Secure Payment</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-2">
                    All payment information is encrypted and processed securely. ENOC Autopro does not store your payment details.
                  </p>
                </div>
              </div>
              
              {/* Order Summary Section */}
              <div>
                <Card>
                  <CardHeader>
                    <CardTitle>Order Summary</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Plan</span>
                        <span className="font-medium">Plus Plan</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Coverage</span>
                        <span className="font-medium">1 Year</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Claim Limit</span>
                        <span className="font-medium">AED 10,000</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Add-ons</span>
                        <span className="font-medium">Zero Deductible</span>
                      </div>
                      <div className="pt-3 mt-3 border-t border-gray-200">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Subtotal</span>
                          <span className="font-medium">AED 2,799</span>
                        </div>
                        <div className="flex justify-between mt-1">
                          <span className="text-gray-600">Add-ons</span>
                          <span className="font-medium">AED 299</span>
                        </div>
                        <div className="flex justify-between mt-1">
                          <span className="text-gray-600">VAT (5%)</span>
                          <span className="font-medium">AED 154.90</span>
                        </div>
                      </div>
                      <div className="pt-3 mt-3 border-t border-gray-200">
                        <div className="flex justify-between">
                          <span className="font-bold">Total</span>
                          <span className="font-bold text-autopro-red">AED 3,252.90</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <div className="mt-6 bg-white rounded-lg border p-4">
                  <h3 className="font-semibold text-lg mb-3">Need Help?</h3>
                  <p className="text-gray-600 text-sm mb-3">
                    If you have any questions about payment or your warranty purchase:
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <svg className="w-4 h-4 text-autopro-red mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      <span className="text-sm">800-AUTO (2886)</span>
                    </div>
                    <div className="flex items-center">
                      <svg className="w-4 h-4 text-autopro-red mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      <span className="text-sm">warranty@autopro.ae</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
