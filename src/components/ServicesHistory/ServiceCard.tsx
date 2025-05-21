
import { Download, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ServiceItem, ServiceType } from "@/types/serviceTypes";

interface ServiceCardProps {
  item: ServiceItem;
  serviceType: ServiceType;
  onDownloadInvoice: (id: string) => void;
  onRequestAgain: (id: string) => void;
}

const ServiceCard = ({
  item,
  serviceType,
  onDownloadInvoice,
  onRequestAgain,
}: ServiceCardProps) => {
  const getBadgeColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "active":
      case "completed":
        return "bg-green-100 text-green-800 border-green-200";
      case "pending":
      case "in progress":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "expired":
      case "canceled":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const renderCardContent = () => {
    switch (serviceType) {
      case "insurance":
        return (
          <>
            <div className="flex flex-wrap gap-4 mb-2">
              <div>
                <span className="text-xs text-gray-500">Policy Number</span>
                <p className="font-medium">{item.policyNumber}</p>
              </div>
              <div>
                <span className="text-xs text-gray-500">Insurer</span>
                <p className="font-medium">{item.insurerName}</p>
              </div>
              <div>
                <span className="text-xs text-gray-500">Vehicle</span>
                <p className="font-medium">{item.vehicle}</p>
              </div>
            </div>
            <div className="mt-2 flex flex-wrap gap-4">
              <div>
                <span className="text-xs text-gray-500">Coverage Period</span>
                <p className="font-medium">
                  {item.startDate} - {item.endDate}
                </p>
              </div>
            </div>
          </>
        );

      case "buySellCar":
        return (
          <>
            <div className="flex flex-wrap gap-4 mb-2">
              <div>
                <span className="text-xs text-gray-500">Transaction ID</span>
                <p className="font-medium">{item.transactionId}</p>
              </div>
              <div>
                <span className="text-xs text-gray-500">Car Model</span>
                <p className="font-medium">{item.carModel}</p>
              </div>
              <div>
                <span className="text-xs text-gray-500">
                  {item.transactionType === "buy" ? "Seller" : "Buyer"}
                </span>
                <p className="font-medium">{item.otherParty}</p>
              </div>
            </div>
            <div className="mt-2 flex flex-wrap gap-4">
              <div>
                <span className="text-xs text-gray-500">Date</span>
                <p className="font-medium">{item.date}</p>
              </div>
              <div>
                <span className="text-xs text-gray-500">Amount</span>
                <p className="font-medium">${item.amount}</p>
              </div>
            </div>
          </>
        );

      case "renewRegistration":
        return (
          <>
            <div className="flex flex-wrap gap-4 mb-2">
              <div>
                <span className="text-xs text-gray-500">Renewal ID</span>
                <p className="font-medium">{item.renewalId}</p>
              </div>
              <div>
                <span className="text-xs text-gray-500">Vehicle</span>
                <p className="font-medium">{item.vehicle}</p>
              </div>
            </div>
            <div className="mt-2 flex flex-wrap gap-4">
              <div>
                <span className="text-xs text-gray-500">Renewal Date</span>
                <p className="font-medium">{item.renewalDate}</p>
              </div>
              <div>
                <span className="text-xs text-gray-500">Expiry Date</span>
                <p className="font-medium">{item.expiryDate}</p>
              </div>
              <div>
                <span className="text-xs text-gray-500">Fee</span>
                <p className="font-medium">${item.fee}</p>
              </div>
            </div>
          </>
        );

      case "maintenance":
        return (
          <>
            <div className="flex flex-wrap gap-4 mb-2">
              <div>
                <span className="text-xs text-gray-500">Service ID</span>
                <p className="font-medium">{item.serviceId}</p>
              </div>
              <div>
                <span className="text-xs text-gray-500">Vehicle</span>
                <p className="font-medium">{item.vehicle}</p>
              </div>
              <div>
                <span className="text-xs text-gray-500">Service Type</span>
                <p className="font-medium">{item.serviceType}</p>
              </div>
            </div>
            <div className="mt-2 flex flex-wrap gap-4">
              <div>
                <span className="text-xs text-gray-500">Workshop</span>
                <p className="font-medium">{item.workshopName}</p>
              </div>
              <div>
                <span className="text-xs text-gray-500">Date</span>
                <p className="font-medium">{item.date}</p>
              </div>
              <div>
                <span className="text-xs text-gray-500">Cost</span>
                <p className="font-medium">${item.cost}</p>
              </div>
            </div>
          </>
        );

      case "hireDriver":
        return (
          <>
            <div className="flex flex-wrap gap-4 mb-2">
              <div>
                <span className="text-xs text-gray-500">Booking ID</span>
                <p className="font-medium">{item.bookingId}</p>
              </div>
              <div>
                <span className="text-xs text-gray-500">Driver</span>
                <p className="font-medium">{item.driverName}</p>
              </div>
              <div>
                <span className="text-xs text-gray-500">Vehicle</span>
                <p className="font-medium">{item.vehicle}</p>
              </div>
            </div>
            <div className="mt-2 flex flex-wrap gap-4">
              <div>
                <span className="text-xs text-gray-500">Hire Period</span>
                <p className="font-medium">{item.hirePeriod}</p>
              </div>
              <div>
                <span className="text-xs text-gray-500">Cost</span>
                <p className="font-medium">${item.cost}</p>
              </div>
            </div>
          </>
        );

      case "carLeasing":
        return (
          <>
            <div className="flex flex-wrap gap-4 mb-2">
              <div>
                <span className="text-xs text-gray-500">Lease ID</span>
                <p className="font-medium">{item.leaseId}</p>
              </div>
              <div>
                <span className="text-xs text-gray-500">Vehicle</span>
                <p className="font-medium">{item.vehicle}</p>
              </div>
            </div>
            <div className="mt-2 flex flex-wrap gap-4">
              <div>
                <span className="text-xs text-gray-500">Lease Period</span>
                <p className="font-medium">
                  {item.leaseStartDate} - {item.leaseEndDate}
                </p>
              </div>
              <div>
                <span className="text-xs text-gray-500">Monthly Cost</span>
                <p className="font-medium">${item.monthlyCost}</p>
              </div>
            </div>
          </>
        );

      case "carFinancing":
        return (
          <>
            <div className="flex flex-wrap gap-4 mb-2">
              <div>
                <span className="text-xs text-gray-500">Loan ID</span>
                <p className="font-medium">{item.loanId}</p>
              </div>
              <div>
                <span className="text-xs text-gray-500">Bank</span>
                <p className="font-medium">{item.bankName}</p>
              </div>
              <div>
                <span className="text-xs text-gray-500">Vehicle</span>
                <p className="font-medium">{item.vehicle}</p>
              </div>
            </div>
            <div className="mt-2 flex flex-wrap gap-4">
              <div>
                <span className="text-xs text-gray-500">Financing Amount</span>
                <p className="font-medium">${item.financingAmount}</p>
              </div>
              <div>
                <span className="text-xs text-gray-500">EMI</span>
                <p className="font-medium">${item.emiAmount}/month</p>
              </div>
              <div>
                <span className="text-xs text-gray-500">Tenure</span>
                <p className="font-medium">{item.tenure} months</p>
              </div>
            </div>
          </>
        );

      default:
        return <p>No details available</p>;
    }
  };

  return (
    <Card className="p-4 mb-4 transition-all hover:shadow-md">
      <div className="flex flex-col sm:flex-row justify-between">
        <div className="flex-1">
          {renderCardContent()}
          <div className="mt-4 flex items-center">
            <Badge className={getBadgeColor(item.status)}>{item.status}</Badge>
          </div>
        </div>
        
        <div className="mt-4 sm:mt-0 sm:ml-4 flex sm:flex-col gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="flex items-center gap-1"
            onClick={() => onDownloadInvoice(item.id)}
          >
            <Download size={14} /> Invoice
          </Button>
          
          {(item.status === "Completed" || item.status === "Expired") && (
            <Button
              variant="primary"
              size="sm" 
              className="btn-service flex items-center gap-1"
              onClick={() => onRequestAgain(item.id)}
            >
              <RefreshCw size={14} /> Request Again
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
};

export default ServiceCard;
