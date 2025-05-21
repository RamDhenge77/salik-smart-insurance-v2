import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useFinance } from "@/context/FinanceContext";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useCarContext } from "@/context/Context";
import CarFinanceCalculator from "./CarFinanceCalculator";

// Form schema with validation
const formSchema = z.object({
  fullName: z
    .string()
    .min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  phone: z.string().min(8, { message: "Please enter a valid phone number." }),
  termsAccepted: z.boolean().refine((val) => val === true, {
    message: "You must accept the terms and conditions.",
  }),
});

const ApplicationFormContent = () => {
  const navigate = useNavigate();
  const { setPersonalInfo } = useFinance();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { handleCarFinancingNext } = useCarContext();

  // Initialize form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      termsAccepted: false,
    },
  });

  // Form submission handler
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    try {
      // Save form data to context
      setPersonalInfo({
        firstName: values.fullName.split(" ")[0] || values.fullName,
        lastName: values.fullName.split(" ").slice(1).join(" ") || "",
        email: values.email,
        mobile: values.phone,
        income: 0, // Default value, will be updated in the next step
        emirates: "", // Default value, will be updated in the next step
      });

      // Navigate to the next step
      // navigate("/apply");
      handleCarFinancingNext(); // Call the function to move to the next step
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <CarFinanceCalculator />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[#4F5063]">Full Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your full name"
                    {...field}
                    className="border-[#95c7dc] focus-visible:ring-[#95c7dc]"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[#4F5063]">Email Address</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="Enter your email address"
                    {...field}
                    className="border-[#95c7dc] focus-visible:ring-[#95c7dc]"
                  />
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
                <FormLabel className="text-[#4F5063]">Phone Number</FormLabel>
                <FormControl>
                  <Input
                    type="tel"
                    placeholder="Enter your phone number"
                    {...field}
                    className="border-[#95c7dc] focus-visible:ring-[#95c7dc]"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="termsAccepted"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center space-x-3 space-y-0 p-1">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={(checked) => field.onChange(checked)}
                    className="border-[#95c7dc] data-[state=checked]:bg-[#95c7dc] data-[state=checked]:border-[#95c7dc]"
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel className="text-[#4F5063] text-sm font-normal">
                    I agree to the terms and conditions
                  </FormLabel>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-[#95c7dc] hover:bg-[#e2eff9] text-[#4F5063] font-semibold"
          >
            {isSubmitting ? "Processing..." : "Continue"}
          </Button>
        </form>
      </Form>
    </>
  );
};

export default ApplicationFormContent;
