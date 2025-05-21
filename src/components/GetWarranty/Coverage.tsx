
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Shield, Check, X } from 'lucide-react';
import { toast } from "sonner";

interface Props {
  setGetWarranty: React.Dispatch<React.SetStateAction<number>>;
}

const plans = [
  {
    id: "standard",
    name: "Standard",
    description: "Basic coverage for essential components",
    price: "AED 1,699",
    claimLimit: "Up to AED 5,000 per year",
    deductible: "AED 100 per claim",
    duration: "1 year",
    coverage: {
      engine: true,
      transmission: true,
      electrical: true,
      suspension: false,
      braking: false,
      cooling: true,
      steering: true,
      airConditioning: false,
      fuel: true,
      electronics: false,
    },
    excludes: ["Wear and tear items", "Consumables", "Interior trim", "Entertainment systems"]
  },
  {
    id: "plus",
    name: "Plus",
    description: "Comprehensive coverage for complete peace of mind",
    price: "AED 2,799",
    claimLimit: "Up to AED 10,000 per year",
    deductible: "AED 100 per claim",
    duration: "1 year",
    coverage: {
      engine: true,
      transmission: true,
      electrical: true,
      suspension: true,
      braking: true,
      cooling: true,
      steering: true,
      airConditioning: true,
      fuel: true,
      electronics: true,
    },
    excludes: ["Wear and tear items", "Consumables"]
  },
  {
    id: "premium",
    name: "Premium",
    description: "Full protection with extended coverage period",
    price: "AED 3,699",
    claimLimit: "Up to AED 15,000 per year",
    deductible: "AED 100 per claim",
    duration: "2 years",
    coverage: {
      engine: true,
      transmission: true,
      electrical: true,
      suspension: true,
      braking: true,
      cooling: true,
      steering: true,
      airConditioning: true,
      fuel: true,
      electronics: true,
    },
    excludes: ["Wear and tear items"]
  }
];

const termsContent = `
# ENOC Autopro Extended Warranty Terms and Conditions

## Coverage
This Extended Warranty covers the cost of repairs including parts and labor needed to fix mechanical, electrical, and electronic breakdowns.

## Eligibility
- Passenger vehicles less than 5 years old
- Less than 150,000 kilometers at time of purchase
- Not used as taxis, rental cars, driving school vehicles, or emergency vehicles
- Vehicle must be properly maintained according to manufacturer's recommendations

## Claims Process
1. Contact the nearest ENOC Autopro service center
2. Present your warranty certificate
3. Pay applicable deductible
4. Authorized repair will be performed

## Exclusions
- Routine maintenance items
- Wear and tear components
- Damage from accidents or misuse
- Modifications to the vehicle
- Pre-existing conditions

## Cancellation
This warranty is non-refundable once activated.

## Transfer
This warranty may be transferred to a new owner with proper documentation and transfer fee.
`;

const Coverage = ({ setGetWarranty } : Props) => {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  
  const handleSelectPlan = (planId: string) => {
    setSelectedPlan(planId);
    toast.success("Plan selected", {
      description: `You've selected the ${planId.charAt(0).toUpperCase() + planId.slice(1)} plan.`
    });
    setTimeout(() => {
      setGetWarranty(4);
    }, 1500);
  };

  return (
    <div className="flex flex-col">
      <div className="flex-grow py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-bold text-autopro-black mb-4">Choose Your Coverage Plan</h1>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Select the right extended warranty plan that fits your needs. All plans are backed by ENOC Autopro's network of service centers across the UAE.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plans.map((plan) => (
              <div 
                key={plan.id} 
                className={`bg-white rounded-lg shadow-lg overflow-hidden transform transition-all duration-200 hover:-translate-y-1 hover:shadow-xl ${
                  selectedPlan === plan.id ? "ring-2 ring-salik-primary" : ""
                }`}
              >
                <div className="p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-2xl font-bold text-autopro-black">{plan.name}</h3>
                    <Shield className="h-8 w-8 text-salik-primary" />
                  </div>
                  <p className="text-gray-600 mb-4">{plan.description}</p>
                  <div className="text-3xl font-bold text-autopro-black mb-6">{plan.price}</div>
                  
                  <div className="space-y-4 mb-6">
                    <div className="flex items-center">
                      <Check className="h-5 w-5 text-green-500 mr-2" />
                      <span className="text-gray-700">Claim Limit: {plan.claimLimit}</span>
                    </div>
                    <div className="flex items-center">
                      <Check className="h-5 w-5 text-green-500 mr-2" />
                      <span className="text-gray-700">Deductible: {plan.deductible}</span>
                    </div>
                    <div className="flex items-center">
                      <Check className="h-5 w-5 text-green-500 mr-2" />
                      <span className="text-gray-700">Duration: {plan.duration}</span>
                    </div>
                  </div>
                  
                  <Button 
                    onClick={() => handleSelectPlan(plan.id)}
                    variant="primary"
                    className="w-full"
                  >
                    Select Plan
                  </Button>
                </div>
                
                <div className="bg-gray-50 p-6 border-t border-gray-200">
                  <h4 className="font-semibold text-autopro-black mb-3">Covered Components:</h4>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="flex items-center">
                      {plan.coverage.engine ? 
                        <Check className="h-4 w-4 text-green-500 mr-1" /> : 
                        <X className="h-4 w-4 text-red-500 mr-1" />
                      }
                      <span className={plan.coverage.engine ? "text-gray-700" : "text-gray-400"}>Engine</span>
                    </div>
                    <div className="flex items-center">
                      {plan.coverage.transmission ? 
                        <Check className="h-4 w-4 text-green-500 mr-1" /> : 
                        <X className="h-4 w-4 text-red-500 mr-1" />
                      }
                      <span className={plan.coverage.transmission ? "text-gray-700" : "text-gray-400"}>Transmission</span>
                    </div>
                    <div className="flex items-center">
                      {plan.coverage.electrical ? 
                        <Check className="h-4 w-4 text-green-500 mr-1" /> : 
                        <X className="h-4 w-4 text-red-500 mr-1" />
                      }
                      <span className={plan.coverage.electrical ? "text-gray-700" : "text-gray-400"}>Electrical</span>
                    </div>
                    <div className="flex items-center">
                      {plan.coverage.suspension ? 
                        <Check className="h-4 w-4 text-green-500 mr-1" /> : 
                        <X className="h-4 w-4 text-red-500 mr-1" />
                      }
                      <span className={plan.coverage.suspension ? "text-gray-700" : "text-gray-400"}>Suspension</span>
                    </div>
                    <div className="flex items-center">
                      {plan.coverage.braking ? 
                        <Check className="h-4 w-4 text-green-500 mr-1" /> : 
                        <X className="h-4 w-4 text-red-500 mr-1" />
                      }
                      <span className={plan.coverage.braking ? "text-gray-700" : "text-gray-400"}>Braking</span>
                    </div>
                    <div className="flex items-center">
                      {plan.coverage.airConditioning ? 
                        <Check className="h-4 w-4 text-green-500 mr-1" /> : 
                        <X className="h-4 w-4 text-red-500 mr-1" />
                      }
                      <span className={plan.coverage.airConditioning ? "text-gray-700" : "text-gray-400"}>A/C</span>
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="link" className="text-salik-primary p-0 h-auto">
                          View full details
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
                        <DialogHeader>
                          <DialogTitle>{plan.name} Plan Details</DialogTitle>
                          <DialogDescription>
                            Complete coverage details and terms
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div>
                            <h4 className="font-semibold text-lg mb-2">Coverage Details</h4>
                            <div className="grid grid-cols-2 gap-3">
                              <div className="flex items-center">
                                {plan.coverage.engine ? 
                                  <Check className="h-4 w-4 text-green-500 mr-2" /> : 
                                  <X className="h-4 w-4 text-red-500 mr-2" />
                                }
                                <span>Engine Components</span>
                              </div>
                              <div className="flex items-center">
                                {plan.coverage.transmission ? 
                                  <Check className="h-4 w-4 text-green-500 mr-2" /> : 
                                  <X className="h-4 w-4 text-red-500 mr-2" />
                                }
                                <span>Transmission Components</span>
                              </div>
                              <div className="flex items-center">
                                {plan.coverage.electrical ? 
                                  <Check className="h-4 w-4 text-green-500 mr-2" /> : 
                                  <X className="h-4 w-4 text-red-500 mr-2" />
                                }
                                <span>Electrical System</span>
                              </div>
                              <div className="flex items-center">
                                {plan.coverage.suspension ? 
                                  <Check className="h-4 w-4 text-green-500 mr-2" /> : 
                                  <X className="h-4 w-4 text-red-500 mr-2" />
                                }
                                <span>Suspension Components</span>
                              </div>
                              <div className="flex items-center">
                                {plan.coverage.braking ? 
                                  <Check className="h-4 w-4 text-green-500 mr-2" /> : 
                                  <X className="h-4 w-4 text-red-500 mr-2" />
                                }
                                <span>Braking System</span>
                              </div>
                              <div className="flex items-center">
                                {plan.coverage.cooling ? 
                                  <Check className="h-4 w-4 text-green-500 mr-2" /> : 
                                  <X className="h-4 w-4 text-red-500 mr-2" />
                                }
                                <span>Cooling System</span>
                              </div>
                              <div className="flex items-center">
                                {plan.coverage.steering ? 
                                  <Check className="h-4 w-4 text-green-500 mr-2" /> : 
                                  <X className="h-4 w-4 text-red-500 mr-2" />
                                }
                                <span>Steering Components</span>
                              </div>
                              <div className="flex items-center">
                                {plan.coverage.airConditioning ? 
                                  <Check className="h-4 w-4 text-green-500 mr-2" /> : 
                                  <X className="h-4 w-4 text-red-500 mr-2" />
                                }
                                <span>Air Conditioning</span>
                              </div>
                              <div className="flex items-center">
                                {plan.coverage.fuel ? 
                                  <Check className="h-4 w-4 text-green-500 mr-2" /> : 
                                  <X className="h-4 w-4 text-red-500 mr-2" />
                                }
                                <span>Fuel System</span>
                              </div>
                              <div className="flex items-center">
                                {plan.coverage.electronics ? 
                                  <Check className="h-4 w-4 text-green-500 mr-2" /> : 
                                  <X className="h-4 w-4 text-red-500 mr-2" />
                                }
                                <span>Electronic Components</span>
                              </div>
                            </div>
                          </div>
                          
                          <div>
                            <h4 className="font-semibold text-lg mb-2">Exclusions</h4>
                            <ul className="list-disc pl-5 space-y-1">
                              {plan.excludes.map((item, index) => (
                                <li key={index} className="text-gray-700">{item}</li>
                              ))}
                            </ul>
                          </div>
                          
                          <div>
                            <h4 className="font-semibold text-lg mb-2">Terms & Conditions</h4>
                            <div className="bg-gray-50 p-4 rounded-md text-sm whitespace-pre-line">
                              {termsContent}
                            </div>
                          </div>
                          
                          <Button 
                            onClick={() => handleSelectPlan(plan.id)}
                            variant="secondary"
                            className="w-full"
                          >
                            Select This Plan
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-16 bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold text-autopro-black mb-6">Frequently Asked Questions</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-lg text-autopro-black mb-2">What is an extended warranty?</h3>
                <p className="text-gray-700">
                  An extended warranty is a service contract that provides additional coverage for your vehicle after the manufacturer's warranty expires, protecting you against unexpected repair costs.
                </p>
              </div>
              
              <div>
                <h3 className="font-semibold text-lg text-autopro-black mb-2">When does the extended warranty start?</h3>
                <p className="text-gray-700">
                  The ENOC Autopro Extended Warranty begins on the date of purchase or on a scheduled future date of your choosing, typically after your manufacturer's warranty expires.
                </p>
              </div>
              
              <div>
                <h3 className="font-semibold text-lg text-autopro-black mb-2">How do I make a claim?</h3>
                <p className="text-gray-700">
                  Simply visit any ENOC Autopro service center with your warranty documentation. Our service advisors will guide you through the process, verify coverage, and handle the repair with minimal paperwork.
                </p>
              </div>
              
              <div>
                <h3 className="font-semibold text-lg text-autopro-black mb-2">Can I transfer the warranty if I sell my car?</h3>
                <p className="text-gray-700">
                  Yes, the warranty can be transferred to the new owner, which adds value to your vehicle. A small administrative fee may apply for transferring the warranty.
                </p>
              </div>
              
              <div>
                <h3 className="font-semibold text-lg text-autopro-black mb-2">What happens if my vehicle can't be repaired?</h3>
                <p className="text-gray-700">
                  In the rare case that a vehicle cannot be repaired, ENOC Autopro may offer a settlement up to the market value of the vehicle at the time of the breakdown, not exceeding the claim limit of your plan.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Coverage;
