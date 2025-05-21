
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from 'sonner';
import { Download, FileText, Calendar, AlertTriangle, CheckSquare, Car, Clock, Upload } from 'lucide-react';

// Sample data for dashboard
const warrantyDetails = {
  id: "WTY-67890",
  plan: "Plus",
  startDate: new Date(),
  endDate: new Date(new Date().setFullYear(new Date().getFullYear() + 1)),
  claimLimit: 10000,
  claimsUsed: 2500,
  serviceCenter: "Dubai - Al Qusais",
  vehicle: {
    make: "Lexus",
    model: "GX460",
    year: "2015",
    vin: "4T1BF1FK5GU******",
    licensePlate: "B60828"
  },
  serviceHistory: [
    {
      id: "SVC-001",
      date: new Date(new Date().setDate(new Date().getDate() - 60)),
      type: "Oil Change & Filter",
      location: "Dubai - Al Qusais",
      cost: 350,
      warranty: false
    },
    {
      id: "SVC-002", 
      date: new Date(new Date().setDate(new Date().getDate() - 30)),
      type: "A/C Compressor Replacement",
      location: "Dubai - Al Quoz",
      cost: 2500,
      warranty: true
    }
  ],
  upcomingServices: [
    {
      id: "SVC-003",
      date: new Date(new Date().setDate(new Date().getDate() + 20)),
      type: "Routine Maintenance",
      location: "Dubai - Al Qusais"
    }
  ]
};

const Dashboard = () => {
  const [transferDialogOpen, setTransferDialogOpen] = useState(false);
  const [cancelDialogOpen, setCancelDialogOpen] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<string | null>(null);

  const handleDownload = (documentType: string) => {
    toast.success(`${documentType} downloaded`, {
      description: `Your ${documentType.toLowerCase()} has been downloaded successfully.`
    });
  };

  const handleClaimRequest = () => {
    toast.info("Claim request initiated", {
      description: "You'll be guided through the claim request process."
    });
    // In a real app, this would navigate to a claim form
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Simulate file upload
      setTimeout(() => {
        setUploadedFile(file.name);
        toast.success("Document uploaded", {
          description: `Successfully uploaded ${file.name}`
        });
      }, 1000);
    }
  };

  const handleTransferWarranty = () => {
    if (!uploadedFile) {
      toast.error("No document uploaded", {
        description: "Please upload the ownership transfer documents."
      });
      return;
    }

    toast.success("Warranty transfer initiated", {
      description: "Your transfer request has been submitted for review."
    });
    setTransferDialogOpen(false);
  };

  const handleCancelWarranty = () => {
    toast.info("Warranty cancellation initiated", {
      description: "Your request has been submitted. Our team will contact you shortly."
    });
    setCancelDialogOpen(false);
  };

  // Calculate warranty progress
  const startDate = warrantyDetails.startDate.getTime();
  const endDate = warrantyDetails.endDate.getTime();
  const today = new Date().getTime();
  const warrantyProgress = Math.min(100, Math.max(0, ((today - startDate) / (endDate - startDate)) * 100));

  // Calculate claim usage
  const claimPercentage = (warrantyDetails.claimsUsed / warrantyDetails.claimLimit) * 100;

  // Format date function
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="flex flex-col">
      <div className="flex-grow py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-autopro-black mb-2">My Warranty Dashboard</h1>
              <p className="text-gray-600">Manage your ENOC Autopro Extended Warranty</p>
            </div>
            <div className="mt-4 md:mt-0">
              <Button 
                onClick={handleClaimRequest}
                variant="secondary"
              >
                Request a Claim
              </Button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Warranty Summary */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Warranty Summary</CardTitle>
                  <CardDescription>Coverage details for your vehicle</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-10">
                    <div>
                      <p className="text-gray-500 text-sm mb-1">Warranty ID</p>
                      <p className="font-semibold">{warrantyDetails.id}</p>
                    </div>
                    <div>
                      <p className="text-gray-500 text-sm mb-1">Plan</p>
                      <p className="font-semibold">{warrantyDetails.plan}</p>
                    </div>
                    <div>
                      <p className="text-gray-500 text-sm mb-1">Start Date</p>
                      <p className="font-semibold">{formatDate(warrantyDetails.startDate)}</p>
                    </div>
                    <div>
                      <p className="text-gray-500 text-sm mb-1">End Date</p>
                      <p className="font-semibold">{formatDate(warrantyDetails.endDate)}</p>
                    </div>
                    <div>
                      <p className="text-gray-500 text-sm mb-1">Vehicle</p>
                      <p className="font-semibold">
                        {warrantyDetails.vehicle.year} {warrantyDetails.vehicle.make} {warrantyDetails.vehicle.model}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-500 text-sm mb-1">Service Center</p>
                      <p className="font-semibold">{warrantyDetails.serviceCenter}</p>
                    </div>
                  </div>
                  
                  <div className="mt-6">
                    <div className="flex justify-between items-center mb-2">
                      <p className="text-gray-500">Warranty Period</p>
                      <p className="font-semibold">{Math.round(warrantyProgress)}% Complete</p>
                    </div>
                    <Progress value={warrantyProgress} className="h-2" />
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>{formatDate(warrantyDetails.startDate)}</span>
                      <span>{formatDate(warrantyDetails.endDate)}</span>
                    </div>
                  </div>
                  
                  <div className="mt-6">
                    <div className="flex justify-between items-center mb-2">
                      <p className="text-gray-500">Claim Limit Usage</p>
                      <p className="font-semibold text-salik-primary">
                        AED {warrantyDetails.claimsUsed} / AED {warrantyDetails.claimLimit}
                      </p>
                    </div>
                    <Progress value={claimPercentage} className="h-2" />
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>Used: {Math.round(claimPercentage)}%</span>
                      <span>Remaining: AED {warrantyDetails.claimLimit - warrantyDetails.claimsUsed}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                <Button 
                  variant="outline" 
                  className="border-salik-primary text-salik-primary hover:bg-salik-primary hover:text-white"
                  onClick={() => handleDownload("Warranty Contract")}
                >
                  <FileText className="mr-2 h-4 w-4" />
                  Download Contract
                </Button>
                
                <Dialog open={transferDialogOpen} onOpenChange={setTransferDialogOpen}>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="border-autopro-black text-autopro-black hover:bg-autopro-black hover:text-white">
                      <Upload className="mr-2 h-4 w-4" />
                      Transfer Warranty
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Transfer Warranty</DialogTitle>
                      <DialogDescription>
                        Transfer your warranty to a new vehicle owner
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <p className="text-sm text-gray-600">
                        To transfer your warranty to a new owner, please upload the following documents:
                      </p>
                      <ul className="list-disc pl-5 text-sm text-gray-600 space-y-1">
                        <li>Signed transfer form (available for download below)</li>
                        <li>Copy of vehicle sale agreement</li>
                        <li>Copy of new owner's Emirates ID</li>
                      </ul>
                      
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDownload("Transfer Form")}
                      >
                        <Download className="mr-2 h-4 w-4" />
                        Download Transfer Form
                      </Button>
                      
                      <div className="border-2 border-dashed border-gray-300 rounded-md p-4 text-center mt-4">
                        <div className="space-y-2">
                          <div className="flex justify-center">
                            <Upload className="h-8 w-8 text-gray-400" />
                          </div>
                          {!uploadedFile ? (
                            <>
                              <p className="text-sm text-gray-600">
                                Upload completed and signed documents
                              </p>
                              <p className="text-xs text-gray-500">
                                PDF or image files up to 10MB
                              </p>
                            </>
                          ) : (
                            <p className="text-sm text-green-600 font-medium">
                              {uploadedFile} uploaded successfully
                            </p>
                          )}
                          <div className="mt-2">
                            <Button 
                              type="button" 
                              variant="outline"
                              size="sm"
                              onClick={() => document.getElementById('transfer-doc-upload')?.click()}
                            >
                              {uploadedFile ? 'Replace File' : 'Select File'}
                            </Button>
                            <input 
                              id="transfer-doc-upload" 
                              type="file" 
                              className="hidden" 
                              accept=".jpg,.jpeg,.png,.pdf"
                              onChange={handleFileUpload}
                            />
                          </div>
                        </div>
                      </div>
                      
                      <p className="text-xs text-gray-500 mt-2">
                        Note: A transfer fee of AED 150 will apply. Once approved, the warranty will be transferred to the new owner.
                      </p>
                    </div>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setTransferDialogOpen(false)}>
                        Cancel
                      </Button>
                      <Button 
                        onClick={handleTransferWarranty}
                        variant="secondary"
                      >
                        Submit Transfer Request
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
                
                <Dialog open={cancelDialogOpen} onOpenChange={setCancelDialogOpen}>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="text-red-600 border-red-600 hover:bg-red-600 hover:text-white">
                      <AlertTriangle className="mr-2 h-4 w-4" />
                      Cancel Warranty
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Cancel Warranty</DialogTitle>
                      <DialogDescription>
                        Are you sure you want to cancel your warranty?
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div className="bg-red-50 border border-red-200 rounded-md p-4">
                        <div className="flex items-start">
                          <AlertTriangle className="h-5 w-5 text-red-600 mr-3 mt-0.5" />
                          <div>
                            <p className="font-medium text-red-600">Warning: No Refunds Available</p>
                            <p className="text-sm text-red-700 mt-1">
                              As per the terms and conditions, no refunds will be provided for canceled warranties. 
                              Your warranty will be terminated immediately upon cancellation.
                            </p>
                          </div>
                        </div>
                      </div>
                      
                      <p className="text-sm text-gray-600">
                        If you wish to proceed with cancellation, please click the button below. 
                        Our customer service team may contact you to confirm this request.
                      </p>
                    </div>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setCancelDialogOpen(false)}>
                        Keep My Warranty
                      </Button>
                      <Button 
                        onClick={handleCancelWarranty}
                        variant="primary"
                      >
                        Cancel Warranty
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
              
              {/* Service Records & Claims */}
              <div className="mt-8">
                <Tabs defaultValue="history">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="history">Service History</TabsTrigger>
                    <TabsTrigger value="upcoming">Upcoming Services</TabsTrigger>
                  </TabsList>
                  <TabsContent value="history">
                    <Card>
                      <CardHeader>
                        <CardTitle>Service History</CardTitle>
                        <CardDescription>Record of all services for your vehicle</CardDescription>
                      </CardHeader>
                      <CardContent>
                        {warrantyDetails.serviceHistory.length > 0 ? (
                          <div className="space-y-4">
                            {warrantyDetails.serviceHistory.map((service) => (
                              <div key={service.id} className="border-b pb-4">
                                <div className="flex justify-between items-start">
                                  <div>
                                    <h4 className="font-semibold">{service.type}</h4>
                                    <p className="text-sm text-gray-500">{formatDate(service.date)}</p>
                                    <p className="text-sm mt-1">Location: {service.location}</p>
                                  </div>
                                  <div className="text-right">
                                    <p className="font-semibold">AED {service.cost}</p>
                                    {service.warranty ? (
                                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                        <CheckSquare className="h-3 w-3 mr-1" />
                                        Warranty Claim
                                      </span>
                                    ) : (
                                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                                        Regular Service
                                      </span>
                                    )}
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="text-center py-8 text-gray-500">
                            <Car className="h-12 w-12 mx-auto text-gray-300 mb-2" />
                            <p>No service history available yet</p>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </TabsContent>
                  <TabsContent value="upcoming">
                    <Card>
                      <CardHeader>
                        <CardTitle>Upcoming Services</CardTitle>
                        <CardDescription>Scheduled maintenance and service appointments</CardDescription>
                      </CardHeader>
                      <CardContent>
                        {warrantyDetails.upcomingServices.length > 0 ? (
                          <div className="space-y-4">
                            {warrantyDetails.upcomingServices.map((service) => (
                              <div key={service.id} className="border-b pb-4 flex justify-between items-start">
                                <div>
                                  <h4 className="font-semibold">{service.type}</h4>
                                  <p className="text-sm text-gray-500">{formatDate(service.date)}</p>
                                  <p className="text-sm mt-1">Location: {service.location}</p>
                                </div>
                                <div>
                                  <Button variant="outline" size="sm" className="text-salik-primary border-salik-primary">
                                    <Calendar className="h-4 w-4 mr-2" />
                                    Manage Appointment
                                  </Button>
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="text-center py-8 text-gray-500">
                            <Clock className="h-12 w-12 mx-auto text-gray-300 mb-2" />
                            <p>No upcoming services scheduled</p>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
            
            {/* Right Column - Vehicle & Action Cards */}
            <div className="space-y-6">
              {/* Vehicle Card */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Car className="h-5 w-5 mr-2 text-salik-primary" />
                    Vehicle Details
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <p className="text-gray-500 text-sm">Make & Model</p>
                      <p className="font-semibold">
                        {warrantyDetails.vehicle.make} {warrantyDetails.vehicle.model}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-500 text-sm">Year</p>
                      <p className="font-semibold">{warrantyDetails.vehicle.year}</p>
                    </div>
                    <div>
                      <p className="text-gray-500 text-sm">VIN</p>
                      <p className="font-semibold">{warrantyDetails.vehicle.vin}</p>
                    </div>
                    <div>
                      <p className="text-gray-500 text-sm">License Plate</p>
                      <p className="font-semibold">{warrantyDetails.vehicle.licensePlate}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              {/* Claim Process Card */}
              <Card>
                <CardHeader>
                  <CardTitle>How to File a Claim</CardTitle>
                </CardHeader>
                <CardContent>
                  <ol className="space-y-4 text-sm">
                    <li className="flex items-start">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-salik-primary text-white flex items-center justify-center mr-3">
                        1
                      </div>
                      <p>Visit any ENOC Autopro service center with your vehicle and warranty details</p>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-salik-primary text-white flex items-center justify-center mr-3">
                        2
                      </div>
                      <p>Our technicians will diagnose the issue and determine if it's covered under warranty</p>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-salik-primary text-white flex items-center justify-center mr-3">
                        3
                      </div>
                      <p>Pay the applicable deductible (if any) and we'll take care of the repairs</p>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-salik-primary text-white flex items-center justify-center mr-3">
                        4
                      </div>
                      <p>Once completed, you can collect your vehicle and view the claim details in your dashboard</p>
                    </li>
                  </ol>
                  <div className="mt-4">
                    <Button 
                      onClick={handleClaimRequest}
                      variant="secondary"
                      className="w-full"
                    >
                      Request a Claim
                    </Button>
                  </div>
                </CardContent>
              </Card>
              
              {/* Contact Card */}
              <Card>
                <CardHeader>
                  <CardTitle>Contact Support</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <svg className="h-5 w-5 text-salik-primary mr-3 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                      </svg>
                      <div>
                        <p className="font-medium">Customer Support</p>
                        <p className="text-gray-500">800-AUTO (2886)</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <svg className="h-5 w-5 text-salik-primary mr-3 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                      </svg>
                      <div>
                        <p className="font-medium">Email Support</p>
                        <p className="text-gray-500">warranty@autopro.ae</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <svg className="h-5 w-5 text-salik-primary mr-3 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"></path>
                      </svg>
                      <div>
                        <p className="font-medium">Live Chat</p>
                        <p className="text-gray-500">Available 9am-6pm daily</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
