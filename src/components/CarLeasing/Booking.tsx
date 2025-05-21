import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import BookingSteps from "./BookingSteps";
import { Calendar } from "@/components/ui/calendar";
import { carLeasingData } from "@/data/car";
import { LeaseFormState, BookingStep } from "@/types/carLeasing";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { toast } from "@/hooks/use-toast";
import FileUpload from "./FileUpload";
import { useCarContext } from "@/context/Context";

const bookingSteps: BookingStep[] = [
  {
    id: "select-car",
    title: "Select Car",
    description: "Choose your preferred car",
  },
  {
    id: "lease-details",
    title: "Lease Details",
    description: "Configure your lease",
  },
  {
    id: "personal-info",
    title: "Personal Info",
    description: "Enter your details",
  },
  {
    id: "documents",
    title: "Documents",
    description: "Upload required documents",
  },
  { id: "payment", title: "Payment", description: "Complete booking" },
];

const Booking = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  // const carId = query.get("carId");
  const {
    carLeasingId: carId,
    setCarLeasingSteps,
    handleCarLeasingBack,
  } = useCarContext();

  const [currentStep, setCurrentStep] = useState(
    carId ? "lease-details" : "select-car"
  );

  const [formState, setFormState] = useState<LeaseFormState>({
    carType: "all",
    leaseTerm: 6,
    budget: 2000,
    includeInsurance: true,
    includeMaintenance: false,
    mileageCap: 2500,
    selectedCarId: carId || undefined,
    customerName: "",
    email: "",
    phone: "",
    pickupDate: undefined,
    emiratesIdFile: null,
    licenseFile: null,
    salaryCertificateFile: null,
  });

  const [availableCars, setAvailableCars] = useState(carLeasingData);

  useEffect(() => {
    // Filter cars based on formState
    if (currentStep === "select-car") {
      let filtered = [...carLeasingData];

      if (formState.carType && formState.carType !== "all") {
        filtered = filtered.filter((car) => car.type === formState.carType);
      }

      // Filter by budget
      filtered = filtered.filter((car) => {
        let totalPrice = car.monthlyPrice;
        if (formState.includeInsurance) totalPrice += 300;
        if (formState.includeMaintenance) totalPrice += 200;

        return totalPrice <= formState.budget;
      });

      setAvailableCars(filtered);
    }
  }, [formState, currentStep]);

  const selectedCar = formState.selectedCarId
    ? carLeasingData.find((car) => car.id === formState.selectedCarId)
    : undefined;

  const calculateTotalMonthly = () => {
    if (!selectedCar) return 0;

    let total = selectedCar.monthlyPrice;
    if (formState.includeInsurance) total += 300;
    if (formState.includeMaintenance) total += 200;

    return total;
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target as HTMLInputElement;

    if (type === "checkbox") {
      const { checked } = e.target as HTMLInputElement;
      setFormState((prev) => ({ ...prev, [name]: checked }));
    } else if (type === "number") {
      setFormState((prev) => ({ ...prev, [name]: Number(value) }));
    } else {
      setFormState((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSelectCar = (carId: string) => {
    setFormState((prev) => ({ ...prev, selectedCarId: carId }));
    setCurrentStep("lease-details");
  };

  const nextStep = () => {
    const currentIndex = bookingSteps.findIndex(
      (step) => step.id === currentStep
    );

    if (currentIndex < bookingSteps.length - 1) {
      setCurrentStep(bookingSteps[currentIndex + 1].id);
    } else {
      // Final step - complete booking process
      handleBookingComplete();
    }
  };

  const prevStep = () => {
    const currentIndex = bookingSteps.findIndex(
      (step) => step.id === currentStep
    );

    if (currentIndex > 0) {
      setCurrentStep(bookingSteps[currentIndex - 1].id);
    }
  };

  const handleBookingComplete = () => {
    toast({
      title: "Booking Confirmed!",
      description: "Your car lease has been successfully processed.",
    });

    // navigate("/booking-confirmation");
    setCarLeasingSteps(5);
  };

  // Validate current step
  const isCurrentStepValid = () => {
    switch (currentStep) {
      case "select-car":
        return !!formState.selectedCarId;
      case "lease-details":
        return formState.leaseTerm > 0;
      case "personal-info":
        return (
          formState.customerName.trim() !== "" &&
          formState.email.includes("@") &&
          formState.phone.trim() !== "" &&
          formState.pickupDate !== undefined
        );
      case "documents":
        return (
          formState.emiratesIdFile !== null &&
          formState.licenseFile !== null &&
          formState.salaryCertificateFile !== null
        );
      case "payment":
        return true; // Payment validation would be handled by a payment processor
      default:
        return false;
    }
  };

  // Render appropriate step content
  const renderStepContent = () => {
    switch (currentStep) {
      case "select-car":
        return (
          <div>
            <h2 className="text-2xl font-bold mb-6">Select a Car</h2>

            <div className="mb-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <Label htmlFor="carType">Car Type</Label>
                  <select
                    id="carType"
                    name="carType"
                    className="w-full p-2 mt-1 border rounded-md"
                    value={formState.carType}
                    onChange={handleInputChange}
                  >
                    <option value="all">All Types</option>
                    <option value="economy">Economy</option>
                    <option value="sedan">Sedan</option>
                    <option value="suv">SUV</option>
                    <option value="luxury">Luxury</option>
                  </select>
                </div>

                <div>
                  <Label htmlFor="budget">Monthly Budget (AED)</Label>
                  <Input
                    id="budget"
                    type="number"
                    name="budget"
                    min={500}
                    max={10000}
                    value={formState.budget}
                    onChange={handleInputChange}
                    className="mt-1"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="flex items-center space-x-2">
                  <Switch
                    id="includeInsurance"
                    name="includeInsurance"
                    checked={formState.includeInsurance}
                    onCheckedChange={(checked) =>
                      setFormState((prev) => ({
                        ...prev,
                        includeInsurance: checked,
                      }))
                    }
                  />
                  <Label htmlFor="includeInsurance">
                    Include Insurance (+AED 300/month)
                  </Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    id="includeMaintenance"
                    name="includeMaintenance"
                    checked={formState.includeMaintenance}
                    onCheckedChange={(checked) =>
                      setFormState((prev) => ({
                        ...prev,
                        includeMaintenance: checked,
                      }))
                    }
                  />
                  <Label htmlFor="includeMaintenance">
                    Include Maintenance (+AED 200/month)
                  </Label>
                </div>
              </div>
            </div>

            <Separator className="my-6" />

            <div className="mb-4">
              <h3 className="text-lg font-semibold mb-2">Available Cars</h3>
              {availableCars.length === 0 ? (
                <p className="text-gray-500">
                  No cars match your criteria. Please adjust your filters.
                </p>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {availableCars.map((car) => (
                    <div
                      key={car.id}
                      className={cn(
                        "border rounded-md p-4 cursor-pointer hover:border-primary transition-colors",
                        formState.selectedCarId === car.id
                          ? "border-primary bg-primary/5"
                          : ""
                      )}
                      onClick={() => handleSelectCar(car.id)}
                    >
                      <div className="h-32 bg-gray-100 mb-3 rounded flex items-center justify-center overflow-hidden">
                        <img
                          src={car.image}
                          alt={`${car.brand} ${car.model}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <h4 className="font-semibold">
                        {car.brand} {car.model}
                      </h4>
                      <div className="text-sm text-gray-500 mb-2">
                        {car.year} · {car.engineSize}
                      </div>
                      <div className="font-bold text-primary">
                        AED {car.monthlyPrice}/month
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        );

      case "lease-details":
        return (
          <div>
            <h2 className="text-2xl font-bold mb-6">Lease Details</h2>

            {selectedCar ? (
              <div className="mb-6 grid md:grid-cols-2 gap-6">
                <div className="border rounded-md p-4">
                  <div className="flex items-center mb-4">
                    <div className="h-20 w-20 bg-gray-100 rounded overflow-hidden mr-4">
                      <img
                        src={selectedCar.image}
                        alt={`${selectedCar.brand} ${selectedCar.model}`}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="font-semibold">
                        {selectedCar.brand} {selectedCar.model}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {selectedCar.year} · {selectedCar.engineSize}
                      </p>
                      <p className="font-bold text-primary mt-1">
                        AED {selectedCar.monthlyPrice}/month
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => setCurrentStep("select-car")}
                    className="text-sm text-primary hover:underline"
                  >
                    Change Car
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label htmlFor="leaseTerm">Lease Term (months)</Label>
                    <select
                      id="leaseTerm"
                      name="leaseTerm"
                      className="w-full p-2 mt-1 border rounded-md"
                      value={formState.leaseTerm}
                      onChange={handleInputChange}
                    >
                      <option value={3}>3 Months</option>
                      <option value={6}>6 Months</option>
                      <option value={12}>12 Months</option>
                      <option value={24}>24 Months</option>
                    </select>
                  </div>

                  <div>
                    <Label htmlFor="mileageCap">Monthly Mileage Cap</Label>
                    <select
                      id="mileageCap"
                      name="mileageCap"
                      className="w-full p-2 mt-1 border rounded-md"
                      value={formState.mileageCap}
                      onChange={handleInputChange}
                    >
                      <option value={1500}>1,500 km</option>
                      <option value={2500}>2,500 km</option>
                      <option value={3500}>3,500 km</option>
                      <option value={5000}>5,000 km (Unlimited)</option>
                    </select>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Switch
                      id="includeInsurance"
                      name="includeInsurance"
                      checked={formState.includeInsurance}
                      onCheckedChange={(checked) =>
                        setFormState((prev) => ({
                          ...prev,
                          includeInsurance: checked,
                        }))
                      }
                      className={
                        formState.includeInsurance ? "!bg-btn-primary" : ""
                      }
                    />
                    <Label htmlFor="includeInsurance">
                      Include Insurance (+AED 300/month)
                    </Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Switch
                      id="includeMaintenance"
                      name="includeMaintenance"
                      checked={formState.includeMaintenance}
                      onCheckedChange={(checked) =>
                        setFormState((prev) => ({
                          ...prev,
                          includeMaintenance: checked,
                        }))
                      }
                      className={
                        formState.includeMaintenance ? "!bg-btn-primary" : ""
                      }
                    />
                    <Label htmlFor="includeMaintenance">
                      Include Maintenance (+AED 200/month)
                    </Label>
                  </div>
                </div>
              </div>
            ) : (
              <p className="text-yellow-600 mb-6">Please select a car first.</p>
            )}

            <Separator className="my-6" />

            <div className="bg-gray-50 p-4 rounded-md">
              <h3 className="font-semibold mb-2">Monthly Payment Summary</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Base Lease:</span>
                  <span>AED {selectedCar?.monthlyPrice || 0}</span>
                </div>

                <div className="flex justify-between">
                  <span>Insurance:</span>
                  <span>{formState.includeInsurance ? "AED 300" : "-"}</span>
                </div>

                <div className="flex justify-between">
                  <span>Maintenance:</span>
                  <span>{formState.includeMaintenance ? "AED 200" : "-"}</span>
                </div>

                <Separator />

                <div className="flex justify-between font-bold">
                  <span>Total Monthly:</span>
                  <span className="text-primary">
                    AED {calculateTotalMonthly()}
                  </span>
                </div>

                <div className="flex justify-between text-sm text-gray-500">
                  <span>Total for {formState.leaseTerm} months:</span>
                  <span>
                    AED {calculateTotalMonthly() * formState.leaseTerm}
                  </span>
                </div>
              </div>
            </div>
          </div>
        );

      case "personal-info":
        return (
          <div>
            <h2 className="text-2xl font-bold mb-6">Personal Information</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="customerName">Full Name</Label>
                  <Input
                    id="customerName"
                    name="customerName"
                    value={formState.customerName}
                    onChange={handleInputChange}
                    placeholder="Enter your full name"
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formState.email}
                    onChange={handleInputChange}
                    placeholder="Enter your email"
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    name="phone"
                    value={formState.phone}
                    onChange={handleInputChange}
                    placeholder="Enter your phone number"
                    className="mt-1"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex flex-col space-y-1">
                  <Label htmlFor="pickupDate">Pickup Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        id="pickupDate"
                        variant={"outline"}
                        className={cn(
                          "w-full justify-start text-left font-normal hover:bg-[#6cd0f585]",
                          !formState.pickupDate && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {formState.pickupDate ? (
                          format(formState.pickupDate, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={formState.pickupDate}
                        onSelect={(date) =>
                          setFormState((prev) => ({
                            ...prev,
                            pickupDate: date,
                          }))
                        }
                        disabled={(date) => {
                          const today = new Date();
                          return date < today;
                        }}
                        initialFocus
                        className={cn("p-3 pointer-events-auto")}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
            </div>
          </div>
        );

      case "documents":
        return (
          <div>
            <h2 className="text-2xl font-bold mb-2">Required Documents</h2>
            <p className="text-gray-500 mb-6">
              Please upload clear copies or photos of the following documents:
            </p>

            <div className="space-y-8">
              <FileUpload
                label="Emirates ID (front and back)"
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={(file) =>
                  setFormState((prev) => ({ ...prev, emiratesIdFile: file }))
                }
              />

              <FileUpload
                label="Driving License (UAE license)"
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={(file) =>
                  setFormState((prev) => ({ ...prev, licenseFile: file }))
                }
              />

              <FileUpload
                label="Proof of Salary / Income"
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={(file) =>
                  setFormState((prev) => ({
                    ...prev,
                    salaryCertificateFile: file,
                  }))
                }
              />
            </div>
          </div>
        );

      case "payment":
        return (
          <div>
            <h2 className="text-2xl font-bold mb-6">Complete Your Booking</h2>

            <div className="bg-gray-50 p-6 rounded-md mb-8">
              <h3 className="font-semibold mb-4 pb-2 border-b">
                Booking Summary
              </h3>

              <div className="space-y-4">
                {selectedCar && (
                  <div className="flex items-start">
                    <div className="h-16 w-16 bg-gray-200 rounded overflow-hidden mr-4">
                      <img
                        src={selectedCar.image}
                        alt={`${selectedCar.brand} ${selectedCar.model}`}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="font-medium">
                        {selectedCar.brand} {selectedCar.model}
                      </h4>
                      <p className="text-sm text-gray-500">
                        {selectedCar.year} · {selectedCar.engineSize}
                      </p>
                    </div>
                  </div>
                )}

                <Separator />

                <div className="grid grid-cols-2 gap-2 text-sm">
                  <span className="text-gray-600">Lease Term:</span>
                  <span>{formState.leaseTerm} months</span>

                  <span className="text-gray-600">Mileage Cap:</span>
                  <span>{formState.mileageCap} km/month</span>

                  <span className="text-gray-600">Insurance:</span>
                  <span>
                    {formState.includeInsurance ? "Included" : "Not included"}
                  </span>

                  <span className="text-gray-600">Maintenance:</span>
                  <span>
                    {formState.includeMaintenance ? "Included" : "Not included"}
                  </span>
                </div>

                <Separator />

                <div className="font-medium">
                  <div className="flex justify-between mb-2">
                    <span>First Month Payment:</span>
                    <span>AED {calculateTotalMonthly()}</span>
                  </div>
                  <div className="flex justify-between text-primary font-bold">
                    <span>Security Deposit:</span>
                    <span>AED {selectedCar?.monthlyPrice || 0}</span>
                  </div>
                </div>

                <Separator />

                <div className="flex justify-between font-bold text-lg">
                  <span>Total Due Now:</span>
                  <span>
                    AED{" "}
                    {calculateTotalMonthly() + (selectedCar?.monthlyPrice || 0)}
                  </span>
                </div>
              </div>
            </div>

            <div className="border rounded-md p-6">
              <h3 className="font-semibold mb-4">Payment Method</h3>

              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="cardName">Name on Card</Label>
                    <Input
                      id="cardName"
                      placeholder="Enter the name on your card"
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="cardNumber">Card Number</Label>
                    <Input
                      id="cardNumber"
                      placeholder="1234 5678 9012 3456"
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="expiryDate">Expiry Date</Label>
                    <Input
                      id="expiryDate"
                      placeholder="MM/YY"
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="cvv">CVV</Label>
                    <Input id="cvv" placeholder="123" className="mt-1" />
                  </div>
                </div>

                <div className="pt-4">
                  <div className="flex items-center space-x-2 mb-4">
                    <input
                      type="checkbox"
                      id="terms"
                      className="rounded text-primary focus:ring-primary checked:bg-btn-primary"
                    />
                    <Label htmlFor="terms" className="text-sm">
                      I agree to the{" "}
                      <a href="#" className="text-primary hover:underline">
                        terms and conditions
                      </a>
                    </Label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow bg-gray-50">
        <div
          className="text-primary hover:underline cursor-pointer mt-5 mx-4"
          onClick={() => handleCarLeasingBack()}
        >
          &larr; Back
        </div>
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-8">Book Your Car</h1>

          <BookingSteps steps={bookingSteps} currentStepId={currentStep} />

          <div className="bg-white rounded-lg shadow-md p-6 mt-8">
            {renderStepContent()}

            <div className="flex justify-between mt-8">
              <Button
                variant="secondary"
                onClick={prevStep}
                disabled={currentStep === bookingSteps[0].id}
              >
                Back
              </Button>

              <Button
                variant="primary"
                onClick={nextStep}
                disabled={!isCurrentStepValid()}
                className=""
              >
                {currentStep === "payment" ? "Complete Booking" : "Continue"}
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Booking;
