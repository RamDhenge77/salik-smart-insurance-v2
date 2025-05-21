
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";

interface Props {
  setGetWarranty: React.Dispatch<React.SetStateAction<number>>;
}

// Sample data for service centers
const serviceCenters = [
  { id: "dxb-1", name: "Dubai - Al Qusais", address: "Al Qusais Industrial Area 1" },
  { id: "dxb-2", name: "Dubai - Al Quoz", address: "Al Quoz Industrial Area 4" },
  { id: "dxb-3", name: "Dubai - Jumeirah", address: "Jumeirah Beach Road" },
  { id: "dxb-4", name: "Dubai - Business Bay", address: "Business Bay" },
  { id: "auh-1", name: "Abu Dhabi - Musaffah", address: "Musaffah Industrial Area" },
  { id: "auh-2", name: "Abu Dhabi - Airport Road", address: "Airport Road" },
  { id: "shj-1", name: "Sharjah - Industrial Area", address: "Industrial Area 10" },
  { id: "ajm-1", name: "Ajman - Al Jurf", address: "Al Jurf Industrial Area" },
  { id: "rak-1", name: "Ras Al Khaimah - Al Nakheel", address: "Al Nakheel Area" },
];

const Pricing = ({ setGetWarranty } : Props) => {
  const [selectedPlan, setSelectedPlan] = useState("standard"); // standard, plus, premium
  const [vehicleAge, setVehicleAge] = useState("1-3"); // 1-3, 3-5
  const [mileage, setMileage] = useState("0-50000"); // 0-50000, 50000-100000, 100000-150000
  const [duration, setDuration] = useState("1"); // 1, 2
  const [addOns, setAddOns] = useState({
    zeroDeductible: false,
    roadsideAssistance: false
  });
  const [serviceCenter, setServiceCenter] = useState("");
  const [startDate, setStartDate] = useState("");

  // Calculate base pricing
  const getBasePrice = () => {
    const planPrices = {
      standard: 1699,
      plus: 2799,
      premium: 3699
    };
    return planPrices[selectedPlan as keyof typeof planPrices];
  };

  // Calculate additional cost based on vehicle age
  const getAgeAdjustment = () => {
    if (vehicleAge === "3-5") return getBasePrice() * 0.15; // 15% extra for older cars
    return 0;
  };

  // Calculate additional cost based on mileage
  const getMileageAdjustment = () => {
    if (mileage === "50000-100000") return getBasePrice() * 0.1; // 10% extra
    if (mileage === "100000-150000") return getBasePrice() * 0.2; // 20% extra
    return 0;
  };

  // Calculate additional cost for 2 year warranty
  const getDurationAdjustment = () => {
    if (duration === "2") return getBasePrice() * 0.8; // 80% of base price for second year
    return 0;
  };

  // Calculate add-ons cost
  const getAddOnsCost = () => {
    let cost = 0;
    if (addOns.zeroDeductible) cost += 299;
    if (addOns.roadsideAssistance) cost += 199;
    return cost;
  };

  // Calculate VAT (5%)
  const getVAT = () => {
    return (getBasePrice() + getAgeAdjustment() + getMileageAdjustment() + getDurationAdjustment() + getAddOnsCost()) * 0.05;
  };

  // Calculate total price
  const getTotalPrice = () => {
    return getBasePrice() + getAgeAdjustment() + getMileageAdjustment() + getDurationAdjustment() + getAddOnsCost() + getVAT();
  };

  // Calculate monthly EMI (simple calculation)
  const getMonthlyEMI = () => {
    const totalPrice = getTotalPrice();
    // Simple calculation assuming 0% interest over 12 months
    return totalPrice / 12;
  };

  const handleContinue = () => {
    if (!serviceCenter) {
      toast.error("Please select a service center");
      return;
    }

    if (!startDate) {
      toast.error("Please select a warranty start date");
      return;
    }

    toast.success("Pricing calculation complete", {
      description: "Proceeding to personal details"
    });
    
    setGetWarranty(5);
  };

  return (
    <div className="flex flex-col">
      <div className="flex-grow py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-bold text-autopro-black mb-4">Calculate Your Warranty Price</h1>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Customize your extended warranty plan based on your vehicle details and preferences.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Calculation Form */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Warranty Plan Configuration</CardTitle>
                  <CardDescription>Adjust details to customize your protection plan</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <Label htmlFor="plan">Select Plan</Label>
                    <Select value={selectedPlan} onValueChange={setSelectedPlan}>
                      <SelectTrigger id="plan">
                        <SelectValue placeholder="Select plan" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="standard">Standard</SelectItem>
                        <SelectItem value="plus">Plus</SelectItem>
                        <SelectItem value="premium">Premium</SelectItem>
                      </SelectContent>
                    </Select>
                    {selectedPlan === "standard" && (
                      <p className="text-sm text-gray-500 mt-1">Basic coverage for essential components</p>
                    )}
                    {selectedPlan === "plus" && (
                      <p className="text-sm text-gray-500 mt-1">Comprehensive coverage for complete peace of mind</p>
                    )}
                    {selectedPlan === "premium" && (
                      <p className="text-sm text-gray-500 mt-1">Full protection with extended coverage period</p>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="vehicle-age">Vehicle Age</Label>
                      <Select value={vehicleAge} onValueChange={setVehicleAge}>
                        <SelectTrigger id="vehicle-age">
                          <SelectValue placeholder="Select age range" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1-3">1-3 years</SelectItem>
                          <SelectItem value="3-5">3-5 years</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <Label htmlFor="mileage">Current Mileage</Label>
                      <Select value={mileage} onValueChange={setMileage}>
                        <SelectTrigger id="mileage">
                          <SelectValue placeholder="Select mileage range" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="0-50000">0-50,000 km</SelectItem>
                          <SelectItem value="50000-100000">50,000-100,000 km</SelectItem>
                          <SelectItem value="100000-150000">100,000-150,000 km</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="duration">Warranty Duration</Label>
                    <Select value={duration} onValueChange={setDuration}>
                      <SelectTrigger id="duration">
                        <SelectValue placeholder="Select duration" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1 Year</SelectItem>
                        <SelectItem value="2">2 Years</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-3">
                    <Label>Optional Add-ons</Label>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="zero-deductible" className="text-base">Zero Deductible</Label>
                        <p className="text-sm text-gray-500">No deductible on claims (AED 299)</p>
                      </div>
                      <Switch
                        id="zero-deductible"
                        checked={addOns.zeroDeductible}
                        onCheckedChange={(checked) => setAddOns({ ...addOns, zeroDeductible: checked })}
                        className={`${addOns.zeroDeductible ? '!bg-btn-primary' : ''}`}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="roadside-assistance" className="text-base">Roadside Assistance</Label>
                        <p className="text-sm text-gray-500">24/7 emergency assistance (AED 199)</p>
                      </div>
                      <Switch
                        id="roadside-assistance"
                        checked={addOns.roadsideAssistance}
                        onCheckedChange={(checked) => setAddOns({...addOns, roadsideAssistance: checked})}
                        className={`${addOns.roadsideAssistance ? '!bg-btn-primary' : ''}`}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div>
                      <Label htmlFor="service-center">Preferred Service Center</Label>
                      <Select value={serviceCenter} onValueChange={setServiceCenter}>
                        <SelectTrigger id="service-center">
                          <SelectValue placeholder="Select service center" />
                        </SelectTrigger>
                        <SelectContent>
                          {serviceCenters.map((center) => (
                            <SelectItem key={center.id} value={center.id}>
                              {center.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {serviceCenter && (
                        <p className="text-sm text-gray-500 mt-1">
                          {serviceCenters.find(c => c.id === serviceCenter)?.address}
                        </p>
                      )}
                    </div>
                    
                    <div>
                      <Label htmlFor="start-date">Warranty Start Date</Label>
                      <Input
                        id="start-date"
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        min={new Date().toISOString().split('T')[0]}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Price Summary */}
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Price Summary</CardTitle>
                  <CardDescription>Your customized warranty pricing</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center pb-2 border-b">
                    <span className="text-gray-600">Base Price ({selectedPlan.charAt(0).toUpperCase() + selectedPlan.slice(1)} Plan)</span>
                    <span className="font-medium">AED {getBasePrice().toFixed(0)}</span>
                  </div>
                  
                  {getAgeAdjustment() > 0 && (
                    <div className="flex justify-between items-center pb-2 border-b">
                      <span className="text-gray-600">Vehicle Age Adjustment</span>
                      <span className="font-medium">AED {getAgeAdjustment().toFixed(0)}</span>
                    </div>
                  )}
                  
                  {getMileageAdjustment() > 0 && (
                    <div className="flex justify-between items-center pb-2 border-b">
                      <span className="text-gray-600">Mileage Adjustment</span>
                      <span className="font-medium">AED {getMileageAdjustment().toFixed(0)}</span>
                    </div>
                  )}
                  
                  {getDurationAdjustment() > 0 && (
                    <div className="flex justify-between items-center pb-2 border-b">
                      <span className="text-gray-600">2 Year Duration</span>
                      <span className="font-medium">AED {getDurationAdjustment().toFixed(0)}</span>
                    </div>
                  )}
                  
                  {addOns.zeroDeductible && (
                    <div className="flex justify-between items-center pb-2 border-b">
                      <span className="text-gray-600">Zero Deductible Add-on</span>
                      <span className="font-medium">AED 299</span>
                    </div>
                  )}
                  
                  {addOns.roadsideAssistance && (
                    <div className="flex justify-between items-center pb-2 border-b">
                      <span className="text-gray-600">Roadside Assistance</span>
                      <span className="font-medium">AED 199</span>
                    </div>
                  )}
                  
                  <div className="flex justify-between items-center pb-2 border-b">
                    <span className="text-gray-600">VAT (5%)</span>
                    <span className="font-medium">AED {getVAT().toFixed(0)}</span>
                  </div>
                  
                  <div className="flex justify-between items-center pt-2">
                    <span className="text-lg font-bold text-autopro-black">Total Price</span>
                    <span className="text-lg font-bold text-autopro-black">AED {getTotalPrice().toFixed(0)}</span>
                  </div>
                  
                  <div className="mt-4 p-3 bg-gray-50 rounded-md">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Monthly Payment (0% interest)</span>
                      <span className="font-medium">AED {getMonthlyEMI().toFixed(0)} / month</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      * Based on 12 monthly payments with 0% interest
                    </p>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button 
                    onClick={handleContinue}
                    className="w-full"
                    variant="secondary"
                  >
                    Continue to Personal Details
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
          
          <div className="mt-12 bg-white rounded-lg p-6 shadow-md">
            <h2 className="text-xl font-semibold text-autopro-black mb-4">Payment & Financing Options</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-medium text-lg mb-3">Available Payment Methods</h3>
                <div className="flex flex-wrap gap-3">
                  <div className="bg-gray-50 p-3 rounded-md w-24 h-16 flex items-center justify-center">
                    <span className="text-gray-600 font-medium">Visa</span>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-md w-24 h-16 flex items-center justify-center">
                    <span className="text-gray-600 font-medium">MasterCard</span>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-md w-24 h-16 flex items-center justify-center">
                    <span className="text-gray-600 font-medium">Apple Pay</span>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-md w-24 h-16 flex items-center justify-center">
                    <span className="text-gray-600 font-medium">Bank Transfer</span>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="font-medium text-lg mb-3">Financing Partners</h3>
                <p className="text-gray-600">
                  ENOC Autopro partners with leading UAE banks to offer 0% interest installment plans for extended warranty purchases.
                </p>
                <ul className="mt-3 space-y-1">
                  <li className="text-gray-600">• Emirates NBD - 3, 6, or 12 months</li>
                  <li className="text-gray-600">• ADCB - 6 or 12 months</li>
                  <li className="text-gray-600">• Dubai Islamic Bank - 3 or 6 months</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
