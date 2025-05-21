
import React, { useState } from 'react';
import { 
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";

interface Props {
  setGetWarranty: React.Dispatch<React.SetStateAction<number>>;
}

// Current year for validations
const currentYear = new Date().getFullYear();

// Sample data for car makes and models
const carMakes = ["Toyota", "Honda", "Nissan", "Ford", "Chevrolet", "BMW", "Mercedes-Benz", "Audi", "Lexus", "Kia", "Hyundai"];

// Car models mapping (simplified)
const carModelMappings: Record<string, string[]> = {
  "Toyota": ["Corolla", "Camry", "RAV4", "Highlander", "Land Cruiser"],
  "Honda": ["Civic", "Accord", "CR-V", "Pilot", "HR-V"],
  "Nissan": ["Altima", "Maxima", "Sentra", "Rogue", "Pathfinder"],
  "Ford": ["F-150", "Escape", "Explorer", "Mustang", "Edge"],
  "Chevrolet": ["Silverado", "Malibu", "Equinox", "Traverse", "Tahoe"],
  "BMW": ["3 Series", "5 Series", "7 Series", "X3", "X5"],
  "Mercedes-Benz": ["A-Class", "C-Class", "E-Class", "S-Class", "GLC"],
  "Audi": ["A3", "A4", "A6", "Q5", "Q7"],
  "Lexus": ["ES", "IS", "RX", "GX", "LX"],
  "Kia": ["Optima", "Forte", "Sportage", "Sorento", "Telluride"],
  "Hyundai": ["Elantra", "Sonata", "Tucson", "Santa Fe", "Palisade"]
};

// Year options
const yearOptions = Array.from({ length: 11 }, (_, i) => (currentYear - i).toString());

// Form schema
const eligibilitySchema = z.object({
  make: z.string().min(1, "Car make is required"),
  model: z.string().min(1, "Car model is required"),
  year: z.string().min(1, "Year of manufacture is required"),
  mileage: z.string().min(1, "Current mileage is required"),
  servicedBefore: z.enum(["yes", "no"]),
  vin: z.string().optional(),
});

type EligibilityFormValues = z.infer<typeof eligibilitySchema>;

const Eligibility = ({ setGetWarranty } : Props) => {
  const [modelOptions, setModelOptions] = useState<string[]>([]);
  const [isFormValid, setIsFormValid] = useState(false);
  const [eligibilityResult, setEligibilityResult] = useState<null | {
    status: 'eligible' | 'ineligible' | 'needs-inspection';
    message: string;
    action?: string;
  }>(null);
  
  const form = useForm<EligibilityFormValues>({
    resolver: zodResolver(eligibilitySchema),
    defaultValues: {
      make: "",
      model: "",
      year: "",
      mileage: "",
      servicedBefore: "no",
      vin: "",
    },
  });
  
  // Watch for form changes to determine eligibility
  React.useEffect(() => {
    const subscription = form.watch((value, { name, type }) => {
      const formData = form.getValues();
      const requiredFields = ['make', 'model', 'year', 'mileage', 'servicedBefore'];
      const allRequiredFieldsFilled = requiredFields.every(field => 
        formData[field as keyof EligibilityFormValues] !== undefined && 
        formData[field as keyof EligibilityFormValues] !== ""
      );
      
      setIsFormValid(allRequiredFieldsFilled);
    });
    return () => subscription.unsubscribe();
  }, [form, form.watch]);
  
  const handleMakeChange = (selectedMake: string) => {
    form.setValue('make', selectedMake);
    form.setValue('model', ''); // Reset model when make changes
    setModelOptions(carModelMappings[selectedMake] || []);
  };
  
  const onSubmit = (data: EligibilityFormValues) => {
    // In a real application, this would be an API call to verify eligibility
    console.log("Checking eligibility with data:", data);
    
    // Simulate eligibility check based on form data
    const yearNumber = parseInt(data.year);
    const mileageNumber = parseInt(data.mileage);
    
    // Example eligibility rules
    if (yearNumber < currentYear - 10) {
      setEligibilityResult({
        status: 'ineligible',
        message: 'Unfortunately, vehicles older than 10 years are not eligible for our extended warranty program.',
        action: 'You may qualify for our limited warranty program. Would you like to learn more?'
      });
    } else if (mileageNumber > 150000) {
      setEligibilityResult({
        status: 'ineligible',
        message: 'Vehicles with mileage exceeding 150,000 km are not eligible for our extended warranty program.',
        action: 'You may qualify for our mileage extension program. Would you like to learn more?'
      });
    } else if (yearNumber < currentYear - 7 || mileageNumber > 100000) {
      setEligibilityResult({
        status: 'needs-inspection',
        message: 'Your vehicle may be eligible but requires an inspection before enrollment.',
        action: 'Would you like to schedule a vehicle inspection at your nearest ENOC Autopro center?'
      });
    } else {
      setEligibilityResult({
        status: 'eligible',
        message: 'Good news! Your vehicle is eligible for our extended warranty program.',
        action: 'Would you like to view our warranty plans?'
      });
      
      toast.success("Vehicle eligible for warranty", {
        description: "Your vehicle qualifies for extended warranty coverage."
      });
    }
  };
  
  // For demonstration purposes - handling the "Try a Different Vehicle" action
  const handleReset = () => {
    form.reset();
    setEligibilityResult(null);
  };

  return (
    <div className="flex flex-col">
      <div className="flex-grow py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            {/* Page Header */}
            <div className="mb-8 text-center">
              <h1 className="text-3xl md:text-4xl font-bold text-autopro-black mb-2">
                Check Your Vehicle's Warranty Eligibility
              </h1>
              <p className="text-gray-600">
                See if your vehicle qualifies for our extended warranty program
              </p>
            </div>
            {!eligibilityResult ? (
              <div className="bg-white shadow-md rounded-lg p-6 md:p-8">
                <h2 className="text-xl font-semibold mb-6">Enter Your Vehicle Information</h2>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Make Field */}
                      <FormField
                        control={form.control}
                        name="make"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Vehicle Make</FormLabel>
                            <Select 
                              onValueChange={(value) => handleMakeChange(value)} 
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select make" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {carMakes.map((make) => (
                                  <SelectItem key={make} value={make}>{make}</SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      {/* Model Field */}
                      <FormField
                        control={form.control}
                        name="model"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Vehicle Model</FormLabel>
                            <Select 
                              onValueChange={field.onChange} 
                              defaultValue={field.value}
                              disabled={modelOptions.length === 0}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select model" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {modelOptions.map((model) => (
                                  <SelectItem key={model} value={model}>{model}</SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      {/* Year Field */}
                      <FormField
                        control={form.control}
                        name="year"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Year of Manufacture</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select year" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {yearOptions.map((year) => (
                                  <SelectItem key={year} value={year}>{year}</SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      {/* Mileage Field */}
                      <FormField
                        control={form.control}
                        name="mileage"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Current Mileage (km)</FormLabel>
                            <FormControl>
                              <Input placeholder="e.g., 45000" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      {/* Previous Service */}
                      <FormField
                        control={form.control}
                        name="servicedBefore"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Previously serviced at ENOC Autopro?</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="yes">Yes</SelectItem>
                                <SelectItem value="no">No</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      {/* VIN Field (Optional) */}
                      <FormField
                        control={form.control}
                        name="vin"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Vehicle Identification Number (Optional)</FormLabel>
                            <FormControl>
                              <Input placeholder="Enter VIN for more accurate results" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="pt-4">
                      <Button 
                        type="submit" 
                        variant="primary"
                        className="w-full" 
                        disabled={!isFormValid}
                      >
                        Check Eligibility
                      </Button>
                      <p className="text-xs text-gray-500 mt-2 text-center">
                        Your information is secure and will only be used for warranty eligibility assessment.
                      </p>
                    </div>
                  </form>
                </Form>
              </div>
            ) : (
              <div className={`bg-white shadow-md rounded-lg p-8 text-center ${
                eligibilityResult.status === 'eligible' ? 'border-l-4 border-green-500' : 
                eligibilityResult.status === 'needs-inspection' ? 'border-l-4 border-yellow-500' : 
                'border-l-4 border-red-500'
              }`}>
                <div className="mb-6">
                  {eligibilityResult.status === 'eligible' && (
                    <div className="mx-auto w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-4">
                      <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                    </div>
                  )}
                  
                  {eligibilityResult.status === 'needs-inspection' && (
                    <div className="mx-auto w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center mb-4">
                      <svg className="w-10 h-10 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
                      </svg>
                    </div>
                  )}
                  
                  {eligibilityResult.status === 'ineligible' && (
                    <div className="mx-auto w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mb-4">
                      <svg className="w-10 h-10 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                      </svg>
                    </div>
                  )}
                  
                  <h2 className="text-2xl font-bold mb-2">
                    {eligibilityResult.status === 'eligible' ? 'Eligible for Warranty!' : 
                     eligibilityResult.status === 'needs-inspection' ? 'Inspection Required' : 
                     'Not Eligible'}
                  </h2>
                  
                  <p className="text-gray-700 mb-6">{eligibilityResult.message}</p>
                </div>
                
                <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
                  {eligibilityResult.status === 'eligible' && (
                    <Button variant="secondary" onClick={() => setGetWarranty(3)}>
                      View Warranty Plans
                    </Button>
                  )}
                  
                  {eligibilityResult.status === 'needs-inspection' && (
                    <>
                      <Button variant="secondary">
                        Schedule Inspection
                      </Button>
                      <Button variant="outline" onClick={() => setGetWarranty(3)}>
                        View Limited Plans
                      </Button>
                    </>
                  )}
                  
                  {eligibilityResult.status === 'ineligible' && (
                    <Button variant="secondary">
                      Learn About Alternatives
                    </Button>
                  )}
                  
                  <Button 
                    variant="outline" 
                    onClick={handleReset}
                    className="border-salik-primary text-salik-primary hover:bg-salik-primary hover:text-white"
                  >
                    Try a Different Vehicle
                  </Button>
                </div>
              </div>
            )}
            <div className="mt-8 bg-salik-background rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4">Why Get an Extended Warranty?</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-salik-primary mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  <span>Protection against unexpected repair costs after manufacturer warranty expires</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-salik-primary mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  <span>Access to certified technicians and genuine parts across all ENOC Autopro centers</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-salik-primary mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  <span>Comprehensive coverage for mechanical, electrical and electronic components</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-salik-primary mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  <span>Increases vehicle resale value and provides peace of mind</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Eligibility;
