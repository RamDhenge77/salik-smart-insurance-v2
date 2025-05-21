
import { Link } from 'react-router-dom';
// import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { DollarSign, Calendar, CreditCard, Lock, Mail } from 'lucide-react';
import ApplicationFormContent from './ApplicationFormContent';

const CarFinancingHomePage = () => {
  return (
    // <Layout fullWidth>
      <div className="flex flex-col lg:flex-row">
        {/* Left section with marketing content */}
        <div className="w-full lg:w-1/2 bg-finance-sand p-8 lg:p-16">
          <div className="max-w-2xl mx-auto lg:ml-auto lg:mr-0">
            <h1 className="text-3xl md:text-4xl font-bold text-[#4F5063] mb-4">
              Make this summer memorable by driving home your dream car.
            </h1>
            
            <p className="text-base mb-8 text-[#4F5063]">
              Own the car of your choice with our exclusive Auto Finance offers. Enjoy competitive 
              profit rates, payment holidays, flexible payment plans and much more, to make your 
              dream car a reality.
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
                    Profit rates* starting from 1.89% flat p.a. (equivalent to 3.61% reducing profit rate p.a.) 
                    for UAE Nationals and 2.10% flat p.a. (equivalent to 4% reducing profit rate p.a.) for Expatriates
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
                    Payment holiday of up to 6 months for UAE Nationals and up to 4 months for Expatriates**
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
          <div className="max-w-md mx-auto lg:mx-0 lg:max-w-none lg:h-full">
            <div className="bg-bgLight rounded-lg shadow-md p-8 lg:h-full">
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
                Please fill in the form below and a member of our team will contact you personally.
              </p>
              
              {/* Application form content embedded directly */}
              <ApplicationFormContent />
            </div>
          </div>
        </div>
      </div>
    // </Layout>
  );
};

export default CarFinancingHomePage;
