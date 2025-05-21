
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Check, Download, FileText, CalendarDays } from 'lucide-react';
import { toast } from 'sonner';

interface Props {
  setGetWarranty: React.Dispatch<React.SetStateAction<number>>;
}

const Confirmation = ({ setGetWarranty } : Props) => {
  // const navigate = useNavigate();
  const [reminders, setReminders] = useState({
    email: true,
    sms: false
  });

  const handleDownload = (documentType: string) => {
    toast.success(`${documentType} downloaded`, {
      description: `Your ${documentType.toLowerCase()} has been downloaded successfully.`
    });
  };

  const navigateToDashboard = () => {
    toast.success("Navigating to dashboard", {
      description: "Taking you to your warranty dashboard."
    });
    setGetWarranty(8);
  };

  return (
    <div className="flex flex-col">
      <div className="flex-grow py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              {/* Success Header */}
              <div className="bg-green-600 text-white p-8 text-center">
                <div className="mx-auto h-16 w-16 rounded-full bg-white flex items-center justify-center mb-4">
                  <Check className="h-10 w-10 text-green-600" />
                </div>
                <h1 className="text-3xl font-bold mb-2">Thank You!</h1>
                <p className="text-xl">Your warranty purchase has been successful</p>
              </div>
              
              {/* Confirmation Details */}
              <div className="p-8">
                <h2 className="text-2xl font-bold text-autopro-black mb-6">Warranty Details</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold text-gray-600 mb-1">Warranty ID</h3>
                    <p className="text-lg font-medium">WTY-67890</p>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-gray-600 mb-1">Purchase Date</h3>
                    <p className="text-lg font-medium">{new Date().toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}</p>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-gray-600 mb-1">Warranty Plan</h3>
                    <p className="text-lg font-medium">Plus Plan</p>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-gray-600 mb-1">Coverage Period</h3>
                    <p className="text-lg font-medium">1 Year</p>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-gray-600 mb-1">Start Date</h3>
                    <p className="text-lg font-medium">{new Date().toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}</p>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-gray-600 mb-1">End Date</h3>
                    <p className="text-lg font-medium">{new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}</p>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-gray-600 mb-1">Service Center</h3>
                    <p className="text-lg font-medium">Dubai - Al Qusais</p>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-gray-600 mb-1">Claim Limit Remaining</h3>
                    <p className="text-lg font-medium">AED 10,000</p>
                  </div>
                </div>
                
                {/* Vehicle Details */}
                <div className="mt-8">
                  <h2 className="text-2xl font-bold text-autopro-black mb-6">Vehicle Details</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-semibold text-gray-600 mb-1">Make & Model</h3>
                      <p className="text-lg font-medium">Toyota Camry</p>
                    </div>
                    
                    <div>
                      <h3 className="font-semibold text-gray-600 mb-1">Year</h3>
                      <p className="text-lg font-medium">2021</p>
                    </div>
                    
                    <div>
                      <h3 className="font-semibold text-gray-600 mb-1">VIN</h3>
                      <p className="text-lg font-medium">4T1BF1FK5GU******</p>
                    </div>
                    
                    <div>
                      <h3 className="font-semibold text-gray-600 mb-1">License Plate</h3>
                      <p className="text-lg font-medium">Dubai Q 12345</p>
                    </div>
                  </div>
                </div>
                
                {/* Download Documents */}
                <div className="mt-8">
                  <h2 className="text-2xl font-bold text-autopro-black mb-6">Your Documents</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Button 
                      variant="primary"
                      onClick={() => handleDownload("Warranty Contract")}
                    >
                      <FileText className="mr-2 h-4 w-4" />
                      Download Warranty Contract
                    </Button>
                    <Button 
                      variant="primary"
                      onClick={() => handleDownload("Warranty Schedule")}
                    >
                      <CalendarDays className="mr-2 h-4 w-4" />
                      Download Warranty Schedule
                    </Button>
                    <Button 
                      variant="primary"
                      onClick={() => handleDownload("Payment Receipt")}
                    >
                      <Download className="mr-2 h-4 w-4" />
                      Download Payment Receipt
                    </Button>
                    <Button 
                      variant="primary"
                      onClick={() => handleDownload("Terms & Conditions")}
                    >
                      <Download className="mr-2 h-4 w-4" />
                      Download Terms & Conditions
                    </Button>
                  </div>
                </div>
                
                {/* Service Reminders */}
                <div className="mt-8 bg-gray-50 rounded-lg p-6">
                  <h2 className="text-xl font-bold text-autopro-black mb-4">Service Reminders</h2>
                  <p className="text-gray-600 mb-4">
                    Would you like to receive reminders for upcoming service appointments?
                  </p>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="email-reminders" className="text-base">Email Reminders</Label>
                        <p className="text-sm text-gray-500">Receive service reminders via email</p>
                      </div>
                      <Switch
                        id="email-reminders"
                        checked={reminders.email}
                        className="data-[state=checked]:!bg-btn-primary"
                        onCheckedChange={(checked) => {
                          setReminders({...reminders, email: checked});
                          if (checked) {
                            toast.success("Email reminders enabled");
                          } else {
                            toast.info("Email reminders disabled");
                          }
                        }}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="sms-reminders" className="text-base">SMS Reminders</Label>
                        <p className="text-sm text-gray-500">Receive service reminders via SMS</p>
                      </div>
                      <Switch
                        id="sms-reminders"
                        checked={reminders.sms}
                        className="data-[state=checked]:!bg-btn-primary"
                        onCheckedChange={(checked) => {
                          setReminders({...reminders, sms: checked});
                          if (checked) {
                            toast.success("SMS reminders enabled");
                          } else {
                            toast.info("SMS reminders disabled");
                          }
                        }}
                      />
                    </div>
                  </div>
                </div>
                
                {/* Next Steps */}
                <div className="mt-8 text-center">
                  <p className="text-gray-600 mb-6">
                    Your warranty is now active. You can view all your warranty details and manage your coverage in your dashboard.
                  </p>
                  <Button 
                    onClick={navigateToDashboard}
                    variant="primary"
                    className="w-full"
                  >
                    Go to My Warranty Dashboard
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Confirmation;
