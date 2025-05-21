import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Lock, Mail, DollarSign, Calendar, CreditCard } from "lucide-react";
// import Layout from "@/components/Layout";
import { useFinance } from "@/context/FinanceContext";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/components/ui/use-toast";
import { useCarContext } from "@/context/Context";

const formSchema = z.object({
  firstName: z.string().min(2, {
    message: "First name must be at least 2 characters.",
  }),
  lastName: z.string().min(2, {
    message: "Last name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  mobile: z.string().min(10, {
    message: "Mobile number must be at least 10 digits.",
  }),
  company: z.string().optional(),
  income: z.coerce.number().min(3000, {
    message: "Monthly income must be at least 3,000 AED.",
  }),
  emirates: z.string({
    required_error: "Please select your emirate.",
  }),
  termsAccepted: z.boolean().refine((val) => val === true, {
    message: "You must accept the terms and conditions.",
  }),
});

const ApplicationForm = () => {
  const navigate = useNavigate();
  const { setPersonalInfo } = useFinance();
  const { toast } = useToast();
  const { handleCarFinancingNext } = useCarContext();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      mobile: "",
      company: "",
      income: undefined,
      emirates: "",
      termsAccepted: false,
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    // Store the form data in context
    setPersonalInfo({
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      mobile: values.mobile,
      company: values.company,
      income: values.income,
      emirates: values.emirates,
    });

    // Show success message
    toast({
      title: "Application submitted",
      description:
        "Your personal details have been saved. Let's continue to the next step.",
    });

    // Navigate to eligibility check
    // navigate("/eligibility");
    handleCarFinancingNext(); // Call the function to move to the next step
  };

  return (
    // <Layout fullWidth>
    <div className="flex flex-col lg:flex-row min-h-screen">
      {/* Left section with marketing content */}
      <div className="w-full lg:w-1/2 bg-finance-sand p-8 lg:p-16">
        <div className="max-w-2xl mx-auto lg:ml-auto lg:mr-0">
          <h1 className="text-3xl md:text-4xl font-bold text-[#4F5063] mb-4">
            Make this summer memorable by driving home your dream car.
          </h1>

          <p className="text-base mb-8 text-[#4F5063]">
            Own the car of your choice with our exclusive Auto Finance offers.
            Enjoy competitive profit rates, payment holidays, flexible payment
            plans and much more, to make your dream car a reality.
          </p>

          <h2 className="text-2xl font-bold text-[#4F5063] mb-6">
            Choose Emirates Islamic Auto Finance and enjoy exclusive benefits
          </h2>

          <div className="space-y-8 mb-8">
            {/* Benefit 1 */}
            <div className="border border-[#e2e2e2] bg-white rounded-lg p-6 flex items-start">
              <div className="mr-4 bg-[#f0f9fc] rounded-full p-3">
                <DollarSign className="h-8 w-8 text-[#95c7dc]" />
              </div>
              <div>
                <p className="text-[#4F5063] font-medium">
                  Profit rates* starting from 1.89% flat p.a. (equivalent to
                  3.61% reducing profit rate p.a.) for UAE Nationals and 2.10%
                  flat p.a. (equivalent to 4% reducing profit rate p.a.) for
                  Expatriates
                </p>
              </div>
            </div>

            {/* Benefit 2 */}
            <div className="border border-[#e2e2e2] bg-white rounded-lg p-6 flex items-start">
              <div className="mr-4 bg-[#f0f9fc] rounded-full p-3">
                <Calendar className="h-8 w-8 text-[#95c7dc]" />
              </div>
              <div>
                <p className="text-[#4F5063] font-medium">
                  Payment holiday of up to 6 months for UAE Nationals and up to
                  4 months for Expatriates**
                </p>
              </div>
            </div>

            {/* Benefit 3 */}
            <div className="border border-[#e2e2e2] bg-white rounded-lg p-6 flex items-center">
              <div className="mr-4 bg-[#f0f9fc] rounded-full p-3">
                <CreditCard className="h-8 w-8 text-[#95c7dc]" />
              </div>
              <div>
                <p className="text-[#4F5063] font-medium">
                  Special Discounts for Salik Customers
                </p>
              </div>
            </div>
          </div>

          <div className="text-[#4F5063] mb-2">
            <p className="font-medium">Offer valid until 31 May 2025</p>
          </div>
          <div className="text-[#4F5063] text-sm">
            <p>Salik is not a financial institution, bank, or licensed financial advisor. Provided Information are general purposes only and should not be construed as financial advice.</p>
          </div>
        </div>
      </div>

      {/* Right section with application form */}
      <div className="w-full lg:w-1/2 bg-white p-8 lg:p-0">
        <div className="max-w-xl mx-auto lg:mx-0 lg:max-w-none h-full">
          <div className="bg-bgLight   rounded-lg shadow-md p-8 h-full">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center text-[#2596be] font-bold text-2xl">
                <Mail className="h-8 w-8 mr-2" />
                Apply Now
              </div>
              <div className="flex items-center text-[#4F5063]">
                <Lock className="h-4 w-4 mr-1" />
                <span className="text-sm">This form is secure.</span>
              </div>
            </div>

            <p className="text-[#4F5063] mb-6">
              Please fill in the form below and a member of our team will
              contact you personally.
            </p>

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            placeholder="First Name *"
                            className="border-[#95c7dc] focus-visible:ring-[#95c7dc]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            placeholder="Last Name*"
                            className="border-[#95c7dc] focus-visible:ring-[#95c7dc]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          placeholder="Email *"
                          className="border-[#95c7dc] focus-visible:ring-[#95c7dc]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="mobile"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            placeholder="Mobile* (05x xxx xxxx)"
                            className="border-[#95c7dc] focus-visible:ring-[#95c7dc]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="company"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            placeholder="Company Name"
                            className="border-[#95c7dc] focus-visible:ring-[#95c7dc]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="emirates"
                    render={({ field }) => (
                      <FormItem>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="border-[#95c7dc] focus-visible:ring-[#95c7dc]">
                              <SelectValue placeholder="-Select-Emirates-" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="abu-dhabi">Abu Dhabi</SelectItem>
                            <SelectItem value="dubai">Dubai</SelectItem>
                            <SelectItem value="sharjah">Sharjah</SelectItem>
                            <SelectItem value="ajman">Ajman</SelectItem>
                            <SelectItem value="umm-al-quwain">
                              Umm Al Quwain
                            </SelectItem>
                            <SelectItem value="fujairah">Fujairah</SelectItem>
                            <SelectItem value="ras-al-khaimah">
                              Ras Al Khaimah
                            </SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="income"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="Monthly Income (AED)*"
                            className="border-[#95c7dc] focus-visible:ring-[#95c7dc]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="termsAccepted"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          className="border-[#95c7dc] data-[state=checked]:bg-[#95c7dc] data-[state=checked]:border-[#95c7dc]"
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <label className="text-sm font-normal text-[#4F5063] cursor-pointer">
                          I agree to the{" "}
                          <a href="#" className="text-[#4d2c7d] underline">
                            Terms and Conditions
                          </a>
                          .
                        </label>
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />

                <div className="pt-4">
                  <Button
                    variant="primary"
                    type="submit"
                    className="w-full py-6 text-base"
                  >
                    Submit
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </div>
    // </Layout>
  );
};

export default ApplicationForm;
