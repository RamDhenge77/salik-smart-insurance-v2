import React from 'react';
import { Button } from '@/components/ui/button';
import { DollarSign, Users, Gavel } from 'lucide-react';

interface SellingMethodFormProps {
  onPrevious: () => void;
  onNext: (method: string) => void;
}

const SellingMethodForm = ({ onPrevious, onNext }: SellingMethodFormProps) => {
  const sellingMethods = [
    {
      id: 'direct',
      title: 'Sell Direct to Buyer',
      description: 'List your car directly on Salik. You handle all communications with potential buyers and arrange viewings yourself.',
      benefits: [
        'Keep 100% of your selling price',
        'Negotiate directly with buyers',
        'Complete control over the selling process',
        'No commission fees'
      ],
      process: [
        'We verify and publish your listing',
        'Interested buyers contact you directly',
        'You arrange viewings and test drives',
        'Complete the sale with our paperwork assistance'
      ],
      icon: <DollarSign className="h-8 w-8 text-[#2596be]" />
    },
    {
      id: 'broker',
      title: 'Sell with a Broker',
      description: 'Our professional brokers handle the selling process for you, from arranging viewings to negotiating the final price.',
      benefits: [
        'Save time and hassle',
        'Professional negotiation skills',
        'Screening of serious buyers',
        'Secure payment handling'
      ],
      process: [
        'We assign you a dedicated broker',
        'Your broker manages all buyer inquiries',
        'They conduct viewings on your behalf',
        'We handle paperwork and secure payment'
      ],
      icon: <Users className="h-8 w-8 text-[#2596be]" />
    },
    {
      id: 'auction',
      title: 'Salik Auctions',
      description: 'Put your car in our weekly online auction. Reach multiple verified buyers and sell quickly at a competitive market price.',
      benefits: [
        'Reach hundreds of verified buyers',
        'Competitive bidding drives price up',
        'Quick sale - usually within 7 days',
        'No need to meet individual buyers'
      ],
      process: [
        'We inspect and photograph your car',
        'Your car is listed in next available auction',
        'Bidding runs for 48 hours',
        'Highest bidder purchases your car'
      ],
      icon: <Gavel className="h-8 w-8 text-[#2596be]" />
    }
  ];

  return (
    <div className="py-6 animate-fade-in">
      <div className="flex items-center mb-6">
        <h2 className="text-2xl font-bold text-[#2596be]">Select Selling Method</h2>
      </div>
      
      <p className="text-gray-600 mb-8">
        Choose the selling method that works best for you. Each option offers different benefits and levels of involvement.
      </p>
      
      <div className="space-y-6 mb-10">
        {sellingMethods.map((method) => (
          <div 
            key={method.id}
            className="border rounded-lg hover:border-[#2596be] transition-colors cursor-pointer hover:shadow-md"
            onClick={() => onNext(method.id)}
          >
            <div className="p-6">
              <div className="flex items-start gap-4 mb-4">
                <div className="bg-[#6cd1f547] rounded-full p-3 flex-shrink-0">
                  {method.icon}
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-salik-dark">{method.title}</h3>
                  <p className="text-gray-600">{method.description}</p>
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6 mt-6">
                <div className="bg-white/50 rounded-lg p-4">
                  <h4 className="font-medium text-[#2596be] mb-2 flex items-center">
                    <span className="w-1.5 h-1.5 bg-[#2596be] rounded-full mr-2"></span>
                    Benefits
                  </h4>
                  <ul className="list-disc pl-5 space-y-2 text-gray-700">
                    {method.benefits.map((benefit, index) => (
                      <li key={index}>{benefit}</li>
                    ))}
                  </ul>
                </div>
                
                <div className="bg-white/50 rounded-lg p-4">
                  <h4 className="font-medium text-[#2596be] mb-2 flex items-center">
                    <span className="w-1.5 h-1.5 bg-[#2596be] rounded-full mr-2"></span>
                    Process
                  </h4>
                  <ol className="list-decimal pl-5 space-y-2 text-gray-700">
                    {method.process.map((step, index) => (
                      <li key={index}>{step}</li>
                    ))}
                  </ol>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-50 px-6 py-4 rounded-b-lg flex justify-between items-center">
              <div className="text-sm text-gray-500">
                {method.id === 'direct' && 'Fee: None'}
                {method.id === 'broker' && 'Fee: 2.5% of selling price'}
                {method.id === 'auction' && 'Fee: 1.5% of final bid'}
              </div>
              <Button variant='primary' className="">Select This Option</Button>
            </div>
          </div>
        ))}
      </div>
      
      <div className="flex justify-between">
        <Button variant="outline" onClick={onPrevious} className='hover:bg-gray-100'>
          Back to Photos
        </Button>
      </div>
    </div>
  );
};

export default SellingMethodForm;