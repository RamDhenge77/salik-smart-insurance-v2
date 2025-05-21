import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Car } from "../BuyCar";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { toast } from "../ui/use-toast";

interface CarPurchaseModalProps {
  car: Car | null;
  isOpen: boolean;
  onClose: () => void;
}

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  phone: z.string().min(10, {
    message: "Phone number must be at least 10 digits.",
  }),
  message: z.string().optional(),
});

export const CarPurchaseModal: React.FC<CarPurchaseModalProps> = ({
  car,
  isOpen,
  onClose,
}) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log("Purchase request submitted:", { car, ...values });
    
    // Display success toast
    toast({
      title: "Purchase request sent!",
      description: "The seller will contact you soon.",
    });
    
    // Reset the form
    form.reset();
    
    // Close the modal
    onClose();
  };

  if (!car) return null;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-2xl">Purchase Request</DialogTitle>
          <DialogDescription>
            Submit your details to request a purchase of {car.make} {car.model}.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col sm:flex-row gap-4 py-4">
          <div className="w-full sm:w-1/3">
            <img
              src={car.image || "/placeholder.svg"}
              alt={`${car.make} ${car.model}`}
              className="w-full h-auto rounded-md object-cover"
            />
          </div>
          <div className="w-full sm:w-2/3">
            <h3 className="text-lg font-semibold">{car.make} {car.model}</h3>
            <p className="text-xl font-bold text-[#2596be] flex gap-1 items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              id="UaeDirham"
              viewBox="0 0 1500 1500"
              className="h-5 w-5"
            >
              <path
                d="M474.94,1272.7H263.1a39.35,39.35,0,0,1-5-.1c-2.06-.28-3.18-1.34-1.43-3.29,30.93-34.3,40.49-76.77,46.14-120.72a396.09,396.09,0,0,0,2.84-49.77c.1-61.34,0-122.67.21-184,0-6.25-1.5-8.13-7.89-8-17.58.45-35.19.13-52.78.13-40.31,0-67-21-84.8-55.34-12-23.24-12-48.5-11.7-73.76,0-1.12-.22-2.59,1.23-3,1.65-.48,2.5,1,3.48,2,9,8.43,18.42,16.22,30.17,20.64a70.72,70.72,0,0,0,25,4.81c30,0,59.92-.12,89.87.13,5.54.05,7.4-1.3,7.34-7.13q-.42-44.92,0-89.86c.05-5.83-1.42-7.8-7.51-7.67-18.29.38-36.61.14-54.91.13-32.64,0-57-15.23-75-41.5-13.39-19.53-19.37-41.47-19.5-65.07,0-6.42-.17-12.84,0-19.25,0-2.16-1.54-5.44,1.28-6.25,2.06-.59,3.81,2.23,5.45,3.85,15.48,15.3,33.68,23.77,55.86,23.51,29.24-.34,58.49-.18,87.73,0,4.83,0,6.59-1.14,6.57-6.33-.31-65.37.28-130.75-.76-196.11-.71-44.65-8.34-88.23-28-129C271.89,251,265.14,241.34,257.92,232c-.82-1.07-2.76-1.71-2.19-3.26.71-1.91,2.76-1.4,4.39-1.4h8.56c127.91,0,255.82-.3,383.72.28,68.37.31,135.65,9.48,201.41,28.89,68,20.08,130,51.63,183.75,98.14,40.35,34.89,72.29,76.62,97,123.88a480.21,480.21,0,0,1,40.62,108.14c1.17,4.76,3.1,6.55,8.17,6.49,24-.24,48-.09,72,0,40.69.09,67.08,21.68,84.58,56.46,11.39,22.63,11.7,47.07,11.47,71.58,0,1.38.23,3.14-1.37,3.73-1.83.67-3-.82-4.16-2-8.21-8.33-17.39-15.22-28.3-19.73a67.66,67.66,0,0,0-25.65-5.26c-30.67-.12-61.34.08-92-.15-5.55,0-7.34,1.23-7,7.14a652.48,652.48,0,0,1,.07,89.75c-.48,6.85,1.8,7.87,7.79,7.75,17.11-.35,34.27.58,51.34-.24,46.19-2.24,80.8,30.71,93.43,70.73,6,19.15,5.81,38.77,5.64,58.45,0,1.13.51,2.59-1,3-1.92.54-3-1.18-4.15-2.25-8.74-8.43-18-16-29.58-20.36a66.74,66.74,0,0,0-23.55-4.75c-35.9-.07-71.8.06-107.7-.16-5.61,0-8,1.26-9.52,7.3-15.24,62.19-40.35,119.89-79.14,171.26s-87.42,91.1-144.44,120.61c-69.73,36.08-144.55,54.11-222.2,62.14-35,3.62-70.11,4.73-105.28,4.68q-74.9-.09-149.78,0ZM730.42,593.1V593q130.47,0,260.94.14c6.18,0,7.71-1.5,6.56-7.56-10.22-53.87-25.85-105.75-54.15-153.27-29.61-49.73-70.07-87.68-122-113.16C768.42,293,711.22,282.73,652.46,280.59c-60.56-2.22-121.18-.39-181.78-1-6.71-.07-8.21,1.89-8.19,8.33q.3,148.64,0,297.28c0,7,2.24,8.05,8.43,8Q600.66,592.95,730.42,593.1Zm.2,313.92V907q-130.15,0-260.3-.16c-6.38,0-7.83,1.7-7.82,7.93.21,95.32.12,190.63.22,286,0,6.31-2.84,14.49,1.35,18.46s12.26,1.26,18.6,1.17c60.34-.9,120.73,2.48,181-2.27,52-4.1,102.31-14.82,149.78-37,50.4-23.59,91.3-58.27,122.21-104.71,33-49.6,50.79-104.94,62.06-162.82,1.1-5.67-.69-6.6-6.1-6.59Q861.13,907.16,730.62,907Zm5.48-104.68v-.21c88.65,0,177.3-.09,265.95.19,6.38,0,8.23-1.78,8.36-7.71q1-44.91,0-89.8c-.13-5.47-1.76-7.17-7.47-7.16q-265.95.27-531.9,0c-7.12,0-8.6,2.25-8.52,8.88.34,28.75.17,57.51.16,86.26,0,9.54-.05,9.53,9.66,9.53Z"
                fill="#2596be"
                className="color060606 svgShape"
              ></path>
            </svg>
            {formatCurrency(car.price)}
          </p>
            <div className="text-sm space-y-1">
              <p><strong>Year:</strong> {car.year}</p>
              <p><strong>Mileage:</strong> {car.mileage.toLocaleString()} miles</p>
              <p><strong>Fuel Type:</strong> {car.fuelType}</p>
              <p><strong>Transmission:</strong> {car.transmission}</p>
              <p><strong>Location:</strong> {car.location}</p>
              <p><strong>Seller:</strong> {car.seller}</p>
            </div>
          </div>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="John Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="john@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone</FormLabel>
                    <FormControl>
                      <Input placeholder="+971 XX XXX XXXX" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Message (Optional)</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="I'm interested in this car and would like to schedule a test drive..."
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button type="button" variant="outline" onClick={onClose} className="hover:bg-gray-100">
                Cancel
              </Button>
              <Button type="submit" className="bg-[#2596be] hover:bg-[#2b7f9e]">
                Submit Request
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};