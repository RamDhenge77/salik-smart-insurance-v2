import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, CalendarDays, CheckCircle, Car, ShieldCheck, MapPin, Clock, Wrench, AlertCircle } from "lucide-react";

import { Button } from '../ui/button';

interface Props {
  setGetWarranty: React.Dispatch<React.SetStateAction<number>>;
}

const features = [
  {
    icon: <ShieldCheck className="h-10 w-10 text-autopro-red" />,
    title: "Comprehensive Coverage",
    description: "Protection for all major mechanical, electrical, and electronic components with no hidden exclusions."
  },
  {
    icon: <MapPin className="h-10 w-10 text-autopro-red" />,
    title: "Nationwide Coverage",
    description: "Access to service centers across all emirates in the UAE for convenient repairs wherever you are."
  },
  {
    icon: <Car className="h-10 w-10 text-autopro-red" />,
    title: "Transferable Protection",
    description: "Warranty can be transferred to a new owner, enhancing your vehicle's resale value."
  },
  {
    icon: <Clock className="h-10 w-10 text-autopro-red" />,
    title: "Quick Claims Process",
    description: "Streamlined claims process with minimal paperwork and fast approval for covered repairs."
  },
  {
    icon: <Wrench className="h-10 w-10 text-autopro-red" />,
    title: "Certified Technicians",
    description: "Repairs performed by ENOC Autopro's expert technicians using quality parts and equipment."
  },
  {
    icon: <AlertCircle className="h-10 w-10 text-autopro-red" />,
    title: "Peace of Mind",
    description: "Drive confidently knowing you're protected against unexpected repair costs and breakdowns."
  }
];

const testimonials = [
  {
    name: "Ahmed Al Mansoori",
    role: "Toyota Camry Owner",
    content: "The extended warranty saved me thousands when my transmission unexpectedly failed. The claims process was simple, and repairs were completed within days. Highly recommend!",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg"
  },
  {
    name: "Sara Johnson",
    role: "Nissan Patrol Owner",
    content: "I was skeptical about extended warranties, but ENOC Autopro has proven their value. When my A/C system failed in summer, they fixed it without any hassle.",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg"
  },
  {
    name: "Mohammed Hassan",
    role: "Honda Accord Owner",
    content: "After a major electrical issue, my warranty covered everything including parts and labor. The service center was professional and kept me updated throughout the repair process.",
    avatar: "https://randomuser.me/api/portraits/men/28.jpg"
  }
];

const GetWarranty = ({ setGetWarranty } : Props) => {
  return (
    <div className="">
      {/* Hero Section */}
      <section className="warranty-hero-pattern">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center py-16 md:py-24">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                Drive Worry-Free with ENOC Autopro Extended Warranty
              </h1>
              <p className="text-lg text-gray-300 mb-6">
                Protect your vehicle against unforeseen mechanical, electrical, and electronic repair costs with UAE's most trusted automotive service provider.
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <Button
                  variant="primary"
                  className="px-8 py-6 text-lg"
                  onClick={() => setGetWarranty(2)}
                >
                  Check Eligibility
                </Button>
                <Button
                  variant="outline"
                  className="bg-transparent border-white text-white hover:bg-white/10 px-8 py-6 text-lg"
                  onClick={() => setGetWarranty(3)}
                >
                  View Plans
                </Button>
              </div>
            </div>
            <div className="md:w-1/2">
              <div className="relative">
                <div className="absolute -top-4 -left-4 w-24 h-24 bg-salik-primary rounded-full opacity-20"></div>
                
                <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-salik-primary rounded-full opacity-20"></div>
              </div>
            </div>
          </div>
        </div>
        {/* Features Section */}
        <div className="bg-white py-12">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white rounded-lg p-6 shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1">
                <div className="flex items-center mb-4">
                  <Shield className="h-10 w-10 text-salik-primary mr-3" />
                  <h3 className="text-xl font-semibold text-autopro-black">What's Covered</h3>
                </div>
                <p className="text-gray-700 mb-4">Comprehensive protection for mechanical, electrical and electronic components. Covers parts and labor costs for unexpected repairs.</p>
                <span className="text-salik-primary hover:underline font-medium flex items-center cursor-pointer" onClick={() => setGetWarranty(3)}>
                  Learn More
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                </span>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1">
                <div className="flex items-center mb-4">
                  <CalendarDays className="h-10 w-10 text-salik-primary mr-3" />
                  <h3 className="text-xl font-semibold text-autopro-black">Warranty Duration</h3>
                </div>
                <p className="text-gray-700 mb-4">Choose between 1 or 2 year warranty plans to extend protection beyond your manufacturer's warranty. No mileage limits apply.</p>
                <span className="text-salik-primary hover:underline font-medium flex items-center cursor-pointer" onClick={() => setGetWarranty(3)}>
                  View Plans
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                </span>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1">
                <div className="flex items-center mb-4">
                  <CheckCircle className="h-10 w-10 text-salik-primary mr-3" />
                  <h3 className="text-xl font-semibold text-autopro-black">Trusted Service Network</h3>
                </div>
                <p className="text-gray-700 mb-4">Access to all ENOC Autopro service centers across the UAE. Expert technicians with genuine parts and professional service.</p>
                <span className="text-salik-primary hover:underline font-medium flex items-center cursor-pointer" onClick={() => setGetWarranty(null)}>
                  Find Centers
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Why Choose Us Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-autopro-black">Why Choose ENOC Autopro Extended Warranty</h2>
            <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
              Our extended warranty is designed to give you complete peace of mind with comprehensive coverage and exceptional service.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-all">
                <div className="flex flex-col items-center text-center">
                  <div className="mb-4 p-3 bg-autopro-lightgrey rounded-full">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-autopro-black">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Testimonials Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-autopro-black">What Our Customers Say</h2>
            <p className="mt-4 text-lg text-gray-600">
              Real experiences from vehicle owners who have benefited from our extended warranty protection.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-6 shadow-md hover:shadow-lg transition-all">
                <div className="flex items-center mb-4">
                  <img 
                    src={testimonial.avatar} 
                    alt={testimonial.name} 
                    className="w-12 h-12 rounded-full mr-4"
                  />
                  <div>
                    <h4 className="font-semibold text-autopro-black">{testimonial.name}</h4>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
                <div>
                  <p className="text-gray-600 italic">"{testimonial.content}"</p>
                </div>
                <div className="mt-4 flex">
                  <svg className="w-5 h-5 text-autopro-red" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.799-2.034c-.784-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                  </svg>
                  <svg className="w-5 h-5 text-autopro-red" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.799-2.034c-.784-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                  </svg>
                  <svg className="w-5 h-5 text-autopro-red" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.799-2.034c-.784-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                  </svg>
                  <svg className="w-5 h-5 text-autopro-red" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.799-2.034c-.784-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                  </svg>
                  <svg className="w-5 h-5 text-autopro-red" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.799-2.034c-.784-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                  </svg>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-12 text-center">
            <Button variant="primary">
              Read More Reviews
            </Button>
          </div>
        </div>
      </section>
      {/* CTA section */}
      <section className="py-16 bg-autopro-black warranty-hero-pattern">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Protect Your Vehicle with Extended Warranty?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Get peace of mind knowing your vehicle is protected against unexpected repair costs.
              Our extended warranty plans are designed to keep you driving worry-free.
            </p>
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
              <Button
                variant="primary"
                className="px-8 py-6 text-lg"
                onClick={() => setGetWarranty(2)}
              >
                Check Eligibility
              </Button>
              <Button
                variant="outline"
                className="bg-transparent border-white text-white hover:bg-white/10 px-8 py-6 text-lg"
                onClick={() => setGetWarranty(3)}
              >
                View Coverage Plans
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default GetWarranty
