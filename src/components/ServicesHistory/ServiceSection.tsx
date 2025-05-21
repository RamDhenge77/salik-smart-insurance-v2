
import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ServiceItem, ServiceType } from "@/types/serviceTypes";
import ServiceCard from "./ServiceCard";
import { cn } from "@/lib/utils";

interface ServiceSectionProps {
  serviceType: string;
  data: ServiceItem[];
  searchTerm: string;
  filterDate: { from: Date | undefined; to: Date | undefined };
  selectedStatus: string | null;
  selectedVehicle: string | null;
  onDownloadInvoice: (id: string) => void;
  onRequestAgain: (id: string) => void;
}

const ServiceSection = ({
  serviceType,
  data,
  searchTerm,
  filterDate,
  selectedStatus,
  selectedVehicle,
  onDownloadInvoice,
  onRequestAgain,
}: ServiceSectionProps) => {
  const [expanded, setExpanded] = useState(true);

  const getServiceTypeIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'drivinganalytics':
        return 'chart-line';
      case 'insurance':
        return 'shield';
      case 'buysellcar':
        return 'car';
      case 'renewregistration':
        return 'calendar-days';
      case 'maintenance':
        return 'wrench';
      case 'hiredriver':
        return 'users';
      case 'carleasing':
        return 'car';
      case 'carfinancing':
        return 'dollar-sign';
      default:
        return 'circle';
    }
  };

  const getServiceTitle = (type: string): string => {
    switch (type) {
      case 'drivingAnalytics':
        return 'Driving Analytics';
      case 'insurance':
        return 'Insurance';
      case 'buySellCar':
        return 'Buy/Sell Car';
      case 'renewRegistration':
        return 'Renew Registration';
      case 'maintenance':
        return 'Maintenance';
      case 'hireDriver':
        return 'Hire a Driver';
      case 'carLeasing':
        return 'Car Leasing';
      case 'carFinancing':
        return 'Car Financing';
      default:
        return type;
    }
  };

  // Filter data based on search term, date range, status, and vehicle
  const filteredData = data.filter((item) => {
    const matchesSearch =
      searchTerm === "" ||
      Object.values(item).some(
        (value) =>
          value &&
          value.toString().toLowerCase().includes(searchTerm.toLowerCase())
      );

    const matchesDateRange =
      !filterDate.from ||
      !filterDate.to ||
      (item.date &&
        new Date(item.date) >= filterDate.from &&
        new Date(item.date) <= filterDate.to);

    const matchesStatus =
      !selectedStatus || item.status === selectedStatus;

    const matchesVehicle =
      !selectedVehicle ||
      (item.vehicle && item.vehicle === selectedVehicle);

    return matchesSearch && matchesDateRange && matchesStatus && matchesVehicle;
  });

  // If no items match filters, don't show this section
  if (filteredData.length === 0) {
    return null;
  }

  return (
    <div className="mb-6 bg-white rounded-md shadow-sm">
      <div
        className="flex items-center justify-between p-4 cursor-pointer"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex items-center space-x-2">
          <span className="text-xl font-semibold">{getServiceTitle(serviceType)}</span>
          <span className="bg-bgLight text-gray-700 text-sm px-2 py-1 rounded">
            {filteredData.length}
          </span>
        </div>
        <Button variant="outline" size="sm">
          {expanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </Button>
      </div>

      <div
        className={cn(
          "transition-all duration-300 ease-in-out overflow-hidden",
          expanded ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <div className="border-t px-4 py-2">
          {filteredData.map((item) => (
            <ServiceCard
              key={item.id}
              item={item}
              serviceType={serviceType as ServiceType}
              onDownloadInvoice={onDownloadInvoice}
              onRequestAgain={onRequestAgain}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServiceSection;
