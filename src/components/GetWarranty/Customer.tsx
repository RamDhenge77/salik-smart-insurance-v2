
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

interface Props {
  setGetWarranty: React.Dispatch<React.SetStateAction<number>>;
}

// Form validation schema
const customerSchema = z.object({
  fullName: z.string().min(3, "Full name must be at least 3 characters"),
  mobileNumber: z
    .string()
    .regex(/^(0|971|\+971)[0-9]{9}$/, "Please enter a valid UAE phone number"),
  email: z.string().email("Please enter a valid email address"),
  emiratesId: z
    .string()
    .regex(/^784-[0-9]{4}-[0-9]{7}-[0-9]{1}$/, "Please enter a valid Emirates ID format (e.g., 784-1234-1234567-1)"),
  agreeTerms: z.boolean().refine(val => val === true, {
    message: "You must agree to the terms and conditions"
  })
});

type CustomerFormValues = z.infer<typeof customerSchema>;

// Type definition for Label component
const Label = ({ className, children }: { className?: string, children: React.ReactNode }) => (
  <label className={className}>{children}</label>
);

const termsContent = `
# ENOC Autopro Extended Warranty Terms and Conditions

## 1. DEFINITIONS

1.1 "We", "Us", "Our" refers to ENOC Autopro, the provider of the Extended Warranty.

1.2 "You", "Your" refers to the purchaser of the Extended Warranty.

1.3 "Vehicle" refers to the motor vehicle described in the Warranty Certificate.

1.4 "Warranty Certificate" refers to the document issued to You confirming Your purchase of the Extended Warranty.

1.5 "Covered Components" refers to the components of the Vehicle covered by the Extended Warranty as specified in the Warranty Certificate.

1.6 "Claim" refers to a request for repair or replacement of a Covered Component.

1.7 "Claim Limit" refers to the maximum amount payable for a single Claim or in aggregate during the Warranty Period.

1.8 "Deductible" refers to the amount You must pay towards each Claim.

1.9 "Warranty Period" refers to the period during which the Extended Warranty is valid.

## 2. COVERAGE

2.1 This Extended Warranty covers the cost of repair or replacement of Covered Components which suffer a mechanical, electrical, or electronic breakdown during the Warranty Period, subject to the terms, conditions, and exclusions set out in this agreement.

2.2 Coverage is limited to the Claim Limit specified in the Warranty Certificate.

2.3 Each Claim is subject to the Deductible specified in the Warranty Certificate.

## 3. EXCLUSIONS

3.1 This Extended Warranty does not cover:

a) Normal wear and tear or gradual deterioration;
b) Regular maintenance items and services;
c) Consumable items (including but not limited to oils, filters, lubricants, coolant, belts);
d) Damage resulting from accidents, misuse, negligence, or modification;
e) Pre-existing conditions that existed prior to the start of the Warranty Period;
f) Cosmetic damage, including scratches, dents, and interior trim;
g) Damage caused by environmental factors, including corrosion;
h) Any loss or damage covered by any other warranty, guarantee, or insurance policy;
i) Any loss arising from the inability to use the Vehicle, including transportation costs;
j) Any consequential loss or damage.

## 4. ELIGIBILITY

4.1 To be eligible for an Extended Warranty, the Vehicle must:

a) Be less than 5 years old from the date of first registration;
b) Have less than 150,000 kilometers on the odometer;
c) Not be used as a taxi, rental car, driving school vehicle, racing vehicle, or emergency vehicle;
d) Be maintained according to the manufacturer's recommended service schedule.

## 5. YOUR OBLIGATIONS

5.1 To maintain coverage under this Extended Warranty, You must:

a) Service and maintain the Vehicle in accordance with the manufacturer's recommendations;
b) Keep complete service records and receipts;
c) Take reasonable precautions to prevent damage to the Vehicle;
d) Notify Us immediately of any fault or potential Claim;
e) Not authorize repairs without Our prior approval.

## 6. CLAIMS PROCEDURE

6.1 In the event of a breakdown that may give rise to a Claim:

a) Contact an ENOC Autopro service center immediately;
b) Provide Your Warranty Certificate and service records;
c) Pay the applicable Deductible;
d) Cooperate with any investigation into the Claim.

6.2 We reserve the right to inspect the Vehicle before authorizing repairs.

## 7. TERMINATION

7.1 This Extended Warranty may be terminated:

a) Upon expiration of the Warranty Period;
b) If the Vehicle is declared a total loss;
c) If You breach any term of this agreement;
d) If You sell the Vehicle (unless the warranty is transferred in accordance with section 8).

7.2 No refund will be provided upon termination of the Extended Warranty.

## 8. TRANSFER

8.1 This Extended Warranty may be transferred to a subsequent owner of the Vehicle, subject to:

a) A transfer application being submitted within 30 days of the Vehicle's sale;
b) Payment of an administrative fee;
c) Provision of service records demonstrating compliance with maintenance requirements.

## 9. GENERAL

9.1 This Extended Warranty is governed by the laws of the United Arab Emirates.

9.2 Any dispute arising from this Extended Warranty shall be subject to the exclusive jurisdiction of the courts of the United Arab Emirates.

9.3 ENOC Autopro reserves the right to amend these terms and conditions with prior notice to You.
`;

const Customer = ({ setGetWarranty } : Props) => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<string | null>(null);

  const form = useForm<CustomerFormValues>({
    resolver: zodResolver(customerSchema),
    defaultValues: {
      fullName: "",
      mobileNumber: "",
      email: "",
      emiratesId: "",
      agreeTerms: false
    }
  });

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setIsUploading(true);
      // Simulate file upload
      setTimeout(() => {
        setIsUploading(false);
        setUploadedFile(file.name);
        toast.success("Document uploaded", {
          description: `Successfully uploaded ${file.name}`
        });
      }, 1500);
    }
  };

  const onSubmit = (data: CustomerFormValues) => {
    console.log("Form submitted", data);
    toast.success("Your information has been submitted", {
      description: "Proceeding to payment"
    });
    
    // Navigate to payment page after a short delay
    setTimeout(() => {
      setGetWarranty(5);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-grow py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-10">
              <h1 className="text-3xl md:text-4xl font-bold text-autopro-black mb-4">Customer Details</h1>
              <p className="text-gray-600">
                Please provide your information to complete the warranty purchase.
              </p>
            </div>
            
            <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="fullName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter your full name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="mobileNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Mobile Number</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., +971501234567" {...field} />
                        </FormControl>
                        <FormDescription>
                          Enter your UAE mobile number with country code
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email Address</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="your.name@example.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="emiratesId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Emirates ID Number</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., 784-1234-1234567-1" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div>
                    <Label className="text-sm font-medium mb-2 block">Upload Documents (Optional)</Label>
                    <div className="border-2 border-dashed border-gray-300 rounded-md p-6 text-center">
                      <div className="space-y-2">
                        <div className="flex justify-center">
                          <svg className="h-10 w-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                          </svg>
                        </div>
                        {!uploadedFile ? (
                          <>
                            <p className="text-sm text-gray-600">
                              Upload Emirates ID or Vehicle Registration Card
                            </p>
                            <p className="text-xs text-gray-500">
                              PNG, JPG, or PDF up to 10MB
                            </p>
                          </>
                        ) : (
                          <p className="text-sm text-green-600 font-medium">
                            {uploadedFile} uploaded successfully
                          </p>
                        )}
                        <div className="mt-2">
                          {isUploading ? (
                            <div className="w-full bg-gray-200 rounded-full h-2.5">
                              <div className="bg-red-500 h-2.5 rounded-full w-1/2"></div>
                            </div>
                          ) : (
                            <Button 
                              type="button" 
                              variant="outline"
                              onClick={() => document.getElementById('file-upload')?.click()}
                            >
                              {uploadedFile ? 'Replace File' : 'Select File'}
                            </Button>
                          )}
                          <input 
                            id="file-upload" 
                            type="file" 
                            className="hidden" 
                            accept=".jpg,.jpeg,.png,.pdf"
                            onChange={handleFileUpload}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="agreeTerms"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel className="text-sm">
                            I have read and agree to the{" "}
                            <Dialog>
                              <DialogTrigger asChild>
                                <span className="text-autopro-red cursor-pointer hover:underline">
                                  Extended Warranty Terms and Conditions
                                </span>
                              </DialogTrigger>
                              <DialogContent className="max-w-3xl max-h-[80vh]">
                                <DialogHeader>
                                  <DialogTitle>Terms and Conditions</DialogTitle>
                                  <DialogDescription>
                                    Please read carefully before proceeding
                                  </DialogDescription>
                                </DialogHeader>
                                <ScrollArea className="h-[60vh]">
                                  <div className="p-4 whitespace-pre-line">
                                    {termsContent}
                                  </div>
                                </ScrollArea>
                                <div className="flex justify-end">
                                  <Button
                                    variant="primary"
                                    className="w-full"
                                    onClick={() => {
                                      form.setValue("agreeTerms", true);
                                    }}
                                  >
                                    Accept Terms
                                  </Button>
                                </div>
                              </DialogContent>
                            </Dialog>
                          </FormLabel>
                          <FormMessage />
                        </div>
                      </FormItem>
                    )}
                  />
                  
                  <div className="pt-4">
                    <Button 
                      type="submit"
                      variant="primary"
                      className="w-full"
                    >
                      Proceed to Payment
                    </Button>
                  </div>
                </form>
              </Form>
            </div>
            
            <div className="mt-10 bg-gray-100 rounded-lg p-6 shadow">
              <h3 className="text-xl font-semibold text-autopro-black mb-4">Your Privacy is Important</h3>
              <div className="space-y-3 text-gray-700">
                <p>
                  At ENOC Autopro, we take your privacy seriously. Here's how we handle your personal information:
                </p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Your details are used only for warranty administration and service notifications</li>
                  <li>We maintain industry-standard security measures to protect your information</li>
                  <li>Your payment details are processed through secure, PCI-compliant systems</li>
                  <li>We will never share your information with third parties for marketing purposes</li>
                </ul>
                <p>
                  By proceeding, you consent to the collection and use of your information as described in our{" "}
                  <a href="#" className="text-autopro-red hover:underline">Privacy Policy</a>.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Customer;
