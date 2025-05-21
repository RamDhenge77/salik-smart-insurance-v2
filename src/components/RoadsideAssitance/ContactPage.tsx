import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
// import Navigation from "@/components/Navigation";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { CONTACT_INFO } from "@/lib/data";

export default function ContactPage() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would send the form data
    alert("Contact form submitted!");
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* <Navigation /> */}

      <div className="py-8 px-4 max-w-7xl mx-auto w-full flex-1">
        <h1 className="text-3xl font-bold mb-8 text-[#2596be]">Contact Us</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <h2 className="text-xl font-bold mb-6">Get in Touch</h2>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      First Name
                    </label>
                    <Input placeholder="Enter your first name" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Last Name
                    </label>
                    <Input placeholder="Enter your last name" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Email</label>
                  <Input type="email" placeholder="Enter your email" />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Phone
                  </label>
                  <Input placeholder="Enter your phone number" />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Message
                  </label>
                  <Textarea
                    placeholder="How can we help you?"
                    className="min-h-[120px]"
                  />
                </div>

                <Button
                  type="submit"
                  variant="primary"
                  className="w-full"
                >
                  Submit
                </Button>
              </form>
            </div>
          </div>

          <div className="space-y-8">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold mb-6">Contact Information</h2>

              <div className="space-y-4">
                <div className="flex">
                  <div className="mr-4">
                    <MapPin className="h-5 w-5 text-salik-gray-600" />
                  </div>
                  <div>
                    <h3 className="font-medium">Address</h3>
                    <p className="text-salik-gray-600">{CONTACT_INFO.address}</p>
                  </div>
                </div>

                <div className="flex">
                  <div className="mr-4">
                    <Phone className="h-5 w-5 text-salik-gray-600" />
                  </div>
                  <div>
                    <h3 className="font-medium">Phone</h3>
                    <p className="text-salik-gray-600">{CONTACT_INFO.phone}</p>
                  </div>
                </div>

                <div className="flex">
                  <div className="mr-4">
                    <Mail className="h-5 w-5 text-salik-gray-600" />
                  </div>
                  <div>
                    <h3 className="font-medium">Email</h3>
                    <p className="text-salik-gray-600">{CONTACT_INFO.email}</p>
                  </div>
                </div>

                <div className="flex">
                  <div className="mr-4">
                    <Clock className="h-5 w-5 text-salik-gray-600" />
                  </div>
                  <div>
                    <h3 className="font-medium">Hours</h3>
                    <p className="text-salik-gray-600">{CONTACT_INFO.hours}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="h-64 bg-salik-gray-100">
                {/* Placeholder for Google Map */}
                <div className="w-full h-full flex items-center justify-center bg-salik-gray-100">
                  <MapPin className="h-8 w-8 text-salik-gray-600 mb-2" />
                  <p className="ml-2 text-salik-gray-600">Map would appear here</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <footer className="bg-salik-gray-50 py-6">
        <div className="max-w-7xl mx-auto px-4 text-center text-salik-gray-600">
          <p>&copy; {new Date().getFullYear()} Salik. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
